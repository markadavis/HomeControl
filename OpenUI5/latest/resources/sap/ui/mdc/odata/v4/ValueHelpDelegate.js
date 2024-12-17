/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../../ValueHelpDelegate","sap/ui/model/FilterType"],function(V,F){"use strict";var O=Object.assign({},V);O.isSearchSupported=function(p,l){return true;};var _=function(b){return new Promise(function(r){var a=false;var h=function(p){if(p.mParameters.detailedReason){return;}if(!a){a=true;b.detachEvent("change",h);r(b);}};b.attachEvent("change",h);b.attachEventOnce("dataReceived",h);});};O.executeSearch=function(p,l,s){if(s){l.changeParameters({$search:s});}else{l.changeParameters({$search:undefined});}return _(l);};O.executeFilter=function(p,l,f,r){l.initialize();l.filter(f,F.Application);l.getContexts(0,r);return _(l);};O.checkBindingsPending=function(p,b){var P=[];for(var i=0;i<b.length;i++){var B=b[i];if(B&&B.requestValue){P.push(B.requestValue());}}if(P.length>0){return Promise.all(P);}return null;};O.checkListBindingPending=function(p,l,L){if(!l||l.isSuspended()){return false;}return l.requestContexts(0,L&&L.length).then(function(c){return c.length===0;});};return O;});
