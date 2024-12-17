sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
], function(UI5Object, ResourceModel, JSONModel) {
	"use strict";

	return UI5Object.extend("com.davis.homecontrol.lib.RussoundControl", {

		/* =========================================================== */
		/*  Lifecycle methods                                          */
		/* =========================================================== */

		CONFIG: {
			"videoZones": [
				{"controller" : "1", "zone" : "1", "videoZone" : "1"},	// Family Room
				{"controller" : "2", "zone" : "1", "videoZone" : "3"},	// Theater
				{"controller" : "1", "zone" : "2", "videoZone" : "2"},	// Mstr Bedroom
				{"controller" : "2", "zone" : "4", "videoZone" : "4"}	// Office
			]
		},

		/**
		 * Controll the Russound Zone Audio (serial) controller via the TCH1 web interface.
		 * @class
		 * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
		 * @public
		 * @alias com.davis.homecontrol.lib.RussoundControl
		 */
		constructor: function(oComponent) {
		    // Set the jQuery 'global' AJAX setttings.
			$.ajaxSetup({
				async: true,
			    cache: false,	// Disable caching of AJAX responses.
				timeout: 3000,	// 3 seconds
			});

			// Create and Set the 'i18n' resource model.
			this._oResourceBundle = new ResourceModel({
				bundleName: "com.davis.homecontrol.lib.i18n.i18n"
			}).getResourceBundle();

			if (oComponent) {
				this._sComponentId = oComponent.getMetadata().getManifest().name;

				// Attach the default model
				this._attachModel(oComponent.getModel());
			} else {
				this._sComponentId = "com.davis.homecontrol.lib.RussoundControl";
				this._attachModel();
			}

			// Load the configured Zone information from the server (onece per session).
			this.oZonesAndSourcesLoaded = new Promise((fnResolve, fnReject) => {

				// Load all of the Zone Metadata from the Russound TCH1 server.
				this._loadZonesMetaData()
				.then(function(mZones) {

					// Refresh all of the Zone info before loading the info.
					this._refreshAllZones().then(function(aResponses) {

						// Load the Zone status for each Zone retunred.
						this.getAllZonesInfo().then(function(mZoneInfos) {

							// Load all of the Source info.
							this._loadSourcesMetaData()
							.then(function(mSourceInfos) {
								let aSourcePromises = [];

								// Load Source status for each Source returned.
								this.getAllSourcesInfo().then(function(mSourceInfos) {
									fnResolve();;
								})
								.catch((oError) => {
									fnReject(oError);
								});

							}.bind(this))
							.catch(function(oError) {
								fnReject(oError);
							})


						}.bind(this))
						.catch(function(oError) {
							fnReject(oError);
						});

					}.bind(this))
					.catch(function(oError) {
						fnReject(oError);
					});

				}.bind(this))
				.catch(function(oError) {
					fnReject(oError);
				});

			}, (oError) => {
				fnReject(oError);
			});

		},



		/* =========================================================== */
		/*  Public methods                                             */
		/* =========================================================== */

		/* --------- */
		/*  GETters  */
		/* --------- */

		/**
		 * Return all of the Zone information currently stored in the model.
		 * @public
		 * @returns {Object}  A map of the metadata for all of the Zones.
		 */
		getZones: function() {
			return this._oModel.getProperty("/russound/zones");
		},

		/**
		 * Return the Zone information stored in the model for the given Zone ID.
		 * @public
		 * @returns {Object}  A map of the metadata for the Zone of the given Zone ID.
		 */
		getZone: function(sZoneId) {
			return this._oModel.getProperty("/russound/zones/" + sZoneId);
		},

		/**
		 * Call the Russound TCH1 server to load the Zone information for all Zones.
		 * @returns {Promise}  Resolved/Rejected based on result.
		 */
		getAllZonesInfo: function() {
			return new Promise(function(fnResolve, fnReject) {

				let mZones = this.getZones(),
					oPromise = Promise.resolve(),
					mZonesInfos = {};

				Object.keys(mZones).forEach((sZoneId) => {
					oPromise = oPromise.then((mZoneInfo) => {
						if (mZoneInfo) { mZonesInfos[mZoneInfo.zoneInfo.zoneId] = mZoneInfo; }
						return this.getZoneInfo(sZoneId);
					});
				}, this);

				oPromise.then((mZoneInfo) => {
					mZonesInfos[mZoneInfo.zoneInfo.zoneId] = mZoneInfo;
					fnResolve(mZonesInfos);
				}).catch((oError) => {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Call the Russound TCH1 server to load the Zone information for the given Zone ID.
		 * @public
		 * @param {String} sZoneId  The internal Zone ID (this is not the TCH1 zone).
		 * @returns {Promise}  Resolved/Rejected based on result.
		 */
		getZoneInfo: function(sZoneId) {
			return new Promise(function(fnResolve, fnReject) {

				this._loadZoneStatus(sZoneId)
				.then(function(mZone) {
					fnResolve(mZone);
				}).catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Return all of the Source information currently stored in the model.
		 * @public
		 * @returns {Object}  A map of the metadata for all Sources.
		 */
		getSources: function() {
			return this._oModel.getProperty("/russound/sources/");
		},

		/**
		 * Return the Source information stored in the model for the given Source ID.
		 * @public
		 * @returns {Object}  A map of the metadata for the Source of the given Source ID.
		 */
		getSource: function(sSourceId) {
			return this._oModel.getProperty("/russound/sources/" + sSourceId);
		},

		/**
		 * Call the Russound TCH1 server to load the Source information for all Sources.
		 * @returns {Promise}  Resolved/Rejected based on result.
		 */
		getAllSourcesInfo: function() {
			return new Promise(function(fnResolve, fnReject) {

				let mSources = this.getSources(),
					oPromise = Promise.resolve(),
					mSourcesInfos = {};

				Object.keys(mSources).forEach((sSourceId) => {
					oPromise = oPromise.then((mSourceInfo) => {
						if (mSourceInfo) { mSourcesInfos[mSourceInfo.sourceInfo.sourceId] = mSourceInfo; }
						return this.getSourceInfo(sSourceId);
					});
				}, this);

				oPromise.then((mSourceInfo) => {
					mSourcesInfos[mSourceInfo.sourceInfo.sourceId] = mSourceInfo;
					fnResolve(mSourcesInfos);
				}).catch((oError) => {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Call the Russound TCH1 server to load the Sourxce information for the given Source ID.
		 * @public
		 * @param {String} sSourceId  The internal SourceI ID (this is the saem TCH1 source).
		 * @returns {Promise}  Resolved/Rejected based on result.
		 */
		getSourceInfo: function(sSourceId) {
			return new Promise(function(fnResolve, fnReject) {

				this._loadSourceStatus(sSourceId)
				.then(function(mSource) {
					fnResolve(mSource);
				})
				.catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},


		/* --------- */
		/*  SETters  */
		/* --------- */

		/**
		 * Execute an action for a give Zone (controller + zone) of the Russound TCH1 server.
		 * @public
		 * @param {String} sZoneId  The internal Zonde ID (this is not the TCH1 zone).
		 * @param {String} sAction  The Action value.
		 * @param {String} sValue  The Action Modifier value.
		 * @returns {Promise}  Resolved/Rejected based on result.
		 */
		setZone: function(sZoneId, sAction, sValue) {
			return new Promise(function(fnResolve, fnReject) {
				let mZone = this._oModel.getProperty("/russound/zones/" + sZoneId);

				this.sendCommand({
					controllerId: mZone.controller,
					zoneId: mZone.zone,
					action: sAction,
					value: sValue
				})
				.then(function(sResponse) {

					fnResolve(mZone);

					// this.getZoneInfo(sZoneId).then(function(mZone) {
					// 	fnResolve(mZone);
					// }).catch(function(oError) {
					// 	fnReject(oError);
					// });

				}.bind(this))
				.catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Set a new value for the Tunner's station.
		 * @param {Map} mZone  The Zone info of the calling Zone.
		 * @param {*} sValue  The value of the station to be set.
		 * @returns {Promise}  Resolved/Rejected based on result.
		 */
		setTunnerStation(mZone, sValue) {
			return new Promise(function(fnResolve, fnReject) {
				let oPromise = Promise.resolve(),
					iDelay = 500,
					aResponses = [],
					sDigits = sValue.replace(/\D/g, '');

				for (var i = 0; i < sDigits.length; i++) {
					let sDigit = sDigits[i];

					// Convert zero to ten.
					sDigit = sDigit === "0" ? "10" : sDigit;

					// Send the dight to the Russound TCH1 server.
					oPromise = oPromise.then((sResponse) => {
						if (sResponse) { aResponses.push(sResponse); }
						return this.sendCommand({
							controllerId: mZone.controller,
							zoneId: mZone.zoneInfo.zoneId,
							action: "50",		// Keypad Number
							value: sDigit,		// Number
							delay: iDelay		// delay between calls
						});
					});
				}

				// Send the 'enter' key.
				oPromise = oPromise.then((sResponse) => {
					if (sResponse) { aResponses.push(sResponse); }
					return this.sendCommand({
						controllerId: mZone.controller,
						zoneId: mZone.zoneInfo.zoneId,
						action: "50",		// Keypad Number
						value: "17",		// Enter Key
						// value: "11",		// Enter Tunner value
						delay: iDelay		// delay between calls
					})
				});
				
				oPromise.then(function(sResponse) {
					aResponses.push(sResponse);

					// Load the Tuned value from the TCH1 server.
					this._loadTunerViewport(iDelay)
					.then((sText) => {
						fnResolve(sText);
					}).catch((oError) => {
						fnReject(oError);
					});	

				}.bind(this))
				.catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Set a callback in the future to load the Zone information from the Russound TCH1 server.
		 * 	(The TCH1 server talks to the CAV6.6 controller).
		 * @public
		 * @param {Integer} iTimer  Number of mili-seconds between refreshes.
		 */
		setZoneRefreshTimer: function(iTimer) {
			var iTimeOut = iTimer ? iTimer : 2000/*default 2 seconds*/;

			// Cancel any running 'refresh' timer event.
			if (this._iZoneRefresherId) {
				clearInterval(this._iZoneRefresherId);
			}

			// Set the callback interval.
			this._iZoneRefresherId = setInterval(function() {
				var mZones = this._oModel.getProperty("/russound/zones");

				// Call "Refresh" on all of the Russound CAV6.6 zones and update the model data.
				Object.keys(mZones).forEach((sZoneId) => {
					this._refreshZone(sZoneId);
				}, this);
			}.bind(this), iTimeOut);
		},


		/* -------------- */
		/*  Send Commands */
		/* -------------- */

		/**
		 * Execute the "All Zones Off" action on the Russound TCH1 server.
		 * 	(the TCH1 server talks to the CAV6.6 controller)
		 * @public
		 * * @returns {Promise}  Resolved/Rejected based on results of the command execution.
		 */
		turnAllZonesOff: function() {
			return new Promise(function(fnResolve, fnReject) {		

				this.sendCommand({
					controllerId: "1"	/*Primary Controller*/,
					zoneId: "0"			/*All zones*/,
					action: "1"			/*Set Power*/,
					value: "0"			/*Off*/
				}).then(function(response) {

					// Tell the TCH1 to reload the Zone info from the CAM6.6.
					// (wait for the CAM6.6 to complete truning all zones off)
					this._refreshAllZones(1000/*delay*/).then(function(aResponses) {
						let oPromise = Promise.resolve(),
							aZones = [];

						//  Load all of the Zone statuses (in series).
						Object.keys(this.getZones()).forEach((sZoneId) => {
							oPromise = oPromise.then((mZone) => {
								if (mZone) { aZones.push(mZone); }
								return this.getZoneInfo(sZoneId);
							});
						}, this);

						oPromise.then((mZone) => {
							aZones.push(mZone);
							fnResolve(aZones);
						}).catch((oError) => {
							fnReject(oError);
						});

					}.bind(this))
					.catch(function(oError) {
						fnReject(oError);
					});

				}.bind(this))
				.catch(function(oError) {
					fnReject(oError);
				});

			}.bind(this));
		},

		/**
		 * Send a command to the Russound controller.
		 * @public
		 * @param {Map} mParams  map of the controller command parameters.
		 * 	{
		 * 		controllerId  is the controller to send the action to
		 * 		zoneId	is the zone on the controller receiving the action
		 * 		action	is the action to be sent to the controller's zone
		 * 		value	is the action value modifier
		 * 		delay	(optional) is the number of miliseconds to wait before sending
		 * 	} 
		 * @returns {Promise}  Resolved/Rejected based on results of the command execution.
		 */
		sendCommand: function(mParams) {
			return new Promise(function(fnResolve, fnReject) {
				let iDelay = mParams.hasOwnProperty("delay") ? parseInt(mParams.delay, 10) : 0;

				// controllertype=1 : - is for the CAA6, CAM6 or CAV6 controllers - otherwise it is 2.
				let sURI = "russoundProxy/cgi-bin/control?action=~4&zoneid=~3&value=~5&controllerid=~2&controllertype=1";

				sURI = sURI.replace("~2", mParams.controllerId)
							.replace("~3", mParams.zoneId)
							.replace("~4", mParams.action)
							.replace("~5", mParams.value);

				setTimeout(function() {
					$.ajax({
						url: sURI,
						success: function(sResposne) {
							// Tell the TCH1 to refresh the Zone's info (from the CAM6.6).
							if (mParams.action !== "100"/*refresh zone*/ && mParams.action !== "50"/*Keypad*/) {
								this._refreshZone(mParams.zoneId, 500/*delay*/)
								.then((sRefreshResposne) => {
									fnResolve(sResposne);
								})
								.catch((oError) => {
									fnReject(oError);
								});
							} else {
								fnResolve(sResposne);
							}
						}.bind(this),
						error: function(oError) {
							fnReject(oError);
						}
					});
				}.bind(this), iDelay || 0);

			}.bind(this));
		},



		/* =========================================================== */
		/*  Private methods                                            */
		/* =========================================================== */

		/**
		 * Attach the caller's model if one was given.  Otherwise, create a loca version.
		 * 	NOTE:
		 * 		The (new or caller's) model will have 'zones' and 'sources' objects add
		 * 		to the model's JSON.
		 * @private
		 * @param {sap.ui.model.json.JSONModel} oModel  The Russound TCH1 Source ID.
		 */
		 _attachModel: function(oModel) {
			if (oModel) {
				// Bind the caller's default model (if supplied).
				this._oModel = oModel;
			} else {
				// Otherwise, create a local model.
				this._oModel = new JSONModel({});
			}

			// Add the Russound metadata to the default model.
			this._oModel.setProperty("/russound", {
				zones: {},
				sources: {}
			})
		},

		/**
		 * Load all of the Zone's header information from the TCH1 server
		 * (The TCH1 comunicates with the Russound CAM6.6).
		 * 	NOTE:
		 * 		The Zone header data should not change and only needs to be
		 * 		called once per session.
		 * @private
		 * @returns {Promise}  Resolved/Rejected based on results of the AJAX call.
		 */
		_loadZonesMetaData: function() {
			return new Promise(function(fnResolve, fnReject) {
				let oModel = this._oModel;

				$.ajax({
					async: false,
					url: "russoundProxy/cgi-bin/zoneinfo",
					success: function(data) {
						let mZones = {};

						// Parse the response to build the zone header.
						$(data).find('ZONESTATUS').each(function() {
							$(this).find("ZONE").each(function() {
								let sZoneId = "";
								$(this).find("ZONENUMBER").each(function() {
									sZoneId = $(this).text();	
								});
								let sName = "";
								$(this).find("ZONENAME").each(function() {
									sName = $(this).text();
								});
								let sControllerId = "";
								$(this).find("CONTROLLERID").each(function() {
									sControllerId = $(this).text();
								});
								let sZoneKey = parseInt(sZoneId) + ((parseInt(sControllerId) -1) * 6);

								mZones[sZoneKey] = {
									controller: sControllerId,
									zone: sZoneId,
									name: sName
								};

								// Create the zone detail info if it dones not exist.
								let mExistingZone = oModel.getProperty("/russound/zones/" + sZoneKey);
								if (mExistingZone) {
									// Add in the existing zone detail info.
									mZones[sZoneKey].zoneInfo = mExistingZone.zoneInfo;
								} else {
									mZones[sZoneKey].zoneInfo = {
										"zoneId": sZoneKey,
										"power": false,
										"source": "",
										"volume": "",
										"bass": "",
										"treble": "",
										"loudness": false,
										"balance": "",
										"onState": "",
										"sharedSource": false,
										"partyMode": false,
										"partyMaster": "",
										"DoNoDisturb": false
									};
								}

								// Update the Zone's' model property.
								oModel.setProperty("/russound/zones/" + sZoneKey, mZones[sZoneKey]);
							});
						});

						fnResolve(mZones);
					}.bind(this),
					error: function(oError) {
						fnReject(oError);
					}
				});
			
			}.bind(this));
		},

		/**
		 * Load all of the Sources's header information from the TCH1 server
		 * (The TCH1 comunicates with the Russound CAM6.6).
		 * 	NOTE:
		 * 		The Source header data should not change and only needs to be
		 * 		called once per session.
		 * @private
		 * @returns {Promise}  Resolved/Rejected based on results of the AJAX call.
		 */
		 _loadSourcesMetaData: function() {
			return new Promise(function(fnResolve, fnReject) {
				let oModel = this._oModel;

				$.ajax({
					async: false,
					url: "russoundProxy/cgi-bin/sourceinfo",
					success: function(data) {
						var mSources = {};
						$(data).find('SOURCEINFORMATION').each(function() {
							$(this).find("SOURCE").each(function() {
								let sName;
								$(this).find("SOURCENAME").each(function() {
									sName = $(this).text();
								});
								let sType;
								$(this).find("SOURCETYPE").each(function() {
									sType = $(this).text();
								});
								let sSourceId;
								$(this).find("SOURCEID").each(function() {
									sSourceId = $(this).text();
								});

								mSources[sSourceId] = {
									type: sType,
									name: sName
								};

								// Create the source if it dones not exist.
								let mExistingSource = oModel.getProperty("/russound/sources/" + sSourceId);
								if (mExistingSource) {
									// Add in the existing Source detail info.
									mSources[sSourceId].sourceInfo = mExistingSource.sourceInfo;
								} else {
									mSources[sSourceId].sourceInfo = {
										"sourceId" : sSourceId,
										"metadata1": "",
										"metadata2": "",
										"channel": "",
										"album": "",
										"ipodAlbum": "",
										"smsTheme": "",
										"tunerFrequency": "",
										"ipodPlaylist": "",
										"displayMessage": ""
									};
								}

								// Update the Source's model property.
								oModel.setProperty("/russound/sources/" + sSourceId, mSources[sSourceId]);
							});
						});

						fnResolve(mSources);
					}.bind(this),
					error: function(oError) {
						fnReject(oError);
					}
				});
			}.bind(this));
		},

		/**
		 * Call the Russound TCH1 to retrieve the given Zone's metadata (via XML).
		 * @private
		 * @param {String} sZoneId  The internal Zone ID (this is not the TCH1 zone).
		 * @returns {Promise}  Resolved/Rejected based on results of the AJAX call.
		 */
		_loadZoneStatus: function(sZoneId) {
			return new Promise(function(fnResolve, fnReject) {
				let oModel = this._oModel,
					mZone = oModel.getProperty("/russound/zones/" + sZoneId)

				$.ajax({
					url: "russoundProxy/zonedata/controller_" + mZone.controller +"_zone_" + mZone.zone +".xml",
					success: function(data) {
						var mZoneInfo = {
							"zoneId": sZoneId,
							"power": false,
							"source": "",
							"volume": "",
							"bass": "",
							"treble": "",
							"loudness": false,
							"balance": "",
							"onState": "",
							"sharedSource": false,
							"partyMode": false,
							"partyMaster": "",
							"DoNoDisturb": false
						};

						$(data).find('ZONEINFORMATION').each(function() {
							$(this).find("POWER").each(function() {
								mZoneInfo.power = $(this).text() === "0" ? false : true;
							});
							$(this).find("SOURCE").each(function() {
								mZoneInfo.source = $(this).text();
								mZoneInfo.source = (parseInt(mZoneInfo.source) + 1).toString();
							});
							$(this).find("VOLUME").each(function() {
								mZoneInfo.volume = parseInt($(this).text());
							});
							$(this).find("BASS").each(function() {
								mZoneInfo.bass = parseInt($(this).text());
							});
							$(this).find("TREBLE").each(function() {
								mZoneInfo.treble = parseInt($(this).text());
							});
							$(this).find("LOUDNESS").each(function() {
								mZoneInfo.loudness = $(this).text() === "0" ? false : true;
							});
							$(this).find("BALANCE").each(function() {
								mZoneInfo.balance = parseInt($(this).text());
							});
							$(this).find("ONSTATE").each(function() {
								mZoneInfo.onState = $(this).text() === "0" ? false : true;
							});
							$(this).find("SHAREDSOURCE").each(function() {
								mZoneInfo.sharedSource = $(this).text() === "0" ? false : true;
							});
							$(this).find("PARTYMODE").each(function() {
								var sPartyMode = $(this).text();
								mZoneInfo.partyMode = sPartyMode === "0" ? false : true;
								mZoneInfo.partyMaster = sPartyMode === "1" ? "Slave" : sPartyMode === "2" ? "Master" : "";
							});
							$(this).find("DND").each(function() {
								mZoneInfo.DoNoDisturb = $(this).text() === "0" ? false : true;
							});
						});

						// Update the Zone Info on the default model.
						mZone.zoneInfo = mZoneInfo;
						oModel.setProperty("/russound/zones/" + sZoneId, mZone);
						oModel.refresh();

						fnResolve(mZone);
					}.bind(this),
					error: function(oError) {
						fnReject(oError);
					}
				});

			}.bind(this));
		},

		/**
		 * Call the Russound TCH1 to retrieve the given Source's metadata (via XML).
		 * @private
		 * @param {String} sSourceId  The internal Source ID (same as the Russound TCH1 Source ID).
		 * @returns {Promise}  Resolved/Rejected based on results of the AJAX call.
		 */
		_loadSourceStatus: function(sSourceId) {
			return new Promise(function(fnResolve, fnReject) {
				let mSourceMetadata = {
					"sourceId" : sSourceId,
					"metadata1": "",
					"metadata2": "",
					"channel": "",
					"album": "",
					"ipodAlbum": "",
					"smsTheme": "",
					"tunerFrequency": "",
					"ipodPlaylist": "",
					"displayMessage": ""
				};

				$.ajax({
					url: "russoundProxy/metadata/metadata_source_" + sSourceId +".xml",
					success: function(data) {
			
						$(data).find('METADATA').each(function() {
							$(this).find("METADATA_1").each(function() {
								mSourceMetadata.metadata1 = $(this).text();
							});
							$(this).find("METADATA_2").each(function() {
								mSourceMetadata.metadata2 = $(this).text();
							});
							$(this).find("CHANNEL").each(function() {
								mSourceMetadata.channel = $(this).text();
							});
							$(this).find("ALBUM").each(function() {
								mSourceMetadata.album = $(this).text();
							});
							$(this).find("IPOD-ALBUM").each(function() {
								mSourceMetadata.ipodAlbum = $(this).text();
							});
							$(this).find("SMS-THEME").each(function() {
								mSourceMetadata.smsTheme = $(this).text();
							});
							$(this).find("TUNERFREQUENCY").each(function() {
								mSourceMetadata.tunerFrequency = $(this).text();
							});
							$(this).find("IPOD-PLAYLIST").each(function() {
								mSourceMetadata.ipodPlaylist = $(this).text();
							});
							$(this).find("DISPLAYMESSAGE").each(function() {
								mSourceMetadata.displayMessage = $(this).text();
							});
						});

						// Update the Source Info on the default model.
						let oModel = this._oModel,
						mSource = oModel.getProperty("/russound/sources/" + sSourceId);
	
						mSource.sourceInfo = mSourceMetadata;
						oModel.setProperty("/russound/sources/" + sSourceId, mSource);
						oModel.refresh();

						fnResolve(mSource);
					}.bind(this),

					error: function(err) {
						console.error( "Get Source Info error (SourceId: " + sSourceId + "):\n" + err.responseText );
						
						// If the HTTP respose was OK (HTTP Status 200), try to remove bad chars and reparse the document.
						if (err.status === 200) {
							var sResponse = err.responseText = err.responseText.replace(/[^\x20-\x7E]+/g, ''),
								oDocument = $.parseXML(sResponse);
							$(oDocument).find('METADATA').each(function() {
								$(this).find("METADATA_1").each(function() {
									mSourceMetadata.metadata1 = $(this).text();
								});
								$(this).find("METADATA_2").each(function() {
									mSourceMetadata.metadata2 = $(this).text();
								});
								$(this).find("CHANNEL").each(function() {
									mSourceMetadata.channel = $(this).text();
								});
								$(this).find("ALBUM").each(function() {
									mSourceMetadata.album = $(this).text();
								});
								$(this).find("IPOD-ALBUM").each(function() {
									mSourceMetadata.ipodAlbum = $(this).text();
								});
								$(this).find("SMS-THEME").each(function() {
									mSourceMetadata.smsTheme = $(this).text();
								});
								$(this).find("TUNERFREQUENCY").each(function() {
									mSourceMetadata.tunerFrequency = $(this).text();
								});
								$(this).find("IPOD-PLAYLIST").each(function() {
									mSourceMetadata.ipodPlaylist = $(this).text();
								});
								$(this).find("DISPLAYMESSAGE").each(function() {
									mSourceMetadata.displayMessage = $(this).text();
								});
							});

							// Update the Source Info on the default model.
							mSource.sourceInfo = mSourceMetadata;
							oModel.setProperty("/russound/sources/" + sSourceId, mSource);
							oModel.refresh();

							fnResolve(mSourceMetadata);
						} else {
							fnReject(oError);
						}
					}.bind(this)
				});

			}.bind(this));
		},

		/**
		 * Call the Russound TCH1 to retrieve the Tuner's viewport text (aka station).
		 *	-The Tuner is always on Source ID "1".
		 * @private
		 * @param {String} sSourceId  The internal Source ID (same as the Russound TCH1 Source ID).
		 * @returns {Promise}  Resolved/Rejected based on results of the AJAX call.
		 */
		_loadTunerViewport: function(iDelay) {
			return new Promise(function(fnResolve, fnReject) {
				let oModel = this._oModel,
					mSource = oModel.getProperty("/russound/sources/1");	// Tuner

				let sViewportText = "------";

				setTimeout(function() {
					$.ajax({
						url: "russoundProxy/broadcastdisplay_source_1.xml",	// Tuner is Source 1
						success: function(data) {
				
							$(data).find('BROADCASTDISPLAY').each(function() {
								$(this).find("NUMERICENTRY").each(function() {
									sViewportText = $(this).text();
								});
							});

							// Update the Tunner's display text on the default model.
							mSource.sourceInfo.tunerFrequency = sViewportText;
							oModel.setProperty("/russound/sources/1", mSource);
							oModel.refresh();

							fnResolve(sViewportText);
						}.bind(this),
						error: function(oError) {
							fnReject(oError);
						}.bind(this)
					});
				}.bind(this), iDelay || 0);

			}.bind(this));
		},

		/**
		 * Refresh the Zone meta data on the Russound CAV6.6 (via the TCH1).
		 * @public
		 * @param {String} sZoneId  The internal Zone ID (this is not the TCH1 zone).
		 * @param {Integer} iDelay  Number of miliseconds to wait before sending the command.
		 * @returns {String}  The string response from the TCH1 server's response.
		 */
		_refreshZone: function(sZoneId, iDelay) {
			return new Promise(function(fnResolve, fnReject) {
				var mZone = this._oModel.getProperty("/russound/zones/" + sZoneId);

				// Send the zone refresh command.
				if (mZone) {
					setTimeout(function() {
						this.sendCommand({
							controllerId: mZone.controller,
							zoneId: mZone.zone,
							action: "100",	/*Refresh Data*/
							value: mZone.zone
						}).then(function(sResponse) {
							fnResolve(sResponse);
						}.bind(this)).catch(function(oError) {
							fnReject(oError);
						});	
					}.bind(this), iDelay || 0);
				} else {
					fnResolve("Zone does not exist");
				}

			}.bind(this));
		},

		/**
		 * Send the Russound TCH1 server a refresh zone command for all loaded Zones.
		 * @public
		 * @param {Integer} iDelay  Number of miliseconds to wait before starting.
		 * @returns {Promise}  Resolved/Rejected based on results of the AJAX calls.
		 */
		_refreshAllZones: function(iDelay) {
			return new Promise(function(fnResolve, fnReject) {
				let mZones = this._oModel.getProperty("/russound/zones"),
					oPromise = Promise.resolve(),
					aResponses = [];

				setTimeout(function() {
					Object.keys(mZones).forEach((sZoneId) => {
						oPromise = oPromise.then((sResponse) => {
							if (sResponse) { aResponses.push(sResponse); }
							return this._refreshZone(sZoneId, 250/*delay for 250 miliseconds*/);
						});
					},this);

					oPromise.then((sResponse) => {
						aResponses.push(sResponse);
						fnResolve(aResponses);
					}).catch((oError) => {
						fnReject(oError);
					});
				}.bind(this), iDelay || 0);

			}.bind(this));
		}

	});
});