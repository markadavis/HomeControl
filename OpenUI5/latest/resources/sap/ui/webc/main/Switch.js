/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Switch"],function(e,a){"use strict";var t=a.SwitchDesign;var i=e.extend("sap.ui.webc.main.Switch",{metadata:{library:"sap.ui.webc.main",tag:"ui5-switch-ui5",properties:{checked:{type:"boolean",defaultValue:false},design:{type:"sap.ui.webc.main.SwitchDesign",defaultValue:t.Textual},disabled:{type:"boolean",defaultValue:false},textOff:{type:"string",defaultValue:""},textOn:{type:"string",defaultValue:""}},events:{change:{parameters:{}}}}});return i});