/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo.
sap.ui.define(['sap/ui/core/Element', './library'],
	function(Element, library) {
	"use strict";


	/**
	 * Constructor for a new <code>sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo</code> element.
	 *
	 * @param {string} [sId] ID for the new element, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new element
	 *
	 * @class
	 * Settings for accessible landmarks which can be applied to the container elements of a <code>sap.f.FlexibleColumnLayout</code> control.
	 * For example, these landmarks are used by assistive technologies (such as screen readers) to provide a meaningful columns overview.
	 * @extends sap.ui.core.Element
	 *
	 * @author SAP SE
	 * @version 1.96.3
	 * @since 1.95
	 *
	 * @constructor
	 * @public
	 * @alias sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var FlexibleColumnLayoutAccessibleLandmarkInfo = Element.extend("sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo", /** @lends sap.f.FlexibleColumnLayoutAccessibleLandmarkInfo.prototype */ { metadata : {

		library : "sap.f",
		properties : {
			/**
			 * Text that describes the landmark of the first column of the corresponding <code>sap.f.FlexibleColumnLayout</code> control.
			 *
			 * If not set, a predefined text is used.
			 */
			firstColumnLabel : {type : "string", defaultValue : null},

			/**
			 * Text that describes the landmark of the middle column of the corresponding <code>sap.f.FlexibleColumnLayout</code> control.
			 *
			 * If not set, a predefined text is used.
			 */
			middleColumnLabel : {type : "string", defaultValue : null},

			/**
			 * Text that describes the landmark of the last column of the corresponding <code>sap.f.FlexibleColumnLayout</code> control.
			 *
			 * If not set, a predefined text is used.
			 */
			lastColumnLabel : {type : "string", defaultValue : null}

		}
	}});

	return FlexibleColumnLayoutAccessibleLandmarkInfo;
});
