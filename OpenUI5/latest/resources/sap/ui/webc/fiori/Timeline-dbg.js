/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.fiori.Timeline.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"./thirdparty/Timeline"
], function(WebComponent, library) {
	"use strict";

	var TimelineLayout = library.TimelineLayout;

	/**
	 * Constructor for a new <code>Timeline</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3>
	 *
	 * The <code>sap.ui.webc.fiori.Timeline</code> component shows entries (such as objects, events, or posts) in chronological order. A common use case is to provide information about changes to an object, or events related to an object. These entries can be generated by the system (for example, value XY changed from A to B), or added manually. There are two distinct variants of the timeline: basic and social. The basic timeline is read-only, while the social timeline offers a high level of interaction and collaboration, and is integrated within SAP Jam.
	 *
	 * @author SAP SE
	 * @version 1.96.3
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.fiori.Timeline
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var Timeline = WebComponent.extend("sap.ui.webc.fiori.Timeline", {
		metadata: {
			library: "sap.ui.webc.fiori",
			tag: "ui5-timeline-ui5",
			properties: {

				/**
				 * Defines the height of the control
				 */
				height: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null,
					mapping: "style"
				},

				/**
				 * Defines the items orientation.
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> Available options are:
				 * <ul>
				 *     <li><code>Vertical</code></li>
				 *     <li><code>Horizontal</code></li>
				 * </ul>
				 */
				layout: {
					type: "sap.ui.webc.fiori.TimelineLayout",
					defaultValue: TimelineLayout.Vertical
				},

				/**
				 * Defines the width of the control
				 */
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null,
					mapping: "style"
				}
			},
			defaultAggregation: "items",
			aggregations: {

				/**
				 * Determines the content of the <code>sap.ui.webc.fiori.Timeline</code>.
				 */
				items: {
					type: "sap.ui.webc.fiori.ITimelineItem",
					multiple: true
				}
			}
		}
	});

	return Timeline;
});