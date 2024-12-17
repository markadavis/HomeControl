/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Label"],function(e,a){"use strict";var t=a.WrappingType;var p=e.extend("sap.ui.webc.main.Label",{metadata:{library:"sap.ui.webc.main",tag:"ui5-label-ui5",properties:{for:{type:"string",defaultValue:""},required:{type:"boolean",defaultValue:false},showColon:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:"",mapping:"textContent"},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:t.None}}}});return p});