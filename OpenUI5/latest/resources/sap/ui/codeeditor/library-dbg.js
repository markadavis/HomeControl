/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * Initialization Code and shared classes of library sap.ui.codeeditor.
 */
sap.ui.define([
	"sap/ui/core/Core", // provides sap.ui.getCore()
	"sap/ui/core/library" // library dependency
], function () {
	"use strict";

	/**
	 * UI5 library: sap.ui.codeeditor.
	 *
	 * @namespace
	 * @name sap.ui.codeeditor
	 * @author SAP SE
	 * @version 1.96.3
	 * @since 1.48
	 * @public
	 */

	// library dependencies

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name : "sap.ui.codeeditor",
		dependencies : ["sap.ui.core"],
		types: [],
		interfaces: [],
		controls: [
			"sap.ui.codeeditor.CodeEditor"
		],
		elements: [],
		noLibraryCSS: false,
		version: "1.96.3"
	});

	return sap.ui.codeeditor;
});