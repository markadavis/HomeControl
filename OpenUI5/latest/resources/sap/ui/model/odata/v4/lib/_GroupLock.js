/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/SyncPromise"],function(S){"use strict";function _(g,o,l,m,s,c){if(!o){throw new Error("Missing owner");}if(m&&!l){throw new Error("A modifying group lock has to be locked");}this.fnCancel=c;this.bCanceled=false;this.sGroupId=g;this.bLocked=!!l;this.bModifying=!!m;this.oOwner=o;this.oPromise=null;this.iSerialNumber=s===undefined?Infinity:s;}_.prototype.cancel=function(){if(!this.bCanceled){this.bCanceled=true;if(this.fnCancel){this.fnCancel();}this.unlock(true);}};_.prototype.getGroupId=function(){return this.sGroupId;};_.prototype.getSerialNumber=function(){return this.iSerialNumber;};_.prototype.getUnlockedCopy=function(){return new _(this.sGroupId,this.oOwner,false,false,this.iSerialNumber);};_.prototype.isCanceled=function(){return this.bCanceled;};_.prototype.isLocked=function(){return this.bLocked;};_.prototype.isModifying=function(){return this.bModifying;};_.prototype.toString=function(){return"sap.ui.model.odata.v4.lib._GroupLock(group="+this.sGroupId+", owner="+this.oOwner+(this.isLocked()?", locked":"")+(this.isModifying()?", modifying":"")+(this.iSerialNumber!==Infinity?", serialNumber="+this.iSerialNumber:"")+")";};_.prototype.unlock=function(f){if(this.bLocked===undefined&&!f){throw new Error("GroupLock unlocked twice");}this.bLocked=undefined;if(this.oPromise){this.oPromise.$resolve();}};_.prototype.waitFor=function(g){var r;if(this.bLocked&&this.sGroupId===g){if(!this.oPromise){this.oPromise=new S(function(a){r=a;});this.oPromise.$resolve=r;}return this.oPromise;}};_.$cached=new _("$cached","sap.ui.model.odata.v4.lib._GroupLock");_.$cached.unlock=function(){};return _;},false);
