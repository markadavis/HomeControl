/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function _(){this.mCache={};}_.prototype.addContext=function(c,p,l){var C,L;L=this.mCache[p];if(!L){L=this.mCache[p]={};}C=L[l];if(!C){C=L[l]=[];}C.unshift(c);};_.prototype.findAndRemoveContext=function(c){var t=this;Object.keys(this.mCache).some(function(C){var l=t.mCache[C];return Object.keys(l).some(function(L){var a=t.mCache[C][L];if(a.includes(c)){t.removeContext(c,C,L);return true;}return false;});});};_.prototype.getContexts=function(p,l){var L=this.mCache[p],c=L&&L[l];return c?c.slice():[];};_.prototype.removeContext=function(c,p,l){var L=this.mCache[p],C=L[l];C.splice(C.indexOf(c),1);if(!C.length){delete L[l];if(!Object.keys(L).length){delete this.mCache[p];}}};return _;},false);
