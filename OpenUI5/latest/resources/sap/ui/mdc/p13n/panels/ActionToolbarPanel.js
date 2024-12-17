/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListView","sap/ui/model/Sorter"],function(L,S){"use strict";var A=L.extend("sap.ui.mdc.p13n.panels.ActionToolbarPanel",{metadata:{library:"sap.ui.mdc"},renderer:{apiVersion:2}});A.prototype._bindListItems=function(b){var t=this.getTemplate();if(t){var g=function(c){return c.getProperty("alignment");};var s=new S({path:"alignment",descending:false,group:g});this._oListControl.bindItems(Object.assign({path:this.P13N_MODEL+">/items",sorter:s,key:"name",templateShareable:false,template:this.getTemplate().clone()},b));}};return A;});
