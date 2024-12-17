/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/library","./thirdparty/ProgressIndicator"],function(e,a,t){"use strict";var r=t.ValueState;var i=e.extend("sap.ui.webc.main.ProgressIndicator",{metadata:{library:"sap.ui.webc.main",tag:"ui5-progress-indicator-ui5",properties:{disabled:{type:"boolean",defaultValue:false},hideValue:{type:"boolean",defaultValue:false},value:{type:"int",defaultValue:0},valueState:{type:"sap.ui.core.ValueState",defaultValue:r.None}}}});return i});