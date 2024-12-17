/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/ResponsivePopover"],function(e,a){"use strict";var t=a.PopoverHorizontalAlign;var o=a.PopoverPlacementType;var l=a.PopoverVerticalAlign;var r=e.extend("sap.ui.webc.main.ResponsivePopover",{metadata:{library:"sap.ui.webc.main",tag:"ui5-responsive-popover-ui5",properties:{accessibleName:{type:"string",defaultValue:""},allowTargetOverlap:{type:"boolean",defaultValue:false},headerText:{type:"string",defaultValue:""},hideArrow:{type:"boolean",defaultValue:false},hideBackdrop:{type:"boolean",defaultValue:false},horizontalAlign:{type:"sap.ui.webc.main.PopoverHorizontalAlign",defaultValue:t.Center},initialFocus:{type:"string",defaultValue:""},modal:{type:"boolean",defaultValue:false},placementType:{type:"sap.ui.webc.main.PopoverPlacementType",defaultValue:o.Right},preventFocusRestore:{type:"boolean",defaultValue:false},verticalAlign:{type:"sap.ui.webc.main.PopoverVerticalAlign",defaultValue:l.Center}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},footer:{type:"sap.ui.core.Control",multiple:true,slot:"footer"},header:{type:"sap.ui.core.Control",multiple:true,slot:"header"}},events:{afterClose:{parameters:{}},afterOpen:{parameters:{}},beforeClose:{allowPreventDefault:true,parameters:{escPressed:{type:"boolean"}}},beforeOpen:{allowPreventDefault:true,parameters:{}}},methods:["applyFocus","close","isOpen","showAt"]}});return r});