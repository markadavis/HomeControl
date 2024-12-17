/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Title"],function(e,t){"use strict";var a=t.TitleLevel;var i=t.WrappingType;var p=e.extend("sap.ui.webc.main.Title",{metadata:{library:"sap.ui.webc.main",tag:"ui5-title-ui5",properties:{level:{type:"sap.ui.webc.main.TitleLevel",defaultValue:a.H2},text:{type:"string",defaultValue:"",mapping:"textContent"},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:i.None}}}});return p});