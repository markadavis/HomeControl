sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const t=(t,o,i)=>e.html`<${e.scopeTag("ui5-popover",o,i)} skip-registry-update _disable-initial-focus prevent-focus-restore no-padding hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="Left"><div slot="header" class="${e.classMap(t.classes.popoverValueState)}" style="${e.styleMap(t.styles.popoverHeader)}">${t.shouldDisplayDefaultValueStateMessage?s(t):a(t)}</div></${e.scopeTag("ui5-popover",o,i)}>`;const s=(t,s,a)=>e.html`${e.ifDefined(t.valueStateText)}`;const a=(t,s,a)=>e.html`${e.repeat(t.valueStateMessageText,(e,t)=>e._id||t,(e,t)=>o(e))}`;const o=(t,s,a,o,i)=>e.html`${e.ifDefined(t)}`;return t});