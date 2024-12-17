/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Icon"],function(e,a){"use strict";var t=e.extend("sap.ui.webc.main.Icon",{metadata:{library:"sap.ui.webc.main",tag:"ui5-icon-ui5",interfaces:["sap.ui.webc.main.IIcon"],properties:{accessibleName:{type:"string",defaultValue:""},backgroundColor:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},color:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},height:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},interactive:{type:"boolean",defaultValue:false},name:{type:"string",defaultValue:""},showTooltip:{type:"boolean",defaultValue:false},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},events:{click:{parameters:{}}}}});return t});