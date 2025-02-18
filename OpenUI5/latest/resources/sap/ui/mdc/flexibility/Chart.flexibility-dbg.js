/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	'./SortFlex', './ChartItemFlex'
], function(SortFlex, ChartItemFlex) {
	"use strict";
	/**
	 * Chart-control-specific change handler that enables the storing of changes in the layered repository of the flexibility services.
	 *
	 * @alias sap.ui.mdc.flexibility.Chart
	 * @author SAP SE
	 * @version 1.96.3
	 */
	return {
		addItem: ChartItemFlex.addItem,
		removeItem: ChartItemFlex.removeItem,
		moveItem: ChartItemFlex.moveItem,
		"setChartType": {
			layers: {
				USER: true
			},
			changeHandler: {
				createChange: function(mPropertyBag) {
					if (!mPropertyBag.control) {
						throw new Error("Invalid control. The existing control object is mandatory");
					}
					return {
						selectorElement: mPropertyBag.control,
						changeSpecificData: {
							changeType: "setChartType",
							content: {
								chartType: mPropertyBag.chartType
							}
						}
					};
				},
				completeChangeContent: function(oChange, mSpecificChangeInfo) {
				},
				applyChange: function(oChange, oChart, mPropertyBag) {
					var oModifier = mPropertyBag.modifier;
					return Promise.resolve()
						.then(oModifier.getProperty.bind(oModifier, oChart, "chartType"))
						.then(function(vOldValue) {
							// First store the old value for revert
							oChange.setRevertData(vOldValue);
							// Then set the new value
							oModifier.setProperty(oChart, "chartType", oChange.getContent().chartType);
						});
				},
				revertChange: function(oChange, oChart, mPropertyBag) {
					mPropertyBag.modifier.setProperty(oChart, "chartType", oChange.getRevertData());
					oChange.resetRevertData();
				}
			}
		},
		removeSort: SortFlex.removeSort,
		addSort: SortFlex.addSort,
		moveSort: SortFlex.moveSort
	};
}, /* bExport= */true);
