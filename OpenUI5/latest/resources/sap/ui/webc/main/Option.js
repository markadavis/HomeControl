/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Option"],function(e,t){"use strict";var a=e.extend("sap.ui.webc.main.Option",{metadata:{library:"sap.ui.webc.main",tag:"ui5-option-ui5",interfaces:["sap.ui.webc.main.ISelectOption"],properties:{disabled:{type:"boolean",defaultValue:false},icon:{type:"string"},selected:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:"",mapping:"textContent"},value:{type:"string"}}}});return a});