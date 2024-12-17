/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/ControlPersonalizationAPI","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/ChangesController"],function(O,U,C){"use strict";var F={isPersonalized:function(p){return O.isPersonalized(p.selectors,p.changeTypes);},waitForChanges:function(p){var c;var f;if(p.element){c=[{selector:p.element}];f=p.element;}else if(p.selectors){c=p.selectors.map(function(s){return{selector:s};});f=p.selectors[0];}else if(p.complexSelectors){c=p.complexSelectors;f=p.complexSelectors[0].selector;}return C.getFlexControllerInstance(f).waitForChangesToBeApplied(c);},isFlexSupported:function(p){return!!U.getAppComponentForControl(p.element);},hasVariantManagement:function(p){return O.hasVariantManagement(p.element);}};return F;});
