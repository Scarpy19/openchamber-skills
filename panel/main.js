"use strict";(()=>{var k="openchamber.sdk";var tt="data-oc-scrolling",wt=`
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
:hover, [${tt}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${tt}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${tt}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${tt}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Ut(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Rn=`(${Ut.toString()})(document);`;var Jo=e=>{let t=[],o=0,i=0;return{push:s=>{for(t.push(s),i+=s.length;i-o>e&&t.length>1;){let c=t.shift();i-=c?.length??0,o=0}},pull:s=>{let c=0;for(;c<s.length&&t.length>0;){let l=t[0],E=Math.min(s.length-c,l.length-o);s.set(l.subarray(o,o+E),c),c+=E,o+=E,o>=l.length&&(t.shift(),i-=l.length,o=0)}s.fill(0,c)},clear:()=>{t.length=0,o=0,i=0},get size(){return i-o}}};var er=/^[a-z][a-z0-9-]{0,39}$/;var Yo=e=>Object(e)===e&&!Array.isArray(e),Nt=(e,t)=>Object.keys(e).every(o=>t.includes(o)),Qo=e=>String(e)===e&&e.length>=1&&e.length<=60,Zo=e=>String(e)===e&&e.length>=1&&e.length<=80,tr=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!Yo(o)||!er.test(o.id)||!Qo(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Nt(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Nt(o,["kind","id","label","value","options","disabled"])||!Zo(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let s of o.options){if(!Yo(s)||!Nt(s,["value","label"])||!Zo(s.value)||!Qo(s.label)||i.has(s.value))return!1;i.add(s.value)}if(!i.has(o.value))return!1}return!0};var yn=1024*1024;var or=["{id}","{segment}","{segments+}"];var Ks=new Set(or);var rr=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var js=new Set(rr);var Lt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,nr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var sr=/^[A-Za-z0-9_-]{1,80}$/;var ir=["left","right","top","bottom"];var ar=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of i)if(!ar(s,t+1,o))return!1;return!0},Pt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Pt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Pt)}return String(e)===e||Number.isFinite(e)},Dt=e=>{try{return String(e.id)!==e.id||!sr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ir.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ar(e.data)||!Pt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ht=2e3;var lr=["file","directory","other","missing"],Vt=e=>!!(e&&"sessionId"in e),Xt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var dr=/^[0-9a-f]{7,64}$/i,$t=e=>dr.test(e),ot=500,rt=32e3,pr=16e3,ur=128,Er=200,_r=2e3,Sr=16e3,fr=80,Tr=200,mr=16e3;var hr=2e3;var Ft=2e4,nt=1024,st=2e6;var it=64e3,at=8e3,Bt=4e3;var Kt=96e4,vn=60*6e4;var Ar=999,gr=1e4,Be=500,br=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],kr=["stopped","starting","ready","failed"],Cn=new Set(br),Or=e=>Cn.has(e),xr=e=>e&&Or(e)?e:"HOST_REJECTED",Ue=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Ue):Object(e)===e?Object.values(e).every(Ue):!1,Rr=e=>Ue(e)&&JSON.stringify(e).length<=mr,cr=e=>e?.trim().slice(0,Tr)??"",Ne=e=>{let t=e.id.trim().slice(0,ur),o=e.title.trim().slice(0,Er),i=e.url.trim().slice(0,_r),s=e.text?.trim().slice(0,Sr),c=e.author?.trim().slice(0,fr),l=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:t,title:o||t,url:i,kind:l};if(s&&(E.text=s),c&&(E.author=c),l==="pull"){let g=cr(e.branches?.head),m=cr(e.branches?.base);g&&m&&(E.branches={head:g,base:m})}return Rr(e.data)&&(E.data=e.data),E},Wt=e=>{let t=Ne(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},jt=e=>{let t={text:e.text.trim().slice(0,pr)};return e.send&&(t.send=!0),t},zt=e=>e===null||!Number.isFinite(e)?null:Math.min(Ar,Math.max(0,Math.round(e))),qt=e=>Number.isFinite(e)?Math.min(gr,Math.max(0,Math.ceil(e))):0;var Le=e=>e.length>0&&e.length<=nt&&!e.includes("\0")&&!e.includes("\\");var ct=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>hr?!1:!e.split("/").some(o=>o==="."||o===".."),Mn=new Set(kr),Jt=e=>!!(e&&"status"in e&&Mn.has(String(e.status))&&!("body"in e)),lt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Yt=e=>!!(e&&"content"in e&&String(e.content)===e.content),Qt=e=>!!(e&&"written"in e&&e.written===!0),Zt=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),wn=new Set(lr),eo=e=>!!(e&&"kind"in e&&"size"in e&&wn.has(String(e.kind))&&Number.isFinite(e.size)),to=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Un=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),Nn=e=>Object(e)===e?e:null,Gt=e=>String(e)===e&&e.length>0,Ln=e=>{if(!Gt(e.id))return null;if(e.ok===!0){let t={channel:k,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Gt(e.error)?{channel:k,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:xr(Gt(e.code)?e.code:void 0)}:null},oo=e=>{let t=Nn(e);return!t||t.channel!==k||t.v!==1?null:t.type==="result"?Ln(t):!Un.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Ir=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Pn=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",T=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},yr=()=>Promise.reject(new T("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),dt=()=>Promise.reject(new T("BAD_PATH",`File path must be 1 to ${nt} characters without NUL or backslash.`)),pt=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new T("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},h=e=>(e.value+=1,`oc-${e.value}`),ao=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new T("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(r=>r===t.parent),i=e.requestTimeoutMs??Ft,s=new Set,c=new Set,l=new Set,E=new Set,g=new Set,m=new Set,x=new Set,J=new Set,B=new Set,X=new Set,$=new Set,ee=new Set,le=[],b=null,K=null,ne=new Set,xe=new Set,he=null,Ae=null,Me=!1,de=new Map,pe=new Map,ue=new Map,j=!1,u={value:0},_=null,Ee=null,$e=!1,Fe=!1,Go=null,Y=null,Ho=r=>r?{sessionId:r.id,phase:r.busy?"started":"completed"}:null,z=r=>{t.parent.postMessage(r,"*")},Vo=()=>{j||t.parent===t||ee.size===0||_?.features?.lateGenerateResults!==!0||z({channel:k,v:1,type:"generate-late-listen"})},C=(r,n)=>{for(let f of r)try{f(n)}catch(S){console.error(S)}},Xo=r=>{if(!(r instanceof MessageEvent)||!o(r.source))return;let n=oo(r.data);if(!n)return;if(n.type==="workspace"){let S=pe.get(n.payload.subscriptionId);S&&C([S],n.payload.snapshot);return}if(n.type==="shells"){let S=ue.get(n.payload.subscriptionId);S&&C([S],n.payload.snapshot);return}if(n.type==="microphone-audio"){Y?.queue.push(n.payload.samples);return}if(n.type==="microphone-ended"){let S=Y;if(!S)return;Y=null,S.release(),C(S.endedListeners,n.payload.reason);return}if(n.type==="ready"){_=n.payload,Ee=Ho(n.payload.session),C(s,n.payload),C(c,n.payload.directory),C(l,n.payload.session),Ee&&C(E,Ee),C(g,n.payload.connection),C(m,n.payload.settings),C(x,n.payload.item),n.payload.block&&C(J,n.payload.block),Vo();return}if(n.type==="service-event"){C(B,n.payload);return}if(n.type==="generate-late"){ee.size===0?le.push(n.payload):C(ee,n.payload);return}if(n.type==="directory"){_&&(_={..._,directory:n.payload.directory}),C(c,n.payload.directory);return}if(n.type==="session"){_&&(_={..._,session:n.payload.session}),n.payload.session?Ee?.sessionId!==n.payload.session.id&&(Ee=Ho(n.payload.session)):Ee=null,C(l,n.payload.session);return}if(n.type==="session-lifecycle"){Ee=n.payload,C(E,n.payload);return}if(n.type==="connection"){_&&(_={..._,connection:n.payload.connection}),C(g,n.payload.connection);return}if(n.type==="settings"){_&&(_={..._,settings:n.payload.settings}),C(m,n.payload.settings);return}if(n.type==="item"){_&&(_={..._,item:n.payload.item}),C(x,n.payload.item);return}if(n.type==="status-control-event"){C(X,n.payload);return}if(n.type==="popover-closed"){C($,n.payload);return}if(n.type==="action"){let S=y=>{j||z({channel:k,v:1,type:"action-result",id:n.id,payload:y})},I=K;if(!I){S({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>I(n.payload)).then(()=>S({ok:!0}),y=>{let M=(y instanceof Error?y.message:String(y)).trim();S({ok:!1,error:(M||"Action failed.").slice(0,Be)})});return}if(n.type==="file-open"){let S=n.payload;if(Ae&&nr(Ae,S))return;Ae=S,C(ne,n.payload);return}if(n.type==="file-saved"){C(xe,n.payload.version);return}if(n.type==="file-snapshot"){let S=M=>{j||z({channel:k,v:1,type:"file-snapshot-result",id:n.id,payload:M})},I=M=>S({error:(M.trim()||"Could not read the edited file.").slice(0,Be)}),y=he;if(!y){I("This extension does not edit files.");return}Promise.resolve().then(()=>y(n.payload.purpose)).then(M=>{if(Lt(M)>2e7){I(`The file is over ${2e7} ${"bytes"in M?"bytes":"characters"}.`);return}if(M.version.length>256){I(`The snapshot version is over ${256} characters.`);return}S({snapshot:"bytes"in M?{bytes:M.bytes,version:M.version}:{content:M.content,version:M.version}})},M=>I(M instanceof Error?M.message:String(M)));return}if(n.type==="resolve"){let S=y=>{z({channel:k,v:1,type:"resolve-result",id:n.id,payload:y})},I=b;if(!I){S({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>I(n.payload)).then(y=>S({item:y?Ne(y):null}),y=>{let M=(y instanceof Error?y.message:String(y)).trim();S({error:(M||"Command failed.").slice(0,Be)})});return}let f=de.get(n.id);if(f){if(clearTimeout(f.timer),de.delete(n.id),n.ok){f.resolve(n.payload);return}f.reject(new T(n.code,n.error))}};t.addEventListener("message",Xo),z({channel:k,v:1,type:"hello"});let F=(r,n=i)=>j||t.parent===t?Promise.reject(new T("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((f,S)=>{let I=setTimeout(()=>{de.delete(r.id),S(new T("HOST_TIMEOUT","Host did not answer in time."))},n);de.set(r.id,{resolve:f,reject:S,timer:I}),z(r)}),G=r=>F(r).then(()=>{}),U={channel:k,v:1},yt=r=>{!j&&t.parent!==t&&z(r)},$o=()=>yt({...U,type:"file-save"}),vt=()=>{!j&&t.parent!==t&&z({...U,type:"microphone-close",id:h(u)})},On=async()=>{if(Y)throw new T("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new T("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let r=globalThis.AudioContext;if(typeof r!="function")throw new T("UNSUPPORTED","This frame has no Web Audio.");let n=new r;if(n.sampleRate<8e3||n.sampleRate>192e3)throw n.close().catch(()=>{}),new T("UNSUPPORTED",`Audio at ${n.sampleRate} Hz is not supported.`);let f=n.state==="suspended"?n.resume().catch(()=>{}):void 0,S=Jo(Math.round(n.sampleRate/4)),I=n.createScriptProcessor(1024,1,1);I.onaudioprocess=te=>S.pull(te.outputBuffer.getChannelData(0));let y=n.createMediaStreamDestination();I.connect(y);let M=new Set,we={queue:S,endedListeners:M,release:()=>{I.onaudioprocess=null,I.disconnect(),S.clear();for(let te of y.stream.getTracks())te.stop();n.close().catch(()=>{})}};Y=we;try{let te=await F({...U,type:"microphone-open",id:h(u),payload:{sampleRate:n.sampleRate}},12e4);if(!te||!("opened"in te)||te.opened!==!0)throw new T("HOST_REJECTED","Host did not open the microphone.");if(await f,Y!==we)throw new T("DISCONNECTED","The microphone closed while it was opening.")}catch(te){throw Y===we&&(Y=null),we.release(),vt(),te}return{stream:y.stream,close:()=>{Y===we&&(Y=null,we.release(),vt())},onEnded:te=>(M.add(te),()=>{M.delete(te)})}},Fo=r=>{!Ir(r)||!Pn(r)||(r.preventDefault(),$o())},Bo=r=>{!Ir(r)||r.key!=="Escape"||_?.surface!=="popover"||!_.popover||(r.preventDefault(),zo(_.popover.id,"escape").catch(()=>{}))},Qe=()=>{let r=_?.surface==="popover"?_.popover:void 0;if(!r)return;let n=$e||Fe;Go!==n&&(Go=n,qo(r.id,n).catch(()=>{}))},Ze=()=>{_?.surface!=="popover"||$e||($e=!0,Qe())},Ko=r=>{_?.surface!=="popover"||r.relatedTarget!==null||!$e||($e=!1,Qe())},Wo=()=>{_?.surface!=="popover"||Fe||(Fe=!0,Qe())},jo=()=>{_?.surface!=="popover"||!Fe||(Fe=!1,Qe())},se=(r,n=1024)=>{if(!r.trim()||r.length>n)throw new T("HOST_REJECTED",`Identity must contain 1 to ${n} characters.`)},Ct=async r=>{r.kind!=="projects"&&se(r.projectId);let n=await F({...U,type:"workspace-read",id:h(u),payload:r});if(!n||!("kind"in n)||!("state"in n)||n.kind!==r.kind)throw new T("HOST_REJECTED","Host did not return workspace data.");return n},Mt=async(r,n)=>{r.kind!=="projects"&&se(r.projectId);let f=h(u);pe.set(f,n);try{await G({...U,type:"workspace-subscribe",id:h(u),payload:{subscriptionId:f,query:r}})}catch(S){throw pe.delete(f),j||z({...U,type:"workspace-unsubscribe",id:h(u),payload:{subscriptionId:f}}),S}return()=>{!pe.delete(f)||j||z({...U,type:"workspace-unsubscribe",id:h(u),payload:{subscriptionId:f}})}},xn=async(r,n)=>{r.kind==="session"&&se(r.sessionId),r.kind==="project"&&se(r.projectId);let f=h(u);ue.set(f,n);try{await G({...U,type:"shells-subscribe",id:h(u),payload:{subscriptionId:f,scope:r}})}catch(S){throw ue.delete(f),j||z({...U,type:"shells-unsubscribe",id:h(u),payload:{subscriptionId:f}}),S}return()=>{!ue.delete(f)||j||z({...U,type:"shells-unsubscribe",id:h(u),payload:{subscriptionId:f}})}},et=async r=>{if("key"in r&&(r.key.length===0||r.key.length>128))throw new T("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Ue(r.value))throw new T("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>65536)throw new T("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&_?.features?.deviceStorage!==!0)throw new T("UNSUPPORTED","This host does not support device storage.");let n=await F({...U,type:"storage",id:h(u),payload:r});if(!n||!("storage"in n)||n.op!==r.op)throw new T("HOST_REJECTED","Host did not return storage data.");return n},zo=(r,n)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===r)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):G({...U,type:"popover-close",id:h(u),payload:n?{id:r,reason:n}:{id:r}}),qo=(r,n)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===r)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):G({...U,type:"popover-anchor",id:h(u),payload:{id:r,active:n}});return t.addEventListener("keydown",Bo,!0),t.addEventListener("pointerover",Ze),t.addEventListener("pointermove",Ze),t.addEventListener("pointerout",Ko),t.addEventListener("focus",Wo),t.addEventListener("blur",jo),{onAction:r=>(K=r,()=>{K===r&&(K=null)}),listProjects:async()=>{let r=await Ct({kind:"projects"});if(r.kind!=="projects")throw new T("HOST_REJECTED","Expected projects.");return r},listWorktrees:async r=>{let n=await Ct({kind:"worktrees",projectId:r});if(n.kind!=="worktrees")throw new T("HOST_REJECTED","Expected worktrees.");return n},listSessions:async r=>{let n=await Ct({kind:"sessions",projectId:r});if(n.kind!=="sessions")throw new T("HOST_REJECTED","Expected sessions.");return n},onProjects:r=>Mt({kind:"projects"},n=>{n.kind==="projects"&&r(n)}),onWorktrees:(r,n)=>Mt({kind:"worktrees",projectId:r},f=>{f.kind==="worktrees"&&n(f)}),onSessions:(r,n)=>Mt({kind:"sessions",projectId:r},f=>{f.kind==="sessions"&&n(f)}),onRunningShells:(r,n)=>xn(r,n),readShellOutput:async(r,n)=>{se(r,128);let f=n?.cursor;if(f!==void 0&&(!Number.isInteger(f)||f<0))throw new T("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let S=n?.tailBytes;if(S!==void 0&&(!Number.isInteger(S)||S<1||S>65536))throw new T("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let y=await F({...U,type:"shell-output",id:h(u),payload:{shellId:r,cursor:f,tailBytes:S}});if(!y||typeof y.output!="string"||!Number.isFinite(y.cursor))throw new T("HOST_REJECTED","Host did not return shell output.");return y},stopShell:async r=>{if(se(r,128),(await F({...U,type:"shell-stop",id:h(u),payload:{shellId:r}}))?.stopped!==!0)throw new T("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async r=>{se(r),await G({...U,type:"open-session",id:h(u),payload:{sessionId:r}})},storage:{get:async(r,n)=>{let f=pt(n),S={op:"get",key:r};f&&(S.scope=f);let I=await et(S);return I.op==="get"&&I.found?I.value:void 0},set:async(r,n,f)=>{let S=pt(f),I={op:"set",key:r,value:n};S&&(I.scope=S),await et(I)},delete:async(r,n)=>{let f=pt(n),S={op:"delete",key:r};f&&(S.scope=f),await et(S)},keys:async r=>{let n=pt(r),f={op:"keys"};n&&(f.scope=n);let S=await et(f);if(S.op!=="keys")throw new T("HOST_REJECTED","Expected storage keys.");return S.keys}},onReady:r=>(s.add(r),_&&r(_),()=>{s.delete(r)}),onDirectory:r=>(c.add(r),_&&r(_.directory),()=>{c.delete(r)}),onSession:r=>(l.add(r),_&&r(_.session),()=>{l.delete(r)}),onSessionLifecycle:r=>(E.add(r),Ee&&r(Ee),()=>{E.delete(r)}),onConnection:r=>(g.add(r),_&&r(_.connection),()=>{g.delete(r)}),onSettings:r=>(m.add(r),_&&r(_.settings),()=>{m.delete(r)}),onItem:r=>(x.add(r),_&&r(_.item),()=>{x.delete(r)}),onBlock:r=>(J.add(r),_?.block&&r(_.block),()=>{J.delete(r)}),onServiceEvent:r=>(B.add(r),()=>{B.delete(r)}),onStatusControl:r=>(X.add(r),()=>{X.delete(r)}),onPopoverClosed:r=>($.add(r),()=>{$.delete(r)}),setStatusControls:r=>_?.features?.statusControls!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support status controls.")):tr(r)?G({...U,type:"status-controls",id:h(u),payload:{controls:r}}):Promise.reject(new T("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:r=>_?.features?.popovers!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):Dt(r)?G({...U,type:"popover-open",id:h(u),payload:r}):Promise.reject(new T("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:zo,setPopoverAnchorActive:qo,onResolve:r=>(b=r,()=>{b===r&&(b=null)}),toast:r=>{let n=r.message.trim();return!n||n.length>ot?Promise.reject(new T("HOST_REJECTED",`Toast message must contain 1 to ${ot} characters.`)):r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>rt)?Promise.reject(new T("HOST_REJECTED",`Toast copy text must contain 1 to ${rt} characters.`)):G({channel:k,v:1,type:"toast",id:h(u),payload:{...r,message:n}})},openUrl:r=>G({channel:k,v:1,type:"open-url",id:h(u),payload:{url:r}}),openCommit:r=>$t(r)?G({channel:k,v:1,type:"open-commit",id:h(u),payload:{sha:r}}):Promise.reject(new T("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:r=>G({channel:k,v:1,type:"block-answer",id:h(u),payload:{text:r.trim().slice(0,Ht)}}),openSurface:r=>G({channel:k,v:1,type:"open-surface",id:h(u),payload:{surfaceId:r}}),writeClipboard:r=>G({channel:k,v:1,type:"clipboard-write",id:h(u),payload:{text:r}}),compose:r=>G({channel:k,v:1,type:"compose",id:h(u),payload:r}),attach:r=>G({channel:k,v:1,type:"attach",id:h(u),payload:Ne(r)}),startSession:async r=>{r.projectId!==void 0&&se(r.projectId);let n=r.worktree;n&&n!==!0&&(n.kind==="existing"?se(n.directory):(n.name!==void 0&&se(n.name,200),n.baseBranch!==void 0&&se(n.baseBranch,200)));let f=await F({channel:k,v:1,type:"start-session",id:h(u),payload:Wt(r)},e.requestTimeoutMs??18e4);if(!Vt(f))throw new T("HOST_REJECTED","Host did not return a session.");return f},prompt:r=>F({channel:k,v:1,type:"prompt",id:h(u),payload:jt(r)}).then(n=>{if(!Xt(n))throw new T("HOST_REJECTED","Host did not return a prompt result.");return n}),sessionLink:r=>G({channel:k,v:1,type:"session-link",id:h(u),payload:Ne(r)}),close:()=>G({channel:k,v:1,type:"close",id:h(u)}),oauthStart:()=>G({channel:k,v:1,type:"oauth-start",id:h(u)}),oauthDisconnect:()=>G({channel:k,v:1,type:"oauth-disconnect",id:h(u)}),request:r=>(ct(r.path)?F({channel:k,v:1,type:"request",id:h(u),payload:r}):yr()).then(n=>{if(!lt(n))throw new T("HOST_REJECTED","Host request result was empty.");return n}),serviceRequest:r=>(ct(r.path)?F({channel:k,v:1,type:"service-request",id:h(u),payload:r}):yr()).then(n=>{if(!lt(n))throw new T("HOST_REJECTED","Host service request result was empty.");return n}),serviceStatus:()=>F({channel:k,v:1,type:"service-status",id:h(u)}).then(r=>{if(!Jt(r))throw new T("HOST_REJECTED","Host did not return service status.");return r}),readFile:r=>(Le(r)?F({channel:k,v:1,type:"file-read",id:h(u),payload:{path:r}}):dt()).then(n=>{if(!Yt(n))throw new T("HOST_REJECTED","Host did not return file content.");return n}),writeFile:(r,n)=>Le(r)?n.length>st?Promise.reject(new T("FILE_TOO_LARGE",`Content is over ${st} characters.`)):F({channel:k,v:1,type:"file-write",id:h(u),payload:{path:r,content:n}}).then(f=>{if(!Qt(f))throw new T("HOST_REJECTED","Host did not confirm the write.");return f}):dt(),listDir:r=>(Le(r)?F({channel:k,v:1,type:"file-list",id:h(u),payload:{path:r}}):dt()).then(n=>{if(!Zt(n))throw new T("HOST_REJECTED","Host did not return directory entries.");return n}),stat:r=>(Le(r)?F({channel:k,v:1,type:"file-stat",id:h(u),payload:{path:r}}):dt()).then(n=>{if(!eo(n))throw new T("HOST_REJECTED","Host did not return file status.");return n}),generate:r=>{let n=r.prompt.trim(),f=r.system?.trim();if(n.length===0||n.length>it)return Promise.reject(new T("HOST_REJECTED",`Prompt must be 1 to ${it} characters.`));if(f!==void 0&&(f.length===0||f.length>at))return Promise.reject(new T("HOST_REJECTED",`System prompt must be 1 to ${at} characters.`));let S=r.maxOutputTokens===void 0?void 0:Math.min(Bt,Math.max(1,Math.floor(r.maxOutputTokens)));if(S!==void 0&&!Number.isFinite(S))return Promise.reject(new T("HOST_REJECTED","maxOutputTokens must be a number."));let I={prompt:n};return f!==void 0&&(I.system=f),S!==void 0&&(I.maxOutputTokens=S),F({channel:k,v:1,type:"generate",id:h(u),payload:I},e.requestTimeoutMs??Kt).then(y=>{if(!to(y))throw new T("HOST_REJECTED","Host did not return generated text.");return y})},onLateGenerateResult:r=>{ee.add(r);for(let n of le.splice(0))C([r],n);return Vo(),()=>{ee.delete(r)}},openMicrophone:On,setBadge:r=>G({channel:k,v:1,type:"badge",id:h(u),payload:{count:zt(r)}}),setHeight:r=>G({channel:k,v:1,type:"resize",id:h(u),payload:{height:qt(r)}}),onFileOpen:r=>(ne.add(r),Me||(Me=!0,t.addEventListener("keydown",Fo,!0)),Ae&&r(Ae),()=>{ne.delete(r)}),onFileSnapshot:r=>(he=r,()=>{he===r&&(he=null)}),onFileSaved:r=>(xe.add(r),()=>{xe.delete(r)}),reportFileChange:r=>yt({...U,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:$o,reportFileUnsupported:()=>yt({...U,type:"file-unsupported"}),dispose:()=>{for(let r of pe.keys())z({...U,type:"workspace-unsubscribe",id:h(u),payload:{subscriptionId:r}});pe.clear();for(let r of ue.keys())z({...U,type:"shells-unsubscribe",id:h(u),payload:{subscriptionId:r}});ue.clear(),Y&&(vt(),Y.release(),Y=null),j=!0,b=null,K=null,he=null,ne.clear(),xe.clear(),Me&&t.removeEventListener("keydown",Fo,!0),t.removeEventListener("message",Xo),t.removeEventListener("keydown",Bo,!0),t.removeEventListener("pointerover",Ze),t.removeEventListener("pointermove",Ze),t.removeEventListener("pointerout",Ko),t.removeEventListener("focus",Wo),t.removeEventListener("blur",jo);for(let r of de.values())clearTimeout(r.timer),r.reject(new T("HOST_UNAVAILABLE","Host client was disposed."));de.clear(),s.clear(),c.clear(),l.clear(),E.clear(),g.clear(),m.clear(),x.clear(),J.clear(),B.clear(),X.clear(),$.clear(),ee.clear(),le.length=0}}};var Nr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var di=new Set(Nr);var Dn=10*6e4;var Gn=10*6e4;var Hn=10*6e4;var Vn=10*6e4;var Lr=["none","agent","user"];var ui=new Set(Lr);var Xn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],$n=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Pr=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,i]of Xn)t.style.setProperty(o,e.tokens[i]);for(let[o,i,s]of $n){let c=e.tokens[s]??"";t.style.setProperty(o,c),t.style.setProperty(i,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},co=(e,t)=>{Pr(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Fn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},w=(e,t)=>`var(--${e}, var(--oc-${Fn[e]}, ${t}))`,Se=w("surface-background","transparent"),Et=w("surface-elevated","transparent"),Pe=w("surface-elevated-foreground","inherit"),Q=w("surface-foreground","inherit"),N=w("surface-muted-foreground","gray"),Bn=w("surface-muted","transparent"),Re=w("interactive-border","currentColor"),q=w("interactive-hover","transparent"),Ie=w("interactive-active","transparent"),lo=w("interactive-selection","transparent"),po=w("interactive-selection-foreground","inherit"),_e=w("primary","currentColor"),uo=w("primary-text","inherit"),Eo=w("error-text","inherit"),Kn=w("font-sans","inherit"),_o=w("font-mono","monospace"),Vr=w("radius","9px"),So=`calc(${Vr} - 2px)`,Dr=`calc(${Vr} - 4px)`,L=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Gr=`background-image: linear-gradient(${q}, ${q});`,fo=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,To="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Hr="box-shadow: var(--oc-sdk-lit);",mo=`inset 0 0.5px 0 0 ${L(Q,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Wn=`
:root {
  --oc-sdk-edge: ${L(Q,16)};
  --oc-sdk-field-bg: ${Et};
  --oc-sdk-raised-bg: ${Se};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${L(Q,14)};
  --oc-sdk-field-bg: ${L(Se,50,Et)};
  --oc-sdk-raised-bg: ${Et};
  --oc-sdk-field-lift: ${mo};
  --oc-sdk-raised-lift: ${mo};
  --oc-sdk-lit: ${mo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,ut=e=>{let t=w(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${w(`${e}-text`,"inherit")}; }`},d=e=>`calc(${e}rem / 14)`,jn=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${d(8)}; height: ${d(32)}; padding: 0 ${d(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${d(6)}; height: ${d(28)}; padding: 0 ${d(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${d(4)}; height: ${d(24)}; padding: 0 ${d(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${d(14)}; height: ${d(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${d(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${d(32)}; padding: 0 ${d(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${d(8)} ${d(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${d(34)}; padding-right: ${d(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${d(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${d(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${d(24)}; height: ${d(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${d(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${d(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${d(28)}; padding: 0 ${d(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${d(2)}; min-width: ${d(160)}; max-width: calc(100vw - ${d(16)}); max-height: min(${d(320)}, calc(100vh - ${d(16)})); overflow: auto; padding: ${d(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${d(2)} ${d(2)} ${d(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${d(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${d(8)}; width: 100%; padding: ${d(6)} ${d(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${d(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${d(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${d(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${d(14)}; height: ${d(14)}; margin-top: ${d(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${d(36)}; height: ${d(20)}; --oc-sdk-thumb-travel: ${d(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${d(2)}; left: ${d(2)}; width: ${d(16)}; height: ${d(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${d(2)}; padding: ${d(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${d(6)}; height: ${d(28)}; padding: 0 ${d(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${d(1)} ${d(6)}; font-size: ${d(11)}; font-weight: 500; line-height: ${d(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${d(8)}; width: 100%; padding: ${d(6)} ${d(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${d(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${d(16)} ${d(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${d(4)}; padding: ${d(40)} ${d(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${d(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${d(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${d(16)}; height: ${d(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${d(12)}; height: ${d(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${d(12)}; padding: ${d(8)} ${d(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${d(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${d(8)}; width: 100%; margin: ${d(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${d(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${d(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${d(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${d(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${d(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${d(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${d(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${d(36)}; height: ${d(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${d(44)}; }
  .oc-sdk-check { min-height: ${d(36)}; padding: ${d(8)} 0; }
}
`,Xr=`${Wn}
.oc-sdk { color: ${Q}; font-family: ${Kn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Gr} }
.oc-sdk-mono { font-family: ${_o}; }
.oc-sdk-muted { color: ${N}; }
${ut("success")}${ut("warning")}${ut("error")}${ut("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${_e}; --oc-sdk-tone-text: ${uo}; }

.oc-sdk-btn { border-radius: ${So}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Dr}; }
.oc-sdk-btn[data-variant="default"] { color: ${uo}; background: ${L(_e,10,Se)}; border-color: ${L(_e,12)}; ${Hr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${L(_e,16,Se)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${L(_e,22,Se)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Bn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ie}, ${Ie}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Pe}; ${To} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ie}, ${Ie}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${q}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ie}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${w("status-error","red")}; color: ${Eo}; background: ${L("var(--oc-sdk-tone)",7,Se)}; border-color: ${L("var(--oc-sdk-tone)",12)}; ${Hr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${L("var(--oc-sdk-tone)",9,Se)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${L("var(--oc-sdk-tone)",11,Se)}; box-shadow: none; }

.oc-sdk-field-note { color: ${N}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Eo}; }
.oc-sdk-input { border-radius: ${So}; background: var(--oc-sdk-field-bg); color: ${Pe}; ${fo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${N}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${fo(L(Q,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${fo(w("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${_o}; }

.oc-sdk-search-icon { color: ${N}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${_e}; }
.oc-sdk-search-clear { border-radius: ${Dr}; color: ${N}; }
.oc-sdk-search-clear:hover { background: ${q}; color: ${Q}; }

.oc-sdk-trigger { border-radius: ${So}; background: var(--oc-sdk-raised-bg); color: ${Pe}; ${To} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ie}, ${Ie}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${N}; }
.oc-sdk-trigger-chevron { color: ${N}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Pe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Et}; background-clip: padding-box; color: ${Pe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${q}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${lo}; color: ${po}; }
.oc-sdk-option-check { color: ${Q}; }
.oc-sdk-option[data-destructive="true"] { color: ${Eo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${L(w("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${N}; }
.oc-sdk-popup-empty { color: ${N}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Re}; border-radius: 4px; color: ${Q}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${L(Q,60,Re)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Re}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Se}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${_e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Gr} }
.oc-sdk-check-desc { color: ${N}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${L(Q,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${N}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Q}; }
.oc-sdk-tab[aria-selected="true"] { color: ${po}; background: ${lo}; border-color: ${Re}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Pe}; background: var(--oc-sdk-raised-bg); ${To} }
.oc-sdk-tab-count { color: ${N}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${L(Q,6)}; color: ${N}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${L("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${q}; }
.oc-sdk-row[aria-selected="true"] { background: ${lo}; color: ${po}; }
.oc-sdk-row-lead { font-family: ${_o}; color: ${N}; }
.oc-sdk-row-sub { color: ${N}; }
.oc-sdk-row-meta { color: ${N}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${N}; }

.oc-sdk-empty-body { color: ${N}; }

.oc-sdk-spinner { color: ${N}; }
.oc-sdk-spinner-ring { border-color: ${Re}; border-top-color: ${_e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${L("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${N}; }

.oc-sdk-separator { color: ${N}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${L(Re,40)}; }

.oc-sdk-progress-label { color: ${N}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${L(Q,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${_e}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${w("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${w("success-text","inherit")}; }

.oc-sdk-text a { color: ${uo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${L(Re,60)}; }
`,H=`
${wt}
${jn}
${Xr}`;var $r="oc-sdk-ui-style",ye=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},V=e=>{let t=document.getElementById($r);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Ut(document);let o=document.createElement("style");o.id=$r,o.textContent=e,document.head.appendChild(o)},R=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},ie=e=>{let t=R("button",e);return t.type="button",t},Z=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},ge=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},Fr=(e,t)=>{let o=i=>{i.target instanceof Node&&e.contains(i.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var zn=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},fe=(e,t)=>{V(H);let o=t,i=ie("oc-sdk oc-sdk-btn"),s=zn(),c=document.createElement("span");i.append(c),e.append(i);let l=()=>{i.dataset.variant=o.variant??"default",i.dataset.size=o.size??"default",i.disabled=!!o.disabled||!!o.loading,i.dataset.loading=o.loading?"true":"false",i.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&s.parentNode!==i?i.prepend(s):!o.loading&&s.parentNode===i&&s.remove(),Z(c,o.label)},E=()=>{o.disabled||o.loading||o.onClick()};return i.addEventListener("click",E),l(),{update:g=>{o={...o,...g},l()},dispose:()=>{i.removeEventListener("click",E),i.remove()}}};var Br="http://www.w3.org/2000/svg",qn={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Te=(e,t,o)=>{let i=document.createElementNS(Br,"svg");i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("width",String(t)),i.setAttribute("height",String(t)),i.style.width=d(t),i.style.height=d(t),i.setAttribute("aria-hidden","true"),i.setAttribute("fill","currentColor"),o&&i.setAttribute("class",o);let s=document.createElementNS(Br,"path");return s.setAttribute("d",qn[e]),i.append(s),i};var ho=(e,t)=>{V(H);let o=t,i=R("div","oc-sdk oc-sdk-search"),s=R("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let c=ie("oc-sdk-search-clear");c.append(Te("close",14)),c.tabIndex=-1,i.append(Te("search",16,"oc-sdk-search-icon"),s,c),e.append(i);let l=()=>{let x=o.placeholder??"Search";ge(s,"placeholder",x),s.setAttribute("aria-label",o.label??x),c.setAttribute("aria-label","Clear search"),s.value!==o.value&&(s.value=o.value),i.dataset.active=o.value.trim()===""?"false":"true"},E=()=>{o.value!==""&&o.onChange(""),s.focus()},g=()=>{o.onChange(s.value)},m=x=>{x.key==="Escape"&&s.value!==""&&(x.preventDefault(),E())};return s.addEventListener("input",g),s.addEventListener("keydown",m),c.addEventListener("click",E),l(),o.autofocus&&s.focus(),{update:x=>{o={...o,...x},l()},dispose:()=>{s.removeEventListener("input",g),s.removeEventListener("keydown",m),c.removeEventListener("click",E),i.remove()}}};var be=(e,t="vertical")=>{let[o,i]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===i||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},ve=(e,t,o)=>{let i=e.filter(g=>!g.disabled);if(i.length===0)return null;let s=i[0],c=i[i.length-1];if(o==="first"||!s||!c)return s?.id??null;if(o==="last")return c.id;let l=i.findIndex(g=>g.id===t);return l===-1?o==="next"?s.id:c.id:i[Math.min(i.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var Kr=(e,t)=>`${e}-${t??""}`,_t=(e,t,o,i)=>{let s=ie("oc-sdk-option");s.id=Kr(e,o.id),s.setAttribute("role",t),s.tabIndex=-1,s.disabled=!!o.disabled,t==="option"&&s.setAttribute("aria-selected",o.selected?"true":"false"),s.dataset.destructive=o.destructive?"true":"false";let c=R("span","oc-sdk-option-label");if(c.textContent=o.label,s.append(c),o.hint){let l=R("span","oc-sdk-option-hint");l.textContent=o.hint,s.append(l)}if(t==="option"){s.dataset.mark="check";let l=R("span","oc-sdk-option-check");l.append(Te("check",14)),s.append(l)}return s.addEventListener("pointerenter",i.hover),s.addEventListener("click",i.pick),s},St=(e,t,o,i)=>{let s=Kr(o,i);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===s?"true":"false");ge(t,"aria-activedescendant",i?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Jn=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let i=e.offsetHeight,s=window.innerHeight-o.bottom-8;i>s&&o.top-8>s&&(e.style.top=`${Math.max(8,Math.round(o.top-4-i))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},ft=(e,t,o,i)=>{e.append(o),Jn(o,t);let s=Fr(e,i),c=()=>{i()},l=E=>{E.target instanceof Node&&o.contains(E.target)||i()};return window.addEventListener("resize",c),window.addEventListener("scroll",l,!0),()=>{s(),window.removeEventListener("resize",c),window.removeEventListener("scroll",l,!0),o.remove()}};var Wr=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(i=>i.label.toLowerCase().includes(o)||i.id.toLowerCase().includes(o)):[...e]},Yn=0,Ke=(e,t)=>{V(H);let o=t,i=`oc-sdk-select-${Yn+=1}`,s=R("div","oc-sdk oc-sdk-select"),c=R("span","oc-sdk-field-label");c.id=`${i}-label`;let l=ie("oc-sdk-trigger");l.setAttribute("aria-haspopup","listbox"),l.setAttribute("aria-labelledby",c.id);let E=R("span","oc-sdk-trigger-value");l.append(E,Te("chevron",14,"oc-sdk-trigger-chevron")),s.append(c,l),e.append(s);let g="",m=null,x=null,J=R("div","oc-sdk oc-sdk-popup"),B=R("div","oc-sdk-popup-search"),X=R("input","oc-sdk-input");X.type="text",X.autocomplete="off",B.append(X);let $=R("div");$.setAttribute("role","listbox"),$.tabIndex=-1,J.append($);let ee=()=>Wr(o.options,o.searchable?g:""),le=()=>o.searchable?X:$,b=u=>{m=u,St($,le(),i,u)},K=()=>{ye($);let u=ee();if(u.length===0){let _=R("div","oc-sdk-popup-empty");_.textContent="No matches",$.append(_)}for(let _ of u)$.append(_t(i,"option",{..._,selected:_.id===o.value},{hover:()=>b(_.id),pick:()=>he(_.id)}));b(u.some(_=>_.id===m)?m:u[0]?.id??null)},ne=()=>{let u=x;x=null,u?.(),g="",X.value="",l.setAttribute("aria-expanded","false")},xe=()=>{x||o.disabled||(m=o.value,X.placeholder=o.searchPlaceholder??"Search",o.searchable?J.prepend(B):B.remove(),K(),x=ft(s,l,J,ne),l.setAttribute("aria-expanded","true"),le().focus())},he=u=>{ne(),l.focus(),u!==o.value&&o.onChange(u)},Ae=()=>{x?ne():xe()},Me=u=>{!x&&be(u)&&(u.preventDefault(),xe())},de=u=>{let _=be(u);_?(u.preventDefault(),b(ve(ee(),m,_))):u.key==="Enter"?(u.preventDefault(),m&&he(m)):u.key==="Escape"?(u.preventDefault(),ne(),l.focus()):o.searchable&&u.target!==X&&u.key.length===1&&!u.ctrlKey&&!u.metaKey&&X.focus()},pe=()=>{g=X.value,K()},ue=u=>{x&&!(u.relatedTarget instanceof Node&&s.contains(u.relatedTarget))&&ne()},j=()=>{Z(c,o.label),c.hidden=!o.label;let u=o.options.find(_=>_.id===o.value);Z(E,u?.label??o.placeholder??"Select"),E.dataset.empty=u?"false":"true",l.disabled=!!o.disabled,x&&K()};return l.addEventListener("click",Ae),l.addEventListener("keydown",Me),J.addEventListener("keydown",de),X.addEventListener("input",pe),s.addEventListener("focusout",ue),j(),{update:u=>{o={...o,...u},j()},dispose:()=>{ne(),l.removeEventListener("click",Ae),l.removeEventListener("keydown",Me),J.removeEventListener("keydown",de),X.removeEventListener("input",pe),s.removeEventListener("focusout",ue),s.remove()}}};var jr=e=>e.filter(t=>!("separator"in t)),Zn=0,Tt=(e,t)=>{V(H);let o=t,i=`oc-sdk-menu-${Zn+=1}`,s=R("div","oc-sdk oc-sdk-menu");e.append(s);let c=R("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let l=null,E=null,g=fe(s,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{l?B():X()}}),m=s.querySelector("button");m?.setAttribute("aria-haspopup","menu");let x=b=>{E=b,St(c,c,i,b)},J=()=>{ye(c);for(let b of o.items){if("separator"in b){let K=R("div","oc-sdk-separator");K.dataset.labeled="false",c.append(K);continue}c.append(_t(i,"menuitem",b,{hover:()=>x(b.id),pick:()=>$(b.id)}))}x(jr(o.items).some(b=>b.id===E)?E:null)},B=()=>{let b=l;l=null,b?.(),E=null,m?.setAttribute("aria-expanded","false")},X=()=>{l||!m||(J(),l=ft(s,m,c,B),m.setAttribute("aria-expanded","true"),c.focus())},$=b=>{B(),m?.focus(),o.onSelect(b)},ee=b=>{let K=be(b);K?(b.preventDefault(),x(ve(jr(o.items),E,K))):b.key==="Enter"||b.key===" "?(b.preventDefault(),E&&$(E)):b.key==="Escape"&&(b.preventDefault(),B(),m?.focus())},le=b=>{l&&!(b.relatedTarget instanceof Node&&s.contains(b.relatedTarget))&&B()};return c.addEventListener("keydown",ee),s.addEventListener("focusout",le),{update:b=>{o={...o,...b},g.update({label:o.label,variant:o.variant,size:o.size}),l&&J()},dispose:()=>{B(),c.removeEventListener("keydown",ee),s.removeEventListener("focusout",le),g.dispose(),s.remove()}}};var Ao=(e,t)=>e.name.localeCompare(t.name,void 0,{sensitivity:"base"})||e.id.localeCompare(t.id),zr=e=>{switch(e.state){case"conflict":return 0;case"mixed":return 1;case"enabled":return 2;default:return 3}},es=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,ts=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return es(e);case"all":default:return!0}},os=(e,t)=>{let o=t.trim().toLowerCase();return o?[e.id,e.name,e.description,...e.warnings].join(" ").toLowerCase().includes(o):!0},We=e=>({enable:e.filter(t=>t.state==="disabled").map(t=>t.key??t.id),disable:e.filter(t=>t.state==="enabled").map(t=>t.key??t.id)}),qr=(e,t)=>{let o=t.sourceFilter??"all",i=e.filter(s=>(o==="all"||s.scope===o)&&ts(s,t.stateFilter)&&os(s,t.query));switch(t.sortMode){case"tokens":return[...i].sort((s,c)=>c.estimatedTokens-s.estimatedTokens||Ao(s,c));case"name":return[...i].sort(Ao);case"state":return[...i].sort((s,c)=>zr(s)-zr(c)||Ao(s,c));case"default":default:return i}};function Jr(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",i=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Yr=`:root {
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
`;var Qr=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var a=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,i)=>Object.prototype.hasOwnProperty.call(t,i)?String(t[i]):o):e,ce=ao({requestTimeoutMs:3e4}),an=document.querySelector("#root");if(!an)throw new Error("Missing #root");Jr(document);var cn=document.createElement("style");cn.textContent=Qr+Yr;document.head.append(cn);var p=(e,t="",o)=>{let i=document.createElement(e);return i.className=t,o!==void 0&&(i.textContent=o),i},Oe=class extends Error{code;conflicts;constructor(t,o,i){super(t),this.name="ServiceError",this.code=o,this.conflicts=i}},ss=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",is=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",me=(e,t="")=>typeof e=="string"?e:t,Zr=e=>typeof e=="string"&&e.length>0?e:null,At=e=>e===!0,ln=e=>typeof e=="number"&&Number.isFinite(e)?e:0,en=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],Mo=e=>{if(!e||typeof e!="object")return null;let t=e;return!is(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:me(t.message,a("Conflict")),activePath:Zr(t.activePath),disabledPath:Zr(t.disabledPath),blocking:At(t.blocking)}},as=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!ss(t.state)?null:{key:me(t.key,t.id),id:t.id,scope:t.scope==="project"?"project":"global",sourceId:me(t.sourceId,"opencode-global"),rootPath:me(t.rootPath),name:me(t.name,t.id),description:me(t.description),state:t.state,advertised:At(t.advertised),autoInvokeOff:At(t.autoInvokeOff),activePaths:en(t.activePaths),disabledPaths:en(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(Mo).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:ln(t.estimatedTokens)}},tn=e=>{if(!e||typeof e!="object")throw new Oe(a("The service returned invalid skill directory information."),"parse",[]);let t=e;return{sourceId:me(t.sourceId,"opencode-global"),scope:t.scope==="project"?"project":"global",label:me(t.label,a("Skill directory")),path:me(t.path),exists:At(t.exists),error:typeof t.error=="string"?t.error:null}},Je=e=>{if(!e||typeof e!="object")throw new Oe(a("The service returned data in an unexpected format."),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new Oe(a("The service returned data in an unexpected format."),"parse",[]);let o=t.skills.map(as).filter(E=>E!==null),i=Array.isArray(t.conflicts)?t.conflicts.map(Mo).filter(E=>E!==null):o.flatMap(E=>E.conflicts),s=i.filter(E=>E.blocking).length,c={total:o.length,advertised:o.filter(E=>E.advertised).length,disabled:o.filter(E=>E.state==="disabled").length,blockingConflicts:s,warnings:i.length-s,estimatedTokens:o.reduce((E,g)=>E+g.estimatedTokens,0)},l=Array.isArray(t.roots)?t.roots.map(tn):t.root?[tn(t.root)]:[];return{skills:o,conflicts:i,summary:c,root:l[0]??{sourceId:"opencode-global",scope:"global",label:a("Skill directory"),path:"",exists:!1,error:null},roots:l,projectDirectory:typeof t.projectDirectory=="string"?t.projectDirectory:null,scannedAt:ln(t.scannedAt)}},cs=async(e,t,o,i)=>{let s=await ce.serviceRequest({method:e,path:t,...i?{query:i}:{},...o===void 0?{}:{body:JSON.stringify(o)}}),c;try{c=JSON.parse(s.body)}catch{throw new Oe(a("The service returned unrecognized data. Try again."),"parse",[])}if(s.status>=400){let l=c&&typeof c=="object"?c:{},E=typeof l.error=="string"?l.error:a("Request failed ({status})",{status:s.status}),g=typeof l.code=="string"?l.code:null,m=Array.isArray(l.conflicts)?l.conflicts.map(Mo).filter(x=>x!==null):[];throw new Oe(E,g,m)}return c},Ye=async(e,t,o)=>{let i=Ge,s=o===void 0||e==="GET"?void 0:{...o,directory:i??void 0},c=await cs(e,t,s,e==="GET"&&i?{directory:i}:void 0);if(i!==Ge)throw new Error(a("The project changed; rescan before making changes."));return c},He=e=>e instanceof T?e.code==="NO_SERVICE"?a('Allow "Skills" to run its local service in Settings \u2192 Extensions.'):e.code==="SERVICE_FAILED"?a("The local service is not ready. Reload the extension and try again."):e.code==="DISABLED"?a("The Skills extension is disabled. Enable it in extension settings."):e.code==="HOST_TIMEOUT"?a("The local service timed out. Try again."):a("Cannot connect to the local service. Check extension permissions."):e instanceof Oe||e instanceof Error?e.message:a("The operation failed. Try again."),kt=p("main","ext ext-container sk");kt.setAttribute("aria-label",a("Skills Manager"));var dn=p("header","sk-header"),pn=p("div","sk-title-row"),ls=p("h1","sk-title",a("Skills Manager")),Ot=p("div","sk-actions"),ds=fe(Ot,{label:a("Rescan"),variant:"outline",size:"sm",onClick:()=>{Ce(!0)}}),ps=fe(Ot,{label:a("Enable all"),variant:"outline",size:"sm",onClick:()=>bn(!0)}),us=fe(Ot,{label:a("Disable all"),variant:"outline",size:"sm",onClick:()=>bn(!1)});pn.append(ls,Ot);var yo=p("p","sk-summary"),vo=p("p","sk-summary sk-summary-secondary");dn.append(pn,yo,vo);var un=p("div","sk-body"),oe=p("div","sk-notice-root");oe.setAttribute("aria-live","polite");var qe=p("div"),De=p("details","sk-sources"),En=p("div","sk-toolbar"),wo=p("div","sk-search-slot"),_n=p("div","sk-toolbar-selects"),Uo=p("div","sk-toolbar-actions"),No=p("div","sk-filter-slot"),Lo=p("div","sk-source-slot"),Po=p("div","sk-sort-slot");_n.append(No,Lo,Po);var Es=Tt(Uo,{label:a("List actions"),variant:"ghost",size:"sm",items:[{id:"invert",label:a("Invert visible skills")},{id:"copy-ids",label:a("Copy visible IDs")}],onSelect:e=>{e==="invert"?Is():e==="copy-ids"&&Rs()}}),go=Uo.querySelector(".oc-sdk-btn");go&&(go.setAttribute("aria-label",a("List actions")),go.title=a("Copy IDs or invert the visible skills"));En.append(wo,_n,Uo);var je=p("div","sk-list");je.setAttribute("role","list");var Sn=p("footer","sk-footer"),_s=p("p","",a("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open.")),Ss=p("p","",a("Enable all before disabling or uninstalling the extension; rescan after skills change."));Sn.append(_s,Ss);un.append(oe,qe,De,En,je,Sn);kt.append(dn,un);an.append(kt);var A=null,ae=!1,mt=0,ze=null,P=null,v=null,W=null,re=!1,xt="",Rt="all",It="all",Do="default",Ge=null,ht=new Set,on,rn=!1,fn=()=>[{id:"all",label:a("All states")},{id:"enabled",label:a("Enabled")},{id:"disabled",label:a("Disabled")},{id:"attention",label:a("Needs attention")}],Tn=()=>[{id:"all",label:a("All sources")},{id:"global",label:a("Global")},{id:"project",label:a("Project")}],mn=()=>[{id:"default",label:a("Default order")},{id:"tokens",label:a("Tokens (high to low)")},{id:"name",label:a("Name (A\u2013Z)")},{id:"state",label:a("Needs attention first")}],fs=ho(wo,{value:"",placeholder:a("Search name, description, or ID (press / to focus)"),onChange:e=>{xt=e,Xe()}}),hn=()=>wo.querySelector("input"),An=()=>{let e=hn();e&&e.setAttribute("aria-label",a("Search skills"))};An();var Ts=Ke(No,{value:"all",options:fn(),onChange:e=>{Rt=e==="enabled"||e==="disabled"||e==="attention"?e:"all",Xe()}}),bo=No.querySelector(".oc-sdk-trigger");bo&&(bo.setAttribute("aria-label",a("Filter by status")),bo.removeAttribute("aria-labelledby"));var ms=Ke(Lo,{value:"all",options:Tn(),onChange:e=>{It=e==="global"||e==="project"?e:"all",Xe()}}),ko=Lo.querySelector(".oc-sdk-trigger");ko&&(ko.setAttribute("aria-label",a("Filter by skill source")),ko.removeAttribute("aria-labelledby"));var hs=Ke(Po,{value:"default",options:mn(),onChange:e=>{Do=e==="tokens"||e==="name"||e==="state"?e:"default",Xe()}}),Oo=Po.querySelector(".oc-sdk-trigger");Oo&&(Oo.setAttribute("aria-label",a("Sort order")),Oo.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=hn();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"&&(W!==null||re)){e.preventDefault(),W=null,re=!1,D();return}}});var gt=()=>!!(A?.root.error||A?.roots.some(e=>e.error)),Ve=()=>{let e=A;return e?qr(e.skills,{query:xt,stateFilter:Rt,sourceFilter:It,sortMode:Do}):[]},As=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",gs=e=>e.state==="conflict"?a("Conflict"):e.state==="mixed"?a("Mixed"):e.state==="disabled"?a("Disabled"):a("Enabled"),bt=(e,t="neutral")=>{let o=p("span","sk-badge",e);return o.dataset.tone=t,o},bs=e=>{switch(e){case"both":return a("Both entry and disabled file exist");case"duplicate":return a("Multiple entries for one ID");case"invalid":return a("Frontmatter could not be parsed");case"empty":return a("Entry file is empty");case"read-error":return a("Entry cannot be read");case"manual":return a("Manual invocation only");case"no-description":return a("No description");default:return a("Conflict")}},xo=(e,t)=>{if(!t)return null;let o=p("p","sk-path");return o.append(p("span","sk-path-label",`${e}:`),p("code","",t)),o},ke=(e,t,o=!1,i=!1)=>{let s=p("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return s.type="button",s.disabled=!!v||i,s.addEventListener("click",t),s},nn=e=>{let t=p("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=p("div","sk-conflict-copy");if(o.append(p("strong","",bs(e.kind)),p("p","sk-conflict-message",e.message)),e.kind==="both"?(o.append(xo(a("Active entry"),e.activePath)??p("span")),o.append(xo(a("Disabled entry"),e.disabledPath)??p("span"))):(e.activePath??e.disabledPath)&&o.append(xo(a("Entry"),e.activePath??e.disabledPath)??p("span")),t.append(o),e.kind==="both"&&e.activePath){let i=p("div","sk-conflict-actions");i.append(ke(a("Keep enabled"),()=>void sn(e,"enabled"),!1,gt()),ke(a("Keep disabled"),()=>void sn(e,"disabled"),!1,gt())),t.append(i)}return t},ks=()=>{if(qe.replaceChildren(),!A)return;let t=[...A.roots.filter(l=>!!l.error).map(l=>({kind:"read-error",skillId:"",message:a("Cannot read {label}: {error} ({path})",{label:l.label,error:l.error??"",path:l.path}),activePath:null,disabledPath:null,blocking:!0})),...A.conflicts],o=t.filter(l=>l.blocking),i=t.filter(l=>!l.blocking);if(o.length===0&&i.length===0)return;let s=p("section","sk-conflicts");s.setAttribute("aria-label",a("Conflict check"));let c=p("div","sk-section-head");if(c.append(p("h2","sk-section-title",a("Conflict check")),p("span","sk-section-count",a("To resolve: {blocking} \xB7 Warnings: {warnings}",{blocking:o.length,warnings:i.length}))),s.append(c),o.length>0){let l=p("ul","sk-conflict-list");for(let E of o)l.append(nn(E));s.append(l)}if(i.length>0){let l=p("details","sk-warning-details");l.append(p("summary","",a("Warnings ({count})",{count:i.length})));let E=p("ul","sk-conflict-list");for(let g of i)E.append(nn(g));l.append(E),s.append(l)}qe.append(s)},Os=()=>{let e=De.open;De.replaceChildren();let t=A;if(!t)return;let o=t.roots.filter(s=>s.exists).length;De.append(p("summary","",a("Detected skill sources: {available}/{total} available",{available:o,total:t.roots.length})));let i=p("ul","sk-source-list");for(let s of t.roots){let c=p("li","sk-source-item"),l=p("div","sk-source-head"),E=s.error?a("Error"):s.exists?a("Available"):a("Not created");l.append(p("strong","",s.label),bt(s.scope==="project"?a("Project"):a("Global"),s.scope==="project"?"info":"neutral"),bt(E,s.error?"error":s.exists?"success":"neutral")),c.append(l,p("code","sk-source-path",s.path||a("No path"))),s.error&&c.append(p("p","sk-source-error",s.error)),i.append(c)}De.append(i),De.open=e},gn=()=>{if(oe.replaceChildren(),re){let e=We(Ve()),t=e.enable.length+e.disable.length,o=p("div","sk-notice",a("Invert visible skills: enable {enable}, disable {disable}.",{enable:e.enable.length,disable:e.disable.length}));o.dataset.tone="warning",o.setAttribute("role","status");let i=p("div","sk-notice-actions");i.append(ke(a("Confirm invert"),()=>void ys(),!0,t===0),ke(a("Cancel"),()=>{re=!1,D()})),o.append(i),oe.append(o);return}if(W!==null){let e=A?A.skills.filter(i=>(W?i.disabledPaths.length:i.activePaths.length)>0).length:0,t=p("div","sk-notice",W?a("Skills to enable: {count}.",{count:e}):a("Skills to disable: {count}.",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status");let o=p("div","sk-notice-actions");o.append(ke(a(W?"Confirm enable":"Confirm disable"),()=>void Ns(),!0),ke(a("Cancel"),()=>{W=null,D()})),t.append(o),oe.append(t);return}if(P){let e=p("div","sk-notice",P.text);if(e.dataset.tone=P.tone,e.setAttribute("role",P.tone==="error"?"alert":"status"),P.actions?.length){let t=p("div","sk-notice-actions");for(let o of P.actions)t.append(ke(o.label,o.onClick,o.primary));e.append(t)}oe.append(e);return}if(ze){let e=p("div","sk-notice",ze);e.dataset.tone="error",e.setAttribute("role","alert"),oe.append(e);return}if(ae&&!A){let e=p("div","sk-notice",a("Reading skills\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),oe.append(e)}},xs=()=>{if(!A){yo.textContent=a(ae?"Reading skills\u2026":"Skills not read yet."),vo.textContent=a("After disabling an entry document, OpenCode no longer discovers that skill.");return}yo.textContent=a("Model sees {advertised} of {total} \xB7 about {tokens} tokens/step",{advertised:A.summary.advertised,total:A.summary.total,tokens:A.summary.estimatedTokens.toLocaleString("en")});let e=[a("Disabled: {count}",{count:A.summary.disabled})],t=A.skills.filter(o=>o.scope==="project").length;if(Ge&&e.push(a("Project skills: {count}",{count:t})),A.summary.blockingConflicts>0?e.push(a("Blocking conflicts: {count}",{count:A.summary.blockingConflicts})):e.push(a("No blocking conflicts")),A.summary.warnings>0&&e.push(a("Warnings: {count}",{count:A.summary.warnings})),A.roots.some(o=>o.error)&&e.push(a("A skill directory cannot be read")),A.scannedAt>0){let o=new Date(A.scannedAt);Number.isNaN(o.getTime())||e.push(a("Scanned {time}",{time:o.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})}))}vo.textContent=a("{parts}. Estimates exclude built-in skills.",{parts:e.join(" \xB7 ")})},Co=async(e,t)=>{try{await ce.writeClipboard(e),ce.toast({kind:"success",message:t}).catch(()=>{})}catch(o){P={text:He(o),tone:"error"},gn()}},Rs=async()=>{let e=Ve().map(t=>t.key);e.length!==0&&await Co(e.join(`
`),a("Copied {count} visible qualified IDs.",{count:e.length}))},Is=()=>{if(!A||v)return;let e=We(Ve());if(e.enable.length+e.disable.length===0){P={text:a("No enabled or disabled skills match the current view."),tone:"info"},D();return}re=!0,W=null,P=null,D(),oe.scrollIntoView({block:"nearest"}),oe.querySelector("button")?.focus()},ys=async()=>{if(!A||v||!re)return;let e=We(Ve()),t=e.enable.length+e.disable.length;if(re=!1,t!==0){v="invert",P=null,D();try{A=Je(await Ye("POST","/skills/batch",e)),P={text:a("Inverted {count} visible skills.",{count:t}),tone:"success"},ce.toast({kind:"success",message:a("Inverted {count} visible skills.",{count:t})}).catch(()=>{})}catch(o){P={text:He(o),tone:"error"},v=null,D(),Ce(!1,!0);return}v=null,D()}},Ro=(e,t)=>{let o=p("span","sk-menu-slot"),i=t.activePaths[0]??t.disabledPaths[0]??null;Tt(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:a("Copy entry path"),disabled:!i},{id:"copy-id",label:a("Copy qualified skill ID")}],onSelect:c=>{c==="copy-path"&&i?Co(i,a("Copied entry path.")):c==="copy-id"&&Co(t.key,a("Copied qualified skill ID."))}});let s=o.querySelector(".oc-sdk-btn");s&&(s.setAttribute("aria-label",`${a("More actions")} ${t.name}`),s.title=a("More actions")),e.append(o)},vs=e=>{let t=p("div","sk-skill-action"),o=p("span","sk-action-note"),i=p("div","sk-action-top"),s=gt();if(e.state==="conflict"){o.textContent=a(s?"Directory cannot be read":"Resolve conflicts first");let E=p("button","sk-inline-button",a("Resolve conflict"));return E.type="button",E.disabled=!!v||s,E.addEventListener("click",()=>{qe.scrollIntoView({block:"nearest"}),qe.querySelector("button")?.focus()}),i.append(E),Ro(i,e),t.append(o,i),t}if(e.state==="mixed"){o.textContent=a(s?"Directory cannot be read":"Some entries disabled");let E=p("div","sk-mini-actions"),g=p("button","sk-inline-button",a("Enable all"));g.type="button",g.disabled=!!v||s,g.addEventListener("click",()=>void Io(e,!0));let m=p("button","sk-inline-button",a("Disable all"));return m.type="button",m.disabled=!!v||s,m.addEventListener("click",()=>void Io(e,!1)),E.append(g,m),Ro(E,e),t.append(o,E),t}let c=e.state==="enabled",l=p("button","sk-switch");return l.type="button",l.setAttribute("role","switch"),l.setAttribute("aria-checked",c?"true":"false"),l.setAttribute("aria-label",`${a(c?"Disable":"Enable")} ${e.name}`),l.dataset.skillId=e.key,l.disabled=!!v||s,l.append(p("span","sk-thumb")),l.addEventListener("click",()=>{l.disabled||Io(e,!c)}),c?o.textContent=s?a("Directory cannot be read"):e.advertised?a("Visible to the model"):a("Not visible to the model"):o.textContent=a(s?"Directory cannot be read":"Entry disabled"),i.append(l),Ro(i,e),t.append(o,i),t},Cs=e=>{let t=p("article","sk-skill");t.dataset.state=e.state,t.setAttribute("role","listitem");let o=p("div","sk-skill-main"),i=p("div","sk-skill-head");i.append(p("strong","sk-name",e.name),bt(gs(e),As(e)),bt(e.scope==="project"?a("Project"):a("Global"),e.scope==="project"?"info":"neutral"));let s=p("div","sk-meta");if(s.append(p("code","sk-id",e.id)),e.rootPath){let m=p("span","sk-source",e.sourceId==="opencode-global"?a("OpenCode"):e.sourceId==="opencode-project"?a("Project OpenCode"):e.sourceId.replace(/-/g," "));m.title=e.rootPath,s.append(m)}e.estimatedTokens>0&&s.append(p("span","sk-token",a("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString("en")})));let c=e.description,l=c||a("No description; the model will not select it automatically."),E=p("p","sk-desc",l),g=ht.has(e.key);if(g&&E.classList.add("is-expanded"),o.append(i,s,E),c.length>88||c.includes(`
`)){let m=p("button","sk-desc-toggle",a(g?"Show less":"Show more"));m.type="button",m.setAttribute("aria-expanded",g?"true":"false"),m.addEventListener("click",()=>{let x=!ht.has(e.key);x?ht.add(e.key):ht.delete(e.key),E.classList.toggle("is-expanded",x),m.textContent=a(x?"Show less":"Show more"),m.setAttribute("aria-expanded",x?"true":"false")}),o.append(m)}if(e.warnings.length>0){let m=p("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));o.append(m)}return t.append(o,vs(e)),t},Ms=()=>{xt="",Rt="all",It="all",Do="default",fs.update({value:"",placeholder:a("Search name, description, or ID (press / to focus)")}),An(),Ts.update({value:"all",options:fn()}),ms.update({value:"all",options:Tn()}),hs.update({value:"default",options:mn()}),Xe()},Xe=()=>{je.replaceChildren();let e=A;if(!e)return;let t=Ve();if(t.length===0){let o=xt.trim().length>0||Rt!=="all"||It!=="all",i=p("div","sk-empty");if(i.append(p("h2","",e.skills.length===0?a("No skills found"):a("No matching skills")),p("p","",e.skills.length===0?a("Check that a skill directory such as {path} exists, or rescan.",{path:e.roots[0]?.path??a("the skills directory")}):a("Try another search term or change the filters."))),e.skills.length>0&&o){let s=p("div","sk-empty-actions");s.append(ke(a("Reset filters"),Ms)),i.append(s)}je.append(i);return}for(let o of t)je.append(Cs(o))},ws=()=>{let e=A?A.roots.some(t=>t.error)?1:A.summary.blockingConflicts>0?A.summary.blockingConflicts:null:null;e!==on&&(on=e,ce.setBadge(e).catch(()=>{}))},D=()=>{kt.setAttribute("aria-busy",ae?"true":"false"),ws(),xs(),gn(),ks(),Os(),Xe(),ds.update({label:a(ae?"Reading\u2026":"Rescan"),loading:ae,disabled:ae||!!v});let e=gt();ps.update({disabled:ae||!!v||!A||e}),us.update({disabled:ae||!!v||!A||e});let t=Ve(),o=We(t);Es.update({items:[{id:"invert",label:a("Invert visible skills"),disabled:ae||!!v||!A||o.enable.length+o.disable.length===0},{id:"copy-ids",label:a("Copy visible IDs"),disabled:!A||t.length===0}]})},Us=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},Ce=async(e=!1,t=!1)=>{let o=++mt;ae=!0,t||(ze=null),e&&D();try{let i=Je(await Ye("GET","/skills"));if(o!==mt)return;A=i,ze=null}catch(i){o===mt&&!t&&(ze=He(i))}finally{o===mt&&(ae=!1,D())}},Io=async(e,t)=>{if(!v){v=`toggle:${e.id}`,W=null,re=!1,P=null,D();try{A=Je(await Ye("POST","/skills/toggle",{id:e.key,enabled:t})),P={text:t?a("Enabled {name}.",{name:e.name}):a("Disabled {name}; OpenCode will no longer discover it after the next scan.",{name:e.name}),tone:"success"},ce.toast({kind:"success",message:t?a("Enabled {name}",{name:e.name}):a("Disabled {name}",{name:e.name})}).catch(()=>{})}catch(o){P={text:He(o),tone:"error"},v=null,D(),Ce(!1,!0);return}v=null,D(),Us(e.id)}},sn=async(e,t)=>{if(v)return;let o=e.activePath??e.disabledPath;if(o){v=`resolve:${o}`,W=null,re=!1,P=null,D();try{let i=await Ye("POST","/skills/resolve",{path:o,keep:t}),s=i&&typeof i=="object"&&typeof i.backupPath=="string"?i.backupPath:null;A=Je(i),P={text:t==="enabled"?a("Kept the enabled entry{suffix}.",{suffix:s?a("; the old disabled file was backed up to {path}",{path:s}):""}):a("Kept the disabled entry{suffix}.",{suffix:s?a("; the old disabled file was backed up to {path}",{path:s}):""}),tone:"success"},ce.toast({kind:"success",message:a("Entry conflict resolved")}).catch(()=>{})}catch(i){P={text:He(i),tone:"error"},v=null,D(),Ce(!1,!0);return}v=null,D()}},bn=e=>{!A||v||(W=e,re=!1,P=null,D(),oe.scrollIntoView({block:"nearest"}),oe.querySelector("button")?.focus())},Ns=async()=>{if(W===null||v)return;let e=W;W=null,re=!1,v="bulk",P=null,D();try{let t=await Ye("POST","/skills/bulk",{enabled:e}),o=t&&typeof t=="object"&&Array.isArray(t.changed)?t.changed.filter(i=>typeof i=="string"):[];A=Je(t),P={text:e?a("Skills enabled: {count}.",{count:o.length}):a("Skills disabled: {count}.",{count:o.length}),tone:"success"},ce.toast({kind:"success",message:e?a("Skills enabled: {count}.",{count:o.length}):a("Skills disabled: {count}.",{count:o.length})}).catch(()=>{})}catch(t){P={text:He(t),tone:"error"},v=null,D(),Ce(!1,!0);return}v=null,D()},kn=e=>{let t=typeof e=="string"&&e?e:null;if(rn){t!==Ge?(Ge=t,A=null,W=null,re=!1,Ce(!0)):D();return}rn=!0,Ge=t,Ce(!0)};ce.onReady(e=>{co(e,document.documentElement),document.documentElement.lang="en",document.title=a("Skills Manager"),kn(e.directory)});ce.onDirectory(e=>kn(e));document.title=a("Skills Manager");D();})();
