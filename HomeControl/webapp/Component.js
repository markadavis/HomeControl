sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"com/davis/homecontrol/lib/ErrorHandler",
	"com/davis/homecontrol/lib/RussoundControl",
	"com/davis/homecontrol/lib/HDBaseTControl"
], function (UIComponent, JSONModel, Device, ErrorHandler, RussoundControl, HDBaseTControl) {
	"use strict";

	return UIComponent.extend("com.davis.homecontrol.Component", {

		metadata: {
			manifest : "json"
		},

		APP_CONFIG: {
			"tabIcons": {
				"1" : "sap-icon://customize",
				"2" : "sap-icon://theater",
				"3" : "sap-icon://my-view",
				"4" : "sap-icon://it-instance",
				"5" : "sap-icon://home-share",
				"6" : "sap-icon://iphone"
			}
		},


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function() {
			// Create app's the default model.
			this.setModel(new JSONModel({
			}));

			// Construct the utility libraries
			this._oErrorHandler = new ErrorHandler(this);
			this._oRussoundControl = new RussoundControl(this);
			this._oHDBaseTControl = new HDBaseTControl(this);

		    // Set the jQuery 'global' AJAX setttings.
			$.ajaxSetup({
				async: true,
			    cache: false,	// Disable caching of AJAX responses.
				timeout: 3000,	// 3 seconds
			});

			// Create the Device model.
			this.setModel(this._createDeviceModel(), "device");

			/* MOVED TO APP CONTROLLER .init() */
			// // Create the views based on the url/hash.
			// this.getRouter().initialize();

			// Call the base component's init function and create the App view.
			UIComponent.prototype.init.apply(this, arguments);
		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, all of the constructed components are destroyed.
		 * @public
		 * @override
		 */
		destroy: function() {
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},



		/* =========================================================== */
		/* begin: helper methods                                       */
		/* =========================================================== */

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},



		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		_createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	});
});