/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/RadioButton"],function(e,a,t){"use strict";var u=t.ValueState;var l=a.WrappingType;var i=e.extend("sap.ui.webc.main.RadioButton",{metadata:{library:"sap.ui.webc.main",tag:"ui5-radio-button-ui5",properties:{checked:{type:"boolean",defaultValue:false},disabled:{type:"boolean",defaultValue:false},name:{type:"string",defaultValue:""},readonly:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:""},value:{type:"string",defaultValue:""},valueState:{type:"sap.ui.core.ValueState",defaultValue:u.None},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:l.None}},events:{change:{parameters:{}}}}});return i});