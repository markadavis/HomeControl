/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.commons.form.GridLayout.
sap.ui.define([
 'sap/ui/commons/library',
 'sap/ui/layout/form/GridLayout',
 './GridLayoutRenderer'
],
	function(library, LayoutGridLayout, GridLayoutRenderer) {
	"use strict";



	/**
	 * Constructor for a new form/GridLayout.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * This Layout implements a guideline 2.0 grid. This can be a 16 column grid or an 8 column grid.
	 *
	 * To adjust the content inside the GridLayout GridContainerData and GridElementData could be used.
	 * @extends sap.ui.layout.form.GridLayout
	 *
	 * @author SAP SE
	 * @version 1.96.3
	 *
	 * @constructor
	 * @public
	 * @since 1.9.1
	 * @deprecated Since version 1.16.0.
	 * moved to sap.ui.layout library. Please use this one.
	 * @alias sap.ui.commons.form.GridLayout
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var GridLayout = LayoutGridLayout.extend("sap.ui.commons.form.GridLayout", /** @lends sap.ui.commons.form.GridLayout.prototype */ { metadata : {

		deprecated : true,
		library : "sap.ui.commons"
	}});

	return GridLayout;

});
