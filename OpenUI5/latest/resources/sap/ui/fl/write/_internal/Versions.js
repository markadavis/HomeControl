/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/registry/Settings","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/write/_internal/Storage","sap/ui/model/json/JSONModel","sap/ui/fl/Utils","sap/ui/model/BindingMode"],function(S,C,a,J,U,B){"use strict";var _={};var M=9;var b=M+1;function c(p,v,g){var h=f(g);var n=sap.ui.fl.Versions.Original;g.forEach(function(o){if(o.version===sap.ui.fl.Versions.Draft){o.type="draft";}else if(n===sap.ui.fl.Versions.Original){o.type="active";n=o.version;}else{o.type="inactive";}});return U.getUShellService("URLParsing").then(function(u){var P=U.getParameter(sap.ui.fl.Versions.UrlParameter,u);var i;if(P){i=parseInt(P);}else if(g.length>0){i=g[0].version;}else{i=sap.ui.fl.Versions.Original;}var m=new J({versioningEnabled:v,versions:g,activeVersion:n,backendDraft:h,dirtyChanges:false,draftAvailable:h,activateEnabled:h,persistedVersion:i,displayedVersion:i});m.setDefaultBindingMode(B.OneWay);m.setSizeLimit(M);m.setDirtyChanges=function(D){m.setProperty("/dirtyChanges",D);m.updateDraftVersion();m.updateBindings(true);};m.updateDraftVersion=function(){var g=m.getProperty("/versions");var v=m.getProperty("/versioningEnabled");var D=m.getProperty("/dirtyChanges");var h=m.getProperty("/backendDraft");var j=v&&(D||h);m.setProperty("/draftAvailable",j);var k=D?sap.ui.fl.Versions.Draft:m.getProperty("/persistedVersion");m.setProperty("/displayedVersion",k);if(!f(g)&&j){g.splice(0,0,{version:sap.ui.fl.Versions.Draft,type:"draft"});}if(f(g)&&!j){g.shift();m.setProperty("/displayedVersion",m.getProperty("/persistedVersion"));}var A=m.getProperty("/displayedVersion")!==m.getProperty("/activeVersion");m.setProperty("/activateEnabled",A);};return m;});}function d(p,D){var g=[];var h=D.changePersistences;h.forEach(function(o){g=o.getDirtyChanges().concat();g.forEach(function(i){o.deleteChange(i,true);});});return g.length>0;}function e(p){var D={dirtyChangesExist:false,changePersistences:[]};if(p.reference){var o=C.getChangePersistenceForComponent(p.reference);if(o.getDirtyChanges().length>0){D.dirtyChangesExist=true;D.changePersistences.push(o);}}if(p.nonNormalizedReference){var g=C.getChangePersistenceForComponent(p.nonNormalizedReference);if(g.getDirtyChanges().length>0){D.dirtyChangesExist=true;D.changePersistences.push(g);}}return D;}function f(v){return v.some(function(o){return o.version===sap.ui.fl.Versions.Draft;});}var V={};V.initialize=function(p){var r=p.reference;var l=p.layer;p.limit=b;return S.getInstance().then(function(s){var v=s.isVersioningEnabled(l);var g=v?a.versions.load(p):Promise.resolve([]);return g.then(function(h){return c(p,v,h);}).then(function(m){_[r]=_[r]||{};_[r][l]=_[r][l]||{};_[r][l]=m;return _[r][l];});});};V.getVersionsModel=function(p){var r=p.reference;var l=p.layer;if(!_[r]||!_[r][l]){throw Error("Versions Model for reference '"+r+"' and layer '"+l+"' were not initialized.");}var D=e(p);if(D.dirtyChangesExist){_[r][l].updateDraftVersion(p);}return _[r][l];};V.clearInstances=function(){_={};};V.onAllChangesSaved=function(p){p.reference=U.normalizeReference(p.reference);var m=V.getVersionsModel(p);var v=m.getProperty("/versioningEnabled");var D=m.getProperty("/dirtyChanges");m.setProperty("/dirtyChanges",true);m.setProperty("/backendDraft",v&&D);m.updateDraftVersion();};V.activate=function(p){var m=V.getVersionsModel(p);var v=m.getProperty("/versions");var D=f(v);var s=m.getProperty("/displayedVersion");var A=m.getProperty("/activeVersion");var n=m.getProperty("/persistedVersion");if(s===A){return Promise.reject("Version is already active");}p.version=s;var g=[];if(m.getProperty("/dirtyChanges")){var o=e(p);var h=o.changePersistences;g=h.map(function(i){return i.saveDirtyChanges(p.appComponent,false,undefined,n);});}return Promise.all(g).then(a.versions.activate.bind(undefined,p)).then(function(i){v.forEach(function(j){j.type="inactive";});i.type="active";if(D){v.shift();}v.splice(0,0,i);m.setProperty("/backendDraft",false);m.setProperty("/dirtyChanges",false);m.setProperty("/draftAvailable",false);m.setProperty("/activateEnabled",false);m.setProperty("/activeVersion",i.version);m.setProperty("/displayedVersion",i.version);m.setProperty("/persistedVersion",i.version);m.updateBindings(true);});};V.discardDraft=function(p){var m=V.getVersionsModel(p);var v=m.getProperty("/versions");var D=e(p);var g=m.getProperty("/backendDraft");var o=g?a.versions.discardDraft(p):Promise.resolve();return o.then(function(){v.shift();m.setProperty("/backendDraft",false);m.setProperty("/dirtyChanges",false);m.setProperty("/draftAvailable",false);m.setProperty("/activateEnabled",false);m.setProperty("/displayedVersion",m.getProperty("/persistedVersion"));m.updateBindings(true);var h=d(p,D);return{backendChangesDiscarded:g,dirtyChangesDiscarded:h};});};return V;});
