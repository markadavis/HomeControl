/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * Initialization Code and shared classes of library sap.ui.webc.common
 */
sap.ui.define([
		"sap/ui/core/library",
		"sap/ui/base/DataType",
		"./Icons",
		"./thirdparty/base/features/OpenUI5Support",
		"./thirdparty/base/AssetRegistry",
		"./thirdparty/base/CustomElementsScope"
	],
	function(coreLibrary, DataType, Icons, OpenUI5Support, AssetRegistry, CustomElementsScope) {

	"use strict";

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name : "sap.ui.webc.common",
		version: "1.96.3",
		dependencies : ["sap.ui.core"],
		noLibraryCSS: true,
		designtime: "sap/ui/webc/common/designtime/library.designtime",
		interfaces: [
		],
		types: [
		],
		controls: [
			"sap.ui.webc.common.WebComponent"
		],
		elements: [
		],
		extensions: {
		}
	});

	/**
	 * Namespace for UI5 Web Components Retrofit libraries
	 *
	 * @namespace
	 * @alias sap.ui.webc
	 * @author SAP SE
	 * @version 1.96.3
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0
	 */

	/**
	 * UI5 library: sap.ui.webc.common
	 *
	 * @namespace
	 * @alias sap.ui.webc.common
	 * @author SAP SE
	 * @version 1.96.3
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0
	 */
	var thisLib = sap.ui.webc.common;

	CustomElementsScope.setCustomElementsScopingSuffix("ui5");

	return thisLib;
});
