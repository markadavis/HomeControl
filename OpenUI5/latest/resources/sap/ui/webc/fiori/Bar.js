/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Bar"],function(e,t){"use strict";var r=t.BarDesign;var a=e.extend("sap.ui.webc.fiori.Bar",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-bar-ui5",properties:{design:{type:"sap.ui.webc.fiori.BarDesign",defaultValue:r.Header},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},endContent:{type:"sap.ui.core.Control",multiple:true,slot:"endContent"},startContent:{type:"sap.ui.core.Control",multiple:true,slot:"startContent"}}}});return a});