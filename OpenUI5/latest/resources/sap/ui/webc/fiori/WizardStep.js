/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/WizardStep"],function(e,t){"use strict";var a=e.extend("sap.ui.webc.fiori.WizardStep",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-wizard-step-ui5",interfaces:["sap.ui.webc.fiori.IWizardStep"],properties:{accessibleName:{type:"string",defaultValue:""},accessibleNameRef:{type:"string",defaultValue:""},branching:{type:"boolean",defaultValue:false},disabled:{type:"boolean",defaultValue:false},icon:{type:"string",defaultValue:""},selected:{type:"boolean",defaultValue:false},subtitleText:{type:"string",defaultValue:""},titleText:{type:"string",defaultValue:""}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true}}}});return a});