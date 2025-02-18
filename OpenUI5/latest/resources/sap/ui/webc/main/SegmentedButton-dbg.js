/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.main.SegmentedButton.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"./thirdparty/SegmentedButton"
], function(WebComponent, library) {
	"use strict";

	/**
	 * Constructor for a new <code>SegmentedButton</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3>
	 *
	 * The <code>sap.ui.webc.main.SegmentedButton</code> shows a group of items. When the user clicks or taps one of the items, it stays in a pressed state. It automatically resizes the items to fit proportionally within the component. When no width is set, the component uses the available width. <br>
	 * <br>
	 * <b>Note:</b> There can be just one selected <code>item</code> at a time.
	 *
	 * @author SAP SE
	 * @version 1.96.3
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.SegmentedButton
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var SegmentedButton = WebComponent.extend("sap.ui.webc.main.SegmentedButton", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-segmented-button-ui5",
			defaultAggregation: "items",
			aggregations: {

				/**
				 * Defines the items of <code>sap.ui.webc.main.SegmentedButton</code>. <br>
				 * <br>
				 * <b>Note:</b> Multiple items are allowed. <br>
				 * <br>
				 * <b>Note:</b> Use the <code>sap.ui.webc.main.SegmentedButtonItem</code> for the intended design.
				 */
				items: {
					type: "sap.ui.webc.main.ISegmentedButtonItem",
					multiple: true
				}
			},
			events: {

				/**
				 * Fired when the selected item changes.
				 */
				selectionChange: {
					parameters: {
						/**
						 * the pressed item.
						 */
						selectedItem: {
							type: "HTMLElement"
						}
					}
				}
			},
			getters: ["selectedItem"]
		}
	});

	/**
	 * Returns the currently selected item.
	 * @public
	 * @name sap.ui.webc.main.SegmentedButton#getSelectedItem
	 * @function
	 */

	return SegmentedButton;
});