/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(M){"use strict";var T=M.extend("sap.ui.dt.test.Test",{metadata:{"abstract":true}});T.STATUS={SUPPORTED:{key:"SUPPORTED",text:"supported",value:3},PARTIAL_SUPPORTED:{key:"PARTIAL_SUPPORTED",text:"partial supported",value:2},NOT_SUPPORTED:{key:"NOT_SUPPORTED",text:"not supported",value:1},ERROR:{key:"ERROR",text:"error",value:0},UNKNOWN:{key:"UNKNOWN",text:"unknown",value:0}};T.TYPE={TEST:"Test",GROUP:"Group",SUITE:"Suite"};T.prototype.createSuite=function(n,m){return this.add(null,false,n,m,null,T.TYPE.SUITE);};T.prototype.addGroup=function(p,n,m,N){return this.add(p,true,n+(N?(" ("+N+")"):""),m,null,T.TYPE.GROUP);};T.prototype.addTest=function(p,r,n,m,s){return this.add(p,r,n,m,s,T.TYPE.TEST);};T.prototype.add=function(p,r,n,m,s,t){if(!s){if(r){s=T.STATUS.SUPPORTED;}else{s=T.STATUS.NOT_SUPPORTED;}}var e={name:n,message:m,result:r,status:s,type:t,statistic:{},children:[]};if(p){p.push(e);}return e;};T.prototype.run=function(){throw new Error("Abstract method");};T.prototype.aggregate=function(r){if(r.type!==T.TYPE.TEST&&r.children.length>0){var c=r.children;var m=c.map(function(e){var C=this.aggregate(e);return{result:C.result,status:C.status};},this);if(m.length===1){m.push(m[0]);}var R=m.reduce(function(p,C){return{result:this._getResult(p,C),status:this._getStatus(p,C),statistic:this._getStatistic(p,C)};}.bind(this));r.result=R.result;r.status=R.status;r.statistic=R.statistic;}return r;};T.prototype._getResult=function(p,c){return!p.result?false:c.result;};T.prototype._getStatus=function(p,c){return p.status.value<c.status.value?p.status:c.status;};T.prototype._getStatistic=function(p,c){var s=this._getStatisticObjectForEntry(p);if(p!==c){s[c.status.key]++;}return s;};T.prototype._getStatisticObjectForEntry=function(e){var s={};if(!e.statistic){for(var S in T.STATUS){s[S]=0;}s[e.status.key]++;}else{s=e.statistic;}return s;};return T;});
