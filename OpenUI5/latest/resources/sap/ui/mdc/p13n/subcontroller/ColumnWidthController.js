/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseController","sap/ui/mdc/p13n/FlexUtil"],function(B,F){"use strict";var C=B.extend("sap.ui.mdc.p13n.subcontroller.ColumnWidthController",{constructor:function(){B.apply(this,arguments);this._bResetEnabled=true;}});C.prototype.sanityCheck=function(c){var a=[];if(c.hasOwnProperty("aggregations")&&c.aggregations.hasOwnProperty("columns")){Object.keys(c.aggregations.columns).forEach(function(i){var o={name:i,width:c.aggregations.columns[i].width};a.push(o);});}return a;};C.prototype.getCurrentState=function(){return this.getAdaptationControl().getCurrentState().xConfig;};C.prototype.getDelta=function(p){p.deltaAttribute="width";p.operation="setColumnWidth";p.existingState=this.sanityCheck(p.existingState);return F.getPropertySetterChanges(p);};return C;});
