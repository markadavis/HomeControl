/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_GroupLock","./_Helper","./_Requestor","sap/base/Log","sap/base/util/isEmptyObject","sap/ui/base/SyncPromise","sap/ui/model/odata/ODataUtils"],function(_,a,b,L,c,S,O){"use strict";var C="sap.ui.model.odata.v4.lib._Cache",r=/\(\$uid=[-\w]+\)$/,m="@com.sap.vocabularies.Common.v1.Messages",d=/^-?\d+$/,e=/^([^(]*)(\(.*\))$/;function f(i,p,n,D){if(n.$count!==undefined){s(i,p,n,n.$count+D);}}function g(R,p){return p===""||R===p||R.startsWith(p+"/");}function s(i,p,n,v){if(typeof v==="string"){v=parseInt(v);}a.updateExisting(i,p,n,{$count:v});}function h(R,i,q,n,G,o){this.iActiveUsages=1;this.mChangeListeners={};this.fnGetOriginalResourcePath=G;this.iInactiveSince=Infinity;this.mPatchRequests={};this.oPendingRequestsPromise=null;this.mPostRequests={};this.sReportedMessagesPath=undefined;this.oRequestor=R;this.bSentRequest=false;this.bSortExpandSelect=n;this.setResourcePath(i);this.setQueryOptions(q);this.bSharedRequest=o;}h.prototype._delete=function(G,E,p,o,i){var n=p.split("/"),D=n.pop(),I=d.test(D)?Number(D):undefined,P=n.join("/"),t=this;this.checkSharedRequest();this.addPendingRequest();return this.fetchValue(_.$cached,P).then(function(v){var q=h.from$skip(D,v),u=D?v[q]||v.$byPredicate[q]:v,H,K=a.getPrivateAnnotation(u,"predicate"),w=a.buildPath(P,Array.isArray(v)?K:D),T=a.getPrivateAnnotation(u,"transient");if(T===true){throw new Error("No 'delete' allowed while waiting for server response");}if(T){G.unlock();t.oRequestor.removePost(T,u);return undefined;}if(u["$ui5.deleting"]){throw new Error("Must not delete twice: "+E);}u["$ui5.deleting"]=true;H={"If-Match":o||u};E+=t.oRequestor.buildQueryString(t.sMetaPath,t.mQueryOptions,true);return S.all([t.oRequestor.request("DELETE",E,G.getUnlockedCopy(),H,undefined,undefined,undefined,undefined,a.buildPath(t.getOriginalResourcePath(u),w)).catch(function(x){if(x.status!==404){delete u["$ui5.deleting"];throw x;}}).then(function(){if(Array.isArray(v)){i(t.removeElement(v,I,K,P),v);}else{if(D){a.updateExisting(t.mChangeListeners,P,v,h.makeUpdateData([D],null));}else{u["$ui5.deleted"]=true;}i();}t.oRequestor.getModelInterface().reportStateMessages(t.sResourcePath,[],[w]);}),I===undefined&&t.requestCount(G),G.unlock()]);}).finally(function(){t.removePendingRequest();});};h.prototype.addPendingRequest=function(){var R;if(!this.oPendingRequestsPromise){this.oPendingRequestsPromise=new S(function(i){R=i;});this.oPendingRequestsPromise.$count=0;this.oPendingRequestsPromise.$resolve=R;}this.oPendingRequestsPromise.$count+=1;};h.prototype.calculateKeyPredicate=function(i,t,M){var p,T=t[M];if(T&&T.$Key){p=a.getKeyPredicate(i,M,t);if(p){a.setPrivateAnnotation(i,"predicate",p);}}return p;};h.prototype.checkSharedRequest=function(){if(this.bSharedRequest){throw new Error(this+" is read-only");}};h.prototype.create=function(G,p,P,t,E,i,n){var o,K=E&&E["@$ui5.keepTransientPath"],q,u=this;function v(){a.removeByPath(u.mPostRequests,P,E);o.splice(o.indexOf(E),1);o.$created-=1;f(u.mChangeListeners,P,o,-1);delete o.$byPredicate[t];if(!P){u.adjustReadRequests(0,-1);}G.cancel();}function w(){u.addPendingRequest();a.setPrivateAnnotation(E,"transient",true);n();}function x(y,z){var A=z.getGroupId();a.setPrivateAnnotation(E,"transient",A);a.addByPath(u.mPostRequests,P,E);return S.all([u.oRequestor.request("POST",y,z,null,q,w,v,undefined,a.buildPath(u.sResourcePath,P,t)),u.fetchTypes()]).then(function(R){var B=R[0],D,F;a.deletePrivateAnnotation(E,"postBody");a.deletePrivateAnnotation(E,"transient");E["@$ui5.context.isTransient"]=false;a.removeByPath(u.mPostRequests,P,E);u.visitResponse(B,R[1],a.getMetaPath(a.buildPath(u.sMetaPath,P)),P+t,K);D=a.getPrivateAnnotation(B,"predicate");if(D){a.setPrivateAnnotation(E,"predicate",D);if(K){D=t;}else{o.$byPredicate[D]=E;a.updateTransientPaths(u.mChangeListeners,t,D);}}F=a.getQueryOptionsForPath(u.mQueryOptions,P).$select;a.updateSelected(u.mChangeListeners,a.buildPath(P,D||t),E,B,F&&F.concat("@odata.etag"));u.removePendingRequest();return E;},function(B){if(B.canceled){throw B;}u.removePendingRequest();i(B);if(u.fetchTypes().isRejected()){throw B;}return x(y,u.oRequestor.lockGroup(u.oRequestor.getGroupSubmitMode(A)==="API"?A:"$parked."+A,u,true,true));});}this.checkSharedRequest();E=a.publicClone(E,true)||{};q=a.merge({},E);a.setPrivateAnnotation(E,"postBody",q);a.setPrivateAnnotation(E,"transientPredicate",t);E["@$ui5.context.isTransient"]=true;o=this.getValue(P);if(!Array.isArray(o)){throw new Error("Create is only supported for collections; '"+P+"' does not reference a collection");}o.unshift(E);o.$created+=1;f(this.mChangeListeners,P,o,1);o.$byPredicate=o.$byPredicate||{};o.$byPredicate[t]=E;if(!P){u.adjustReadRequests(0,1);}return p.then(function(y){y+=u.oRequestor.buildQueryString(u.sMetaPath,u.mQueryOptions,true);return x(y,G);});};h.prototype.deregisterChange=function(p,o){if(!this.bSharedRequest){a.removeByPath(this.mChangeListeners,p,o);}};h.prototype.drillDown=function(D,p,G,n){var o=S.resolve(D),E,q,t,T=false,u=this;function v(i,A){L[A?"info":"error"]("Failed to drill-down into "+p+", invalid segment: "+i,u.toString(),C);return undefined;}function w(V,i,P){var x=t.slice(0,P).join("/"),R,y;if(Array.isArray(V)){return v(i,i==="0");}return u.oRequestor.getModelInterface().fetchMetadata(u.sMetaPath+"/"+a.getMetaPath(x)).then(function(z){var A;if(!z){return v(i);}if(z.$Type==="Edm.Stream"){R=V[i+"@odata.mediaReadLink"]||V[i+"@mediaReadLink"];y=u.oRequestor.getServiceUrl();return R||a.buildPath(y+u.sResourcePath,x);}if(!T){A=V[a.getAnnotationKey(V,".Permissions",i)];if(A===0||A==="None"){return undefined;}if(!E&&!Array.isArray(D)){E=D;q=0;}return E&&u.fetchLateProperty(G,E,t.slice(0,q).join("/"),t.slice(q).join("/"),t.slice(q,P).join("/"))||v(i);}if(z.$kind==="NavigationProperty"){return null;}if(!z.$Type.startsWith("Edm.")){return{};}if("$DefaultValue"in z){return z.$Type==="Edm.String"?z.$DefaultValue:a.parseLiteral(z.$DefaultValue,z.$Type,x);}return null;});}if(!p){return o;}t=p.split("/");return t.reduce(function(P,x,i){return P.then(function(V){var I,M,y;if(x==="$count"){return Array.isArray(V)?V.$count:v(x);}if(V===undefined||V===null){return undefined;}if(typeof V!=="object"||x==="@$ui5._"||Array.isArray(V)&&(x[0]==="$"||x==="length")){return v(x);}if(a.hasPrivateAnnotation(V,"predicate")){E=V;q=i;}y=V;T=T||V["@$ui5.context.isTransient"];M=e.exec(x);if(M){if(M[1]){V=V[M[1]];}if(V){V=V.$byPredicate&&V.$byPredicate[M[2]];}}else{I=h.from$skip(x,V);if(n&&I===x&&(V[x]===undefined||V[x]===null)){V[x]={};}V=V[I];}return V===undefined&&x[0]!=="#"&&!x.includes("@")?w(y,x,i+1):V;});},o);};h.prototype.fetchLateProperty=function(G,R,i,n,M){var F,o,p,P,q,t,u=a.getMetaPath(i),T=this.fetchTypes().getResult(),U=[n],v=this;function w(Q,B){var x=a.buildPath(F,B),E=T[x],y;if(!E){E=v.fetchType(T,x).getResult();}if(B){(E.$Key||[]).forEach(function(K){if(typeof K==="object"){K=K[Object.keys(K)[0]];}U.push(a.buildPath(B,K));});U.push(B+"/@odata.etag");U.push(B+"/@$ui5._/predicate");}if(Q.$expand){y=Object.keys(Q.$expand)[0];w(Q.$expand[y],a.buildPath(B,y));}}if(!this.mLateQueryOptions){return undefined;}F=a.buildPath(this.sMetaPath,u);q=a.intersectQueryOptions(a.getQueryOptionsForPath(this.mLateQueryOptions,i),[n],this.oRequestor.getModelInterface().fetchMetadata,F,{});if(!q){return undefined;}w(q);o=a.buildPath(this.sResourcePath,i);t=o+this.oRequestor.buildQueryString(F,q,false,true);P=this.mPropertyRequestByPath[t];if(!P){p=o+this.oRequestor.buildQueryString(F,this.mQueryOptions,true);P=this.oRequestor.request("GET",p,G.getUnlockedCopy(),undefined,undefined,undefined,undefined,F,undefined,false,q).then(function(D){v.visitResponse(D,T,F,i);return D;});this.mPropertyRequestByPath[t]=P;}return P.then(function(D){var x=a.getPrivateAnnotation(D,"predicate");if(x&&a.getPrivateAnnotation(R,"predicate")!==x){throw new Error("GET "+t+": Key predicate changed from "+a.getPrivateAnnotation(R,"predicate")+" to "+x);}if(D["@odata.etag"]!==R["@odata.etag"]){throw new Error("GET "+t+": ETag changed");}a.updateSelected(v.mChangeListeners,i,R,D,U);return a.drillDown(R,M.split("/"));}).finally(function(){delete v.mPropertyRequestByPath[t];});};h.prototype.fetchType=function(t,M){var i=this;return this.oRequestor.fetchTypeForPath(M).then(function(T){var o,p=[];if(T){o=i.oRequestor.getModelInterface().fetchMetadata(M+"/"+m).getResult();if(o){T=Object.create(T);T[m]=o;}t[M]=T;(T.$Key||[]).forEach(function(K){if(typeof K==="object"){K=K[Object.keys(K)[0]];p.push(i.fetchType(t,M+"/"+K.slice(0,K.lastIndexOf("/"))));}});return S.all(p).then(function(){return T;});}});};h.prototype.fetchTypes=function(){var p,t,i=this;function n(B,q){if(q&&q.$expand){Object.keys(q.$expand).forEach(function(N){var M=B;N.split("/").forEach(function(o){M+="/"+o;p.push(i.fetchType(t,M));});n(M,q.$expand[N]);});}}if(!this.oTypePromise){p=[];t={};p.push(this.fetchType(t,this.sMetaPath));n(this.sMetaPath,this.mQueryOptions);this.oTypePromise=S.all(p).then(function(){return t;});}return this.oTypePromise;};h.prototype.getDownloadQueryOptions=function(q){return q;};h.prototype.getDownloadUrl=function(p,i){var q=this.mQueryOptions;if(p){q=a.getQueryOptionsForPath(q,p);q=a.merge({},i,q);}return this.oRequestor.getServiceUrl()+a.buildPath(this.sResourcePath,p)+this.oRequestor.buildQueryString(a.buildPath(this.sMetaPath,a.getMetaPath(p)),this.getDownloadQueryOptions(q));};h.prototype.getLateQueryOptions=function(){return this.mLateQueryOptions;};h.prototype.getQueryOptions=function(){return this.mQueryOptions;};h.prototype.getValue=function(i){throw new Error("Unsupported operation");};h.prototype.getOriginalResourcePath=function(E){return this.fnGetOriginalResourcePath&&this.fnGetOriginalResourcePath(E)||this.sResourcePath;};h.prototype.getResourcePath=function(){return this.sResourcePath;};h.prototype.hasChangeListeners=function(){return!c(this.mChangeListeners);};h.prototype.hasPendingChangesForPath=function(p){return Object.keys(this.mPatchRequests).some(function(R){return g(R,p);})||Object.keys(this.mPostRequests).some(function(R){return g(R,p);});};h.prototype.hasSentRequest=function(){return this.bSentRequest;};h.prototype.patch=function(p,D){var t=this;this.checkSharedRequest();return this.fetchValue(_.$cached,p).then(function(o){a.updateExisting(t.mChangeListeners,p,o,D);return o;});};h.prototype.refreshSingle=function(G,p,i,P,K,D){var t=this;this.checkSharedRequest();return this.fetchValue(_.$cached,p).then(function(E){var q=Object.assign({},a.getQueryOptionsForPath(t.mQueryOptions,p)),R;if(i!==undefined){P=a.getPrivateAnnotation(E[i],"predicate");}R=a.buildPath(t.sResourcePath,p,P);if(K&&t.mLateQueryOptions){a.aggregateExpandSelect(q,t.mLateQueryOptions);}delete q.$apply;delete q.$count;delete q.$filter;delete q.$orderby;delete q.$search;R+=t.oRequestor.buildQueryString(t.sMetaPath,q,false,t.bSortExpandSelect);t.bSentRequest=true;return S.all([t.oRequestor.request("GET",R,G,undefined,undefined,D),t.fetchTypes()]).then(function(n){var o=n[0];t.replaceElement(E,i,P,o,n[1],p);});});};h.prototype.refreshSingleWithRemove=function(G,p,i,P,K,D,o){var t=this;this.checkSharedRequest();return S.all([this.fetchValue(_.$cached,p),this.fetchTypes()]).then(function(R){var E=R[0],n,I,q={},u,v,Q=Object.assign({},a.getQueryOptionsForPath(t.mQueryOptions,p)),w,x=a.buildPath(t.sResourcePath,p),y=[],T=R[1];if(i!==undefined){n=E[i];P=a.getPrivateAnnotation(n,"predicate");}else{n=E.$byPredicate[P];}v=a.getKeyFilter(n,t.sMetaPath,T);I=(Q.$filter?"("+Q.$filter+") and ":"")+v;delete Q.$count;delete Q.$orderby;t.bSentRequest=true;if(K){if(t.mLateQueryOptions){a.aggregateExpandSelect(Q,t.mLateQueryOptions);}q=Object.assign({},Q);q.$filter=I;Q.$filter=v;delete Q.$search;w=x+t.oRequestor.buildQueryString(t.sMetaPath,Q,false,t.bSortExpandSelect);y.push(t.oRequestor.request("GET",w,G,undefined,undefined,D));if(i!==undefined&&(v!==I||q.$search)){delete q.$select;delete q.$expand;q.$count=true;q.$top=0;u=x+t.oRequestor.buildQueryString(t.sMetaPath,q);y.push(t.oRequestor.request("GET",u,G.getUnlockedCopy()));}}else{Q.$filter=I;w=x+t.oRequestor.buildQueryString(t.sMetaPath,Q,false,t.bSortExpandSelect);y.push(t.oRequestor.request("GET",w,G,undefined,undefined,D));}return S.all(y).then(function(R){var z=R[0].value,A=R[1]&&R[1]["@odata.count"]==="0";if(z.length>1){throw new Error("Unexpected server response, more than one entity returned.");}else if(z.length===0){t.removeElement(E,i,P,p);t.oRequestor.getModelInterface().reportStateMessages(t.sResourcePath,[],[p+P]);o(false);}else if(A){t.removeElement(E,i,P,p);t.replaceElement(E,undefined,P,z[0],T,p);o(true);}else{t.replaceElement(E,i,P,z[0],T,p);}});});};h.prototype.registerChange=function(p,o){if(!this.bSharedRequest){a.addByPath(this.mChangeListeners,p,o);}};h.prototype.removeElement=function(E,i,p,P){var o,t;o=E.$byPredicate[p];if(i!==undefined){i=h.getElementIndex(E,p,i);E.splice(i,1);f(this.mChangeListeners,P,E,-1);}delete E.$byPredicate[p];t=a.getPrivateAnnotation(o,"transientPredicate");if(t){E.$created-=1;delete E.$byPredicate[t];}else if(!P){if(i!==undefined){this.iLimit-=1;this.adjustReadRequests(i,-1);}}return i;};h.prototype.removeMessages=function(){if(this.sReportedMessagesPath){this.oRequestor.getModelInterface().reportStateMessages(this.sReportedMessagesPath,{});this.sReportedMessagesPath=undefined;}};h.prototype.removePendingRequest=function(){if(this.oPendingRequestsPromise){this.oPendingRequestsPromise.$count-=1;if(!this.oPendingRequestsPromise.$count){this.oPendingRequestsPromise.$resolve();this.oPendingRequestsPromise=null;}}};h.prototype.replaceElement=function(E,i,p,o,t,P){var n,T;if(i===undefined){E.$byPredicate[p]=o;}else{i=h.getElementIndex(E,p,i);n=E[i];E[i]=E.$byPredicate[p]=o;T=a.getPrivateAnnotation(n,"transientPredicate");if(T){o["@$ui5.context.isTransient"]=false;E.$byPredicate[T]=o;a.setPrivateAnnotation(o,"transientPredicate",T);}}this.visitResponse(o,t,a.getMetaPath(a.buildPath(this.sMetaPath,P)),P+p);};h.prototype.requestCount=function(G){var E,q,R,t=this;if(this.mQueryOptions&&this.mQueryOptions.$count){q=Object.assign({},this.mQueryOptions);delete q.$expand;delete q.$orderby;delete q.$select;E=this.getFilterExcludingCreated();if(E){q.$filter=q.$filter?"("+q.$filter+") and "+E:E;}q.$top=0;R=this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,q);return this.oRequestor.request("GET",R,G.getUnlockedCopy()).catch(function(o){if(o.cause&&o.cause.status===404){return t.oRequestor.request("GET",R,G.getUnlockedCopy());}throw o;}).then(function(o){var i=parseInt(o["@odata.count"])+t.aElements.$created;s(t.mChangeListeners,"",t.aElements,i);t.iLimit=i;});}};h.prototype.resetChangesForPath=function(p){var t=this;Object.keys(this.mPatchRequests).forEach(function(R){var P,i;if(g(R,p)){P=t.mPatchRequests[R];for(i=P.length-1;i>=0;i-=1){t.oRequestor.removePatch(P[i]);}delete t.mPatchRequests[R];}});Object.keys(this.mPostRequests).forEach(function(R){var E,T,i;if(g(R,p)){E=t.mPostRequests[R];for(i=E.length-1;i>=0;i-=1){T=a.getPrivateAnnotation(E[i],"transient");t.oRequestor.removePost(T,E[i]);}delete t.mPostRequests[R];}});};h.prototype.setActive=function(A){if(A){this.iActiveUsages+=1;this.iInactiveSince=Infinity;}else{this.iActiveUsages-=1;if(!this.iActiveUsages){this.iInactiveSince=Date.now();}this.mChangeListeners={};}};h.prototype.setLateQueryOptions=function(q){if(q){this.mLateQueryOptions={$select:q.$select,$expand:q.$expand};}else{this.mLateQueryOptions=null;}};h.prototype.setProperty=function(p,v,E){var t=this;this.checkSharedRequest();return this.fetchValue(_.$cached,E,null,null,true).then(function(o){a.updateAll(t.mChangeListeners,E,o,h.makeUpdateData(p.split("/"),v));});};h.prototype.setQueryOptions=function(q,F){this.checkSharedRequest();if(this.bSentRequest&&!F){throw new Error("Cannot set query options: Cache has already sent a request");}this.mQueryOptions=q;this.sQueryString=this.oRequestor.buildQueryString(this.sMetaPath,q,false,this.bSortExpandSelect);};h.prototype.setResourcePath=function(R){this.checkSharedRequest();this.sResourcePath=R;this.sMetaPath=a.getMetaPath("/"+R);this.oTypePromise=undefined;this.mLateQueryOptions=null;this.mPropertyRequestByPath={};};h.prototype.toString=function(){return this.oRequestor.getServiceUrl()+this.sResourcePath+this.sQueryString;};h.prototype.update=function(G,p,v,E,i,n,u,P,o){var q,t=p.split("/"),U,w=this;this.checkSharedRequest();try{q=this.fetchValue(_.$cached,n);}catch(x){if(!x.$cached||this.oPromise!==null){throw x;}q=this.oPromise=S.resolve({"@odata.etag":"*"});}return q.then(function(y){var F=a.buildPath(n,p),z=G.getGroupId(),A,B,D,H,T,I,J=h.makeUpdateData(t,v);function K(){a.removeByPath(w.mPatchRequests,F,B);a.updateExisting(w.mChangeListeners,n,y,h.makeUpdateData(t,A));}function M(N,Q){var R={"If-Match":y},V;function W(){V=w.oRequestor.lockGroup(z,w,true);o();}if(P){R.Prefer="return=minimal";}B=w.oRequestor.request("PATCH",i,N,R,J,W,K,undefined,a.buildPath(w.getOriginalResourcePath(y),n),Q);a.addByPath(w.mPatchRequests,F,B);return S.all([B,w.fetchTypes()]).then(function(X){var Y=X[0];a.removeByPath(w.mPatchRequests,F,B);if(!P){w.visitResponse(Y,X[1],a.getMetaPath(a.buildPath(w.sMetaPath,n)),n);}a.updateExisting(w.mChangeListeners,n,y,P?{"@odata.etag":Y["@odata.etag"]}:Y);},function(x){var X=z;if(!E){K();throw x;}a.removeByPath(w.mPatchRequests,F,B);if(x.canceled){throw x;}E(x);switch(w.oRequestor.getGroupSubmitMode(z)){case"API":break;case"Auto":if(!w.oRequestor.hasChanges(z,y)){X="$parked."+z;}break;default:throw x;}V.unlock();V=undefined;return M(w.oRequestor.lockGroup(X,w,true,true),true);}).finally(function(){if(V){V.unlock();}});}if(!y){throw new Error("Cannot update '"+p+"': '"+n+"' does not exist");}T=a.getPrivateAnnotation(y,"transient");if(T){if(T===true){throw new Error("No 'update' allowed while waiting for server response");}if(T.startsWith("$parked.")){H=T;T=T.slice(8);}if(T!==z){throw new Error("The entity will be created via group '"+T+"'. Cannot patch via group '"+z+"'");}}A=a.drillDown(y,t);a.updateAll(w.mChangeListeners,n,y,J);D=a.getPrivateAnnotation(y,"postBody");if(D){a.updateAll({},n,D,J);}if(u){U=u.split("/");u=a.buildPath(n,u);I=w.getValue(u);if(I===undefined){L.debug("Missing value for unit of measure "+u+" when updating "+F,w.toString(),C);}else{a.merge(T?D:J,h.makeUpdateData(U,I));}}if(T){if(H){a.setPrivateAnnotation(y,"transient",T);w.oRequestor.relocate(H,D,T);}G.unlock();return Promise.resolve();}w.oRequestor.relocateAll("$parked."+z,z,y);i+=w.oRequestor.buildQueryString(w.sMetaPath,w.mQueryOptions,true);return M(G);});};h.prototype.visitResponse=function(R,t,n,o,K,p){var q,H=false,P={},u=this.oRequestor.getServiceUrl()+this.sResourcePath,v=this;function w(M,i,A){H=true;if(M&&M.length){P[i]=M;M.forEach(function(B){if(B.longtextUrl){B.longtextUrl=a.makeAbsolute(B.longtextUrl,A);}});}}function x(B,i){return i?a.makeAbsolute(i,B):B;}function y(I,M,A,B){var D={},E,F,G,i;for(i=0;i<I.length;i+=1){F=I[i];E=A===""?p+i:i;if(F&&typeof F==="object"){z(F,M,A,B,E);G=a.getPrivateAnnotation(F,"predicate");if(!A){q.push(G||E.toString());}if(G){D[G]=F;I.$byPredicate=D;}}}}function z(i,M,I,A,B){var D,E,T=t[M],F=T&&T[m]&&T[m].$Path,G;A=x(A,i["@odata.context"]);E=v.calculateKeyPredicate(i,t,M);if(B!==undefined){I=a.buildPath(I,E||B);}else if(!K&&E){D=r.exec(I);if(D){I=I.slice(0,-D[0].length)+E;}}if(o&&!q){q=[I];}if(F){G=a.drillDown(i,F.split("/"));if(G!==undefined){w(G,I,A);}}Object.keys(i).forEach(function(J){var N,Q=M+"/"+J,U=i[J],V=a.buildPath(I,J);if(J.endsWith("@odata.mediaReadLink")||J.endsWith("@mediaReadLink")){i[J]=a.makeAbsolute(U,A);}if(J.includes("@")){return;}if(Array.isArray(U)){U.$created=0;U.$count=undefined;N=i[J+"@odata.count"];if(N){s({},"",U,N);}else if(!i[J+"@odata.nextLink"]){s({},"",U,U.length);}y(U,Q,V,x(A,i[J+"@odata.context"]));}else if(U&&typeof U==="object"){z(U,Q,V,A);}});}if(p!==undefined){q=[];y(R.value,n||this.sMetaPath,"",x(u,R["@odata.context"]));}else if(R&&typeof R==="object"){z(R,n||this.sMetaPath,o||"",u);}if(H){this.sReportedMessagesPath=this.getOriginalResourcePath(R);this.oRequestor.getModelInterface().reportStateMessages(this.sReportedMessagesPath,P,q);}};function j(R,i,q,n,D,o){h.call(this,R,i,q,n,function(){return D;},o);this.sContext=undefined;this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;this.aElements.$tail=undefined;this.iLimit=Infinity;this.aReadRequests=[];this.bServerDrivenPaging=false;this.oSyncPromiseAll=undefined;}j.prototype=Object.create(h.prototype);j.prototype.addKeptElement=function(E){this.aElements.$byPredicate[a.getPrivateAnnotation(E,"predicate")]=E;};j.prototype.adjustReadRequests=function(i,o){this.aReadRequests.forEach(function(R){if(R.iStart>=i){R.iStart+=o;R.iEnd+=o;}});};j.prototype.fetchValue=function(G,p,i,o,n){var E,F=p.split("/")[0],q,t=this;G.unlock();if(this.aElements.$byPredicate[F]){q=S.resolve();}else if((G===_.$cached||F!=="$count")&&this.aElements[F]!==undefined){q=S.resolve(this.aElements[F]);}else{if(!this.oSyncPromiseAll){E=this.aElements.$tail?this.aElements.concat(this.aElements.$tail):this.aElements;this.oSyncPromiseAll=S.all(E);}q=this.oSyncPromiseAll;}return q.then(function(){t.registerChange(p,o);return t.drillDown(t.aElements,p,G,n);});};j.prototype.fill=function(p,o,E){var i,n=Math.max(this.aElements.length,1024);if(E>n){if(this.aElements.$tail&&p){throw new Error("Cannot fill from "+o+" to "+E+", $tail already in use, # of elements is "+this.aElements.length);}this.aElements.$tail=p;E=this.aElements.length;}for(i=o;i<E;i+=1){this.aElements[i]=p;}this.oSyncPromiseAll=undefined;};j.prototype.getFilterExcludingCreated=function(){var E,K,n=[],t,i;for(i=0;i<this.aElements.$created;i+=1){E=this.aElements[i];if(!E["@$ui5.context.isTransient"]){t=t||this.fetchTypes().getResult();K=a.getKeyFilter(E,this.sMetaPath,t);if(K){n.push(K);}}}return n.length?"not ("+n.join(" or ")+")":undefined;};j.prototype.getQueryString=function(){var E=this.getFilterExcludingCreated(),q=Object.assign({},this.mQueryOptions),F=q.$filter,Q=this.sQueryString;if(E){if(F){q.$filter="("+F+") and "+E;Q=this.oRequestor.buildQueryString(this.sMetaPath,q,false,this.bSortExpandSelect);}else{Q+=(Q?"&":"?")+"$filter="+a.encode(E,false);}}return Q;};j.prototype.getResourcePathWithQuery=function(i,E){var n=this.aElements.$created,q=this.getQueryString(),D=q?"&":"?",o=E-i,R=this.sResourcePath+q;if(i<n){throw new Error("Must not request created element");}i-=n;if(i>0||o<Infinity){R+=D+"$skip="+i;}if(o<Infinity){R+="&$top="+o;}return R;};j.prototype.getValue=function(p){var o=this.drillDown(this.aElements,p,_.$cached);if(o.isFulfilled()){return o.getResult();}};j.prototype.handleResponse=function(n,E,R,t){var o=-1,p,q=this.aElements.$created,u,K,v=this.aElements.$count,P,w=R.value.length,i;this.sContext=R["@odata.context"];this.visitResponse(R,t,undefined,undefined,undefined,n);for(i=0;i<w;i+=1){u=R.value[i];P=a.getPrivateAnnotation(u,"predicate");if(P){K=this.aElements.$byPredicate[P];if(K){if(u["@odata.etag"]===K["@odata.etag"]){a.merge(u,K);}else if(this.hasPendingChangesForPath(P)){throw new Error("Modified on client and on server: "+this.sResourcePath+P);}}this.aElements.$byPredicate[P]=u;}this.aElements[n+i]=u;}p=R["@odata.count"];if(p){this.iLimit=o=parseInt(p);}if(R["@odata.nextLink"]){this.bServerDrivenPaging=true;if(E<this.aElements.length){for(i=n+w;i<E;i+=1){delete this.aElements[i];}}else{this.aElements.length=n+w;}}else if(w<E-n){if(o===-1){o=v&&v-q;}o=Math.min(o!==undefined?o:Infinity,n-q+w);this.aElements.length=q+o;this.iLimit=o;if(!p&&o>0&&!this.aElements[o-1]){o=undefined;}}if(o!==-1){s(this.mChangeListeners,"",this.aElements,o!==undefined?o+q:undefined);}};j.prototype.read=function(i,n,p,G,D){var E,P=this.oPendingRequestsPromise||this.aElements.$tail,t=this;if(i<0){throw new Error("Illegal index "+i+", must be >= 0");}if(n<0){throw new Error("Illegal length "+n+", must be >= 0");}if(P){return P.then(function(){return t.read(i,n,p,G,D);});}O._getReadIntervals(this.aElements,i,n,this.bServerDrivenPaging?0:p,this.aElements.$created+this.iLimit).forEach(function(I){t.requestElements(I.start,I.end,G.getUnlockedCopy(),D);D=undefined;});G.unlock();E=this.aElements.slice(i,i+n+p);if(this.aElements.$tail&&i+n>this.aElements.length){E.push(this.aElements.$tail);}return S.all(E).then(function(){var o=t.aElements.slice(i,i+n);o.$count=t.aElements.$count;return{"@odata.context":t.sContext,value:o};});};j.prototype.refreshKeptElements=function(G,o){var p=Object.keys(this.aElements.$byPredicate).sort(),t,i=this;function n(){var K,q=a.merge({},i.mQueryOptions);a.aggregateExpandSelect(q,i.mLateQueryOptions);delete q.$count;delete q.$orderby;delete q.$search;K=p.map(function(P){return a.getKeyFilter(i.aElements.$byPredicate[P],i.sMetaPath,t);});q.$filter=K.join(" or ");if(K.length>1){q.$top=K.length;}return i.sResourcePath+i.oRequestor.buildQueryString(i.sMetaPath,q,false,true);}if(p.length===0){return undefined;}t=this.fetchTypes().getResult();return this.oRequestor.request("GET",n(),G).then(function(R){var q;i.visitResponse(R,t,undefined,undefined,undefined,0);q=R.value.$byPredicate||{};p.forEach(function(P){if(P in q){a.updateAll(i.mChangeListeners,P,i.aElements.$byPredicate[P],q[P]);}else{delete i.aElements.$byPredicate[P];o(P);}});});};j.prototype.requestElements=function(i,E,G,D){var p,R={iEnd:E,iStart:i},t=this;this.aReadRequests.push(R);this.bSentRequest=true;p=S.all([this.oRequestor.request("GET",this.getResourcePathWithQuery(i,E),G,undefined,undefined,D),this.fetchTypes()]).then(function(n){if(t.aElements.$tail===p){t.aElements.$tail=undefined;}t.handleResponse(R.iStart,R.iEnd,n[0],n[1]);}).catch(function(o){t.fill(undefined,R.iStart,R.iEnd);throw o;}).finally(function(){t.aReadRequests.splice(t.aReadRequests.indexOf(R),1);});this.fill(p,i,E);};j.prototype.requestSideEffects=function(G,p,N,P,o){var E,M=-1,q,Q,t={},R,T=this.fetchTypes().getResult(),u=this;this.checkSharedRequest();if(this.oPendingRequestsPromise){return this.oPendingRequestsPromise.then(function(){return u.requestSideEffects(G,p,N,P,o);});}Q=a.intersectQueryOptions(Object.assign({},this.mQueryOptions,this.mLateQueryOptions),p,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,N,"",true);if(!Q){return S.resolve();}if(o){E=[this.aElements.$byPredicate[P[0]]];}else{P.forEach(function(i){t[i]=true;});E=this.aElements.filter(function(n,i){var v;if(!n){return false;}if(a.hasPrivateAnnotation(n,"transient")){M=i;return false;}v=a.getPrivateAnnotation(n,"predicate");if(t[v]||a.hasPrivateAnnotation(n,"transientPredicate")){M=i;delete t[v];return true;}delete u.aElements[i];delete u.aElements.$byPredicate[v];return false;});this.aElements.length=M+1;if(!E.length){return S.resolve();}Object.keys(t).forEach(function(i){E.push(u.aElements.$byPredicate[i]);});}Q.$filter=E.map(function(i){return a.getKeyFilter(i,u.sMetaPath,T);}).join(" or ");if(E.length>1){Q.$top=E.length;}a.selectKeyProperties(Q,T[this.sMetaPath]);delete Q.$count;delete Q.$orderby;delete Q.$search;q=a.extractMergeableQueryOptions(Q);R=this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,Q,false,true);return this.oRequestor.request("GET",R,G,undefined,undefined,undefined,undefined,this.sMetaPath,undefined,false,q).then(function(v){var w,x,i,n;function y(z){z=z.slice(x.length+1);return!p.some(function(A){return a.getRelativePath(z,A)!==undefined;});}if(v.value.length!==E.length){throw new Error("Expected "+E.length+" row(s), but instead saw "+v.value.length);}u.visitResponse(v,T,undefined,"",false,NaN);for(i=0,n=v.value.length;i<n;i+=1){w=v.value[i];x=a.getPrivateAnnotation(w,"predicate");a.updateAll(u.mChangeListeners,x,u.aElements.$byPredicate[x],w,y);}});};function k(R,i,q){h.call(this,R,i,q);this.oPromise=null;}k.prototype=Object.create(h.prototype);k.prototype._delete=function(){throw new Error("Unsupported");};k.prototype.create=function(){throw new Error("Unsupported");};k.prototype.fetchValue=function(G,i,D,o,n){var t=this;if(n){throw new Error("Unsupported argument: bCreateOnDemand");}if(this.oPromise){G.unlock();}else{this.bSentRequest=true;this.oPromise=S.resolve(this.oRequestor.request("GET",this.sResourcePath+this.sQueryString,G,undefined,undefined,D,undefined,this.sMetaPath));}return this.oPromise.then(function(R){t.registerChange("",o);return R&&typeof R==="object"?R.value:R;});};k.prototype.update=function(){throw new Error("Unsupported");};function l(R,i,q,n,o,G,p,M){h.call(this,R,i,q,n,G,o);this.sMetaPath=M||this.sMetaPath;this.bPost=p;this.bPosting=false;this.oPromise=null;}l.prototype=Object.create(h.prototype);l.prototype.fetchValue=function(G,p,D,o,i){var R=this.sResourcePath+this.sQueryString,t=this;if(this.oPromise){G.unlock();}else{if(this.bPost){throw new Error("Cannot fetch a value before the POST request");}this.oPromise=S.all([this.oRequestor.request("GET",R,G,undefined,undefined,D,undefined,this.sMetaPath),this.fetchTypes()]).then(function(n){t.visitResponse(n[0],n[1]);return n[0];});this.bSentRequest=true;}return this.oPromise.then(function(n){if(n&&n["$ui5.deleted"]){throw new Error("Cannot read a deleted entity");}t.registerChange(p,o);return t.drillDown(n,p,G,i);});};l.prototype.getValue=function(p){var o;if(this.oPromise&&this.oPromise.isFulfilled()){o=this.drillDown(this.oPromise.getResult(),p,_.$cached);if(o.isFulfilled()){return o.getResult();}}};l.prototype.post=function(G,D,E,i,o){var n,H=E?{"If-Match":i&&"@odata.etag"in E?"*":E}:{},p="POST",t=this;function q(u){t.bPosting=true;return S.all([t.oRequestor.request(p,t.sResourcePath+t.sQueryString,u,H,D),t.fetchTypes()]).then(function(R){t.visitResponse(R[0],R[1]);t.bPosting=false;return R[0];},function(v){t.bPosting=false;if(o&&v.strictHandlingFailed){return o(v).then(function(w){var x;if(w){delete H["Prefer"];return q(u.getUnlockedCopy());}x=Error("Action canceled due to strict handling");x.canceled=true;throw x;});}throw v;});}this.checkSharedRequest();if(!this.bPost){throw new Error("POST request not allowed");}if(this.bPosting){throw new Error("Parallel POST requests not allowed");}if(E){n=G.getGroupId();this.oRequestor.relocateAll("$parked."+n,n,E);}if(D){p=D["X-HTTP-Method"]||p;delete D["X-HTTP-Method"];if(this.oRequestor.isActionBodyOptional()&&!Object.keys(D).length){D=undefined;}}this.bSentRequest=true;if(o){H["Prefer"]="handling=strict";}this.oPromise=q(G);return this.oPromise;};l.prototype.requestSideEffects=function(G,p,n,R){var M,o=this.oPromise,q,i,t=this;this.checkSharedRequest();q=o&&a.intersectQueryOptions(Object.assign({},this.mQueryOptions,this.mLateQueryOptions),p,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,n);if(!q){return S.resolve();}M=a.extractMergeableQueryOptions(q);R=(R||this.sResourcePath)+this.oRequestor.buildQueryString(this.sMetaPath,q,false,true);i=S.all([this.oRequestor.request("GET",R,G,undefined,undefined,undefined,undefined,this.sMetaPath,undefined,false,M),this.fetchTypes(),this.fetchValue(_.$cached,"")]).then(function(u){return u;}).then(function(u){var N=u[0],v=u[2];a.setPrivateAnnotation(N,"predicate",a.getPrivateAnnotation(v,"predicate"));t.visitResponse(N,u[1]);a.updateAll(t.mChangeListeners,"",v,N,function(P){return!p.some(function(w){return a.getRelativePath(P,w)!==undefined;});});});return i;};h.create=function(R,i,q,n,D,o){var p,K,P,t,u;if(o){P=i+R.buildQueryString(a.getMetaPath("/"+i),q,false,n);u=R.$mSharedCollectionCacheByPath;if(!u){u=R.$mSharedCollectionCacheByPath={};}t=u[P];if(t){t.setActive(true);}else{K=Object.keys(u);p=K.length;if(p>100){K.filter(function(v){return!u[v].iActiveUsages;}).sort(function(v,w){return u[v].iInactiveSince-u[w].iInactiveSince;}).every(function(v){delete u[v];p-=1;return p>100;});}t=u[P]=new j(R,i,q,n,D,o);}return t;}return new j(R,i,q,n,D);};h.createProperty=function(R,i,q){return new k(R,i,q);};h.createSingle=function(R,i,q,n,o,G,p,M){return new l(R,i,q,n,o,G,p,M);};h.from$skip=function(i,n){return d.test(i)?(n.$created||0)+Number(i):i;};h.getElementIndex=function(E,K,i){var o=E[i];if(!o||a.getPrivateAnnotation(o,"predicate")!==K){i=E.indexOf(E.$byPredicate[K]);}return i;};h.makeUpdateData=function(p,v){return p.reduceRight(function(V,i){var R={};R[i]=V;return R;},v);};return h;},false);
