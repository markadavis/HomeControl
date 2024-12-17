/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/BusyIndicator"],function(e,a){"use strict";var t=a.BusyIndicatorSize;var i=e.extend("sap.ui.webc.main.BusyIndicator",{metadata:{library:"sap.ui.webc.main",tag:"ui5-busy-indicator-ui5",properties:{active:{type:"boolean",defaultValue:false},delay:{type:"int",defaultValue:1e3},display:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},size:{type:"sap.ui.webc.main.BusyIndicatorSize",defaultValue:t.Medium},text:{type:"string",defaultValue:""},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true}}}});return i});