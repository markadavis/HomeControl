/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * Initialization Code and shared classes of library sap.ui.suite.
 */
sap.ui.define(['sap/ui/core/Core', 'sap/ui/core/library'], // library dependency
	function(Core) {

	"use strict";


	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name : "sap.ui.suite",
		version: "1.96.3",
		dependencies : ["sap.ui.core"],
		types: [
			"sap.ui.suite.TaskCircleColor"
		],
		interfaces: [],
		controls: [
			"sap.ui.suite.TaskCircle",
			"sap.ui.suite.VerticalProgressIndicator"
		],
		elements: []
	});

	/* eslint-disable no-undef */
	/**
	 * Suite controls library.
	 *
	 * @namespace
	 * @alias sap.ui.suite
	 * @author SAP SE
	 * @version 1.96.3
	 * @since 1.1
	 * @public
	 */
	var thisLibrary = sap.ui.suite;
	/* eslint-enable no-undef */

	/**
	 * Defined color values for the Task Circle Control
	 *
	 * @version 1.96.3
	 * @enum {string}
	 * @public
	 * @ui5-metamodel This enumeration also will be described in the UI5 (legacy) designtime metamodel
	 */
	thisLibrary.TaskCircleColor = {

		/**
		 * Red
		 * @public
		 */
		Red : "Red",

		/**
		 * Yellow
		 * @public
		 */
		Yellow : "Yellow",

		/**
		 * Green
		 * @public
		 */
		Green : "Green",

		/**
		 * Default value
		 * @public
		 */
		Gray : "Gray"

	};

	return thisLibrary;

});