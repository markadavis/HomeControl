/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var U={};U.applyChange=function(c,C,p){var m=c.getContent();var M=p.modifier;var s=false;var u;return Promise.resolve().then(M.getStashed.bind(M,C)).then(function(P){c.setRevertData({originalValue:P});u=M.setStashed(C,s,p.appComponent)||C;if(m.parentAggregationName){var t=m.parentAggregationName;var T=M.getParent(u);return Promise.resolve().then(M.removeAggregation.bind(M,T,t,u)).then(M.insertAggregation.bind(M,T,t,u,m.index,p.view));}return undefined;}).then(function(){return u;});};U.revertChange=function(c,C,p){var r=c.getRevertData();p.modifier.setStashed(C,r.originalValue);c.resetRevertData();};U.completeChangeContent=function(c,s){var C=c.getDefinition();if(s.content){C.content=s.content;}};U.getCondenserInfo=function(c){return{affectedControl:c.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:"stashed"};};return U;});
