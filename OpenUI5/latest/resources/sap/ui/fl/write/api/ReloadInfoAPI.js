/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/LayerUtils","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/write/api/VersionsAPI","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/api/PersistenceWriteAPI","sap/base/util/UriParameters"],function(L,a,U,M,V,F,P){"use strict";function i(r){var u=!!U.getParameter(sap.ui.fl.Versions.UrlParameter,r.URLParsingService);if(u){return Promise.resolve(false);}return F.isVersioningEnabled(r.layer).then(function(v){return v&&V.isDraftAvailable({selector:r.selector,layer:r.layer});});}function b(r){var u=this.hasMaxLayerParameterWithValue({value:r.layer},r.URLParsingService);var d=r.layer===a.USER;if(d||u){return Promise.resolve(false);}return P.hasHigherLayerChanges({selector:r.selector,ignoreMaxLayerParameter:r.ignoreMaxLayerParameter,upToLayer:r.layer,includeCtrlVariants:r.includeCtrlVariants,includeDirtyChanges:true});}function c(r){var C=g(r.selector);if(C!==null){return false;}var p={selector:r.selector,layer:r.layer};return P.getResetAndPublishInfo(p).then(function(o){s(o,r.selector);return!o.allContextsProvided;});}function g(C){var f=M.getFlexReferenceForControl(C);var p=f||"true";var o=JSON.parse(window.sessionStorage.getItem("sap.ui.fl.info."+p));return o&&!o.allContextsProvided;}function s(I,C){var f=M.getFlexReferenceForControl(C);var p=f||"true";window.sessionStorage.setItem("sap.ui.fl.info."+p,JSON.stringify(I));}var R={getReloadReasonsForStart:function(r){return Promise.all([b.call(this,r),i(r),c(r)]).then(function(d){r.hasHigherLayerChanges=d[0];r.isDraftAvailable=d[1];r.allContexts=d[2];return r;});},removeInfoSessionStorage:function(C){var f=M.getFlexReferenceForControl(C);var p=f||"true";window.sessionStorage.removeItem("sap.ui.fl.info."+p);},hasVersionParameterWithValue:function(p,u){return U.hasParameterAndValue(sap.ui.fl.Versions.UrlParameter,p.value,u);},hasMaxLayerParameterWithValue:function(p,u){var d=L.FL_MAX_LAYER_PARAM;return U.hasParameterAndValue(d,p.value,u);},handleUrlParametersForStandalone:function(r){if(r.hasHigherLayerChanges){r.parameters=U.handleUrlParameters(r.parameters,L.FL_MAX_LAYER_PARAM,r.layer,r.URLParsingService);}var v=new RegExp("\&*"+sap.ui.fl.Versions.UrlParameter+"=-?\\d*\&?","g");r.parameters=r.parameters.replace(v,"");if(r.isDraftAvailable&&!r.onExit){r.parameters=U.handleUrlParameters(r.parameters,sap.ui.fl.Versions.UrlParameter,sap.ui.fl.Versions.Draft,r.URLParsingService);}if(r.versionSwitch){r.parameters=U.handleUrlParameters(r.parameters,sap.ui.fl.Versions.UrlParameter,r.version,r.URLParsingService);}if(r.parameters==="?"){r.parameters="";}return r.parameters;},handleParametersOnStart:function(r){var p=U.getParsedURLHash(r.URLParsingService);p.params=p.params||{};if(r.hasHigherLayerChanges){p.params[L.FL_MAX_LAYER_PARAM]=[r.layer];}if(r.isDraftAvailable){p.params[sap.ui.fl.Versions.UrlParameter]=[sap.ui.fl.Versions.Draft];}return p;},initialDraftGotActivated:function(r){if(r.versioningEnabled){var u=this.hasVersionParameterWithValue({value:sap.ui.fl.Versions.Draft.toString()},r.URLParsingService);return!V.isDraftAvailable(r)&&u;}return false;},getReloadMethod:function(r){var o={NOT_NEEDED:"NO_RELOAD",RELOAD_PAGE:"HARD_RELOAD",VIA_HASH:"CROSS_APP_NAVIGATION"};r.reloadMethod=o.NOT_NEEDED;r.isDraftAvailable=r.isDraftAvailable||R.hasVersionParameterWithValue({value:sap.ui.fl.Versions.Draft.toString()},r.URLParsingService);if(r.activeVersion>sap.ui.fl.Versions.Original){r.activeVersionNotSelected=r.activeVersion&&!R.hasVersionParameterWithValue({value:r.activeVersion.toString()},r.URLParsingService);}r.hasHigherLayerChanges=R.hasMaxLayerParameterWithValue({value:r.layer},r.URLParsingService);r.initialDraftGotActivated=R.initialDraftGotActivated(r);if(r.initialDraftGotActivated){r.isDraftAvailable=false;}r.allContexts=g(r.selector);if(r.changesNeedReload||r.isDraftAvailable||r.hasHigherLayerChanges||r.initialDraftGotActivated||r.activeVersionNotSelected||r.allContexts){r.reloadMethod=o.RELOAD_PAGE;if(!r.changesNeedReload&&U.getUshellContainer()){r.reloadMethod=o.VIA_HASH;}}this.removeInfoSessionStorage(r.selector);return r;}};return R;});
