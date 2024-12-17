/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/webc/main/library","./thirdparty/NotificationAction"],function(i,t,e){"use strict";var a=e.ButtonDesign;var n=i.extend("sap.ui.webc.fiori.NotificationAction",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-notification-action-ui5",interfaces:["sap.ui.webc.fiori.INotificationAction"],properties:{design:{type:"sap.ui.webc.main.ButtonDesign",defaultValue:a.Transparent},disabled:{type:"boolean",defaultValue:false},icon:{type:"string",defaultValue:""},text:{type:"string",defaultValue:""}}}});return n});