"use strict";(()=>{var U="openchamber.sdk";var yt="data-oc-scrolling",ao=`
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
:hover, [${yt}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${yt}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${yt}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${yt}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function co(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",n=>{let r=n.target===e?t:n.target;if(!(r instanceof Element))return;r.hasAttribute("data-oc-scrolling")||r.setAttribute("data-oc-scrolling","");let c=o.get(r);c!==void 0&&clearTimeout(c),o.set(r,setTimeout(()=>{o.delete(r),r.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Ms=`(${co.toString()})(document);`;var Gn=e=>{let t=[],o=0,n=0;return{push:r=>{for(t.push(r),n+=r.length;n-o>e&&t.length>1;){let c=t.shift();n-=c?.length??0,o=0}},pull:r=>{let c=0;for(;c<r.length&&t.length>0;){let l=t[0],p=Math.min(r.length-c,l.length-o);r.set(l.subarray(o,o+p),c),c+=p,o+=p,o>=l.length&&(t.shift(),n-=l.length,o=0)}r.fill(0,c)},clear:()=>{t.length=0,o=0,n=0},get size(){return n-o}}};var Xn=/^[a-z][a-z0-9-]{0,39}$/;var Hn=e=>Object(e)===e&&!Array.isArray(e),lo=(e,t)=>Object.keys(e).every(o=>t.includes(o)),$n=e=>String(e)===e&&e.length>=1&&e.length<=60,Vn=e=>String(e)===e&&e.length>=1&&e.length<=80,Bn=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!Hn(o)||!Xn.test(o.id)||!$n(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!lo(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!lo(o,["kind","id","label","value","options","disabled"])||!Vn(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let n=new Set;for(let r of o.options){if(!Hn(r)||!lo(r,["value","label"])||!Vn(r.value)||!$n(r.label)||n.has(r.value))return!1;n.add(r.value)}if(!n.has(o.value))return!1}return!0};var Ns=1024*1024;var Fn=["{id}","{segment}","{segments+}"];var ua=new Set(Fn);var Kn=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Ea=new Set(Kn);var po=e=>"bytes"in e?e.bytes.byteLength:e.content.length,zn=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Wn=/^[A-Za-z0-9_-]{1,80}$/;var jn=["left","right","top","bottom"];var qn=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of n)if(!qn(r,t+1,o))return!1;return!0},uo=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(uo);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(uo)}return String(e)===e||Number.isFinite(e)},fo=e=>{try{return String(e.id)!==e.id||!Wn.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!jn.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!qn(e.data)||!uo(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var _o=2e3;var Yn=["file","directory","other","missing"],mo=e=>!!(e&&"sessionId"in e),To=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Zn=/^[0-9a-f]{7,64}$/i,So=e=>Zn.test(e),vt=500,It=32e3,Qn=16e3,er=128,tr=200,or=2e3,nr=16e3,rr=80,sr=200,ir=16e3;var ar=2e3;var go=2e4,wt=1024,Ct=2e6;var Mt=64e3,Ut=8e3,ho=4e3;var ko=96e4,Ls=60*6e4;var cr=999,lr=1e4,dt=500,dr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],pr=["stopped","starting","ready","failed"],Ps=new Set(dr),ur=e=>Ps.has(e),fr=e=>e&&ur(e)?e:"HOST_REJECTED",ot=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(ot):Object(e)===e?Object.values(e).every(ot):!1,Er=e=>ot(e)&&JSON.stringify(e).length<=ir,Jn=e=>e?.trim().slice(0,sr)??"",nt=e=>{let t=e.id.trim().slice(0,er),o=e.title.trim().slice(0,tr),n=e.url.trim().slice(0,or),r=e.text?.trim().slice(0,nr),c=e.author?.trim().slice(0,rr),l=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:o||t,url:n,kind:l};if(r&&(p.text=r),c&&(p.author=c),l==="pull"){let m=Jn(e.branches?.head),E=Jn(e.branches?.base);m&&E&&(p.branches={head:m,base:E})}return Er(e.data)&&(p.data=e.data),p},bo=e=>{let t=nt(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},xo=e=>{let t={text:e.text.trim().slice(0,Qn)};return e.send&&(t.send=!0),t},Ao=e=>e===null||!Number.isFinite(e)?null:Math.min(cr,Math.max(0,Math.round(e))),Oo=e=>Number.isFinite(e)?Math.min(lr,Math.max(0,Math.ceil(e))):0;var rt=e=>e.length>0&&e.length<=wt&&!e.includes("\0")&&!e.includes("\\");var Nt=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>ar?!1:!e.split("/").some(o=>o==="."||o===".."),Ds=new Set(pr),Ro=e=>!!(e&&"status"in e&&Ds.has(String(e.status))&&!("body"in e)),Lt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),yo=e=>!!(e&&"content"in e&&String(e.content)===e.content),vo=e=>!!(e&&"written"in e&&e.written===!0),Io=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Gs=new Set(Yn),wo=e=>!!(e&&"kind"in e&&"size"in e&&Gs.has(String(e.kind))&&Number.isFinite(e.size)),Co=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Hs=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),$s=e=>Object(e)===e?e:null,Eo=e=>String(e)===e&&e.length>0,Vs=e=>{if(!Eo(e.id))return null;if(e.ok===!0){let t={channel:U,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Eo(e.error)?{channel:U,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:fr(Eo(e.code)?e.code:void 0)}:null},Mo=e=>{let t=$s(e);return!t||t.channel!==U||t.v!==1?null:t.type==="result"?Vs(t):!Hs.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var _r=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Xs=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",x=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},mr=()=>Promise.reject(new x("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pt=()=>Promise.reject(new x("BAD_PATH",`File path must be 1 to ${wt} characters without NUL or backslash.`)),Dt=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new x("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},y=e=>(e.value+=1,`oc-${e.value}`),Do=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new x("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(i=>i===t.parent),n=e.requestTimeoutMs??go,r=new Set,c=new Set,l=new Set,p=new Set,m=new Set,E=new Set,O=new Set,h=new Set,R=new Set,P=new Set,Y=new Set,ae=new Set,ge=[],C=null,oe=null,de=new Set,I=new Set,L=null,M=null,B=!1,ee=new Map,Z=new Map,fe=new Map,re=!1,f={value:0},_=null,se=null,Ae=!1,Pe=!1,Rn=null,he=null,yn=i=>i?{sessionId:i.id,phase:i.busy?"started":"completed"}:null,Ee=i=>{t.parent.postMessage(i,"*")},vn=()=>{re||t.parent===t||ae.size===0||_?.features?.lateGenerateResults!==!0||Ee({channel:U,v:1,type:"generate-late-listen"})},H=(i,a)=>{for(let b of i)try{b(a)}catch(k){console.error(k)}},In=i=>{if(!(i instanceof MessageEvent)||!o(i.source))return;let a=Mo(i.data);if(!a)return;if(a.type==="workspace"){let k=Z.get(a.payload.subscriptionId);k&&H([k],a.payload.snapshot);return}if(a.type==="shells"){let k=fe.get(a.payload.subscriptionId);k&&H([k],a.payload.snapshot);return}if(a.type==="microphone-audio"){he?.queue.push(a.payload.samples);return}if(a.type==="microphone-ended"){let k=he;if(!k)return;he=null,k.release(),H(k.endedListeners,a.payload.reason);return}if(a.type==="ready"){_=a.payload,se=yn(a.payload.session),H(r,a.payload),H(c,a.payload.directory),H(l,a.payload.session),se&&H(p,se),H(m,a.payload.connection),H(E,a.payload.settings),H(O,a.payload.item),a.payload.block&&H(h,a.payload.block),vn();return}if(a.type==="service-event"){H(R,a.payload);return}if(a.type==="generate-late"){ae.size===0?ge.push(a.payload):H(ae,a.payload);return}if(a.type==="directory"){_&&(_={..._,directory:a.payload.directory}),H(c,a.payload.directory);return}if(a.type==="session"){_&&(_={..._,session:a.payload.session}),a.payload.session?se?.sessionId!==a.payload.session.id&&(se=yn(a.payload.session)):se=null,H(l,a.payload.session);return}if(a.type==="session-lifecycle"){se=a.payload,H(p,a.payload);return}if(a.type==="connection"){_&&(_={..._,connection:a.payload.connection}),H(m,a.payload.connection);return}if(a.type==="settings"){_&&(_={..._,settings:a.payload.settings}),H(E,a.payload.settings);return}if(a.type==="item"){_&&(_={..._,item:a.payload.item}),H(O,a.payload.item);return}if(a.type==="status-control-event"){H(P,a.payload);return}if(a.type==="popover-closed"){H(Y,a.payload);return}if(a.type==="action"){let k=G=>{re||Ee({channel:U,v:1,type:"action-result",id:a.id,payload:G})},D=oe;if(!D){k({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>D(a.payload)).then(()=>k({ok:!0}),G=>{let $=(G instanceof Error?G.message:String(G)).trim();k({ok:!1,error:($||"Action failed.").slice(0,dt)})});return}if(a.type==="file-open"){let k=a.payload;if(M&&zn(M,k))return;M=k,H(de,a.payload);return}if(a.type==="file-saved"){H(I,a.payload.version);return}if(a.type==="file-snapshot"){let k=$=>{re||Ee({channel:U,v:1,type:"file-snapshot-result",id:a.id,payload:$})},D=$=>k({error:($.trim()||"Could not read the edited file.").slice(0,dt)}),G=L;if(!G){D("This extension does not edit files.");return}Promise.resolve().then(()=>G(a.payload.purpose)).then($=>{if(po($)>2e7){D(`The file is over ${2e7} ${"bytes"in $?"bytes":"characters"}.`);return}if($.version.length>256){D(`The snapshot version is over ${256} characters.`);return}k({snapshot:"bytes"in $?{bytes:$.bytes,version:$.version}:{content:$.content,version:$.version}})},$=>D($ instanceof Error?$.message:String($)));return}if(a.type==="resolve"){let k=G=>{Ee({channel:U,v:1,type:"resolve-result",id:a.id,payload:G})},D=C;if(!D){k({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>D(a.payload)).then(G=>k({item:G?nt(G):null}),G=>{let $=(G instanceof Error?G.message:String(G)).trim();k({error:($||"Command failed.").slice(0,dt)})});return}let b=ee.get(a.id);if(b){if(clearTimeout(b.timer),ee.delete(a.id),a.ok){b.resolve(a.payload);return}b.reject(new x(a.code,a.error))}};t.addEventListener("message",In),Ee({channel:U,v:1,type:"hello"});let ce=(i,a=n)=>re||t.parent===t?Promise.reject(new x("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((b,k)=>{let D=setTimeout(()=>{ee.delete(i.id),k(new x("HOST_TIMEOUT","Host did not answer in time."))},a);ee.set(i.id,{resolve:b,reject:k,timer:D}),Ee(i)}),j=i=>ce(i).then(()=>{}),F={channel:U,v:1},no=i=>{!re&&t.parent!==t&&Ee(i)},wn=()=>no({...F,type:"file-save"}),ro=()=>{!re&&t.parent!==t&&Ee({...F,type:"microphone-close",id:y(f)})},ws=async()=>{if(he)throw new x("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new x("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let i=globalThis.AudioContext;if(typeof i!="function")throw new x("UNSUPPORTED","This frame has no Web Audio.");let a=new i;if(a.sampleRate<8e3||a.sampleRate>192e3)throw a.close().catch(()=>{}),new x("UNSUPPORTED",`Audio at ${a.sampleRate} Hz is not supported.`);let b=a.state==="suspended"?a.resume().catch(()=>{}):void 0,k=Gn(Math.round(a.sampleRate/4)),D=a.createScriptProcessor(1024,1,1);D.onaudioprocess=Oe=>k.pull(Oe.outputBuffer.getChannelData(0));let G=a.createMediaStreamDestination();D.connect(G);let $=new Set,tt={queue:k,endedListeners:$,release:()=>{D.onaudioprocess=null,D.disconnect(),k.clear();for(let Oe of G.stream.getTracks())Oe.stop();a.close().catch(()=>{})}};he=tt;try{let Oe=await ce({...F,type:"microphone-open",id:y(f),payload:{sampleRate:a.sampleRate}},12e4);if(!Oe||!("opened"in Oe)||Oe.opened!==!0)throw new x("HOST_REJECTED","Host did not open the microphone.");if(await b,he!==tt)throw new x("DISCONNECTED","The microphone closed while it was opening.")}catch(Oe){throw he===tt&&(he=null),tt.release(),ro(),Oe}return{stream:G.stream,close:()=>{he===tt&&(he=null,tt.release(),ro())},onEnded:Oe=>($.add(Oe),()=>{$.delete(Oe)})}},Cn=i=>{!_r(i)||!Xs(i)||(i.preventDefault(),wn())},Mn=i=>{!_r(i)||i.key!=="Escape"||_?.surface!=="popover"||!_.popover||(i.preventDefault(),Pn(_.popover.id,"escape").catch(()=>{}))},At=()=>{let i=_?.surface==="popover"?_.popover:void 0;if(!i)return;let a=Ae||Pe;Rn!==a&&(Rn=a,Dn(i.id,a).catch(()=>{}))},Ot=()=>{_?.surface!=="popover"||Ae||(Ae=!0,At())},Un=i=>{_?.surface!=="popover"||i.relatedTarget!==null||!Ae||(Ae=!1,At())},Nn=()=>{_?.surface!=="popover"||Pe||(Pe=!0,At())},Ln=()=>{_?.surface!=="popover"||!Pe||(Pe=!1,At())},we=(i,a=1024)=>{if(!i.trim()||i.length>a)throw new x("HOST_REJECTED",`Identity must contain 1 to ${a} characters.`)},so=async i=>{i.kind!=="projects"&&we(i.projectId);let a=await ce({...F,type:"workspace-read",id:y(f),payload:i});if(!a||!("kind"in a)||!("state"in a)||a.kind!==i.kind)throw new x("HOST_REJECTED","Host did not return workspace data.");return a},io=async(i,a)=>{i.kind!=="projects"&&we(i.projectId);let b=y(f);Z.set(b,a);try{await j({...F,type:"workspace-subscribe",id:y(f),payload:{subscriptionId:b,query:i}})}catch(k){throw Z.delete(b),re||Ee({...F,type:"workspace-unsubscribe",id:y(f),payload:{subscriptionId:b}}),k}return()=>{!Z.delete(b)||re||Ee({...F,type:"workspace-unsubscribe",id:y(f),payload:{subscriptionId:b}})}},Cs=async(i,a)=>{i.kind==="session"&&we(i.sessionId),i.kind==="project"&&we(i.projectId);let b=y(f);fe.set(b,a);try{await j({...F,type:"shells-subscribe",id:y(f),payload:{subscriptionId:b,scope:i}})}catch(k){throw fe.delete(b),re||Ee({...F,type:"shells-unsubscribe",id:y(f),payload:{subscriptionId:b}}),k}return()=>{!fe.delete(b)||re||Ee({...F,type:"shells-unsubscribe",id:y(f),payload:{subscriptionId:b}})}},Rt=async i=>{if("key"in i&&(i.key.length===0||i.key.length>128))throw new x("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(i.op==="set"&&!ot(i.value))throw new x("HOST_REJECTED","Storage values must be JSON.");if(i.op==="set"&&new TextEncoder().encode(JSON.stringify(i.value)).length>65536)throw new x("HOST_REJECTED","Storage value exceeds 64 KiB.");if(i.scope==="device"&&_?.features?.deviceStorage!==!0)throw new x("UNSUPPORTED","This host does not support device storage.");let a=await ce({...F,type:"storage",id:y(f),payload:i});if(!a||!("storage"in a)||a.op!==i.op)throw new x("HOST_REJECTED","Host did not return storage data.");return a},Pn=(i,a)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===i)?Promise.reject(new x("UNSUPPORTED","This host does not support popovers.")):j({...F,type:"popover-close",id:y(f),payload:a?{id:i,reason:a}:{id:i}}),Dn=(i,a)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===i)?Promise.reject(new x("UNSUPPORTED","This host does not support popovers.")):j({...F,type:"popover-anchor",id:y(f),payload:{id:i,active:a}});return t.addEventListener("keydown",Mn,!0),t.addEventListener("pointerover",Ot),t.addEventListener("pointermove",Ot),t.addEventListener("pointerout",Un),t.addEventListener("focus",Nn),t.addEventListener("blur",Ln),{onAction:i=>(oe=i,()=>{oe===i&&(oe=null)}),listProjects:async()=>{let i=await so({kind:"projects"});if(i.kind!=="projects")throw new x("HOST_REJECTED","Expected projects.");return i},listWorktrees:async i=>{let a=await so({kind:"worktrees",projectId:i});if(a.kind!=="worktrees")throw new x("HOST_REJECTED","Expected worktrees.");return a},listSessions:async i=>{let a=await so({kind:"sessions",projectId:i});if(a.kind!=="sessions")throw new x("HOST_REJECTED","Expected sessions.");return a},onProjects:i=>io({kind:"projects"},a=>{a.kind==="projects"&&i(a)}),onWorktrees:(i,a)=>io({kind:"worktrees",projectId:i},b=>{b.kind==="worktrees"&&a(b)}),onSessions:(i,a)=>io({kind:"sessions",projectId:i},b=>{b.kind==="sessions"&&a(b)}),onRunningShells:(i,a)=>Cs(i,a),readShellOutput:async(i,a)=>{we(i,128);let b=a?.cursor;if(b!==void 0&&(!Number.isInteger(b)||b<0))throw new x("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let k=a?.tailBytes;if(k!==void 0&&(!Number.isInteger(k)||k<1||k>65536))throw new x("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let G=await ce({...F,type:"shell-output",id:y(f),payload:{shellId:i,cursor:b,tailBytes:k}});if(!G||typeof G.output!="string"||!Number.isFinite(G.cursor))throw new x("HOST_REJECTED","Host did not return shell output.");return G},stopShell:async i=>{if(we(i,128),(await ce({...F,type:"shell-stop",id:y(f),payload:{shellId:i}}))?.stopped!==!0)throw new x("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async i=>{we(i),await j({...F,type:"open-session",id:y(f),payload:{sessionId:i}})},storage:{get:async(i,a)=>{let b=Dt(a),k={op:"get",key:i};b&&(k.scope=b);let D=await Rt(k);return D.op==="get"&&D.found?D.value:void 0},set:async(i,a,b)=>{let k=Dt(b),D={op:"set",key:i,value:a};k&&(D.scope=k),await Rt(D)},delete:async(i,a)=>{let b=Dt(a),k={op:"delete",key:i};b&&(k.scope=b),await Rt(k)},keys:async i=>{let a=Dt(i),b={op:"keys"};a&&(b.scope=a);let k=await Rt(b);if(k.op!=="keys")throw new x("HOST_REJECTED","Expected storage keys.");return k.keys}},onReady:i=>(r.add(i),_&&i(_),()=>{r.delete(i)}),onDirectory:i=>(c.add(i),_&&i(_.directory),()=>{c.delete(i)}),onSession:i=>(l.add(i),_&&i(_.session),()=>{l.delete(i)}),onSessionLifecycle:i=>(p.add(i),se&&i(se),()=>{p.delete(i)}),onConnection:i=>(m.add(i),_&&i(_.connection),()=>{m.delete(i)}),onSettings:i=>(E.add(i),_&&i(_.settings),()=>{E.delete(i)}),onItem:i=>(O.add(i),_&&i(_.item),()=>{O.delete(i)}),onBlock:i=>(h.add(i),_?.block&&i(_.block),()=>{h.delete(i)}),onServiceEvent:i=>(R.add(i),()=>{R.delete(i)}),onStatusControl:i=>(P.add(i),()=>{P.delete(i)}),onPopoverClosed:i=>(Y.add(i),()=>{Y.delete(i)}),setStatusControls:i=>_?.features?.statusControls!==!0?Promise.reject(new x("UNSUPPORTED","This host does not support status controls.")):Bn(i)?j({...F,type:"status-controls",id:y(f),payload:{controls:i}}):Promise.reject(new x("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:i=>_?.features?.popovers!==!0?Promise.reject(new x("UNSUPPORTED","This host does not support popovers.")):fo(i)?j({...F,type:"popover-open",id:y(f),payload:i}):Promise.reject(new x("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Pn,setPopoverAnchorActive:Dn,onResolve:i=>(C=i,()=>{C===i&&(C=null)}),toast:i=>{let a=i.message.trim();return!a||a.length>vt?Promise.reject(new x("HOST_REJECTED",`Toast message must contain 1 to ${vt} characters.`)):i.copy&&i.copy!==!0&&(!i.copy.text.length||i.copy.text.length>It)?Promise.reject(new x("HOST_REJECTED",`Toast copy text must contain 1 to ${It} characters.`)):j({channel:U,v:1,type:"toast",id:y(f),payload:{...i,message:a}})},openUrl:i=>j({channel:U,v:1,type:"open-url",id:y(f),payload:{url:i}}),openCommit:i=>So(i)?j({channel:U,v:1,type:"open-commit",id:y(f),payload:{sha:i}}):Promise.reject(new x("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:i=>j({channel:U,v:1,type:"block-answer",id:y(f),payload:{text:i.trim().slice(0,_o)}}),openSurface:i=>j({channel:U,v:1,type:"open-surface",id:y(f),payload:{surfaceId:i}}),writeClipboard:i=>j({channel:U,v:1,type:"clipboard-write",id:y(f),payload:{text:i}}),compose:i=>j({channel:U,v:1,type:"compose",id:y(f),payload:i}),attach:i=>j({channel:U,v:1,type:"attach",id:y(f),payload:nt(i)}),startSession:async i=>{i.projectId!==void 0&&we(i.projectId);let a=i.worktree;a&&a!==!0&&(a.kind==="existing"?we(a.directory):(a.name!==void 0&&we(a.name,200),a.baseBranch!==void 0&&we(a.baseBranch,200)));let b=await ce({channel:U,v:1,type:"start-session",id:y(f),payload:bo(i)},e.requestTimeoutMs??18e4);if(!mo(b))throw new x("HOST_REJECTED","Host did not return a session.");return b},prompt:i=>ce({channel:U,v:1,type:"prompt",id:y(f),payload:xo(i)}).then(a=>{if(!To(a))throw new x("HOST_REJECTED","Host did not return a prompt result.");return a}),sessionLink:i=>j({channel:U,v:1,type:"session-link",id:y(f),payload:nt(i)}),close:()=>j({channel:U,v:1,type:"close",id:y(f)}),oauthStart:()=>j({channel:U,v:1,type:"oauth-start",id:y(f)}),oauthDisconnect:()=>j({channel:U,v:1,type:"oauth-disconnect",id:y(f)}),request:i=>(Nt(i.path)?ce({channel:U,v:1,type:"request",id:y(f),payload:i}):mr()).then(a=>{if(!Lt(a))throw new x("HOST_REJECTED","Host request result was empty.");return a}),serviceRequest:i=>(Nt(i.path)?ce({channel:U,v:1,type:"service-request",id:y(f),payload:i}):mr()).then(a=>{if(!Lt(a))throw new x("HOST_REJECTED","Host service request result was empty.");return a}),serviceStatus:()=>ce({channel:U,v:1,type:"service-status",id:y(f)}).then(i=>{if(!Ro(i))throw new x("HOST_REJECTED","Host did not return service status.");return i}),readFile:i=>(rt(i)?ce({channel:U,v:1,type:"file-read",id:y(f),payload:{path:i}}):Pt()).then(a=>{if(!yo(a))throw new x("HOST_REJECTED","Host did not return file content.");return a}),writeFile:(i,a)=>rt(i)?a.length>Ct?Promise.reject(new x("FILE_TOO_LARGE",`Content is over ${Ct} characters.`)):ce({channel:U,v:1,type:"file-write",id:y(f),payload:{path:i,content:a}}).then(b=>{if(!vo(b))throw new x("HOST_REJECTED","Host did not confirm the write.");return b}):Pt(),listDir:i=>(rt(i)?ce({channel:U,v:1,type:"file-list",id:y(f),payload:{path:i}}):Pt()).then(a=>{if(!Io(a))throw new x("HOST_REJECTED","Host did not return directory entries.");return a}),stat:i=>(rt(i)?ce({channel:U,v:1,type:"file-stat",id:y(f),payload:{path:i}}):Pt()).then(a=>{if(!wo(a))throw new x("HOST_REJECTED","Host did not return file status.");return a}),generate:i=>{let a=i.prompt.trim(),b=i.system?.trim();if(a.length===0||a.length>Mt)return Promise.reject(new x("HOST_REJECTED",`Prompt must be 1 to ${Mt} characters.`));if(b!==void 0&&(b.length===0||b.length>Ut))return Promise.reject(new x("HOST_REJECTED",`System prompt must be 1 to ${Ut} characters.`));let k=i.maxOutputTokens===void 0?void 0:Math.min(ho,Math.max(1,Math.floor(i.maxOutputTokens)));if(k!==void 0&&!Number.isFinite(k))return Promise.reject(new x("HOST_REJECTED","maxOutputTokens must be a number."));let D={prompt:a};return b!==void 0&&(D.system=b),k!==void 0&&(D.maxOutputTokens=k),ce({channel:U,v:1,type:"generate",id:y(f),payload:D},e.requestTimeoutMs??ko).then(G=>{if(!Co(G))throw new x("HOST_REJECTED","Host did not return generated text.");return G})},onLateGenerateResult:i=>{ae.add(i);for(let a of ge.splice(0))H([i],a);return vn(),()=>{ae.delete(i)}},openMicrophone:ws,setBadge:i=>j({channel:U,v:1,type:"badge",id:y(f),payload:{count:Ao(i)}}),setHeight:i=>j({channel:U,v:1,type:"resize",id:y(f),payload:{height:Oo(i)}}),onFileOpen:i=>(de.add(i),B||(B=!0,t.addEventListener("keydown",Cn,!0)),M&&i(M),()=>{de.delete(i)}),onFileSnapshot:i=>(L=i,()=>{L===i&&(L=null)}),onFileSaved:i=>(I.add(i),()=>{I.delete(i)}),reportFileChange:i=>no({...F,type:"file-change",payload:{dirty:i.dirty,edited:i.edited}}),requestFileSave:wn,reportFileUnsupported:()=>no({...F,type:"file-unsupported"}),dispose:()=>{for(let i of Z.keys())Ee({...F,type:"workspace-unsubscribe",id:y(f),payload:{subscriptionId:i}});Z.clear();for(let i of fe.keys())Ee({...F,type:"shells-unsubscribe",id:y(f),payload:{subscriptionId:i}});fe.clear(),he&&(ro(),he.release(),he=null),re=!0,C=null,oe=null,L=null,de.clear(),I.clear(),B&&t.removeEventListener("keydown",Cn,!0),t.removeEventListener("message",In),t.removeEventListener("keydown",Mn,!0),t.removeEventListener("pointerover",Ot),t.removeEventListener("pointermove",Ot),t.removeEventListener("pointerout",Un),t.removeEventListener("focus",Nn),t.removeEventListener("blur",Ln);for(let i of ee.values())clearTimeout(i.timer),i.reject(new x("HOST_UNAVAILABLE","Host client was disposed."));ee.clear(),r.clear(),c.clear(),l.clear(),p.clear(),m.clear(),E.clear(),O.clear(),h.clear(),R.clear(),P.clear(),Y.clear(),ae.clear(),ge.length=0}}};var br=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ca=new Set(br);var Bs=10*6e4;var Fs=10*6e4;var Ks=10*6e4;var zs=10*6e4;var xr=["none","agent","user"];var Ua=new Set(xr);var Ws=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],js=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Ar=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,n]of Ws)t.style.setProperty(o,e.tokens[n]);for(let[o,n,r]of js){let c=e.tokens[r]??"";t.style.setProperty(o,c),t.style.setProperty(n,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Go=(e,t)=>{Ar(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var qs={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},V=(e,t)=>`var(--${e}, var(--oc-${qs[e]}, ${t}))`,Ge=V("surface-background","transparent"),Ht=V("surface-elevated","transparent"),st=V("surface-elevated-foreground","inherit"),ke=V("surface-foreground","inherit"),K=V("surface-muted-foreground","gray"),Js=V("surface-muted","transparent"),Je=V("interactive-border","currentColor"),_e=V("interactive-hover","transparent"),Ye=V("interactive-active","transparent"),Ho=V("interactive-selection","transparent"),$o=V("interactive-selection-foreground","inherit"),De=V("primary","currentColor"),Vo=V("primary-text","inherit"),Xo=V("error-text","inherit"),Ys=V("font-sans","inherit"),Bo=V("font-mono","monospace"),vr=V("radius","9px"),Fo=`calc(${vr} - 2px)`,Or=`calc(${vr} - 4px)`,z=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Rr=`background-image: linear-gradient(${_e}, ${_e});`,Ko=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,zo="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",yr="box-shadow: var(--oc-sdk-lit);",Wo=`inset 0 0.5px 0 0 ${z(ke,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Zs=`
:root {
  --oc-sdk-edge: ${z(ke,16)};
  --oc-sdk-field-bg: ${Ht};
  --oc-sdk-raised-bg: ${Ge};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${z(ke,14)};
  --oc-sdk-field-bg: ${z(Ge,50,Ht)};
  --oc-sdk-raised-bg: ${Ht};
  --oc-sdk-field-lift: ${Wo};
  --oc-sdk-raised-lift: ${Wo};
  --oc-sdk-lit: ${Wo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Gt=e=>{let t=V(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${V(`${e}-text`,"inherit")}; }`},u=e=>`calc(${e}rem / 14)`,Qs=`
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
`,Ir=`${Zs}
.oc-sdk { color: ${ke}; font-family: ${Ys}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Rr} }
.oc-sdk-mono { font-family: ${Bo}; }
.oc-sdk-muted { color: ${K}; }
${Gt("success")}${Gt("warning")}${Gt("error")}${Gt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${De}; --oc-sdk-tone-text: ${Vo}; }

.oc-sdk-btn { border-radius: ${Fo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Or}; }
.oc-sdk-btn[data-variant="default"] { color: ${Vo}; background: ${z(De,10,Ge)}; border-color: ${z(De,12)}; ${yr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${z(De,16,Ge)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${z(De,22,Ge)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Js}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ye}, ${Ye}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${st}; ${zo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ye}, ${Ye}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${_e}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ye}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${V("status-error","red")}; color: ${Xo}; background: ${z("var(--oc-sdk-tone)",7,Ge)}; border-color: ${z("var(--oc-sdk-tone)",12)}; ${yr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${z("var(--oc-sdk-tone)",9,Ge)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${z("var(--oc-sdk-tone)",11,Ge)}; box-shadow: none; }

.oc-sdk-field-note { color: ${K}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Xo}; }
.oc-sdk-input { border-radius: ${Fo}; background: var(--oc-sdk-field-bg); color: ${st}; ${Ko("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${K}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Ko(z(ke,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Ko(V("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Bo}; }

.oc-sdk-search-icon { color: ${K}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${De}; }
.oc-sdk-search-clear { border-radius: ${Or}; color: ${K}; }
.oc-sdk-search-clear:hover { background: ${_e}; color: ${ke}; }

.oc-sdk-trigger { border-radius: ${Fo}; background: var(--oc-sdk-raised-bg); color: ${st}; ${zo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ye}, ${Ye}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${K}; }
.oc-sdk-trigger-chevron { color: ${K}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${st}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ht}; background-clip: padding-box; color: ${st}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${_e}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ho}; color: ${$o}; }
.oc-sdk-option-check { color: ${ke}; }
.oc-sdk-option[data-destructive="true"] { color: ${Xo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${z(V("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${K}; }
.oc-sdk-popup-empty { color: ${K}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Je}; border-radius: 4px; color: ${ke}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${z(ke,60,Je)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Je}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Ge}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${De}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Rr} }
.oc-sdk-check-desc { color: ${K}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${z(ke,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${K}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ke}; }
.oc-sdk-tab[aria-selected="true"] { color: ${$o}; background: ${Ho}; border-color: ${Je}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${st}; background: var(--oc-sdk-raised-bg); ${zo} }
.oc-sdk-tab-count { color: ${K}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${z(ke,6)}; color: ${K}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${_e}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ho}; color: ${$o}; }
.oc-sdk-row-lead { font-family: ${Bo}; color: ${K}; }
.oc-sdk-row-sub { color: ${K}; }
.oc-sdk-row-meta { color: ${K}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${K}; }

.oc-sdk-empty-body { color: ${K}; }

.oc-sdk-spinner { color: ${K}; }
.oc-sdk-spinner-ring { border-color: ${Je}; border-top-color: ${De}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${K}; }

.oc-sdk-separator { color: ${K}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${z(Je,40)}; }

.oc-sdk-progress-label { color: ${K}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${z(ke,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${De}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${V("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${V("success-text","inherit")}; }

.oc-sdk-text a { color: ${Vo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${z(Je,60)}; }
`,q=`
${ao}
${Qs}
${Ir}`;var wr="oc-sdk-ui-style",ze=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},J=e=>{let t=document.getElementById(wr);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}co(document);let o=document.createElement("style");o.id=wr,o.textContent=e,document.head.appendChild(o)},w=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},Re=e=>{let t=w("button",e);return t.type="button",t},pe=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},Me=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},Cr=(e,t)=>{let o=n=>{n.target instanceof Node&&e.contains(n.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var ei=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ue=(e,t)=>{J(q);let o=t,n=Re("oc-sdk oc-sdk-btn"),r=ei(),c=document.createElement("span");n.append(c),e.append(n);let l=()=>{n.dataset.variant=o.variant??"default",n.dataset.size=o.size??"default",n.disabled=!!o.disabled||!!o.loading,n.dataset.loading=o.loading?"true":"false",n.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&r.parentNode!==n?n.prepend(r):!o.loading&&r.parentNode===n&&r.remove(),pe(c,o.label)},p=()=>{o.disabled||o.loading||o.onClick()};return n.addEventListener("click",p),l(),{update:m=>{o={...o,...m},l()},dispose:()=>{n.removeEventListener("click",p),n.remove()}}};var Mr="http://www.w3.org/2000/svg",ti={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ne=(e,t,o)=>{let n=document.createElementNS(Mr,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.style.width=u(t),n.style.height=u(t),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),o&&n.setAttribute("class",o);let r=document.createElementNS(Mr,"path");return r.setAttribute("d",ti[e]),n.append(r),n};var jo=(e,t)=>{J(q);let o=t,n=w("div","oc-sdk oc-sdk-search"),r=w("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let c=Re("oc-sdk-search-clear");c.append(Ne("close",14)),c.tabIndex=-1,n.append(Ne("search",16,"oc-sdk-search-icon"),r,c),e.append(n);let l=()=>{let O=o.placeholder??"Search";Me(r,"placeholder",O),r.setAttribute("aria-label",o.label??O),c.setAttribute("aria-label","Clear search"),r.value!==o.value&&(r.value=o.value),n.dataset.active=o.value.trim()===""?"false":"true"},p=()=>{o.value!==""&&o.onChange(""),r.focus()},m=()=>{o.onChange(r.value)},E=O=>{O.key==="Escape"&&r.value!==""&&(O.preventDefault(),p())};return r.addEventListener("input",m),r.addEventListener("keydown",E),c.addEventListener("click",p),l(),o.autofocus&&r.focus(),{update:O=>{o={...o,...O},l()},dispose:()=>{r.removeEventListener("input",m),r.removeEventListener("keydown",E),c.removeEventListener("click",p),n.remove()}}};var He=(e,t="vertical")=>{let[o,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},We=(e,t,o)=>{let n=e.filter(m=>!m.disabled);if(n.length===0)return null;let r=n[0],c=n[n.length-1];if(o==="first"||!r||!c)return r?.id??null;if(o==="last")return c.id;let l=n.findIndex(m=>m.id===t);return l===-1?o==="next"?r.id:c.id:n[Math.min(n.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var Ur=(e,t)=>`${e}-${t??""}`,$t=(e,t,o,n)=>{let r=Re("oc-sdk-option");r.id=Ur(e,o.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=!!o.disabled,t==="option"&&r.setAttribute("aria-selected",o.selected?"true":"false"),r.dataset.destructive=o.destructive?"true":"false";let c=w("span","oc-sdk-option-label");if(c.textContent=o.label,r.append(c),o.hint){let l=w("span","oc-sdk-option-hint");l.textContent=o.hint,r.append(l)}if(t==="option"){r.dataset.mark="check";let l=w("span","oc-sdk-option-check");l.append(Ne("check",14)),r.append(l)}return r.addEventListener("pointerenter",n.hover),r.addEventListener("click",n.pick),r},Vt=(e,t,o,n)=>{let r=Ur(o,n);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===r?"true":"false");Me(t,"aria-activedescendant",n?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var oi=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let n=e.offsetHeight,r=window.innerHeight-o.bottom-8;n>r&&o.top-8>r&&(e.style.top=`${Math.max(8,Math.round(o.top-4-n))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},Xt=(e,t,o,n)=>{e.append(o),oi(o,t);let r=Cr(e,n),c=()=>{n()},l=p=>{p.target instanceof Node&&o.contains(p.target)||n()};return window.addEventListener("resize",c),window.addEventListener("scroll",l,!0),()=>{r(),window.removeEventListener("resize",c),window.removeEventListener("scroll",l,!0),o.remove()}};var Nr=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(n=>n.label.toLowerCase().includes(o)||n.id.toLowerCase().includes(o)):[...e]},ni=0,pt=(e,t)=>{J(q);let o=t,n=`oc-sdk-select-${ni+=1}`,r=w("div","oc-sdk oc-sdk-select"),c=w("span","oc-sdk-field-label");c.id=`${n}-label`;let l=Re("oc-sdk-trigger");l.setAttribute("aria-haspopup","listbox"),l.setAttribute("aria-labelledby",c.id);let p=w("span","oc-sdk-trigger-value");l.append(p,Ne("chevron",14,"oc-sdk-trigger-chevron")),r.append(c,l),e.append(r);let m="",E=null,O=null,h=w("div","oc-sdk oc-sdk-popup"),R=w("div","oc-sdk-popup-search"),P=w("input","oc-sdk-input");P.type="text",P.autocomplete="off",R.append(P);let Y=w("div");Y.setAttribute("role","listbox"),Y.tabIndex=-1,h.append(Y);let ae=()=>Nr(o.options,o.searchable?m:""),ge=()=>o.searchable?P:Y,C=f=>{E=f,Vt(Y,ge(),n,f)},oe=()=>{ze(Y);let f=ae();if(f.length===0){let _=w("div","oc-sdk-popup-empty");_.textContent="No matches",Y.append(_)}for(let _ of f)Y.append($t(n,"option",{..._,selected:_.id===o.value},{hover:()=>C(_.id),pick:()=>L(_.id)}));C(f.some(_=>_.id===E)?E:f[0]?.id??null)},de=()=>{let f=O;O=null,f?.(),m="",P.value="",l.setAttribute("aria-expanded","false")},I=()=>{O||o.disabled||(E=o.value,P.placeholder=o.searchPlaceholder??"Search",o.searchable?h.prepend(R):R.remove(),oe(),O=Xt(r,l,h,de),l.setAttribute("aria-expanded","true"),ge().focus())},L=f=>{de(),l.focus(),f!==o.value&&o.onChange(f)},M=()=>{O?de():I()},B=f=>{!O&&He(f)&&(f.preventDefault(),I())},ee=f=>{let _=He(f);_?(f.preventDefault(),C(We(ae(),E,_))):f.key==="Enter"?(f.preventDefault(),E&&L(E)):f.key==="Escape"?(f.preventDefault(),de(),l.focus()):o.searchable&&f.target!==P&&f.key.length===1&&!f.ctrlKey&&!f.metaKey&&P.focus()},Z=()=>{m=P.value,oe()},fe=f=>{O&&!(f.relatedTarget instanceof Node&&r.contains(f.relatedTarget))&&de()},re=()=>{pe(c,o.label),c.hidden=!o.label;let f=o.options.find(_=>_.id===o.value);pe(p,f?.label??o.placeholder??"Select"),p.dataset.empty=f?"false":"true",l.disabled=!!o.disabled,O&&oe()};return l.addEventListener("click",M),l.addEventListener("keydown",B),h.addEventListener("keydown",ee),P.addEventListener("input",Z),r.addEventListener("focusout",fe),re(),{update:f=>{o={...o,...f},re()},dispose:()=>{de(),l.removeEventListener("click",M),l.removeEventListener("keydown",B),h.removeEventListener("keydown",ee),P.removeEventListener("input",Z),r.removeEventListener("focusout",fe),r.remove()}}};var qo=(e,t)=>{J(q);let o=t,n=w("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let r=()=>{ze(n),n.dataset.track=o.trackBackground?"true":"false";for(let l of o.items){let p=Re("oc-sdk-tab");p.setAttribute("role","tab");let m=l.id===o.activeId;p.setAttribute("aria-selected",m?"true":"false"),p.tabIndex=m?0:-1,p.dataset.id=l.id;let E=w("span");if(E.textContent=l.label,p.append(E),l.count!==void 0){let O=w("span","oc-sdk-tab-count");O.textContent=String(l.count),p.append(O)}p.addEventListener("click",()=>{l.id!==o.activeId&&o.onChange(l.id)}),n.append(p)}},c=l=>{let p=He(l,"horizontal");if(!p)return;let m=We(o.items,o.activeId,p);if(m&&m!==o.activeId){l.preventDefault(),o.onChange(m);let E=n.querySelector(`[data-id="${CSS.escape(m)}"]`);E instanceof HTMLElement&&E.focus()}};return n.addEventListener("keydown",c),r(),{update:l=>{o={...o,...l},r()},dispose:()=>{n.removeEventListener("keydown",c),n.remove()}}};var Jo=(e,t)=>{Me(e,"data-tone",t&&t!=="neutral"?t:null)};var ri=e=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,Yo=(e,t)=>{J(q);let o=t,n=w("div","oc-sdk oc-sdk-progress"),r=w("div","oc-sdk-progress-label"),c=w("span"),l=w("span","oc-sdk-progress-value"),p=w("span"),m=Ne("check",14);l.append(m,p),r.append(c,l);let E=w("div","oc-sdk-progress-track");E.setAttribute("role","progressbar"),E.setAttribute("aria-valuemin","0"),E.setAttribute("aria-valuemax","100");let O=w("div","oc-sdk-progress-fill");E.append(O),n.append(r,E),e.append(n);let h=()=>{let R=ri(o.value);Jo(O,o.tone),O.style.transform=`scaleX(${R/100})`,E.setAttribute("aria-valuenow",String(R)),o.label?E.setAttribute("aria-label",o.label):E.removeAttribute("aria-label"),pe(c,o.label),pe(p,`${R}%`);let P=R===100&&(!o.tone||o.tone==="neutral");Me(n,"data-done",P?"true":null),m.style.display=P?"":"none",r.hidden=!o.label};return h(),{update:R=>{o={...o,...R},h()},dispose:()=>{n.remove()}}};var Lr=e=>e.filter(t=>!("separator"in t)),si=0,Zo=(e,t)=>{J(q);let o=t,n=`oc-sdk-menu-${si+=1}`,r=w("div","oc-sdk oc-sdk-menu");e.append(r);let c=w("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let l=null,p=null,m=Ue(r,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{l?R():P()}}),E=r.querySelector("button");E?.setAttribute("aria-haspopup","menu");let O=C=>{p=C,Vt(c,c,n,C)},h=()=>{ze(c);for(let C of o.items){if("separator"in C){let oe=w("div","oc-sdk-separator");oe.dataset.labeled="false",c.append(oe);continue}c.append($t(n,"menuitem",C,{hover:()=>O(C.id),pick:()=>Y(C.id)}))}O(Lr(o.items).some(C=>C.id===p)?p:null)},R=()=>{let C=l;l=null,C?.(),p=null,E?.setAttribute("aria-expanded","false")},P=()=>{l||!E||(h(),l=Xt(r,E,c,R),E.setAttribute("aria-expanded","true"),c.focus())},Y=C=>{R(),E?.focus(),o.onSelect(C)},ae=C=>{let oe=He(C);oe?(C.preventDefault(),O(We(Lr(o.items),p,oe))):C.key==="Enter"||C.key===" "?(C.preventDefault(),p&&Y(p)):C.key==="Escape"&&(C.preventDefault(),R(),E?.focus())},ge=C=>{l&&!(C.relatedTarget instanceof Node&&r.contains(C.relatedTarget))&&R()};return c.addEventListener("keydown",ae),r.addEventListener("focusout",ge),{update:C=>{o={...o,...C},m.update({label:o.label,variant:o.variant,size:o.size}),l&&h()},dispose:()=>{R(),c.removeEventListener("keydown",ae),r.removeEventListener("focusout",ge),m.dispose(),r.remove()}}};var ii=/^[a-z0-9][a-z0-9-]{0,63}$/,ai=new Set(["all","new"]),me=class extends Error{constructor(t){super(t),this.name="GroupFileError"}},ci=[{id:"macos-ui",name:"macOS UI",skillIds:["appkit-interop","swiftui-patterns","window-management","liquid-glass","view-refactor"]},{id:"macos-build",name:"macOS \u6784\u5EFA",skillIds:["build-run-debug","test-triage","swiftpm-macos","signing-entitlements","packaging-notarization","telemetry"]},{id:"reverse",name:"\u9006\u5411\u5DE5\u7A0B",skillIds:["reverse-engineering-unpacking","kuna-decompiler","reverse-engineer-anything"]},{id:"cloudflare",name:"Cloudflare",skillIds:["cloudflare","workers-best-practices","wrangler"]},{id:"video",name:"\u89C6\u9891",skillIds:["yichen-jianying-edit"]},{id:"browser",name:"\u6D4F\u89C8\u5668",skillIds:["browser-skill"]}],li=()=>ci.map(e=>({...e,skillIds:[...e.skillIds]})),Bt=e=>{let t=new Set(e.map(r=>r.id)),o=new Set(e.map(r=>r.name.trim().toLowerCase())),n=li().filter(r=>{let c=r.name.toLowerCase();return t.has(r.id)||o.has(c)?!1:(t.add(r.id),o.add(c),!0)});return{groups:[...e,...n],added:n}},Qo=(e,t,o)=>{let n=t+o;if(t<0||t>=e.length||n<0||n>=e.length)return[...e];let r=[...e],[c]=r.splice(t,1);return r.splice(n,0,c),r},Pr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new me("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E");let t=e;if(t.version!==1)throw new me("\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301");if(!Array.isArray(t.groups))throw new me("\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E");if(t.groups.length>50)throw new me("\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 50 \u4E2A");let o=[],n=new Set,r=new Set;for(let[c,l]of t.groups.entries()){if(!l||typeof l!="object"||Array.isArray(l))throw new me(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E`);let p=l;if(typeof p.id!="string"||!ii.test(p.id)||ai.has(p.id))throw new me(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548`);if(n.has(p.id))throw new me(`\u5206\u7EC4 ID \u91CD\u590D\uFF1A${p.id}`);let m=typeof p.name=="string"?p.name.trim():"";if(!m||m.length>40||/[\u0000-\u001f\u007f]/.test(m))throw new me(`\u7B2C ${c+1} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-40 \u4E2A\u5B57\u7B26`);let E=m.toLowerCase();if(r.has(E))throw new me(`\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A${m}`);if(!Array.isArray(p.skillIds))throw new me(`\u5206\u7EC4\u300C${m}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E`);if(p.skillIds.length>200)throw new me(`\u5206\u7EC4\u300C${m}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 200 \u4E2A`);let O=[],h=new Set;for(let R of p.skillIds){if(typeof R!="string"||!R||R.length>128)throw new me(`\u5206\u7EC4\u300C${m}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID`);h.has(R)||(h.add(R),O.push(R))}n.add(p.id),r.add(E),o.push({id:p.id,name:m,skillIds:O})}return{version:1,groups:o}};var di=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,pi=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return di(e);case"all":default:return!0}},en=(e,t,o)=>{let n=t.trim().toLowerCase();return n?[e.id,e.name,e.description,o?.nameZh??"",o?.descriptionZh??"",...e.warnings].join(" ").toLowerCase().includes(n):!0},Dr=(e,t)=>{let o=e.filter(n=>pi(n,t.stateFilter)&&en(n,t.query,t.getTranslation?.(n)));return t.sortMode==="tokens"?[...o].sort((n,r)=>r.estimatedTokens!==n.estimatedTokens?r.estimatedTokens-n.estimatedTokens:n.name.localeCompare(r.name,void 0,{sensitivity:"base"})||n.id.localeCompare(r.id)):o};var Ft=["\u4F60\u662F\u6280\u672F\u6587\u6863\u7FFB\u8BD1\u3002\u628A\u8F93\u5165\u7684\u6280\u80FD\u540D\u79F0\u548C\u63CF\u8FF0\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002","\u4FDD\u7559\u6280\u80FD ID\u3001\u547D\u4EE4\u3001\u6587\u4EF6\u8DEF\u5F84\u3001\u4EE3\u7801\u3001\u4EA7\u54C1\u540D\u548C\u6280\u672F\u4E13\u6709\u540D\u8BCD\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u4EE3\u7801\u5757\u3002","\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002",'\u53EA\u8F93\u51FA JSON\uFF1A{"items":[{"id":"\u539F\u6837 ID","nameZh":"\u4E2D\u6587\u540D\u79F0","descriptionZh":"\u4E2D\u6587\u63CF\u8FF0"}]}'].join(""),tn=e=>JSON.stringify(e.map(t=>({id:t.id,name:t.name,description:t.description}))),Kt=e=>{let t=e.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim(),o=t.indexOf("{"),n=t.lastIndexOf("}");if(o<0||n<=o)return[];t=t.slice(o,n+1);let r;try{r=JSON.parse(t)}catch{return[]}let c=r&&typeof r=="object"?r:null,l=Array.isArray(r)?r:Array.isArray(c?.items)?c.items:[],p=[];for(let m of l){if(!m||typeof m!="object")continue;let E=m;typeof E.id!="string"||!E.id||typeof E.nameZh!="string"||!E.nameZh.trim()||typeof E.descriptionZh=="string"&&p.push({id:E.id.slice(0,128),nameZh:E.nameZh.trim().slice(0,300),descriptionZh:E.descriptionZh.trim().slice(0,8e3)})}return p};function Gr(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",n=>{let r=n.target===e?t:n.target;if(!(r instanceof Element))return;r.hasAttribute("data-oc-scrolling")||r.setAttribute("data-oc-scrolling","");let c=o.get(r);c!==void 0&&clearTimeout(c),o.set(r,setTimeout(()=>{o.delete(r),r.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Hr=`:root {
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

.sk-translation-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-top: 2px;
}
.sk-translation-controls {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}
.sk-translation-tabs .oc-sdk-tabs {
  min-width: 0;
}
.sk-translation-progress {
  flex: 1 1 160px;
  min-width: 140px;
}
.sk-translation-progress:empty {
  display: none;
}
.sk-translation-status {
  color: var(--sk-muted);
  font-size: 11px;
  line-height: 1.5;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}
.sk-filter-slot,
.sk-sort-slot {
  min-width: 0;
}
.sk-filter-slot .oc-sdk-select,
.sk-sort-slot .oc-sdk-select {
  gap: 0;
}
.sk-filter-slot .oc-sdk-trigger,
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
  .sk-sort-slot .oc-sdk-trigger {
    width: auto;
    min-width: 116px;
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
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sk-filter-slot .oc-sdk-trigger,
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
    .sk-sort-slot .oc-sdk-trigger {
      width: auto;
      min-width: 116px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .sk-switch,
  .sk-switch .sk-thumb {
    transition: none;
  }
}
`;var $r=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var Vr=()=>typeof navigator<"u"&&navigator.language?navigator.language:"en",Xr=e=>(e??"").toLowerCase().startsWith("zh")?"zh":"en",Ei=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,n)=>Object.prototype.hasOwnProperty.call(t,n)?String(t[n]):o):e;var Br=(e,t=Vr())=>{let o=t||"en",n=Xr(o);return{t:(c,l)=>Ei(n==="zh"?c:e[c]??c,l),get language(){return n},get locale(){return o},setLocale(c){let l=c||Vr(),p=Xr(l);return o=l,p===n?!1:(n=p,!0)}}},on=e=>{document.documentElement.lang=e.language==="zh"?"zh-CN":"en"};var Fr={\u6280\u80FD\u5F00\u5173:"Skills",\u91CD\u65B0\u626B\u63CF:"Rescan",\u5168\u90E8\u542F\u7528:"Enable all",\u5168\u90E8\u5173\u95ED:"Disable all",\u6280\u80FD\u8BF4\u660E\u8BED\u8A00:"Skill description language",\u7FFB\u8BD1:"Translate",\u4E2D\u6587\u8BD1\u6587:"Chinese",\u7FFB\u8BD1\u672A\u8BD1\u9879:"Translate missing",\u8865\u5145\u7FFB\u8BD1:"Translate missing",\u539F\u6587:"Original",\u7F16\u8F91\u5206\u7EC4:"Edit groups",\u5173\u95ED\u7F16\u8F91:"Close editor","\u641C\u7D22\u540D\u79F0\u6216 ID":"Search name or ID","\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09":"Search name, description, or ID (press / to focus)",\u641C\u7D22\u6280\u80FD:"Search skills",\u72B6\u6001\u7B5B\u9009:"Filter by status",\u5168\u90E8\u72B6\u6001:"All states",\u5DF2\u542F\u7528:"Enabled",\u5DF2\u5173\u95ED:"Disabled",\u51B2\u7A81\u4E0E\u63D0\u793A:"Needs attention",\u6392\u5E8F\u65B9\u5F0F:"Sort order",\u9ED8\u8BA4\u987A\u5E8F:"Default order","Token \u964D\u5E8F":"Tokens (high to low)",\u91CD\u7F6E\u7B5B\u9009:"Reset filters","\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u6216\u8C03\u6574\u72B6\u6001\u7B5B\u9009\u6761\u4EF6\u3002":"Try another search term or change the status filter.","~{tokens} tok":"~{tokens} tok",\u5C55\u5F00\u8BF4\u660E:"Show more",\u6536\u8D77\u8BF4\u660E:"Show less",\u66F4\u591A\u64CD\u4F5C:"More actions",\u590D\u5236\u5165\u53E3\u8DEF\u5F84:"Copy entry path","\u590D\u5236\u6280\u80FD ID":"Copy skill ID",\u5355\u72EC\u91CD\u8BD1\u6B64\u9879:"Retranslate this skill","\u5DF2\u590D\u5236\u5165\u53E3\u8DEF\u5F84\u3002":"Copied entry path.","\u5DF2\u590D\u5236\u6280\u80FD ID\u3002":"Copied skill ID.","\u6B63\u5728\u91CD\u8BD1\u300C{name}\u300D\u2026":'Retranslating "{name}"\u2026',"\u5DF2\u66F4\u65B0\u300C{name}\u300D\u7684\u4E2D\u6587\u8BD1\u6587\u3002":'Updated Chinese translation for "{name}".',"\u672A\u80FD\u89E3\u6790\u300C{name}\u300D\u7684\u7FFB\u8BD1\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002":'Could not parse translation for "{name}". Try again.',"\u7B5B\u9009\u6210\u5458\u540D\u79F0\u6216 ID":"Filter member name or ID",\u6CA1\u6709\u5339\u914D\u7684\u6210\u5458:"No matching members","\u5DF2\u9009\u6B65\u9AA4\u987A\u5E8F\uFF08{count}\uFF09":"Step order ({count})","\u4E0A\u79FB\u300C{name}\u300D":'Move "{name}" up',"\u4E0B\u79FB\u300C{name}\u300D":'Move "{name}" down',"\u79FB\u9664\u300C{name}\u300D":'Remove "{name}"',"\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002":"Manages ~/.config/opencode/skills. Disabling renames a skill entry to .disabled; OpenCode no longer loads it and the model cannot see it.","\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002":"Shows only file skills in this directory. Enable all before disabling or uninstalling the extension; rescan after skills change.",\u5168\u90E8:"All",\u5206\u7EC4\u7B5B\u9009:"Filter by group",\u51B2\u7A81:"Conflict",\u6DF7\u5408:"Mixed",\u5173\u95ED:"Disabled",\u5F00\u542F:"Enabled",\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728:"Both entry and disabled file exist","\u540C ID \u591A\u4E2A\u5165\u53E3":"Multiple entries for one ID","frontmatter \u65E0\u6CD5\u89E3\u6790":"Frontmatter could not be parsed",\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A:"Entry file is empty",\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6:"Entry cannot be read",\u4EC5\u624B\u52A8\u8C03\u7528:"Manual invocation only","\u6CA1\u6709 description":"No description",\u542F\u7528\u5165\u53E3:"Active entry",\u505C\u7528\u5165\u53E3:"Disabled entry",\u5165\u53E3:"Entry",\u4FDD\u7559\u542F\u7528:"Keep enabled",\u4FDD\u7559\u5173\u95ED:"Keep disabled",\u51B2\u7A81\u68C0\u67E5:"Conflict check","{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A":"To resolve: {blocking} \xB7 Warnings: {warnings}","\u63D0\u793A\uFF08{count}\uFF09":"Warnings ({count})","\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enable only "{name}": other skills disabled: {count}.',\u786E\u8BA4:"Confirm",\u53D6\u6D88:"Cancel","\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills to enable: {count}.","\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills to disable: {count}.",\u786E\u8BA4\u542F\u7528:"Confirm enable",\u786E\u8BA4\u5173\u95ED:"Confirm disable","\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"Reading skills\u2026","\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002":"Skills not read yet.","\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002":"After disabling an entry document, OpenCode no longer discovers that skill.","\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65":"Model sees {advertised} of {total} \xB7 about {tokens} tokens/step","{count} \u4E2A\u5DF2\u5173\u95ED":"Disabled: {count}","{count} \u9879\u963B\u585E\u51B2\u7A81":"Blocking conflicts: {count}",\u65E0\u963B\u585E\u51B2\u7A81:"No blocking conflicts","{count} \u9879\u63D0\u793A":"Warnings: {count}",\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Skill directory cannot be read","{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002":"{parts}. Estimates exclude built-in and project skills.","\u7FFB\u8BD1 {done}/{total}\u2026":"Translating {done}/{total}\u2026","{translated}/{total} \u5DF2\u7FFB\u8BD1":"{translated}/{total} translated","\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587":'Click "Translate" to generate Chinese',"{count} \u4E2A\u6709\u4E2D\u6587":"Chinese available: {count}",\u65E0\u6280\u80FD:"No skills",\u6709\u51B2\u7A81:"Has conflicts",\u5168\u5F00:"All on",\u5168\u5173:"All off",\u90E8\u5206:"Partial","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}":"Cannot read group configuration: {error}",\u91CD\u65B0\u8BFB\u53D6:"Reload","\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002":'No groups yet. Click "Edit groups" to create one, or import example groups in the editor.',"\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002":"Enter a group name.","\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002":"Group names cannot exceed {count} characters.","\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002":'A group named "{name}" already exists.',"\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002":"A group needs at least one member.","\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002":'Group "{name}" saved.',"\u5DF2\u5220\u9664\u5206\u7EC4\u3002":"Group deleted.","\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002":"Every example group name or ID already exists; nothing to import.","\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002":"Example groups imported: {count}.",\u9009\u62E9\u5206\u7EC4:"Choose a group",\u65B0\u5EFA\u5206\u7EC4:"New group",\u540D\u79F0:"Name","\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1":"e.g. Daily development","\u6210\u5458\uFF08{count}\uFF09":"Members ({count})",\u5168\u9009:"Select all",\u6E05\u7A7A:"Clear","\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A":"Missing from the directory:",\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458:"Remove this missing member from the group",\u5220\u9664\u5206\u7EC4:"Delete group",\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4:"Import example groups",\u4FDD\u5B58\u66F4\u6539:"Save changes","\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002":'Delete group "{name}"? The skills themselves are not deleted.',\u672A\u547D\u540D:"Unnamed",\u786E\u8BA4\u5220\u9664:"Confirm delete","\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002":"Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.",\u786E\u8BA4\u5BFC\u5165:"Confirm import","\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002":"Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json.","\u5168\u90E8 {count}":"All {count}","\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026":"Reading groups\u2026","\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6":"Cannot read the group configuration. Repair the file and reload.",\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6:"Skills not read yet","{count} \u4E2A \xB7 {state}":"{state} \xB7 {count}","\u7F3A\u5931\uFF1A{names}":"Missing: {names}",\u542F\u7528\u6574\u7EC4:"Enable group",\u5173\u95ED\u6574\u7EC4:"Disable group",\u4EC5\u542F\u7528\u672C\u7EC4:"Enable only this group","\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4":"The group has missing skills. Resolve them before enabling only this group.","\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills enabled in "{name}": {count}.',"\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002":'Skills disabled in "{name}": {count}.',"\u5DF2\u542F\u7528\u300C{name}\u300D":'Enabled "{name}"',"\u5DF2\u5173\u95ED\u300C{name}\u300D":'Disabled "{name}"',"\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002":"The group has missing skills; nothing was run.","\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002":'Enabled only "{name}"; other skills disabled: {count}.',"\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D":'Enabled only "{name}"',\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6:"Directory cannot be read",\u5148\u5904\u7406\u51B2\u7A81:"Resolve conflicts first",\u5904\u7406\u51B2\u7A81:"Resolve conflict",\u90E8\u5206\u5165\u53E3\u5173\u95ED:"Some entries disabled",\u6A21\u578B\u53EF\u89C1:"Visible to the model",\u6A21\u578B\u4E0D\u53EF\u89C1:"Not visible to the model",\u5165\u53E3\u5DF2\u5173\u95ED:"Entry disabled","\u7B2C {step} \u6B65":"Step {step}","\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"No description; the model will not select it automatically.",\u6CA1\u6709\u53D1\u73B0\u6280\u80FD:"No skills found",\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD:"This group has no available skills",\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD:"No matching skills","\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002":"Check that ~/.config/opencode/skills exists, or rescan.","\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002":"Check whether the skills in this group were removed.","\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u3002":"Try a different search term.","\u8BFB\u53D6\u4E2D\u2026":"Reading\u2026","\u5DF2\u542F\u7528 {name}\u3002":"Enabled {name}.","\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002":"Disabled {name}; OpenCode will no longer discover it after the next scan.","\u5DF2\u542F\u7528 {name}":"Enabled {name}","\u5DF2\u5173\u95ED {name}":"Disabled {name}","\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002":"Kept the enabled entry{suffix}.","\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002":"Kept the disabled entry{suffix}.","\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}":"; the old disabled file was backed up to {path}",\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406:"Entry conflict resolved","\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002":"Skills enabled: {count}.","\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002":"Skills disabled: {count}.","\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002":"Chinese descriptions are up to date.","\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation finished, but saving the cache failed: {error}","\u4E0A\u6B21\u672A\u5B8C\u6210\u7684\u7FFB\u8BD1\u5DF2\u8865\u5168\u3002":"The previous unfinished translation was completed.","\u7FFB\u8BD1\u5DF2\u8865\u5168\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}":"Translation was completed, but saving the cache failed: {error}","\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002":'Translated: {done}; failed: {failed}. Click "Translate" to retry.',"\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002":"Translated skills: {done}.","\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002":"The service returned invalid skill directory information.","\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The service returned data in an unexpected format.","\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The translation cache format is invalid.","\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The service returned unrecognized data. Try again.","\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09":"Request failed ({status})","\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002":'Allow "Skills" to run its local service in Settings \u2192 Extensions.',"\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002":"The local service is not ready. Reload the extension and try again.","\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002":"The Skills extension is disabled. Enable it in extension settings.","\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The local service timed out. Try again.","\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002":"Allow the model capability in extension settings, or reinstall the extension.","\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002":"The current host or model does not support translation requests.","\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002":"Cannot connect to the local service. Check extension permissions.","\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The operation failed. Try again.","\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002":'The local service is too old. Disable and re-enable "Skills" in extension settings.',"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09":"Cannot read the skill directory: {error} ({path})",\u63D0\u4EA4\u5185\u5BB9\u8FC7\u5927:"The submitted content is too large.","\u8BF7\u6C42\u4E2D\u65AD\uFF0C\u8BF7\u91CD\u8BD5":"The request was interrupted. Try again.","\u8BF7\u6C42\u5185\u5BB9\u5FC5\u987B\u662F\u6709\u6548\u7684 JSON \u5BF9\u8C61":"The request body must be a valid JSON object.","\u7F3A\u5C11 {key}":"Missing {key}.","{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236":"{key} exceeds the length limit.","{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C":"{key} must be a boolean.","{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4":"{key} must be an array of skill IDs.","{key} \u6761\u76EE\u8FC7\u591A":"Too many {key} entries.","keep \u5FC5\u987B\u662F enabled \u6216 disabled":"keep must be enabled or disabled.","\u672C\u5730\u670D\u52A1\u5904\u7406\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":"The local service failed to process the request. Try again.","\u65E0\u6CD5\u8BFB\u53D6\u5206\u7EC4\u914D\u7F6E\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the group configuration. Check file permissions.","\u5206\u7EC4\u914D\u7F6E\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\uFF08~/.config/openchamber/skills-manager/groups.json\uFF09\u3002":"The group configuration is malformed; the original file was not changed (~/.config/openchamber/skills-manager/groups.json).","\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002":"The group configuration format is invalid.","\u4FDD\u5B58\u5206\u7EC4\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the group configuration. Check directory permissions.",\u6743\u9650\u4E0D\u8DB3:"Permission denied",\u8DEF\u5F84\u4E0D\u5B58\u5728:"Path does not exist",\u4E0D\u662F\u76EE\u5F55:"Not a directory",\u662F\u76EE\u5F55:"Is a directory",\u6587\u4EF6\u7CFB\u7EDF\u9519\u8BEF:"File system error","\u5165\u53E3\u6587\u4EF6\u8D85\u8FC7 2 MB":"The entry file exceeds 2 MB","\u505C\u7528\u5165\u53E3\u8D85\u8FC7 2 MB":"The disabled entry exceeds 2 MB",\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\u6587\u4EF6:"Could not read the entry file","\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}":"Could not read {directory}: {reason}","\u540C\u4E00\u76EE\u5F55\u540C\u65F6\u5B58\u5728\u542F\u7528\u548C\u505C\u7528\u5165\u53E3\uFF0C\u9700\u8981\u5148\u9009\u62E9\u4FDD\u7559\u54EA\u4E00\u4E2A\u3002":"Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.","\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}":"Could not read the entry: {reason}","frontmatter \u672A\u95ED\u5408\uFF0COpenCode \u53EF\u80FD\u8DF3\u8FC7\u6B64\u6280\u80FD\uFF1B\u5165\u53E3\u5F00\u5173\u4ECD\u53EF\u7528\u3002":"The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.","\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A\uFF0COpenCode \u4E0D\u4F1A\u52A0\u8F7D\u5B83\u3002":"The entry file is empty; OpenCode will not load it.","\u65E0\uFF08\u5165\u53E3\u4E0D\u53EF\u52A0\u8F7D\uFF09":"None (entry cannot be loaded)","\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002":"There are {count} entries with this ID; the effective entry is {winner}.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6807\u8BB0\u4E3A\u4EC5\u624B\u52A8\u8C03\u7528\uFF1B\u6A21\u578B\u770B\u4E0D\u5230\u5B83\u3002":"The entry is enabled but marked for manual invocation only; the model cannot see it.","\u5165\u53E3\u5DF2\u542F\u7528\uFF0C\u4F46\u6CA1\u6709 description\uFF1B\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002":"The entry is enabled but has no description; the model will not select it automatically.","\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}":"The target entry already exists: {path}","\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}":"The entry changed. Rescan: {path}","\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}":"Could not inspect the entry: {reason}","\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}":"Verification failed after renaming: {path}","\u6539\u540D\u5931\u8D25\uFF1A{reason}":"Rename failed: {reason}","\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}":"Could not read the skill directory: {reason}",\u672A\u77E5\u5165\u53E3:"Unknown entry","\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}":"Skill {id} was not found.","\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002":"Skill {id} has unresolved entry conflicts.","\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}":"Could not identify the disabled entry: {path}","\u540C\u4E00\u4E2A\u6280\u80FD\u4E0D\u80FD\u540C\u65F6\u542F\u7528\u548C\u5173\u95ED\u3002":"A skill cannot be enabled and disabled at the same time.","\u4E00\u6B21\u5904\u7406\u7684\u6280\u80FD\u8FC7\u591A\u3002":"Too many skills in one operation.","\u8FD8\u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\uFF0C\u4E0D\u80FD\u6279\u91CF\u64CD\u4F5C\u3002":"Unresolved entry conflicts remain; bulk operations are blocked.","\u6CA1\u6709\u627E\u5230\u8FD9\u4E2A\u5165\u53E3\u51B2\u7A81\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\u3002":"This entry conflict was not found. Rescan.","\u65E0\u6CD5\u8BFB\u53D6\u7FFB\u8BD1\u7F13\u5B58\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u6743\u9650\u3002":"Could not read the translation cache. Check file permissions.","\u7FFB\u8BD1\u7F13\u5B58\u6587\u4EF6\u635F\u574F\uFF1B\u539F\u6587\u4EF6\u672A\u4FEE\u6539\u3002":"The translation cache is malformed; the original file was not changed.","\u7FFB\u8BD1\u7F13\u5B58\u6761\u76EE\u8FC7\u591A\u3002":"The translation cache has too many entries.","\u4FDD\u5B58\u7FFB\u8BD1\u7F13\u5B58\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u76EE\u5F55\u6743\u9650\u3002":"Could not save the translation cache. Check directory permissions.",\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E:"The group configuration format is invalid.",\u5206\u7EC4\u914D\u7F6E\u7248\u672C\u4E0D\u53D7\u652F\u6301:"The group configuration version is not supported.",\u5206\u7EC4\u5217\u8868\u683C\u5F0F\u4E0D\u6B63\u786E:"The group list format is invalid.","\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":"At most {count} groups are allowed.","\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E":"Group {index} has an invalid format.","\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548":"Group {index} has an invalid ID.","\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}":"Duplicate group ID: {id}","\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26":"Group {index} names must be 1\u2013{max} characters.","\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}":"Duplicate group name: {name}","\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E":'The members of group "{name}" have an invalid format.',"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A":'Group "{name}" cannot have more than {count} members.',"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID":'Group "{name}" contains an invalid skill ID.'},Ze=Br(Fr),{t:_i}=Ze,mi=[{pattern:/^缺少 (.+)$/,template:"\u7F3A\u5C11 {key}",values:e=>({key:e[1]})},{pattern:/^(.+) 长度超出限制$/,template:"{key} \u957F\u5EA6\u8D85\u51FA\u9650\u5236",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是布尔值$/,template:"{key} \u5FC5\u987B\u662F\u5E03\u5C14\u503C",values:e=>({key:e[1]})},{pattern:/^(.+) 必须是技能 ID 数组$/,template:"{key} \u5FC5\u987B\u662F\u6280\u80FD ID \u6570\u7EC4",values:e=>({key:e[1]})},{pattern:/^(.+) 条目过多$/,template:"{key} \u6761\u76EE\u8FC7\u591A",values:e=>({key:e[1]})},{pattern:/^无法读取 (.+)：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6 {directory}\uFF1A{reason}",values:e=>({directory:e[1],reason:e[2]})},{pattern:/^无法读取入口：(.+)$/,template:"\u65E0\u6CD5\u8BFB\u53D6\u5165\u53E3\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^同 ID 有 (\d+) 个入口；生效入口：(.+)。$/,template:"\u540C ID \u6709 {count} \u4E2A\u5165\u53E3\uFF1B\u751F\u6548\u5165\u53E3\uFF1A{winner}\u3002",values:e=>({count:e[1],winner:e[2]})},{pattern:/^目标入口已存在：(.+)$/,template:"\u76EE\u6807\u5165\u53E3\u5DF2\u5B58\u5728\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^入口已变化，请重新扫描：(.+)$/,template:"\u5165\u53E3\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^检查入口失败：(.+)$/,template:"\u68C0\u67E5\u5165\u53E3\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^改名后校验失败：(.+)$/,template:"\u6539\u540D\u540E\u6821\u9A8C\u5931\u8D25\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^改名失败：(.+)$/,template:"\u6539\u540D\u5931\u8D25\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^技能目录无法读取：(.+)$/,template:"\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{reason}",values:e=>({reason:e[1]})},{pattern:/^没有找到技能 (.+)$/,template:"\u6CA1\u6709\u627E\u5230\u6280\u80FD {id}",values:e=>({id:e[1]})},{pattern:/^技能 (.+) 有未解决的入口冲突。$/,template:"\u6280\u80FD {id} \u6709\u672A\u89E3\u51B3\u7684\u5165\u53E3\u51B2\u7A81\u3002",values:e=>({id:e[1]})},{pattern:/^无法识别停用入口：(.+)$/,template:"\u65E0\u6CD5\u8BC6\u522B\u505C\u7528\u5165\u53E3\uFF1A{path}",values:e=>({path:e[1]})},{pattern:/^分组不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({count:e[1]})},{pattern:/^第 (\d+) 个分组格式不正确$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({index:e[1]})},{pattern:/^第 (\d+) 个分组的 ID 无效$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u7684 ID \u65E0\u6548",values:e=>({index:e[1]})},{pattern:/^分组 ID 重复：(.+)$/,template:"\u5206\u7EC4 ID \u91CD\u590D\uFF1A{id}",values:e=>({id:e[1]})},{pattern:/^第 (\d+) 个分组名称需为 1-(\d+) 个字符$/,template:"\u7B2C {index} \u4E2A\u5206\u7EC4\u540D\u79F0\u9700\u4E3A 1-{max} \u4E2A\u5B57\u7B26",values:e=>({index:e[1],max:e[2]})},{pattern:/^分组名称重复：(.+)$/,template:"\u5206\u7EC4\u540D\u79F0\u91CD\u590D\uFF1A{name}",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员格式不正确$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u683C\u5F0F\u4E0D\u6B63\u786E",values:e=>({name:e[1]})},{pattern:/^分组「(.+)」的成员不能超过 (\d+) 个$/,template:"\u5206\u7EC4\u300C{name}\u300D\u7684\u6210\u5458\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A",values:e=>({name:e[1],count:e[2]})},{pattern:/^分组「(.+)」含无效的技能 ID$/,template:"\u5206\u7EC4\u300C{name}\u300D\u542B\u65E0\u6548\u7684\u6280\u80FD ID",values:e=>({name:e[1]})}],$e=(e,t=_i)=>{if(e==null||!/[\u4e00-\u9fff]/.test(e))return e??null;if(Object.prototype.hasOwnProperty.call(Fr,e))return t(e);for(let o of mi){let n=e.match(o.pattern);if(n){let r=o.values(n),c=Object.fromEntries(Object.entries(r).map(([l,p])=>[l,$e(p,t)??p]));return t(o.template,c)}}return e};var{t:s}=Ze,ue=Do({requestTimeoutMs:3e4}),ns=document.querySelector("#root");if(!ns)throw new Error("Missing #root");Gr(document);var rs=document.createElement("style");rs.textContent=$r+Hr;document.head.append(rs);var d=(e,t="",o)=>{let n=document.createElement(e);return n.className=t,o!==void 0&&(n.textContent=o),n},ve=class extends Error{code;conflicts;constructor(t,o,n){super(t),this.name="ServiceError",this.code=o,this.conflicts=n}},Ti=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",Si=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",ut=(e,t="")=>typeof e=="string"?e:t,Kr=e=>typeof e=="string"&&e.length>0?e:null,Yt=e=>e===!0,ss=e=>typeof e=="number"&&Number.isFinite(e)?e:0,zr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],_n=e=>{if(!e||typeof e!="object")return null;let t=e;return!Si(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:ut(t.message,s("\u51B2\u7A81")),activePath:Kr(t.activePath),disabledPath:Kr(t.disabledPath),blocking:Yt(t.blocking)}},gi=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!Ti(t.state)?null:{id:t.id,name:ut(t.name,t.id),description:ut(t.description),state:t.state,advertised:Yt(t.advertised),autoInvokeOff:Yt(t.autoInvokeOff),activePaths:zr(t.activePaths),disabledPaths:zr(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(_n).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:ss(t.estimatedTokens),contentHash:ut(t.contentHash)}},hi=e=>{if(!e||typeof e!="object")throw new ve(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6280\u80FD\u76EE\u5F55\u4FE1\u606F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;return{path:ut(t.path),exists:Yt(t.exists),error:typeof t.error=="string"?t.error:null}},et=e=>{if(!e||typeof e!="object")throw new ve(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new ve(s("\u670D\u52A1\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o=t.skills.map(gi).filter(l=>l!==null),n=Array.isArray(t.conflicts)?t.conflicts.map(_n).filter(l=>l!==null):o.flatMap(l=>l.conflicts),r=n.filter(l=>l.blocking).length,c={total:o.length,advertised:o.filter(l=>l.advertised).length,disabled:o.filter(l=>l.state==="disabled").length,blockingConflicts:r,warnings:n.length-r,estimatedTokens:o.reduce((l,p)=>l+p.estimatedTokens,0)};return{skills:o,conflicts:n,summary:c,root:hi(t.root),scannedAt:ss(t.scannedAt)}},ki=()=>({version:1,locale:"zh-CN",entries:{}}),is=e=>{if(!e||typeof e!="object")throw new ve(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let t=e;if(t.version!==1||t.locale!=="zh-CN"||!t.entries||typeof t.entries!="object"||Array.isArray(t.entries))throw new ve(s("\u7FFB\u8BD1\u7F13\u5B58\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[]);let o={};for(let[n,r]of Object.entries(t.entries)){if(!r||typeof r!="object")continue;let c=r;typeof c.hash!="string"||typeof c.nameZh!="string"||typeof c.descriptionZh!="string"||typeof c.updatedAt!="number"||(o[n]={hash:c.hash,nameZh:c.nameZh.trim(),descriptionZh:c.descriptionZh.trim(),updatedAt:c.updatedAt})}return{version:1,locale:"zh-CN",entries:o}},Qt=e=>{try{return Pr(e).groups}catch(t){throw new ve(t instanceof Error?$e(t.message)??t.message:s("\u5206\u7EC4\u914D\u7F6E\u683C\u5F0F\u4E0D\u6B63\u786E\u3002"),"parse",[])}},xe=async(e,t,o)=>{let n=await ue.serviceRequest({method:e,path:t,...o===void 0?{}:{body:JSON.stringify(o)}}),r;try{r=JSON.parse(n.body)}catch{throw new ve(s("\u670D\u52A1\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BC6\u522B\u7684\u6570\u636E\uFF0C\u8BF7\u91CD\u8BD5\u3002"),"parse",[])}if(n.status>=400){let c=r&&typeof r=="object"?r:{},l=typeof c.error=="string"?$e(c.error)??c.error:s("\u8BF7\u6C42\u5931\u8D25\uFF08{status}\uFF09",{status:n.status}),p=typeof c.code=="string"?c.code:null,m=Array.isArray(c.conflicts)?c.conflicts.map(_n).filter(E=>E!==null):[];throw new ve(l,p,m)}return r},ne=e=>e instanceof x?e.code==="NO_SERVICE"?s("\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u6280\u80FD\u5F00\u5173\u201D\u8FD0\u884C\u672C\u5730\u670D\u52A1\u3002"):e.code==="SERVICE_FAILED"?s("\u672C\u5730\u670D\u52A1\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u52A0\u8F7D\u6269\u5C55\u540E\u91CD\u8BD5\u3002"):e.code==="DISABLED"?s("\u6280\u80FD\u5F00\u5173\u6269\u5C55\u5DF2\u505C\u7528\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u542F\u7528\u3002"):e.code==="HOST_TIMEOUT"?s("\u672C\u5730\u670D\u52A1\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u8BD5\u3002"):e.code==="NOT_GRANTED"?s("\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u5141\u8BB8\u201C\u6A21\u578B\u8C03\u7528\u201D\u6743\u9650\uFF0C\u6216\u91CD\u65B0\u5B89\u88C5\u6269\u5C55\u3002"):e.code==="UNSUPPORTED"?s("\u5F53\u524D\u5BBF\u4E3B\u6216\u6A21\u578B\u4E0D\u652F\u6301\u7FFB\u8BD1\u8BF7\u6C42\u3002"):s("\u65E0\u6CD5\u8FDE\u63A5\u672C\u5730\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u6269\u5C55\u6388\u6743\u3002"):e instanceof ve?$e(e.message)??e.message:$e(e instanceof Error?e.message:null)??s("\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),bi=e=>e instanceof ve&&e.code==="not-found"?s("\u672C\u5730\u670D\u52A1\u7248\u672C\u8FC7\u65E7\uFF0C\u8BF7\u5728\u6269\u5C55\u8BBE\u7F6E\u4E2D\u7981\u7528\u518D\u542F\u7528\u201C\u6280\u80FD\u5F00\u5173\u201D\u3002"):ne(e),kt=d("main","ext ext-container sk");kt.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173"));var as=d("header","sk-header"),cs=d("div","sk-title-row"),ls=d("h1","sk-title",s("\u6280\u80FD\u5F00\u5173")),eo=d("div","sk-actions"),xi=Ue(eo,{label:s("\u91CD\u65B0\u626B\u63CF"),variant:"outline",size:"sm",onClick:()=>{En(!0),Zt()}}),ds=Ue(eo,{label:s("\u5168\u90E8\u542F\u7528"),variant:"outline",size:"sm",onClick:()=>Is(!0)}),ps=Ue(eo,{label:s("\u5168\u90E8\u5173\u95ED"),variant:"outline",size:"sm",onClick:()=>Is(!1)});cs.append(ls,eo);var ln=d("p","sk-summary"),dn=d("p","sk-summary sk-summary-secondary"),us=d("div","sk-translation-row"),fs=d("div","sk-translation-controls"),to=d("div","sk-translation-tabs");to.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00"));var mn=d("div");fs.append(to,mn);var pn=d("div","sk-translation-progress"),ft=d("span","sk-translation-status");ft.setAttribute("aria-live","polite");us.append(fs,pn,ft);as.append(cs,ln,dn,us);var Es=d("div","sk-body"),be=d("div","sk-notice-root");be.setAttribute("aria-live","polite");var Wt=d("div","sk-groups-note"),_s=d("div","sk-groups-row"),Et=d("div","sk-groups"),Tn=d("div","sk-group-select"),Ce=d("button","sk-chip sk-groups-edit",s("\u7F16\u8F91\u5206\u7EC4"));Ce.type="button";Ce.setAttribute("aria-pressed","false");Ce.addEventListener("click",()=>{A?An():Di()});_s.append(Et,Tn,Ce);var at=d("div","sk-group-editor-root"),un=d("div"),St=d("div"),ms=d("div","sk-toolbar"),Sn=d("div","sk-search-slot"),Ts=d("div","sk-toolbar-selects"),gn=d("div","sk-filter-slot"),hn=d("div","sk-sort-slot");Ts.append(gn,hn);ms.append(Sn,Ts);var _t=d("div","sk-list");_t.setAttribute("role","list");var Ss=d("footer","sk-footer"),gs=d("p","",s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002")),hs=d("p","",s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"));Ss.append(gs,hs);Es.append(be,Wt,_s,at,un,St,ms,_t,Ss);kt.append(as,Es);ns.append(kt);var T=null,qe=ki(),Le="original",ct=!1,ye=!1,Ve={done:0,total:0},it=null,Q=null,mt=[],Te=!1,je=null,v=null,S=null,Se=null,le=null,te=null,X=[],Ie=null,Xe=!0,A=null,ie=null,Be=!1,Fe=!1,Tt="",gt="",ht="all",oo="default",zt=new Set,Wr,jr=!1,kn=()=>[{id:"all",label:s("\u5168\u90E8\u72B6\u6001")},{id:"enabled",label:s("\u5DF2\u542F\u7528")},{id:"disabled",label:s("\u5DF2\u5173\u95ED")},{id:"attention",label:s("\u51B2\u7A81\u4E0E\u63D0\u793A")}],bn=()=>[{id:"default",label:s("\u9ED8\u8BA4\u987A\u5E8F")},{id:"tokens",label:s("Token \u964D\u5E8F")}],Ai=qo(to,{items:[{id:"original",label:s("\u539F\u6587")},{id:"translated",label:s("\u4E2D\u6587\u8BD1\u6587")}],activeId:"original",trackBackground:!0,onChange:e=>{ct=!0,Le=e==="translated"?"translated":"original",g(),Le==="translated"&&vs()}}),Oi=Ue(mn,{label:s("\u8865\u5145\u7FFB\u8BD1"),variant:"outline",size:"sm",onClick:()=>{ct=!0,Le="translated",g(),vs()}}),ks=jo(Sn,{value:"",placeholder:s("\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09"),onChange:e=>{gt=e,bt()}}),bs=()=>Sn.querySelector("input"),xn=()=>{let e=bs();e&&e.setAttribute("aria-label",s("\u641C\u7D22\u6280\u80FD"))};xn();var xs=pt(gn,{value:"all",options:kn(),onChange:e=>{ht=e==="enabled"||e==="disabled"||e==="attention"?e:"all",bt()}}),jt=gn.querySelector(".oc-sdk-trigger");jt&&(jt.setAttribute("aria-label",s("\u72B6\u6001\u7B5B\u9009")),jt.removeAttribute("aria-labelledby"));var As=pt(hn,{value:"default",options:bn(),onChange:e=>{oo=e==="tokens"?"tokens":"default",bt()}}),qt=hn.querySelector(".oc-sdk-trigger");qt&&(qt.setAttribute("aria-label",s("\u6392\u5E8F\u65B9\u5F0F")),qt.removeAttribute("aria-labelledby"));var Ri=pt(Tn,{value:"all",options:[{id:"all",label:s("\u5168\u90E8")}],onChange:e=>{te=e==="all"?null:e,g()}}),Jt=Tn.querySelector(".oc-sdk-trigger");Jt&&(Jt.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),Jt.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=bs();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"){if(le||Se!==null){e.preventDefault(),le=null,Se=null,g();return}A&&!S&&(e.preventDefault(),Be||Fe?(Be=!1,Fe=!1,g()):An())}}});var Ke=()=>!!T?.root.error,yi=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",vi=e=>e.state==="conflict"?s("\u51B2\u7A81"):e.state==="mixed"?s("\u6DF7\u5408"):e.state==="disabled"?s("\u5173\u95ED"):s("\u5F00\u542F"),Ii=(e,t="neutral")=>{let o=d("span","sk-badge",e);return o.dataset.tone=t,o},wi=e=>{switch(e){case"both":return s("\u5165\u53E3\u548C\u505C\u7528\u6587\u4EF6\u540C\u65F6\u5B58\u5728");case"duplicate":return s("\u540C ID \u591A\u4E2A\u5165\u53E3");case"invalid":return s("frontmatter \u65E0\u6CD5\u89E3\u6790");case"empty":return s("\u5165\u53E3\u6587\u4EF6\u4E3A\u7A7A");case"read-error":return s("\u5165\u53E3\u65E0\u6CD5\u8BFB\u53D6");case"manual":return s("\u4EC5\u624B\u52A8\u8C03\u7528");case"no-description":return s("\u6CA1\u6709 description");default:return s("\u51B2\u7A81")}},nn=(e,t)=>{if(!t)return null;let o=d("p","sk-path");return o.append(d("span","sk-path-label",`${e}\uFF1A`),d("code","",t)),o},W=(e,t,o=!1,n=!1)=>{let r=d("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return r.type="button",r.disabled=!!S||n,r.addEventListener("click",t),r},qr=e=>{let t=d("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=d("div","sk-conflict-copy");if(o.append(d("strong","",wi(e.kind)),d("p","sk-conflict-message",$e(e.message)??e.message)),e.kind==="both"?(o.append(nn(s("\u542F\u7528\u5165\u53E3"),e.activePath)??d("span")),o.append(nn(s("\u505C\u7528\u5165\u53E3"),e.disabledPath)??d("span"))):(e.activePath??e.disabledPath)&&o.append(nn(s("\u5165\u53E3"),e.activePath??e.disabledPath)??d("span")),t.append(o),e.kind==="both"&&e.activePath){let n=d("div","sk-conflict-actions");n.append(W(s("\u4FDD\u7559\u542F\u7528"),()=>void ts(e,"enabled"),!1,Ke()),W(s("\u4FDD\u7559\u5173\u95ED"),()=>void ts(e,"disabled"),!1,Ke())),t.append(n)}return t},Ci=()=>{if(St.replaceChildren(),!T)return;let t=[...T.root.error?[{kind:"read-error",skillId:"",message:s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}\uFF08{path}\uFF09",{error:$e(T.root.error)??T.root.error,path:T.root.path}),activePath:null,disabledPath:null,blocking:!0}]:[],...T.conflicts],o=t.filter(l=>l.blocking),n=t.filter(l=>!l.blocking);if(o.length===0&&n.length===0)return;let r=d("section","sk-conflicts");r.setAttribute("aria-label",s("\u51B2\u7A81\u68C0\u67E5"));let c=d("div","sk-section-head");if(c.append(d("h2","sk-section-title",s("\u51B2\u7A81\u68C0\u67E5")),d("span","sk-section-count",s("{blocking} \u9879\u9700\u8981\u5904\u7406 \xB7 {warnings} \u9879\u63D0\u793A",{blocking:o.length,warnings:n.length}))),r.append(c),o.length>0){let l=d("ul","sk-conflict-list");for(let p of o)l.append(qr(p));r.append(l)}if(n.length>0){let l=d("details","sk-warning-details");l.append(d("summary","",s("\u63D0\u793A\uFF08{count}\uFF09",{count:n.length})));let p=d("ul","sk-conflict-list");for(let m of n)p.append(qr(m));l.append(p),r.append(l)}St.append(r)},Os=()=>{if(be.replaceChildren(),le){let e=le,t=new Set(e.skillIds),o=T?T.skills.filter(c=>!t.has(c.id)).length:0,n=d("div","sk-notice",s("\u4EC5\u542F\u7528\u300C{name}\u300D\uFF1A\u5C06\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o}));n.dataset.tone="warning",n.setAttribute("role","status");let r=d("div","sk-notice-actions");r.append(W(s("\u786E\u8BA4"),()=>void Wi(),!0),W(s("\u53D6\u6D88"),()=>{le=null,g()})),n.append(r),be.append(n);return}if(Se!==null){let e=T?T.skills.filter(n=>(Se?n.disabledPaths.length:n.activePaths.length)>0).length:0,t=d("div","sk-notice",Se?s("\u5C06\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:e}):s("\u5C06\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=d("div","sk-notice-actions");o.append(W(s(Se?"\u786E\u8BA4\u542F\u7528":"\u786E\u8BA4\u5173\u95ED"),()=>void ta(),!0),W(s("\u53D6\u6D88"),()=>{Se=null,g()})),t.append(o),be.append(t);return}if(v){let e=d("div","sk-notice",v.text);if(e.dataset.tone=v.tone,e.setAttribute("role",v.tone==="error"?"alert":"status"),v.actions?.length){let t=d("div","sk-notice-actions");for(let o of v.actions)t.append(W(o.label,o.onClick,o.primary));e.append(t)}be.append(e);return}if(je){let e=d("div","sk-notice",je);e.dataset.tone="error",e.setAttribute("role","alert"),be.append(e);return}if(Q){let e=d("div","sk-notice",Q);e.dataset.tone="error",e.setAttribute("role","alert"),be.append(e);return}if(Te&&!T){let e=d("div","sk-notice",s("\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),be.append(e)}},Mi=()=>{if(!T){ln.textContent=s(Te?"\u6B63\u5728\u8BFB\u53D6\u6280\u80FD\u2026":"\u5C1A\u672A\u8BFB\u53D6\u6280\u80FD\u3002"),dn.textContent=s("\u5173\u95ED\u5165\u53E3\u6587\u6863\u540E\uFF0COpenCode \u4E0D\u4F1A\u518D\u53D1\u73B0\u8BE5\u6280\u80FD\u3002");return}ln.textContent=s("\u6A21\u578B\u53EF\u89C1 {advertised} / \u5171 {total} \u4E2A \xB7 \u7EA6 {tokens} tokens/\u6B65",{advertised:T.summary.advertised,total:T.summary.total,tokens:T.summary.estimatedTokens.toLocaleString(Ze.locale)});let e=[s("{count} \u4E2A\u5DF2\u5173\u95ED",{count:T.summary.disabled})];T.summary.blockingConflicts>0?e.push(s("{count} \u9879\u963B\u585E\u51B2\u7A81",{count:T.summary.blockingConflicts})):e.push(s("\u65E0\u963B\u585E\u51B2\u7A81")),T.summary.warnings>0&&e.push(s("{count} \u9879\u63D0\u793A",{count:T.summary.warnings})),T.root.error&&e.push(s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6")),dn.textContent=s("{parts}\u3002\u4F30\u7B97\u4E0D\u542B\u5185\u7F6E\u548C\u9879\u76EE\u6280\u80FD\u3002",{parts:e.join(" \xB7 ")})},lt=e=>{let t=qe.entries[e.id];return t&&t.hash===e.contentHash?t:null},Ui=()=>T?.skills.filter(e=>lt(e)).length??0,Jr=e=>Le!=="translated"?e.name:lt(e)?.nameZh||e.name;var Ni=()=>{Ai.update({activeId:Le,items:[{id:"original",label:s("\u539F\u6587")},{id:"translated",label:s("\u4E2D\u6587\u8BD1\u6587")}]});let e=T?.skills.length??0,t=Ui(),o=Math.max(0,e-t);if(mn.hidden=o===0||ye||!T,Oi.update({label:t>0?s("\u8865\u5145\u7FFB\u8BD1"):s("\u7FFB\u8BD1\u672A\u8BD1\u9879"),disabled:ye||!!S||!T}),ye){let n=Ve.total>0?Math.round(Ve.done/Ve.total*100):0;it?it.update({value:n,tone:"primary"}):it=Yo(pn,{value:n,tone:"primary"}),ft.textContent=s("\u7FFB\u8BD1 {done}/{total}\u2026",{done:Ve.done,total:Ve.total})}else it&&(it.dispose(),it=null,pn.replaceChildren()),Le==="translated"?ft.textContent=t?s("{translated}/{total} \u5DF2\u7FFB\u8BD1",{translated:t,total:e}):s("\u70B9\u201C\u7FFB\u8BD1\u201D\u751F\u6210\u4E2D\u6587"):ft.textContent=t?s("{count} \u4E2A\u6709\u4E2D\u6587",{count:t}):""},Qe=e=>e.skillIds.filter(t=>T?.skills.some(o=>o.id===t)),Rs=e=>{let t=Qe(e).map(n=>T?.skills.find(r=>r.id===n)).filter(n=>!!n);if(t.length===0)return s("\u65E0\u6280\u80FD");if(t.some(n=>n.state==="conflict"))return s("\u6709\u51B2\u7A81");let o=t.filter(n=>n.state==="enabled").length;return o===t.length?s("\u5168\u5F00"):s(o===0?"\u5168\u5173":"\u90E8\u5206")},Yr=e=>{Array.from(Et.querySelectorAll("[data-group]")).find(o=>o.dataset.group===e)?.focus()},Li=()=>`custom-${globalThis.crypto?.randomUUID?.().slice(0,8)??Math.random().toString(36).slice(2,10)}`,Pi=()=>{if(Wt.replaceChildren(),Ie){let e=d("div","sk-notice",s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF1A{error}",{error:Ie}));e.dataset.tone="error",e.setAttribute("role","alert");let t=d("div","sk-notice-actions");t.append(W(s("\u91CD\u65B0\u8BFB\u53D6"),()=>void Zt(),!1,Xe)),e.append(t),Wt.append(e);return}Xe||X.length>0||!T||Ke()||Wt.append(d("div","sk-notice",s("\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002\u70B9\u300C\u7F16\u8F91\u5206\u7EC4\u300D\u65B0\u5EFA\uFF0C\u6216\u5728\u7F16\u8F91\u5668\u91CC\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4\u3002")))},fn=e=>{A={id:e?.id??null,name:e?.name??"",members:e?[...e.skillIds]:[]},Tt="",ie=null,Be=!1,Fe=!1,g();let t=at.querySelector(".sk-group-name");t?.focus(),t?.select()},Di=()=>{if(Ie||Xe||!T||Ke())return;let e=X.find(t=>t.id===te)??X[0]??null;fn(e),at.scrollIntoView({block:"nearest"})},An=()=>{S||(A=null,Tt="",ie=null,Be=!1,Fe=!1,g(),Ce.focus())},Gi=e=>{if(e==="new"){fn(null);return}let t=X.find(o=>o.id===e);t&&fn(t)},rn=()=>{at.querySelector(".sk-group-name")?.focus()},Zr=async()=>{let e=A;if(!e||S||Ie)return;let t=e.name.trim();if(!t){ie=s("\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0\u3002"),g(),rn();return}if(t.length>40){ie=s("\u5206\u7EC4\u540D\u79F0\u4E0D\u80FD\u8D85\u8FC7 {count} \u4E2A\u5B57\u7B26\u3002",{count:40}),g(),rn();return}if(X.some(c=>c.id!==e.id&&c.name.trim().toLowerCase()===t.toLowerCase())){ie=s("\u5DF2\u7ECF\u6709\u540D\u4E3A\u300C{name}\u300D\u7684\u5206\u7EC4\u3002",{name:t}),g(),rn();return}if(e.members.length===0){ie=s("\u5206\u7EC4\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u6210\u5458\u3002"),g();return}let o=e.id??Li(),n={id:o,name:t,skillIds:[...e.members]},r=e.id?X.map(c=>c.id===e.id?n:c):[...X,n];S="groups",ie=null,g();try{X=Qt(await xe("POST","/groups",{version:1,groups:r})),Ie=null,te=o,le=null;let c=X.find(l=>l.id===o)??null;A=c?{id:c.id,name:c.name,members:[...c.skillIds]}:null,v={text:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t}),tone:"success"},ue.toast({kind:"success",message:s("\u5DF2\u4FDD\u5B58\u5206\u7EC4\u300C{name}\u300D\u3002",{name:t})}).catch(()=>{})}catch(c){ie=ne(c)}finally{S=null,g()}},Hi=()=>{!A?.id||S||(Be=!0,Fe=!1,g())},$i=async()=>{if(!A?.id||S)return;let e=A.id,t=X.filter(o=>o.id!==e);S="groups",Be=!1,ie=null,g();try{X=Qt(await xe("POST","/groups",{version:1,groups:t})),Ie=null,le?.id===e&&(le=null),te===e&&(te=null);let o=X.find(n=>n.id===te)??X[0]??null;te=o?.id??null,A=o?{id:o.id,name:o.name,members:[...o.skillIds]}:null,v={text:s("\u5DF2\u5220\u9664\u5206\u7EC4\u3002"),tone:"success"}}catch(o){ie=ne(o)}finally{S=null,g()}},Vi=()=>{if(!(S||Xe||Ie)){if(Bt(X).added.length===0){v={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},g();return}Fe=!0,Be=!1,g()}},Xi=async()=>{if(S)return;let{groups:e,added:t}=Bt(X);if(Fe=!1,t.length===0){v={text:s("\u793A\u4F8B\u5206\u7EC4\u7684\u540D\u79F0\u6216 ID \u90FD\u5DF2\u5B58\u5728\uFF0C\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u5206\u7EC4\u3002"),tone:"info"},g();return}S="groups",ie=null,g();try{X=Qt(await xe("POST","/groups",{version:1,groups:e})),Ie=null,v={text:s("\u5DF2\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\u3002",{count:t.length}),tone:"success"}}catch(o){ie=ne(o)}finally{S=null,g()}},Bi=()=>{if(at.replaceChildren(),!A)return;let e=A,t=d("section","sk-group-editor");t.setAttribute("aria-label",s("\u7F16\u8F91\u5206\u7EC4"));let o=d("div","sk-section-head");o.append(d("h2","sk-section-title",s("\u7F16\u8F91\u5206\u7EC4")),W(s("\u5173\u95ED"),An,!1,!!S)),t.append(o);let n=d("label","sk-field");n.append(d("span","sk-field-label",s("\u9009\u62E9\u5206\u7EC4")));let r=d("select","sk-input");r.setAttribute("aria-label",s("\u9009\u62E9\u5206\u7EC4"));let c=d("option","",s("\u65B0\u5EFA\u5206\u7EC4"));c.value="new",r.append(c);for(let I of X){let L=d("option","",`${I.name}\uFF08${I.skillIds.length}\uFF09`);L.value=I.id,r.append(L)}r.value=e.id??"new",r.disabled=!!S,r.addEventListener("change",()=>Gi(r.value)),n.append(r);let l=d("label","sk-field");l.append(d("span","sk-field-label",s("\u540D\u79F0")));let p=d("input","sk-input sk-group-name");p.type="text",p.value=e.name,p.maxLength=40,p.placeholder=s("\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1"),p.autocomplete="off",p.spellcheck=!1,p.disabled=!!S,p.addEventListener("input",()=>{A&&(A.name=p.value,ie=null)}),p.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),!(I.isComposing||I.keyCode===229)&&Zr())}),l.append(p),t.append(n,l);let m=d("fieldset","sk-members"),E=d("legend","",s("\u6210\u5458\uFF08{count}\uFF09",{count:e.members.length}));m.append(E);let O=d("div","sk-members-tools"),h=d("input","sk-member-filter");h.type="search",h.value=Tt,h.placeholder=s("\u7B5B\u9009\u6210\u5458\u540D\u79F0\u6216 ID"),h.setAttribute("aria-label",s("\u7B5B\u9009\u6210\u5458\u540D\u79F0\u6216 ID")),h.disabled=!!S,O.append(h,W(s("\u5168\u9009"),()=>{if(!A)return;let I=T?.skills.map(M=>M.id)??[],L=A.members.filter(M=>!I.includes(M));A.members=[...I,...L],g()},!1,!!S),W(s("\u6E05\u7A7A"),()=>{A&&(A.members=[],g())},!1,!!S)),m.append(O);let R=d("div","sk-member-list"),P=d("div","sk-order-box"),Y=I=>{A&&(E.textContent=s("\u6210\u5458\uFF08{count}\uFF09",{count:A.members.length}),ae(),ge(I))},ae=()=>{if(R.replaceChildren(),!A)return;let L=(T?.skills??[]).filter(M=>en(M,Tt,lt(M)));if(L.length===0){R.append(d("p","sk-member-empty",s("\u6CA1\u6709\u5339\u914D\u7684\u6210\u5458")));return}for(let M of L){let B=d("label","sk-check"),ee=d("input");ee.type="checkbox",ee.checked=A.members.includes(M.id),ee.disabled=!!S,ee.addEventListener("change",()=>{A&&(ee.checked?A.members.includes(M.id)||A.members.push(M.id):A.members=A.members.filter(fe=>fe!==M.id),ie=null,E.textContent=s("\u6210\u5458\uFF08{count}\uFF09",{count:A.members.length}),ge())});let Z=d("span","sk-check-copy");Z.append(d("span","sk-check-name",Jr(M)),d("code","sk-check-id",M.id)),B.append(ee,Z),R.append(B)}},ge=I=>{if(P.replaceChildren(),!A||A.members.length===0)return;P.append(d("p","sk-order-title",s("\u5DF2\u9009\u6B65\u9AA4\u987A\u5E8F\uFF08{count}\uFF09",{count:A.members.length})));let L=d("ol","sk-order-list");for(let[M,B]of A.members.entries()){let ee=T?.skills.find(Pe=>Pe.id===B)??null,Z=ee?Jr(ee):B,fe=d("li","sk-order-item"),re=d("span","sk-order-label");re.append(d("span","sk-step",String(M+1)),d("span","sk-order-name",Z));let f=d("span","sk-order-actions"),_=d("button","sk-order-btn","\u2191");_.type="button",_.disabled=!!S||M===0,_.dataset.orderFocus=`up:${B}`,_.title=s("\u4E0A\u79FB\u300C{name}\u300D",{name:Z}),_.setAttribute("aria-label",s("\u4E0A\u79FB\u300C{name}\u300D",{name:Z})),_.addEventListener("click",()=>{A&&(A.members=Qo(A.members,M,-1),Y(`up:${B}`))});let se=d("button","sk-order-btn","\u2193");se.type="button",se.disabled=!!S||M===A.members.length-1,se.dataset.orderFocus=`down:${B}`,se.title=s("\u4E0B\u79FB\u300C{name}\u300D",{name:Z}),se.setAttribute("aria-label",s("\u4E0B\u79FB\u300C{name}\u300D",{name:Z})),se.addEventListener("click",()=>{A&&(A.members=Qo(A.members,M,1),Y(`down:${B}`))});let Ae=d("button","sk-order-btn","\xD7");Ae.type="button",Ae.disabled=!!S,Ae.title=s("\u79FB\u9664\u300C{name}\u300D",{name:Z}),Ae.setAttribute("aria-label",s("\u79FB\u9664\u300C{name}\u300D",{name:Z})),Ae.addEventListener("click",()=>{A&&(A.members=A.members.filter(Pe=>Pe!==B),Y())}),f.append(_,se,Ae),fe.append(re,f),L.append(fe)}P.append(L),I&&Array.from(P.querySelectorAll("[data-order-focus]")).find(B=>B.dataset.orderFocus===I&&!B.disabled)?.focus()};h.addEventListener("input",()=>{Tt=h.value,ae()}),ae(),ge(),m.append(R,P);let C=new Set(T?.skills.map(I=>I.id)??[]),oe=e.members.filter(I=>!C.has(I));if(oe.length>0){let I=d("div","sk-missing");I.append(d("span","sk-missing-label",s("\u76EE\u5F55\u4E2D\u7F3A\u5931\uFF1A")));for(let L of oe){let M=d("button","sk-missing-chip",`${L} \xD7`);M.type="button",M.disabled=!!S,M.title=s("\u4ECE\u5206\u7EC4\u79FB\u9664\u8FD9\u4E2A\u7F3A\u5931\u6210\u5458"),M.addEventListener("click",()=>{A&&(A.members=A.members.filter(B=>B!==L),g())}),I.append(M)}m.append(I)}if(t.append(m),ie){let I=d("p","sk-editor-error",ie);I.setAttribute("role","alert"),t.append(I)}let de=d("div","sk-editor-actions");if(e.id&&de.append(W(s("\u5220\u9664\u5206\u7EC4"),Hi,!1,!!S)),de.append(W(s("\u5BFC\u5165\u793A\u4F8B\u5206\u7EC4"),Vi,!1,!!S),W(e.id?s("\u4FDD\u5B58\u66F4\u6539"):s("\u65B0\u5EFA\u5206\u7EC4"),()=>void Zr(),!0,!!S)),t.append(de),Be){let I=d("div","sk-editor-confirm");I.dataset.tone="warning",I.append(d("p","",s("\u5220\u9664\u5206\u7EC4\u300C{name}\u300D\uFF1F\u6280\u80FD\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002",{name:e.name.trim()||s("\u672A\u547D\u540D")})));let L=d("div","sk-actions");L.append(W(s("\u786E\u8BA4\u5220\u9664"),()=>void $i(),!0,!!S),W(s("\u53D6\u6D88"),()=>{Be=!1,g()},!1,!!S)),I.append(L),t.append(I)}if(Fe){let I=Bt(X).added.length,L=d("div","sk-editor-confirm");L.dataset.tone="warning",L.append(d("p","",s("\u5BFC\u5165 {count} \u4E2A\u793A\u4F8B\u5206\u7EC4\uFF1F\u5DF2\u6709\u540C\u540D\u6216\u540C ID \u7684\u5206\u7EC4\u4F1A\u8DF3\u8FC7\uFF0C\u5F53\u524D\u5206\u7EC4\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002",{count:I})));let M=d("div","sk-actions");M.append(W(s("\u786E\u8BA4\u5BFC\u5165"),()=>void Xi(),!0,!!S),W(s("\u53D6\u6D88"),()=>{Fe=!1,g()},!1,!!S)),L.append(M),t.append(L)}t.append(d("p","sk-editor-hint",s("\u5206\u7EC4\u53EA\u5F71\u54CD\u9762\u677F\u7B5B\u9009\u548C\u6279\u91CF\u5F00\u5173\uFF0C\u4E0D\u6539\u53D8\u6280\u80FD\uFF1B\u6210\u5458\u987A\u5E8F\u51B3\u5B9A\u7EC4\u5185\u6B65\u9AA4\u53F7\uFF0C\u4FDD\u5B58\u540E\u5199\u5165 groups.json\u3002"))),at.append(t)},Fi=()=>{Et.replaceChildren();let e=T?.skills.length??0,t=d("button","sk-chip",s("\u5168\u90E8 {count}",{count:e}));t.type="button",t.dataset.group="all",t.setAttribute("aria-pressed",te===null?"true":"false"),t.addEventListener("click",()=>{te=null,g(),Yr("all")}),Et.append(t);for(let o of X){let n=Qe(o).length,r=d("button","sk-chip",`${o.name} ${n}`);r.type="button",r.dataset.group=o.id,r.setAttribute("aria-pressed",te===o.id?"true":"false"),r.addEventListener("click",()=>{te=o.id,g(),Yr(o.id)}),Et.append(r)}Ce.textContent=s(A?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),Ce.setAttribute("aria-pressed",A?"true":"false"),Ce.disabled=Xe||!!Ie||!!S||!T||Ke(),Ce.title=Xe?s("\u6B63\u5728\u8BFB\u53D6\u5206\u7EC4\u2026"):Ie?s("\u5206\u7EC4\u914D\u7F6E\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u4FEE\u590D\u6587\u4EF6\u540E\u91CD\u65B0\u8BFB\u53D6"):T?Ke()?s("\u6280\u80FD\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):"":s("\u6280\u80FD\u5217\u8868\u5C1A\u672A\u8BFB\u53D6"),Ri.update({value:te??"all",options:[{id:"all",label:s("\u5168\u90E8 {count}",{count:e})},...X.map(o=>({id:o.id,label:`${o.name} ${Qe(o).length}`,hint:Rs(o)}))]})},Ki=()=>{if(un.replaceChildren(),!T||!te)return;let e=T,t=X.find(h=>h.id===te);if(!t)return;let o=Qe(t),n=t.skillIds.filter(h=>!o.includes(h)),c=o.map(h=>e.skills.find(R=>R.id===h)).filter(h=>!!h).some(h=>h.state==="conflict"),l=Ke()||c||o.length===0,p=d("div","sk-groupbar"),m=d("div","sk-groupbar-text");m.append(d("strong","",t.name),d("span","sk-group-state",s("{count} \u4E2A \xB7 {state}",{count:o.length,state:Rs(t)}))),n.length>0&&m.append(d("p","sk-group-warning",s("\u7F3A\u5931\uFF1A{names}",{names:n.join(", ")})));let E=d("div","sk-groupbar-actions");E.append(W(s("\u542F\u7528\u6574\u7EC4"),()=>void Qr(t,!0),!1,l),W(s("\u5173\u95ED\u6574\u7EC4"),()=>void Qr(t,!1),!1,l));let O=W(s("\u4EC5\u542F\u7528\u672C\u7EC4"),()=>zi(t),!1,l||n.length>0);n.length>0&&(O.title=s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u5148\u5904\u7406\u540E\u518D\u4EC5\u542F\u7528\u672C\u7EC4")),E.append(O),p.append(m,E),un.append(p)},Qr=async(e,t)=>{if(!T||S)return;let o=Qe(e);if(o.length!==0){S=`group:${e.id}:${t?"on":"off"}`,le=null,Se=null,v=null,g();try{T=et(await xe("POST","/skills/batch",{enable:t?o:[],disable:t?[]:o})),v={text:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D\u7684 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:o.length}),tone:"success"},ue.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528\u300C{name}\u300D",{name:e.name}):s("\u5DF2\u5173\u95ED\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(n){v={text:ne(n),tone:"error"},S=null,g(),xt(!1,!0);return}S=null,g()}},zi=e=>{if(!T||S)return;let t=Qe(e),o=e.skillIds.filter(n=>!t.includes(n));t.length===0||o.length>0||(le=e,Se=null,v=null,g(),be.scrollIntoView({block:"nearest"}),be.querySelector("button")?.focus())},Wi=async()=>{if(!T||S||!le)return;let e=le;le=null;let t=Qe(e),o=e.skillIds.filter(c=>!t.includes(c));if(t.length===0||o.length>0){v={text:s("\u5206\u7EC4\u91CC\u6709\u7F3A\u5931\u6280\u80FD\uFF0C\u672A\u6267\u884C\u3002"),tone:"error"},g();return}let n=new Set(e.skillIds),r=T.skills.filter(c=>!n.has(c.id)).map(c=>c.id);S=`group-only:${e.id}`,v=null,g();try{T=et(await xe("POST","/skills/batch",{enable:t,disable:r})),v={text:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D\uFF0C\u5173\u95ED\u5176\u4ED6 {count} \u4E2A\u6280\u80FD\u3002",{name:e.name,count:r.length}),tone:"success"},ue.toast({kind:"success",message:s("\u5DF2\u4EC5\u542F\u7528\u300C{name}\u300D",{name:e.name})}).catch(()=>{})}catch(c){v={text:ne(c),tone:"error"},S=null,g(),xt(!1,!0);return}S=null,g()},es=async(e,t)=>{try{await ue.writeClipboard(e),ue.toast({kind:"success",message:t}).catch(()=>{})}catch(o){v={text:ne(o),tone:"error"},Os()}},sn=(e,t)=>{let o=d("span","sk-menu-slot"),n=t.activePaths[0]??t.disabledPaths[0]??null;Zo(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:s("\u590D\u5236\u5165\u53E3\u8DEF\u5F84"),disabled:!n},{id:"copy-id",label:s("\u590D\u5236\u6280\u80FD ID")},{separator:!0},{id:"retranslate",label:s("\u5355\u72EC\u91CD\u8BD1\u6B64\u9879"),disabled:ye||!!S}],onSelect:c=>{c==="copy-path"&&n?es(n,s("\u5DF2\u590D\u5236\u5165\u53E3\u8DEF\u5F84\u3002")):c==="copy-id"?es(t.id,s("\u5DF2\u590D\u5236\u6280\u80FD ID\u3002")):c==="retranslate"&&ea(t)}});let r=o.querySelector(".oc-sdk-btn");r&&(r.setAttribute("aria-label",`${s("\u66F4\u591A\u64CD\u4F5C")} ${t.name}`),r.title=s("\u66F4\u591A\u64CD\u4F5C")),e.append(o)},ji=e=>{let t=d("div","sk-skill-action"),o=d("span","sk-action-note"),n=d("div","sk-action-top"),r=Ke();if(e.state==="conflict"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5148\u5904\u7406\u51B2\u7A81");let p=d("button","sk-inline-button",s("\u5904\u7406\u51B2\u7A81"));return p.type="button",p.disabled=!!S||r,p.addEventListener("click",()=>{St.scrollIntoView({block:"nearest"}),St.querySelector("button")?.focus()}),n.append(p),sn(n,e),t.append(o,n),t}if(e.state==="mixed"){o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u90E8\u5206\u5165\u53E3\u5173\u95ED");let p=d("div","sk-mini-actions"),m=d("button","sk-inline-button",s("\u5168\u90E8\u542F\u7528"));m.type="button",m.disabled=!!S||r,m.addEventListener("click",()=>void an(e,!0));let E=d("button","sk-inline-button",s("\u5168\u90E8\u5173\u95ED"));return E.type="button",E.disabled=!!S||r,E.addEventListener("click",()=>void an(e,!1)),p.append(m,E),sn(p,e),t.append(o,p),t}let c=e.state==="enabled",l=d("button","sk-switch");return l.type="button",l.setAttribute("role","switch"),l.setAttribute("aria-checked",c?"true":"false"),l.setAttribute("aria-label",`${s(c?"\u5173\u95ED":"\u5F00\u542F")} ${e.name}`),l.dataset.skillId=e.id,l.disabled=!!S||r,l.append(d("span","sk-thumb")),l.addEventListener("click",()=>{l.disabled||an(e,!c)}),c?o.textContent=r?s("\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6"):e.advertised?s("\u6A21\u578B\u53EF\u89C1"):s("\u6A21\u578B\u4E0D\u53EF\u89C1"):o.textContent=s(r?"\u76EE\u5F55\u65E0\u6CD5\u8BFB\u53D6":"\u5165\u53E3\u5DF2\u5173\u95ED"),n.append(l),sn(n,e),t.append(o,n),t},qi=(e,t=0)=>{let o=d("article","sk-skill");o.dataset.state=e.state,o.setAttribute("role","listitem");let n=d("div","sk-skill-main"),r=d("div","sk-skill-head");if(t>0){let h=d("span","sk-step",String(t));h.title=s("\u7B2C {step} \u6B65",{step:t}),h.setAttribute("aria-label",s("\u7B2C {step} \u6B65",{step:t})),r.append(h)}let c=Le==="translated"?lt(e):null;r.append(d("strong","sk-name",c?.nameZh||e.name),Ii(vi(e),yi(e)));let l=d("div","sk-meta");c&&l.append(d("span","sk-original-name",e.name)),l.append(d("code","sk-id",e.id)),e.estimatedTokens>0&&l.append(d("span","sk-token",s("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString(Ze.locale)})));let p=c?.descriptionZh||e.description,m=p||s("\u65E0 description\uFF0C\u6A21\u578B\u4E0D\u4F1A\u81EA\u52A8\u9009\u7528\u3002"),E=d("p","sk-desc",m),O=zt.has(e.id);if(O&&E.classList.add("is-expanded"),n.append(r,l,E),p.length>88||p.includes(`
`)){let h=d("button","sk-desc-toggle",s(O?"\u6536\u8D77\u8BF4\u660E":"\u5C55\u5F00\u8BF4\u660E"));h.type="button",h.setAttribute("aria-expanded",O?"true":"false"),h.addEventListener("click",()=>{let R=!zt.has(e.id);R?zt.add(e.id):zt.delete(e.id),E.classList.toggle("is-expanded",R),h.textContent=s(R?"\u6536\u8D77\u8BF4\u660E":"\u5C55\u5F00\u8BF4\u660E"),h.setAttribute("aria-expanded",R?"true":"false")}),n.append(h)}if(e.warnings.length>0){let h=d("p","sk-warn",e.warnings.slice(0,2).map(R=>$e(R)??R).join(" \xB7 "));n.append(h)}return o.append(n,ji(e)),o},Ji=()=>{gt="",ht="all",oo="default",ks.update({value:"",placeholder:s("\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09")}),xn(),xs.update({value:"all",options:kn()}),As.update({value:"default",options:bn()}),bt()},bt=()=>{if(_t.replaceChildren(),!T)return;let e=te?X.find(n=>n.id===te):null,t=e?e.skillIds.map(n=>T?.skills.find(r=>r.id===n)).filter(n=>!!n):T.skills,o=Dr(t,{query:gt,stateFilter:ht,sortMode:oo,getTranslation:lt});if(o.length===0){let n=gt.trim().length>0||ht!=="all",r=d("div","sk-empty");if(r.append(d("h2","",T.skills.length===0?s("\u6CA1\u6709\u53D1\u73B0\u6280\u80FD"):e&&t.length===0?s("\u8FD9\u4E2A\u5206\u7EC4\u6CA1\u6709\u53EF\u7528\u6280\u80FD"):s("\u6CA1\u6709\u5339\u914D\u7684\u6280\u80FD")),d("p","",T.skills.length===0?s("\u68C0\u67E5 ~/.config/opencode/skills \u662F\u5426\u5B58\u5728\uFF0C\u6216\u91CD\u65B0\u626B\u63CF\u3002"):e&&t.length===0?s("\u68C0\u67E5\u5206\u7EC4\u91CC\u7684\u6280\u80FD\u662F\u5426\u88AB\u79FB\u9664\u3002"):s("\u6362\u4E00\u4E2A\u641C\u7D22\u8BCD\u6216\u8C03\u6574\u72B6\u6001\u7B5B\u9009\u6761\u4EF6\u3002"))),T.skills.length>0&&n){let c=d("div","sk-empty-actions");c.append(W(s("\u91CD\u7F6E\u7B5B\u9009"),Ji)),r.append(c)}_t.append(r);return}for(let n of o){let r=e&&e.skillIds.length>1?e.skillIds.indexOf(n.id)+1:0;_t.append(qi(n,r))}},Yi=()=>{let e=T?T.root.error?1:T.summary.blockingConflicts>0?T.summary.blockingConflicts:null:null;e!==Wr&&(Wr=e,ue.setBadge(e).catch(()=>{}))},g=()=>{kt.setAttribute("aria-busy",Te?"true":"false"),Yi(),Mi(),Ni(),Os(),Pi(),Fi(),Bi(),Ki(),Ci(),bt(),xi.update({label:s(Te?"\u8BFB\u53D6\u4E2D\u2026":"\u91CD\u65B0\u626B\u63CF"),loading:Te,disabled:Te||!!S});let e=Ke();ds.update({disabled:Te||!!S||!T||e}),ps.update({disabled:Te||!!S||!T||e})},Zi=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},xt=async(e=!1,t=!1)=>{if(!Te){Te=!0,t||(je=null),e&&g();try{T=et(await xe("GET","/skills")),je=null}catch(o){t||(je=ne(o))}finally{Te=!1,g()}}},On=async()=>{try{qe=is(await xe("POST","/translations",qe)),Q=null}catch(e){Q=ne(e)}},Qi=e=>{let t=new Map;try{let o=JSON.parse(e);if(!Array.isArray(o))return t;for(let n of o){if(!n||typeof n!="object")continue;let r=n;typeof r.id=="string"&&typeof r.name=="string"&&typeof r.description=="string"&&t.set(r.id,{name:r.name,description:r.description})}}catch{}return t},ys=async e=>{if(e.request.system!==Ft)return;if(!e.ok){ye||(Q=e.error,v={text:e.error,tone:"error"},g());return}if(!T){mt.length<8&&mt.push(e);return}let t=Qi(e.request.prompt),o=Kt(e.result.text),n=!1;for(let r of o){let c=T.skills.find(p=>p.id===r.id);if(!c)continue;let l=t.get(c.id);l&&(l.name!==c.name||l.description!==c.description)||(qe.entries[c.id]={hash:c.contentHash,nameZh:r.nameZh,descriptionZh:r.descriptionZh,updatedAt:Date.now()},n=!0)}n&&(ct||(Le="translated",ct=!0),await On(),ye||(v=Q?{text:s("\u7FFB\u8BD1\u5DF2\u8865\u5168\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Q}),tone:"warning"}:{text:s("\u4E0A\u6B21\u672A\u5B8C\u6210\u7684\u7FFB\u8BD1\u5DF2\u8865\u5168\u3002"),tone:"success"}),g())},vs=async()=>{if(!T||ye)return;let e=T.skills.filter(r=>!lt(r));if(e.length===0){v={text:s("\u4E2D\u6587\u8BF4\u660E\u5DF2\u662F\u6700\u65B0\u3002"),tone:"success"},g();return}ye=!0,Q=null,Ve={done:0,total:e.length},v=null,g();let t=0,o=0,n=!1;try{for(let r=0;r<e.length;r+=4){let c=e.slice(r,r+4),l=c;for(let p=0;p<2&&l.length>0;p+=1){let m=await ue.generate({prompt:tn(l.map(h=>({id:h.id,name:h.name,description:h.description}))),system:Ft,maxOutputTokens:2048}),E=Kt(m.text),O=new Set;for(let h of E){let R=l.find(P=>P.id===h.id);R&&(qe.entries[R.id]={hash:R.contentHash,nameZh:h.nameZh,descriptionZh:h.descriptionZh,updatedAt:Date.now()},O.add(R.id))}l=l.filter(h=>!O.has(h.id))}o+=l.length,t+=c.length-l.length,Ve={done:t,total:e.length},await On(),g()}}catch(r){n=!0,Q=ne(r),v={text:Q,tone:"error"}}finally{ye=!1,n||(Q?v={text:s("\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Q}),tone:"warning"}:o>0?v={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\uFF0C{failed} \u4E2A\u5931\u8D25\uFF1B\u53EF\u518D\u70B9\u201C\u7FFB\u8BD1\u201D\u91CD\u8BD5\u3002",{done:t,failed:o}),tone:"warning"}:v={text:s("\u5DF2\u7FFB\u8BD1 {done} \u4E2A\u6280\u80FD\u3002",{done:t}),tone:"success"}),g()}},ea=async e=>{if(!(!T||ye||S)){ye=!0,Q=null,Ve={done:0,total:1},v={text:s("\u6B63\u5728\u91CD\u8BD1\u300C{name}\u300D\u2026",{name:e.name}),tone:"info"},g();try{let t=await ue.generate({prompt:tn([{id:e.id,name:e.name,description:e.description}]),system:Ft,maxOutputTokens:1024}),o=Kt(t.text),n=o.find(r=>r.id===e.id)??(o.length===1?o[0]:null);if(!n)v={text:s("\u672A\u80FD\u89E3\u6790\u300C{name}\u300D\u7684\u7FFB\u8BD1\u7ED3\u679C\uFF0C\u8BF7\u91CD\u8BD5\u3002",{name:e.name}),tone:"warning"};else if(qe.entries[e.id]={hash:e.contentHash,nameZh:n.nameZh,descriptionZh:n.descriptionZh,updatedAt:Date.now()},Le="translated",ct=!0,await On(),Q)v={text:s("\u7FFB\u8BD1\u5B8C\u6210\uFF0C\u4F46\u7F13\u5B58\u4FDD\u5B58\u5931\u8D25\uFF1A{error}",{error:Q}),tone:"warning"};else{let r=s("\u5DF2\u66F4\u65B0\u300C{name}\u300D\u7684\u4E2D\u6587\u8BD1\u6587\u3002",{name:e.name});v={text:r,tone:"success"},ue.toast({kind:"success",message:r}).catch(()=>{})}}catch(t){Q=ne(t),v={text:Q,tone:"error"}}finally{ye=!1,Ve={done:1,total:1},g()}}},Zt=async(e=!1)=>{if(!(Xe&&!e||A)){Xe=!0,g();try{X=Qt(await xe("GET","/groups")),Ie=null,te&&!X.some(t=>t.id===te)&&(te=null)}catch(t){Ie=bi(t)}finally{Xe=!1,g()}}},En=async(e=!1)=>{if(Te)return;Te=!0,e&&g();let[t,o]=await Promise.allSettled([xe("GET","/skills"),xe("GET","/translations")]);if(t.status==="fulfilled")try{T=et(t.value),je=null}catch(n){je=ne(n)}else je=ne(t.reason);if(o.status==="fulfilled")try{qe=is(o.value),Q=null,!ct&&Object.keys(qe.entries).length>0&&(Le="translated")}catch(n){Q=ne(n)}else Q=ne(o.reason);if(Te=!1,g(),T&&mt.length>0){let n=mt;mt=[];for(let r of n)ys(r)}},an=async(e,t)=>{if(!S){S=`toggle:${e.id}`,Se=null,le=null,v=null,g();try{T=et(await xe("POST","/skills/toggle",{id:e.id,enabled:t})),v={text:t?s("\u5DF2\u542F\u7528 {name}\u3002",{name:e.name}):s("\u5DF2\u5173\u95ED {name}\uFF1BOpenCode \u4E0B\u4E00\u6B21\u626B\u63CF\u540E\u4E0D\u518D\u53D1\u73B0\u5B83\u3002",{name:e.name}),tone:"success"},ue.toast({kind:"success",message:t?s("\u5DF2\u542F\u7528 {name}",{name:e.name}):s("\u5DF2\u5173\u95ED {name}",{name:e.name})}).catch(()=>{})}catch(o){v={text:ne(o),tone:"error"},S=null,g(),xt(!1,!0);return}S=null,g(),Zi(e.id)}},ts=async(e,t)=>{if(S)return;let o=e.activePath??e.disabledPath;if(o){S=`resolve:${o}`,v=null,g();try{let n=await xe("POST","/skills/resolve",{path:o,keep:t}),r=n&&typeof n=="object"&&typeof n.backupPath=="string"?n.backupPath:null;T=et(n),v={text:t==="enabled"?s("\u5DF2\u4FDD\u7559\u542F\u7528\u5165\u53E3{suffix}\u3002",{suffix:r?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:r}):""}):s("\u5DF2\u4FDD\u7559\u5173\u95ED\u5165\u53E3{suffix}\u3002",{suffix:r?s("\uFF1B\u65E7\u505C\u7528\u6587\u4EF6\u5907\u4EFD\u4E3A {path}",{path:r}):""}),tone:"success"},ue.toast({kind:"success",message:s("\u5165\u53E3\u51B2\u7A81\u5DF2\u5904\u7406")}).catch(()=>{})}catch(n){v={text:ne(n),tone:"error"},S=null,g(),xt(!1,!0);return}S=null,g()}},Is=e=>{!T||S||(Se=e,le=null,v=null,g(),be.scrollIntoView({block:"nearest"}),be.querySelector("button")?.focus())},ta=async()=>{if(Se===null||S)return;let e=Se;Se=null,le=null,S="bulk",v=null,g();try{let t=await xe("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(n=>typeof n=="string"):[];T=et(t),v={text:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}),tone:"success"},ue.toast({kind:"success",message:e?s("\u5DF2\u542F\u7528 {count} \u4E2A\u6280\u80FD\u3002",{count:o.length}):s("\u5DF2\u5173\u95ED {count} \u4E2A\u6280\u80FD\u3002",{count:o.length})}).catch(()=>{})}catch(t){v={text:ne(t),tone:"error"},S=null,g(),xt(!1,!0);return}S=null,g()},os=()=>{kt.setAttribute("aria-label",s("\u6280\u80FD\u5F00\u5173")),ls.textContent=s("\u6280\u80FD\u5F00\u5173"),to.setAttribute("aria-label",s("\u6280\u80FD\u8BF4\u660E\u8BED\u8A00")),ds.update({label:s("\u5168\u90E8\u542F\u7528")}),ps.update({label:s("\u5168\u90E8\u5173\u95ED")}),ks.update({value:gt,placeholder:s("\u641C\u7D22\u540D\u79F0\u3001\u63CF\u8FF0\u6216 ID\uFF08\u6309 / \u805A\u7126\uFF09")}),xn(),xs.update({value:ht,options:kn()}),jt?.setAttribute("aria-label",s("\u72B6\u6001\u7B5B\u9009")),As.update({value:oo,options:bn()}),qt?.setAttribute("aria-label",s("\u6392\u5E8F\u65B9\u5F0F")),gs.textContent=s("\u7BA1\u7406 ~/.config/opencode/skills\u3002\u5173\u95ED\u4F1A\u628A\u6280\u80FD\u5165\u53E3\u6539\u540D\u4E3A .disabled\uFF1BOpenCode \u4E0D\u518D\u52A0\u8F7D\uFF0C\u6A21\u578B\u4E5F\u770B\u4E0D\u5230\u3002"),hs.textContent=s("\u53EA\u663E\u793A\u8FD9\u4E2A\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u6280\u80FD\u3002\u505C\u7528\u6216\u5378\u8F7D\u524D\u5148\u5168\u90E8\u542F\u7528\uFF1B\u6280\u80FD\u66F4\u65B0\u540E\u91CD\u65B0\u626B\u63CF\u3002"),Jt?.setAttribute("aria-label",s("\u5206\u7EC4\u7B5B\u9009")),Ce.textContent=s(A?"\u5173\u95ED\u7F16\u8F91":"\u7F16\u8F91\u5206\u7EC4"),Ce.setAttribute("aria-pressed",A?"true":"false"),g()};ue.onLateGenerateResult(e=>{ys(e)});ue.onReady(e=>{Go(e,document.documentElement);let t=Ze.setLocale(e.locale);if(on(Ze),document.title=s("\u6280\u80FD\u5F00\u5173"),jr){if(!t){g();return}v=null,ie=null,os(),En(!0),Zt(!0);return}jr=!0,t&&os(),En(!0),Zt(!0)});document.title=s("\u6280\u80FD\u5F00\u5173");g();})();
