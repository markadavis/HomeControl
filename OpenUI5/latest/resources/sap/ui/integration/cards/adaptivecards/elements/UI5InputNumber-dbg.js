/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards"], function (AdaptiveCards) {
	"use strict";
	function UI5InputNumber() {
		AdaptiveCards.NumberInput.apply(this, arguments);
	}
	/**
	 * Constructor for a new <code>UI5InputNumber</code>.
	 *
	 * @class
	 * An object that overwrites Microsoft's AdaptiveCard <code>Input.Number</code> element by replacing it with
	 * <code>ui5-input</code> web component with type Number.
	 *
	 * @author SAP SE
	 * @version 1.96.3
	 *
	 * @private
	 * @since 1.74
	 */
	UI5InputNumber.prototype = Object.create(AdaptiveCards.NumberInput.prototype);
	UI5InputNumber.prototype.internalRender = function () {
		this._numberInputElement = document.createElement("ui5-input");

		this._numberInputElement.type = "Number";
		this._numberInputElement.id = this.id;
		this._numberInputElement.placeholder = this.placeholder || "";
		this._numberInputElement.value = this.defaultValue || "";

		this._numberInputElement.addEventListener("change", function (oEvent) {
			// the logic for min and max value from the native number input is handled here, since there are no similar properties in the ui5-input web component
			if (oEvent.target.value > this.max) {
				oEvent.target.value = this.max;
			}
			if (oEvent.target.value < this.min) {
				oEvent.target.value = this.min;
			}
			this.valueChanged();
		}.bind(this));

		return this._numberInputElement;

	};

	Object.defineProperty(UI5InputNumber.prototype, "value", {
		get: function () {
			return this._numberInputElement ? this._numberInputElement.value : undefined;
		}
	});

	return UI5InputNumber;
});
