sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,n,r)=>e.html`<div class="${e.classMap(i.classes.root)}" tabindex="-1" @keydown=${i._onkeydown} @focusin="${i._onfocusin}" @focusout="${i._onfocusout}">${i._hasHoursSlider?s(i,n,r):undefined}${i._hasMinutesSlider?d(i,n,r):undefined}${i._hasSecondsSlider?l(i,n,r):undefined}${i._hasPeriodsSlider?c(i,n,r):undefined}</div>`;const s=(i,s,d)=>e.html`<${e.scopeTag("ui5-wheelslider",s,d)} label = "${e.ifDefined(i.hoursSliderTitle)}" ._items="${e.ifDefined(i.hoursArray)}" data-sap-focus-ref ?expanded="${i._hoursSliderFocused}" value="${e.ifDefined(i._hours)}" @ui5-select="${e.ifDefined(i.onHoursChange)}" @click="${i.selectSlider}" @focusin="${i.selectSlider}" data-sap-slider="hours" ?cyclic="${i._isCyclic}"></${e.scopeTag("ui5-wheelslider",s,d)}>`;const d=(i,s,d)=>e.html`<${e.scopeTag("ui5-wheelslider",s,d)} label = "${e.ifDefined(i.minutesSliderTitle)}" ._items="${e.ifDefined(i.minutesArray)}" ?expanded="${i._minutesSliderFocused}" value="${e.ifDefined(i._minutes)}" @ui5-select="${e.ifDefined(i.onMinutesChange)}" @click="${i.selectSlider}" @focusin="${i.selectSlider}" data-sap-slider="minutes" ?cyclic="${i._isCyclic}"></${e.scopeTag("ui5-wheelslider",s,d)}>`;const l=(i,s,d)=>e.html`<${e.scopeTag("ui5-wheelslider",s,d)} label = "${e.ifDefined(i.secondsSliderTitle)}" ._items="${e.ifDefined(i.secondsArray)}" ?expanded="${i._secondsSliderFocused}" value="${e.ifDefined(i._seconds)}" @ui5-select="${e.ifDefined(i.onSecondsChange)}" @click="${i.selectSlider}" @focusin="${i.selectSlider}" data-sap-slider="seconds" ?cyclic="${i._isCyclic}"></${e.scopeTag("ui5-wheelslider",s,d)}>`;const c=(i,s,d)=>e.html`<${e.scopeTag("ui5-wheelslider",s,d)} label = "${e.ifDefined(i.periodSliderTitle)}" ._items="${e.ifDefined(i.periodsArray)}" ?expanded="${i._periodSliderFocused}" value="${e.ifDefined(i._period)}" @ui5-select="${e.ifDefined(i.onPeriodChange)}" @click="${i.selectSlider}" @focusin="${i.selectSlider}" data-sap-slider="period"></${e.scopeTag("ui5-wheelslider",s,d)}>`;return i});