sap.ui.define(["exports","./lit-html"],function(t,e){"use strict";
/**
	 * @license
	 * Copyright 2020 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */const s=t=>({It:t}),i=(t,...e)=>({It:e.reduce((e,s,i)=>e+(t=>{if(void 0!==t.It)return t.It;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0])}),r=new Map,l=t=>(e,...s)=>{var i;const l=s.length;let o,u;const n=[],a=[];let c,d=0,f=!1;for(;d<l;){for(c=e[d];d<l&&void 0!==(u=s[d],o=null===(i=u)||void 0===i?void 0:i.It);)c+=o+e[++d],f=!0;a.push(u),n.push(c),d++}if(d===l&&n.push(e[l]),f){const t=n.join("$$lit$$");void 0===(e=r.get(t))&&r.set(t,e=n),s=a}return t(e,...s)},o=l(e.html),u=l(e.svg);t.html=o;t.literal=i;t.svg=u;t.unsafeStatic=s;t.withStatic=l;Object.defineProperty(t,"__esModule",{value:true})});