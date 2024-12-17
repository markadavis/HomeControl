/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/RangeSlider"],function(e,a){"use strict";var t=e.extend("sap.ui.webc.main.RangeSlider",{metadata:{library:"sap.ui.webc.main",tag:"ui5-range-slider-ui5",properties:{disabled:{type:"boolean",defaultValue:false},endValue:{type:"float",defaultValue:100},labelInterval:{type:"int",defaultValue:0},max:{type:"float",defaultValue:100},min:{type:"float",defaultValue:0},showTickmarks:{type:"boolean",defaultValue:false},showTooltip:{type:"boolean",defaultValue:false},startValue:{type:"float",defaultValue:0},step:{type:"int",defaultValue:1},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},events:{change:{parameters:{}},input:{parameters:{}}}}});return t});