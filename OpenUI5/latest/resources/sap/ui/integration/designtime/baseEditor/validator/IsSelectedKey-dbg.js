/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/integration/designtime/baseEditor/validator/IsValidBinding"
], function (
	IsValidBinding
) {
	"use strict";

	/**
	 * Validates if the provided value is one of the given keys.
	 *
	 * @namespace sap.ui.integration.designtime.baseEditor.validator.IsSelectedKey
	 * @author SAP SE
	 * @version 1.96.3
	 *
	 * @static
	 * @since 1.81
	 * @public
	 * @experimental 1.81
	 */
	return {
		async: false,
		errorMessage: "BASE_EDITOR.VALIDATOR.FORBIDDEN_CUSTOM_VALUE",
		/**
		 * Validator function
		 *
		 * @param {string} sValue - Key to validate
		 * @param {object} oConfig - Validator config
		 * @param {string[]} oConfig.keys - Available keys
		 * @returns {boolean} Validation result
		 *
		 * @public
		 * @function
		 * @name sap.ui.integration.designtime.baseEditor.validator.IsSelectedKey.validate
		 */
		validate: function (sValue, oConfig) {
			return sValue === undefined
				|| (oConfig.keys || []).includes(sValue)
				|| IsValidBinding.validate(sValue, { allowPlainStrings: false });
		}
	};
});
