/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Link"],function(e,a){"use strict";var t=a.LinkDesign;var i=a.WrappingType;var n=e.extend("sap.ui.webc.main.Link",{metadata:{library:"sap.ui.webc.main",tag:"ui5-link-ui5",properties:{accessibleNameRef:{type:"string",defaultValue:""},design:{type:"sap.ui.webc.main.LinkDesign",defaultValue:t.Default},disabled:{type:"boolean",defaultValue:false},href:{type:"string",defaultValue:""},target:{type:"string",defaultValue:""},text:{type:"string",defaultValue:"",mapping:"textContent"},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:i.None}},events:{click:{parameters:{}}}}});return n});