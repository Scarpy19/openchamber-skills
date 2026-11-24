"use strict";(()=>{var I="openchamber.sdk";var gt="data-oc-scrolling",Zt=`
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
`;function eo(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var cs=`(${eo.toString()})(document);`;var Rr=e=>{let t=[],o=0,i=0;return{push:s=>{for(t.push(s),i+=s.length;i-o>e&&t.length>1;){let c=t.shift();i-=c?.length??0,o=0}},pull:s=>{let c=0;for(;c<s.length&&t.length>0;){let d=t[0],p=Math.min(s.length-c,d.length-o);s.set(d.subarray(o,o+p),c),c+=p,o+=p,o>=d.length&&(t.shift(),i-=d.length,o=0)}s.fill(0,c)},clear:()=>{t.length=0,o=0,i=0},get size(){return i-o}}};var wr=/^[a-z][a-z0-9-]{0,39}$/;var yr=e=>Object(e)===e&&!Array.isArray(e),to=(e,t)=>Object.keys(e).every(o=>t.includes(o)),vr=e=>String(e)===e&&e.length>=1&&e.length<=60,Ir=e=>String(e)===e&&e.length>=1&&e.length<=80,Cr=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!yr(o)||!wr.test(o.id)||!vr(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!to(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!to(o,["kind","id","label","value","options","disabled"])||!Ir(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let s of o.options){if(!yr(s)||!to(s,["value","label"])||!Ir(s.value)||!vr(s.label)||i.has(s.value))return!1;i.add(s.value)}if(!i.has(o.value))return!1}return!0};var ds=1024*1024;var Mr=["{id}","{segment}","{segments+}"];var Bi=new Set(Mr);var Ur=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var zi=new Set(Ur);var oo=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Nr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Lr=/^[A-Za-z0-9_-]{1,80}$/;var Pr=["left","right","top","bottom"];var Gr=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of i)if(!Gr(s,t+1,o))return!1;return!0},ro=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(ro);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(ro)}return String(e)===e||Number.isFinite(e)},no=e=>{try{return String(e.id)!==e.id||!Lr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Pr.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Gr(e.data)||!ro(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var io=2e3;var Hr=["file","directory","other","missing"],ao=e=>!!(e&&"sessionId"in e),co=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Vr=/^[0-9a-f]{7,64}$/i,lo=e=>Vr.test(e),ht=500,kt=32e3,Xr=16e3,$r=128,Fr=200,Br=2e3,Kr=16e3,zr=80,jr=200,Wr=16e3;var qr=2e3;var po=2e4,bt=1024,xt=2e6;var At=64e3,Ot=8e3,uo=4e3;var Eo=96e4,ps=60*6e4;var Jr=999,Yr=1e4,ct=500,Qr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Zr=["stopped","starting","ready","failed"],us=new Set(Qr),en=e=>us.has(e),tn=e=>e&&en(e)?e:"HOST_REJECTED",Qe=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Qe):Object(e)===e?Object.values(e).every(Qe):!1,on=e=>Qe(e)&&JSON.stringify(e).length<=Wr,Dr=e=>e?.trim().slice(0,jr)??"",Ze=e=>{let t=e.id.trim().slice(0,$r),o=e.title.trim().slice(0,Fr),i=e.url.trim().slice(0,Br),s=e.text?.trim().slice(0,Kr),c=e.author?.trim().slice(0,zr),d=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:o||t,url:i,kind:d};if(s&&(p.text=s),c&&(p.author=c),d==="pull"){let T=Dr(e.branches?.head),A=Dr(e.branches?.base);T&&A&&(p.branches={head:T,base:A})}return on(e.data)&&(p.data=e.data),p},fo=e=>{let t=Ze(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},_o=e=>{let t={text:e.text.trim().slice(0,Xr)};return e.send&&(t.send=!0),t},So=e=>e===null||!Number.isFinite(e)?null:Math.min(Jr,Math.max(0,Math.round(e))),mo=e=>Number.isFinite(e)?Math.min(Yr,Math.max(0,Math.ceil(e))):0;var et=e=>e.length>0&&e.length<=bt&&!e.includes("\0")&&!e.includes("\\");var Rt=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>qr?!1:!e.split("/").some(o=>o==="."||o===".."),Es=new Set(Zr),To=e=>!!(e&&"status"in e&&Es.has(String(e.status))&&!("body"in e)),yt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),go=e=>!!(e&&"content"in e&&String(e.content)===e.content),ho=e=>!!(e&&"written"in e&&e.written===!0),ko=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),fs=new Set(Hr),bo=e=>!!(e&&"kind"in e&&"size"in e&&fs.has(String(e.kind))&&Number.isFinite(e.size)),xo=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),_s=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),Ss=e=>Object(e)===e?e:null,so=e=>String(e)===e&&e.length>0,ms=e=>{if(!so(e.id))return null;if(e.ok===!0){let t={channel:I,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&so(e.error)?{channel:I,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:tn(so(e.code)?e.code:void 0)}:null},Ao=e=>{let t=Ss(e);return!t||t.channel!==I||t.v!==1?null:t.type==="result"?ms(t):!_s.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var rn=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Ts=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",b=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},nn=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),vt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${bt} characters without NUL or backslash.`)),It=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},O=e=>(e.value+=1,`oc-${e.value}`),Io=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(r=>r===t.parent),i=e.requestTimeoutMs??po,s=new Set,c=new Set,d=new Set,p=new Set,T=new Set,A=new Set,S=new Set,U=new Set,G=new Set,H=new Set,J=new Set,ie=new Set,Se=[],y=null,oe=null,le=new Set,R=new Set,N=null,v=null,B=!1,Q=new Map,Y=new Map,ue=new Map,re=!1,E={value:0},f=null,ne=null,ke=!1,Fe=!1,fr=null,me=null,_r=r=>r?{sessionId:r.id,phase:r.busy?"started":"completed"}:null,Ee=r=>{t.parent.postMessage(r,"*")},Sr=()=>{re||t.parent===t||ie.size===0||f?.features?.lateGenerateResults!==!0||Ee({channel:I,v:1,type:"generate-late-listen"})},V=(r,a)=>{for(let h of r)try{h(a)}catch(g){console.error(g)}},mr=r=>{if(!(r instanceof MessageEvent)||!o(r.source))return;let a=Ao(r.data);if(!a)return;if(a.type==="workspace"){let g=Y.get(a.payload.subscriptionId);g&&V([g],a.payload.snapshot);return}if(a.type==="shells"){let g=ue.get(a.payload.subscriptionId);g&&V([g],a.payload.snapshot);return}if(a.type==="microphone-audio"){me?.queue.push(a.payload.samples);return}if(a.type==="microphone-ended"){let g=me;if(!g)return;me=null,g.release(),V(g.endedListeners,a.payload.reason);return}if(a.type==="ready"){f=a.payload,ne=_r(a.payload.session),V(s,a.payload),V(c,a.payload.directory),V(d,a.payload.session),ne&&V(p,ne),V(T,a.payload.connection),V(A,a.payload.settings),V(S,a.payload.item),a.payload.block&&V(U,a.payload.block),Sr();return}if(a.type==="service-event"){V(G,a.payload);return}if(a.type==="generate-late"){ie.size===0?Se.push(a.payload):V(ie,a.payload);return}if(a.type==="directory"){f&&(f={...f,directory:a.payload.directory}),V(c,a.payload.directory);return}if(a.type==="session"){f&&(f={...f,session:a.payload.session}),a.payload.session?ne?.sessionId!==a.payload.session.id&&(ne=_r(a.payload.session)):ne=null,V(d,a.payload.session);return}if(a.type==="session-lifecycle"){ne=a.payload,V(p,a.payload);return}if(a.type==="connection"){f&&(f={...f,connection:a.payload.connection}),V(T,a.payload.connection);return}if(a.type==="settings"){f&&(f={...f,settings:a.payload.settings}),V(A,a.payload.settings);return}if(a.type==="item"){f&&(f={...f,item:a.payload.item}),V(S,a.payload.item);return}if(a.type==="status-control-event"){V(H,a.payload);return}if(a.type==="popover-closed"){V(J,a.payload);return}if(a.type==="action"){let g=P=>{re||Ee({channel:I,v:1,type:"action-result",id:a.id,payload:P})},L=oe;if(!L){g({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>L(a.payload)).then(()=>g({ok:!0}),P=>{let X=(P instanceof Error?P.message:String(P)).trim();g({ok:!1,error:(X||"Action failed.").slice(0,ct)})});return}if(a.type==="file-open"){let g=a.payload;if(v&&Nr(v,g))return;v=g,V(le,a.payload);return}if(a.type==="file-saved"){V(R,a.payload.version);return}if(a.type==="file-snapshot"){let g=X=>{re||Ee({channel:I,v:1,type:"file-snapshot-result",id:a.id,payload:X})},L=X=>g({error:(X.trim()||"Could not read the edited file.").slice(0,ct)}),P=N;if(!P){L("This extension does not edit files.");return}Promise.resolve().then(()=>P(a.payload.purpose)).then(X=>{if(oo(X)>2e7){L(`The file is over ${2e7} ${"bytes"in X?"bytes":"characters"}.`);return}if(X.version.length>256){L(`The snapshot version is over ${256} characters.`);return}g({snapshot:"bytes"in X?{bytes:X.bytes,version:X.version}:{content:X.content,version:X.version}})},X=>L(X instanceof Error?X.message:String(X)));return}if(a.type==="resolve"){let g=P=>{Ee({channel:I,v:1,type:"resolve-result",id:a.id,payload:P})},L=y;if(!L){g({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>L(a.payload)).then(P=>g({item:P?Ze(P):null}),P=>{let X=(P instanceof Error?P.message:String(P)).trim();g({error:(X||"Command failed.").slice(0,ct)})});return}let h=Q.get(a.id);if(h){if(clearTimeout(h.timer),Q.delete(a.id),a.ok){h.resolve(a.payload);return}h.reject(new b(a.code,a.error))}};t.addEventListener("message",mr),Ee({channel:I,v:1,type:"hello"});let ae=(r,a=i)=>re||t.parent===t?Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((h,g)=>{let L=setTimeout(()=>{Q.delete(r.id),g(new b("HOST_TIMEOUT","Host did not answer in time."))},a);Q.set(r.id,{resolve:h,reject:g,timer:L}),Ee(r)}),q=r=>ae(r).then(()=>{}),K={channel:I,v:1},qt=r=>{!re&&t.parent!==t&&Ee(r)},Tr=()=>qt({...K,type:"file-save"}),Jt=()=>{!re&&t.parent!==t&&Ee({...K,type:"microphone-close",id:O(E)})},is=async()=>{if(me)throw new b("HOST_REJECTED","The microphone is already open in this frame.");if(f?.features?.microphone!==!0)throw new b("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let r=globalThis.AudioContext;if(typeof r!="function")throw new b("UNSUPPORTED","This frame has no Web Audio.");let a=new r;if(a.sampleRate<8e3||a.sampleRate>192e3)throw a.close().catch(()=>{}),new b("UNSUPPORTED",`Audio at ${a.sampleRate} Hz is not supported.`);let h=a.state==="suspended"?a.resume().catch(()=>{}):void 0,g=Rr(Math.round(a.sampleRate/4)),L=a.createScriptProcessor(1024,1,1);L.onaudioprocess=be=>g.pull(be.outputBuffer.getChannelData(0));let P=a.createMediaStreamDestination();L.connect(P);let X=new Set,Ye={queue:g,endedListeners:X,release:()=>{L.onaudioprocess=null,L.disconnect(),g.clear();for(let be of P.stream.getTracks())be.stop();a.close().catch(()=>{})}};me=Ye;try{let be=await ae({...K,type:"microphone-open",id:O(E),payload:{sampleRate:a.sampleRate}},12e4);if(!be||!("opened"in be)||be.opened!==!0)throw new b("HOST_REJECTED","Host did not open the microphone.");if(await h,me!==Ye)throw new b("DISCONNECTED","The microphone closed while it was opening.")}catch(be){throw me===Ye&&(me=null),Ye.release(),Jt(),be}return{stream:P.stream,close:()=>{me===Ye&&(me=null,Ye.release(),Jt())},onEnded:be=>(X.add(be),()=>{X.delete(be)})}},gr=r=>{!rn(r)||!Ts(r)||(r.preventDefault(),Tr())},hr=r=>{!rn(r)||r.key!=="Escape"||f?.surface!=="popover"||!f.popover||(r.preventDefault(),Ar(f.popover.id,"escape").catch(()=>{}))},St=()=>{let r=f?.surface==="popover"?f.popover:void 0;if(!r)return;let a=ke||Fe;fr!==a&&(fr=a,Or(r.id,a).catch(()=>{}))},mt=()=>{f?.surface!=="popover"||ke||(ke=!0,St())},kr=r=>{f?.surface!=="popover"||r.relatedTarget!==null||!ke||(ke=!1,St())},br=()=>{f?.surface!=="popover"||Fe||(Fe=!0,St())},xr=()=>{f?.surface!=="popover"||!Fe||(Fe=!1,St())},Oe=(r,a=1024)=>{if(!r.trim()||r.length>a)throw new b("HOST_REJECTED",`Identity must contain 1 to ${a} characters.`)},Yt=async r=>{r.kind!=="projects"&&Oe(r.projectId);let a=await ae({...K,type:"workspace-read",id:O(E),payload:r});if(!a||!("kind"in a)||!("state"in a)||a.kind!==r.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return a},Qt=async(r,a)=>{r.kind!=="projects"&&Oe(r.projectId);let h=O(E);Y.set(h,a);try{await q({...K,type:"workspace-subscribe",id:O(E),payload:{subscriptionId:h,query:r}})}catch(g){throw Y.delete(h),re||Ee({...K,type:"workspace-unsubscribe",id:O(E),payload:{subscriptionId:h}}),g}return()=>{!Y.delete(h)||re||Ee({...K,type:"workspace-unsubscribe",id:O(E),payload:{subscriptionId:h}})}},as=async(r,a)=>{r.kind==="session"&&Oe(r.sessionId),r.kind==="project"&&Oe(r.projectId);let h=O(E);ue.set(h,a);try{await q({...K,type:"shells-subscribe",id:O(E),payload:{subscriptionId:h,scope:r}})}catch(g){throw ue.delete(h),re||Ee({...K,type:"shells-unsubscribe",id:O(E),payload:{subscriptionId:h}}),g}return()=>{!ue.delete(h)||re||Ee({...K,type:"shells-unsubscribe",id:O(E),payload:{subscriptionId:h}})}},Tt=async r=>{if("key"in r&&(r.key.length===0||r.key.length>128))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Qe(r.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>65536)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&f?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let a=await ae({...K,type:"storage",id:O(E),payload:r});if(!a||!("storage"in a)||a.op!==r.op)throw new b("HOST_REJECTED","Host did not return storage data.");return a},Ar=(r,a)=>f?.features?.popovers!==!0&&!(f?.surface==="popover"&&f.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):q({...K,type:"popover-close",id:O(E),payload:a?{id:r,reason:a}:{id:r}}),Or=(r,a)=>f?.features?.popovers!==!0&&!(f?.surface==="popover"&&f.popover?.id===r)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):q({...K,type:"popover-anchor",id:O(E),payload:{id:r,active:a}});return t.addEventListener("keydown",hr,!0),t.addEventListener("pointerover",mt),t.addEventListener("pointermove",mt),t.addEventListener("pointerout",kr),t.addEventListener("focus",br),t.addEventListener("blur",xr),{onAction:r=>(oe=r,()=>{oe===r&&(oe=null)}),listProjects:async()=>{let r=await Yt({kind:"projects"});if(r.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return r},listWorktrees:async r=>{let a=await Yt({kind:"worktrees",projectId:r});if(a.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return a},listSessions:async r=>{let a=await Yt({kind:"sessions",projectId:r});if(a.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return a},onProjects:r=>Qt({kind:"projects"},a=>{a.kind==="projects"&&r(a)}),onWorktrees:(r,a)=>Qt({kind:"worktrees",projectId:r},h=>{h.kind==="worktrees"&&a(h)}),onSessions:(r,a)=>Qt({kind:"sessions",projectId:r},h=>{h.kind==="sessions"&&a(h)}),onRunningShells:(r,a)=>as(r,a),readShellOutput:async(r,a)=>{Oe(r,128);let h=a?.cursor;if(h!==void 0&&(!Number.isInteger(h)||h<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let g=a?.tailBytes;if(g!==void 0&&(!Number.isInteger(g)||g<1||g>65536))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let P=await ae({...K,type:"shell-output",id:O(E),payload:{shellId:r,cursor:h,tailBytes:g}});if(!P||typeof P.output!="string"||!Number.isFinite(P.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return P},stopShell:async r=>{if(Oe(r,128),(await ae({...K,type:"shell-stop",id:O(E),payload:{shellId:r}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async r=>{Oe(r),await q({...K,type:"open-session",id:O(E),payload:{sessionId:r}})},storage:{get:async(r,a)=>{let h=It(a),g={op:"get",key:r};h&&(g.scope=h);let L=await Tt(g);return L.op==="get"&&L.found?L.value:void 0},set:async(r,a,h)=>{let g=It(h),L={op:"set",key:r,value:a};g&&(L.scope=g),await Tt(L)},delete:async(r,a)=>{let h=It(a),g={op:"delete",key:r};h&&(g.scope=h),await Tt(g)},keys:async r=>{let a=It(r),h={op:"keys"};a&&(h.scope=a);let g=await Tt(h);if(g.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return g.keys}},onReady:r=>(s.add(r),f&&r(f),()=>{s.delete(r)}),onDirectory:r=>(c.add(r),f&&r(f.directory),()=>{c.delete(r)}),onSession:r=>(d.add(r),f&&r(f.session),()=>{d.delete(r)}),onSessionLifecycle:r=>(p.add(r),ne&&r(ne),()=>{p.delete(r)}),onConnection:r=>(T.add(r),f&&r(f.connection),()=>{T.delete(r)}),onSettings:r=>(A.add(r),f&&r(f.settings),()=>{A.delete(r)}),onItem:r=>(S.add(r),f&&r(f.item),()=>{S.delete(r)}),onBlock:r=>(U.add(r),f?.block&&r(f.block),()=>{U.delete(r)}),onServiceEvent:r=>(G.add(r),()=>{G.delete(r)}),onStatusControl:r=>(H.add(r),()=>{H.delete(r)}),onPopoverClosed:r=>(J.add(r),()=>{J.delete(r)}),setStatusControls:r=>f?.features?.statusControls!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support status controls.")):Cr(r)?q({...K,type:"status-controls",id:O(E),payload:{controls:r}}):Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:r=>f?.features?.popovers!==!0?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):no(r)?q({...K,type:"popover-open",id:O(E),payload:r}):Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Ar,setPopoverAnchorActive:Or,onResolve:r=>(y=r,()=>{y===r&&(y=null)}),toast:r=>{let a=r.message.trim();return!a||a.length>ht?Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${ht} characters.`)):r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>kt)?Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${kt} characters.`)):q({channel:I,v:1,type:"toast",id:O(E),payload:{...r,message:a}})},openUrl:r=>q({channel:I,v:1,type:"open-url",id:O(E),payload:{url:r}}),openCommit:r=>lo(r)?q({channel:I,v:1,type:"open-commit",id:O(E),payload:{sha:r}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:r=>q({channel:I,v:1,type:"block-answer",id:O(E),payload:{text:r.trim().slice(0,io)}}),openSurface:r=>q({channel:I,v:1,type:"open-surface",id:O(E),payload:{surfaceId:r}}),writeClipboard:r=>q({channel:I,v:1,type:"clipboard-write",id:O(E),payload:{text:r}}),compose:r=>q({channel:I,v:1,type:"compose",id:O(E),payload:r}),attach:r=>q({channel:I,v:1,type:"attach",id:O(E),payload:Ze(r)}),startSession:async r=>{r.projectId!==void 0&&Oe(r.projectId);let a=r.worktree;a&&a!==!0&&(a.kind==="existing"?Oe(a.directory):(a.name!==void 0&&Oe(a.name,200),a.baseBranch!==void 0&&Oe(a.baseBranch,200)));let h=await ae({channel:I,v:1,type:"start-session",id:O(E),payload:fo(r)},e.requestTimeoutMs??18e4);if(!ao(h))throw new b("HOST_REJECTED","Host did not return a session.");return h},prompt:r=>ae({channel:I,v:1,type:"prompt",id:O(E),payload:_o(r)}).then(a=>{if(!co(a))throw new b("HOST_REJECTED","Host did not return a prompt result.");return a}),sessionLink:r=>q({channel:I,v:1,type:"session-link",id:O(E),payload:Ze(r)}),close:()=>q({channel:I,v:1,type:"close",id:O(E)}),oauthStart:()=>q({channel:I,v:1,type:"oauth-start",id:O(E)}),oauthDisconnect:()=>q({channel:I,v:1,type:"oauth-disconnect",id:O(E)}),request:r=>(Rt(r.path)?ae({channel:I,v:1,type:"request",id:O(E),payload:r}):nn()).then(a=>{if(!yt(a))throw new b("HOST_REJECTED","Host request result was empty.");return a}),serviceRequest:r=>(Rt(r.path)?ae({channel:I,v:1,type:"service-request",id:O(E),payload:r}):nn()).then(a=>{if(!yt(a))throw new b("HOST_REJECTED","Host service request result was empty.");return a}),serviceStatus:()=>ae({channel:I,v:1,type:"service-status",id:O(E)}).then(r=>{if(!To(r))throw new b("HOST_REJECTED","Host did not return service status.");return r}),readFile:r=>(et(r)?ae({channel:I,v:1,type:"file-read",id:O(E),payload:{path:r}}):vt()).then(a=>{if(!go(a))throw new b("HOST_REJECTED","Host did not return file content.");return a}),writeFile:(r,a)=>et(r)?a.length>xt?Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${xt} characters.`)):ae({channel:I,v:1,type:"file-write",id:O(E),payload:{path:r,content:a}}).then(h=>{if(!ho(h))throw new b("HOST_REJECTED","Host did not confirm the write.");return h}):vt(),listDir:r=>(et(r)?ae({channel:I,v:1,type:"file-list",id:O(E),payload:{path:r}}):vt()).then(a=>{if(!ko(a))throw new b("HOST_REJECTED","Host did not return directory entries.");return a}),stat:r=>(et(r)?ae({channel:I,v:1,type:"file-stat",id:O(E),payload:{path:r}}):vt()).then(a=>{if(!bo(a))throw new b("HOST_REJECTED","Host did not return file status.");return a}),generate:r=>{let a=r.prompt.trim(),h=r.system?.trim();if(a.length===0||a.length>At)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${At} characters.`));if(h!==void 0&&(h.length===0||h.length>Ot))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${Ot} characters.`));let g=r.maxOutputTokens===void 0?void 0:Math.min(uo,Math.max(1,Math.floor(r.maxOutputTokens)));if(g!==void 0&&!Number.isFinite(g))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let L={prompt:a};return h!==void 0&&(L.system=h),g!==void 0&&(L.maxOutputTokens=g),ae({channel:I,v:1,type:"generate",id:O(E),payload:L},e.requestTimeoutMs??Eo).then(P=>{if(!xo(P))throw new b("HOST_REJECTED","Host did not return generated text.");return P})},onLateGenerateResult:r=>{ie.add(r);for(let a of Se.splice(0))V([r],a);return Sr(),()=>{ie.delete(r)}},openMicrophone:is,setBadge:r=>q({channel:I,v:1,type:"badge",id:O(E),payload:{count:So(r)}}),setHeight:r=>q({channel:I,v:1,type:"resize",id:O(E),payload:{height:mo(r)}}),onFileOpen:r=>(le.add(r),B||(B=!0,t.addEventListener("keydown",gr,!0)),v&&r(v),()=>{le.delete(r)}),onFileSnapshot:r=>(N=r,()=>{N===r&&(N=null)}),onFileSaved:r=>(R.add(r),()=>{R.delete(r)}),reportFileChange:r=>qt({...K,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:Tr,reportFileUnsupported:()=>qt({...K,type:"file-unsupported"}),dispose:()=>{for(let r of Y.keys())Ee({...K,type:"workspace-unsubscribe",id:O(E),payload:{subscriptionId:r}});Y.clear();for(let r of ue.keys())Ee({...K,type:"shells-unsubscribe",id:O(E),payload:{subscriptionId:r}});ue.clear(),me&&(Jt(),me.release(),me=null),re=!0,y=null,oe=null,N=null,le.clear(),R.clear(),B&&t.removeEventListener("keydown",gr,!0),t.removeEventListener("message",mr),t.removeEventListener("keydown",hr,!0),t.removeEventListener("pointerover",mt),t.removeEventListener("pointermove",mt),t.removeEventListener("pointerout",kr),t.removeEventListener("focus",br),t.removeEventListener("blur",xr);for(let r of Q.values())clearTimeout(r.timer),r.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),s.clear(),c.clear(),d.clear(),p.clear(),T.clear(),A.clear(),S.clear(),U.clear(),G.clear(),H.clear(),J.clear(),ie.clear(),Se.length=0}}};var pn=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var la=new Set(pn);var gs=10*6e4;var hs=10*6e4;var ks=10*6e4;var bs=10*6e4;var un=["none","agent","user"];var pa=new Set(un);var xs=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],As=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],En=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,i]of xs)t.style.setProperty(o,e.tokens[i]);for(let[o,i,s]of As){let c=e.tokens[s]??"";t.style.setProperty(o,c),t.style.setProperty(i,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},wo=(e,t)=>{En(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Os={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},$=(e,t)=>`var(--${e}, var(--oc-${Os[e]}, ${t}))`,we=$("surface-background","transparent"),Ct=$("surface-elevated","transparent"),tt=$("surface-elevated-foreground","inherit"),Te=$("surface-foreground","inherit"),z=$("surface-muted-foreground","gray"),Rs=$("surface-muted","transparent"),Be=$("interactive-border","currentColor"),fe=$("interactive-hover","transparent"),Ke=$("interactive-active","transparent"),Co=$("interactive-selection","transparent"),Mo=$("interactive-selection-foreground","inherit"),Ie=$("primary","currentColor"),Uo=$("primary-text","inherit"),No=$("error-text","inherit"),ys=$("font-sans","inherit"),Lo=$("font-mono","monospace"),mn=$("radius","9px"),Po=`calc(${mn} - 2px)`,fn=`calc(${mn} - 4px)`,j=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,_n=`background-image: linear-gradient(${fe}, ${fe});`,Go=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Do="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Sn="box-shadow: var(--oc-sdk-lit);",Ho=`inset 0 0.5px 0 0 ${j(Te,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,vs=`
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
  --oc-sdk-field-lift: ${Ho};
  --oc-sdk-raised-lift: ${Ho};
  --oc-sdk-lit: ${Ho};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,wt=e=>{let t=$(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${$(`${e}-text`,"inherit")}; }`},u=e=>`calc(${e}rem / 14)`,Is=`
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
`,Tn=`${vs}
.oc-sdk { color: ${Te}; font-family: ${ys}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${_n} }
.oc-sdk-mono { font-family: ${Lo}; }
.oc-sdk-muted { color: ${z}; }
${wt("success")}${wt("warning")}${wt("error")}${wt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ie}; --oc-sdk-tone-text: ${Uo}; }

.oc-sdk-btn { border-radius: ${Po}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${fn}; }
.oc-sdk-btn[data-variant="default"] { color: ${Uo}; background: ${j(Ie,10,we)}; border-color: ${j(Ie,12)}; ${Sn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${j(Ie,16,we)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${j(Ie,22,we)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Rs}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ke}, ${Ke}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${tt}; ${Do} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ke}, ${Ke}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${fe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ke}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${$("status-error","red")}; color: ${No}; background: ${j("var(--oc-sdk-tone)",7,we)}; border-color: ${j("var(--oc-sdk-tone)",12)}; ${Sn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${j("var(--oc-sdk-tone)",9,we)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${j("var(--oc-sdk-tone)",11,we)}; box-shadow: none; }

.oc-sdk-field-note { color: ${z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${No}; }
.oc-sdk-input { border-radius: ${Po}; background: var(--oc-sdk-field-bg); color: ${tt}; ${Go("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Go(j(Te,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Go($("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Lo}; }

.oc-sdk-search-icon { color: ${z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ie}; }
.oc-sdk-search-clear { border-radius: ${fn}; color: ${z}; }
.oc-sdk-search-clear:hover { background: ${fe}; color: ${Te}; }

.oc-sdk-trigger { border-radius: ${Po}; background: var(--oc-sdk-raised-bg); color: ${tt}; ${Do} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ke}, ${Ke}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${z}; }
.oc-sdk-trigger-chevron { color: ${z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${tt}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ct}; background-clip: padding-box; color: ${tt}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${fe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Co}; color: ${Mo}; }
.oc-sdk-option-check { color: ${Te}; }
.oc-sdk-option[data-destructive="true"] { color: ${No}; }
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
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${_n} }
.oc-sdk-check-desc { color: ${z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${j(Te,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Te}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Mo}; background: ${Co}; border-color: ${Be}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${tt}; background: var(--oc-sdk-raised-bg); ${Do} }
.oc-sdk-tab-count { color: ${z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${j(Te,6)}; color: ${z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${j("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${fe}; }
.oc-sdk-row[aria-selected="true"] { background: ${Co}; color: ${Mo}; }
.oc-sdk-row-lead { font-family: ${Lo}; color: ${z}; }
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

.oc-sdk-text a { color: ${Uo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${j(Be,60)}; }
`,Z=`
${Zt}
${Is}
${Tn}`;var gn="oc-sdk-ui-style",ze=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},ee=e=>{let t=document.getElementById(gn);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}eo(document);let o=document.createElement("style");o.id=gn,o.textContent=e,document.head.appendChild(o)},M=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},Re=e=>{let t=M("button",e);return t.type="button",t},ge=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},Xe=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},hn=(e,t)=>{let o=i=>{i.target instanceof Node&&e.contains(i.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var ws=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ce=(e,t)=>{ee(Z);let o=t,i=Re("oc-sdk oc-sdk-btn"),s=ws(),c=document.createElement("span");i.append(c),e.append(i);let d=()=>{i.dataset.variant=o.variant??"default",i.dataset.size=o.size??"default",i.disabled=!!o.disabled||!!o.loading,i.dataset.loading=o.loading?"true":"false",i.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&s.parentNode!==i?i.prepend(s):!o.loading&&s.parentNode===i&&s.remove(),ge(c,o.label)},p=()=>{o.disabled||o.loading||o.onClick()};return i.addEventListener("click",p),d(),{update:T=>{o={...o,...T},d()},dispose:()=>{i.removeEventListener("click",p),i.remove()}}};var kn="http://www.w3.org/2000/svg",Cs={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Me=(e,t,o)=>{let i=document.createElementNS(kn,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("width",String(t)),i.setAttribute("height",String(t)),i.style.width=u(t),i.style.height=u(t),i.setAttribute("aria-hidden","true"),i.setAttribute("fill","currentColor"),o&&i.setAttribute("class",o);let s=document.createElementNS(kn,"path");return s.setAttribute("d",Cs[e]),i.append(s),i};var Vo=(e,t)=>{ee(Z);let o=t,i=M("div","oc-sdk oc-sdk-search"),s=M("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let c=Re("oc-sdk-search-clear");c.append(Me("close",14)),c.tabIndex=-1,i.append(Me("search",16,"oc-sdk-search-icon"),s,c),e.append(i);let d=()=>{let S=o.placeholder??"Search";Xe(s,"placeholder",S),s.setAttribute("aria-label",o.label??S),c.setAttribute("aria-label","Clear search"),s.value!==o.value&&(s.value=o.value),i.dataset.active=o.value.trim()===""?"false":"true"},p=()=>{o.value!==""&&o.onChange(""),s.focus()},T=()=>{o.onChange(s.value)},A=S=>{S.key==="Escape"&&s.value!==""&&(S.preventDefault(),p())};return s.addEventListener("input",T),s.addEventListener("keydown",A),c.addEventListener("click",p),d(),o.autofocus&&s.focus(),{update:S=>{o={...o,...S},d()},dispose:()=>{s.removeEventListener("input",T),s.removeEventListener("keydown",A),c.removeEventListener("click",p),i.remove()}}};var $e=(e,t="vertical")=>{let[o,i]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===i||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},je=(e,t,o)=>{let i=e.filter(T=>!T.disabled);if(i.length===0)return null;let s=i[0],c=i[i.length-1];if(o==="first"||!s||!c)return s?.id??null;if(o==="last")return c.id;let d=i.findIndex(T=>T.id===t);return d===-1?o==="next"?s.id:c.id:i[Math.min(i.length-1,Math.max(0,d+(o==="next"?1:-1)))]?.id??null};var bn=(e,t)=>`${e}-${t??""}`,Mt=(e,t,o,i)=>{let s=Re("oc-sdk-option");s.id=bn(e,o.id),s.setAttribute("role",t),s.tabIndex=-1,s.disabled=!!o.disabled,t==="option"&&s.setAttribute("aria-selected",o.selected?"true":"false"),s.dataset.destructive=o.destructive?"true":"false";let c=M("span","oc-sdk-option-label");if(c.textContent=o.label,s.append(c),o.hint){let d=M("span","oc-sdk-option-hint");d.textContent=o.hint,s.append(d)}if(t==="option"){s.dataset.mark="check";let d=M("span","oc-sdk-option-check");d.append(Me("check",14)),s.append(d)}return s.addEventListener("pointerenter",i.hover),s.addEventListener("click",i.pick),s},Ut=(e,t,o,i)=>{let s=bn(o,i);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===s?"true":"false");Xe(t,"aria-activedescendant",i?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Ms=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let i=e.offsetHeight,s=window.innerHeight-o.bottom-8;i>s&&o.top-8>s&&(e.style.top=`${Math.max(8,Math.round(o.top-4-i))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},Nt=(e,t,o,i)=>{e.append(o),Ms(o,t);let s=hn(e,i),c=()=>{i()},d=p=>{p.target instanceof Node&&o.contains(p.target)||i()};return window.addEventListener("resize",c),window.addEventListener("scroll",d,!0),()=>{s(),window.removeEventListener("resize",c),window.removeEventListener("scroll",d,!0),o.remove()}};var xn=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(i=>i.label.toLowerCase().includes(o)||i.id.toLowerCase().includes(o)):[...e]},Us=0,ot=(e,t)=>{ee(Z);let o=t,i=`oc-sdk-select-${Us+=1}`,s=M("div","oc-sdk oc-sdk-select"),c=M("span","oc-sdk-field-label");c.id=`${i}-label`;let d=Re("oc-sdk-trigger");d.setAttribute("aria-haspopup","listbox"),d.setAttribute("aria-labelledby",c.id);let p=M("span","oc-sdk-trigger-value");d.append(p,Me("chevron",14,"oc-sdk-trigger-chevron")),s.append(c,d),e.append(s);let T="",A=null,S=null,U=M("div","oc-sdk oc-sdk-popup"),G=M("div","oc-sdk-popup-search"),H=M("input","oc-sdk-input");H.type="text",H.autocomplete="off",G.append(H);let J=M("div");J.setAttribute("role","listbox"),J.tabIndex=-1,U.append(J);let ie=()=>xn(o.options,o.searchable?T:""),Se=()=>o.searchable?H:J,y=E=>{A=E,Ut(J,Se(),i,E)},oe=()=>{ze(J);let E=ie();if(E.length===0){let f=M("div","oc-sdk-popup-empty");f.textContent="No matches",J.append(f)}for(let f of E)J.append(Mt(i,"option",{...f,selected:f.id===o.value},{hover:()=>y(f.id),pick:()=>N(f.id)}));y(E.some(f=>f.id===A)?A:E[0]?.id??null)},le=()=>{let E=S;S=null,E?.(),T="",H.value="",d.setAttribute("aria-expanded","false")},R=()=>{S||o.disabled||(A=o.value,H.placeholder=o.searchPlaceholder??"Search",o.searchable?U.prepend(G):G.remove(),oe(),S=Nt(s,d,U,le),d.setAttribute("aria-expanded","true"),Se().focus())},N=E=>{le(),d.focus(),E!==o.value&&o.onChange(E)},v=()=>{S?le():R()},B=E=>{!S&&$e(E)&&(E.preventDefault(),R())},Q=E=>{let f=$e(E);f?(E.preventDefault(),y(je(ie(),A,f))):E.key==="Enter"?(E.preventDefault(),A&&N(A)):E.key==="Escape"?(E.preventDefault(),le(),d.focus()):o.searchable&&E.target!==H&&E.key.length===1&&!E.ctrlKey&&!E.metaKey&&H.focus()},Y=()=>{T=H.value,oe()},ue=E=>{S&&!(E.relatedTarget instanceof Node&&s.contains(E.relatedTarget))&&le()},re=()=>{ge(c,o.label),c.hidden=!o.label;let E=o.options.find(f=>f.id===o.value);ge(p,E?.label??o.placeholder??"Select"),p.dataset.empty=E?"false":"true",d.disabled=!!o.disabled,S&&oe()};return d.addEventListener("click",v),d.addEventListener("keydown",B),U.addEventListener("keydown",Q),H.addEventListener("input",Y),s.addEventListener("focusout",ue),re(),{update:E=>{o={...o,...E},re()},dispose:()=>{le(),d.removeEventListener("click",v),d.removeEventListener("keydown",B),U.removeEventListener("keydown",Q),H.removeEventListener("input",Y),s.removeEventListener("focusout",ue),s.remove()}}};var An=e=>e.filter(t=>!("separator"in t)),Ls=0,Lt=(e,t)=>{ee(Z);let o=t,i=`oc-sdk-menu-${Ls+=1}`,s=M("div","oc-sdk oc-sdk-menu");e.append(s);let c=M("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let d=null,p=null,T=Ce(s,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{d?G():H()}}),A=s.querySelector("button");A?.setAttribute("aria-haspopup","menu");let S=y=>{p=y,Ut(c,c,i,y)},U=()=>{ze(c);for(let y of o.items){if("separator"in y){let oe=M("div","oc-sdk-separator");oe.dataset.labeled="false",c.append(oe);continue}c.append(Mt(i,"menuitem",y,{hover:()=>S(y.id),pick:()=>J(y.id)}))}S(An(o.items).some(y=>y.id===p)?p:null)},G=()=>{let y=d;d=null,y?.(),p=null,A?.setAttribute("aria-expanded","false")},H=()=>{d||!A||(U(),d=Nt(s,A,c,G),A.setAttribute("aria-expanded","true"),c.focus())},J=y=>{G(),A?.focus(),o.onSelect(y)},ie=y=>{let oe=$e(y);oe?(y.preventDefault(),S(je(An(o.items),p,oe))):y.key==="Enter"||y.key===" "?(y.preventDefault(),p&&J(p)):y.key==="Escape"&&(y.preventDefault(),G(),A?.focus())},Se=y=>{d&&!(y.relatedTarget instanceof Node&&s.contains(y.relatedTarget))&&G()};return c.addEventListener("keydown",ie),s.addEventListener("focusout",Se),{update:y=>{o={...o,...y},T.update({label:o.label,variant:o.variant,size:o.size}),d&&U()},dispose:()=>{G(),c.removeEventListener("keydown",ie),s.removeEventListener("focusout",Se),T.dispose(),s.remove()}}};var Ps=/^[a-z0-9][a-z0-9-]{0,63}$/,Gs=new Set(["all","new"]),_e=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},Ds=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS Build",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"Reverse Engineering",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"Video",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"Browser",skillIds:["browser-skill"]}],Hs=()=>Ds.map(e=>({...e,skillIds:[...e.skillIds]})),Pt=e=>{let t=new Set(e.map(s=>s.id)),o=new Set(e.map(s=>s.name.trim().toLowerCase())),i=Hs().filter(s=>{let c=s.name.toLowerCase();return t.has(s.id)||o.has(c)?!1:(t.add(s.id),o.add(c),!0)});return{groups:[...e,...i],added:i}},Xo=(e,t,o)=>{let i=t+o;if(t<0||t>=e.length||i<0||i>=e.length)return[...e];let s=[...e],[c]=s.splice(t,1);return s.splice(i,0,c),s},On=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new _e("The group configuration format is invalid.");let t=e;if(t.version!==1)throw new _e("The group configuration version is not supported.");if(!Array.isArray(t.groups))throw new _e("The group list format is invalid.");if(t.groups.length>50)throw new _e("At most 50 groups are allowed.");let o=[],i=new Set,s=new Set;for(let[c,d]of t.groups.entries()){if(!d||typeof d!="object"||Array.isArray(d))throw new _e(`Group ${c+1} has an invalid format.`);let p=d;if(typeof p.id!="string"||!Ps.test(p.id)||Gs.has(p.id))throw new _e(`Group ${c+1} has an invalid ID.`);if(i.has(p.id))throw new _e(`Duplicate group ID: ${p.id}`);let T=typeof p.name=="string"?p.name.trim():"";if(!T||T.length>40||/[\u0000-\u001f\u007f]/.test(T))throw new _e(`Group ${c+1} names must be 1\u201340 characters.`);let A=T.toLowerCase();if(s.has(A))throw new _e(`Duplicate group name: ${T}`);if(!Array.isArray(p.skillIds))throw new _e(`The members of group "${T}" have an invalid format.`);if(p.skillIds.length>200)throw new _e(`Group "${T}" cannot have more than 200 members.`);let S=[],U=new Set;for(let G of p.skillIds){if(typeof G!="string"||!G||G.length>128)throw new _e(`Group "${T}" contains an invalid skill ID.`);U.has(G)||(U.add(G),S.push(G))}i.add(p.id),s.add(A),o.push({id:p.id,name:T,skillIds:S})}return{version:1,groups:o}};var $o=(e,t)=>e.name.localeCompare(t.name,void 0,{sensitivity:"base"})||e.id.localeCompare(t.id),Rn=e=>{switch(e.state){case"conflict":return 0;case"mixed":return 1;case"enabled":return 2;default:return 3}},Vs=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,Xs=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return Vs(e);case"all":default:return!0}},Fo=(e,t)=>{let o=t.trim().toLowerCase();return o?[e.id,e.name,e.description,...e.warnings].join(" ").toLowerCase().includes(o):!0},lt=e=>({enable:e.filter(t=>t.state==="disabled").map(t=>t.key??t.id),disable:e.filter(t=>t.state==="enabled").map(t=>t.key??t.id)}),yn=(e,t)=>{let o=t.sourceFilter??"all",i=e.filter(s=>(o==="all"||s.scope===o)&&Xs(s,t.stateFilter)&&Fo(s,t.query));switch(t.sortMode){case"tokens":return[...i].sort((s,c)=>c.estimatedTokens-s.estimatedTokens||$o(s,c));case"name":return[...i].sort($o);case"state":return[...i].sort((s,c)=>Rn(s)-Rn(c)||$o(s,c));case"default":default:return i}};function vn(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var In=`:root {
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
`;var wn=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var n=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,i)=>Object.prototype.hasOwnProperty.call(t,i)?String(t[i]):o):e,he=Io({requestTimeoutMs:3e4}),Xn=document.querySelector("#root");if(!Xn)throw new Error("Missing #root");vn(document);var $n=document.createElement("style");$n.textContent=wn+In;document.head.append($n);var l=(e,t="",o)=>{let i=document.createElement(e);return i.className=t,o!==void 0&&(i.textContent=o),i},ve=class extends Error{code;conflicts;constructor(t,o,i){super(t),this.name="ServiceError",this.code=o,this.conflicts=i}},Bs=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",Ks=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",Ue=(e,t="")=>typeof e=="string"?e:t,Cn=e=>typeof e=="string"&&e.length>0?e:null,Vt=e=>e===!0,Fn=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Mn=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],sr=e=>{if(!e||typeof e!="object")return null;let t=e;return!Ks(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:Ue(t.message,n("Conflict")),activePath:Cn(t.activePath),disabledPath:Cn(t.disabledPath),blocking:Vt(t.blocking)}},zs=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!Bs(t.state)?null:{key:Ue(t.key,t.id),id:t.id,scope:t.scope==="project"?"project":"global",sourceId:Ue(t.sourceId,"opencode-global"),rootPath:Ue(t.rootPath),name:Ue(t.name,t.id),description:Ue(t.description),state:t.state,advertised:Vt(t.advertised),autoInvokeOff:Vt(t.autoInvokeOff),activePaths:Mn(t.activePaths),disabledPaths:Mn(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(sr).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:Fn(t.estimatedTokens)}},Un=e=>{if(!e||typeof e!="object")throw new ve(n("The service returned invalid skill directory information."),"parse",[]);let t=e;return{sourceId:Ue(t.sourceId,"opencode-global"),scope:t.scope==="project"?"project":"global",label:Ue(t.label,n("Skill directory")),path:Ue(t.path),exists:Vt(t.exists),error:typeof t.error=="string"?t.error:null}},qe=e=>{if(!e||typeof e!="object")throw new ve(n("The service returned data in an unexpected format."),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new ve(n("The service returned data in an unexpected format."),"parse",[]);let o=t.skills.map(zs).filter(p=>p!==null),i=Array.isArray(t.conflicts)?t.conflicts.map(sr).filter(p=>p!==null):o.flatMap(p=>p.conflicts),s=i.filter(p=>p.blocking).length,c={total:o.length,advertised:o.filter(p=>p.advertised).length,disabled:o.filter(p=>p.state==="disabled").length,blockingConflicts:s,warnings:i.length-s,estimatedTokens:o.reduce((p,T)=>p+T.estimatedTokens,0)},d=Array.isArray(t.roots)?t.roots.map(Un):t.root?[Un(t.root)]:[];return{skills:o,conflicts:i,summary:c,root:d[0]??{sourceId:"opencode-global",scope:"global",label:n("Skill directory"),path:"",exists:!1,error:null},roots:d,projectDirectory:typeof t.projectDirectory=="string"?t.projectDirectory:null,scannedAt:Fn(t.scannedAt)}},Ft=e=>{try{return On(e).groups}catch(t){throw new ve(t instanceof Error?t.message:n("The group configuration format is invalid."),"parse",[])}},_t=async(e,t,o,i)=>{let s=await he.serviceRequest({method:e,path:t,...i?{query:i}:{},...o===void 0?{}:{body:JSON.stringify(o)}}),c;try{c=JSON.parse(s.body)}catch{throw new ve(n("The service returned unrecognized data. Try again."),"parse",[])}if(s.status>=400){let d=c&&typeof c=="object"?c:{},p=typeof d.error=="string"?d.error:n("Request failed ({status})",{status:s.status}),T=typeof d.code=="string"?d.code:null,A=Array.isArray(d.conflicts)?d.conflicts.map(sr).filter(S=>S!==null):[];throw new ve(p,T,A)}return c},Je=async(e,t,o)=>{let i=nt,s=o===void 0||e==="GET"?void 0:{...o,directory:i??void 0},c=await _t(e,t,s,e==="GET"&&i?{directory:i}:void 0);if(i!==nt)throw new Error(n("The project changed; rescan before making changes."));return c},Pe=e=>m?.skills.find(t=>t.key===e)??m?.skills.filter(t=>t.id===e)[0],Ae=e=>e instanceof b?e.code==="NO_SERVICE"?n('Allow "Skills" to run its local service in Settings \u2192 Extensions.'):e.code==="SERVICE_FAILED"?n("The local service is not ready. Reload the extension and try again."):e.code==="DISABLED"?n("The Skills extension is disabled. Enable it in extension settings."):e.code==="HOST_TIMEOUT"?n("The local service timed out. Try again."):n("Cannot connect to the local service. Check extension permissions."):e instanceof ve||e instanceof Error?e.message:n("The operation failed. Try again."),js=e=>e instanceof ve&&e.code==="not-found"?n('The local service is too old. Disable and re-enable "Skills" in extension settings.'):Ae(e),Bt=l("main","ext ext-container sk");Bt.setAttribute("aria-label",n("Skills Manager"));var Bn=l("header","sk-header"),Kn=l("div","sk-title-row"),Ws=l("h1","sk-title",n("Skills Manager")),Kt=l("div","sk-actions"),qs=Ce(Kt,{label:n("Rescan"),variant:"outline",size:"sm",onClick:()=>{Ve(!0),$t()}}),Js=Ce(Kt,{label:n("Enable all"),variant:"outline",size:"sm",onClick:()=>ns(!0)}),Ys=Ce(Kt,{label:n("Disable all"),variant:"outline",size:"sm",onClick:()=>ns(!1)});Kn.append(Ws,Kt);var er=l("p","sk-summary"),tr=l("p","sk-summary sk-summary-secondary");Bn.append(Kn,er,tr);var zn=l("div","sk-body"),de=l("div","sk-notice-root");de.setAttribute("aria-live","polite");var Ht=l("div","sk-groups-note"),jn=l("div","sk-groups-row"),dt=l("div","sk-groups"),ir=l("div","sk-group-select"),Ne=l("button","sk-chip sk-groups-edit",n("Edit groups"));Ne.type="button";Ne.setAttribute("aria-pressed","false");Ne.addEventListener("click",()=>{x?Er():fi()});jn.append(dt,ir,Ne);var st=l("div","sk-group-editor-root"),or=l("div"),ft=l("div"),rt=l("details","sk-sources"),Wn=l("div","sk-toolbar"),ar=l("div","sk-search-slot"),qn=l("div","sk-toolbar-selects"),cr=l("div","sk-toolbar-actions"),lr=l("div","sk-filter-slot"),dr=l("div","sk-source-slot"),pr=l("div","sk-sort-slot");qn.append(lr,dr,pr);var Qs=Lt(cr,{label:n("List actions"),variant:"ghost",size:"sm",items:[{id:"invert",label:n("Invert visible skills")},{id:"copy-ids",label:n("Copy visible IDs")}],onSelect:e=>{e==="invert"?Ri():e==="copy-ids"&&Oi()}}),Bo=cr.querySelector(".oc-sdk-btn");Bo&&(Bo.setAttribute("aria-label",n("List actions")),Bo.title=n("Copy IDs or invert the visible skills"));Wn.append(ar,qn,cr);var pt=l("div","sk-list");pt.setAttribute("role","list");var Jn=l("footer","sk-footer"),Zs=l("p","",n("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open.")),ei=l("p","",n("Enable all before disabling or uninstalling the extension; rescan after skills change."));Jn.append(Zs,ei);zn.append(de,Ht,jn,st,or,ft,rt,Wn,pt,Jn);Bt.append(Bn,zn);Xn.append(Bt);var m=null,ye=!1,Gt=0,ut=null,C=null,_=null,se=null,pe=!1,te=null,W=null,D=[],xe=null,Le=!0,x=null,ce=null,Ge=!1,De=!1,Et="",zt="",jt="all",Wt="all",ur="default",nt=null,Dt=new Set,Nn,Ln=!1,Yn=()=>[{id:"all",label:n("All states")},{id:"enabled",label:n("Enabled")},{id:"disabled",label:n("Disabled")},{id:"attention",label:n("Needs attention")}],Qn=()=>[{id:"all",label:n("All sources")},{id:"global",label:n("Global")},{id:"project",label:n("Project")}],Zn=()=>[{id:"default",label:n("Default order")},{id:"tokens",label:n("Tokens (high to low)")},{id:"name",label:n("Name (A\u2013Z)")},{id:"state",label:n("Needs attention first")}],ti=Vo(ar,{value:"",placeholder:n("Search name, description, or ID (press / to focus)"),onChange:e=>{zt=e,at()}}),es=()=>ar.querySelector("input"),ts=()=>{let e=es();e&&e.setAttribute("aria-label",n("Search skills"))};ts();var oi=ot(lr,{value:"all",options:Yn(),onChange:e=>{jt=e==="enabled"||e==="disabled"||e==="attention"?e:"all",at()}}),Ko=lr.querySelector(".oc-sdk-trigger");Ko&&(Ko.setAttribute("aria-label",n("Filter by status")),Ko.removeAttribute("aria-labelledby"));var ri=ot(dr,{value:"all",options:Qn(),onChange:e=>{Wt=e==="global"||e==="project"?e:"all",at()}}),zo=dr.querySelector(".oc-sdk-trigger");zo&&(zo.setAttribute("aria-label",n("Filter by skill source")),zo.removeAttribute("aria-labelledby"));var ni=ot(pr,{value:"default",options:Zn(),onChange:e=>{ur=e==="tokens"||e==="name"||e==="state"?e:"default",at()}}),jo=pr.querySelector(".oc-sdk-trigger");jo&&(jo.setAttribute("aria-label",n("Sort order")),jo.removeAttribute("aria-labelledby"));var si=ot(ir,{value:"all",options:[{id:"all",label:n("All")}],onChange:e=>{W=e==="all"?null:e,k()}}),Wo=ir.querySelector(".oc-sdk-trigger");Wo&&(Wo.setAttribute("aria-label",n("Filter by group")),Wo.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=es();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"){if(te||se!==null||pe){e.preventDefault(),te=null,se=null,pe=!1,k();return}x&&!_&&(e.preventDefault(),Ge||De?(Ge=!1,De=!1,k()):Er())}}});var He=()=>!!(m?.root.error||m?.roots.some(e=>e.error)),it=()=>{let e=m;if(!e)return[];let t=W?D.find(i=>i.id===W):null,o=t?t.skillIds.map(i=>Pe(i)).filter(i=>!!i):e.skills;return yn(o,{query:zt,stateFilter:jt,sourceFilter:Wt,sortMode:ur})},ii=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",ai=e=>e.state==="conflict"?n("Conflict"):e.state==="mixed"?n("Mixed"):e.state==="disabled"?n("Disabled"):n("Enabled"),Xt=(e,t="neutral")=>{let o=l("span","sk-badge",e);return o.dataset.tone=t,o},ci=e=>{switch(e){case"both":return n("Both entry and disabled file exist");case"duplicate":return n("Multiple entries for one ID");case"invalid":return n("Frontmatter could not be parsed");case"empty":return n("Entry file is empty");case"read-error":return n("Entry cannot be read");case"manual":return n("Manual invocation only");case"no-description":return n("No description");default:return n("Conflict")}},qo=(e,t)=>{if(!t)return null;let o=l("p","sk-path");return o.append(l("span","sk-path-label",`${e}:`),l("code","",t)),o},F=(e,t,o=!1,i=!1)=>{let s=l("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return s.type="button",s.disabled=!!_||i,s.addEventListener("click",t),s},Pn=e=>{let t=l("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=l("div","sk-conflict-copy");if(o.append(l("strong","",ci(e.kind)),l("p","sk-conflict-message",e.message)),e.kind==="both"?(o.append(qo(n("Active entry"),e.activePath)??l("span")),o.append(qo(n("Disabled entry"),e.disabledPath)??l("span"))):(e.activePath??e.disabledPath)&&o.append(qo(n("Entry"),e.activePath??e.disabledPath)??l("span")),t.append(o),e.kind==="both"&&e.activePath){let i=l("div","sk-conflict-actions");i.append(F(n("Keep enabled"),()=>void Vn(e,"enabled"),!1,He()),F(n("Keep disabled"),()=>void Vn(e,"disabled"),!1,He())),t.append(i)}return t},li=()=>{if(ft.replaceChildren(),!m)return;let t=[...m.roots.filter(d=>!!d.error).map(d=>({kind:"read-error",skillId:"",message:n("Cannot read {label}: {error} ({path})",{label:d.label,error:d.error??"",path:d.path}),activePath:null,disabledPath:null,blocking:!0})),...m.conflicts],o=t.filter(d=>d.blocking),i=t.filter(d=>!d.blocking);if(o.length===0&&i.length===0)return;let s=l("section","sk-conflicts");s.setAttribute("aria-label",n("Conflict check"));let c=l("div","sk-section-head");if(c.append(l("h2","sk-section-title",n("Conflict check")),l("span","sk-section-count",n("To resolve: {blocking} \xB7 Warnings: {warnings}",{blocking:o.length,warnings:i.length}))),s.append(c),o.length>0){let d=l("ul","sk-conflict-list");for(let p of o)d.append(Pn(p));s.append(d)}if(i.length>0){let d=l("details","sk-warning-details");d.append(l("summary","",n("Warnings ({count})",{count:i.length})));let p=l("ul","sk-conflict-list");for(let T of i)p.append(Pn(T));d.append(p),s.append(d)}ft.append(s)},di=()=>{let e=rt.open;rt.replaceChildren();let t=m;if(!t)return;let o=t.roots.filter(s=>s.exists).length;rt.append(l("summary","",n("Detected skill sources: {available}/{total} available",{available:o,total:t.roots.length})));let i=l("ul","sk-source-list");for(let s of t.roots){let c=l("li","sk-source-item"),d=l("div","sk-source-head"),p=s.error?n("Error"):s.exists?n("Available"):n("Not created");d.append(l("strong","",s.label),Xt(s.scope==="project"?n("Project"):n("Global"),s.scope==="project"?"info":"neutral"),Xt(p,s.error?"error":s.exists?"success":"neutral")),c.append(d,l("code","sk-source-path",s.path||n("No path"))),s.error&&c.append(l("p","sk-source-error",s.error)),i.append(c)}rt.append(i),rt.open=e},os=()=>{if(de.replaceChildren(),te){let e=te,t=new Set(e.skillIds),o=m?m.skills.filter(c=>!t.has(c.key)&&!t.has(c.id)).length:0,i=l("div","sk-notice",n('Enable only "{name}": other skills disabled: {count}.',{name:e.name,count:o}));i.dataset.tone="warning",i.setAttribute("role","status");let s=l("div","sk-notice-actions");s.append(F(n("Confirm"),()=>void Ai(),!0),F(n("Cancel"),()=>{te=null,k()})),i.append(s),de.append(i);return}if(pe){let e=lt(it()),t=e.enable.length+e.disable.length,o=l("div","sk-notice",n("Invert visible skills: enable {enable}, disable {disable}.",{enable:e.enable.length,disable:e.disable.length}));o.dataset.tone="warning",o.setAttribute("role","status");let i=l("div","sk-notice-actions");i.append(F(n("Confirm invert"),()=>void yi(),!0,t===0),F(n("Cancel"),()=>{pe=!1,k()})),o.append(i),de.append(o);return}if(se!==null){let e=m?m.skills.filter(i=>(se?i.disabledPaths.length:i.activePaths.length)>0).length:0,t=l("div","sk-notice",se?n("Skills to enable: {count}.",{count:e}):n("Skills to disable: {count}.",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=l("div","sk-notice-actions");o.append(F(n(se?"Confirm enable":"Confirm disable"),()=>void Ui(),!0),F(n("Cancel"),()=>{se=null,k()})),t.append(o),de.append(t);return}if(C){let e=l("div","sk-notice",C.text);if(e.dataset.tone=C.tone,e.setAttribute("role",C.tone==="error"?"alert":"status"),C.actions?.length){let t=l("div","sk-notice-actions");for(let o of C.actions)t.append(F(o.label,o.onClick,o.primary));e.append(t)}de.append(e);return}if(ut){let e=l("div","sk-notice",ut);e.dataset.tone="error",e.setAttribute("role","alert"),de.append(e);return}if(ye&&!m){let e=l("div","sk-notice",n("Reading skills\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),de.append(e)}},pi=()=>{if(!m){er.textContent=n(ye?"Reading skills\u2026":"Skills not read yet."),tr.textContent=n("After disabling an entry document, OpenCode no longer discovers that skill.");return}er.textContent=n("Model sees {advertised} of {total} \xB7 about {tokens} tokens/step",{advertised:m.summary.advertised,total:m.summary.total,tokens:m.summary.estimatedTokens.toLocaleString("en")});let e=[n("Disabled: {count}",{count:m.summary.disabled})],t=m.skills.filter(o=>o.scope==="project").length;if(nt&&e.push(n("Project skills: {count}",{count:t})),m.summary.blockingConflicts>0?e.push(n("Blocking conflicts: {count}",{count:m.summary.blockingConflicts})):e.push(n("No blocking conflicts")),m.summary.warnings>0&&e.push(n("Warnings: {count}",{count:m.summary.warnings})),m.roots.some(o=>o.error)&&e.push(n("A skill directory cannot be read")),m.scannedAt>0){let o=new Date(m.scannedAt);Number.isNaN(o.getTime())||e.push(n("Scanned {time}",{time:o.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})}))}tr.textContent=n("{parts}. Estimates exclude built-in skills.",{parts:e.join(" \xB7 ")})},We=e=>e.skillIds.map(t=>Pe(t)?.key).filter(t=>!!t),rs=e=>{let t=We(e).map(i=>Pe(i)).filter(i=>!!i);if(t.length===0)return n("No skills");if(t.some(i=>i.state==="conflict"))return n("Has conflicts");let o=t.filter(i=>i.state==="enabled").length;return o===t.length?n("All on"):n(o===0?"All off":"Partial")},Gn=e=>{Array.from(dt.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},ui=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,Ei=()=>{if(Ht.replaceChildren(),xe){let e=l("div","sk-notice",n("Cannot read group configuration: {error}",{error:xe}));e.dataset.tone="error",e.setAttribute("role","alert");let t=l("div","sk-notice-actions");t.append(F(n("Reload"),()=>void $t(),!1,Le)),e.append(t),Ht.append(e);return}Le||D.length>0||!m||He()||Ht.append(l("div","sk-notice",n('No groups yet. Click "Edit groups" to create one, or import example groups in the editor.')))},rr=e=>{x={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},Et="",ce=null,Ge=!1,De=!1,k();let t=st.querySelector(".sk-group-name");t?.focus(),t?.select()},fi=()=>{if(xe||Le||!m||He())return;let e=D.find(t=>t.id===W)??D[0]??null;rr(e),st.scrollIntoView({block:"nearest"})},Er=()=>{_||(x=null,Et="",ce=null,Ge=!1,De=!1,k(),Ne.focus())},_i=e=>{if(e==="new"){rr(null);return}let t=D.find(o=>o.id===e);t&&rr(t)},Jo=()=>{st.querySelector(".sk-group-name")?.focus()},Dn=async()=>{let e=x;if(!e||_||xe)return;let t=e.name.trim();if(!t){ce=n("Enter a group name."),k(),Jo();return}if(t.length>40){ce=n("Group names cannot exceed {count} characters.",{count:40}),k(),Jo();return}if(D.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){ce=n('A group named "{name}" already exists.',{name:t}),k(),Jo();return}if(e.members.length===0){ce=n("A group needs at least one member."),k();return}let o=e.id??ui(),i={id:o,name:t,skillIds:[...e.members]},s=e.id?D.map(c=>c.id===e.id?i:c):[...D,i];_="groups",ce=null,k();try{D=Ft(await _t("POST","/groups",{version:1,groups:s})),xe=null,W=o,te=null;let c=D.find(d=>d.id===o)??null;x=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,C={text:n('Group "{name}" saved.',{name:t}),tone:"success"},he.toast({kind:"success",message:n('Group "{name}" saved.',{name:t})}).catch(()=>{})}catch(c){ce=Ae(c)}finally{_=null,k()}},Si=()=>{!x?.id||_||(Ge=!0,De=!1,k())},mi=async()=>{if(!x?.id||_)return;let e=x.id,t=D.filter(o=>o.id!==e);_="groups",Ge=!1,ce=null,k();try{D=Ft(await _t("POST","/groups",{version:1,groups:t})),xe=null,te?.id===e&&(te=null),W===e&&(W=null);let o=D.find(i=>i.id===W)??D[0]??null;W=o?.id??null,x=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,C={text:n("Group deleted."),tone:"success"}}catch(o){ce=Ae(o)}finally{_=null,k()}},Ti=()=>{if(!(_||Le||xe)){if(Pt(D).added.length===0){C={text:n("Every example group name or ID already exists; nothing to import."),tone:"info"},k();return}De=!0,Ge=!1,k()}},gi=async()=>{if(_)return;let{groups:e,added:t}=Pt(D);if(De=!1,t.length===0){C={text:n("Every example group name or ID already exists; nothing to import."),tone:"info"},k();return}_="groups",ce=null,k();try{D=Ft(await _t("POST","/groups",{version:1,groups:e})),xe=null,C={text:n("Example groups imported: {count}.",{count:t.length}),tone:"success"}}catch(o){ce=Ae(o)}finally{_=null,k()}},hi=()=>{if(st.replaceChildren(),!x)return;let e=x,t=l("section","sk-group-editor");t.setAttribute("aria-label",n("Edit groups"));let o=l("div","sk-section-head");o.append(l("h2","sk-section-title",n("Edit groups")),F(n("Close"),Er,!1,!!_)),t.append(o);let i=l("label","sk-field");i.append(l("span","sk-field-label",n("Choose a group")));let s=l("select","sk-input");s.setAttribute("aria-label",n("Choose a group"));let c=l("option","",n("New group"));c.value="new",s.append(c);for(let R of D){let N=l("option","",`${R.name} (${R.skillIds.length})`);N.value=R.id,s.append(N)}s.value=e.id??"new",s.disabled=!!_,s.addEventListener("change",()=>_i(s.value)),i.append(s);let d=l("label","sk-field");d.append(l("span","sk-field-label",n("Name")));let p=l("input","sk-input sk-group-name");p.type="text",p.value=e.name,p.maxLength=40,p.placeholder=n("e.g. Daily development"),p.autocomplete="off",p.spellcheck=!1,p.disabled=!!_,p.addEventListener("input",()=>{x&&(x.name=p.value,ce=null)}),p.addEventListener("keydown",R=>{R.key==="Enter"&&(R.preventDefault(),!(R.isComposing||R.keyCode===229)&&Dn())}),d.append(p),t.append(i,d);let T=l("fieldset","sk-members"),A=l("legend","",n("Members ({count})",{count:e.members.length}));T.append(A);let S=l("div","sk-members-tools"),U=l("input","sk-member-filter");U.type="search",U.value=Et,U.placeholder=n("Filter member name or ID"),U.setAttribute("aria-label",n("Filter member name or ID")),U.disabled=!!_,S.append(U,F(n("Select all"),()=>{if(!x)return;let R=m?.skills.map(v=>v.id)??[],N=x.members.filter(v=>!R.includes(v));x.members=[...R,...N],k()},!1,!!_),F(n("Clear"),()=>{x&&(x.members=[],k())},!1,!!_)),T.append(S);let G=l("div","sk-member-list"),H=l("div","sk-order-box"),J=R=>{x&&(A.textContent=n("Members ({count})",{count:x.members.length}),ie(),Se(R))},ie=()=>{if(G.replaceChildren(),!x)return;let N=(m?.skills??[]).filter(v=>Fo(v,Et));if(N.length===0){G.append(l("p","sk-member-empty",n("No matching members")));return}for(let v of N){let B=l("label","sk-check"),Q=l("input");Q.type="checkbox",Q.checked=x.members.includes(v.key),Q.disabled=!!_,Q.addEventListener("change",()=>{x&&(Q.checked?x.members.includes(v.key)||x.members.push(v.key):x.members=x.members.filter(ue=>ue!==v.key),ce=null,A.textContent=n("Members ({count})",{count:x.members.length}),Se())});let Y=l("span","sk-check-copy");Y.append(l("span","sk-check-name",v.name),l("code","sk-check-id",v.id)),B.append(Q,Y),G.append(B)}},Se=R=>{if(H.replaceChildren(),!x||x.members.length===0)return;H.append(l("p","sk-order-title",n("Step order ({count})",{count:x.members.length})));let N=l("ol","sk-order-list");for(let[v,B]of x.members.entries()){let Q=Pe(B)??null,Y=Q?Q.name:B,ue=l("li","sk-order-item"),re=l("span","sk-order-label");re.append(l("span","sk-step",String(v+1)),l("span","sk-order-name",Y));let E=l("span","sk-order-actions"),f=l("button","sk-order-btn","\u2191");f.type="button",f.disabled=!!_||v===0,f.dataset.orderFocus=`up:${B}`,f.title=n('Move "{name}" up',{name:Y}),f.setAttribute("aria-label",n('Move "{name}" up',{name:Y})),f.addEventListener("click",()=>{x&&(x.members=Xo(x.members,v,-1),J(`up:${B}`))});let ne=l("button","sk-order-btn","\u2193");ne.type="button",ne.disabled=!!_||v===x.members.length-1,ne.dataset.orderFocus=`down:${B}`,ne.title=n('Move "{name}" down',{name:Y}),ne.setAttribute("aria-label",n('Move "{name}" down',{name:Y})),ne.addEventListener("click",()=>{x&&(x.members=Xo(x.members,v,1),J(`down:${B}`))});let ke=l("button","sk-order-btn","\xD7");ke.type="button",ke.disabled=!!_,ke.title=n('Remove "{name}"',{name:Y}),ke.setAttribute("aria-label",n('Remove "{name}"',{name:Y})),ke.addEventListener("click",()=>{x&&(x.members=x.members.filter(Fe=>Fe!==B),J())}),E.append(f,ne,ke),ue.append(re,E),N.append(ue)}H.append(N),R&&Array.from(H.querySelectorAll("[data-order-focus]")).find(B=>B.dataset.orderFocus===R&&!B.disabled)?.focus()};U.addEventListener("input",()=>{Et=U.value,ie()}),ie(),Se(),T.append(G,H);let y=new Set(m?.skills.flatMap(R=>[R.id,R.key])??[]),oe=e.members.filter(R=>!y.has(R));if(oe.length>0){let R=l("div","sk-missing");R.append(l("span","sk-missing-label",n("Missing from the directory:")));for(let N of oe){let v=l("button","sk-missing-chip",`${N} \xD7`);v.type="button",v.disabled=!!_,v.title=n("Remove this missing member from the group"),v.addEventListener("click",()=>{x&&(x.members=x.members.filter(B=>B!==N),k())}),R.append(v)}T.append(R)}if(t.append(T),ce){let R=l("p","sk-editor-error",ce);R.setAttribute("role","alert"),t.append(R)}let le=l("div","sk-editor-actions");if(e.id&&le.append(F(n("Delete group"),Si,!1,!!_)),le.append(F(n("Import example groups"),Ti,!1,!!_),F(e.id?n("Save changes"):n("New group"),()=>void Dn(),!0,!!_)),t.append(le),Ge){let R=l("div","sk-editor-confirm");R.dataset.tone="warning",R.append(l("p","",n('Delete group "{name}"? The skills themselves are not deleted.',{name:e.name.trim()||n("Unnamed")})));let N=l("div","sk-actions");N.append(F(n("Confirm delete"),()=>void mi(),!0,!!_),F(n("Cancel"),()=>{Ge=!1,k()},!1,!!_)),R.append(N),t.append(R)}if(De){let R=Pt(D).added.length,N=l("div","sk-editor-confirm");N.dataset.tone="warning",N.append(l("p","",n("Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.",{count:R})));let v=l("div","sk-actions");v.append(F(n("Confirm import"),()=>void gi(),!0,!!_),F(n("Cancel"),()=>{De=!1,k()},!1,!!_)),N.append(v),t.append(N)}t.append(l("p","sk-editor-hint",n("Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json."))),st.append(t)},ki=()=>{dt.replaceChildren();let e=m?.skills.length??0,t=l("button","sk-chip",n("All {count}",{count:e}));t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",W===null?"true":"false"),t.addEventListener("click",()=>{W=null,k(),Gn("all")}),dt.append(t);for(let o of D){let i=We(o).length,s=l("button","sk-chip",`${o.name} ${i}`);s.type="button",s.dataset.group=o.id,s.setAttribute("aria-pressed",W===o.id?"true":"false"),s.addEventListener("click",()=>{W=o.id,k(),Gn(o.id)}),dt.append(s)}Ne.textContent=n(x?"Close editor":"Edit groups"),Ne.setAttribute("aria-pressed",x?"true":"false"),Ne.disabled=Le||!!xe||!!_||!m||He(),Ne.title=Le?n("Reading groups\u2026"):xe?n("Cannot read the group configuration. Repair the file and reload."):m?He()?n("Skill directory cannot be read"):"":n("Skills not read yet"),si.update({value:W??"all",options:[{id:"all",label:n("All {count}",{count:e})},...D.map(o=>({id:o.id,label:`${o.name} ${We(o).length}`,hint:rs(o)}))]})},bi=()=>{if(or.replaceChildren(),!m||!W)return;let e=D.find(S=>S.id===W);if(!e)return;let t=We(e),o=e.skillIds.filter(S=>!Pe(S)),s=t.map(S=>Pe(S)).filter(S=>!!S).some(S=>S.state==="conflict"),c=He()||s||t.length===0,d=l("div","sk-groupbar"),p=l("div","sk-groupbar-text");p.append(l("strong","",e.name),l("span","sk-group-state",n("{state} \xB7 {count}",{count:t.length,state:rs(e)}))),o.length>0&&p.append(l("p","sk-group-warning",n("Missing: {names}",{names:o.join(", ")})));let T=l("div","sk-groupbar-actions");T.append(F(n("Enable group"),()=>void Hn(e,!0),!1,c),F(n("Disable group"),()=>void Hn(e,!1),!1,c));let A=F(n("Enable only this group"),()=>xi(e),!1,c||o.length>0);o.length>0&&(A.title=n("The group has missing skills. Resolve them before enabling only this group.")),T.append(A),d.append(p,T),or.append(d)},Hn=async(e,t)=>{if(!m||_)return;let o=We(e);if(o.length!==0){_=`group:${e.id}:${t?"on":"off"}`,te=null,se=null,pe=!1,C=null,k();try{m=qe(await Je("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),C={text:t?n('Skills enabled in "{name}": {count}.',{name:e.name,count:o.length}):n('Skills disabled in "{name}": {count}.',{name:e.name,count:o.length}),tone:"success"},he.toast({kind:"success",message:t?n('Enabled "{name}"',{name:e.name}):n('Disabled "{name}"',{name:e.name})}).catch(()=>{})}catch(i){C={text:Ae(i),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()}},xi=e=>{if(!m||_)return;let t=We(e),o=e.skillIds.filter(i=>!Pe(i));t.length===0||o.length>0||(te=e,se=null,pe=!1,C=null,k(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},Ai=async()=>{if(!m||_||!te)return;let e=te;te=null,pe=!1;let t=We(e),o=e.skillIds.filter(c=>!Pe(c));if(t.length===0||o.length>0){C={text:n("The group has missing skills; nothing was run."),tone:"error"},k();return}let i=new Set(t),s=m.skills.filter(c=>!i.has(c.key)).map(c=>c.key);_=`group-only:${e.id}`,C=null,k();try{m=qe(await Je("POST","/skills/batch",{enable:t,disable:s})),C={text:n('Enabled only "{name}"; other skills disabled: {count}.',{name:e.name,count:s.length}),tone:"success"},he.toast({kind:"success",message:n('Enabled only "{name}"',{name:e.name})}).catch(()=>{})}catch(c){C={text:Ae(c),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()},nr=async(e,t)=>{try{await he.writeClipboard(e),he.toast({kind:"success",message:t}).catch(()=>{})}catch(o){C={text:Ae(o),tone:"error"},os()}},Oi=async()=>{let e=it().map(t=>t.key);e.length!==0&&await nr(e.join(`
`),n("Copied {count} visible qualified IDs.",{count:e.length}))},Ri=()=>{if(!m||_)return;let e=lt(it());if(e.enable.length+e.disable.length===0){C={text:n("No enabled or disabled skills match the current view."),tone:"info"},k();return}pe=!0,se=null,te=null,C=null,k(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus()},yi=async()=>{if(!m||_||!pe)return;let e=lt(it()),t=e.enable.length+e.disable.length;if(pe=!1,t!==0){_="invert",C=null,k();try{m=qe(await Je("POST","/skills/batch",e)),C={text:n("Inverted {count} visible skills.",{count:t}),tone:"success"},he.toast({kind:"success",message:n("Inverted {count} visible skills.",{count:t})}).catch(()=>{})}catch(o){C={text:Ae(o),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()}},Yo=(e,t)=>{let o=l("span","sk-menu-slot"),i=t.activePaths[0]??t.disabledPaths[0]??null;Lt(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:n("Copy entry path"),disabled:!i},{id:"copy-id",label:n("Copy qualified skill ID")}],onSelect:c=>{c==="copy-path"&&i?nr(i,n("Copied entry path.")):c==="copy-id"&&nr(t.key,n("Copied qualified skill ID."))}});let s=o.querySelector(".oc-sdk-btn");s&&(s.setAttribute("aria-label",`${n("More actions")} ${t.name}`),s.title=n("More actions")),e.append(o)},vi=e=>{let t=l("div","sk-skill-action"),o=l("span","sk-action-note"),i=l("div","sk-action-top"),s=He();if(e.state==="conflict"){o.textContent=n(s?"Directory cannot be read":"Resolve conflicts first");let p=l("button","sk-inline-button",n("Resolve conflict"));return p.type="button",p.disabled=!!_||s,p.addEventListener("click",()=>{ft.scrollIntoView({block:"nearest"}),ft.querySelector("button")?.focus()}),i.append(p),Yo(i,e),t.append(o,i),t}if(e.state==="mixed"){o.textContent=n(s?"Directory cannot be read":"Some entries disabled");let p=l("div","sk-mini-actions"),T=l("button","sk-inline-button",n("Enable all"));T.type="button",T.disabled=!!_||s,T.addEventListener("click",()=>void Qo(e,!0));let A=l("button","sk-inline-button",n("Disable all"));return A.type="button",A.disabled=!!_||s,A.addEventListener("click",()=>void Qo(e,!1)),p.append(T,A),Yo(p,e),t.append(o,p),t}let c=e.state==="enabled",d=l("button","sk-switch");return d.type="button",d.setAttribute("role","switch"),d.setAttribute("aria-checked",c?"true":"false"),d.setAttribute("aria-label",`${n(c?"Disable":"Enable")} ${e.name}`),d.dataset.skillId=e.key,d.disabled=!!_||s,d.append(l("span","sk-thumb")),d.addEventListener("click",()=>{d.disabled||Qo(e,!c)}),c?o.textContent=s?n("Directory cannot be read"):e.advertised?n("Visible to the model"):n("Not visible to the model"):o.textContent=n(s?"Directory cannot be read":"Entry disabled"),i.append(d),Yo(i,e),t.append(o,i),t},Ii=(e,t=0)=>{let o=l("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let i=l("div","sk-skill-main"),s=l("div","sk-skill-head");if(t>0){let S=l("span","sk-step",String(t));S.title=n("Step {step}",{step:t}),S.setAttribute("aria-label",n("Step {step}",{step:t})),s.append(S)}s.append(l("strong","sk-name",e.name),Xt(ai(e),ii(e)),Xt(e.scope==="project"?n("Project"):n("Global"),e.scope==="project"?"info":"neutral"));let c=l("div","sk-meta");if(c.append(l("code","sk-id",e.id)),e.rootPath){let S=l("span","sk-source",e.sourceId==="opencode-global"?n("OpenCode"):e.sourceId==="opencode-project"?n("Project OpenCode"):e.sourceId.replace(/-/g," "));S.title=e.rootPath,c.append(S)}e.estimatedTokens>0&&c.append(l("span","sk-token",n("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString("en")})));let d=e.description,p=d||n("No description; the model will not select it automatically."),T=l("p","sk-desc",p),A=Dt.has(e.key);if(A&&T.classList.add("is-expanded"),i.append(s,c,T),d.length>88||d.includes(`
`)){let S=l("button","sk-desc-toggle",n(A?"Show less":"Show more"));S.type="button",S.setAttribute("aria-expanded",A?"true":"false"),S.addEventListener("click",()=>{let U=!Dt.has(e.key);U?Dt.add(e.key):Dt.delete(e.key),T.classList.toggle("is-expanded",U),S.textContent=n(U?"Show less":"Show more"),S.setAttribute("aria-expanded",U?"true":"false")}),i.append(S)}if(e.warnings.length>0){let S=l("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));i.append(S)}return o.append(i,vi(e)),o},wi=()=>{zt="",jt="all",Wt="all",ur="default",ti.update({value:"",placeholder:n("Search name, description, or ID (press / to focus)")}),ts(),oi.update({value:"all",options:Yn()}),ri.update({value:"all",options:Qn()}),ni.update({value:"default",options:Zn()}),at()},at=()=>{pt.replaceChildren();let e=m;if(!e)return;let t=W?D.find(s=>s.id===W):null,o=t?t.skillIds.map(s=>Pe(s)).filter(s=>!!s):e.skills,i=it();if(i.length===0){let s=zt.trim().length>0||jt!=="all"||Wt!=="all",c=l("div","sk-empty");if(c.append(l("h2","",e.skills.length===0?n("No skills found"):t&&o.length===0?n("This group has no available skills"):n("No matching skills")),l("p","",e.skills.length===0?n("Check that a skill directory such as {path} exists, or rescan.",{path:e.roots[0]?.path??n("the skills directory")}):t&&o.length===0?n("Check whether the skills in this group were removed."):n("Try another search term or change the status filter."))),e.skills.length>0&&s){let d=l("div","sk-empty-actions");d.append(F(n("Reset filters"),wi)),c.append(d)}pt.append(c);return}for(let s of i){let c=t?t.skillIds.indexOf(s.key):-1,d=t&&t.skillIds.length>1?(c>=0?c:t.skillIds.indexOf(s.id))+1:0;pt.append(Ii(s,d))}},Ci=()=>{let e=m?m.roots.some(t=>t.error)?1:m.summary.blockingConflicts>0?m.summary.blockingConflicts:null:null;e!==Nn&&(Nn=e,he.setBadge(e).catch(()=>{}))},k=()=>{Bt.setAttribute("aria-busy",ye?"true":"false"),Ci(),pi(),os(),Ei(),ki(),hi(),bi(),li(),di(),at(),qs.update({label:n(ye?"Reading\u2026":"Rescan"),loading:ye,disabled:ye||!!_});let e=He();Js.update({disabled:ye||!!_||!m||e}),Ys.update({disabled:ye||!!_||!m||e});let t=it(),o=lt(t);Qs.update({items:[{id:"invert",label:n("Invert visible skills"),disabled:ye||!!_||!m||o.enable.length+o.disable.length===0},{id:"copy-ids",label:n("Copy visible IDs"),disabled:!m||t.length===0}]})},Mi=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},Ve=async(e=!1,t=!1)=>{let o=++Gt;ye=!0,t||(ut=null),e&&k();try{let i=qe(await Je("GET","/skills"));if(o!==Gt)return;m=i,ut=null}catch(i){o===Gt&&!t&&(ut=Ae(i))}finally{o===Gt&&(ye=!1,k())}},$t=async(e=!1)=>{if(!(Le&&!e||x)){Le=!0,k();try{D=Ft(await _t("GET","/groups")),xe=null,W&&!D.some(t=>t.id===W)&&(W=null)}catch(t){xe=js(t)}finally{Le=!1,k()}}},Qo=async(e,t)=>{if(!_){_=`toggle:${e.id}`,se=null,te=null,pe=!1,C=null,k();try{m=qe(await Je("POST","/skills/toggle",{id:e.key,enabled:t})),C={text:t?n("Enabled {name}.",{name:e.name}):n("Disabled {name}; OpenCode will no longer discover it after the next scan.",{name:e.name}),tone:"success"},he.toast({kind:"success",message:t?n("Enabled {name}",{name:e.name}):n("Disabled {name}",{name:e.name})}).catch(()=>{})}catch(o){C={text:Ae(o),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k(),Mi(e.id)}},Vn=async(e,t)=>{if(_)return;let o=e.activePath??e.disabledPath;if(o){_=`resolve:${o}`,se=null,te=null,pe=!1,C=null,k();try{let i=await Je("POST","/skills/resolve",{path:o,keep:t}),s=i&&typeof i=="object"&&typeof i.backupPath=="string"?i.backupPath:null;m=qe(i),C={text:t==="enabled"?n("Kept the enabled entry{suffix}.",{suffix:s?n("; the old disabled file was backed up to {path}",{path:s}):""}):n("Kept the disabled entry{suffix}.",{suffix:s?n("; the old disabled file was backed up to {path}",{path:s}):""}),tone:"success"},he.toast({kind:"success",message:n("Entry conflict resolved")}).catch(()=>{})}catch(i){C={text:Ae(i),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()}},ns=e=>{!m||_||(se=e,te=null,pe=!1,C=null,k(),de.scrollIntoView({block:"nearest"}),de.querySelector("button")?.focus())},Ui=async()=>{if(se===null||_)return;let e=se;se=null,te=null,pe=!1,_="bulk",C=null,k();try{let t=await Je("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(i=>typeof i=="string"):[];m=qe(t),C={text:e?n("Skills enabled: {count}.",{count:o.length}):n("Skills disabled: {count}.",{count:o.length}),tone:"success"},he.toast({kind:"success",message:e?n("Skills enabled: {count}.",{count:o.length}):n("Skills disabled: {count}.",{count:o.length})}).catch(()=>{})}catch(t){C={text:Ae(t),tone:"error"},_=null,k(),Ve(!1,!0);return}_=null,k()},ss=e=>{let t=typeof e=="string"&&e?e:null;if(Ln){t!==nt?(nt=t,m=null,se=null,pe=!1,te=null,W=null,Ve(!0),$t()):k();return}Ln=!0,nt=t,Ve(!0),$t(!0)};he.onReady(e=>{wo(e,document.documentElement),document.documentElement.lang="en",document.title=n("Skills Manager"),ss(e.directory)});he.onDirectory(e=>ss(e));document.title=n("Skills Manager");k();})();
