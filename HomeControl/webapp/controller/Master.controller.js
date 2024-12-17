/*global history */
sap.ui.define([
	"com/davis/homecontrol/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"com/davis/homecontrol/model/formatter",
	"com/davis/homecontrol/model/grouper",
	"com/davis/homecontrol/model/GroupSortState"
], function(BaseController, JSONModel, Filter, FilterOperator, GroupHeaderListItem, Device, formatter, grouper, GroupSortState) {
	"use strict";

	return BaseController.extend("com.davis.homecontrol.controller.Master", {

		formatter: formatter,


		/* =========================================================== */
		/*  Lifecycle Methods                                          */
		/* =========================================================== */

		/**
		 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
		 * @public
		 */
		onInit: function() {
			// Set the view's state model.
			let iOriginalDelay = this.oView.getBusyIndicatorDelay(),
				oViewModel = new JSONModel({
					isFilterBarVisible: false,
					filterBarLabel: "",
					busy: true,
					delay: iOriginalDelay,
					originalDelay: iOriginalDelay,
					title: this.getResourceBundle().getText("masterTitleCount", [0]),
					noDataText: this.getResourceBundle().getText("masterListNoDataText"),
					sortBy: "Name",
					groupBy: "None"
				});
			this.setModel(oViewModel, "masterView");
		
			// Bind up the local controls.
			this._oComponent = this.getOwnerComponent();
			this._oApp = this._oComponent.byId("app").getController();
			this._oRussoundControl = this._oComponent._oRussoundControl;
			this._oGroupSortState = new GroupSortState(oViewModel, grouper.groupController(this.getResourceBundle()));
			this._oList = this.byId("list");

			// Show the "back" button if there is history.
			var bEnableBack = false;
			if (window.history.length > 1) {
				bEnableBack = true;
			}
			this.oView.byId("page").setShowNavButton(bEnableBack);

			// Set the filter and search states
			this._oListFilterState = {
				aFilter: [],
				aSearch: []
			};

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			this._oList.attachEventOnce("updateFinished", function() {
				// Update the master list object counter after new data is loaded.
				this._updateListItemCount();
				// Restore original busy indicator delay for the list.
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));
				// Remove the busy overlay.
				this.getModel("masterView").setProperty("/busy", false);
			}.bind(this));

			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().getTarget("master").attachDisplay(this._onMasterDisplayed, this);
			this.getRouter().attachBypassed(this.onBypassed, this);
		},



		/* =========================================================== */
		/*  Event Handlers                                             */
		/* =========================================================== */

		/**
		 * Event handler for the master search field. Applies current
		 * filter value and triggers a new search. If the search field's
		 * 'refresh' button has been pressed, no new search is triggered
		 * and the list binding is refresh instead.
		 * @param {sap.ui.base.Event} oEvent the search event
		 * @public
		 */
		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
				return;
			}

			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				this._oListFilterState.aSearch = [new Filter("name", FilterOperator.Contains, sQuery)];
			} else {
				this._oListFilterState.aSearch = [];
			}
			this._applyFilterSearch();

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function() {
			let oViewModel = this.getModel("masterView");

			// Set the busy overlay.
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/busy", true);

			let fnDone = function(oError) {
				// TODO - handle error.

				// Hide pull to refresh indicator.
				this.byId("pullToRefresh").hide();

				// Remove the busy overlay.
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));
			}.bind(this);

			// Load the Russound CAV6.6 meta data (via TCH1).
			this._oRussoundControl.getAllZonesInfo().then(function(mZones) {
				// Update the master list item count in the page header.
				this._updateListItemCount();

				fnDone();
			}.bind(this))
			.catch(function(oError) {
				fnDone(oError);
			});

		},

		/**
		 * Event handler for the sorter selection.
		 * @param {sap.ui.base.Event} oEvent the select event
		 * @public
		 */
		onSort: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedItem().getKey(),
				aSorter = [];

			if (sKey === "zoneInfo/power") {
				// var aZoneSorter = this._oGroupSortState.sort("zone");
				aSorter = this._oGroupSortState.sort(sKey);
				// aSorter = aSorter.concat(aZoneSorter);
			} else if (sKey === "name") {
				aSorter = this._oGroupSortState.sort(sKey);
			} else {
				// Default sorting is by controller by zone
				var aZoneSorter = this._oGroupSortState.sort("zone");
				aSorter = this._oGroupSortState.sort("controller");
				aSorter = aSorter.concat(aZoneSorter);
			}
			this._applyGroupSort(aSorter);
		},

		/**
		 * Event handler for the grouper selection.
		 * @param {sap.ui.base.Event} oEvent the search field event
		 * @public
		 */
		onGroup: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedItem().getKey(),
				aSorters = this._oGroupSortState.group(sKey);

			this._applyGroupSort(aSorters);
		},

		/**
		 * Event handler for the filter button to open the ViewSettingsDialog.
		 * which is used to add or remove filters to the master list. This
		 * handler method is also called when the filter bar is pressed,
		 * which is added to the beginning of the master list when a filter is applied.
		 * @public
		 */
		onOpenViewSettings: function() {
			if (!this._oViewSettingsDialog) {
				this._oViewSettingsDialog = sap.ui.xmlfragment("com.davis.homecontrol.view.ViewSettingsDialog", this);
				this.oView.addDependent(this._oViewSettingsDialog);
				// forward compact/cozy style into Dialog
				this._oViewSettingsDialog.addStyleClass(this._oComponent.getContentDensityClass());
			}
			this._oViewSettingsDialog.open();
		},

		/**
		 * Event handler called when ViewSettingsDialog has been confirmed, i.e.
		 * has been closed with 'OK'. In the case, the currently chosen filters
		 * are applied to the master list, which can also mean that the currently
		 * applied filters are removed from the master list, in case the filter
		 * settings are removed in the ViewSettingsDialog.
		 * @param {sap.ui.base.Event} oEvent the confirm event
		 * @public
		 */
		onConfirmViewSettingsDialog: function(oEvent) {
			var aFilterItems = oEvent.getParameters().filterItems,
				aFilters = [],
				aCaptions = [];

			// update filter state:
			// combine the filter array and the filter string
			aFilterItems.forEach(function(oItem) {
				switch (oItem.getKey()) {
					case "Filter1":
						aFilters.push(new Filter("controller", FilterOperator.EQ, "1"));
						break;
					case "Filter2":
						aFilters.push(new Filter("controller", FilterOperator.EQ, "2"));
						break;
					case "Filter3":
						aFilters.push(new Filter("zoneInfo/power", FilterOperator.EQ, true)); // ON
						break;
					case "Filter4":
						aFilters.push(new Filter("zoneInfo/power", FilterOperator.EQ, false)); // OFF
						break;
					default:
						break;
				}
				aCaptions.push(oItem.getText());
			});

			this._oListFilterState.aFilter = aFilters;
			this._updateFilterBar(aCaptions.join(", "));
			this._applyFilterSearch();
		},

		/**
		 * Event handler for the list selection event
		 * @param {sap.ui.base.Event} oEvent the list selectionChange event
		 * @public
		 */
		onSelectionChange: function(oEvent) {
			var oList = oEvent.getSource(),
				bSelected = oEvent.getParameter("selected");

			// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
			if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
				this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
			}
		},

		/**
		 * Event handler for the bypassed event, which is fired when no routing pattern matched.
		 * If there was an object selected in the master list, that selection is removed.
		 * @public
		 */
		onBypassed: function() {
			this._oList.removeSelections(true);
		},

		/**
		 * Call the Russound CAV6.6 and issue the "All Off" command.
		 * @public
		 */
		onAllOff: function(oEvent) {

			// Put up the busy overlay.
			sap.ui.core.BusyIndicator.show();

			let fnDone = function(oError) {
				// TODO - handle error.

				// Take down the busy overlay.
				sap.ui.core.BusyIndicator.hide()
			};

			this._oRussoundControl.turnAllZonesOff().then(function(aZones) {
				fnDone();
			}.bind(this)).catch(function(oError) {
				fnDone(oError);
			});
		},

		/**
		 * Used to create GroupHeaders with non-capitalized caption.
		 * These headers are inserted into the master list to
		 * group the master list's items.
		 * @param {Object} oGroup group whose text is to be displayed
		 * @public
		 * @returns {sap.m.GroupHeaderListItem} group header with non-capitalized caption.
		 */
		createGroupHeader: function(oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.text,
				upperCase: false
			});
		},

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser historz
		 * @public
		 */
		onNavBack: function() {
			history.go(-1);
		},



		/* =========================================================== */
		/*  List formatter methods                                     */
		/* =========================================================== */

		listItemFormatters: {
			status: function(sZoneId) {
				let sSource = "",
					sStatuses = "";
				if (sZoneId) {
					let mZone = this._oRussoundControl.getZones()[sZoneId];
					if (mZone) {
						let mSource = this._oRussoundControl.getSources()[mZone.zoneInfo.source];
						sSource = mSource ? mSource.name : "";

						let mAddons = {
							dnd: mZone.zoneInfo.DoNoDisturb ? 'DND' : '',
							shared: mZone.zoneInfo.sharedSource ? 'Shared' : '',
							party: mZone.zoneInfo.partyMaster
						};
						Object.values(mAddons).forEach((sValue) => {
							sStatuses += sValue ? sStatuses ? ", " + sValue : sValue : "";
						});
						if (sStatuses) {
							sStatuses = " (" + sStatuses + ")";
						}
					}
				}
				// return sSource + sStatuses;
				return sStatuses;
			},
			source: function(sSourceId) {
				let sSourceName = "";
				if (sSourceId) {
					let mSources = this._oRussoundControl.getSources();
					sSourceName = mSources[sSourceId] ? mSources[sSourceId].name : "";
				}
				return sSourceName;
			}
		},


		/* =========================================================== */
		/*  Internal (private) Methods                                 */
		/* =========================================================== */

		/**
		 * Called each time the master route was hit (empty hash).
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onMasterMatched: function(oEvent) {
		},

		/**
		 * Called each time the view is rendered.
		 * If there a navigation path to a Zone ID, then set the corresponding
		 * list item to 'selected'.
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onMasterDisplayed: function(oEvent) {
			let oSelectedItem = this._oList.getSelectedItem(),
				mParameters = oEvent.getParameter("data");

			if (!oSelectedItem && mParameters.hasOwnProperty("zoneId")) {
				let aListItems = this._oList.getItems().filter((oItem) => {
					let sZoneId = oItem.getBindingContextPath().split("/russound/zones/")[1];
					return sZoneId === mParameters.zoneId;
				});

				if (aListItems) {
					this._oList.setSelectedItem(aListItems[0]);
				}
			} else {
				this._oList.removeSelections();
			}
		},

		/**
		 * Shows the selected item on the detail page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showDetail: function(oItem) {
			var bReplace = !Device.system.phone,
				sZoneId = oItem.getBindingContextPath().split("/russound/zones/")[1];
			this.getRouter().navTo("object", {
				zoneId: sZoneId
			}, bReplace);
		},

		/**
		 * Sets the item count on the master list header to the total number of items on the list.
		 * @private
		 */
		_updateListItemCount: function() {
			var iTotalItems = this._oList.getItems().length,
				sTitle = this.getResourceBundle().getText("masterTitleCount", [iTotalItems]);
				
			this.getModel("masterView").setProperty("/title", sTitle);
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @private
		 */
		_applyFilterSearch: function() {
			var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter),
				oViewModel = this.getModel("masterView"),
				oItemsBinding = this._oList.getBinding("items");

			if (oItemsBinding) {
				oItemsBinding.filter(aFilters, "Application");
				// changes the noDataText of the list in case there are no filter results
				if (aFilters.length !== 0) {
					oViewModel.setProperty("/noDataText", this.getResourceBundle().getText("masterListNoDataWithFilterOrSearchText"));
				} else if (this._oListFilterState.aSearch.length > 0) {
					// only reset the no data text to default when no new search was triggered
					oViewModel.setProperty("/noDataText", this.getResourceBundle().getText("masterListNoDataText"));
				}
			}
		},

		/**
		 * Internal helper method to apply both group and sort state together on the list binding
		 * @param {sap.ui.model.Sorter[]} aSorters an array of sorters
		 * @private
		 */
		_applyGroupSort: function(aSorters) {
			this._oList.getBinding("items").sort(aSorters);
		},

		/**
		 * Internal helper method that sets the filter bar visibility property and the label's caption to be shown
		 * @param {string} sFilterBarText the selected filter value
		 * @private
		 */
		_updateFilterBar: function(sFilterBarText) {
			var oViewModel = this.getModel("masterView");
			oViewModel.setProperty("/isFilterBarVisible", (this._oListFilterState.aFilter.length > 0));
			oViewModel.setProperty("/filterBarLabel", this.getResourceBundle().getText("masterFilterBarText", [sFilterBarText]));
		}

	});
});
