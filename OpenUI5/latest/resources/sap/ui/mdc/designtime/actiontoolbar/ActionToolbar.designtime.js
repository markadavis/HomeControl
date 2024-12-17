/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");return{aggregations:{content:{ignore:true},actions:{ignore:true},begin:{ignore:true},between:{ignore:true},end:{ignore:true}},actions:{settings:{name:r.getText("actiontoolbar.RTA_SETTINGS_NAME"),handler:function(c,p){return sap.ui.mdc.p13n.Engine.getInstance().getRTASettingsActionHandler(c,p,"actionsKey").then(function(C){return C;});},CAUTION_variantIndependent:true}}};});
