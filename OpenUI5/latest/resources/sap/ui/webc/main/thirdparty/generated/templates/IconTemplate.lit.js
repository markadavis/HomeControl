sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,n,o)=>e.html`<svg class="ui5-icon-root" tabindex="${e.ifDefined(i.tabIndex)}" dir="${e.ifDefined(i._dir)}" viewBox="0 0 512 512" role="${e.ifDefined(i.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${e.ifDefined(i.effectiveAccessibleName)}" aria-hidden=${e.ifDefined(i.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${i._onfocusin} @focusout=${i._onfocusout} @keydown=${i._onkeydown} @keyup=${i._onkeyup} @click=${i._onclick}>${t(i)}</svg>`;const n=(i,n,t)=>e.svg`<title id="${e.ifDefined(i._id)}-tooltip">${e.ifDefined(i.effectiveAccessibleName)}</title>`;const t=(i,t,o)=>e.svg`${i.hasIconTooltip?n(i):undefined}<g role="presentation"><path d="${e.ifDefined(i.pathData)}"/></g>`;return i});