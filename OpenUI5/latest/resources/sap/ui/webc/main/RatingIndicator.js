/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/RatingIndicator"],function(a,e){"use strict";var t=a.extend("sap.ui.webc.main.RatingIndicator",{metadata:{library:"sap.ui.webc.main",tag:"ui5-rating-indicator-ui5",properties:{accessibleName:{type:"string"},disabled:{type:"boolean",defaultValue:false},max:{type:"int",defaultValue:5},readonly:{type:"boolean",defaultValue:false},value:{type:"float",defaultValue:0}},events:{change:{parameters:{}}}}});return t});