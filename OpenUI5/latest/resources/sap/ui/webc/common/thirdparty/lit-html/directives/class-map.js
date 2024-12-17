sap.ui.define(["exports","../lit-html","../directive"],function(t,e,s){"use strict";
/**
	 * @license
	 * Copyright 2018 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */const i=s.directive(class extends s.Directive{constructor(t){var e;if(super(t),t.type!==s.PartType.ATTRIBUTE||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).filter(e=>t[e]).join(" ")}update(t,[s]){if(void 0===this.bt){this.bt=new Set;for(const t in s)s[t]&&this.bt.add(t);return this.render(s)}const i=t.element.classList;this.bt.forEach(t=>{t in s||(i.remove(t),this.bt.delete(t))});for(const t in s){const e=!!s[t];e!==this.bt.has(t)&&(e?(i.add(t),this.bt.add(t)):(i.remove(t),this.bt.delete(t)))}return e.noChange}});t.classMap=i;Object.defineProperty(t,"__esModule",{value:true})});