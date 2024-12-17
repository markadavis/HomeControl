//@ui5-bundle sap/ui/mdc/designtime/library-preload.designtime.js
/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/mdc/designtime/actiontoolbar/ActionToolbar.designtime',[],function(){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");return{aggregations:{content:{ignore:true},actions:{ignore:true},begin:{ignore:true},between:{ignore:true},end:{ignore:true}},actions:{settings:{name:r.getText("actiontoolbar.RTA_SETTINGS_NAME"),handler:function(c,p){return sap.ui.mdc.p13n.Engine.getInstance().getRTASettingsActionHandler(c,p,"actionsKey").then(function(C){return C;});},CAUTION_variantIndependent:true}}};});
sap.ui.predefine('sap/ui/mdc/designtime/chart/Chart.designtime',[],function(){"use strict";return{name:"{name}",description:"{description}",actions:{}};});
sap.ui.predefine('sap/ui/mdc/designtime/chart/ChartNew.designtime',["sap/ui/mdc/p13n/Engine"],function(E){"use strict";return{actions:{settings:function(){return{handler:function(c,p){return E.getInstance().getRTASettingsActionHandler(c,p,c.getP13nMode());}};}},properties:{width:{ignore:false},height:{ignore:false},delegate:{ignore:true},header:{ignore:false},noDataText:{ignore:false},p13nMode:{ignore:false},legendVisible:{ignore:false},ignoreToolbarActions:{ignore:false},minWidth:{ignore:false},minHeight:{ignore:false},sortConditions:{ignore:true},showChartTooltip:{ignore:false},autoBindOnInit:{ignore:false},chartType:{ignore:false},showSelectionDetails:{ignore:false}},aggregations:{items:{ignore:false},actions:{ignore:false},selectionDetailsActions:{ignore:false},_toolbar:{ignore:true},_breadcrumbs:{ignore:true},_innerChart:{ignore:true}}};});
sap.ui.predefine('sap/ui/mdc/designtime/filterbar/FilterBar.designtime',["sap/ui/mdc/p13n/Engine"],function(E){"use strict";return{actions:{settings:function(){return{name:"filterbar.ADAPT_TITLE",handler:function(c,p){return E.getInstance().getRTASettingsActionHandler(c,p,"Item");}};}},aggregations:{layout:{ignore:true},basicSearchField:{ignore:true},filterItems:{ignore:true}},properties:{showAdaptFiltersButton:{ignore:false},p13nMode:{ignore:false}}};});
sap.ui.predefine('sap/ui/mdc/designtime/filterbar/FilterBarBase.designtime',[],function(){"use strict";return{properties:{showGoButton:{ignore:false},delegate:{ignore:true},liveMode:{ignore:false},showMessages:{ignore:false},filterConditions:{ignore:true},suspendSelection:{ignore:true}}};});
sap.ui.predefine('sap/ui/mdc/designtime/link/Panel.designtime',[],function(){"use strict";return{tool:{start:function(p){p.setEnablePersonalization(false);},stop:function(p){p.setEnablePersonalization(true);}}};});
sap.ui.predefine('sap/ui/mdc/designtime/link/PanelItem.designtime',[],function(){"use strict";return{domRef:function(p){var $=jQuery.find(".mdcbaseinfoPanelListItem");var a=$.filter(function(P){return jQuery(P).control(0).getParent().getKey()===p.getId();});return a[0];},name:{singular:"p13nDialog.PANEL_ITEM_NAME",plural:"p13nDialog.PANEL_ITEM_NAME_PLURAL"},actions:{remove:function(){return{changeType:"hideItem"};},reveal:function(){return{changeType:"revealItem"};}},isVisible:function(p){return p.getVisible();}};});
sap.ui.predefine('sap/ui/mdc/designtime/p13n/PersistenceProvider.designtime',[],function(){"use strict";return{name:"{name}",description:"{description}",properties:{mode:{ignore:true}}};});
sap.ui.predefine('sap/ui/mdc/designtime/table/Table.designtime',["sap/ui/mdc/p13n/Engine"],function(E){"use strict";return{name:"{name}",description:"{description}",aggregations:{_content:{ignore:false}},actions:{settings:function(){return{handler:function(c,p){return E.getInstance().getRTASettingsActionHandler(c,p,c.getP13nMode());}};}}};});
/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/mdc/designtime/library.designtime',[],function(){"use strict";return{};});
//# sourceMappingURL=library-preload.designtime.js.map