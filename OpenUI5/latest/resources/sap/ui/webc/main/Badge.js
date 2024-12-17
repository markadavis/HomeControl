/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/Badge"],function(e,t){"use strict";var a=e.extend("sap.ui.webc.main.Badge",{metadata:{library:"sap.ui.webc.main",tag:"ui5-badge-ui5",properties:{colorScheme:{type:"string",defaultValue:"1"},text:{type:"string",defaultValue:"",mapping:"textContent"}},aggregations:{icon:{type:"sap.ui.webc.main.IIcon",multiple:false,slot:"icon"}}}});return a});