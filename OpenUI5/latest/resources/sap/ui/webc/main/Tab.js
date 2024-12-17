/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Tab"],function(e,a){"use strict";var t=a.SemanticColor;var i=e.extend("sap.ui.webc.main.Tab",{metadata:{library:"sap.ui.webc.main",tag:"ui5-tab-ui5",interfaces:["sap.ui.webc.main.ITab"],properties:{additionalText:{type:"string",defaultValue:""},design:{type:"sap.ui.webc.main.SemanticColor",defaultValue:t.Default},disabled:{type:"boolean",defaultValue:false},icon:{type:"string",defaultValue:""},selected:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:""}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true}}}});return i});