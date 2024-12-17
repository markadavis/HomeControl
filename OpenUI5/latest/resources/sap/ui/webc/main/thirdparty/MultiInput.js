sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Keys","./generated/i18n/i18n-defaults","./Input","./generated/templates/MultiInputTemplate.lit","./generated/themes/MultiInput.css","./Token","./Tokenizer","./Icon"],function(e,t,s,n,i,o,r,u,a){"use strict";function l(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var c=l(e);const h={tag:"ui5-multi-input",properties:{showValueHelpIcon:{type:Boolean},expandedTokenizer:{type:Boolean}},slots:{tokens:{type:HTMLElement}},events:{"value-help-trigger":{},"token-delete":{detail:{token:{type:HTMLElement}}}}};class p extends n{static get metadata(){return h}static get render(){return c}static get template(){return i}static get styles(){return[n.styles,o]}constructor(){super();this._skipOpenSuggestions=false}valueHelpPress(e){this.closePopover();this.fireEvent("value-help-trigger",{})}showMorePress(e){this.expandedTokenizer=false;this.focus()}tokenDelete(e){this.fireEvent("token-delete",{token:e.detail.ref});this.focus()}valueHelpMouseDown(e){this.closePopover();this.tokenizer.closeMorePopover();this._valueHelpIconPressed=true;e.target.focus()}_tokenizerFocusOut(e){if(!this.contains(e.relatedTarget)){this.tokenizer._tokens.forEach(e=>{e.selected=false});this.tokenizer.scrollToStart()}}valueHelpMouseUp(e){setTimeout(()=>{this._valueHelpIconPressed=false},0)}innerFocusIn(){this.expandedTokenizer=true}_onkeydown(e){super._onkeydown(e);if(t.isLeft(e)){this._skipOpenSuggestions=true;return this._handleLeft(e)}this._skipOpenSuggestions=false;if(t.isBackSpace(e)&&e.target.value===""){e.preventDefault();this.tokenizer._focusLastToken()}if(t.isShow(e)){this.valueHelpPress()}}_onTokenizerKeydown(e){if(t.isRight(e)){const e=this.tokenizer._tokens.length-1;if(this.tokenizer._tokens[e]===document.activeElement){setTimeout(()=>{this.focus()},0)}}}_handleLeft(){const e=this.getDomRef().querySelector(`input`).selectionStart;if(e===0){this.tokenizer._focusLastToken()}}_onfocusout(e){super._onfocusout(e);const t=e.relatedTarget;const s=this.contains(t);const n=this.shadowRoot.contains(t);if(!s&&!n){this.expandedTokenizer=false}}async _onfocusin(e){const t=await this.getInputDOMRef();if(e.target===t){await super._onfocusin(e)}}shouldOpenSuggestions(){const e=super.shouldOpenSuggestions();const t=this._valueHelpIconPressed;const s=this.value!=="";return e&&s&&!t&&!this._skipOpenSuggestions}lastItemDeleted(){setTimeout(()=>{this.focus()},0)}get tokenizer(){return this.shadowRoot.querySelector("[ui5-tokenizer]")}get _tokensCountText(){if(!this.tokenizer){return}return this.tokenizer._tokensCountText()}get _tokensCountTextId(){return`${this._id}-hiddenText-nMore`}get _placeholder(){if(this.tokenizer&&this.tokenizer._tokens.length){return""}return this.placeholder}get accInfo(){const e=`${this._tokensCountTextId} ${this.suggestionsTextId} ${this.valueStateTextId}`.trim();return{input:{...super.accInfo.input,ariaRoledescription:this.ariaRoleDescription,ariaDescribedBy:e}}}get ariaRoleDescription(){return this.i18nBundle.getText(s.MULTIINPUT_ROLEDESCRIPTION_TEXT)}static get dependencies(){return[...n.dependencies,u,r,a]}}p.define();return p});