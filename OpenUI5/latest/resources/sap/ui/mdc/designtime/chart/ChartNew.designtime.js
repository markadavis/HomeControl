/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/Engine"],function(E){"use strict";return{actions:{settings:function(){return{handler:function(c,p){return E.getInstance().getRTASettingsActionHandler(c,p,c.getP13nMode());}};}},properties:{width:{ignore:false},height:{ignore:false},delegate:{ignore:true},header:{ignore:false},noDataText:{ignore:false},p13nMode:{ignore:false},legendVisible:{ignore:false},ignoreToolbarActions:{ignore:false},minWidth:{ignore:false},minHeight:{ignore:false},sortConditions:{ignore:true},showChartTooltip:{ignore:false},autoBindOnInit:{ignore:false},chartType:{ignore:false},showSelectionDetails:{ignore:false}},aggregations:{items:{ignore:false},actions:{ignore:false},selectionDetailsActions:{ignore:false},_toolbar:{ignore:true},_breadcrumbs:{ignore:true},_innerChart:{ignore:true}}};});
