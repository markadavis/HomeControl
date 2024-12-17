/*global location */
sap.ui.define([
	"com/davis/homecontrol/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"com/davis/homecontrol/model/formatter"
], function(BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("com.davis.homecontrol.controller.Detail", {

		formatter: formatter,


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			// Bind up the local controls.
			this._oComponent = this.getOwnerComponent();
			this._oApp = this._oComponent.byId("app").getController();
			this._oRussoundControl = this._oComponent._oRussoundControl;

			let iOriginalDelay = this.oView.getBusyIndicatorDelay();
			this.setModel(new JSONModel({
				busy: false,
				delay: iOriginalDelay,
				originalDelay: iOriginalDelay,
				title: this.getResourceBundle().getText("detailTitle"),
				subTitle: "",
				source: {},
				tabConfigs: [],
				tunerFrequencyChange: ""
			}), "detailView");

			// Bind the models.
			this._oModel = this._oComponent.getModel();
			this._oViewModel = this.getModel("detailView");

			//  Attach a click event to the Tunner's Viewport.
			let oViewport = this.oView.byId("detailTunnerViewport");
			oViewport.attachBrowserEvent("click", function(oEvent) {
				let oPanel = this.oView.byId("detailTunnerViewport"),
					oLabel = this.oView.byId("detailTunnerViewportLabel"),
					oInput = this.oView.byId("detailTunnerViewportInput");

				if (oLabel.getVisible()) {
					let sDigits = oLabel.getText().replace(/\D/g, '');

					this._oViewModel.setProperty("/tunerFrequencyChange", sDigits);
					this._oViewModel.refresh();
					oPanel.setVisible(false);
					oInput.setVisible(true);
				}
			}.bind(this));

			this.getRouter().getTarget("object").attachDisplay(this._onDetailDisplayed, this);
		},



		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onTabSelect: function(oEvent) {
			var oViewModel = this.getModel("detailView"),
				sZoneId = this._oApp.getCurrentZone().zoneInfo.zoneId,
				sSetSourceAction = "7",
				oTabBar = oEvent.getSource(),
				sSourceId = oTabBar.getSelectedKey();

			// Put up the busy overlay.
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/busy", true);

			let fnDone = function(oError) {
				if (oError) {
				// TODO - handle error.
				} else {
					// Set the selected source on the app controller.
					this._oApp.setCurentSource(sZoneId, sSourceId);
				}
				// Take down the busy overlay.
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));
			}.bind(this);

			this._oRussoundControl.setZone(sZoneId, sSetSourceAction, sSourceId)
			.then(function(mZoneInfo) {

				// Get the selected Source info.
				this._oRussoundControl.getSourceInfo(sSourceId)
				.then(function(sourceInfo) {
					// Set the selected Source.
					this._oApp.setCurentSource(sZoneId, sSourceId);

					// Open the radio control (for Source 1).
					let oLaunchPanel = this.oView.byId("detailAppLauncher");
					if (sSourceId === "1") {
						this.oView.byId("detailRadioTuner").setVisible(true);
						this.oView.byId("detailWallKeypad").setVisible(false);
						oLaunchPanel.setVisible(false);

						// Call the server to load the current Tunner display (aka station).
						this._oRussoundControl._loadTunerViewport().then((sText) => {
							// Do nothing
						}).catch((oError) => {
							// Do nothing
						});
					} else {
						this.oView.byId("detailRadioTuner").setVisible(false);
						this.oView.byId("detailWallKeypad").setVisible(true);

						// Show the App Launcher button (text & visibility).
						// Only show the button for tablet and phone devices.
						var mSystem = this._oComponent.getModel("device").getProperty("/system");
						if (mSystem.tablet || mSystem.phone) {
							var oLaunchBtn = this.oView.byId("detailSourceRemoteBtn"),
								mSource = this._oRussoundControl.getSource(sSourceId),
								sName = mSource.name,
								sText = this.getResourceBundle().getText("detailSourceLaunch", [sName]),
								bVisible = ["2","3","6"].filter(function(sId) {
									return sId === sSourceId;
								}).length > 0 ? true : false;

							oLaunchBtn.setText(sText);
							oLaunchPanel.setVisible(bVisible);
						} else {
							oLaunchPanel.setVisible(false);
						}
					}

					fnDone();
				}.bind(this))
				.catch(function(oError) {
					fnDone(oError);
				});

			}.bind(this))
			.catch(function(oError) {
				fnDone(oError);
			});
		},

		/**
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onMute: function(oEvent) {
			var sZoneId = this._oApp.getCurrentZone().zoneInfo.zoneId,
				mZone = this._oRussoundControl.getZone(sZoneId),
				sAction = "50",
				sValue = "13";

			this._oRussoundControl.sendCommand({
				controllerId: mZone.controller,
				zoneId: mZone.zone,
				action: sAction,
				value: sValue
			})
			.catch((oError) => {
				// TODO - handle error.
			})
		},

		/**
		 * @param {object} oEvent an event containing the value
		 * @public
		 */
		onTunnerValueChange: function(oEvent) {
			let oInput = this.oView.byId("detailTunnerViewportInput");

			if (oInput.getVisible()) {
				let mZone = this._oApp.getCurrentZone(),
					oPanel = this.oView.byId("detailTunnerViewport"),
					oLabel = this.oView.byId("detailTunnerViewportLabel"),
					sNewValue = oEvent.getParameter("value") !== undefined ? oEvent.getParameter("value") : oEvent.getParameter("_userInputValue");

				if (sNewValue) {
					this._oRussoundControl.setTunnerStation(mZone, sNewValue)
					.then(function(sNewText) {
						//oLabel.setText(sNewText);
					}.bind(this))
					.catch(function(oError) {
						// TODO handle error.
					});
				}
				oPanel.setVisible(true);
				oInput.setVisible(false);
			}
		},

		/**
		 * Change the value on the Russound CAV6.6 controller from a Slider Control
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onSliderChange: function(oEvent) {
			var oViewModel = this.getModel("detailView"),
				sZoneId = this._oApp.getCurrentZone().zoneInfo.zoneId,
				mZone = this._oRussoundControl.getZone(sZoneId),
				sName = oEvent.getSource().getName(),
				sValue = oEvent.getParameter("value"),
				sAction = "";

			// Put up the busy overlay.
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/busy", true);

			let fnDone = function(oError) {
				// TODO - handle error.

				// Take down the busy overlay.
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));
			};

			switch (sName) {
				case "volume" :
					sAction = "2";
					break;
				case "balance" :
					sAction = "3";
					break;
				case "bass" :
					sAction = "4";
					break;
				case "treble" :
					sAction = "5";
					break;
				default :
					break;
			}

			if (sAction) {
				this._oRussoundControl.sendCommand({
					controllerId: mZone.controller,
					zoneId: mZone.zone,
					action: sAction,
					value: sValue
				})
				.then(function(sResponse) {
					fnDone();
				}.bind(this))
				.catch(function(oError) {
					fnDone(oError);
				});
			}
		},

		/**
		 * Change the value on the Russound CAV6.6 controller from a Switch Control
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onSwitchChange: function(oEvent) {
			var oViewModel = this.getModel("detailView"),
				sZoneId = this._oApp.getCurrentZone().zoneInfo.zoneId,
				mZone = this._oRussoundControl.getZone(sZoneId),
				sName = oEvent.getSource().getName(),
				sValue = oEvent.getParameter("state") ? "1" : "0",
				sAction = "";

			// Put up the busy overlay.
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/busy", true);

			let fnDone = function(oError) {
				// TODO - handle error.

				// Take down the busy overlay.
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));
			};

			switch (sName) {
				case "power" :
					sAction = "1";
					break;
				case "loudness" :
					sAction = "6";
					break;
				case "doNotDisturb" :
					sAction = "8";
					break;
				case "partyMode" :
					sAction = "9";
					break;
				default :
					break;
			}

			if (sAction) {
				this._oRussoundControl.sendCommand({
					controllerId: mZone.controller,
					zoneId: mZone.zone,
					action: sAction,
					value: sValue
				})
				.then(function(sResponse) {
					// If powering up the Zone, refresh the zone & source info.
					// this._oRussoundControl.getZoneInfo(mZone.zoneInfo.zoneId)
					// .then(function(mZone) {

						this._oRussoundControl.getSourceInfo(mZone.zoneInfo.source)
						.then(function(mSource) {
							fnDone();
						})
						.catch(function(oError) {
							fnDone(oError);
						});

					// }.bind(this))
					// .catch(function(oError) {
					// 	fnDone(oError);
					// });
				}.bind(this))
				.catch(function(oError) {
					fnDone(oError);
				});
			}
		},

		/**
		 * Change the value on the Russound CAV6.6 controller from a Keypad Button press.
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onNumberPadPress: function(oEvent) {
			var mZone = this._oApp.getCurrentZone(),
				sName = oEvent.getParameter("id").split("homecontrol---detail--")[1],
				sAction = "50",
				sValue = "";

			switch (sName) {
				case "numeric0" :
					sValue = "10";
					break;
				case "numeric1" :
					sValue = "1";
					break;
				case "numeric2" :
					sValue = "2";
					break;
				case "numeric3" :
					sValue = "3";
					break;
				case "numeric4" :
					sValue = "4";
					break;
				case "numeric5" :
					sValue = "5";
					break;
				case "numeric6" :
					sValue = "6";
					break;
				case "numeric7" :
					sValue = "7";
					break;
				case "numeric8" :
					sValue = "8";
					break;
				case "numeric9" :
					sValue = "9";
					break;
				case "numericX" :
					sValue = "17";	// Enter
					break;
				case "numericMute" :
					sAction="28";	// Tunner mute
					sValue = "1";
					break;
				default :
					break;
			}
	
			if (sAction) {
				this._oRussoundControl.sendCommand({
					controllerId: mZone.controller,
					zoneId: mZone.zoneInfo.zoneId,
					action: sAction,
					value: sValue
				})
				.then(function(sResponse) {
					// TODO - use busy overlay here ???
				}.bind(this))
				.catch(function(oError) {
					// TODO - handle error.
				});
			}
		},

		/**
		 * Change the value on the Russound CAV6.6 controller from a Keypad Button press.
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onKeypadPress: function(oEvent) {
			var mZone = this._oApp.getCurrentZone(),
				sName = oEvent.getParameter("id").split("homecontrol---detail--")[1],
				sValue = "",
				sAction = "";

			switch (sName) {
				case "kepadF1" :	// Not curently used
					sAction = "";
					sValue = ""
					break;
				case "kepadF2" :	// Not curently used
					sAction = "";
					sValue = ""
					break;
				case "kepadUp" :
					sAction = "23";
					sValue = "1"
					break;
				case "kepadPause" :
					sAction = "8";
					break;
				case "kepadLeft" :
					sAction = "21";
					sValue = "1"
					break;
				case "kepadPlay" :
					sAction = "28";
					sValue = "1"
					break;
				case "kepadRight" :
					sAction = "22";
					sValue = "1"
					break;
				case "kepadStop" :
					sAction = "9";
					break;
				case "kepadDown" :
					sAction = "24";
					sValue = "1"
					break;
				default :
					break;
			}

			if (sAction) {
				this._oRussoundControl.sendCommand({
					controllerId: mZone.controller,
					zoneId: mZone.zoneInfo.zoneId,
					action: sAction,
					value: sValue
				})
				.then(function() {
					setTimeout(function() {
						// Reload the Soure info by calling the Russound TCH1 server.
						this._oRussoundControl.getSourceInfo(mZone.zoneInfo.source)
						.then(function(mSourceInfo) {
							// TODO - use busy overlay here ???
						}.bind(this))
						.catch(function(oError) {
							// TODO - handle error.
						});
					}.bind(this), 250);
				}.bind(this))
				.catch(function(oError) {
					// TODO - handle error.
				});
			}
		},

		/**
		 * @param {object} oEvent an event containing the new volume value
		 * @public
		 */
		onLaunchApp: function(oEvent) {
			var oTabBar = this.oView.byId("iconTabBar"),
				sSourceId = oTabBar.getSelectedKey(),
				sURI = "";

			switch (sSourceId) {
				case "2" :
					sURI = "roku://";
					break;
				case "3" :
					sURI = "remote://";
					break;
				case "6" :
					sURI = "music://";
					break;
				default :
					break;
			}

			if (sURI) {
				window.location = sURI;
			}
		},



		/* =========================================================== */
		/* begin: helper methods                                       */
		/* =========================================================== */

		/**
		 * Deterimine the icon to use for a given IconTab "name".
		 * @public
		 */
		helperFunc: function() {},



		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onDetailDisplayed: function(oEvent) {
			var oViewModel = this.getModel("detailView"),
				oDeviceModel = this._oComponent.getModel("device"),
				sZoneId = oEvent.getParameter("data").zoneId,
				mZone = this._oRussoundControl.getZone(sZoneId);

			if (!mZone) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				return;
			}

			// Update the Detail "State" model.
			oViewModel.setProperty("/title", mZone.name);
			oViewModel.setProperty("/subTitle", this.getResourceBundle().getText("detailSubTitle", [mZone.controller, mZone.zone]));
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/busy", true);

			// For phone device types we should colapse the Audio Controls panel each time in.
			// if (oDeviceModel.getProperty("/system/phone")) {
			// 	this.oView.byId("detailAudioControlPanel").setExpanded(false);
			// } else {
			// 	this.oView.byId("detailAudioControlPanel").setExpanded(true);
			// }

			// Bind the selected zone to the detail view.
			this.oView.bindElement({path: "/russound/zones/" + sZoneId})

			// Refresh the Zone Info for the selected Zone.
			this._oRussoundControl.getZoneInfo(sZoneId).then(function(mZoneInfo) {

				// Set the 'mobile' device view items appropriately.
				let mSources = this._oRussoundControl.getSources(),
					mSystem = oDeviceModel.getProperty("/system");
				if (mSystem.tablet || mSystem.phone) {
					var oLaunchPanel = this.oView.byId("detailAppLauncher"),
						oLaunchBtn = this.oView.byId("detailSourceRemoteBtn"),
						sName = mSources[mZone.zoneInfo.source].name,
						sText = this.getResourceBundle().getText("detailSourceLaunch", [sName]),
						bVisible = ["2","3","6"].filter(function(sId) {
							return sId === mSources.sourceId;
						}).length > 0 ? true : false;

					oLaunchBtn.setText(sText);
					oLaunchPanel.setVisible(bVisible);
				}

				// Set the IconTabBar config on the Detail View model.
				let aTabs = [];
				Object.keys(mSources).forEach(function(sSourceId) {
					aTabs.push({
						"id": sSourceId,
						"text": mSources[sSourceId].name,
						"icon": this._oComponent.APP_CONFIG.tabIcons[sSourceId] 
					});
				}.bind(this));
				oViewModel.setProperty("/tabConfigs", aTabs);

				// Set the current Tab (source).
				this.oView.byId("iconTabBar").setSelectedKey(mZone.zoneInfo.source);

				// Set the selected Zone on the app controller.
				this._oApp.setCurentZone(mZone.zoneInfo.zoneId);

				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));	

			}.bind(this))
			.catch(function(oError) {
				// TODO - handle error.

				// Remove the selected Zone on the app controller.
				this._oApp.setCurentZone();

				// Remove the busy overlay.
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", oViewModel.getProperty("/originalDelay"));
			}.bind(this));
		}

	});
});
