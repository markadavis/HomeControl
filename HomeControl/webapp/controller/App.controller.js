sap.ui.define([
		"com/davis/homecontrol/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("com.davis.homecontrol.controller.App", {

			onInit : function () {
				// Bind up the local controls.
				this._oComponent = this.getOwnerComponent();

				// Set the App view model.
				let iOriginalBusyDelay = this.oView.getBusyIndicatorDelay();
				this.setModel(new JSONModel({
					busy : false,
					delay : iOriginalBusyDelay,
					originalDelay: iOriginalBusyDelay,
					selectedZone: {
						selectedSource: {}
					},
				}), "appView");

				// Bind the models.
				this._oModel = this._oComponent.getModel();
				this._oAppModel = this.getModel("appView");
				
				// Apply the content density styles to the root view.
				this.oView.addStyleClass(this._oComponent.getContentDensityClass());

				// Start the router once all of the Zone & Sourc metadata is loaded.
				this._oComponent._oRussoundControl.oZonesAndSourcesLoaded
				.then(function(oComp) {
					this._oComponent.getRouter().initialize();
				}.bind(this))
				.catch(function(oError) {
					console.error(oError.message || oError.responseText);
					this._oComponent.getRouter().initialize();
				}.bind(this));
			},

			setCurentZone(sZoneId) {
				if (!sZoneId) {
					this._oAppModel.setProperty("/selectedZone", {selectedSource: {}});
				} else {
					let mZone = this._oModel.getProperty("/russound/zones/" + sZoneId);
					mZone.selectedSource = this._oModel.getProperty("/russound/sources/" + mZone.zoneInfo.source);
					this._oAppModel.setProperty("/selectedZone", mZone);
				}
			},

			setCurentSource(sZoneId, sSourceId) {
				let mZone = this._oModel.getProperty("/russound/zones/" + sZoneId);
				mZone.selectedSource = this._oModel.getProperty("/russound/sources/" + sSourceId);
				this._oAppModel.setProperty("/selectedZone", mZone);
			},

			getCurrentZone() {
				return this._oAppModel.getProperty("/selectedZone");
			},

			getCurrentSource() {
				return this._oAppModel.getProperty("/selectedZone/selectedSource");
			}

		});

	}
);