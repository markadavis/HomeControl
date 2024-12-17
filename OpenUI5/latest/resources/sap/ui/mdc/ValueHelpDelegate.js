/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/BaseDelegate","sap/ui/model/FilterType"],function(B,F){"use strict";var V=Object.assign({},B);V.retrieveContent=function(p,c){return Promise.resolve();};V.isSearchSupported=function(p,l){return false;};V.executeSearch=function(p,l,s){return Promise.resolve();};V.executeFilter=function(p,l,f,r){if(l.isA("sap.ui.model.json.JSONListBinding")){l.filter(f,F.Application);return Promise.resolve(l);}else{var R;var c=function(){R(l);};l.attachEventOnce("dataReceived",c);l.initialize();l.filter(f,F.Application);l.getContexts(0,r);return new Promise(function(a,b){R=a;});}};V.checkBindingsPending=function(p,b){return null;};V.checkListBindingPending=function(p,l,L){return false;};return V;});
