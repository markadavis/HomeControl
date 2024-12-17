/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/Button"],function(e,t,a){"use strict";var i=a.TextDirection;var n=t.ButtonDesign;var u=e.extend("sap.ui.webc.main.Button",{metadata:{library:"sap.ui.webc.main",tag:"ui5-button-ui5",interfaces:["sap.ui.webc.main.IButton"],properties:{accessibleName:{type:"string"},design:{type:"sap.ui.webc.main.ButtonDesign",defaultValue:n.Default},disabled:{type:"boolean",defaultValue:false},icon:{type:"string",defaultValue:""},iconEnd:{type:"boolean",defaultValue:false},submits:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:"",mapping:"textContent"},textDirection:{type:"sap.ui.core.TextDirection",defaultValue:i.Inherit,mapping:{type:"attribute",to:"dir",formatter:"_mapTextDirection"}},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},events:{click:{parameters:{}}}}});return u});