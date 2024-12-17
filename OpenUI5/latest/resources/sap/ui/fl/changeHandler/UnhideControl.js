/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(L){"use strict";var P="visible";var U={};U.applyChange=function(c,C,p){var m=p.modifier;return Promise.resolve().then(m.getProperty.bind(m,C,P)).then(function(o){c.setRevertData({originalValue:o});p.modifier.setVisible(C,true);});};U.revertChange=function(c,C,p){var r=c.getRevertData();if(r){p.modifier.setVisible(C,r.originalValue);c.resetRevertData();}else{L.error("Attempt to revert an unapplied change.");}};U.completeChangeContent=function(){};U.getCondenserInfo=function(c){return{affectedControl:c.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:P};};return U;},true);
