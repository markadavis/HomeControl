sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const t=(t,a,o)=>e.html`${t.displayValueStateMessagePopover?s(t,a,o):undefined}`;const s=(t,s,o)=>e.html`<${e.scopeTag("ui5-popover",s,o)} skip-registry-update prevent-focus-restore no-padding hide-arrow _disable-initial-focus class="ui5-valuestatemessage-popover" style="${e.styleMap(t.styles.valueStateMsgPopover)}" placement-type="Bottom" horizontal-align="Left"><div slot="header" class="ui5-valuestatemessage-root ${e.classMap(t.classes.valueStateMsg)}">${t.hasCustomValueState?a(t):i(t)}</div></${e.scopeTag("ui5-popover",s,o)}>`;const a=(t,s,a)=>e.html`${e.repeat(t.valueStateMessageText,(e,t)=>e._id||t,(e,t)=>o(e))}`;const o=(t,s,a,o,i)=>e.html`${e.ifDefined(t)}`;const i=(t,s,a)=>e.html`${e.ifDefined(t.valueStateText)}`;return t});