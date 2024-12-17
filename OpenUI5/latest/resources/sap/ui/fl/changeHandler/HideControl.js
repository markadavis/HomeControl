/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log",'sap/ui/fl/changeHandler/JsControlTreeModifier'],function(L,J){"use strict";var P="visible";var H={};H.applyChange=function(c,C,p){var m=p.modifier;return Promise.resolve().then(m.getVisible.bind(m,C)).then(function(v){c.setRevertData({originalValue:v});m.setVisible(C,false);});};H.revertChange=function(c,C,p){var r=c.getRevertData();return Promise.resolve().then(function(){if(r){p.modifier.setVisible(C,r.originalValue);c.resetRevertData();}else{L.error("Attempt to revert an unapplied change.");}});};H.completeChangeContent=function(){};H.getCondenserInfo=function(c){return{affectedControl:c.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:P};};H.getChangeVisualizationInfo=function(c,a){var s=c.getSelector();var e=J.bySelector(s,a);return{affectedControls:[s],displayControls:[e.getParent().getId()]};};return H;},true);
