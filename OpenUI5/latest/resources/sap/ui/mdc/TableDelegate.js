/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/AggregationBaseDelegate","sap/ui/core/library","sap/ui/core/Core"],function(A,c,C){"use strict";var T=Object.assign({},A);T.updateBindingInfo=function(m,d,b){b.parameters={};if(m._oMessageFilter){b.filters=[m._oMessageFilter];}else{b.filters=[];}b.sorter=m._getSorters();};T.updateBinding=function(m,b,B){this.rebindTable(m,b);};T.validateState=function(o,s,k){if(k=="Filter"&&o._oMessageFilter){var r=C.getLibraryResourceBundle("sap.ui.mdc");return{validation:c.MessageType.Information,message:r.getText("table.PERSONALIZATION_DIALOG_FILTER_MESSAGESTRIP")};}return A.validateState.apply(this,arguments);};T.rebindTable=function(m,b){if(m._oTable){m._oTable.bindRows(b);}};T.getFilterDelegate=function(){return{addItem:function(p,t){return Promise.resolve(null);}};};return T;});
