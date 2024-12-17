sap.ui.define(["exports","sap/ui/webc/common/thirdparty/lit-html/static","sap/ui/webc/common/thirdparty/lit-html/directives/repeat","sap/ui/webc/common/thirdparty/lit-html/directives/class-map","sap/ui/webc/common/thirdparty/lit-html/directives/style-map","sap/ui/webc/common/thirdparty/lit-html/directives/if-defined","sap/ui/webc/common/thirdparty/lit-html/directives/unsafe-html"],function(t,e,i,s,n,o,l){"use strict";
/**
	 * @license
	 * Copyright 2017 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */var r,h,a,c;const d=globalThis.trustedTypes,u=d?d.createPolicy("lit-html",{createHTML:t=>t}):void 0,p=`lit$${(Math.random()+"").slice(9)}$`,v="?"+p,m=`<${v}>`,f=document,g=(t="")=>f.createComment(t),y=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,$=t=>{var e;return H(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,b=/-->/g,N=/>/g,T=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,A=/'/g,S=/"/g,w=/^(?:script|style|textarea)$/i,M=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),I=new WeakMap,_=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let l=o._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=l=new k(e.insertBefore(g(),t),t,void 0,i)}return l.I(t),l},C=f.createTreeWalker(f,129,null,!1),E=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",l=x;for(let e=0;e<i;e++){const i=t[e];let r,h,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,h=l.exec(i),null!==h);)c=l.lastIndex,l===x?"!--"===h[1]?l=b:void 0!==h[1]?l=N:void 0!==h[2]?(w.test(h[2])&&(n=RegExp("</"+h[2],"g")),l=T):void 0!==h[3]&&(l=T):l===T?">"===h[0]?(l=null!=n?n:x,a=-1):void 0===h[1]?a=-2:(a=l.lastIndex-h[2].length,r=h[1],l=void 0===h[3]?T:'"'===h[3]?S:A):l===S||l===A?l=T:l===b||l===N?l=x:(l=T,n=void 0);const d=l===T&&t[e+1].startsWith("/>")?" ":"";o+=l===x?i+m:a>=0?(s.push(r),i.slice(0,a)+"$lit$"+i.slice(a)+p+d):i+p+(-2===a?(s.push(void 0),e):d)}const r=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==u?u.createHTML(r):r,s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const l=t.length-1,r=this.parts,[h,a]=E(t,e);if(this.el=W.createElement(h,i),C.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=C.nextNode())&&r.length<l;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(p)){const i=a[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(p),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?R:"?"===e[1]?V:"@"===e[1]?O:D})}else r.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(w.test(s.tagName)){const t=s.textContent.split(p),e=t.length-1;if(e>0){s.textContent=d?d.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],g()),C.nextNode(),r.push({type:2,index:++n});s.append(t[e],g())}}}else if(8===s.nodeType)if(s.data===v)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(p,t+1));)r.push({type:7,index:n}),t+=p.length-1}n++}}static createElement(t,e){const i=f.createElement("template");return i.innerHTML=t,i}}function L(t,e,i=t,s){var n,o,l,r;if(e===M)return e;let h=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const a=y(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(o=null==h?void 0:h.O)||void 0===o||o.call(h,!1),void 0===a?h=void 0:(h=new a(t),h.T(t,i,s)),void 0!==s?(null!==(l=(r=i).Σi)&&void 0!==l?l:r.Σi=[])[s]=h:i.Σo=h),void 0!==h&&(e=L(t,h.S(t,e.values),h,s)),e}class P{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:f).importNode(i,!0);C.currentNode=n;let o=C.nextNode(),l=0,r=0,h=s[0];for(;void 0!==h;){if(l===h.index){let e;2===h.type?e=new k(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new j(o,this,t)),this.l.push(e),h=s[++r]}l!==(null==h?void 0:h.index)&&(o=C.nextNode(),l++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class k{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=L(this,t,e),y(t)?t===B||null==t||""===t?(this.H!==B&&this.R(),this.H=B):t!==this.H&&t!==M&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):$(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(f.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=W.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new P(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new W(t)),e}g(t){H(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new k(this.k(g()),this.k(g()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class D{constructor(t,e,i,s,n){this.type=1,this.H=B,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(B),this.strings=i):this.H=B}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=L(this,t,e,0),o=!y(t)||t!==this.H&&t!==M,o&&(this.H=t);else{const s=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=L(this,s[i+l],e,l),r===M&&(r=this.H[l]),o||(o=!y(r)||r!==this.H[l]),r===B?t=B:t!==B&&(t+=(null!=r?r:"")+n[l+1]),this.H[l]=r}o&&!s&&this.W(t)}W(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends D{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===B?void 0:t}}class V extends D{constructor(){super(...arguments),this.type=4}W(t){t&&t!==B?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class O extends D{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=L(this,t,e,0))&&void 0!==i?i:B)===M)return;const s=this.H,n=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==B&&(s===B||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class j{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){L(this,t)}}null===(h=(r=globalThis).litHtmlPlatformSupport)||void 0===h||h.call(r,W,k),(null!==(a=(c=globalThis).litHtmlVersions)&&void 0!==a?a:c.litHtmlVersions=[]).push("2.0.0-rc.3");const z=(t,i,s,{host:n}={})=>{if(s){t=e.html`<style>${s}</style>${t}`}_(t,i,{host:n})};const Z=(t,i,s)=>{const n=s&&(i||[]).includes(t)?`${t}-${s}`:t;return e.unsafeStatic(n)};t.html=e.html;t.svg=e.svg;t.unsafeStatic=e.unsafeStatic;t.repeat=i.repeat;t.classMap=s.classMap;t.styleMap=n.styleMap;t.ifDefined=o.ifDefined;t.unsafeHTML=l.unsafeHTML;t.default=z;t.scopeTag=Z;Object.defineProperty(t,"__esModule",{value:true})});