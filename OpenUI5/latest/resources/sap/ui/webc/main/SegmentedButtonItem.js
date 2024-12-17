/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/SegmentedButtonItem"],function(e,t){"use strict";var a=t.ButtonDesign;var n=e.extend("sap.ui.webc.main.SegmentedButtonItem",{metadata:{library:"sap.ui.webc.main",tag:"ui5-segmented-button-item-ui5",interfaces:["sap.ui.webc.main.ISegmentedButtonItem"],properties:{accessibleName:{type:"string"},design:{type:"sap.ui.webc.main.ButtonDesign",defaultValue:a.Default},disabled:{type:"boolean",defaultValue:false},icon:{type:"string",defaultValue:""},iconEnd:{type:"boolean",defaultValue:false},pressed:{type:"boolean",defaultValue:false},submits:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:"",mapping:"textContent"}},events:{click:{parameters:{}}}}});return n});