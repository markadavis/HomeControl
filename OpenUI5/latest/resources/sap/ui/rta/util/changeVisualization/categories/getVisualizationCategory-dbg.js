/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/rta/util/changeVisualization/categories/RenameVisualization"
], function(
	RenameVisualization
) {
	"use strict";

	var mCategories = {
		rename: RenameVisualization
	};

	return function(sCategoryName) {
		return mCategories[sCategoryName];
	};
});