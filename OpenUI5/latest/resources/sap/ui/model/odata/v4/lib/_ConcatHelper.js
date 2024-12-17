/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper"],function(_){"use strict";return{enhanceCache:function(c,a,A,m){var f;c.getResourcePathWithQuery=function(s,e){var q=_.buildApply(a,Object.assign({},this.mQueryOptions,{$skip:s,$top:e-s}),1,f,m);f=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,q,false,true);};c.handleResponse=function(s,e,r,t){A.forEach(function(h){var o;if(h){o=r.value.shift();if("UI5__count"in o){r["@odata.count"]=o.UI5__count;}h(o);}});delete this.handleResponse;this.handleResponse(s,e,r,t);};}};},false);
