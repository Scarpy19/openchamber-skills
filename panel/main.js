"use strict";(()=>{var I="openchamber.sdk";var gt="data-oc-scrolling",Qt=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${gt}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${gt}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${gt}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${gt}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Zt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var is=`(${Zt.toString()})(document);`;var Or=e=>{let t=[],o=0,i=0;return{push:s=>{for(t.push(s),i+=s.length;i-o>e&&t.length>1;){let c=t.shift();i-=c?.length??0,o=0}},pull:s=>{let c=0;for(;c<s.length&&t.length>0;){let d=t[0],p=Math.min(s.length-c,d.length-o);s.set(d.subarray(o,o+p),c),c+=p,o+=p,o>=d.length&&(t.shift(),i-=d.length,o=0)}s.fill(0,c)},clear:()=>{t.length=0,o=0,i=0},get size(){return i-o}}};var Ir=/^[a-z][a-z0-9-]{0,39}$/;var Rr=e=>Object(e)===e&&!Array.isArray(e),eo=(e,t)=>Object.keys(e).every(o=>t.includes(o)),yr=e=>String(e)===e&&e.length>=1&&e.length<=60,vr=e=>String(e)===e&&e.length>=1&&e.length<=80,wr=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!Rr(o)||!Ir.test(o.id)||!yr(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!eo(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!eo(o,["kind","id","label","value","options","disabled"])||!vr(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let s of o.options){if(!Rr(s)||!eo(s,["value","label"])||!vr(s.value)||!yr(s.label)||i.has(s.value))return!1;i.add(s.value)}if(!i.has(o.value))return!1}return!0};var cs=1024*1024;var Cr=["{id}","{segment}","{segments+}"];var $i=new Set(Cr);var Mr=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Bi=new Set(Mr);var to=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Ur=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Nr=/^[A-Za-z0-9_-]{1,80}$/;var Lr=["left","right","top","bottom"];var Pr=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of i)if(!Pr(s,t+1,o))return!1;return!0},oo=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(oo);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(oo)}return String(e)===e||Number.isFinite(e)},ro=e=>{try{return String(e.id)!==e.id||!Nr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Lr.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Pr(e.data)||!oo(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var so=2e3;var Dr=["file","directory","other","missing"],io=e=>!!(e&&"sessionId"in e),ao=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Hr=/^[0-9a-f]{7,64}$/i,co=e=>Hr.test(e),ht=500,kt=32e3,Vr=16e3,Xr=128,$r=200,Fr=2e3,Br=16e3,Kr=80,zr=200,jr=16e3;var Wr=2e3;var lo=2e4,bt=1024,xt=2e6;var At=64e3,Ot=8e3,po=4e3;var uo=96e4,ls=60*6e4;var qr=999,Jr=1e4,ct=500,Yr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Qr=["stopped","starting","ready","failed"],ds=new Set(Yr),Zr=e=>ds.has(e),en=e=>e&&Zr(e)?e:"HOST_REJECTED",Ze=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Ze):Object(e)===e?Object.values(e).every(Ze):!1,tn=e=>Ze(e)&&JSON.stringify(e).length<=jr,Gr=e=>e?.trim().slice(0,zr)??"",et=e=>{let t=e.id.trim().slice(0,Xr),o=e.title.trim().slice(0,$r),i=e.url.trim().slice(0,Fr),s=e.text?.trim().slice(0,Br),c=e.author?.trim().slice(0,Kr),d=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:o||t,url:i,kind:d};if(s&&(p.text=s),c&&(p.author=c),d==="pull"){let S=Gr(e.branches?.head),A=Gr(e.branches?.base);S&&A&&(p.branches={head:S,base:A})}return tn(e.data)&&(p.data=e.data),p},Eo=e=>{let t=et(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},fo=e=>{let t={text:e.text.trim().slice(0,Vr)};return e.send&&(t.send=!0),t},_o=e=>e===null||!Number.isFinite(e)?null:Math.min(qr,Math.max(0,Math.round(e))),So=e=>Number.isFinite(e)?Math.min(Jr,Math.max(0,Math.ceil(e))):0;var tt=e=>e.length>0&&e.length<=bt&&!e.includes("\0")&&!e.includes("\\");var Rt=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Wr?!1:!e.split("/").some(o=>o==="."||o===".."),ps=new Set(Qr),mo=e=>!!(e&&"status"in e&&ps.has(String(e.status))&&!("body"in e)),yt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),To=e=>!!(e&&"content"in e&&String(e.content)===e.content),go=e=>!!(e&&"written"in e&&e.written===!0),ho=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),us=new Set(Dr),ko=e=>!!(e&&"kind"in e&&"size"in e&&us.has(String(e.kind))&&Number.isFinite(e.size)),bo=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Es=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),fs=e=>Object(e)===e?e:null,no=e=>String(e)===e&&e.length>0,_s=e=>{if(!no(e.id))return null;if(e.ok===!0){let t={channel:I,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&no(e.error)?{channel:I,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:en(no(e.code)?e.code:void 0)}:null},xo=e=>{let t=fs(e);return!t||t.channel!==I||t.v!==1?null:t.type==="result"?_s(t):!Es.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var on=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Ss=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",b=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},rn=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),vt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${bt} characters without NUL or backslash.`)),It=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},O=e=>(e.value+=1,`oc-${e.value}`),vo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(r=>r===t.parent),i=e.requestTimeoutMs??lo,s=new Set,c=new Set,d=new Set,p=new Set,S=new Set,A=new Set,g=new Set,U=new Set,G=new Set,H=new Set,J=new Set,se=new Set,Se=[],y=null,te=null,le=new Set,R=new Set,N=null,v=null,B=!1,Q=new Map,Y=new Map,pe=new Map,re=!1,E={value:0},f=null,ne=null,he=!1,Fe=!1,Er=null,me=null,fr=r=>r?{sessionId:r.id,phase:r.busy?"started":"completed"}:null,ue=r=>{t.parent.postMessage(r,"*")},_r=()=>{re||t.parent===t||se.size===0||f?.features?.lateGenerateResults!==!0||ue({channel:I,v:1,type:"generate-late-listen"})},V=(r,a)=>{for(let h of r)try{h(a)}catch(m){console.error(m)}},Sr=r=>{if(!(r instanceof MessageEvent)||!o(r.source))return;let a=xo(r.data);if(!a)return;if(a.type==="workspace"){let m=Y.get(a.payload.subscriptionId);m&&V([m],a.payload.snapshot);return}if(a.type==="shells"){let m=pe.get(a.payload.subscriptionId);m&&V([m],a.payload.snapshot);return}if(a.type==="microphone-audio"){me?.queue.push(a.payload.samples);return}if(a.type==="microphone-ended"){let m=me;if(!m)return;me=null,m.release(),V(m.endedListeners,a.payload.reason);return}if(a.type==="ready"){f=a.payload,ne=fr(a.payload.session),V(s,a.payload),V(c,a.payload.directory),V(d,a.payload.session),ne&&V(p,ne),V(S,a.payload.connection),V(A,a.payload.settings),V(g,a.payload.item),a.payload.block&&V(U,a.payload.block),_r();return}if(a.type==="service-event"){V(G,a.payload);return}if(a.type==="generate-late"){se.size===0?Se.push(a.payload):V(se,a.payload);return}if(a.type==="directory"){f&&(f={...f,directory:a.payload.directory}),V(c,a.payload.directory);return}if(a.type==="session"){f&&(f={...f,session:a.payload.session}),a.payload.session?ne?.sessionId!==a.payload.session.id&&(ne=fr(a.payload.session)):ne=null,V(d,a.payload.session);return}if(a.type==="session-lifecycle"){ne=a.payload,V(p,a.payload);return}if(a.type==="connection"){f&&(f={...f,connection:a.payload.connection}),V(S,a.payload.connection);return}if(a.type==="settings"){f&&(f={...f,settings:a.payload.settings}),V(A,a.payload.settings);return}if(a.type==="item"){f&&(f={...f,item:a.payload.item}),V(g,a.payload.item);return}if(a.type==="status-control-event"){V(H,a.payload);return}if(a.type==="popover-closed"){V(J,a.payload);return}if(a.type==="action"){let m=P=>{re||ue({channel:I,v:1,type:"action-result",id:a.id,payload:P})},L=te;if(!L){m({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>L(a.payload)).then(()=>m({ok:!0}),P=>{let X=(P instanceof Error?P.message:String(P)).trim();m({ok:!1,error:(X||"Action failed.").slice(0,ct)})});return}if(a.type==="file-open"){let m=a.payload;if(v&&Ur(v,m))return;v=m,V(le,a.payload);return}if(a.type==="file-saved"){V(R,a.payload.version);return}if(a.type==="file-snapshot"){let m=X=>{re||ue({channel:I,v:1,type:"file-snapshot-result",id:a.id,payload:X})},L=X=>m({error:(X.trim()||"Could not read the edited file.").slice(0,ct)}),P=N;if(!P){L("This extension does not edit files.");return}Promise.resolve().then(()=>P(a.payload.purpose)).then(X=>{if(to(X)>2e7){L(`The file is over ${2e7} ${"bytes"in X?"bytes":"characters"}.`);return}if(X.version.length>256){L(`The snapshot version is over ${256} characters.`);return}m({snapshot:"bytes"in X?{bytes:X.bytes,version:X.version}:{content:X.content,version:X.version}})},X=>L(X instanceof Error?X.message:String(X)));return}if(a.type==="resolve"){let m=P=>{ue({channel:I,v:1,type:"resolve-result",id:a.id,payload:P})},L=y;if(!L){m({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>L(a.payload)).then(P=>m({item:P?et(P):null}),P=>{let X=(P instanceof Error?P.message:String(P)).trim();m({error:(X||"Command failed.").slice(0,ct)})});return}let h=Q.get(a.id);if(h){if(clearTimeout(h.timer),Q.delete(a.id),a.ok){h.resolve(a.payload);return}h.reject(new b(a.code,a.error))}};t.addEventListener("message",Sr),ue({channel:I,v:1,type:"hello"});let ie=(r,a=i)=>re||t.parent===t?Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((h,m)=>{let L=setTimeout(()=>{Q.delete(r.id),m(new b("HOST_TIMEOUT","Host did not answer in time."))},a);Q.set(r.id,{resolve:h,reject:m,timer:L}),ue(r)}),q=r=>ie(r).then(()=>{}),K={channel:I,v:1},Wt=r=>{!re&&t.parent!==t&&ue(r)},mr=()=>Wt({...K,type:"file-save"}),qt=()=>{!re&&t.parent!==t&&ue({...K,type:"microphone-close",id:O(E)})},ns=async()=>{if(me)throw new b("HOST_REJECTED","The microphone is already open in this frame.");if(f?.features?.microphone!==!0)throw new b("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let r=globalThis.AudioContext;if(typeof r!="function")throw new b("UNSUPPORTED","This frame has no Web Audio.");let a=new r;if(a.sampleRate<8e3||a.sampleRate>192e3)throw a.close().catch(()=>{}),new b("UNSUPPORTED",`Audio at ${a.sampleRate} Hz is not supported.`);let h=a.state==="suspended"?a.resume().catch(()=>{}):void 0,m=Or(Math.round(a.sampleRate/4)),L=a.createScriptProcessor(1024,1,1);L.onaudioprocess=ke=>m.pull(ke.outputBuffer.getChannelData(0));let P=a.createMediaStreamDestination();L.connect(P);let X=new Set,Qe={queue:m,endedListeners:X,release:()=>{L.onaudioprocess=null,L.disconnect(),m.clear();for(let ke of P.stream.getTracks())ke.stop();a.close().catch(()=>{})}};me=Qe;try{let ke=await ie({...K,type:"microphone-open",id:O(E),payload:{sampleRate:a.sampleRate}},12e4);if(!ke||!("opened"in ke)||ke.opened!==!0)throw new b("HOST_REJECTED","Host did not open the microphone.");if(await h,me!==Qe)throw new b("DISCONNECTED","The microphone closed while it was opening.")}catch(ke){throw me===Qe&&(me=null),Qe.release(),qt(),ke}return{stream:P.stream,close:()=>{me===Qe&&(me=null,Qe.release(),qt())},onEnded:ke=>(X.add(ke),()=>{X.delete(ke)})}},Tr=r=>{!on(r)||!Ss(r)||(r.preventDefault(),mr())},gr=r=>{!on(r)||r.key!=="Escape"||f?.surface!=="popover"||!f.popover||(r.preventDefault(),xr(f.popover.id,"escape").catch(()=>{}))},St=()=>{let r=f?.surface==="popover"?f.popover:void 0;if(!r)return;let a=he||Fe;Er!==a&&(Er=a,Ar(r.id,a).catch(()=>{}))},mt=()=>{f?.surface!=="popover"||he||(he=!0,St())},hr=r=>{f?.surface!=="popover"||r.relatedTarget!==null||!he||(he=!1,St())},kr=()=>{f?.surface!=="popover"||Fe||(Fe=!0,St())},br=()=>{f?.surface!=="popover"||!Fe||(Fe=!1,St())},Re=(r,a=1024)=>{if(!r.trim()||r.length>a)throw new b("HOST_REJECTED",`Identity must contain 1 to ${a} characters.`)},Jt=async r=>{r.kind!=="projects"&&Re(r.projectId);let a=await ie({...K,type:"workspace-read",id:O(E),payload:r});if(!a||!("kind"in a)||!("state"in a)||a.kind!==r.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return a},Yt=async(r,a)=>{r.kind!=="projects"&&Re(r.projectId);let h=O(E);Y.set(h,a);try{await q({...K,type:"workspace-subscribe",id:O(E),payload:{subscriptionId:h,query:r}})}catch(m){throw Y.delete(h),re||ue({...K,type:"workspace-unsubscribe",id:O(E),payload:{subscriptionId:h}}),m}return()=>{!Y.delete(h)||re||ue({...K,type:"workspace-unsubscribe",id:O(E),payload:{subscriptionId:h}})}},ss=async(r,a)=>{r.kind==="session"&&Re(r.sessionId),r.kind==="project"&&Re(r.projectId);let h=O(E);pe.set(h,a);try{await q({...K,type:"shells-subscribe",id:O(E),payload:{subscriptionId:h,scope:r}})}catch(m){throw pe.delete(h),re||ue({...K,type:"shells-unsubscribe",id:O(E),payload:{subscriptionId:h}}),m}return()=>{!pe.delete(h)||re||ue({...K,type:"shells-unsubscribe",id:O(E),payload:{subscriptionId:h}})}},Tt=async r=>{if("key"in r&&(r.key.length===0||r.key.length>128))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Ze(r.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>65536)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&f?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let a=await ie({...K,type:"storage",id:O(E),payload:r});if(!a||!("storage"in a)||a.op!==r.op)throw new b("HOST_REJECTED","Host did not return storage data.");return a},xr=(r,a)=>f?.features?.popovers!==!0&&!(f?.surface==="popover"&&f.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):q({...K,type:"popover-close",id:O(E),payload:a?{id:r,reason:a}:{id:r}}),Ar=(r,a)=>f?.features?.popovers!==!0&&!(f?.surface==="popover"&&f.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):q({...K,type:"popover-anchor",id:O(E),payload:{id:r,active:a}});return t.addEventListener("keydown",gr,!0),t.addEventListener("pointerover",mt),t.addEventListener("pointermove",mt),t.addEventListener("pointerout",hr),t.addEventListener("focus",kr),t.addEventListener("blur",br),{onAction:r=>(te=r,()=>{te===r&&(te=null)}),listProjects:async()=>{let r=await Jt({kind:"projects"});if(r.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return r},listWorktrees:async r=>{let a=await Jt({kind:"worktrees",projectId:r});if(a.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return a},listSessions:async r=>{let a=await Jt({kind:"sessions",projectId:r});if(a.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return a},onProjects:r=>Yt({kind:"projects"},a=>{a.kind==="projects"&&r(a)}),onWorktrees:(r,a)=>Yt({kind:"worktrees",projectId:r},h=>{h.kind==="worktrees"&&a(h)}),onSessions:(r,a)=>Yt({kind:"sessions",projectId:r},h=>{h.kind==="sessions"&&a(h)}),onRunningShells:(r,a)=>ss(r,a),readShellOutput:async(r,a)=>{Re(r,128);let h=a?.cursor;if(h!==void 0&&(!Number.isInteger(h)||h<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let m=a?.tailBytes;if(m!==void 0&&(!Number.isInteger(m)||m<1||m>65536))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let P=await ie({...K,type:"shell-output",id:O(E),payload:{shellId:r,cursor:h,tailBytes:m}});if(!P||typeof P.output!="string"||!Number.isFinite(P.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async r=>{if(Re(r,128),(await ie({...K,type:"shell-stop",id:O(E),payload:{shellId:r}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async r=>{Re(r),await q({...K,type:"open-session",id:O(E),payload:{sessionId:r}})},storage:{get:async(r,a)=>{let h=It(a),m={op:"get",key:r};h&&(m.scope=h);let L=await Tt(m);return L.op==="get"&&L.found?L.value:void 0},set:async(r,a,h)=>{let m=It(h),L={op:"set",key:r,value:a};m&&(L.scope=m),await Tt(L)},delete:async(r,a)=>{let h=It(a),m={op:"delete",key:r};h&&(m.scope=h),await Tt(m)},keys:async r=>{let a=It(r),h={op:"keys"};a&&(h.scope=a);let m=await Tt(h);if(m.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return m.keys}},onReady:r=>(s.add(r),f&&r(f),()=>{s.delete(r)}),onDirectory:r=>(c.add(r),f&&r(f.directory),()=>{c.delete(r)}),onSession:r=>(d.add(r),f&&r(f.session),()=>{d.delete(r)}),onSessionLifecycle:r=>(p.add(r),ne&&r(ne),()=>{p.delete(r)}),onConnection:r=>(S.add(r),f&&r(f.connection),()=>{S.delete(r)}),onSettings:r=>(A.add(r),f&&r(f.settings),()=>{A.delete(r)}),onItem:r=>(g.add(r),f&&r(f.item),()=>{g.delete(r)}),onBlock:r=>(U.add(r),f?.block&&r(f.block),()=>{U.delete(r)}),onServiceEvent:r=>(G.add(r),()=>{G.delete(r)}),onStatusControl:r=>(H.add(r),()=>{H.delete(r)}),onPopoverClosed:r=>(J.add(r),()=>{J.delete(r)}),setStatusControls:r=>f?.features?.statusControls!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support status controls.")):wr(r)?q({...K,type:"status-controls",id:O(E),payload:{controls:r}}):Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:r=>f?.features?.popovers!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):ro(r)?q({...K,type:"popover-open",id:O(E),payload:r}):Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:xr,setPopoverAnchorActive:Ar,onResolve:r=>(y=r,()=>{y===r&&(y=null)}),toast:r=>{let a=r.message.trim();return!a||a.length>ht?Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${ht} characters.`)):r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>kt)?Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${kt} characters.`)):q({channel:I,v:1,type:"toast",id:O(E),payload:{...r,message:a}})},openUrl:r=>q({channel:I,v:1,type:"open-url",id:O(E),payload:{url:r}}),openCommit:r=>co(r)?q({channel:I,v:1,type:"open-commit",id:O(E),payload:{sha:r}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:r=>q({channel:I,v:1,type:"block-answer",id:O(E),payload:{text:r.trim().slice(0,so)}}),openSurface:r=>q({channel:I,v:1,type:"open-surface",id:O(E),payload:{surfaceId:r}}),writeClipboard:r=>q({channel:I,v:1,type:"clipboard-write",id:O(E),payload:{text:r}}),compose:r=>q({channel:I,v:1,type:"compose",id:O(E),payload:r}),attach:r=>q({channel:I,v:1,type:"attach",id:O(E),payload:et(r)}),startSession:async r=>{r.projectId!==void 0&&Re(r.projectId);let a=r.worktree;a&&a!==!0&&(a.kind==="existing"?Re(a.directory):(a.name!==void 0&&Re(a.name,200),a.baseBranch!==void 0&&Re(a.baseBranch,200)));let h=await ie({channel:I,v:1,type:"start-session",id:O(E),payload:Eo(r)},e.requestTimeoutMs??18e4);if(!io(h))throw new b("HOST_REJECTED","Host did not return a session.");return h},prompt:r=>ie({channel:I,v:1,type:"prompt",id:O(E),payload:fo(r)}).then(a=>{if(!ao(a))throw new b("HOST_REJECTED","Host did not return a prompt result.");return a}),sessionLink:r=>q({channel:I,v:1,type:"session-link",id:O(E),payload:et(r)}),close:()=>q({channel:I,v:1,type:"close",id:O(E)}),oauthStart:()=>q({channel:I,v:1,type:"oauth-start",id:O(E)}),oauthDisconnect:()=>q({channel:I,v:1,type:"oauth-disconnect",id:O(E)}),request:r=>(Rt(r.path)?ie({channel:I,v:1,type:"request",id:O(E),payload:r}):rn()).then(a=>{if(!yt(a))throw new b("HOST_REJECTED","Host request result was empty.");return a}),serviceRequest:r=>(Rt(r.path)?ie({channel:I,v:1,type:"service-request",id:O(E),payload:r}):rn()).then(a=>{if(!yt(a))throw new b("HOST_REJECTED","Host service request result was empty.");return a}),serviceStatus:()=>ie({channel:I,v:1,type:"service-status",id:O(E)}).then(r=>{if(!mo(r))throw new b("HOST_REJECTED","Host did not return service status.");return r}),readFile:r=>(tt(r)?ie({channel:I,v:1,type:"file-read",id:O(E),payload:{path:r}}):vt()).then(a=>{if(!To(a))throw new b("HOST_REJECTED","Host did not return file content.");return a}),writeFile:(r,a)=>tt(r)?a.length>xt?Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${xt} characters.`)):ie({channel:I,v:1,type:"file-write",id:O(E),payload:{path:r,content:a}}).then(h=>{if(!go(h))throw new b("HOST_REJECTED","Host did not confirm the write.");return h}):vt(),listDir:r=>(tt(r)?ie({channel:I,v:1,type:"file-list",id:O(E),payload:{path:r}}):vt()).then(a=>{if(!ho(a))throw new b("HOST_REJECTED","Host did not return directory entries.");return a}),stat:r=>(tt(r)?ie({channel:I,v:1,type:"file-stat",id:O(E),payload:{path:r}}):vt()).then(a=>{if(!ko(a))throw new b("HOST_REJECTED","Host did not return file status.");return a}),generate:r=>{let a=r.prompt.trim(),h=r.system?.trim();if(a.length===0||a.length>At)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${At} characters.`));if(h!==void 0&&(h.length===0||h.length>Ot))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${Ot} characters.`));let m=r.maxOutputTokens===void 0?void 0:Math.min(po,Math.max(1,Math.floor(r.maxOutputTokens)));if(m!==void 0&&!Number.isFinite(m))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let L={prompt:a};return h!==void 0&&(L.system=h),m!==void 0&&(L.maxOutputTokens=m),ie({channel:I,v:1,type:"generate",id:O(E),payload:L},e.requestTimeoutMs??uo).then(P=>{if(!bo(P))throw new b("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:r=>{se.add(r);for(let a of Se.splice(0))V([r],a);return _r(),()=>{se.delete(r)}},openMicrophone:ns,setBadge:r=>q({channel:I,v:1,type:"badge",id:O(E),payload:{count:_o(r)}}),setHeight:r=>q({channel:I,v:1,type:"resize",id:O(E),payload:{height:So(r)}}),onFileOpen:r=>(le.add(r),B||(B=!0,t.addEventListener("keydown",Tr,!0)),v&&r(v),()=>{le.delete(r)}),onFileSnapshot:r=>(N=r,()=>{N===r&&(N=null)}),onFileSaved:r=>(R.add(r),()=>{R.delete(r)}),reportFileChange:r=>Wt({...K,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:mr,reportFileUnsupported:()=>Wt({...K,type:"file-unsupported"}),dispose:()=>{for(let r of Y.keys())ue({...K,type:"workspace-unsubscribe",id:O(E),payload:{subscriptionId:r}});Y.clear();for(let r of pe.keys())ue({...K,type:"shells-unsubscribe",id:O(E),payload:{subscriptionId:r}});pe.clear(),me&&(qt(),me.release(),me=null),re=!0,y=null,te=null,N=null,le.clear(),R.clear(),B&&t.removeEventListener("keydown",Tr,!0),t.removeEventListener("message",Sr),t.removeEventListener("keydown",gr,!0),t.removeEventListener("pointerover",mt),t.removeEventListener("pointermove",mt),t.removeEventListener("pointerout",hr),t.removeEventListener("focus",kr),t.removeEventListener("blur",br);for(let r of Q.values())clearTimeout(r.timer),r.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),s.clear(),c.clear(),d.clear(),p.clear(),S.clear(),A.clear(),g.clear(),U.clear(),G.clear(),H.clear(),J.clear(),se.clear(),Se.length=0}}};var dn=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var aa=new Set(dn);var ms=10*6e4;var Ts=10*6e4;var gs=10*6e4;var hs=10*6e4;var pn=["none","agent","user"];var la=new Set(pn);var ks=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],bs=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],un=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,i]of ks)t.style.setProperty(o,e.tokens[i]);for(let[o,i,s]of bs){let c=e.tokens[s]??"";t.style.setProperty(o,c),t.style.setProperty(i,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Io=(e,t)=>{un(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var xs={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(e,t)=>`var(--${e}, var(--oc-${xs[e]}, ${t}))`,we=$("surface-background","transparent"),Ct=$("surface-elevated","transparent"),ot=$("surface-elevated-foreground","inherit"),Te=$("surface-foreground","inherit"),z=$("surface-muted-foreground","gray"),As=$("surface-muted","transparent"),Be=$("interactive-border","currentColor"),Ee=$("interactive-hover","transparent"),Ke=$("interactive-active","transparent"),wo=$("interactive-selection","transparent"),Co=$("interactive-selection-foreground","inherit"),Ie=$("primary","currentColor"),Mo=$("primary-text","inherit"),Uo=$("error-text","inherit"),Os=$("font-sans","inherit"),No=$("font-mono","monospace"),Sn=$("radius","9px"),Lo=`calc(${Sn} - 2px)`,En=`calc(${Sn} - 4px)`,j=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,fn=`background-image: linear-gradient(${Ee}, ${Ee});`,Po=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Go="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",_n="box-shadow: var(--oc-sdk-lit);",Do=`inset 0 0.5px 0 0 ${j(Te,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Rs=`
:root {
  --oc-sdk-edge: ${j(Te,16)};
  --oc-sdk-field-bg: ${Ct};
  --oc-sdk-raised-bg: ${we};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${j(Te,14)};
  --oc-sdk-field-bg: ${j(we,50,Ct)};
  --oc-sdk-raised-bg: ${Ct};
  --oc-sdk-field-lift: ${Do};
  --oc-sdk-raised-lift: ${Do};
  --oc-sdk-lit: ${Do};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,wt=e=>{let t=$(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${$(`${e}-text`,"inherit")}; }`},u=e=>`calc(${e}rem / 14)`,ys=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${u(8)}; height: ${u(32)}; padding: 0 ${u(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${u(6)}; height: ${u(28)}; padding: 0 ${u(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${u(4)}; height: ${u(24)}; padding: 0 ${u(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${u(14)}; height: ${u(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${u(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${u(32)}; padding: 0 ${u(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${u(8)} ${u(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${u(34)}; padding-right: ${u(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${u(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${u(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${u(24)}; height: ${u(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${u(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${u(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${u(28)}; padding: 0 ${u(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${u(2)}; min-width: ${u(160)}; max-width: calc(100vw - ${u(16)}); max-height: min(${u(320)}, calc(100vh - ${u(16)})); overflow: auto; padding: ${u(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${u(2)} ${u(2)} ${u(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${u(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${u(8)}; width: 100%; padding: ${u(6)} ${u(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${u(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${u(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${u(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${u(14)}; height: ${u(14)}; margin-top: ${u(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${u(36)}; height: ${u(20)}; --oc-sdk-thumb-travel: ${u(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${u(2)}; left: ${u(2)}; width: ${u(16)}; height: ${u(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${u(2)}; padding: ${u(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${u(6)}; height: ${u(28)}; padding: 0 ${u(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${u(1)} ${u(6)}; font-size: ${u(11)}; font-weight: 500; line-height: ${u(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${u(8)}; width: 100%; padding: ${u(6)} ${u(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${u(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${u(16)} ${u(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${u(4)}; padding: ${u(40)} ${u(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${u(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${u(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${u(16)}; height: ${u(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${u(12)}; height: ${u(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${u(12)}; padding: ${u(8)} ${u(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${u(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${u(8)}; width: 100%; margin: ${u(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${u(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${u(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${u(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${u(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${u(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${u(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${u(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${u(36)}; height: ${u(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${u(44)}; }
  .oc-sdk-check { min-height: ${u(36)}; padding: ${u(8)} 0; }
}
`,mn=`${Rs}
.oc-sdk { color: ${Te}; font-family: ${Os}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${fn} }
.oc-sdk-mono { font-family: ${No}; }
.oc-sdk-muted { color: ${z}; }
${wt("success")}${wt("warning")}${wt("error")}${wt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ie}; --oc-sdk-tone-text: ${Mo}; }

.oc-sdk-btn { border-radius: ${Lo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${En}; }
.oc-sdk-btn[data-variant="default"] { color: ${Mo}; background: ${j(Ie,10,we)}; border-color: ${j(Ie,12)}; ${_n} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${j(Ie,16,we)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${j(Ie,22,we)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${As}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ke}, ${Ke}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${ot}; ${Go} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ke}, ${Ke}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ee}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ke}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${Uo}; background: ${j("var(--oc-sdk-tone)",7,we)}; border-color: ${j("var(--oc-sdk-tone)",12)}; ${_n} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${j("var(--oc-sdk-tone)",9,we)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${j("var(--oc-sdk-tone)",11,we)}; box-shadow: none; }

.oc-sdk-field-note { color: ${z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Uo}; }
.oc-sdk-input { border-radius: ${Lo}; background: var(--oc-sdk-field-bg); color: ${ot}; ${Po("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Po(j(Te,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Po($("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${No}; }

.oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ie}; }
.oc-sdk-search-clear { border-radius: ${En}; color: ${z}; }
.oc-sdk-search-clear:hover { background: ${Ee}; color: ${Te}; }

.oc-sdk-trigger { border-radius: ${Lo}; background: var(--oc-sdk-raised-bg); color: ${ot}; ${Go} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ke}, ${Ke}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${z}; }
.oc-sdk-trigger-chevron { color: ${z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${ot}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ct}; background-clip: padding-box; color: ${ot}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ee}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${wo}; color: ${Co}; }
.oc-sdk-option-check { color: ${Te}; }
.oc-sdk-option[data-destructive="true"] { color: ${Uo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${j($("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${z}; }
.oc-sdk-popup-empty { color: ${z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Be}; border-radius: 4px; color: ${Te}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${j(Te,60,Be)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Be}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${we}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ie}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${fn} }
.oc-sdk-check-desc { color: ${z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${j(Te,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Te}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Co}; background: ${wo}; border-color: ${Be}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${ot}; background: var(--oc-sdk-raised-bg); ${Go} }
.oc-sdk-tab-count { color: ${z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${j(Te,6)}; color: ${z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${j("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ee}; }
.oc-sdk-row[aria-selected="true"] { background: ${wo}; color: ${Co}; }
.oc-sdk-row-lead { font-family: ${No}; color: ${z}; }
.oc-sdk-row-sub { color: ${z}; }
.oc-sdk-row-meta { color: ${z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${z}; }

.oc-sdk-empty-body { color: ${z}; }

.oc-sdk-spinner { color: ${z}; }
.oc-sdk-spinner-ring { border-color: ${Be}; border-top-color: ${Ie}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${j("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${z}; }

.oc-sdk-separator { color: ${z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${j(Be,40)}; }

.oc-sdk-progress-label { color: ${z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${j(Te,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ie}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${$("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${$("success-text","inherit")}; }

.oc-sdk-text a { color: ${Mo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${j(Be,60)}; }
`,Z=`
${Qt}
${ys}
${mn}`;var Tn="oc-sdk-ui-style",ze=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},ee=e=>{let t=document.getElementById(Tn);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Zt(document);let o=document.createElement("style");o.id=Tn,o.textContent=e,document.head.appendChild(o)},M=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},ye=e=>{let t=M("button",e);return t.type="button",t},ge=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},Xe=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},gn=(e,t)=>{let o=i=>{i.target instanceof Node&&e.contains(i.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var vs=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ce=(e,t)=>{ee(Z);let o=t,i=ye("oc-sdk oc-sdk-btn"),s=vs(),c=document.createElement("span");i.append(c),e.append(i);let d=()=>{i.dataset.variant=o.variant??"default",i.dataset.size=o.size??"default",i.disabled=!!o.disabled||!!o.loading,i.dataset.loading=o.loading?"true":"false",i.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&s.parentNode!==i?i.prepend(s):!o.loading&&s.parentNode===i&&s.remove(),ge(c,o.label)},p=()=>{o.disabled||o.loading||o.onClick()};return i.addEventListener("click",p),d(),{update:S=>{o={...o,...S},d()},dispose:()=>{i.removeEventListener("click",p),i.remove()}}};var hn="http://www.w3.org/2000/svg",Is={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Me=(e,t,o)=>{let i=document.createElementNS(hn,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("width",String(t)),i.setAttribute("height",String(t)),i.style.width=u(t),i.style.height=u(t),i.setAttribute("aria-hidden","true"),i.setAttribute("fill","currentColor"),o&&i.setAttribute("class",o);let s=document.createElementNS(hn,"path");return s.setAttribute("d",Is[e]),i.append(s),i};var Ho=(e,t)=>{ee(Z);let o=t,i=M("div","oc-sdk oc-sdk-search"),s=M("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let c=ye("oc-sdk-search-clear");c.append(Me("close",14)),c.tabIndex=-1,i.append(Me("search",16,"oc-sdk-search-icon"),s,c),e.append(i);let d=()=>{let g=o.placeholder??"Search";Xe(s,"placeholder",g),s.setAttribute("aria-label",o.label??g),c.setAttribute("aria-label","Clear search"),s.value!==o.value&&(s.value=o.value),i.dataset.active=o.value.trim()===""?"false":"true"},p=()=>{o.value!==""&&o.onChange(""),s.focus()},S=()=>{o.onChange(s.value)},A=g=>{g.key==="Escape"&&s.value!==""&&(g.preventDefault(),p())};return s.addEventListener("input",S),s.addEventListener("keydown",A),c.addEventListener("click",p),d(),o.autofocus&&s.focus(),{update:g=>{o={...o,...g},d()},dispose:()=>{s.removeEventListener("input",S),s.removeEventListener("keydown",A),c.removeEventListener("click",p),i.remove()}}};var $e=(e,t="vertical")=>{let[o,i]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===i||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},je=(e,t,o)=>{let i=e.filter(S=>!S.disabled);if(i.length===0)return null;let s=i[0],c=i[i.length-1];if(o==="first"||!s||!c)return s?.id??null;if(o==="last")return c.id;let d=i.findIndex(S=>S.id===t);return d===-1?o==="next"?s.id:c.id:i[Math.min(i.length-1,Math.max(0,d+(o==="next"?1:-1)))]?.id??null};var kn=(e,t)=>`${e}-${t??""}`,Mt=(e,t,o,i)=>{let s=ye("oc-sdk-option");s.id=kn(e,o.id),s.setAttribute("role",t),s.tabIndex=-1,s.disabled=!!o.disabled,t==="option"&&s.setAttribute("aria-selected",o.selected?"true":"false"),s.dataset.destructive=o.destructive?"true":"false";let c=M("span","oc-sdk-option-label");if(c.textContent=o.label,s.append(c),o.hint){let d=M("span","oc-sdk-option-hint");d.textContent=o.hint,s.append(d)}if(t==="option"){s.dataset.mark="check";let d=M("span","oc-sdk-option-check");d.append(Me("check",14)),s.append(d)}return s.addEventListener("pointerenter",i.hover),s.addEventListener("click",i.pick),s},Ut=(e,t,o,i)=>{let s=kn(o,i);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===s?"true":"false");Xe(t,"aria-activedescendant",i?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ws=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let i=e.offsetHeight,s=window.innerHeight-o.bottom-8;i>s&&o.top-8>s&&(e.style.top=`${Math.max(8,Math.round(o.top-4-i))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},Nt=(e,t,o,i)=>{e.append(o),ws(o,t);let s=gn(e,i),c=()=>{i()},d=p=>{p.target instanceof Node&&o.contains(p.target)||i()};return window.addEventListener("resize",c),window.addEventListener("scroll",d,!0),()=>{s(),window.removeEventListener("resize",c),window.removeEventListener("scroll",d,!0),o.remove()}};var bn=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(i=>i.label.toLowerCase().includes(o)||i.id.toLowerCase().includes(o)):[...e]},Cs=0,rt=(e,t)=>{ee(Z);let o=t,i=`oc-sdk-select-${Cs+=1}`,s=M("div","oc-sdk oc-sdk-select"),c=M("span","oc-sdk-field-label");c.id=`${i}-label`;let d=ye("oc-sdk-trigger");d.setAttribute("aria-haspopup","listbox"),d.setAttribute("aria-labelledby",c.id);let p=M("span","oc-sdk-trigger-value");d.append(p,Me("chevron",14,"oc-sdk-trigger-chevron")),s.append(c,d),e.append(s);let S="",A=null,g=null,U=M("div","oc-sdk oc-sdk-popup"),G=M("div","oc-sdk-popup-search"),H=M("input","oc-sdk-input");H.type="text",H.autocomplete="off",G.append(H);let J=M("div");J.setAttribute("role","listbox"),J.tabIndex=-1,U.append(J);let se=()=>bn(o.options,o.searchable?S:""),Se=()=>o.searchable?H:J,y=E=>{A=E,Ut(J,Se(),i,E)},te=()=>{ze(J);let E=se();if(E.length===0){let f=M("div","oc-sdk-popup-empty");f.textContent="No matches",J.append(f)}for(let f of E)J.append(Mt(i,"option",{...f,selected:f.id===o.value},{hover:()=>y(f.id),pick:()=>N(f.id)}));y(E.some(f=>f.id===A)?A:E[0]?.id??null)},le=()=>{let E=g;g=null,E?.(),S="",H.value="",d.setAttribute("aria-expanded","false")},R=()=>{g||o.disabled||(A=o.value,H.placeholder=o.searchPlaceholder??"Search",o.searchable?U.prepend(G):G.remove(),te(),g=Nt(s,d,U,le),d.setAttribute("aria-expanded","true"),Se().focus())},N=E=>{le(),d.focus(),E!==o.value&&o.onChange(E)},v=()=>{g?le():R()},B=E=>{!g&&$e(E)&&(E.preventDefault(),R())},Q=E=>{let f=$e(E);f?(E.preventDefault(),y(je(se(),A,f))):E.key==="Enter"?(E.preventDefault(),A&&N(A)):E.key==="Escape"?(E.preventDefault(),le(),d.focus()):o.searchable&&E.target!==H&&E.key.length===1&&!E.ctrlKey&&!E.metaKey&&H.focus()},Y=()=>{S=H.value,te()},pe=E=>{g&&!(E.relatedTarget instanceof Node&&s.contains(E.relatedTarget))&&le()},re=()=>{ge(c,o.label),c.hidden=!o.label;let E=o.options.find(f=>f.id===o.value);ge(p,E?.label??o.placeholder??"Select"),p.dataset.empty=E?"false":"true",d.disabled=!!o.disabled,g&&te()};return d.addEventListener("click",v),d.addEventListener("keydown",B),U.addEventListener("keydown",Q),H.addEventListener("input",Y),s.addEventListener("focusout",pe),re(),{update:E=>{o={...o,...E},re()},dispose:()=>{le(),d.removeEventListener("click",v),d.removeEventListener("keydown",B),U.removeEventListener("keydown",Q),H.removeEventListener("input",Y),s.removeEventListener("focusout",pe),s.remove()}}};var xn=e=>e.filter(t=>!("separator"in t)),Us=0,Lt=(e,t)=>{ee(Z);let o=t,i=`oc-sdk-menu-${Us+=1}`,s=M("div","oc-sdk oc-sdk-menu");e.append(s);let c=M("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let d=null,p=null,S=Ce(s,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{d?G():H()}}),A=s.querySelector("button");A?.setAttribute("aria-haspopup","menu");let g=y=>{p=y,Ut(c,c,i,y)},U=()=>{ze(c);for(let y of o.items){if("separator"in y){let te=M("div","oc-sdk-separator");te.dataset.labeled="false",c.append(te);continue}c.append(Mt(i,"menuitem",y,{hover:()=>g(y.id),pick:()=>J(y.id)}))}g(xn(o.items).some(y=>y.id===p)?p:null)},G=()=>{let y=d;d=null,y?.(),p=null,A?.setAttribute("aria-expanded","false")},H=()=>{d||!A||(U(),d=Nt(s,A,c,G),A.setAttribute("aria-expanded","true"),c.focus())},J=y=>{G(),A?.focus(),o.onSelect(y)},se=y=>{let te=$e(y);te?(y.preventDefault(),g(je(xn(o.items),p,te))):y.key==="Enter"||y.key===" "?(y.preventDefault(),p&&J(p)):y.key==="Escape"&&(y.preventDefault(),G(),A?.focus())},Se=y=>{d&&!(y.relatedTarget instanceof Node&&s.contains(y.relatedTarget))&&G()};return c.addEventListener("keydown",se),s.addEventListener("focusout",Se),{update:y=>{o={...o,...y},S.update({label:o.label,variant:o.variant,size:o.size}),d&&U()},dispose:()=>{G(),c.removeEventListener("keydown",se),s.removeEventListener("focusout",Se),S.dispose(),s.remove()}}};var Ns=/^[a-z0-9][a-z0-9-]{0,63}$/,Ls=new Set(["all","new"]),fe=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},Ps=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS Build",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"Reverse Engineering",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"Video",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"Browser",skillIds:["browser-skill"]}],Gs=()=>Ps.map(e=>({...e,skillIds:[...e.skillIds]})),Pt=e=>{let t=new Set(e.map(s=>s.id)),o=new Set(e.map(s=>s.name.trim().toLowerCase())),i=Gs().filter(s=>{let c=s.name.toLowerCase();return t.has(s.id)||o.has(c)?!1:(t.add(s.id),o.add(c),!0)});return{groups:[...e,...i],added:i}},Vo=(e,t,o)=>{let i=t+o;if(t<0||t>=e.length||i<0||i>=e.length)return[...e];let s=[...e],[c]=s.splice(t,1);return s.splice(i,0,c),s},An=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new fe("The group configuration format is invalid.");let t=e;if(t.version!==1)throw new fe("The group configuration version is not supported.");if(!Array.isArray(t.groups))throw new fe("The group list format is invalid.");if(t.groups.length>50)throw new fe("At most 50 groups are allowed.");let o=[],i=new Set,s=new Set;for(let[c,d]of t.groups.entries()){if(!d||typeof d!="object"||Array.isArray(d))throw new fe(`Group ${c+1} has an invalid format.`);let p=d;if(typeof p.id!="string"||!Ns.test(p.id)||Ls.has(p.id))throw new fe(`Group ${c+1} has an invalid ID.`);if(i.has(p.id))throw new fe(`Duplicate group ID: ${p.id}`);let S=typeof p.name=="string"?p.name.trim():"";if(!S||S.length>40||/[\u0000-\u001f\u007f]/.test(S))throw new fe(`Group ${c+1} names must be 1\u201340 characters.`);let A=S.toLowerCase();if(s.has(A))throw new fe(`Duplicate group name: ${S}`);if(!Array.isArray(p.skillIds))throw new fe(`The members of group "${S}" have an invalid format.`);if(p.skillIds.length>200)throw new fe(`Group "${S}" cannot have more than 200 members.`);let g=[],U=new Set;for(let G of p.skillIds){if(typeof G!="string"||!G||G.length>128)throw new fe(`Group "${S}" contains an invalid skill ID.`);U.has(G)||(U.add(G),g.push(G))}i.add(p.id),s.add(A),o.push({id:p.id,name:S,skillIds:g})}return{version:1,groups:o}};var Xo=(e,t)=>e.name.localeCompare(t.name,void 0,{sensitivity:"base"})||e.id.localeCompare(t.id),On=e=>{switch(e.state){case"conflict":return 0;case"mixed":return 1;case"enabled":return 2;default:return 3}},Ds=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,Hs=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return Ds(e);case"all":default:return!0}},$o=(e,t)=>{let o=t.trim().toLowerCase();return o?[e.id,e.name,e.description,...e.warnings].join(" ").toLowerCase().includes(o):!0},lt=e=>({enable:e.filter(t=>t.state==="disabled").map(t=>t.key??t.id),disable:e.filter(t=>t.state==="enabled").map(t=>t.key??t.id)}),Rn=(e,t)=>{let o=t.sourceFilter??"all",i=e.filter(s=>(o==="all"||s.scope===o)&&Hs(s,t.stateFilter)&&$o(s,t.query));switch(t.sortMode){case"tokens":return[...i].sort((s,c)=>c.estimatedTokens-s.estimatedTokens||Xo(s,c));case"name":return[...i].sort(Xo);case"state":return[...i].sort((s,c)=>On(s)-On(c)||Xo(s,c));case"default":default:return i}};function yn(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var vn=`:root {
  --sk-bg: var(--surface-background, var(--oc-bg, transparent));
  --sk-fg: var(--oc-fg);
  --sk-muted: var(--oc-muted);
  --sk-border: var(--oc-border);
  --sk-primary: var(--oc-primary);
  --sk-primary-fg: var(--oc-primary-fg, #fff);
  --sk-warning: var(--oc-warning);
  --sk-error: var(--oc-error);
  --sk-success: var(--oc-success);
  --sk-info: var(--oc-info);
  --ext-bg: var(--sk-bg);
}

.sk {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--sk-fg);
  font-size: 13px;
  line-height: 1.5;
}
.sk-header {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--sk-border);
}
.sk-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 12px;
}
.sk-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}
.sk-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-summary {
  margin: 0;
  color: var(--sk-fg);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-summary-secondary {
  margin-top: -4px;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-body {
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding: 12px 16px 24px;
  scrollbar-gutter: stable;
}
.sk-notice-root:empty {
  display: none;
}
.sk-notice {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-info) 7%, var(--sk-bg));
  color: var(--oc-info-text);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-notice[data-tone="success"] {
  background: color-mix(in srgb, var(--sk-success) 7%, var(--sk-bg));
  color: var(--oc-success-text);
}
.sk-notice[data-tone="warning"] {
  background: color-mix(in srgb, var(--sk-warning) 8%, var(--sk-bg));
  color: var(--oc-warning-text);
}
.sk-notice[data-tone="error"] {
  background: color-mix(in srgb, var(--sk-error) 7%, var(--sk-bg));
  color: var(--oc-error-text);
}
.sk-notice-actions,
.sk-conflict-actions,
.sk-mini-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-notice-actions {
  margin-top: 8px;
}
.sk-inline-button {
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: transparent;
  color: var(--sk-fg);
  padding: 3px 8px;
  font-size: 11px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-inline-button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--sk-fg) 6%, transparent);
}
.sk-inline-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sk-inline-primary {
  background: var(--sk-primary);
  border-color: var(--sk-primary);
  color: var(--sk-primary-fg);
}
.sk-inline-primary:hover:not(:disabled) {
  background: var(--sk-primary);
  filter: brightness(1.05);
}
.sk-conflicts {
  margin: 0 0 12px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--sk-warning) 35%, var(--sk-border));
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-warning) 5%, transparent);
}
.sk-section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
}
.sk-section-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
.sk-section-count {
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-conflict-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.sk-conflict-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding-left: 10px;
  border-left: 2px solid var(--sk-border);
}
.sk-conflict-item[data-tone="error"] {
  border-left-color: var(--sk-error);
}
.sk-conflict-item[data-tone="warning"] {
  border-left-color: var(--sk-warning);
}
.sk-conflict-copy {
  min-width: 0;
  flex: 1 1 260px;
}
.sk-conflict-copy strong {
  display: block;
  font-size: 12px;
  font-weight: 600;
}
.sk-conflict-message {
  margin: 2px 0 0;
  color: var(--sk-muted);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-path {
  display: flex;
  gap: 4px;
  margin: 4px 0 0;
  min-width: 0;
  font-size: 10px;
  line-height: 1.5;
  color: var(--sk-muted);
  overflow-wrap: anywhere;
}
.sk-path-label {
  flex: none;
}
.sk-path code {
  min-width: 0;
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  overflow-wrap: anywhere;
}
.sk-warning-details {
  margin-top: 8px;
}
.sk-warning-details summary {
  cursor: pointer;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-sources {
  margin: 0 0 12px;
  padding: 0 0 6px;
  border-bottom: 1px solid var(--sk-border);
}
.sk-sources summary {
  cursor: pointer;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-source-list {
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.sk-source-item {
  padding: 6px 8px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-muted) 4%, transparent);
}
.sk-source-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 6px;
}
.sk-source-head strong {
  font-size: 11px;
  font-weight: 600;
}
.sk-source-path {
  display: block;
  margin-top: 3px;
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  overflow-wrap: anywhere;
}
.sk-source-error {
  margin: 3px 0 0;
  color: var(--sk-error);
  font-size: 10px;
}

.sk-groups {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
}
.sk-groups-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0 6px;
}
.sk-groups-edit {
  flex: none;
  align-self: flex-start;
  border-color: var(--sk-border);
  white-space: nowrap;
}
.sk-groups-edit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sk-group-select {
  display: none;
  flex: 1;
  min-width: 0;
}
.sk-groups-note:empty {
  display: none;
}
.sk-groups-note .sk-notice {
  margin-bottom: 8px;
}
.sk-chip {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--sk-muted);
  padding: 2px 7px;
  font-size: 11px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-chip:hover {
  color: var(--sk-fg);
}
.sk-chip[aria-pressed="true"] {
  color: var(--sk-fg);
  border-color: var(--sk-border);
  background: color-mix(in srgb, var(--sk-fg) 5%, transparent);
}
.sk-groupbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 12px;
  padding: 7px 0;
  border-top: 1px solid var(--sk-border);
  border-bottom: 1px solid var(--sk-border);
  margin-bottom: 8px;
}.sk-groupbar-text {
  min-width: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 8px;
}
.sk-groupbar-text strong {
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
}
.sk-group-state {
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-group-warning {
  flex-basis: 100%;
  margin: 0;
  color: var(--oc-warning-text);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-groupbar-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-group-editor-root:empty {
  display: none;
}
.sk-group-editor {
  margin: 2px 0 10px;
  padding: 10px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-fg) 3%, transparent);
}
.sk-group-editor .sk-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}
.sk-group-editor .sk-section-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
}
.sk-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 0 0 8px;
}
.sk-field-label {
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-input {
  width: 100%;
  min-height: 28px;
  padding: 3px 7px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: var(--sk-bg);
  color: var(--sk-fg);
  font: inherit;
  font-size: 12px;
}
.sk-input:disabled {
  opacity: 0.55;
}
.sk-members {
  min-width: 0;
  margin: 0 0 8px;
  padding: 6px 8px 8px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
}
.sk-members legend {
  padding: 0 4px;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-members-tools {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}
.sk-member-filter {
  flex: 1 1 140px;
  min-width: 0;
  min-height: 26px;
  padding: 2px 7px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: var(--sk-bg);
  color: var(--sk-fg);
  font: inherit;
  font-size: 11px;
}
.sk-member-filter::placeholder {
  color: var(--sk-muted);
}
.sk-member-list {
  display: grid;
  gap: 1px;
  max-height: 196px;
  overflow: auto;
}
.sk-member-empty {
  margin: 6px 0;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-order-box {
  margin-top: 8px;
  padding-top: 7px;
  border-top: 1px dashed var(--sk-border);
}
.sk-order-box:empty {
  display: none;
}
.sk-order-title {
  margin: 0 0 5px;
  color: var(--sk-muted);
  font-size: 11px;
}
.sk-order-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
  max-height: 160px;
  overflow: auto;
}
.sk-order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 3px 6px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: var(--sk-bg);
}
.sk-order-label {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}
.sk-order-name {
  min-width: 0;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sk-order-actions {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.sk-order-btn {
  border: 1px solid var(--sk-border);
  border-radius: 5px;
  background: transparent;
  color: var(--sk-muted);
  min-width: 22px;
  height: 20px;
  padding: 0 4px;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}
.sk-order-btn:hover:not(:disabled) {
  color: var(--sk-fg);
  background: color-mix(in srgb, var(--sk-fg) 6%, transparent);
}
.sk-order-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.sk-check {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  padding: 2px 0;
  cursor: pointer;
}
.sk-check input {
  flex: none;
  margin: 3px 0 0;
  accent-color: var(--sk-primary);
}
.sk-check-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sk-check-name {
  font-size: 12px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.sk-check-id {
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.sk-missing {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
}
.sk-missing-label {
  color: var(--oc-warning-text);
  font-size: 11px;
}
.sk-missing-chip {
  border: 1px dashed var(--sk-border);
  border-radius: 999px;
  background: transparent;
  color: var(--oc-warning-text);
  padding: 1px 6px;
  font-size: 10px;
  line-height: 1.5;
  cursor: pointer;
}
.sk-missing-chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.sk-editor-error {
  margin: 0 0 8px;
  color: var(--oc-error-text);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-editor-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-editor-confirm {
  margin-top: 8px;
  padding: 8px;
  border-radius: var(--oc-radius, 6px);
  background: color-mix(in srgb, var(--sk-warning) 8%, transparent);
}
.sk-editor-confirm p {
  margin: 0 0 6px;
  color: var(--oc-warning-text);
  font-size: 11px;
  line-height: 1.5;
}
.sk-editor-hint {
  margin: 8px 0 0;
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.5;
}
.sk-step {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--sk-border);
  border-radius: 50%;
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1;
}
.sk-original-name {
  color: var(--sk-muted);
  font-size: 10px;
  overflow-wrap: anywhere;
}
.sk-chip:focus-visible,
.sk-input:focus-visible,
.sk-member-filter:focus-visible,
.sk-order-btn:focus-visible,
.sk-desc-toggle:focus-visible,
.sk-missing-chip:focus-visible {
  outline: 2px solid var(--oc-focus);
  outline-offset: 2px;
}

.sk-toolbar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 6px;
}
.sk-search-slot {
  flex: 1 1 180px;
  min-width: 0;
}
.sk-toolbar-selects {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}
.sk-toolbar-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
}
.sk-toolbar-actions .oc-sdk-trigger {
  height: 30px;
  font-size: 11px;
}
.sk-filter-slot,
.sk-source-slot,
.sk-sort-slot {
  min-width: 0;
}
.sk-filter-slot .oc-sdk-select,
.sk-source-slot .oc-sdk-select,
.sk-sort-slot .oc-sdk-select {
  gap: 0;
}
.sk-filter-slot .oc-sdk-trigger,
.sk-source-slot .oc-sdk-trigger,
.sk-sort-slot .oc-sdk-trigger {
  width: 100%;
  height: 30px;
  font-size: 11px;
}
.sk-list {
  display: block;
}
.sk-skill {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 13px 0;
  border-bottom: 1px solid var(--sk-border);
}
.sk-skill-main {
  min-width: 0;
}
.sk-skill-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.sk-name {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-badge {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 1px 6px;
  border: 1px solid var(--sk-border);
  border-radius: 999px;
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sk-badge[data-tone="success"] {
  border-color: color-mix(in srgb, var(--sk-success) 30%, var(--sk-border));
  background: color-mix(in srgb, var(--sk-success) 8%, transparent);
  color: var(--oc-success-text);
}
.sk-badge[data-tone="warning"] {
  border-color: color-mix(in srgb, var(--sk-warning) 35%, var(--sk-border));
  background: color-mix(in srgb, var(--sk-warning) 8%, transparent);
  color: var(--oc-warning-text);
}
.sk-badge[data-tone="error"] {
  border-color: color-mix(in srgb, var(--sk-error) 35%, var(--sk-border));
  background: color-mix(in srgb, var(--sk-error) 8%, transparent);
  color: var(--oc-error-text);
}
.sk-badge[data-tone="info"] {
  border-color: color-mix(in srgb, var(--sk-info) 30%, var(--sk-border));
  color: var(--oc-info-text);
}
.sk-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin-top: 4px;
}
.sk-id {
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  overflow-wrap: anywhere;
}
.sk-source {
  color: var(--sk-muted);
  font-size: 10px;
  cursor: help;
  border-bottom: 1px dotted var(--sk-border);
}
.sk-token {
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.sk-desc {
  margin: 6px 0 0;
  color: var(--sk-muted);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sk-desc.is-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
  white-space: pre-wrap;
}
.sk-desc-toggle {
  margin-top: 3px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--sk-muted);
  font: inherit;
  font-size: 11px;
  line-height: 1.4;
  cursor: pointer;
}
.sk-desc-toggle:hover {
  color: var(--sk-fg);
  text-decoration: underline;
}
.sk-warn {
  margin: 6px 0 0;
  color: var(--oc-warning-text);
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-skill-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-width: 0;
}
.sk-action-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.sk-menu-slot .oc-sdk-btn {
  min-width: 24px;
  padding-inline: 5px;
}
.sk-action-note {
  color: var(--sk-muted);
  font-size: 10px;
  line-height: 1.4;
  white-space: nowrap;
}
.sk-switch {
  position: relative;
  flex: none;
  width: 34px;
  height: 20px;
  padding: 0;
  border: 1px solid var(--sk-border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--sk-fg) 8%, transparent);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.sk-switch .sk-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--sk-muted);
  transition: transform 0.15s ease, background 0.15s ease;
}
.sk-switch[aria-checked="true"] {
  background: var(--sk-primary);
  border-color: var(--sk-primary);
}
.sk-switch[aria-checked="true"] .sk-thumb {
  transform: translateX(14px);
  background: var(--sk-primary-fg);
}
.sk-switch:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.sk-empty {
  padding: 28px 2px;
}
.sk-empty h2 {
  margin: 0 0 5px;
  font-size: 13px;
  font-weight: 600;
}
.sk-empty p {
  margin: 0;
  max-width: 42em;
  color: var(--sk-muted);
  font-size: 12px;
}
.sk-empty-actions {
  margin-top: 10px;
}
.sk-footer {
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid var(--sk-border);
  color: var(--sk-muted);
  font-size: 11px;
  line-height: 1.6;
}
.sk-footer p {
  margin: 0 0 4px;
}
.sk-footer p:last-child {
  margin-bottom: 0;
}
.sk-inline-button:focus-visible,
.sk-switch:focus-visible {
  outline: 2px solid var(--oc-focus);
  outline-offset: 2px;
}

/* Default compact layout for narrow panels; progressively enhance via @media and @container */
.sk-groups {
  display: none;
}
.sk-group-select {
  display: block;
}
.sk-group-select .oc-sdk-select {
  gap: 0;
}
.sk-group-select .oc-sdk-trigger {
  width: 100%;
  height: 28px;
  border: 1px solid var(--sk-border);
  border-radius: var(--oc-radius, 6px);
  background: transparent;
  color: var(--sk-fg);
  font-size: 12px;
}

@media (min-width: 400px) {
  .sk-skill {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px 16px;
  }
  .sk-skill-action {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    min-width: 82px;
  }
  .sk-groups {
    display: flex;
  }
  .sk-group-select {
    display: none;
  }
}

@media (min-width: 520px) {
  .sk-toolbar {
    flex-direction: row;
    align-items: center;
  }
  .sk-toolbar-selects {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }
  .sk-filter-slot .oc-sdk-trigger,
  .sk-source-slot .oc-sdk-trigger,
  .sk-sort-slot .oc-sdk-trigger {
    width: auto;
    min-width: 96px;
  }
}

@supports (container-type: inline-size) {
  @media (min-width: 400px) {
    .sk-skill {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .sk-skill-action {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      min-width: 0;
    }
    .sk-groups {
      display: none;
    }
    .sk-group-select {
      display: block;
    }
  }
  @media (min-width: 520px) {
    .sk-toolbar {
      flex-direction: column;
      align-items: stretch;
    }
    .sk-toolbar-selects {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sk-filter-slot .oc-sdk-trigger,
    .sk-source-slot .oc-sdk-trigger,
    .sk-sort-slot .oc-sdk-trigger {
      width: 100%;
    }
  }

  @container (min-width: 390px) {
    .sk-skill {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px 16px;
    }
    .sk-skill-action {
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      min-width: 82px;
    }
    .sk-groups {
      display: flex;
    }
    .sk-group-select {
      display: none;
    }
  }

  @container (min-width: 500px) {
    .sk-toolbar {
      flex-direction: row;
      align-items: center;
    }
    .sk-toolbar-selects {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    .sk-filter-slot .oc-sdk-trigger,
    .sk-source-slot .oc-sdk-trigger,
    .sk-sort-slot .oc-sdk-trigger {
      width: auto;
      min-width: 96px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .sk-switch,
  .sk-switch .sk-thumb {
    transition: none;
  }
}
`;var In=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
:root {
  --ext-bg: var(--surface-background, var(--oc-bg, transparent));
  --ext-space-1: 4px;
  --ext-space-2: 8px;
  --ext-space-3: 12px;
  --ext-space-4: 16px;
  --ext-space-6: 24px;
  --ext-text-small: 11px;
  --ext-text-body: 13px;
  --ext-text-title: 14px;
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
}
* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
html, body { margin: 0; height: 100%; background: var(--ext-bg); }
body { overflow: hidden; }
#root { height: 100%; }
[hidden] { display: none !important; }
button, input, textarea, select { font: inherit; }
.ext {
  color: var(--oc-fg);
  font-family: var(--oc-font);
  font-size: var(--ext-text-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.ext-container { container-type: inline-size; }
.ext :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--oc-focus, CanvasText);
  outline-offset: 2px;
}
.ext button:not(:disabled) {
  transition: background-color 140ms ease-out, border-color 140ms ease-out, color 140ms ease-out, opacity 140ms ease-out, scale 120ms ease-out;
}
.ext button:not(:disabled):active { scale: 0.985; }
.ext-actions { display: flex; align-items: center; flex-wrap: wrap; gap: var(--ext-space-2); }
.ext-muted { color: var(--oc-muted); font-size: var(--ext-text-small); }
.ext-notice {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--oc-radius, 6px);
  border: 1px solid color-mix(in srgb, var(--oc-info) 20%, transparent);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  background: color-mix(in srgb, var(--oc-info) 7%, var(--ext-bg));
  color: var(--oc-info-text);
}
.ext-notice[data-tone="success"] {
  border-color: color-mix(in srgb, var(--oc-success) 22%, transparent);
  background: color-mix(in srgb, var(--oc-success) 7%, var(--ext-bg));
  color: var(--oc-success-text);
}
.ext-notice[data-tone="warning"] {
  border-color: color-mix(in srgb, var(--oc-warning) 24%, transparent);
  background: color-mix(in srgb, var(--oc-warning) 8%, var(--ext-bg));
  color: var(--oc-warning-text);
}
.ext-notice[data-tone="error"] {
  border-color: color-mix(in srgb, var(--oc-error) 22%, transparent);
  background: color-mix(in srgb, var(--oc-error) 7%, var(--ext-bg));
  color: var(--oc-error-text);
}
.ext .oc-sdk-btn[data-size="sm"], .ext .oc-sdk-tab { font-size: 12px; }
.ext .oc-sdk-field-note { font-size: var(--ext-text-small); }
@media (prefers-reduced-motion: reduce) {
  .ext *, .ext *::before, .ext *::after { animation: none !important; transition: none !important; }
  .ext button:not(:disabled):active { scale: none; }
}
`;var n=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,i)=>Object.prototype.hasOwnProperty.call(t,i)?String(t[i]):o):e,xe=vo({requestTimeoutMs:3e4}),Vn=document.querySelector("#root");if(!Vn)throw new Error("Missing #root");yn(document);var Xn=document.createElement("style");Xn.textContent=In+vn;document.head.append(Xn);var l=(e,t="",o)=>{let i=document.createElement(e);return i.className=t,o!==void 0&&(i.textContent=o),i},ve=class extends Error{code;conflicts;constructor(t,o,i){super(t),this.name="ServiceError",this.code=o,this.conflicts=i}},$s=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",Fs=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",Ue=(e,t="")=>typeof e=="string"?e:t,wn=e=>typeof e=="string"&&e.length>0?e:null,Ht=e=>e===!0,$n=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Cn=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],nr=e=>{if(!e||typeof e!="object")return null;let t=e;return!Fs(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:Ue(t.message,n("Conflict")),activePath:wn(t.activePath),disabledPath:wn(t.disabledPath),blocking:Ht(t.blocking)}},Bs=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!$s(t.state)?null:{key:Ue(t.key,t.id),id:t.id,scope:t.scope==="project"?"project":"global",sourceId:Ue(t.sourceId,"opencode-global"),rootPath:Ue(t.rootPath),name:Ue(t.name,t.id),description:Ue(t.description),state:t.state,advertised:Ht(t.advertised),autoInvokeOff:Ht(t.autoInvokeOff),activePaths:Cn(t.activePaths),disabledPaths:Cn(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(nr).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:$n(t.estimatedTokens)}},Mn=e=>{if(!e||typeof e!="object")throw new ve(n("The service returned invalid skill directory information."),"parse",[]);let t=e;return{sourceId:Ue(t.sourceId,"opencode-global"),scope:t.scope==="project"?"project":"global",label:Ue(t.label,n("Skill directory")),path:Ue(t.path),exists:Ht(t.exists),error:typeof t.error=="string"?t.error:null}},Je=e=>{if(!e||typeof e!="object")throw new ve(n("The service returned data in an unexpected format."),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new ve(n("The service returned data in an unexpected format."),"parse",[]);let o=t.skills.map(Bs).filter(p=>p!==null),i=Array.isArray(t.conflicts)?t.conflicts.map(nr).filter(p=>p!==null):o.flatMap(p=>p.conflicts),s=i.filter(p=>p.blocking).length,c={total:o.length,advertised:o.filter(p=>p.advertised).length,disabled:o.filter(p=>p.state==="disabled").length,blockingConflicts:s,warnings:i.length-s,estimatedTokens:o.reduce((p,S)=>p+S.estimatedTokens,0)},d=Array.isArray(t.roots)?t.roots.map(Mn):t.root?[Mn(t.root)]:[];return{skills:o,conflicts:i,summary:c,root:d[0]??{sourceId:"opencode-global",scope:"global",label:n("Skill directory"),path:"",exists:!1,error:null},roots:d,projectDirectory:typeof t.projectDirectory=="string"?t.projectDirectory:null,scannedAt:$n(t.scannedAt)}},$t=e=>{try{return An(e).groups}catch(t){throw new ve(t instanceof Error?t.message:n("The group configuration format is invalid."),"parse",[])}},_t=async(e,t,o)=>{let i=await xe.serviceRequest({method:e,path:t,...o===void 0?{}:{body:JSON.stringify(o)}}),s;try{s=JSON.parse(i.body)}catch{throw new ve(n("The service returned unrecognized data. Try again."),"parse",[])}if(i.status>=400){let c=s&&typeof s=="object"?s:{},d=typeof c.error=="string"?c.error:n("Request failed ({status})",{status:i.status}),p=typeof c.code=="string"?c.code:null,S=Array.isArray(c.conflicts)?c.conflicts.map(nr).filter(A=>A!==null):[];throw new ve(d,p,S)}return s},Ye=async(e,t,o)=>{let i=We?`${t.includes("?")?"&":"?"}directory=${encodeURIComponent(We)}`:"",s=o===void 0||e==="GET"?void 0:{...o,directory:We??void 0};return _t(e,`${t}${i}`,s)},Pe=e=>T?.skills.find(t=>t.key===e)??T?.skills.filter(t=>t.id===e)[0],Oe=e=>e instanceof b?e.code==="NO_SERVICE"?n('Allow "Skills" to run its local service in Settings \u2192 Extensions.'):e.code==="SERVICE_FAILED"?n("The local service is not ready. Reload the extension and try again."):e.code==="DISABLED"?n("The Skills extension is disabled. Enable it in extension settings."):e.code==="HOST_TIMEOUT"?n("The local service timed out. Try again."):n("Cannot connect to the local service. Check extension permissions."):e instanceof ve||e instanceof Error?e.message:n("The operation failed. Try again."),Ks=e=>e instanceof ve&&e.code==="not-found"?n('The local service is too old. Disable and re-enable "Skills" in extension settings.'):Oe(e),Ft=l("main","ext ext-container sk");Ft.setAttribute("aria-label",n("Skills Manager"));var Fn=l("header","sk-header"),Bn=l("div","sk-title-row"),zs=l("h1","sk-title",n("Skills Manager")),Bt=l("div","sk-actions"),js=Ce(Bt,{label:n("Rescan"),variant:"outline",size:"sm",onClick:()=>{Ve(!0),Xt()}}),Ws=Ce(Bt,{label:n("Enable all"),variant:"outline",size:"sm",onClick:()=>rs(!0)}),qs=Ce(Bt,{label:n("Disable all"),variant:"outline",size:"sm",onClick:()=>rs(!1)});Bn.append(zs,Bt);var Zo=l("p","sk-summary"),er=l("p","sk-summary sk-summary-secondary");Fn.append(Bn,Zo,er);var Kn=l("div","sk-body"),de=l("div","sk-notice-root");de.setAttribute("aria-live","polite");var Dt=l("div","sk-groups-note"),zn=l("div","sk-groups-row"),dt=l("div","sk-groups"),sr=l("div","sk-group-select"),Ne=l("button","sk-chip sk-groups-edit",n("Edit groups"));Ne.type="button";Ne.setAttribute("aria-pressed","false");Ne.addEventListener("click",()=>{x?ur():ui()});zn.append(dt,sr,Ne);var st=l("div","sk-group-editor-root"),tr=l("div"),ft=l("div"),nt=l("details","sk-sources"),jn=l("div","sk-toolbar"),ir=l("div","sk-search-slot"),Wn=l("div","sk-toolbar-selects"),ar=l("div","sk-toolbar-actions"),cr=l("div","sk-filter-slot"),lr=l("div","sk-source-slot"),dr=l("div","sk-sort-slot");Wn.append(cr,lr,dr);var Js=Lt(ar,{label:n("List actions"),variant:"ghost",size:"sm",items:[{id:"invert",label:n("Invert visible skills")},{id:"copy-ids",label:n("Copy visible IDs")}],onSelect:e=>{e==="invert"?Ai():e==="copy-ids"&&xi()}}),Fo=ar.querySelector(".oc-sdk-btn");Fo&&(Fo.setAttribute("aria-label",n("List actions")),Fo.title=n("Copy IDs or invert the visible skills"));jn.append(ir,Wn,ar);var pt=l("div","sk-list");pt.setAttribute("role","list");var qn=l("footer","sk-footer"),Ys=l("p","",n("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open.")),Qs=l("p","",n("Enable all before disabling or uninstalling the extension; rescan after skills change."));qn.append(Ys,Qs);Kn.append(de,Dt,zn,st,tr,ft,nt,jn,pt,qn);Ft.append(Fn,Kn);Vn.append(Ft);var T=null,be=!1,ut=null,C=null,_=null,ce=null,_e=!1,oe=null,W=null,D=[],Ae=null,Le=!0,x=null,ae=null,Ge=!1,De=!1,Et="",Kt="",zt="all",jt="all",pr="default",We=null,Gt=new Set,Un,Nn=!1,Jn=()=>[{id:"all",label:n("All states")},{id:"enabled",label:n("Enabled")},{id:"disabled",label:n("Disabled")},{id:"attention",label:n("Needs attention")}],Yn=()=>[{id:"all",label:n("All sources")},{id:"global",label:n("Global")},{id:"project",label:n("Project")}],Qn=()=>[{id:"default",label:n("Default order")},{id:"tokens",label:n("Tokens (high to low)")},{id:"name",label:n("Name (A\u2013Z)")},{id:"state",label:n("Needs attention first")}],Zs=Ho(ir,{value:"",placeholder:n("Search name, description, or ID (press / to focus)"),onChange:e=>{Kt=e,at()}}),Zn=()=>ir.querySelector("input"),es=()=>{let e=Zn();e&&e.setAttribute("aria-label",n("Search skills"))};es();var ei=rt(cr,{value:"all",options:Jn(),onChange:e=>{zt=e==="enabled"||e==="disabled"||e==="attention"?e:"all",at()}}),Bo=cr.querySelector(".oc-sdk-trigger");Bo&&(Bo.setAttribute("aria-label",n("Filter by status")),Bo.removeAttribute("aria-labelledby"));var ti=rt(lr,{value:"all",options:Yn(),onChange:e=>{jt=e==="global"||e==="project"?e:"all",at()}}),Ko=lr.querySelector(".oc-sdk-trigger");Ko&&(Ko.setAttribute("aria-label",n("Filter by skill source")),Ko.removeAttribute("aria-labelledby"));var oi=rt(dr,{value:"default",options:Qn(),onChange:e=>{pr=e==="tokens"||e==="name"||e==="state"?e:"default",at()}}),zo=dr.querySelector(".oc-sdk-trigger");zo&&(zo.setAttribute("aria-label",n("Sort order")),zo.removeAttribute("aria-labelledby"));var ri=rt(sr,{value:"all",options:[{id:"all",label:n("All")}],onChange:e=>{W=e==="all"?null:e,k()}}),jo=sr.querySelector(".oc-sdk-trigger");jo&&(jo.setAttribute("aria-label",n("Filter by group")),jo.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=Zn();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"){if(oe||ce!==null||_e){e.preventDefault(),oe=null,ce=null,_e=!1,k();return}x&&!_&&(e.preventDefault(),Ge||De?(Ge=!1,De=!1,k()):ur())}}});var He=()=>!!(T?.root.error||T?.roots.some(e=>e.error)),it=()=>{let e=T;if(!e)return[];let t=W?D.find(i=>i.id===W):null,o=t?t.skillIds.map(i=>Pe(i)).filter(i=>!!i):e.skills;return Rn(o,{query:Kt,stateFilter:zt,sourceFilter:jt,sortMode:pr})},ni=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",si=e=>e.state==="conflict"?n("Conflict"):e.state==="mixed"?n("Mixed"):e.state==="disabled"?n("Disabled"):n("Enabled"),Vt=(e,t="neutral")=>{let o=l("span","sk-badge",e);return o.dataset.tone=t,o},ii=e=>{switch(e){case"both":return n("Both entry and disabled file exist");case"duplicate":return n("Multiple entries for one ID");case"invalid":return n("Frontmatter could not be parsed");case"empty":return n("Entry file is empty");case"read-error":return n("Entry cannot be read");case"manual":return n("Manual invocation only");case"no-description":return n("No description");default:return n("Conflict")}},Wo=(e,t)=>{if(!t)return null;let o=l("p","sk-path");return o.append(l("span","sk-path-label",`${e}:`),l("code","",t)),o},F=(e,t,o=!1,i=!1)=>{let s=l("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return s.type="button",s.disabled=!!_||i,s.addEventListener("click",t),s},Ln=e=>{let t=l("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=l("div","sk-conflict-copy");if(o.append(l("strong","",ii(e.kind)),l("p","sk-conflict-message",e.message)),e.kind==="both"?(o.append(Wo(n("Active entry"),e.activePath)??l("span")),o.append(Wo(n("Disabled entry"),e.disabledPath)??l("span"))):(e.activePath??e.disabledPath)&&o.append(Wo(n("Entry"),e.activePath??e.disabledPath)??l("span")),t.append(o),e.kind==="both"&&e.activePath){let i=l("div","sk-conflict-actions");i.append(F(n("Keep enabled"),()=>void Hn(e,"enabled"),!1,He()),F(n("Keep disabled"),()=>void Hn(e,"disabled"),!1,He())),t.append(i)}return t},ai=()=>{if(ft.replaceChildren(),!T)return;let t=[...T.roots.filter(d=>!!d.error).map(d=>({kind:"read-error",skillId:"",message:n("Cannot read {label}: {error} ({path})",{label:d.label,error:d.error??"",path:d.path}),activePath:null,disabledPath:null,blocking:!0})),...T.conflicts],o=t.filter(d=>d.blocking),i=t.filter(d=>!d.blocking);if(o.length===0&&i.length===0)return;let s=l("section","sk-conflicts");s.setAttribute("aria-label",n("Conflict check"));let c=l("div","sk-section-head");if(c.append(l("h2","sk-section-title",n("Conflict check")),l("span","sk-section-count",n("To resolve: {blocking} \xB7 Warnings: {warnings}",{blocking:o.length,warnings:i.length}))),s.append(c),o.length>0){let d=l("ul","sk-conflict-list");for(let p of o)d.append(Ln(p));s.append(d)}if(i.length>0){let d=l("details","sk-warning-details");d.append(l("summary","",n("Warnings ({count})",{count:i.length})));let p=l("ul","sk-conflict-list");for(let S of i)p.append(Ln(S));d.append(p),s.append(d)}ft.append(s)},ci=()=>{let e=nt.open;nt.replaceChildren();let t=T;if(!t)return;let o=t.roots.filter(s=>s.exists).length;nt.append(l("summary","",n("Detected skill sources: {available}/{total} available",{available:o,total:t.roots.length})));let i=l("ul","sk-source-list");for(let s of t.roots){let c=l("li","sk-source-item"),d=l("div","sk-source-head"),p=s.error?n("Error"):s.exists?n("Available"):n("Not created");d.append(l("strong","",s.label),Vt(s.scope==="project"?n("Project"):n("Global"),s.scope==="project"?"info":"neutral"),Vt(p,s.error?"error":s.exists?"success":"neutral")),c.append(d,l("code","sk-source-path",s.path||n("No path"))),s.error&&c.append(l("p","sk-source-error",s.error)),i.append(c)}nt.append(i),nt.open=e},ts=()=>{if(de.replaceChildren(),oe){let e=oe,t=new Set(e.skillIds),o=T?T.skills.filter(c=>!t.has(c.key)&&!t.has(c.id)).length:0,i=l("div","sk-notice",n('Enable only "{name}": other skills disabled: {count}.',{name:e.name,count:o}));i.dataset.tone="warning",i.setAttribute("role","status");let s=l("div","sk-notice-actions");s.append(F(n("Confirm"),()=>void bi(),!0),F(n("Cancel"),()=>{oe=null,k()})),i.append(s),de.append(i);return}if(_e){let e=lt(it()),t=e.enable.length+e.disable.length,o=l("div","sk-notice",n("Invert visible skills: enable {enable}, disable {disable}.",{enable:e.enable.length,disable:e.disable.length}));o.dataset.tone="warning",o.setAttribute("role","status");let i=l("div","sk-notice-actions");i.append(F(n("Confirm invert"),()=>void Oi(),!0,t===0),F(n("Cancel"),()=>{_e=!1,k()})),o.append(i),de.append(o);return}if(ce!==null){let e=T?T.skills.filter(i=>(ce?i.disabledPaths.length:i.activePaths.length)>0).length:0,t=l("div","sk-notice",ce?n("Skills to enable: {count}.",{count:e}):n("Skills to disable: {count}.",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=l("div","sk-notice-actions");o.append(F(n(ce?"Confirm enable":"Confirm disable"),()=>void Ci(),!0),F(n("Cancel"),()=>{ce=null,k()})),t.append(o),de.append(t);return}if(C){let e=l("div","sk-notice",C.text);if(e.dataset.tone=C.tone,e.setAttribute("role",C.tone==="error"?"alert":"status"),C.actions?.length){let t=l("div","sk-notice-actions");for(let o of C.actions)t.append(F(o.label,o.onClick,o.primary));e.append(t)}de.append(e);return}if(ut){let e=l("div","sk-notice",ut);e.dataset.tone="error",e.setAttribute("role","alert"),de.append(e);return}if(be&&!T){let e=l("div","sk-notice",n("Reading skills\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),de.append(e)}},li=()=>{if(!T){Zo.textContent=n(be?"Reading skills\u2026":"Skills not read yet."),er.textContent=n("After disabling an entry document, OpenCode no longer discovers that skill.");return}Zo.textContent=n("Model sees {advertised} of {total} \xB7 about {tokens} tokens/step",{advertised:T.summary.advertised,total:T.summary.total,tokens:T.summary.estimatedTokens.toLocaleString("en")});let e=[n("Disabled: {count}",{count:T.summary.disabled})],t=T.skills.filter(o=>o.scope==="project").length;if(We&&e.push(n("Project skills: {count}",{count:t})),T.summary.blockingConflicts>0?e.push(n("Blocking conflicts: {count}",{count:T.summary.blockingConflicts})):e.push(n("No blocking conflicts")),T.summary.warnings>0&&e.push(n("Warnings: {count}",{count:T.summary.warnings})),T.roots.some(o=>o.error)&&e.push(n("A skill directory cannot be read")),T.scannedAt>0){let o=new Date(T.scannedAt);Number.isNaN(o.getTime())||e.push(n("Scanned {time}",{time:o.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})}))}er.textContent=n("{parts}. Estimates exclude built-in skills.",{parts:e.join(" \xB7 ")})},qe=e=>e.skillIds.map(t=>Pe(t)?.key).filter(t=>!!t),os=e=>{let t=qe(e).map(i=>Pe(i)).filter(i=>!!i);if(t.length===0)return n("No skills");if(t.some(i=>i.state==="conflict"))return n("Has conflicts");let o=t.filter(i=>i.state==="enabled").length;return o===t.length?n("All on"):n(o===0?"All off":"Partial")},Pn=e=>{Array.from(dt.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},di=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,pi=()=>{if(Dt.replaceChildren(),Ae){let e=l("div","sk-notice",n("Cannot read group configuration: {error}",{error:Ae}));e.dataset.tone="error",e.setAttribute("role","alert");let t=l("div","sk-notice-actions");t.append(F(n("Reload"),()=>void Xt(),!1,Le)),e.append(t),Dt.append(e);return}Le||D.length>0||!T||He()||Dt.append(l("div","sk-notice",n('No groups yet. Click "Edit groups" to create one, or import example groups in the editor.')))},or=e=>{x={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},Et="",ae=null,Ge=!1,De=!1,k();let t=st.querySelector(".sk-group-name");t?.focus(),t?.select()},ui=()=>{if(Ae||Le||!T||He())return;let e=D.find(t=>t.id===W)??D[0]??null;or(e),st.scrollIntoView({block:"nearest"})},ur=()=>{_||(x=null,Et="",ae=null,Ge=!1,De=!1,k(),Ne.focus())},Ei=e=>{if(e==="new"){or(null);return}let t=D.find(o=>o.id===e);t&&or(t)},qo=()=>{st.querySelector(".sk-group-name")?.focus()},Gn=async()=>{let e=x;if(!e||_||Ae)return;let t=e.name.trim();if(!t){ae=n("Enter a group name."),k(),qo();return}if(t.length>40){ae=n("Group names cannot exceed {count} characters.",{count:40}),k(),qo();return}if(D.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){ae=n('A group named "{name}" already exists.',{name:t}),k(),qo();return}if(e.members.length===0){ae=n("A group needs at least one member."),k();return}let o=e.id??di(),i={id:o,name:t,skillIds:[...e.members]},s=e.id?D.map(c=>c.id===e.id?i:c):[...D,i];_="groups",ae=null,k();try{D=$t(await _t("POST","/groups",{version:1,groups:s})),Ae=null,W=o,oe=null;let c=D.find(d=>d.id===o)??null;x=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,C={text:n('Group "{name}" saved.',{name:t}),tone:"success"},xe.toast({kind:"success",message:n('Group "{name}" saved.',{name:t})}).catch(()=>{})}catch(c){ae=Oe(c)}finally{_=null,k()}},fi=()=>{!x?.id||_||(Ge=!0,De=!1,k())},_i=async()=>{if(!x?.id||_)return;let e=x.id,t=D.filter(o=>o.id!==e);_="groups",Ge=!1,ae=null,k();try{D=$t(await _t("POST","/groups",{version:1,groups:t})),Ae=null,oe?.id===e&&(oe=null),W===e&&(W=null);let o=D.find(i=>i.id===W)??D[0]??null;W=o?.id??null,x=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,C={text:n("Group deleted."),tone:"success"}}catch(o){ae=Oe(o)}finally{_=null,k()}},Si=()=>{if(!(_||Le||Ae)){if(Pt(D).added.length===0){C={text:n("Every example group name or ID already exists; nothing to import."),tone:"info"},k();return}De=!0,Ge=!1,k()}},mi=async()=>{if(_)return;let{groups:e,added:t}=Pt(D);if(De=!1,t.length===0){C={text:n("Every example group name or ID already exists; nothing to import."),tone:"info"},k();return}_="groups",ae=null,k();try{D=$t(await _t("POST","/groups",{version:1,groups:e})),Ae=null,C={text:n("Example groups imported: {count}.",{count:t.length}),tone:"success"}}catch(o){ae=Oe(o)}finally{_=null,k()}},Ti=()=>{if(st.replaceChildren(),!x)return;let e=x,t=l("section","sk-group-editor");t.setAttribute("aria-label",n("Edit groups"));let o=l("div","sk-section-head");o.append(l("h2","sk-section-title",n("Edit groups")),F(n("Close"),ur,!1,!!_)),t.append(o);let i=l("label","sk-field");i.append(l("span","sk-field-label",n("Choose a group")));let s=l("select","sk-input");s.setAttribute("aria-label",n("Choose a group"));let c=l("option","",n("New group"));c.value="new",s.append(c);for(let R of D){let N=l("option","",`${R.name} (${R.skillIds.length})`);N.value=R.id,s.append(N)}s.value=e.id??"new",s.disabled=!!_,s.addEventListener("change",()=>Ei(s.value)),i.append(s);let d=l("label","sk-field");d.append(l("span","sk-field-label",n("Name")));let p=l("input","sk-input sk-group-name");p.type="text",p.value=e.name,p.maxLength=40,p.placeholder=n("e.g. Daily development"),p.autocomplete="off",p.spellcheck=!1,p.disabled=!!_,p.addEventListener("input",()=>{x&&(x.name=p.value,ae=null)}),p.addEventListener("keydown",R=>{R.key==="Enter"&&(R.preventDefault(),!(R.isComposing||R.keyCode===229)&&Gn())}),d.append(p),t.append(i,d);let S=l("fieldset","sk-members"),A=l("legend","",n("Members ({count})",{count:e.members.length}));S.append(A);let g=l("div","sk-members-tools"),U=l("input","sk-member-filter");U.type="search",U.value=Et,U.placeholder=n("Filter member name or ID"),U.setAttribute("aria-label",n("Filter member name or ID")),U.disabled=!!_,g.append(U,F(n("Select all"),()=>{if(!x)return;let R=T?.skills.map(v=>v.id)??[],N=x.members.filter(v=>!R.includes(v));x.members=[...R,...N],k()},!1,!!_),F(n("Clear"),()=>{x&&(x.members=[],k())},!1,!!_)),S.append(g);let G=l("div","sk-member-list"),H=l("div","sk-order-box"),J=R=>{x&&(A.textContent=n("Members ({count})",{count:x.members.length}),se(),Se(R))},se=()=>{if(G.replaceChildren(),!x)return;let N=(T?.skills??[]).filter(v=>$o(v,Et));if(N.length===0){G.append(l("p","sk-member-empty",n("No matching members")));return}for(let v of N){let B=l("label","sk-check"),Q=l("input");Q.type="checkbox",Q.checked=x.members.includes(v.key),Q.disabled=!!_,Q.addEventListener("change",()=>{x&&(Q.checked?x.members.includes(v.key)||x.members.push(v.key):x.members=x.members.filter(pe=>pe!==v.key),ae=null,A.textContent=n("Members ({count})",{count:x.members.length}),Se())});let Y=l("span","sk-check-copy");Y.append(l("span","sk-check-name",v.name),l("code","sk-check-id",v.id)),B.append(Q,Y),G.append(B)}},Se=R=>{if(H.replaceChildren(),!x||x.members.length===0)return;H.append(l("p","sk-order-title",n("Step order ({count})",{count:x.members.length})));let N=l("ol","sk-order-list");for(let[v,B]of x.members.entries()){let Q=Pe(B)??null,Y=Q?Q.name:B,pe=l("li","sk-order-item"),re=l("span","sk-order-label");re.append(l("span","sk-step",String(v+1)),l("span","sk-order-name",Y));let E=l("span","sk-order-actions"),f=l("button","sk-order-btn","\u2191");f.type="button",f.disabled=!!_||v===0,f.dataset.orderFocus=`up:${B}`,f.title=n('Move "{name}" up',{name:Y}),f.setAttribute("aria-label",n('Move "{name}" up',{name:Y})),f.addEventListener("click",()=>{x&&(x.members=Vo(x.members,v,-1),J(`up:${B}`))});let ne=l("button","sk-order-btn","\u2193");ne.type="button",ne.disabled=!!_||v===x.members.length-1,ne.dataset.orderFocus=`down:${B}`,ne.title=n('Move "{name}" down',{name:Y}),ne.setAttribute("aria-label",n('Move "{name}" down',{name:Y})),ne.addEventListener("click",()=>{x&&(x.members=Vo(x.members,v,1),J(`down:${B}`))});let he=l("button","sk-order-btn","\xD7");he.type="button",he.disabled=!!_,he.title=n('Remove "{name}"',{name:Y}),he.setAttribute("aria-label",n('Remove "{name}"',{name:Y})),he.addEventListener("click",()=>{x&&(x.members=x.members.filter(Fe=>Fe!==B),J())}),E.append(f,ne,he),pe.append(re,E),N.append(pe)}H.append(N),R&&Array.from(H.querySelectorAll("[data-order-focus]")).find(B=>B.dataset.orderFocus===R&&!B.disabled)?.focus()};U.addEventListener("input",()=>{Et=U.value,se()}),se(),Se(),S.append(G,H);let y=new Set(T?.skills.flatMap(R=>[R.id,R.key])??[]),te=e.members.filter(R=>!y.has(R));if(te.length>0){let R=l("div","sk-missing");R.append(l("span","sk-missing-label",n("Missing from the directory:")));for(let N of te){let v=l("button","sk-missing-chip",`${N} \xD7`);v.type="button",v.disabled=!!_,v.title=n("Remove this missing member from the group"),v.addEventListener("click",()=>{x&&(x.members=x.members.filter(B=>B!==N),k())}),R.append(v)}S.append(R)}if(t.append(S),ae){let R=l("p","sk-editor-error",ae);R.setAttribute("role","alert"),t.append(R)}let le=l("div","sk-editor-actions");if(e.id&&le.append(F(n("Delete group"),fi,!1,!!_)),le.append(F(n("Import example groups"),Si,!1,!!_),F(e.id?n("Save changes"):n("New group"),()=>void Gn(),!0,!!_)),t.append(le),Ge){let R=l("div","sk-editor-confirm");R.dataset.tone="warning",R.append(l("p","",n('Delete group "{name}"? The skills themselves are not deleted.',{name:e.name.trim()||n("Unnamed")})));let N=l("div","sk-actions");N.append(F(n("Confirm delete"),()=>void _i(),!0,!!_),F(n("Cancel"),()=>{Ge=!1,k()},!1,!!_)),R.append(N),t.append(R)}if(De){let R=Pt(D).added.length,N=l("div","sk-editor-confirm");N.dataset.tone="warning",N.append(l("p","",n("Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.",{count:R})));let v=l("div","sk-actions");v.append(F(n("Confirm import"),()=>void mi(),!0,!!_),F(n("Cancel"),()=>{De=!1,k()},!1,!!_)),N.append(v),t.append(N)}t.append(l("p","sk-editor-hint",n("Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json."))),st.append(t)},gi=()=>{dt.replaceChildren();let e=T?.skills.length??0,t=l("button","sk-chip",n("All {count}",{count:e}));t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",W===null?"true":"false"),t.addEventListener("click",()=>{W=null,k(),Pn("all")}),dt.append(t);for(let o of D){let i=qe(o).length,s=l("button","sk-chip",`${o.name} ${i}`);s.type="button",s.dataset.group=o.id,s.setAttribute("aria-pressed",W===o.id?"true":"false"),s.addEventListener("click",()=>{W=o.id,k(),Pn(o.id)}),dt.append(s)}Ne.textContent=n(x?"Close editor":"Edit groups"),Ne.setAttribute("aria-pressed",x?"true":"false"),Ne.disabled=Le||!!Ae||!!_||!T||He(),Ne.title=Le?n("Reading groups\u2026"):Ae?n("Cannot read the group configuration. Repair the file and reload."):T?He()?n("Skill directory cannot be read"):"":n("Skills not read yet"),ri.update({value:W??"all",options:[{id:"all",label:n("All {count}",{count:e})},...D.map(o=>({id:o.id,label:`${o.name} ${qe(o).length}`,hint:os(o)}))]})},hi=()=>{if(tr.replaceChildren(),!T||!W)return;let e=D.find(g=>g.id===W);if(!e)return;let t=qe(e),o=e.skillIds.filter(g=>!Pe(g)),s=t.map(g=>Pe(g)).filter(g=>!!g).some(g=>g.state==="conflict"),c=He()||s||t.length===0,d=l("div","sk-groupbar"),p=l("div","sk-groupbar-text");p.append(l("strong","",e.name),l("span","sk-group-state",n("{state} \xB7 {count}",{count:t.length,state:os(e)}))),o.length>0&&p.append(l("p","sk-group-warning",n("Missing: {names}",{names:o.join(", ")})));let S=l("div","sk-groupbar-actions");S.append(F(n("Enable group"),()=>void Dn(e,!0),!1,c),F(n("Disable group"),()=>void Dn(e,!1),!1,c));let A=F(n("Enable only this group"),()=>ki(e),!1,c||o.length>0);o.length>0&&(A.title=n("The group has missing skills. Resolve them before enabling only this group.")),S.append(A),d.append(p,S),tr.append(d)},Dn=async(e,t)=>{if(!T||_)return;let o=qe(e);if(o.length!==0){_=`group:${e.id}:${t?"on":"off"}`,oe=null,ce=null,_e=!1,C=null,k();try{T=Je(await Ye("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),C={text:t?n('Skills enabled in "{name}": {count}.',{name:e.name,count:o.length}):n('Skills disabled in "{name}": {count}.',{name:e.name,count:o.length}),tone:"success"},xe.toast({kind:"success",message:t?n('Enabled "{name}"',{name:e.name}):n('Disabled "{name}"',{name:e.name})}).catch(()=>{})}catch(i){C={text:Oe(i),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()}},ki=e=>{if(!T||_)return;let t=qe(e),o=e.skillIds.filter(i=>!Pe(i));t.length===0||o.length>0||(oe=e,ce=null,_e=!1,C=null,k(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},bi=async()=>{if(!T||_||!oe)return;let e=oe;oe=null,_e=!1;let t=qe(e),o=e.skillIds.filter(c=>!Pe(c));if(t.length===0||o.length>0){C={text:n("The group has missing skills; nothing was run."),tone:"error"},k();return}let i=new Set(t),s=T.skills.filter(c=>!i.has(c.key)).map(c=>c.key);_=`group-only:${e.id}`,C=null,k();try{T=Je(await Ye("POST","/skills/batch",{enable:t,disable:s})),C={text:n('Enabled only "{name}"; other skills disabled: {count}.',{name:e.name,count:s.length}),tone:"success"},xe.toast({kind:"success",message:n('Enabled only "{name}"',{name:e.name})}).catch(()=>{})}catch(c){C={text:Oe(c),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()},rr=async(e,t)=>{try{await xe.writeClipboard(e),xe.toast({kind:"success",message:t}).catch(()=>{})}catch(o){C={text:Oe(o),tone:"error"},ts()}},xi=async()=>{let e=it().map(t=>t.key);e.length!==0&&await rr(e.join(`
`),n("Copied {count} visible qualified IDs.",{count:e.length}))},Ai=()=>{if(!T||_)return;let e=lt(it());if(e.enable.length+e.disable.length===0){C={text:n("No enabled or disabled skills match the current view."),tone:"info"},k();return}_e=!0,ce=null,oe=null,C=null,k(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus()},Oi=async()=>{if(!T||_||!_e)return;let e=lt(it()),t=e.enable.length+e.disable.length;if(_e=!1,t!==0){_="invert",C=null,k();try{T=Je(await Ye("POST","/skills/batch",e)),C={text:n("Inverted {count} visible skills.",{count:t}),tone:"success"},xe.toast({kind:"success",message:n("Inverted {count} visible skills.",{count:t})}).catch(()=>{})}catch(o){C={text:Oe(o),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()}},Jo=(e,t)=>{let o=l("span","sk-menu-slot"),i=t.activePaths[0]??t.disabledPaths[0]??null;Lt(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:n("Copy entry path"),disabled:!i},{id:"copy-id",label:n("Copy qualified skill ID")}],onSelect:c=>{c==="copy-path"&&i?rr(i,n("Copied entry path.")):c==="copy-id"&&rr(t.key,n("Copied qualified skill ID."))}});let s=o.querySelector(".oc-sdk-btn");s&&(s.setAttribute("aria-label",`${n("More actions")} ${t.name}`),s.title=n("More actions")),e.append(o)},Ri=e=>{let t=l("div","sk-skill-action"),o=l("span","sk-action-note"),i=l("div","sk-action-top"),s=He();if(e.state==="conflict"){o.textContent=n(s?"Directory cannot be read":"Resolve conflicts first");let p=l("button","sk-inline-button",n("Resolve conflict"));return p.type="button",p.disabled=!!_||s,p.addEventListener("click",()=>{ft.scrollIntoView({block:"nearest"}),ft.querySelector("button")?.focus()}),i.append(p),Jo(i,e),t.append(o,i),t}if(e.state==="mixed"){o.textContent=n(s?"Directory cannot be read":"Some entries disabled");let p=l("div","sk-mini-actions"),S=l("button","sk-inline-button",n("Enable all"));S.type="button",S.disabled=!!_||s,S.addEventListener("click",()=>void Yo(e,!0));let A=l("button","sk-inline-button",n("Disable all"));return A.type="button",A.disabled=!!_||s,A.addEventListener("click",()=>void Yo(e,!1)),p.append(S,A),Jo(p,e),t.append(o,p),t}let c=e.state==="enabled",d=l("button","sk-switch");return d.type="button",d.setAttribute("role","switch"),d.setAttribute("aria-checked",c?"true":"false"),d.setAttribute("aria-label",`${n(c?"Disable":"Enable")} ${e.name}`),d.dataset.skillId=e.key,d.disabled=!!_||s,d.append(l("span","sk-thumb")),d.addEventListener("click",()=>{d.disabled||Yo(e,!c)}),c?o.textContent=s?n("Directory cannot be read"):e.advertised?n("Visible to the model"):n("Not visible to the model"):o.textContent=n(s?"Directory cannot be read":"Entry disabled"),i.append(d),Jo(i,e),t.append(o,i),t},yi=(e,t=0)=>{let o=l("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let i=l("div","sk-skill-main"),s=l("div","sk-skill-head");if(t>0){let g=l("span","sk-step",String(t));g.title=n("Step {step}",{step:t}),g.setAttribute("aria-label",n("Step {step}",{step:t})),s.append(g)}s.append(l("strong","sk-name",e.name),Vt(si(e),ni(e)),Vt(e.scope==="project"?n("Project"):n("Global"),e.scope==="project"?"info":"neutral"));let c=l("div","sk-meta");if(c.append(l("code","sk-id",e.id)),e.rootPath){let g=l("span","sk-source",e.sourceId==="opencode-global"?n("OpenCode"):e.sourceId==="opencode-project"?n("Project OpenCode"):e.sourceId.replace(/-/g," "));g.title=e.rootPath,c.append(g)}e.estimatedTokens>0&&c.append(l("span","sk-token",n("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString("en")})));let d=e.description,p=d||n("No description; the model will not select it automatically."),S=l("p","sk-desc",p),A=Gt.has(e.key);if(A&&S.classList.add("is-expanded"),i.append(s,c,S),d.length>88||d.includes(`
`)){let g=l("button","sk-desc-toggle",n(A?"Show less":"Show more"));g.type="button",g.setAttribute("aria-expanded",A?"true":"false"),g.addEventListener("click",()=>{let U=!Gt.has(e.key);U?Gt.add(e.key):Gt.delete(e.key),S.classList.toggle("is-expanded",U),g.textContent=n(U?"Show less":"Show more"),g.setAttribute("aria-expanded",U?"true":"false")}),i.append(g)}if(e.warnings.length>0){let g=l("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));i.append(g)}return o.append(i,Ri(e)),o},vi=()=>{Kt="",zt="all",jt="all",pr="default",Zs.update({value:"",placeholder:n("Search name, description, or ID (press / to focus)")}),es(),ei.update({value:"all",options:Jn()}),ti.update({value:"all",options:Yn()}),oi.update({value:"default",options:Qn()}),at()},at=()=>{pt.replaceChildren();let e=T;if(!e)return;let t=W?D.find(s=>s.id===W):null,o=t?t.skillIds.map(s=>Pe(s)).filter(s=>!!s):e.skills,i=it();if(i.length===0){let s=Kt.trim().length>0||zt!=="all"||jt!=="all",c=l("div","sk-empty");if(c.append(l("h2","",e.skills.length===0?n("No skills found"):t&&o.length===0?n("This group has no available skills"):n("No matching skills")),l("p","",e.skills.length===0?n("Check that a skill directory such as {path} exists, or rescan.",{path:e.roots[0]?.path??n("the skills directory")}):t&&o.length===0?n("Check whether the skills in this group were removed."):n("Try another search term or change the status filter."))),e.skills.length>0&&s){let d=l("div","sk-empty-actions");d.append(F(n("Reset filters"),vi)),c.append(d)}pt.append(c);return}for(let s of i){let c=t?t.skillIds.indexOf(s.key):-1,d=t&&t.skillIds.length>1?(c>=0?c:t.skillIds.indexOf(s.id))+1:0;pt.append(yi(s,d))}},Ii=()=>{let e=T?T.roots.some(t=>t.error)?1:T.summary.blockingConflicts>0?T.summary.blockingConflicts:null:null;e!==Un&&(Un=e,xe.setBadge(e).catch(()=>{}))},k=()=>{Ft.setAttribute("aria-busy",be?"true":"false"),Ii(),li(),ts(),pi(),gi(),Ti(),hi(),ai(),ci(),at(),js.update({label:n(be?"Reading\u2026":"Rescan"),loading:be,disabled:be||!!_});let e=He();Ws.update({disabled:be||!!_||!T||e}),qs.update({disabled:be||!!_||!T||e});let t=it(),o=lt(t);Js.update({items:[{id:"invert",label:n("Invert visible skills"),disabled:be||!!_||!T||o.enable.length+o.disable.length===0},{id:"copy-ids",label:n("Copy visible IDs"),disabled:!T||t.length===0}]})},wi=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},Ve=async(e=!1,t=!1)=>{if(!be){be=!0,t||(ut=null),e&&k();try{T=Je(await Ye("GET","/skills")),ut=null}catch(o){t||(ut=Oe(o))}finally{be=!1,k()}}},Xt=async(e=!1)=>{if(!(Le&&!e||x)){Le=!0,k();try{D=$t(await _t("GET","/groups")),Ae=null,W&&!D.some(t=>t.id===W)&&(W=null)}catch(t){Ae=Ks(t)}finally{Le=!1,k()}}},Yo=async(e,t)=>{if(!_){_=`toggle:${e.id}`,ce=null,oe=null,_e=!1,C=null,k();try{T=Je(await Ye("POST","/skills/toggle",{id:e.key,enabled:t})),C={text:t?n("Enabled {name}.",{name:e.name}):n("Disabled {name}; OpenCode will no longer discover it after the next scan.",{name:e.name}),tone:"success"},xe.toast({kind:"success",message:t?n("Enabled {name}",{name:e.name}):n("Disabled {name}",{name:e.name})}).catch(()=>{})}catch(o){C={text:Oe(o),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k(),wi(e.id)}},Hn=async(e,t)=>{if(_)return;let o=e.activePath??e.disabledPath;if(o){_=`resolve:${o}`,ce=null,oe=null,_e=!1,C=null,k();try{let i=await Ye("POST","/skills/resolve",{path:o,keep:t}),s=i&&typeof i=="object"&&typeof i.backupPath=="string"?i.backupPath:null;T=Je(i),C={text:t==="enabled"?n("Kept the enabled entry{suffix}.",{suffix:s?n("; the old disabled file was backed up to {path}",{path:s}):""}):n("Kept the disabled entry{suffix}.",{suffix:s?n("; the old disabled file was backed up to {path}",{path:s}):""}),tone:"success"},xe.toast({kind:"success",message:n("Entry conflict resolved")}).catch(()=>{})}catch(i){C={text:Oe(i),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()}},rs=e=>{!T||_||(ce=e,oe=null,_e=!1,C=null,k(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},Ci=async()=>{if(ce===null||_)return;let e=ce;ce=null,oe=null,_e=!1,_="bulk",C=null,k();try{let t=await Ye("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(i=>typeof i=="string"):[];T=Je(t),C={text:e?n("Skills enabled: {count}.",{count:o.length}):n("Skills disabled: {count}.",{count:o.length}),tone:"success"},xe.toast({kind:"success",message:e?n("Skills enabled: {count}.",{count:o.length}):n("Skills disabled: {count}.",{count:o.length})}).catch(()=>{})}catch(t){C={text:Oe(t),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()};xe.onReady(e=>{Io(e,document.documentElement),document.documentElement.lang="en",document.title=n("Skills Manager");let t=typeof e.directory=="string"&&e.directory?e.directory:null;if(Nn){t!==We?(We=t,W=null,Ve(!0),Xt()):k();return}Nn=!0,We=t,Ve(!0),Xt(!0)});document.title=n("Skills Manager");k();})();
