/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.main.ProgressIndicator.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"sap/ui/core/library",
	"./thirdparty/ProgressIndicator"
], function(WebComponent, library, coreLibrary) {
	"use strict";

	var ValueState = coreLibrary.ValueState;

	/**
	 * Constructor for a new <code>ProgressIndicator</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3> Shows the progress of a process in a graphical way. To indicate the progress, the inside of the component is filled with a color.
	 *
	 * <h3>Responsive Behavior</h3> You can change the size of the Progress Indicator by changing its <code>width</code> or <code>height</code> CSS properties.
	 *
	 * @author SAP SE
	 * @version 1.96.3
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.ProgressIndicator
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var ProgressIndicator = WebComponent.extend("sap.ui.webc.main.ProgressIndicator", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-progress-indicator-ui5",
			properties: {

				/**
				 * Defines whether component is in disabled state.
				 */
				disabled: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines whether the component value is shown.
				 */
				hideValue: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Specifies the numerical value in percent for the length of the component.
				 *
				 * <b>Note:</b> If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
				 */
				value: {
					type: "int",
					defaultValue: 0
				},

				/**
				 * Defines the value state of the component. <br>
				 * <br>
				 * Available options are:
				 * <ul>
				 *     <li><code>None</code></li>
				 *     <li><code>Error</code></li>
				 *     <li><code>Warning</code></li>
				 *     <li><code>Success</code></li>
				 *     <li><code>Information</code></li>
				 * </ul>
				 */
				valueState: {
					type: "sap.ui.core.ValueState",
					defaultValue: ValueState.None
				}
			}
		}
	});

	return ProgressIndicator;
});