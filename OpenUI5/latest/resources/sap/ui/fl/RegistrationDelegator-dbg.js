/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides object sap.ui.fl.RegistrationDelegator
sap.ui.define([
	"sap/ui/fl/FlexControllerFactory",
	"sap/ui/core/Component",
	"sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerRegistration",
	"sap/ui/fl/ChangePersistenceFactory",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/core/ExtensionPoint",
	"sap/ui/fl/EventHistory",
	"sap/ui/fl/apply/_internal/flexState/ManifestUtils",
	"sap/ui/fl/apply/_internal/changes/descriptor/Preprocessor",
	"sap/ui/fl/apply/_internal/DelegateMediator",
	"sap/ui/fl/apply/api/DelegateMediatorAPI",
	// the lower 2 are set as a callback in the "register...Processors" which are not detected as dependencies from the preload-building
	"sap/ui/fl/PreprocessorImpl",
	"sap/ui/fl/XmlPreprocessorImpl"
], function(
	FlexControllerFactory,
	Component,
	ChangeHandlerRegistration,
	ChangePersistenceFactory,
	MvcController,
	XMLView,
	ExtensionPoint,
	EventHistory,
	ManifestUtils,
	Preprocessor,
	DelegateMediator,
	DelegateMadiatorAPI
) {
	"use strict";

	/**
	 * This class takes care of all the registration (hooks) needed to run flex!
	 *
	 * @name sap.ui.fl.RegistrationDelegator
	 * @class
	 * @constructor
	 * @author SAP SE
	 * @version 1.96.3
	 * @experimental Since 1.43.0
	 */
	var RegistrationDelegator = {
	};


	function _registerChangesInComponent() {
		Component._fnOnInstanceCreated = FlexControllerFactory.getChangesAndPropagate;
	}


	function _registerChangeHandlers() {
		ChangeHandlerRegistration.registerPredefinedChangeHandlers();
		ChangeHandlerRegistration.getChangeHandlersOfLoadedLibsAndRegisterOnNewLoadedLibs();
	}

	function _registerLoadComponentEventHandler() {
		Component._fnLoadComponentCallback = ChangePersistenceFactory._onLoadComponent.bind(ChangePersistenceFactory);
	}

	function _registerExtensionProvider() {
		MvcController.registerExtensionProvider("sap.ui.fl.PreprocessorImpl");
	}

	function _registerXMLPreprocessor() {
		if (XMLView.registerPreprocessor) {
			XMLView.registerPreprocessor("viewxml", "sap.ui.fl.XmlPreprocessorImpl", true);
		}
	}

	function _registerEventListener() {
		EventHistory.start();
	}

	function _registerDescriptorChangeHandler() {
		Component._fnPreprocessManifest = Preprocessor.preprocessManifest;
	}

	function getExtensionPointProvider(oView) {
		if (ManifestUtils.isFlexExtensionPointHandlingEnabled(oView)) {
			return "sap/ui/fl/apply/_internal/extensionPoint/Processor";
		}
		if (sap.ui.getCore().getConfiguration().getDesignMode()) {
			return "sap/ui/fl/write/_internal/extensionPoint/Processor";
		}
		return undefined;
	}

	function _registerExtensionPointProvider() {
		ExtensionPoint.registerExtensionProvider(getExtensionPointProvider);
	}

	function _registerDefaultDelegate() {
		DelegateMadiatorAPI.registerDefaultDelegate({
			modelType: "sap.ui.model.odata.v4.ODataModel",
			delegate: "sap/ui/fl/write/_internal/delegates/ODataV4ReadDelegate",
			delegateType: DelegateMediator.types.READONLY
		});
	}

	/**
	 * Registers everything in one call
	 *
	 * @public
	 */
	RegistrationDelegator.registerAll = function() {
		_registerEventListener();
		_registerChangeHandlers();
		_registerLoadComponentEventHandler();
		_registerExtensionProvider();
		_registerChangesInComponent();
		_registerXMLPreprocessor();
		_registerDescriptorChangeHandler();
		_registerExtensionPointProvider();
		_registerDefaultDelegate();
	};

	return RegistrationDelegator;
}, /* bExport= */true);
