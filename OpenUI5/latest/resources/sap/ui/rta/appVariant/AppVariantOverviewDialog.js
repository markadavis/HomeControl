/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ComponentContainer","sap/m/Button","sap/m/Dialog","sap/m/DialogRenderer","sap/ui/rta/appVariant/manageApps/webapp/Component","sap/ui/rta/Utils"],function(C,B,D,a,M,R){"use strict";var A=D.extend("sap.ui.rta.appVariant.AppVariantOverviewDialog",{metadata:{library:"sap.ui.rta",properties:{idRunningApp:"string",isOverviewForKeyUser:{type:"boolean"},layer:"string"},events:{cancel:{}}},constructor:function(){D.prototype.constructor.apply(this,arguments);this._oTextResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");this.oManageAppsComponent=new M("sap.ui.rta.appVariant.manageApps",{idRunningApp:this.getIdRunningApp(),isOverviewForKeyUser:this.getIsOverviewForKeyUser(),layer:this.getLayer()});this.oManageAppsComponentContainer=new C({component:this.oManageAppsComponent});this.addContent(this.oManageAppsComponentContainer);this._createButton();this.setContentWidth("1000px");this.setContentHeight("450px");this.setHorizontalScrolling(false);this.setTitle(this._oTextResources.getText("APP_VARIANT_OVERVIEW_DIALOG_TITLE"));this.addStyleClass(R.getRtaStyleClassName());},destroy:function(){D.prototype.destroy.apply(this,arguments);},renderer:a});A.prototype._createButton=function(){this.addButton(new B({text:this._oTextResources.getText("APP_VARIANT_DIALOG_CLOSE"),press:function(){this.close();this.fireCancel();}.bind(this)}));};return A;});
