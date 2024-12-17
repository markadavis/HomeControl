/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(M){"use strict";var T=M.extend("sap.ui.core.support.controls.TimelineOverview",{metadata:{library:"sap.ui.core"}});T.prototype.setInteractions=function(i){this.interactions=(JSON.parse(JSON.stringify(i)));if(!i||!i.length){return;}this.actualStartTime=i[0].start;this.actualEndTime=i[i.length-1].end;this.timeRange=this.actualEndTime-this.actualStartTime;this.maxDuration=0;this.stepCount=60;var t=this;this.interactions.forEach(function(a){a.start=parseFloat((a.start-t.actualStartTime).toFixed(2));a.end=parseFloat((a.end-t.actualStartTime).toFixed(2));a.calculatedDuration=a.end-a.start;if(a.calculatedDuration>t.maxDuration){t.maxDuration=a.calculatedDuration;}});};T.prototype.render=function(r){r.openStart("div","sapUiInteractionTimelineOverview").openEnd();r.openStart("ol",this.getId()).class("InteractionTimeline").openEnd();var a,b=this.interactions;if(!b||!b.length){return;}var s=this._getTimelineOverviewData(b);var t=this;s.forEach(function(c){if(c.totalDuration>t.maxDuration){t.maxDuration=c.totalDuration;}});for(var i=0;i<s.length;i++){a=s[i];this.renderInteractionStep(r,a,i);}r.close("ol");r.close("div");};T.prototype.renderInteractionStep=function(r,s,i){var a=69,b=Math.ceil((s.totalDuration/this.maxDuration)*a);r.openStart("li").openEnd();r.openStart("div").class("bars-wrapper").attr("title","Duration: "+s.totalDuration+"ms").openEnd();r.openStart("div").class("duration").style("height",b+"%;");if(b>0){r.style("min-height","1px");}r.openEnd();var I=s.interactions,c=100;I.forEach(function(e,i){c=(s.totalDuration===0)?100:Math.ceil((e.calculatedDuration/s.totalDuration)*100);r.openStart("div").class("requestType").style("height",c+"%").style("min-height","1px").openEnd().close("div");if(i!==(I.length-1)){r.openStart("div").style("min-height","1px").openEnd().close("div");}});r.close("div");r.close("div");var d=i+1;var C=(d%10===0)?"sapUiInteractionTimelineStepRightBold":"sapUiInteractionTimelineStepRight";if(d%2===0){r.openStart("div").class(C).openEnd().close("div");}if(d%10===0&&d!==this.stepCount){r.openStart("div").class("sapUiInteractionTimelineTimeLbl").openEnd().text(Math.round((i*this.timeRange/this.stepCount)/10)/100+"s").close("div");}r.close("li");};T.prototype._getTimelineOverviewData=function(c){var s=this.stepCount;var a=this.timeRange/s;var b=[],o={interactions:[]},A=true;for(var i=0;i<s;i++){var d=a*i;var e=d+a;var f=this._filterByTime({start:d,end:e},c);var g={interactions:f,totalDuration:0};f.map(function(h){g.totalDuration+=h.calculatedDuration;});A=f.length>0&&o.interactions.length>0&&f[0].start===o.interactions[0].start;if(A){g.interactions=[];g.totalDuration=0;}b.push(g);o=g;}return b;};T.prototype._filterByTime=function(o,f){return f.filter(function(i){return!(i.end<=o.start||i.start>=o.end);}).map(function(i){var l=Math.max(o.start-i.start,0);var r=Math.max((i.start+i.duration)-o.end,0);i.duration=i.duration-l-r;i.start=Math.max(i.start,o.start);i.end=Math.min(i.end,o.end);return i;});};return T;});
