/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/base/util/restricted/_difference",
	"sap/base/util/deepEqual",
	"sap/ui/core/util/reflection/JsControlTreeModifier",
	"sap/ui/core/Control",
	"sap/ui/dt/OverlayRegistry",
	"sap/ui/dt/ElementUtil",
	"sap/ui/events/KeyCodes",
	"sap/ui/fl/apply/_internal/changes/Utils",
	"sap/ui/fl/write/api/ChangesWriteAPI",
	"sap/ui/fl/write/api/PersistenceWriteAPI",
	"sap/ui/fl/Layer",
	"sap/ui/fl/Utils",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/rta/util/changeVisualization/ChangeIndicator",
	"sap/ui/rta/util/changeVisualization/ChangeIndicatorRegistry"
], function(
	difference,
	deepEqual,
	JsControlTreeModifier,
	Control,
	OverlayRegistry,
	ElementUtil,
	KeyCodes,
	ChangesUtils,
	ChangesWriteAPI,
	PersistenceWriteAPI,
	Layer,
	FlUtils,
	ResourceModel,
	JSONModel,
	ChangeIndicator,
	ChangeIndicatorRegistry
) {
	"use strict";

	var VALID_COMMANDS = {
		add: [
			"createContainer",
			"addDelegateProperty",
			"reveal",
			"addIFrame"
		],
		move: [
			"move"
		],
		rename: [
			"rename"
		],
		combinesplit: [
			"combine",
			"split"
		],
		remove: [
			"remove"
		]
	};
	var CATEGORY_ALL = "all";

	var CATEGORY_ICONS = {
		all: "sap-icon://show",
		add: "sap-icon://add",
		move: "sap-icon://move",
		rename: "sap-icon://edit",
		combinesplit: "sap-icon://combine",
		remove: "sap-icon://less"
	};

	/**
	 * @class
	 * Root control for RTA change visualization.
	 *
	 * @extends sap.ui.core.Control
	 * @alias sap.ui.rta.util.changeVisualization.ChangeVisualization
	 * @author SAP SE
	 * @since 1.84.0
	 * @version 1.96.3
	 * @private
	 * @ui5-restricted
	 */
	var ChangeVisualization = Control.extend("sap.ui.rta.util.changeVisualization.ChangeVisualization", {
		metadata: {
			library: "sap.ui.rta",
			properties: {
				/**
				 * Id of the component or control to visualize the changes for
				 */
				rootControlId: {
					type: "string"
				},
				/**
				 * Whether changes are currently being displayed
				 */
				isActive: {
					type: "boolean",
					defaultValue: false
				}
			}
		},
		constructor: function () {
			Control.prototype.constructor.apply(this, arguments);

			this._oChangeIndicatorRegistry = new ChangeIndicatorRegistry({
				commandCategories: VALID_COMMANDS
			});
			this._oTextBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");
			this.setModel(new ResourceModel({
				bundle: this._oTextBundle
			}), "i18n");

			this._oChangeVisualizationModel = new JSONModel({
				active: this.getIsActive()
			});
			this._oChangeVisualizationModel.setDefaultBindingMode("OneWay");
			this._sSelectedCommandCategory = "all";
			this._bSetModeChanged = false;
		}
	});

	ChangeVisualization.prototype.setRootControlId = function (sRootControlId) {
		if (this.getRootControlId() && this.getRootControlId() !== sRootControlId) {
			this._reset();
		}
		this.setProperty("rootControlId", sRootControlId);
	};

	ChangeVisualization.prototype._getComponent = function () {
		return FlUtils.getAppComponentForControl(ElementUtil.getElementInstance(this.getRootControlId()));
	};

	ChangeVisualization.prototype.setIsActive = function (bActiveState) {
		if (bActiveState === this.getIsActive()) {
			return;
		}
		this.setProperty("isActive", bActiveState);

		if (this._oChangeVisualizationModel) {
			this._updateVisualizationModel({
				active: bActiveState
			});
		}
	};

	ChangeVisualization.prototype.exit = function () {
		this._oChangeIndicatorRegistry.destroy();
	};

	ChangeVisualization.prototype._reset = function () {
		this._oChangeIndicatorRegistry.reset();
	};

	ChangeVisualization.prototype._updateVisualizationModelMenuData = function () {
		var aCommandData = Object.keys(VALID_COMMANDS).map(function (sCommandCategoryName) {
			var sTitle = this._getCommandCategoryLabel(sCommandCategoryName,
				this._getChangesForCommandCategory(sCommandCategoryName).length);
			return {
				key: sCommandCategoryName,
				count: this._getChangesForCommandCategory(sCommandCategoryName).length,
				title: sTitle,
				icon: CATEGORY_ICONS[sCommandCategoryName]
			};
		}.bind(this));

		aCommandData.unshift({
			key: CATEGORY_ALL,
			count: this._getChangesForCommandCategory(CATEGORY_ALL).length,
			title: this._getCommandCategoryLabel(CATEGORY_ALL, this._getChangesForCommandCategory(CATEGORY_ALL).length),
			icon: CATEGORY_ICONS[CATEGORY_ALL]
		});

		this._updateVisualizationModel({
			commandCategories: aCommandData
		});
	};

	ChangeVisualization.prototype._getChangesForCommandCategory = function (sCommandCategory) {
		var aRegisteredChanges = this._oChangeIndicatorRegistry.getChanges();
		return aRegisteredChanges.filter(function (oChange) {
			return sCommandCategory === CATEGORY_ALL
				? oChange.commandCategory !== undefined
				: sCommandCategory === oChange.commandCategory;
		});
	};

	ChangeVisualization.prototype._getCommandCategoryLabel = function (sCommandCategoryName, iChangesCount) {
		var sLabelKey = "TXT_CHANGEVISUALIZATION_OVERVIEW_" + sCommandCategoryName.toUpperCase();
		return this._oTextBundle.getText(sLabelKey, [iChangesCount]);
	};

	ChangeVisualization.prototype._getCommandCategoryButton = function (sCommandCategoryName) {
		var sButtonKey = "BTN_CHANGEVISUALIZATION_OVERVIEW_" + sCommandCategoryName.toUpperCase();
		return this._oTextBundle.getText(sButtonKey);
	};

	/**
	 * Sets the selected command category and visualizes all changes for the given category
	 *
	 * @param {event} oEvent - Event
	 * @returns {promise} - Promise of category change
	 */
	ChangeVisualization.prototype.onCommandCategorySelection = function (oEvent) {
		var sSelectedCommandCategory = oEvent.getParameter("item").getKey();
		return this._selectCommandCategory(sSelectedCommandCategory);
	};

	ChangeVisualization.prototype._selectCommandCategory = function (sSelectedCommandCategory) {
		this._sSelectedCommandCategory = sSelectedCommandCategory;

		var aRelevantChanges = this._getChangesForCommandCategory(sSelectedCommandCategory);
		var sCommandCategoryText = this._getCommandCategoryButton(sSelectedCommandCategory);

		this._updateVisualizationModel({
			selectedChange: undefined,
			commandCategory: sSelectedCommandCategory,
			commandCategoryText: sCommandCategoryText
		});

		return Promise.all(aRelevantChanges.map(function (oChange) {
			return this._getVisualizationInfo(oChange)
				.then(function (mVisualizationInfo) {
					this._oChangeIndicatorRegistry.addVisualizationInfo(
						oChange.change.getId(),
						mVisualizationInfo
					);
				}.bind(this));
		}.bind(this)))
			.then(function () {
				this._updateChangeIndicators();
				this._setFocusedIndicator();
			}.bind(this));
	};

	ChangeVisualization.prototype._getVisualizationInfo = function (mChangeInformation) {
		var oComponent = this._getComponent();

		function getSelectorIds(aSelectorList) {
			if (!aSelectorList) {
				return undefined;
			}
			return aSelectorList
				.map(function (vSelector) {
					var oElement = typeof vSelector.getId === "function"
						? vSelector
						: JsControlTreeModifier.bySelector(vSelector, oComponent);
					return oElement && oElement.getId();
				})
				.filter(Boolean);
		}

		return this._getInfoFromChangeHandler(oComponent, mChangeInformation.change)
			.then(function (oInfoFromChangeHandler) {
				var mVisualizationInfo = oInfoFromChangeHandler || {};
				var aAffectedElementIds = (
					getSelectorIds(mVisualizationInfo.affectedControls || [mChangeInformation.change.getSelector()])
				);

				return {
					affectedElementIds: aAffectedElementIds,
					dependentElementIds: getSelectorIds(mVisualizationInfo.dependentControls) || [],
					displayElementIds: getSelectorIds(mVisualizationInfo.displayControls) || aAffectedElementIds,
					payload: mVisualizationInfo.payload
				};
			});
	};

	ChangeVisualization.prototype._getCommandForChange = function(oChange) {
		var sCommand = oChange.getDefinition().support.command;
		if (sCommand) {
			return sCommand;
		}

		var oComponent = this._getComponent();
		var oSelectorControl = JsControlTreeModifier.bySelector(oChange.getSelector(), oComponent);
		var oLastDependentSelector = oChange.getDependentSelectorList().slice(-1)[0];
		var oLastDependentSelectorControl = JsControlTreeModifier.bySelector(oLastDependentSelector, oComponent);

		// Recursively search through parent element structure
		// This is necessary to make sure that elements that were created during runtime
		// (e.g. for SimpleForms) are considered.
		function searchForCommand(oOverlay, sAggregationName) {
			var oControl = oOverlay.getElement();
			var sCommand = oOverlay.getDesignTimeMetadata().getCommandName(
				oChange.getChangeType(),
				oControl,
				sAggregationName
			);
			if (sCommand) {
				return sCommand;
			}

			var oParentOverlay = oOverlay.getParentElementOverlay();
			var oParentAggregationOverlay = oOverlay.getParentAggregationOverlay();
			if (
				oOverlay.getElement().getId() === oSelectorControl.getId()
				|| !oParentOverlay
			) {
				return undefined;
			}
			return searchForCommand(
				oParentOverlay,
				oParentAggregationOverlay && oParentAggregationOverlay.getAggregationName()
			);
		}

		return oSelectorControl
			&& oLastDependentSelectorControl
			&& searchForCommand(OverlayRegistry.getOverlay(oLastDependentSelectorControl));
	};

	ChangeVisualization.prototype._getInfoFromChangeHandler = function (oAppComponent, oChange) {
		var oControl = JsControlTreeModifier.bySelector(oChange.getSelector(), oAppComponent);
		if (oControl) {
			var mPropertyBag = {
				modifier: JsControlTreeModifier,
				appComponent: oAppComponent,
				view: FlUtils.getViewForControl(oControl)
			};
			var mControl = ChangesUtils.getControlIfTemplateAffected(oChange, oControl, mPropertyBag);
			return ChangesWriteAPI.getChangeHandler({
				changeType: oChange.getChangeType(),
				element: mControl.control,
				modifier: JsControlTreeModifier,
				layer: oChange.getLayer()
			})
			.then(function (oChangeHandler) {
				if (oChangeHandler && typeof oChangeHandler.getChangeVisualizationInfo === "function") {
					return oChangeHandler.getChangeVisualizationInfo(oChange, oAppComponent);
				}
				return undefined;
			});
		}

		return Promise.resolve();
	};

	ChangeVisualization.prototype._collectChanges = function () {
		var oComponent = this._getComponent();
		var mPropertyBag = {
			oComponent: oComponent,
			selector: oComponent,
			invalidateCache: false,
			includeVariants: true,
			// includeCtrlVariants: true,
			currentLayer: Layer.CUSTOMER
		};
		return PersistenceWriteAPI._getUIChanges(mPropertyBag);
	};

	ChangeVisualization.prototype._updateChangeRegistry = function () {
		return this._collectChanges().then(function (aChanges) {
			var aRegisteredChangeIds = this._oChangeIndicatorRegistry.getChangeIds();
			var oCurrentChanges = aChanges.reduce(function (oChanges, oChange) {
				oChanges[oChange.getId()] = oChange;
				return oChanges;
			}, {});
			var aCurrentChangeIds = Object.keys(oCurrentChanges);

			// Remove registered changes which no longer exist
			difference(aRegisteredChangeIds, aCurrentChangeIds).forEach(function (sChangeIdToRemove) {
				this._oChangeIndicatorRegistry.removeChange(sChangeIdToRemove);
			}.bind(this));

			// Register missing changes
			difference(aCurrentChangeIds, aRegisteredChangeIds).forEach(function (sChangeIdToAdd) {
				var oChangeToAdd = oCurrentChanges[sChangeIdToAdd];
				var sCommandName = this._getCommandForChange(oChangeToAdd);
				this._oChangeIndicatorRegistry.registerChange(oChangeToAdd, sCommandName);
			}.bind(this));
		}.bind(this));
	};

	ChangeVisualization.prototype.selectChange = function (oEvent) {
		var sChangeId = oEvent.getParameter("changeId");
		this._selectChange(sChangeId);
	};

	ChangeVisualization.prototype._selectChange = function (sChangeId) {
		this._updateVisualizationModel({
			selectedChange: sChangeId
		});
		this._updateChangeIndicators();
	};

	ChangeVisualization.prototype._updateVisualizationModel = function (oData) {
		this._oChangeVisualizationModel.setData(Object.assign(
			{},
			this._oChangeVisualizationModel.getData(),
			oData
		));
	};

	ChangeVisualization.prototype._updateChangeIndicators = function () {
		var oSelectors = this._oChangeIndicatorRegistry.getChangeIndicatorData();
		var oIndicators = {};
		Object.keys(oSelectors)
			.forEach(function (sSelectorId) {
				var aChanges = oSelectors[sSelectorId];
				var oOverlay = OverlayRegistry.getOverlay(sSelectorId);
				if (!oOverlay || !oOverlay.getDomRef()) {
					// Change is not visible
					return undefined;
				}

				var oOverlayPosition = oOverlay.getDomRef().getClientRects()[0] || {left: 0, top: 0};
				oIndicators[sSelectorId] = {
					posX: parseInt(oOverlayPosition.left),
					posY: parseInt(oOverlayPosition.top),
					changes: this._filterRelevantChanges(aChanges)
				};

				if (!this._oChangeIndicatorRegistry.hasChangeIndicator(sSelectorId)) {
					this._createChangeIndicator(oOverlay, sSelectorId);
				}
				return undefined;
			}.bind(this));

		if (
			!deepEqual(
				oIndicators,
				this._oChangeVisualizationModel.getData().content
			)
		) {
			this._updateVisualizationModel({
				content: oIndicators
			});
		}
	};

	ChangeVisualization.prototype._filterRelevantChanges = function (aChanges) {
		if (!Array.isArray(aChanges)) {
			return aChanges;
		}
		var oRootData = this._oChangeVisualizationModel.getData();

		return aChanges.filter(function (oChange) {
			return (
				// No change is selected and change is of proper category
				(
					!oRootData.selectedChange
					&& !oChange.dependent
					&& (
						oRootData.commandCategory === 'all'
						|| oRootData.commandCategory === oChange.commandCategory
					)
				)
				// Dependent change for currently selected or currently selected
				|| (
					!!oRootData.selectedChange
					&& oChange.id === oRootData.selectedChange
				)
			);
		});
	};

	ChangeVisualization.prototype._createChangeIndicator = function (oOverlay, sSelectorId) {
		var oChangeIndicator = new ChangeIndicator({
			changes: "{changes}",
			mode: {
				path: "changes",
				formatter: function (aChanges) {
					var sSelectedChange = this.getModel().getData().selectedChange;
					return (sSelectedChange && (aChanges || []).some(function (oChange) {
						return oChange.dependent;
					})) ? "dependent" : "change";
				}
			},
			posX: "{posX}",
			posY: "{posY}",
			visible: "{= ${/active} && (${changes} || []).length > 0}",
			overlayId: oOverlay.getId(),
			selectorId: sSelectorId,
			selectChange: this.selectChange.bind(this),
			keyPress: this._onIndicatorKeyPress.bind(this)
		});

		oChangeIndicator.setModel(this._oChangeVisualizationModel);
		oChangeIndicator.bindElement("/content/" + sSelectorId);
		oChangeIndicator.setModel(this.getModel("i18n"), "i18n");

		// Temporarily place the indicator in the static area
		// It will move itself to the correct overlay after rendering
		oChangeIndicator.placeAt(sap.ui.getCore().getStaticAreaRef());

		this._oChangeIndicatorRegistry.registerChangeIndicator(sSelectorId, oChangeIndicator);
	};

	ChangeVisualization.prototype._onIndicatorKeyPress = function (oEvent) {
		var oOriginalEvent = oEvent.getParameter("originalEvent");
		var iKeyCode = oOriginalEvent.keyCode;
		var oIndicator = oEvent.getSource();
		if (
			iKeyCode === KeyCodes.ARROW_UP
			|| iKeyCode === KeyCodes.ARROW_LEFT
			|| (iKeyCode === KeyCodes.TAB && oOriginalEvent.shiftKey)
		) {
			oOriginalEvent.stopPropagation();
			oOriginalEvent.preventDefault();
			this._setFocusedIndicator(oIndicator, -1);
		} else if (
			iKeyCode === KeyCodes.ARROW_DOWN
			|| iKeyCode === KeyCodes.ARROW_RIGHT
			|| iKeyCode === KeyCodes.TAB
		) {
			oOriginalEvent.stopPropagation();
			oOriginalEvent.preventDefault();
			this._setFocusedIndicator(oIndicator, 1);
		}
	};

	ChangeVisualization.prototype._setFocusedIndicator = function (oSelectedIndicator, iDirection) {
		// Focus the next visible change indicator in the given direction
		// If none is focused yet, focus the first visible indicator
		var aVisibleIndicators = this._oChangeIndicatorRegistry.getChangeIndicators()
			.filter(function (oIndicator) {
				return oIndicator.getVisible();
			})
			.sort(function (oIndicator1, oIndicator2) {
				var iDeltaY = oIndicator1.getPosY() - oIndicator2.getPosY();
				var iDeltaX = oIndicator1.getPosX() - oIndicator2.getPosX();
				// Only consider x value if y is the same
				return iDeltaY || iDeltaX;
			});

		if (aVisibleIndicators.length === 0) {
			return;
		}

		var iIndexToSelect = oSelectedIndicator
			? (
				aVisibleIndicators.length
				+ aVisibleIndicators.indexOf(oSelectedIndicator)
				+ iDirection
			) % aVisibleIndicators.length
			: 0;
		aVisibleIndicators[iIndexToSelect].focus();
	};

	/**
	 * Triggers the mode switch (on/off).
	 *
	 * @param {sap.ui.base.ManagedObject} oRootControl - Root control of the overlays
	 * @param {sap.ui.triggerModeChange.Toolbar} oToolbar - Toolbar of RTA
	 */
	ChangeVisualization.prototype.triggerModeChange = function(oRootControl, oToolbar) {
		if (this.getIsActive()) {
			this.setIsActive(false);
			return;
		}
		if (!this.getRootControlId()) {
			this.setRootControlId(oRootControl);
		}
		this.setIsActive(true);
		// show all change visualizations at startup
		this._updateChangeRegistry()
			.then(this._selectCommandCategory.bind(this, this._sSelectedCommandCategory))
			.then(function() {
				this._updateVisualizationModelMenuData();
				oToolbar.setModel(this._oChangeVisualizationModel, "visualizationModel");
			}.bind(this));
	};

	return ChangeVisualization;
});
