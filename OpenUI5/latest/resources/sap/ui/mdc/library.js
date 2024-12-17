/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/library","sap/m/library"],function(){"use strict";sap.ui.getCore().initLibrary({version:"1.96.3",name:"sap.ui.mdc",dependencies:["sap.ui.core","sap.m"],designtime:"sap/ui/mdc/designtime/library.designtime",types:["sap.ui.mdc.TableType","sap.ui.mdc.TableP13Mode","sap.ui.mdc.GrowingMode","sap.ui.mdc.RowCountMode","sap.ui.mdc.SelectionMode","sap.ui.mdc.TableRowAction","sap.ui.mdc.FilterExpression","sap.ui.mdc.MultiSelectMode"],interfaces:["sap.ui.mdc.IFilterSource","sap.ui.mdc.IFilter","sap.ui.mdc.IxState","sap.ui.mdc.valuehelp.ITypeaheadContent","sap.ui.mdc.valuehelp.IDialogContent","sap.ui.mdc.valuehelp.ITypeaheadContainer","sap.ui.mdc.valuehelp.IDialogContainer"],controls:["sap.ui.mdc.Chart","sap.ui.mdc.Table","sap.ui.mdc.FilterBar","sap.ui.mdc.field.FieldBase","sap.ui.mdc.field.FieldInput","sap.ui.mdc.field.FieldMultiInput","sap.ui.mdc.field.ValueHelpPanel","sap.ui.mdc.field.DefineConditionPanel","sap.ui.mdc.Field","sap.ui.mdc.FilterField","sap.ui.mdc.MultiValueField","sap.ui.mdc.link.Panel","sap.ui.mdc.link.ContactDetails","sap.ui.mdc.ui.Container","sap.ui.mdc.ChartNew","sap.ui.mdc.p13n.PersistenceProvider"],elements:["sap.ui.mdc.table.Column","sap.ui.mdc.table.CreationRow","sap.ui.mdc.table.TableTypeBase","sap.ui.mdc.table.GridTableType","sap.ui.mdc.table.ResponsiveTableType","sap.ui.mdc.table.RowSettings","sap.ui.mdc.chart.Item","sap.ui.mdc.chart.DimensionItem","sap.ui.mdc.chart.MeasureItem","sap.ui.mdc.chartNew.ItemNew","sap.ui.mdc.chartNew.ChartSelectionDetailsNew","sap.ui.mdc.chartNew.ChartToolbarNew","sap.ui.mdc.chartNew.ChartTypeButtonNew","sap.ui.mdc.chartNew.DrillBreadcrumbsNew","sap.ui.mdc.chartNew.SelectionDetailsActionsNew","sap.ui.mdc.field.CustomFieldHelp","sap.ui.mdc.field.CustomFieldInfo","sap.ui.mdc.field.FieldHelpBase","sap.ui.mdc.field.FieldInfoBase","sap.ui.mdc.field.FieldValueHelp","sap.ui.mdc.field.FieldValueHelpContentWrapperBase","sap.ui.mdc.field.FieldValueHelpTableWrapperBase","sap.ui.mdc.field.FieldValueHelpMdcTableWrapper","sap.ui.mdc.field.FieldValueHelpMTableWrapper","sap.ui.mdc.field.FieldValueHelpUITableWrapper","sap.ui.mdc.field.ListFieldHelp","sap.ui.mdc.field.ListFieldHelpItem","sap.ui.mdc.field.BoolFieldHelp","sap.ui.mdc.field.ConditionFieldHelp","sap.ui.mdc.filterbar.aligned.FilterItemLayout","sap.ui.mdc.link.ContactDetailsAddressItem","sap.ui.mdc.link.ContactDetailsEmailItem","sap.ui.mdc.link.ContactDetailsItem","sap.ui.mdc.link.ContactDetailsPhoneItem","sap.ui.mdc.link.LinkItem","sap.ui.mdc.link.PanelItem","sap.ui.mdc.link.SemanticObjectUnavailableAction","sap.ui.mdc.link.SemanticObjectMapping","sap.ui.mdc.link.SemanticObjectMappingItem","sap.ui.mdc.field.InParameter","sap.ui.mdc.field.OutParameter","sap.ui.mdc.ui.ContainerItem","sap.ui.mdc.field.MultiValueFieldItem","sap.ui.mdc.ValueHelp","sap.ui.mdc.valuehelp.Popover","sap.ui.mdc.valuehelp.Dialog"],extensions:{flChangeHandlers:{"sap.ui.mdc.Table":"sap/ui/mdc/flexibility/Table","sap.ui.mdc.Chart":"sap/ui/mdc/flexibility/Chart","sap.ui.mdc.ChartNew":"sap/ui/mdc/flexibility/Chart","sap.ui.mdc.FilterBar":"sap/ui/mdc/flexibility/FilterBar","sap.ui.mdc.filterbar.p13n.AdaptationFilterBar":"sap/ui/mdc/flexibility/FilterBar","sap.ui.mdc.link.PanelItem":"sap/ui/mdc/flexibility/PanelItem","sap.ui.mdc.link.Panel":"sap/ui/mdc/flexibility/Panel","sap.ui.mdc.ActionToolbar":"sap/ui/mdc/flexibility/ActionToolbar","sap.ui.mdc.actiontoolbar.ActionToolbarAction":"sap/ui/mdc/flexibility/ActionToolbarAction","sap.ui.mdc.chartNew.ChartToolbarNew":"sap/ui/mdc/flexibility/ActionToolbar"}},noLibraryCSS:false});var t=sap.ui.mdc;t.FilterBarP13nMode={Item:"Item",Value:"Value"};t.TableType={Table:"Table",ResponsiveTable:"ResponsiveTable"};t.TableP13nMode={Column:"Column",Sort:"Sort",Filter:"Filter",Group:"Group",Aggregate:"Aggregate"};t.GrowingMode={None:"None",Basic:"Basic",Scroll:"Scroll"};t.RowCountMode={Auto:"Auto",Fixed:"Fixed"};t.ChartToolbarActionType={ZoomInOut:"ZoomInOut",DrillDownUp:"DrillDownUp",Legend:"Legend",FullScreen:"FullScreen"};t.ChartP13nMode={Item:"Item",Sort:"Sort",Type:"Type"};t.SelectionMode={None:"None",Single:"Single",Multi:"Multi"};t.RowAction={Navigation:"Navigation"};t.FilterExpression={Interval:"Interval",Single:"Single",Multi:"Multi"};t.ChartItemType={Dimension:"Dimension",Measure:"Measure"};t.ChartItemRoleType={category:"category",series:"series",category2:"category2",axis1:"axis1",axis2:"axis2",axis3:"axis3"};t.ContactDetailsAddressType={work:"work",home:"home",preferred:"preferred"};t.ContactDetailsEmailType={work:"work",home:"home",preferred:"preferred"};t.ContactDetailsPhoneType={work:"work",home:"home",cell:"cell",fax:"fax",preferred:"preferred"};t.MultiSelectMode={Default:"Default",ClearAll:"ClearAll"};return t;});
