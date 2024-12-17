sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/common/thirdparty/base/util/TabbableElements","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/types/NavigationMode","sap/ui/webc/common/thirdparty/base/util/AriaLabelHelper","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/util/debounce","sap/ui/webc/common/thirdparty/base/util/isElementInView","./types/ListMode","./types/ListGrowingMode","./types/ListSeparators","./BusyIndicator","./generated/templates/ListTemplate.lit","./generated/themes/List.css","./generated/i18n/i18n-defaults"],function(e,t,i,s,r,o,n,a,l,d,h,c,u,m,g,f,p,b,I,y,v){"use strict";function E(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var w=E(e);var S=E(t);var _=E(i);var F=E(s);var L=E(l);var T=E(d);var M=E(u);var R=E(m);const A=250;const N=10;const P={tag:"ui5-list",managedSlots:true,slots:{header:{type:HTMLElement},default:{propertyName:"items",type:HTMLElement}},properties:{headerText:{type:String},footerText:{type:String},indent:{type:Boolean},mode:{type:g,defaultValue:g.None},noDataText:{type:String},separators:{type:p,defaultValue:p.All},growing:{type:f,defaultValue:f.None},busy:{type:Boolean},busyDelay:{type:L,defaultValue:1e3},accessibleName:{type:String},accessibleNameRef:{type:String,defaultValue:""},accessibleRole:{type:String,defaultValue:"listbox"},_inViewport:{type:Boolean},_loadMoreActive:{type:Boolean}},events:{"item-click":{detail:{item:{type:HTMLElement}}},"item-close":{detail:{item:{type:HTMLElement}}},"item-toggle":{detail:{item:{type:HTMLElement}}},"item-delete":{detail:{item:{type:HTMLElement}}},"selection-change":{detail:{selectedItems:{type:Array},previouslySelectedItems:{type:Array},selectionComponentPressed:{type:Boolean}}},"load-more":{}}};class B extends w{static get metadata(){return P}static get render(){return S}static get template(){return I}static get styles(){return y}static async onDefine(){await c.fetchI18nBundle("@ui5/webcomponents")}static get dependencies(){return[b]}constructor(){super();this.initItemNavigation();this._previouslyFocusedItem=null;this._forwardingFocus=false;this._previouslySelectedItem=null;this.resizeListenerAttached=false;this.listEndObserved=false;this.addEventListener("ui5-_press",this.onItemPress.bind(this));this.addEventListener("ui5-close",this.onItemClose.bind(this));this.addEventListener("ui5-toggle",this.onItemToggle.bind(this));this.addEventListener("ui5-_focused",this.onItemFocused.bind(this));this.addEventListener("ui5-_forward-after",this.onForwardAfter.bind(this));this.addEventListener("ui5-_forward-before",this.onForwardBefore.bind(this));this.addEventListener("ui5-_selection-requested",this.onSelectionRequested.bind(this));this.addEventListener("ui5-_focus-requested",this.focusUploadCollectionItem.bind(this));this._handleResize=this.checkListInViewport.bind(this);this.i18nBundle=c.getI18nBundle("@ui5/webcomponents");this.initialIntersection=true}onExitDOM(){this.unobserveListEnd();this.resizeListenerAttached=false;_.deregister(this.getDomRef(),this._handleResize)}onBeforeRendering(){this.prepareListItems()}onAfterRendering(){if(this.growsOnScroll){this.observeListEnd()}else if(this.listEndObserved){this.unobserveListEnd()}if(this.grows){this.checkListInViewport();this.attachForResize()}}attachForResize(){if(!this.resizeListenerAttached){this.resizeListenerAttached=true;_.register(this.getDomRef(),this._handleResize)}}get shouldRenderH1(){return!this.header.length&&this.headerText}get headerID(){return`${this._id}-header`}get listEndDOM(){return this.shadowRoot.querySelector(".ui5-list-end-marker")}get hasData(){return this.getSlottedNodes("items").length!==0}get showNoDataText(){return!this.hasData&&this.noDataText}get isMultiSelect(){return this.mode===g.MultiSelect}get ariaLabelledBy(){if(this.accessibleNameRef||this.accessibleName){return undefined}return this.shouldRenderH1?this.headerID:undefined}get"ariaLabelТxt"(){return h.getEffectiveAriaLabelText(this)}get grows(){return this.growing!==f.None}get growsOnScroll(){return this.growing===f.Scroll&&!r.isIE()}get growsWithButton(){if(r.isIE()){return this.grows}return this.growing===f.Button}get _growingButtonText(){return this.i18nBundle.getText(v.LOAD_MORE_TEXT)}get busyIndPosition(){if(r.isIE()||!this.grows){return"absolute"}return this._inViewport?"absolute":"sticky"}get styles(){return{busyInd:{position:this.busyIndPosition}}}initItemNavigation(){this._itemNavigation=new F(this,{skipItemsSize:N,navigationMode:T.Vertical,getItemsCallback:()=>this.getEnabledItems()})}prepareListItems(){const e=this.getSlottedNodes("items");e.forEach((t,i)=>{const s=i===e.length-1;const r=this.separators===p.All||this.separators===p.Inner&&!s;t._mode=this.mode;t.hasBorder=r});this._previouslySelectedItem=null}async observeListEnd(){if(!this.listEndObserved){await o.renderFinished();this.getIntersectionObserver().observe(this.listEndDOM);this.listEndObserved=true}}unobserveListEnd(){if(this.growingIntersectionObserver){this.growingIntersectionObserver.disconnect();this.growingIntersectionObserver=null;this.listEndObserved=false}}onInteresection(e){if(this.initialIntersection){this.initialIntersection=false;return}e.forEach(e=>{if(e.isIntersecting){M(this.loadMore.bind(this),A)}})}onSelectionRequested(e){const t=this.getSelectedItems();let i=false;this._selectionRequested=true;if(this[`handle${this.mode}`]){i=this[`handle${this.mode}`](e.detail.item,e.detail.selected)}if(i){this.fireEvent("selection-change",{selectedItems:this.getSelectedItems(),previouslySelectedItems:t,selectionComponentPressed:e.detail.selectionComponentPressed,key:e.detail.key})}}handleSingleSelect(e){if(e.selected){return false}this.deselectSelectedItems();e.selected=true;return true}handleSingleSelectBegin(e){return this.handleSingleSelect(e)}handleSingleSelectEnd(e){return this.handleSingleSelect(e)}handleSingleSelectAuto(e){return this.handleSingleSelect(e)}handleMultiSelect(e,t){e.selected=t;return true}handleDelete(e){this.fireEvent("item-delete",{item:e})}deselectSelectedItems(){this.getSelectedItems().forEach(e=>{e.selected=false})}getSelectedItems(){return this.getSlottedNodes("items").filter(e=>e.selected)}getEnabledItems(){return this.getSlottedNodes("items").filter(e=>!e.disabled)}_onkeydown(e){if(a.isSpace(e)){e.preventDefault()}if(a.isTabNext(e)){this._handleTabNext(e)}}_onLoadMoreKeydown(e){if(a.isSpace(e)){e.preventDefault();this._loadMoreActive=true}if(a.isEnter(e)){this._onLoadMoreClick();this._loadMoreActive=true}if(a.isTabNext(e)){this.setPreviouslyFocusedItem(e.target);this.focusAfterElement()}}_onLoadMoreKeyup(e){if(a.isSpace(e)){this._onLoadMoreClick()}this._loadMoreActive=false}_onLoadMoreMousedown(){this._loadMoreActive=true}_onLoadMoreMouseup(){this._loadMoreActive=false}_onLoadMoreClick(){this.loadMore()}checkListInViewport(){this._inViewport=R(this.getDomRef())}loadMore(){this.fireEvent("load-more")}_handleTabNext(e){let t;const i=this.getNormalizedTarget(e.target);if(this.headerToolbar){t=this.getHeaderToolbarLastTabbableElement()}if(!t){return}if(t===i){if(this.getFirstItem(e=>e.selected&&!e.disabled)){this.focusFirstSelectedItem()}else if(this.getPreviouslyFocusedItem()){this.focusPreviouslyFocusedItem()}else{this.focusFirstItem()}e.stopImmediatePropagation();e.preventDefault()}}_onfocusin(e){if(!this.isForwardElement(this.getNormalizedTarget(e.target))){e.stopImmediatePropagation();return}if(!this.getPreviouslyFocusedItem()){if(this.getFirstItem(e=>e.selected&&!e.disabled)){this.focusFirstSelectedItem()}else{this.focusFirstItem()}e.stopImmediatePropagation();return}if(!this.getForwardingFocus()){if(this.getFirstItem(e=>e.selected&&!e.disabled)){this.focusFirstSelectedItem()}else{this.focusPreviouslyFocusedItem()}e.stopImmediatePropagation()}this.setForwardingFocus(false)}isForwardElement(e){const t=e.id;const i=this.getAfterElement();const s=this.getBeforeElement();if(this._id===t||s&&s.id===t){return true}return i&&i.id===t}onItemFocused(e){const t=e.target;this._itemNavigation.setCurrentItem(t);this.fireEvent("item-focused",{item:t});if(this.mode===g.SingleSelectAuto){this.onSelectionRequested({detail:{item:t,selectionComponentPressed:false,selected:true,key:e.detail.key}})}}onItemPress(e){const t=e.detail.item;if(!this._selectionRequested&&this.mode!==g.Delete){this._selectionRequested=true;this.onSelectionRequested({detail:{item:t,selectionComponentPressed:false,selected:!t.selected,key:e.detail.key}})}this.fireEvent("item-press",{item:t});this.fireEvent("item-click",{item:t});this._selectionRequested=false}onItemClose(e){this.fireEvent("item-close",{item:e.detail.item})}onItemToggle(e){this.fireEvent("item-toggle",{item:e.detail.item})}onForwardBefore(e){this.setPreviouslyFocusedItem(e.target);this.focusBeforeElement();e.stopImmediatePropagation()}onForwardAfter(e){this.setPreviouslyFocusedItem(e.target);if(!this.growsWithButton){this.focusAfterElement()}}focusBeforeElement(){this.setForwardingFocus(true);this.getBeforeElement().focus()}focusAfterElement(){this.setForwardingFocus(true);this.getAfterElement().focus()}focusFirstItem(){const e=this.getFirstItem(e=>!e.disabled);if(e){e.focus()}}focusPreviouslyFocusedItem(){const e=this.getPreviouslyFocusedItem();if(e){e.focus()}}focusFirstSelectedItem(){const e=this.getFirstItem(e=>e.selected&&!e.disabled);if(e){e.focus()}}focusItem(e){this._itemNavigation.setCurrentItem(e);e.focus()}focusUploadCollectionItem(e){setTimeout(()=>{this.setPreviouslyFocusedItem(e.target);this.focusPreviouslyFocusedItem()},0)}setForwardingFocus(e){this._forwardingFocus=e}getForwardingFocus(){return this._forwardingFocus}setPreviouslyFocusedItem(e){this._previouslyFocusedItem=e}getPreviouslyFocusedItem(){return this._previouslyFocusedItem}getFirstItem(e){const t=this.getSlottedNodes("items");let i=null;if(!e){return!!t.length&&t[0]}for(let s=0;s<t.length;s++){if(e(t[s])){i=t[s];break}}return i}getAfterElement(){if(!this._afterElement){this._afterElement=this.shadowRoot.querySelector(`#${this._id}-after`)}return this._afterElement}getBeforeElement(){if(!this._beforeElement){this._beforeElement=this.shadowRoot.querySelector(`#${this._id}-before`)}return this._beforeElement}getHeaderToolbarLastTabbableElement(){return n.getLastTabbableElement(this.headerToolbar.getDomRef())||this.headerToolbar.getDomRef()}getNormalizedTarget(e){let t=e;if(e.shadowRoot&&e.shadowRoot.activeElement){t=e.shadowRoot.activeElement}return t}getIntersectionObserver(){if(!this.growingIntersectionObserver){this.growingIntersectionObserver=new IntersectionObserver(this.onInteresection.bind(this),{root:null,rootMargin:"0px",threshold:1})}return this.growingIntersectionObserver}}B.define();return B});