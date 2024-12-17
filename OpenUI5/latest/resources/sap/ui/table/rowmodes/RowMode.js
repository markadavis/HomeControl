/*
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","../utils/TableUtils","sap/ui/core/Element","sap/base/Log","sap/ui/thirdparty/jquery"],function(l,T,E,L,q){"use strict";var _=T.createWeakMapFacade();var R=E.extend("sap.ui.table.rowmodes.RowMode",{metadata:{library:"sap.ui.table","abstract":true}});var a={};R.prototype.init=function(){this._bFiredRowsUpdatedAfterRendering=false;_(this).bListeningForFirstRowsUpdatedAfterRendering=false;_(this).bNoDataDisabled=false;_(this).updateTableAsync=T.throttle(this.updateTable.bind(this),50,{asyncLeading:true});};R.prototype.exit=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks();};R.prototype.setParent=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks();E.prototype.setParent.apply(this,arguments);this.attachEvents();this.registerHooks();};R.prototype.attachEvents=function(){T.addDelegate(this.getTable(),a,this);};R.prototype.detachEvents=function(){T.removeDelegate(this.getTable(),a);};R.prototype.cancelAsyncOperations=function(){var o=this.getTable();if(o){clearTimeout(o._mTimeouts.refreshRowsCreateRows);}_(this).updateTableAsync.cancel();};R.prototype.registerHooks=function(){var o=this.getTable();var H=T.Hook.Keys;T.Hook.register(o,H.Table.RowsUnbound,this._onTableRowsUnbound,this);T.Hook.register(o,H.Table.UpdateRows,this._onTableUpdateRows,this);};R.prototype.deregisterHooks=function(){var o=this.getTable();var H=T.Hook.Keys;T.Hook.deregister(o,H.Table.RowsUnbound,this._onTableRowsUnbound,this);T.Hook.deregister(o,H.Table.UpdateRows,this._onTableUpdateRows,this);};R.prototype.getMinRequestLength=function(){t(this,"getMinRequestLength");};R.prototype.getComputedRowCounts=function(){t(this,"getComputedRowCounts");};R.prototype.getTableStyles=function(){t(this,"getTableStyles");};R.prototype.getTableBottomPlaceholderStyles=function(){t(this,"getTableBottomPlaceholderStyles");};R.prototype.getRowContainerStyles=function(){t(this,"getRowContainerStyles");};R.prototype.getTable=function(){var p=this.getParent();return T.isA(p,"sap.ui.table.Table")?p:null;};R.prototype.updateTable=function(r){var o=this.getTable();if(!o){return;}_(this).updateTableAsync.cancel();var b=this.updateTableRows();if(o._bInvalid){return;}this.applyTableStyles();this.applyRowContainerStyles();this.applyTableBottomPlaceholderStyles();if(b||o.getRows().some(function(d){return d.getDomRef()==null;})){this.renderTableRows();}if(b||o.getRows().length>0){this.fireRowsUpdated(r);}};R.prototype.getBaseRowContentHeight=function(){return 0;};R.prototype.getBaseRowHeightOfTable=function(){var o=this.getTable();return o?o._getBaseRowHeight():0;};R.prototype.getDefaultRowContentHeightOfTable=function(){var o=this.getTable();return o?o._getDefaultRowContentHeight():0;};R.prototype.getTotalRowCountOfTable=function(){var o=this.getTable();return o?o._getTotalRowCount():0;};R.prototype._onTableRowsUnbound=function(){clearTimeout(this.getTable()._mTimeouts.refreshRowsCreateRows);this.updateTable(T.RowsUpdateReason.Unbind);};R.prototype._onTableUpdateRows=function(r){var o=this.getTable();clearTimeout(o._mTimeouts.refreshRowsCreateRows);_(this).updateTableAsync(r);};R.prototype.applyTableStyles=function(r){var m=this.getTableStyles();if(r){r.style("height",m.height);r.style("min-height",m.minHeight);r.style("max-height",m.maxHeight);return;}var o=this.getTable();var b=o?o.getDomRef():null;if(b){b.style.height=m.height;b.style.minHeight=m.minHeight;b.style.maxHeight=m.maxHeight;}};R.prototype.applyTableBottomPlaceholderStyles=function(r){var p=this.getTableBottomPlaceholderStyles();if(r){r.style("height",p.height);return;}var o=this.getTable();var P=o?o.getDomRef("placeholder-bottom"):null;if(P){P.style.height=p.height;}};R.prototype.applyRowContainerStyles=function(r){var m=this.getRowContainerStyles();if(r){r.style("height",m.height);r.style("min-height",m.minHeight);r.style("max-height",m.maxHeight);return;}var o=this.getTable();var b=o?o.getDomRef("tableCCnt"):null;if(b){b.style.height=m.height;b.style.minHeight=m.minHeight;b.style.maxHeight=m.maxHeight;}};R.prototype.computeStandardizedRowCounts=function(C,f,F){var r=this.getRowCountConstraints();if(r.fixedTop===true){f=1;}else if(r.fixedTop===false){f=0;}if(r.fixedBottom===true){F=1;}else if(r.fixedBottom===false){F=0;}C=Math.max(0,C);f=Math.max(0,f);F=Math.max(0,F);if(f+F>=C){F=Math.max(F>0?1:0,F-Math.max(0,(f+F-(C-1))));f=Math.max(f>0?1:0,f-Math.max(0,(f+F-(C-1))));}if(f+F>=C){F=0;}if(f+F>=C){f=0;}return{count:C,scrollable:C-f-F,fixedTop:f,fixedBottom:F};};R.prototype.getRowCountConstraints=function(){var o=this.getTable();return o?o.getProperty("rowCountConstraints")||{}:{};};R.prototype.renderRowStyles=function(r){};R.prototype.renderCellContentStyles=function(r){};R.prototype.initTableRowsAfterDataRequested=function(r){var o=this.getTable();var b=o.getBinding();clearTimeout(o._mTimeouts.refreshRowsCreateRows);if(!b||r<=0||o.getRows().length>0){return;}b.attachEventOnce("dataRequested",function(){clearTimeout(o._mTimeouts.refreshRowsCreateRows);o._mTimeouts.refreshRowsCreateRows=setTimeout(function(){if(o.getRows().length>0){return;}var d=c(o,r),e;for(var i=0;i<d.length;i++){e=d[i];e.setRowBindingContext(null,o);o.addAggregation("rows",e,true);}o._bRowAggregationInvalid=false;},0);});};R.prototype.updateTableRows=function(){var o=this.getTable();var r=o.getRows();var n=this.getComputedRowCounts().count;var i;var b=false;if(T.isNoDataVisible(o)&&!o.getBinding()){n=0;}else if(T.isVariableRowHeightEnabled(o)&&n>0){n++;}if(o._bRowAggregationInvalid){b=r.length>0;o.destroyAggregation("rows",o._bInvalid?"KeepDom":true);r=[];}if(n===r.length){u(this,r);return b;}T.dynamicCall(o._getSyncExtension,function(s){s.syncRowCount(n);});if(r.length<n){var N=c(o,n-r.length);r=r.concat(N);u(this,r);for(i=0;i<N.length;i++){o.addAggregation("rows",N[i],true);}}else{for(i=r.length-1;i>=n;i--){o.removeAggregation("rows",i,true);}r.splice(n);u(this,r);}b=true;o._bRowAggregationInvalid=false;return b;};R.prototype.renderTableRows=function(){var o=this.getTable();var b=o?o.getDomRef("tableCCnt"):null;if(!b){return;}var B=q.Event("BeforeRendering");B.setMarked("renderRows");B.srcControl=o;o._handleEvent(B);var r=sap.ui.getCore().createRenderManager();var d=o.getRenderer();d.renderTableCCnt(r,o);r.flush(b,false,false);r.destroy();var A=q.Event("AfterRendering");A.setMarked("renderRows");A.srcControl=o;o._handleEvent(A);var h=o.getRows().length>0;var D=o.getDomRef();D.querySelector(".sapUiTableCtrlBefore").setAttribute("tabindex",h?"0":"-1");D.querySelector(".sapUiTableCtrlAfter").setAttribute("tabindex",h?"0":"-1");};R.prototype.getRowContexts=function(r,s){var o=this.getTable();if(!o){return[];}return o._getRowContexts(r,s===true);};R.prototype.fireRowsUpdated=function(r){var o=this.getTable();if(!o||!o._bContextsAvailable){return;}if(!this._bFiredRowsUpdatedAfterRendering){r=T.RowsUpdateReason.Render;if(!_(this).bListeningForFirstRowsUpdatedAfterRendering){_(this).bListeningForFirstRowsUpdatedAfterRendering=true;o.attachEvent("_rowsUpdated",function(){this._bFiredRowsUpdatedAfterRendering=true;_(this).bListeningForFirstRowsUpdatedAfterRendering=false;}.bind(this));}}o._fireRowsUpdated(r);};R.prototype.disableNoData=function(){var o=this.getTable();if(o&&!this.isNoDataDisabled()){_(this).bNoDataDisabled=true;o.invalidate();}};R.prototype.enableNoData=function(){var o=this.getTable();if(o&&this.isNoDataDisabled()){_(this).bNoDataDisabled=false;o.invalidate();}};R.prototype.isNoDataDisabled=function(){return _(this).bNoDataDisabled;};function c(o,r){var b=[];var s=o.getRows().length;for(var i=0;i<r;i++){b.push(o._getRowClone(s+i));}return b;}function u(m,r){var o=m.getTable();if(!o||r.length===0){return;}var C=m.getRowContexts(r.length);for(var i=0;i<r.length;i++){r[i].setRowBindingContext(C[i],o);}}function t(p,f){throw new Error(p+": sap.ui.table.rowmodes.RowMode subclass does not implement #"+f);}a.onBeforeRendering=function(e){var r=e&&e.isMarked("renderRows");if(!r){this._bFiredRowsUpdatedAfterRendering=false;}};return R;});
