sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
], function(UI5Object, ResourceModel, JSONModel) {
	"use strict";

	return UI5Object.extend("com.davis.homecontrol.lib.HDBaseTControl", {

		/* =========================================================== */
		/*  Lifecycle methods                                          */
		/* =========================================================== */

		/**
		 * Controll the HDBaseT Matrix Switch via it's built in web interface.
		 * @class
		 * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
		 * @public
		 * @alias com.davis.homecontrol.lib.HDBaseTControl
		 */
		constructor: function(oComponent) {
		    // Set the jQuery 'global' AJAX setttings.
			$.ajaxSetup({
				async: true,
			    cache: false,	// Disable caching of AJAX responses.
				timeout: 30000,	// 3 seconds
			});

			// Create and Set the 'i18n' resource model.
			this._oResourceBundle = new ResourceModel({
				bundleName: "com.davis.homecontrol.lib.i18n.i18n"
			}).getResourceBundle();

			if (oComponent) {
				// Assign the callers Component ID (if available).
				this._sComponentId = oComponent.getMetadata().getManifest().name;

				// Attach the default model
				this.attachModel(oComponent.getModel());
			} else {
				this._sComponentId = "com.davis.homecontrol.lib.RussoundControl";
				this.attachModel();
			}

			// Load the local model with the current HDBaseT Switch status.
			this.getAllZoneInfo().catch(function(oError) {
				// What to do ???
			});
		},



		/* =========================================================== */
		/*  Public methods                                             */
		/* =========================================================== */

		/**
		 * Attach the caller's model.
		 * @public
		 */
		attachModel: function(oModel) {
			if (oModel) {
				// Bind the caller's default model (if supplied).
				this._oModel = oModel;
			} else {
				// Otherwise, create a local model.
				this._oModel = new JSONModel({});
			}

			// Add the Russound metadata to the default model.
			this._oModel.setProperty("/hdbaset", {
				zones: {}
			});
		},

		/**
		 * Toggle a given Zone output's power (ON/OFF).
		 * @public
		 * @param {String} sZoneId
		 */
		toggleZoneOnOff: function(sZoneId) {
			return new Promise(function(fnResolove, fnReject) {

				this.getZoneInfo(sZoneId).then(function(mZoneInfo) {
					let sOnOff = mZoneInfo.powerStatus === "OFF" ? "ON" : "OFF";

					// Turn the HDBaseT Matrix zone (output) on/off.
					let sURI = "HDBaseTProxy/TimSendCmd.CGI?button=O" + sZoneId + sOnOff + '+' + Math.random();
					$.get(sURI, function(data) {
						fnResolove(data);
					}).fail(function(oError) {
						fnReject(oError);
					});	
				}).catch(function(oError) {
					fnReject(oError);
				});
	
			}.bind(this));
		},

		/**
		 * Set a given Zone output's power ON.
		 * @public
		 * @param {String} sZoneId
		 */
		setZonePowerOn: function(sZoneId) {
			return new Promise(function(fnResolove, fnReject) {
				// Turn ON the power for the given HDBaseT Matrix zone (output).
				let sURI = "HDBaseTProxy/TimSendCmd.CGI?button=O" + sZoneId + 'ON+' + Math.random();
				$.get(sURI, function(data) {
					fnResolove(data);
				}).fail(function(oError) {
					fnReject(oError);
				});
	
			}.bind(this));
		},

		/**
		 * Set a given Zone output's power OFF.
		 * @public
		 * @param {String} sZoneId
		 */
		setZonePowerOff: function(sZoneId) {
			return new Promise(function(fnResolove, fnReject) {
				// Turn OFF the power for the given HDBaseT Matrix zone (output).
				let sURI = "HDBaseTProxy/TimSendCmd.CGI?button=O" + sZoneId + 'OFF+' + Math.random();
				$.get(sURI, function(data) {
					fnResolove(data);
				}).fail(function(oError) {
					fnReject(oError);
				});
	
			}.bind(this));
		},

		/**
		 * Turn all zone's (outputs) ON.
		 * @public
		 */
		 setAllZonesOn: function() {
			return new Promise(function(fnResolove, fnReject) {

				this.getAllZoneInfo().then(function(mZones) {
					let aPromises = [],
						iDelay = 0;

					Object.keys(mZones).map(function(sZoneId) {
						(function () {
							setTimeout(function() {
								aPromises.push(this.setZonePowerOn(sZoneId));
							}.bind(this), iDelay);
						}.bind(this))();
						iDelay += 500;
					}.bind(this));

					Promise.all(aPromises).then(function(oResult) {
						fnResolove(oResult);
					}).catch(function(oError) {
						fnReject(oError);
					});
				}.bind(this)).catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		 },

		/**
		 * Turn all zone's (outputs) OFF.
		 * @public
		 */
		setAllZonesOff: function() {
			return new Promise(function(fnResolove, fnReject) {

				this.getAllZoneInfo().then(function(mZones) {
					let aPromises = [],
						iDelay = 0;

					Object.keys(mZones).map(function(sZoneId) {
						(function () {
							setTimeout(function(d) {
								aPromises.push(this.setZonePowerOff(sZoneId));
							}.bind(this), iDelay);
						}.bind(this))();
						iDelay += 500;
					}.bind(this));

					Promise.all(aPromises).then(function(oResult) {
						fnResolove(oResult);
					}).catch(function(oError) {
						fnReject(oError);
					});
				}.bind(this)).catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Set a given Zone's output to a given Source input.
		 * @public
		 * @param {String} sZoneId 
		 * @param {String} sSoureId 
		 */
		setZoneSource: function(sZoneId, sSourceId) {
			return new Promise(function(fnResolove, fnReject) {

				let sURI = "HDBaseTProxy/TimSendCmd.CGI?button=O" + sZoneId + "I" + sSourceId;
				$.get(sURI, function(data) {
					this._oModel.setProperty("/hdbaset/zones/" + sZoneId + "/activeSource", sSourceId);
					fnResolove(data);
				}.bind(this)).fail(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 *  Get the status of all zone (outputs) on the HDBaseT Matrix and update the local Model.
		 * @public
		 */ 
		getAllZoneInfo() {
			return new Promise(function(fnResolove, fnReject) {

				$.get("HDBaseTProxy/VIDDivSta.CGI?_" + Math.random(), function(data) {
					let sStatuses = data.split("VidSta=")[1],
						mZones = this._oModel.getProperty("/hdbaset/zones");

					if (sStatuses) {
						sStatuses.split('&').forEach((sStatus) => {
							let sZoneId = sStatus.substring(1,2),
								mZoneInfo = mZones.hasOwnProperty(sZoneId) ? mZones[sZoneId] : {
									activeSource: null,
									powerStatus: null
								};

							if (sStatus.indexOf("I") > 0) {
								mZoneInfo.activeSource = sStatus.substring(3);
							} else {
								mZoneInfo.powerStatus = sStatus.substring(2);
							}

							mZones[sZoneId] = mZoneInfo;
						});

						this._oModel.setProperty("/hdbaset/zones/", mZones); 
					}

					fnResolove(mZones);
				}.bind(this)).fail(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Get the zone (output) status specific to a given Zone ID.
		 * @param {String} sZoneId 
		 * @returns {Object} Zone specific information.
		 */
		getZoneInfo(sZoneId) {
			return new Promise(function(fnResolove, fnReject) {

				this.getAllZoneInfo().then(function(mZones) {
					let mZoneInfo = mZones.hasOwnProperty(sZoneId) ? mZones[sZoneId] : {
						activeSource: null,
						powerStatus: null
					};

					mZoneInfo.zoneId = sZoneId;

					fnResolove(mZoneInfo);
				}).catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		}



		/* =========================================================== */
		/*  Private methods                                            */
		/* =========================================================== */

	});
});