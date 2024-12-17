/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/library"],function(f){"use strict";var S={};S.applyChange=function(c,C,p){var m=p.modifier;var o=c.getDefinition();m.setProperty(C,"selectedKey",o.content.selectedKey);c.setRevertData(o.content.previousSelectedKey);};S.revertChange=function(c,C,p){var m=p.modifier;var P=c.getRevertData();m.setProperty(C,"selectedKey",P);c.resetRevertData();};S.completeChangeContent=function(c,s,p){};S.getCondenserInfo=function(c){return{affectedControl:c.getSelector(),classification:f.condenser.Classification.LastOneWins,uniqueKey:c.getContent().selectedKey};};return S;});
