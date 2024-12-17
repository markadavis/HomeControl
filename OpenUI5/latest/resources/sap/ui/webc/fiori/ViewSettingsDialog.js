/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/ViewSettingsDialog"],function(e,t){"use strict";var i=e.extend("sap.ui.webc.fiori.ViewSettingsDialog",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-view-settings-dialog-ui5",properties:{sortDescending:{type:"boolean",defaultValue:false}},aggregations:{sortItems:{type:"sap.ui.webc.main.IListItem",multiple:true,slot:"sortItems"}},events:{cancel:{parameters:{sortOrder:{type:"string"},sortBy:{type:"string"}}},confirm:{parameters:{sortOrder:{type:"string"},sortBy:{type:"string"}}}},methods:["show"]}});return i});