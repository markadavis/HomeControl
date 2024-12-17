/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/webc/main/library","./thirdparty/UploadCollection"],function(e,t,a){"use strict";var i=a.ListMode;var l=e.extend("sap.ui.webc.fiori.UploadCollection",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-upload-collection-ui5",properties:{height:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"},hideDragOverlay:{type:"boolean",defaultValue:false},mode:{type:"sap.ui.webc.main.ListMode",defaultValue:i.None},noDataDescription:{type:"string",defaultValue:""},noDataText:{type:"string",defaultValue:""},width:{type:"sap.ui.core.CSSSize",defaultValue:null,mapping:"style"}},defaultAggregation:"items",aggregations:{header:{type:"sap.ui.core.Control",multiple:true,slot:"header"},items:{type:"sap.ui.webc.fiori.IUploadCollectionItem",multiple:true}},events:{drop:{parameters:{dataTransfer:{type:"DataTransfer"}}},itemDelete:{parameters:{item:{type:"HTMLElement"}}},selectionChange:{parameters:{selectedItems:{type:"Array"}}}}}});return l});