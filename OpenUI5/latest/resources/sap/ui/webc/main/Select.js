/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/Select"],function(e,t,a){"use strict";var i=a.ValueState;var l=e.extend("sap.ui.webc.main.Select",{metadata:{library:"sap.ui.webc.main",tag:"ui5-select-ui5",properties:{accessibleName:{type:"string"},accessibleNameRef:{type:"string",defaultValue:""},disabled:{type:"boolean",defaultValue:false},name:{type:"string",defaultValue:""},required:{type:"boolean",defaultValue:false},valueState:{type:"sap.ui.core.ValueState",defaultValue:i.None},valueStateMessage:{type:"string",defaultValue:"",mapping:{type:"slot",to:"div"}}},defaultAggregation:"options",aggregations:{options:{type:"sap.ui.webc.main.ISelectOption",multiple:true}},events:{change:{parameters:{selectedOption:{type:"HTMLElement"}}}},getters:["selectedOption"]}});return l});