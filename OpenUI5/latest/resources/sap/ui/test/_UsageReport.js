/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/_OpaLogger","sap/ui/thirdparty/jquery"],function(U,_,q){"use strict";var D="http://localhost:8090";var l=_.getLogger("sap.ui.test._UsageReport");var a=U.extend("sap.ui.test._UsageReport",{constructor:function(c){this.enabled=c&&c.enableUsageReport;this.baseUrl=(c&&c.usageReportUrl||D)+"/api/opa/suites/";if(this.enabled){l.info("Enabled OPA usage report");}var P=sap.ui.test._UsageReport.prototype;Object.keys(P).forEach(function(k){var i=["constructor","getMetadata"].indexOf(k)>-1;if(P.hasOwnProperty(k)&&typeof P[k]==="function"&&!i){var o=P[k];P[k]=function(){if(this.enabled){return o.apply(this,arguments);}};}});},begin:function(d){this._beginSuitePromise=p(this.baseUrl+"begin",d).done(function(b){this._id=b.id;l.debug("Begin report with ID "+b.id);}.bind(this)).fail(function(e){l.debug("Failed to begin report. Error: "+JSON.stringify(e));});},moduleStart:function(d){this._moduleUpdate(d);},testStart:function(){this._isOpaEmpty=false;this._QUnitTimeoutDetails=null;},testDone:function(d){if(this._isOpaEmpty){this._reportOpaTest(d);this._isOpaEmpty=false;}else{this._QUnitTimeoutDetails=d;}},opaEmpty:function(o){this._isOpaEmpty=true;if(o&&o.qunitTimeout){var L=this._QUnitTimeoutDetails.assertions.slice(-1)[0];L.message+="\n"+o.errorMessage;this._reportOpaTest(this._QUnitTimeoutDetails);}},moduleDone:function(d){this._moduleUpdate(d);},done:function(d){this._postSuiteJson("/done",d).done(function(b){l.debug("Completed report with ID "+this._id);}.bind(this)).fail(function(e){l.debug("Failed to complete report with ID "+this._id+". Error: "+JSON.stringify(e));}.bind(this)).always(function(){this._beginSuitePromise=null;}.bind(this));},_moduleUpdate:function(d){this._postSuiteJson("/modules",d).done(function(b){l.debug("Sent report for module "+d.name);}).fail(function(e){l.debug("Failed to send report for module '"+d.name+"'. Error: "+JSON.stringify(e));});},_reportOpaTest:function(d){this._postSuiteJson("/tests",d).done(function(b){l.debug("Sent report for test "+d.name);}).fail(function(e){l.debug("Failed send report for test '"+d.name+"'. Error: "+JSON.stringify(e));});},_postSuiteJson:function(u,d){var P=this._beginSuitePromise||new q.Deferred().resolve().promise();return P.done(function(){return p.call(this,this.baseUrl+this._id+u,d);}.bind(this));}});function p(u,d){return q.ajax({url:u,type:"XHR_WAITER_IGNORE:POST",data:d,dataType:"json"});}return a;});
