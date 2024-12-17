/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/CheckBox"],function(e,a,t){"use strict";var l=t.ValueState;var u=a.WrappingType;var p=e.extend("sap.ui.webc.main.CheckBox",{metadata:{library:"sap.ui.webc.main",tag:"ui5-checkbox-ui5",properties:{checked:{type:"boolean",defaultValue:false},disabled:{type:"boolean",defaultValue:false},indeterminate:{type:"boolean",defaultValue:false},name:{type:"string",defaultValue:""},readonly:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:""},valueState:{type:"sap.ui.core.ValueState",defaultValue:l.None},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:u.None}},events:{change:{parameters:{}}}}});return p});