"use strict";(()=>{var x="openchamber.sdk";var it="data-oc-scrolling",Dt=`
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
:hover, [${it}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${it}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${it}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${it}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Gt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",r=>{let s=r.target===e?t:r.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Nr=`(${Gt.toString()})(document);`;var on=e=>{let t=[],o=0,r=0;return{push:s=>{for(t.push(s),r+=s.length;r-o>e&&t.length>1;){let c=t.shift();r-=c?.length??0,o=0}},pull:s=>{let c=0;for(;c<s.length&&t.length>0;){let l=t[0],E=Math.min(s.length-c,l.length-o);s.set(l.subarray(o,o+E),c),c+=E,o+=E,o>=l.length&&(t.shift(),r-=l.length,o=0)}s.fill(0,c)},clear:()=>{t.length=0,o=0,r=0},get size(){return r-o}}};var an=/^[a-z][a-z0-9-]{0,39}$/;var nn=e=>Object(e)===e&&!Array.isArray(e),Ht=(e,t)=>Object.keys(e).every(o=>t.includes(o)),rn=e=>String(e)===e&&e.length>=1&&e.length<=60,sn=e=>String(e)===e&&e.length>=1&&e.length<=80,cn=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!nn(o)||!an.test(o.id)||!rn(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Ht(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Ht(o,["kind","id","label","value","options","disabled"])||!sn(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let r=new Set;for(let s of o.options){if(!nn(s)||!Ht(s,["value","label"])||!sn(s.value)||!rn(s.label)||r.has(s.value))return!1;r.add(s.value)}if(!r.has(o.value))return!1}return!0};var Lr=1024*1024;var ln=["{id}","{segment}","{segments+}"];var Zs=new Set(ln);var dn=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var ti=new Set(dn);var Vt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,pn=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var un=/^[A-Za-z0-9_-]{1,80}$/;var En=["left","right","top","bottom"];var _n=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of r)if(!_n(s,t+1,o))return!1;return!0},Xt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Xt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Xt)}return String(e)===e||Number.isFinite(e)},$t=e=>{try{return String(e.id)!==e.id||!un.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!En.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!_n(e.data)||!Xt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Bt=2e3;var Sn=["file","directory","other","missing"],Kt=e=>!!(e&&"sessionId"in e),jt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Tn=/^[0-9a-f]{7,64}$/i,Wt=e=>Tn.test(e),at=500,ct=32e3,mn=16e3,hn=128,gn=200,bn=2e3,kn=16e3,An=80,xn=200,On=16e3;var Rn=2e3;var zt=2e4,lt=1024,dt=2e6;var pt=64e3,ut=8e3,qt=4e3;var Jt=96e4,Dr=60*6e4;var yn=999,In=1e4,ze=500,vn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Cn=["stopped","starting","ready","failed"],Gr=new Set(vn),wn=e=>Gr.has(e),Mn=e=>e&&wn(e)?e:"HOST_REJECTED",He=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(He):Object(e)===e?Object.values(e).every(He):!1,Un=e=>He(e)&&JSON.stringify(e).length<=On,fn=e=>e?.trim().slice(0,xn)??"",Ve=e=>{let t=e.id.trim().slice(0,hn),o=e.title.trim().slice(0,gn),r=e.url.trim().slice(0,bn),s=e.text?.trim().slice(0,kn),c=e.author?.trim().slice(0,An),l=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:t,title:o||t,url:r,kind:l};if(s&&(E.text=s),c&&(E.author=c),l==="pull"){let k=fn(e.branches?.head),b=fn(e.branches?.base);k&&b&&(E.branches={head:k,base:b})}return Un(e.data)&&(E.data=e.data),E},Yt=e=>{let t=Ve(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},Qt=e=>{let t={text:e.text.trim().slice(0,mn)};return e.send&&(t.send=!0),t},Zt=e=>e===null||!Number.isFinite(e)?null:Math.min(yn,Math.max(0,Math.round(e))),eo=e=>Number.isFinite(e)?Math.min(In,Math.max(0,Math.ceil(e))):0;var Xe=e=>e.length>0&&e.length<=lt&&!e.includes("\0")&&!e.includes("\\");var Et=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Rn?!1:!e.split("/").some(o=>o==="."||o===".."),Hr=new Set(Cn),to=e=>!!(e&&"status"in e&&Hr.has(String(e.status))&&!("body"in e)),_t=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),oo=e=>!!(e&&"content"in e&&String(e.content)===e.content),no=e=>!!(e&&"written"in e&&e.written===!0),ro=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Vr=new Set(Sn),so=e=>!!(e&&"kind"in e&&"size"in e&&Vr.has(String(e.kind))&&Number.isFinite(e.size)),io=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Xr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),$r=e=>Object(e)===e?e:null,Ft=e=>String(e)===e&&e.length>0,Fr=e=>{if(!Ft(e.id))return null;if(e.ok===!0){let t={channel:x,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Ft(e.error)?{channel:x,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Mn(Ft(e.code)?e.code:void 0)}:null},ao=e=>{let t=$r(e);return!t||t.channel!==x||t.v!==1?null:t.type==="result"?Fr(t):!Xr.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Nn=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Br=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",T=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},Pn=()=>Promise.reject(new T("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),ft=()=>Promise.reject(new T("BAD_PATH",`File path must be 1 to ${lt} characters without NUL or backslash.`)),St=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new T("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},g=e=>(e.value+=1,`oc-${e.value}`),Eo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new T("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(n=>n===t.parent),r=e.requestTimeoutMs??zt,s=new Set,c=new Set,l=new Set,E=new Set,k=new Set,b=new Set,h=new Set,M=new Set,L=new Set,V=new Set,K=new Set,oe=new Set,pe=[],A=null,W=null,ie=new Set,we=new Set,ke=null,Ae=null,De=!1,ue=new Map,Ee=new Map,_e=new Map,q=!1,u={value:0},_=null,fe=null,je=!1,We=!1,Bo=null,Q=null,Ko=n=>n?{sessionId:n.id,phase:n.busy?"started":"completed"}:null,J=n=>{t.parent.postMessage(n,"*")},jo=()=>{q||t.parent===t||oe.size===0||_?.features?.lateGenerateResults!==!0||J({channel:x,v:1,type:"generate-late-listen"})},U=(n,i)=>{for(let S of n)try{S(i)}catch(f){console.error(f)}},Wo=n=>{if(!(n instanceof MessageEvent)||!o(n.source))return;let i=ao(n.data);if(!i)return;if(i.type==="workspace"){let f=Ee.get(i.payload.subscriptionId);f&&U([f],i.payload.snapshot);return}if(i.type==="shells"){let f=_e.get(i.payload.subscriptionId);f&&U([f],i.payload.snapshot);return}if(i.type==="microphone-audio"){Q?.queue.push(i.payload.samples);return}if(i.type==="microphone-ended"){let f=Q;if(!f)return;Q=null,f.release(),U(f.endedListeners,i.payload.reason);return}if(i.type==="ready"){_=i.payload,fe=Ko(i.payload.session),U(s,i.payload),U(c,i.payload.directory),U(l,i.payload.session),fe&&U(E,fe),U(k,i.payload.connection),U(b,i.payload.settings),U(h,i.payload.item),i.payload.block&&U(M,i.payload.block),jo();return}if(i.type==="service-event"){U(L,i.payload);return}if(i.type==="generate-late"){oe.size===0?pe.push(i.payload):U(oe,i.payload);return}if(i.type==="directory"){_&&(_={..._,directory:i.payload.directory}),U(c,i.payload.directory);return}if(i.type==="session"){_&&(_={..._,session:i.payload.session}),i.payload.session?fe?.sessionId!==i.payload.session.id&&(fe=Ko(i.payload.session)):fe=null,U(l,i.payload.session);return}if(i.type==="session-lifecycle"){fe=i.payload,U(E,i.payload);return}if(i.type==="connection"){_&&(_={..._,connection:i.payload.connection}),U(k,i.payload.connection);return}if(i.type==="settings"){_&&(_={..._,settings:i.payload.settings}),U(b,i.payload.settings);return}if(i.type==="item"){_&&(_={..._,item:i.payload.item}),U(h,i.payload.item);return}if(i.type==="status-control-event"){U(V,i.payload);return}if(i.type==="popover-closed"){U(K,i.payload);return}if(i.type==="action"){let f=w=>{q||J({channel:x,v:1,type:"action-result",id:i.id,payload:w})},C=W;if(!C){f({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>C(i.payload)).then(()=>f({ok:!0}),w=>{let N=(w instanceof Error?w.message:String(w)).trim();f({ok:!1,error:(N||"Action failed.").slice(0,ze)})});return}if(i.type==="file-open"){let f=i.payload;if(Ae&&pn(Ae,f))return;Ae=f,U(ie,i.payload);return}if(i.type==="file-saved"){U(we,i.payload.version);return}if(i.type==="file-snapshot"){let f=N=>{q||J({channel:x,v:1,type:"file-snapshot-result",id:i.id,payload:N})},C=N=>f({error:(N.trim()||"Could not read the edited file.").slice(0,ze)}),w=ke;if(!w){C("This extension does not edit files.");return}Promise.resolve().then(()=>w(i.payload.purpose)).then(N=>{if(Vt(N)>2e7){C(`The file is over ${2e7} ${"bytes"in N?"bytes":"characters"}.`);return}if(N.version.length>256){C(`The snapshot version is over ${256} characters.`);return}f({snapshot:"bytes"in N?{bytes:N.bytes,version:N.version}:{content:N.content,version:N.version}})},N=>C(N instanceof Error?N.message:String(N)));return}if(i.type==="resolve"){let f=w=>{J({channel:x,v:1,type:"resolve-result",id:i.id,payload:w})},C=A;if(!C){f({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>C(i.payload)).then(w=>f({item:w?Ve(w):null}),w=>{let N=(w instanceof Error?w.message:String(w)).trim();f({error:(N||"Command failed.").slice(0,ze)})});return}let S=ue.get(i.id);if(S){if(clearTimeout(S.timer),ue.delete(i.id),i.ok){S.resolve(i.payload);return}S.reject(new T(i.code,i.error))}};t.addEventListener("message",Wo),J({channel:x,v:1,type:"hello"});let j=(n,i=r)=>q||t.parent===t?Promise.reject(new T("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((S,f)=>{let C=setTimeout(()=>{ue.delete(n.id),f(new T("HOST_TIMEOUT","Host did not answer in time."))},i);ue.set(n.id,{resolve:S,reject:f,timer:C}),J(n)}),X=n=>j(n).then(()=>{}),D={channel:x,v:1},Ut=n=>{!q&&t.parent!==t&&J(n)},zo=()=>Ut({...D,type:"file-save"}),Nt=()=>{!q&&t.parent!==t&&J({...D,type:"microphone-close",id:g(u)})},Mr=async()=>{if(Q)throw new T("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new T("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let n=globalThis.AudioContext;if(typeof n!="function")throw new T("UNSUPPORTED","This frame has no Web Audio.");let i=new n;if(i.sampleRate<8e3||i.sampleRate>192e3)throw i.close().catch(()=>{}),new T("UNSUPPORTED",`Audio at ${i.sampleRate} Hz is not supported.`);let S=i.state==="suspended"?i.resume().catch(()=>{}):void 0,f=on(Math.round(i.sampleRate/4)),C=i.createScriptProcessor(1024,1,1);C.onaudioprocess=ne=>f.pull(ne.outputBuffer.getChannelData(0));let w=i.createMediaStreamDestination();C.connect(w);let N=new Set,Ge={queue:f,endedListeners:N,release:()=>{C.onaudioprocess=null,C.disconnect(),f.clear();for(let ne of w.stream.getTracks())ne.stop();i.close().catch(()=>{})}};Q=Ge;try{let ne=await j({...D,type:"microphone-open",id:g(u),payload:{sampleRate:i.sampleRate}},12e4);if(!ne||!("opened"in ne)||ne.opened!==!0)throw new T("HOST_REJECTED","Host did not open the microphone.");if(await S,Q!==Ge)throw new T("DISCONNECTED","The microphone closed while it was opening.")}catch(ne){throw Q===Ge&&(Q=null),Ge.release(),Nt(),ne}return{stream:w.stream,close:()=>{Q===Ge&&(Q=null,Ge.release(),Nt())},onEnded:ne=>(N.add(ne),()=>{N.delete(ne)})}},qo=n=>{!Nn(n)||!Br(n)||(n.preventDefault(),zo())},Jo=n=>{!Nn(n)||n.key!=="Escape"||_?.surface!=="popover"||!_.popover||(n.preventDefault(),en(_.popover.id,"escape").catch(()=>{}))},nt=()=>{let n=_?.surface==="popover"?_.popover:void 0;if(!n)return;let i=je||We;Bo!==i&&(Bo=i,tn(n.id,i).catch(()=>{}))},rt=()=>{_?.surface!=="popover"||je||(je=!0,nt())},Yo=n=>{_?.surface!=="popover"||n.relatedTarget!==null||!je||(je=!1,nt())},Qo=()=>{_?.surface!=="popover"||We||(We=!0,nt())},Zo=()=>{_?.surface!=="popover"||!We||(We=!1,nt())},ae=(n,i=1024)=>{if(!n.trim()||n.length>i)throw new T("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Pt=async n=>{n.kind!=="projects"&&ae(n.projectId);let i=await j({...D,type:"workspace-read",id:g(u),payload:n});if(!i||!("kind"in i)||!("state"in i)||i.kind!==n.kind)throw new T("HOST_REJECTED","Host did not return workspace data.");return i},Lt=async(n,i)=>{n.kind!=="projects"&&ae(n.projectId);let S=g(u);Ee.set(S,i);try{await X({...D,type:"workspace-subscribe",id:g(u),payload:{subscriptionId:S,query:n}})}catch(f){throw Ee.delete(S),q||J({...D,type:"workspace-unsubscribe",id:g(u),payload:{subscriptionId:S}}),f}return()=>{!Ee.delete(S)||q||J({...D,type:"workspace-unsubscribe",id:g(u),payload:{subscriptionId:S}})}},Ur=async(n,i)=>{n.kind==="session"&&ae(n.sessionId),n.kind==="project"&&ae(n.projectId);let S=g(u);_e.set(S,i);try{await X({...D,type:"shells-subscribe",id:g(u),payload:{subscriptionId:S,scope:n}})}catch(f){throw _e.delete(S),q||J({...D,type:"shells-unsubscribe",id:g(u),payload:{subscriptionId:S}}),f}return()=>{!_e.delete(S)||q||J({...D,type:"shells-unsubscribe",id:g(u),payload:{subscriptionId:S}})}},st=async n=>{if("key"in n&&(n.key.length===0||n.key.length>128))throw new T("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(n.op==="set"&&!He(n.value))throw new T("HOST_REJECTED","Storage values must be JSON.");if(n.op==="set"&&new TextEncoder().encode(JSON.stringify(n.value)).length>65536)throw new T("HOST_REJECTED","Storage value exceeds 64 KiB.");if(n.scope==="device"&&_?.features?.deviceStorage!==!0)throw new T("UNSUPPORTED","This host does not support device storage.");let i=await j({...D,type:"storage",id:g(u),payload:n});if(!i||!("storage"in i)||i.op!==n.op)throw new T("HOST_REJECTED","Host did not return storage data.");return i},en=(n,i)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===n)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):X({...D,type:"popover-close",id:g(u),payload:i?{id:n,reason:i}:{id:n}}),tn=(n,i)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===n)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):X({...D,type:"popover-anchor",id:g(u),payload:{id:n,active:i}});return t.addEventListener("keydown",Jo,!0),t.addEventListener("pointerover",rt),t.addEventListener("pointermove",rt),t.addEventListener("pointerout",Yo),t.addEventListener("focus",Qo),t.addEventListener("blur",Zo),{onAction:n=>(W=n,()=>{W===n&&(W=null)}),listProjects:async()=>{let n=await Pt({kind:"projects"});if(n.kind!=="projects")throw new T("HOST_REJECTED","Expected projects.");return n},listWorktrees:async n=>{let i=await Pt({kind:"worktrees",projectId:n});if(i.kind!=="worktrees")throw new T("HOST_REJECTED","Expected worktrees.");return i},listSessions:async n=>{let i=await Pt({kind:"sessions",projectId:n});if(i.kind!=="sessions")throw new T("HOST_REJECTED","Expected sessions.");return i},onProjects:n=>Lt({kind:"projects"},i=>{i.kind==="projects"&&n(i)}),onWorktrees:(n,i)=>Lt({kind:"worktrees",projectId:n},S=>{S.kind==="worktrees"&&i(S)}),onSessions:(n,i)=>Lt({kind:"sessions",projectId:n},S=>{S.kind==="sessions"&&i(S)}),onRunningShells:(n,i)=>Ur(n,i),readShellOutput:async(n,i)=>{ae(n,128);let S=i?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new T("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let f=i?.tailBytes;if(f!==void 0&&(!Number.isInteger(f)||f<1||f>65536))throw new T("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let w=await j({...D,type:"shell-output",id:g(u),payload:{shellId:n,cursor:S,tailBytes:f}});if(!w||typeof w.output!="string"||!Number.isFinite(w.cursor))throw new T("HOST_REJECTED","Host did not return shell output.");return w},stopShell:async n=>{if(ae(n,128),(await j({...D,type:"shell-stop",id:g(u),payload:{shellId:n}}))?.stopped!==!0)throw new T("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async n=>{ae(n),await X({...D,type:"open-session",id:g(u),payload:{sessionId:n}})},storage:{get:async(n,i)=>{let S=St(i),f={op:"get",key:n};S&&(f.scope=S);let C=await st(f);return C.op==="get"&&C.found?C.value:void 0},set:async(n,i,S)=>{let f=St(S),C={op:"set",key:n,value:i};f&&(C.scope=f),await st(C)},delete:async(n,i)=>{let S=St(i),f={op:"delete",key:n};S&&(f.scope=S),await st(f)},keys:async n=>{let i=St(n),S={op:"keys"};i&&(S.scope=i);let f=await st(S);if(f.op!=="keys")throw new T("HOST_REJECTED","Expected storage keys.");return f.keys}},onReady:n=>(s.add(n),_&&n(_),()=>{s.delete(n)}),onDirectory:n=>(c.add(n),_&&n(_.directory),()=>{c.delete(n)}),onSession:n=>(l.add(n),_&&n(_.session),()=>{l.delete(n)}),onSessionLifecycle:n=>(E.add(n),fe&&n(fe),()=>{E.delete(n)}),onConnection:n=>(k.add(n),_&&n(_.connection),()=>{k.delete(n)}),onSettings:n=>(b.add(n),_&&n(_.settings),()=>{b.delete(n)}),onItem:n=>(h.add(n),_&&n(_.item),()=>{h.delete(n)}),onBlock:n=>(M.add(n),_?.block&&n(_.block),()=>{M.delete(n)}),onServiceEvent:n=>(L.add(n),()=>{L.delete(n)}),onStatusControl:n=>(V.add(n),()=>{V.delete(n)}),onPopoverClosed:n=>(K.add(n),()=>{K.delete(n)}),setStatusControls:n=>_?.features?.statusControls!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support status controls.")):cn(n)?X({...D,type:"status-controls",id:g(u),payload:{controls:n}}):Promise.reject(new T("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:n=>_?.features?.popovers!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):$t(n)?X({...D,type:"popover-open",id:g(u),payload:n}):Promise.reject(new T("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:en,setPopoverAnchorActive:tn,onResolve:n=>(A=n,()=>{A===n&&(A=null)}),toast:n=>{let i=n.message.trim();return!i||i.length>at?Promise.reject(new T("HOST_REJECTED",`Toast message must contain 1 to ${at} characters.`)):n.copy&&n.copy!==!0&&(!n.copy.text.length||n.copy.text.length>ct)?Promise.reject(new T("HOST_REJECTED",`Toast copy text must contain 1 to ${ct} characters.`)):X({channel:x,v:1,type:"toast",id:g(u),payload:{...n,message:i}})},openUrl:n=>X({channel:x,v:1,type:"open-url",id:g(u),payload:{url:n}}),openCommit:n=>Wt(n)?X({channel:x,v:1,type:"open-commit",id:g(u),payload:{sha:n}}):Promise.reject(new T("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:n=>X({channel:x,v:1,type:"block-answer",id:g(u),payload:{text:n.trim().slice(0,Bt)}}),openSurface:n=>X({channel:x,v:1,type:"open-surface",id:g(u),payload:{surfaceId:n}}),writeClipboard:n=>X({channel:x,v:1,type:"clipboard-write",id:g(u),payload:{text:n}}),compose:n=>X({channel:x,v:1,type:"compose",id:g(u),payload:n}),attach:n=>X({channel:x,v:1,type:"attach",id:g(u),payload:Ve(n)}),startSession:async n=>{n.projectId!==void 0&&ae(n.projectId);let i=n.worktree;i&&i!==!0&&(i.kind==="existing"?ae(i.directory):(i.name!==void 0&&ae(i.name,200),i.baseBranch!==void 0&&ae(i.baseBranch,200)));let S=await j({channel:x,v:1,type:"start-session",id:g(u),payload:Yt(n)},e.requestTimeoutMs??18e4);if(!Kt(S))throw new T("HOST_REJECTED","Host did not return a session.");return S},prompt:n=>j({channel:x,v:1,type:"prompt",id:g(u),payload:Qt(n)}).then(i=>{if(!jt(i))throw new T("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:n=>X({channel:x,v:1,type:"session-link",id:g(u),payload:Ve(n)}),close:()=>X({channel:x,v:1,type:"close",id:g(u)}),oauthStart:()=>X({channel:x,v:1,type:"oauth-start",id:g(u)}),oauthDisconnect:()=>X({channel:x,v:1,type:"oauth-disconnect",id:g(u)}),request:n=>(Et(n.path)?j({channel:x,v:1,type:"request",id:g(u),payload:n}):Pn()).then(i=>{if(!_t(i))throw new T("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:n=>(Et(n.path)?j({channel:x,v:1,type:"service-request",id:g(u),payload:n}):Pn()).then(i=>{if(!_t(i))throw new T("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>j({channel:x,v:1,type:"service-status",id:g(u)}).then(n=>{if(!to(n))throw new T("HOST_REJECTED","Host did not return service status.");return n}),readFile:n=>(Xe(n)?j({channel:x,v:1,type:"file-read",id:g(u),payload:{path:n}}):ft()).then(i=>{if(!oo(i))throw new T("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(n,i)=>Xe(n)?i.length>dt?Promise.reject(new T("FILE_TOO_LARGE",`Content is over ${dt} characters.`)):j({channel:x,v:1,type:"file-write",id:g(u),payload:{path:n,content:i}}).then(S=>{if(!no(S))throw new T("HOST_REJECTED","Host did not confirm the write.");return S}):ft(),listDir:n=>(Xe(n)?j({channel:x,v:1,type:"file-list",id:g(u),payload:{path:n}}):ft()).then(i=>{if(!ro(i))throw new T("HOST_REJECTED","Host did not return directory entries.");return i}),stat:n=>(Xe(n)?j({channel:x,v:1,type:"file-stat",id:g(u),payload:{path:n}}):ft()).then(i=>{if(!so(i))throw new T("HOST_REJECTED","Host did not return file status.");return i}),generate:n=>{let i=n.prompt.trim(),S=n.system?.trim();if(i.length===0||i.length>pt)return Promise.reject(new T("HOST_REJECTED",`Prompt must be 1 to ${pt} characters.`));if(S!==void 0&&(S.length===0||S.length>ut))return Promise.reject(new T("HOST_REJECTED",`System prompt must be 1 to ${ut} characters.`));let f=n.maxOutputTokens===void 0?void 0:Math.min(qt,Math.max(1,Math.floor(n.maxOutputTokens)));if(f!==void 0&&!Number.isFinite(f))return Promise.reject(new T("HOST_REJECTED","maxOutputTokens must be a number."));let C={prompt:i};return S!==void 0&&(C.system=S),f!==void 0&&(C.maxOutputTokens=f),j({channel:x,v:1,type:"generate",id:g(u),payload:C},e.requestTimeoutMs??Jt).then(w=>{if(!io(w))throw new T("HOST_REJECTED","Host did not return generated text.");return w})},onLateGenerateResult:n=>{oe.add(n);for(let i of pe.splice(0))U([n],i);return jo(),()=>{oe.delete(n)}},openMicrophone:Mr,setBadge:n=>X({channel:x,v:1,type:"badge",id:g(u),payload:{count:Zt(n)}}),setHeight:n=>X({channel:x,v:1,type:"resize",id:g(u),payload:{height:eo(n)}}),onFileOpen:n=>(ie.add(n),De||(De=!0,t.addEventListener("keydown",qo,!0)),Ae&&n(Ae),()=>{ie.delete(n)}),onFileSnapshot:n=>(ke=n,()=>{ke===n&&(ke=null)}),onFileSaved:n=>(we.add(n),()=>{we.delete(n)}),reportFileChange:n=>Ut({...D,type:"file-change",payload:{dirty:n.dirty,edited:n.edited}}),requestFileSave:zo,reportFileUnsupported:()=>Ut({...D,type:"file-unsupported"}),dispose:()=>{for(let n of Ee.keys())J({...D,type:"workspace-unsubscribe",id:g(u),payload:{subscriptionId:n}});Ee.clear();for(let n of _e.keys())J({...D,type:"shells-unsubscribe",id:g(u),payload:{subscriptionId:n}});_e.clear(),Q&&(Nt(),Q.release(),Q=null),q=!0,A=null,W=null,ke=null,ie.clear(),we.clear(),De&&t.removeEventListener("keydown",qo,!0),t.removeEventListener("message",Wo),t.removeEventListener("keydown",Jo,!0),t.removeEventListener("pointerover",rt),t.removeEventListener("pointermove",rt),t.removeEventListener("pointerout",Yo),t.removeEventListener("focus",Qo),t.removeEventListener("blur",Zo);for(let n of ue.values())clearTimeout(n.timer),n.reject(new T("HOST_UNAVAILABLE","Host client was disposed."));ue.clear(),s.clear(),c.clear(),l.clear(),E.clear(),k.clear(),b.clear(),h.clear(),M.clear(),L.clear(),V.clear(),K.clear(),oe.clear(),pe.length=0}}};var Xn=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var mi=new Set(Xn);var Kr=10*6e4;var jr=10*6e4;var Wr=10*6e4;var zr=10*6e4;var $n=["none","agent","user"];var gi=new Set($n);var qr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Jr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Fn=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,r]of qr)t.style.setProperty(o,e.tokens[r]);for(let[o,r,s]of Jr){let c=e.tokens[s]??"";t.style.setProperty(o,c),t.style.setProperty(r,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},_o=(e,t)=>{Fn(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Yr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},P=(e,t)=>`var(--${e}, var(--oc-${Yr[e]}, ${t}))`,Te=P("surface-background","transparent"),mt=P("surface-elevated","transparent"),$e=P("surface-elevated-foreground","inherit"),Z=P("surface-foreground","inherit"),G=P("surface-muted-foreground","gray"),Qr=P("surface-muted","transparent"),Me=P("interactive-border","currentColor"),Y=P("interactive-hover","transparent"),Ue=P("interactive-active","transparent"),fo=P("interactive-selection","transparent"),So=P("interactive-selection-foreground","inherit"),Se=P("primary","currentColor"),To=P("primary-text","inherit"),mo=P("error-text","inherit"),Zr=P("font-sans","inherit"),ho=P("font-mono","monospace"),Wn=P("radius","9px"),go=`calc(${Wn} - 2px)`,Bn=`calc(${Wn} - 4px)`,H=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Kn=`background-image: linear-gradient(${Y}, ${Y});`,bo=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,ko="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",jn="box-shadow: var(--oc-sdk-lit);",Ao=`inset 0 0.5px 0 0 ${H(Z,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,es=`
:root {
  --oc-sdk-edge: ${H(Z,16)};
  --oc-sdk-field-bg: ${mt};
  --oc-sdk-raised-bg: ${Te};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${H(Z,14)};
  --oc-sdk-field-bg: ${H(Te,50,mt)};
  --oc-sdk-raised-bg: ${mt};
  --oc-sdk-field-lift: ${Ao};
  --oc-sdk-raised-lift: ${Ao};
  --oc-sdk-lit: ${Ao};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Tt=e=>{let t=P(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${P(`${e}-text`,"inherit")}; }`},p=e=>`calc(${e}rem / 14)`,ts=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${p(8)}; height: ${p(32)}; padding: 0 ${p(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${p(6)}; height: ${p(28)}; padding: 0 ${p(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${p(4)}; height: ${p(24)}; padding: 0 ${p(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${p(14)}; height: ${p(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${p(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${p(32)}; padding: 0 ${p(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${p(8)} ${p(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${p(34)}; padding-right: ${p(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${p(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${p(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${p(24)}; height: ${p(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${p(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${p(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${p(28)}; padding: 0 ${p(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${p(2)}; min-width: ${p(160)}; max-width: calc(100vw - ${p(16)}); max-height: min(${p(320)}, calc(100vh - ${p(16)})); overflow: auto; padding: ${p(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${p(2)} ${p(2)} ${p(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${p(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${p(8)}; width: 100%; padding: ${p(6)} ${p(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${p(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${p(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${p(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${p(14)}; height: ${p(14)}; margin-top: ${p(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${p(36)}; height: ${p(20)}; --oc-sdk-thumb-travel: ${p(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${p(2)}; left: ${p(2)}; width: ${p(16)}; height: ${p(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${p(2)}; padding: ${p(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${p(6)}; height: ${p(28)}; padding: 0 ${p(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${p(1)} ${p(6)}; font-size: ${p(11)}; font-weight: 500; line-height: ${p(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${p(8)}; width: 100%; padding: ${p(6)} ${p(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${p(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${p(16)} ${p(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${p(4)}; padding: ${p(40)} ${p(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${p(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${p(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${p(16)}; height: ${p(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${p(12)}; height: ${p(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${p(12)}; padding: ${p(8)} ${p(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${p(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${p(8)}; width: 100%; margin: ${p(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${p(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${p(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${p(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${p(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${p(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${p(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${p(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${p(36)}; height: ${p(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${p(44)}; }
  .oc-sdk-check { min-height: ${p(36)}; padding: ${p(8)} 0; }
}
`,zn=`${es}
.oc-sdk { color: ${Z}; font-family: ${Zr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Kn} }
.oc-sdk-mono { font-family: ${ho}; }
.oc-sdk-muted { color: ${G}; }
${Tt("success")}${Tt("warning")}${Tt("error")}${Tt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Se}; --oc-sdk-tone-text: ${To}; }

.oc-sdk-btn { border-radius: ${go}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Bn}; }
.oc-sdk-btn[data-variant="default"] { color: ${To}; background: ${H(Se,10,Te)}; border-color: ${H(Se,12)}; ${jn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${H(Se,16,Te)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${H(Se,22,Te)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Qr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ue}, ${Ue}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${$e}; ${ko} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ue}, ${Ue}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Y}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ue}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${P("status-error","red")}; color: ${mo}; background: ${H("var(--oc-sdk-tone)",7,Te)}; border-color: ${H("var(--oc-sdk-tone)",12)}; ${jn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${H("var(--oc-sdk-tone)",9,Te)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${H("var(--oc-sdk-tone)",11,Te)}; box-shadow: none; }

.oc-sdk-field-note { color: ${G}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${mo}; }
.oc-sdk-input { border-radius: ${go}; background: var(--oc-sdk-field-bg); color: ${$e}; ${bo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${G}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${bo(H(Z,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${bo(P("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ho}; }

.oc-sdk-search-icon { color: ${G}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Se}; }
.oc-sdk-search-clear { border-radius: ${Bn}; color: ${G}; }
.oc-sdk-search-clear:hover { background: ${Y}; color: ${Z}; }

.oc-sdk-trigger { border-radius: ${go}; background: var(--oc-sdk-raised-bg); color: ${$e}; ${ko} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ue}, ${Ue}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${G}; }
.oc-sdk-trigger-chevron { color: ${G}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${$e}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${mt}; background-clip: padding-box; color: ${$e}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Y}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fo}; color: ${So}; }
.oc-sdk-option-check { color: ${Z}; }
.oc-sdk-option[data-destructive="true"] { color: ${mo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${H(P("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${G}; }
.oc-sdk-popup-empty { color: ${G}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Me}; border-radius: 4px; color: ${Z}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${H(Z,60,Me)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Me}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Te}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Se}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Kn} }
.oc-sdk-check-desc { color: ${G}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${H(Z,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${G}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Z}; }
.oc-sdk-tab[aria-selected="true"] { color: ${So}; background: ${fo}; border-color: ${Me}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${$e}; background: var(--oc-sdk-raised-bg); ${ko} }
.oc-sdk-tab-count { color: ${G}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${H(Z,6)}; color: ${G}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${H("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Y}; }
.oc-sdk-row[aria-selected="true"] { background: ${fo}; color: ${So}; }
.oc-sdk-row-lead { font-family: ${ho}; color: ${G}; }
.oc-sdk-row-sub { color: ${G}; }
.oc-sdk-row-meta { color: ${G}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${G}; }

.oc-sdk-empty-body { color: ${G}; }

.oc-sdk-spinner { color: ${G}; }
.oc-sdk-spinner-ring { border-color: ${Me}; border-top-color: ${Se}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${H("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${G}; }

.oc-sdk-separator { color: ${G}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${H(Me,40)}; }

.oc-sdk-progress-label { color: ${G}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${H(Z,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Se}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${P("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${P("success-text","inherit")}; }

.oc-sdk-text a { color: ${To}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${H(Me,60)}; }
`,$=`
${Dt}
${ts}
${zn}`;var qn="oc-sdk-ui-style",Ne=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},F=e=>{let t=document.getElementById(qn);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Gt(document);let o=document.createElement("style");o.id=qn,o.textContent=e,document.head.appendChild(o)},I=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},ce=e=>{let t=I("button",e);return t.type="button",t},ee=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},xe=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},Jn=(e,t)=>{let o=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var os=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},me=(e,t)=>{F($);let o=t,r=ce("oc-sdk oc-sdk-btn"),s=os(),c=document.createElement("span");r.append(c),e.append(r);let l=()=>{r.dataset.variant=o.variant??"default",r.dataset.size=o.size??"default",r.disabled=!!o.disabled||!!o.loading,r.dataset.loading=o.loading?"true":"false",r.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&s.parentNode!==r?r.prepend(s):!o.loading&&s.parentNode===r&&s.remove(),ee(c,o.label)},E=()=>{o.disabled||o.loading||o.onClick()};return r.addEventListener("click",E),l(),{update:k=>{o={...o,...k},l()},dispose:()=>{r.removeEventListener("click",E),r.remove()}}};var Yn="http://www.w3.org/2000/svg",ns={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},he=(e,t,o)=>{let r=document.createElementNS(Yn,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.style.width=p(t),r.style.height=p(t),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),o&&r.setAttribute("class",o);let s=document.createElementNS(Yn,"path");return s.setAttribute("d",ns[e]),r.append(s),r};var xo=(e,t)=>{F($);let o=t,r=I("div","oc-sdk oc-sdk-search"),s=I("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let c=ce("oc-sdk-search-clear");c.append(he("close",14)),c.tabIndex=-1,r.append(he("search",16,"oc-sdk-search-icon"),s,c),e.append(r);let l=()=>{let h=o.placeholder??"Search";xe(s,"placeholder",h),s.setAttribute("aria-label",o.label??h),c.setAttribute("aria-label","Clear search"),s.value!==o.value&&(s.value=o.value),r.dataset.active=o.value.trim()===""?"false":"true"},E=()=>{o.value!==""&&o.onChange(""),s.focus()},k=()=>{o.onChange(s.value)},b=h=>{h.key==="Escape"&&s.value!==""&&(h.preventDefault(),E())};return s.addEventListener("input",k),s.addEventListener("keydown",b),c.addEventListener("click",E),l(),o.autofocus&&s.focus(),{update:h=>{o={...o,...h},l()},dispose:()=>{s.removeEventListener("input",k),s.removeEventListener("keydown",b),c.removeEventListener("click",E),r.remove()}}};var Oe=(e,t="vertical")=>{let[o,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},Pe=(e,t,o)=>{let r=e.filter(k=>!k.disabled);if(r.length===0)return null;let s=r[0],c=r[r.length-1];if(o==="first"||!s||!c)return s?.id??null;if(o==="last")return c.id;let l=r.findIndex(k=>k.id===t);return l===-1?o==="next"?s.id:c.id:r[Math.min(r.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var Qn=(e,t)=>`${e}-${t??""}`,ht=(e,t,o,r)=>{let s=ce("oc-sdk-option");s.id=Qn(e,o.id),s.setAttribute("role",t),s.tabIndex=-1,s.disabled=!!o.disabled,t==="option"&&s.setAttribute("aria-selected",o.selected?"true":"false"),s.dataset.destructive=o.destructive?"true":"false";let c=I("span","oc-sdk-option-label");if(c.textContent=o.label,s.append(c),o.hint){let l=I("span","oc-sdk-option-hint");l.textContent=o.hint,s.append(l)}if(t==="option"){s.dataset.mark="check";let l=I("span","oc-sdk-option-check");l.append(he("check",14)),s.append(l)}return s.addEventListener("pointerenter",r.hover),s.addEventListener("click",r.pick),s},gt=(e,t,o,r)=>{let s=Qn(o,r);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===s?"true":"false");xe(t,"aria-activedescendant",r?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var rs=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let r=e.offsetHeight,s=window.innerHeight-o.bottom-8;r>s&&o.top-8>s&&(e.style.top=`${Math.max(8,Math.round(o.top-4-r))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},bt=(e,t,o,r)=>{e.append(o),rs(o,t);let s=Jn(e,r),c=()=>{r()},l=E=>{E.target instanceof Node&&o.contains(E.target)||r()};return window.addEventListener("resize",c),window.addEventListener("scroll",l,!0),()=>{s(),window.removeEventListener("resize",c),window.removeEventListener("scroll",l,!0),o.remove()}};var Zn=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(r=>r.label.toLowerCase().includes(o)||r.id.toLowerCase().includes(o)):[...e]},ss=0,qe=(e,t)=>{F($);let o=t,r=`oc-sdk-select-${ss+=1}`,s=I("div","oc-sdk oc-sdk-select"),c=I("span","oc-sdk-field-label");c.id=`${r}-label`;let l=ce("oc-sdk-trigger");l.setAttribute("aria-haspopup","listbox"),l.setAttribute("aria-labelledby",c.id);let E=I("span","oc-sdk-trigger-value");l.append(E,he("chevron",14,"oc-sdk-trigger-chevron")),s.append(c,l),e.append(s);let k="",b=null,h=null,M=I("div","oc-sdk oc-sdk-popup"),L=I("div","oc-sdk-popup-search"),V=I("input","oc-sdk-input");V.type="text",V.autocomplete="off",L.append(V);let K=I("div");K.setAttribute("role","listbox"),K.tabIndex=-1,M.append(K);let oe=()=>Zn(o.options,o.searchable?k:""),pe=()=>o.searchable?V:K,A=u=>{b=u,gt(K,pe(),r,u)},W=()=>{Ne(K);let u=oe();if(u.length===0){let _=I("div","oc-sdk-popup-empty");_.textContent="No matches",K.append(_)}for(let _ of u)K.append(ht(r,"option",{..._,selected:_.id===o.value},{hover:()=>A(_.id),pick:()=>ke(_.id)}));A(u.some(_=>_.id===b)?b:u[0]?.id??null)},ie=()=>{let u=h;h=null,u?.(),k="",V.value="",l.setAttribute("aria-expanded","false")},we=()=>{h||o.disabled||(b=o.value,V.placeholder=o.searchPlaceholder??"Search",o.searchable?M.prepend(L):L.remove(),W(),h=bt(s,l,M,ie),l.setAttribute("aria-expanded","true"),pe().focus())},ke=u=>{ie(),l.focus(),u!==o.value&&o.onChange(u)},Ae=()=>{h?ie():we()},De=u=>{!h&&Oe(u)&&(u.preventDefault(),we())},ue=u=>{let _=Oe(u);_?(u.preventDefault(),A(Pe(oe(),b,_))):u.key==="Enter"?(u.preventDefault(),b&&ke(b)):u.key==="Escape"?(u.preventDefault(),ie(),l.focus()):o.searchable&&u.target!==V&&u.key.length===1&&!u.ctrlKey&&!u.metaKey&&V.focus()},Ee=()=>{k=V.value,W()},_e=u=>{h&&!(u.relatedTarget instanceof Node&&s.contains(u.relatedTarget))&&ie()},q=()=>{ee(c,o.label),c.hidden=!o.label;let u=o.options.find(_=>_.id===o.value);ee(E,u?.label??o.placeholder??"Select"),E.dataset.empty=u?"false":"true",l.disabled=!!o.disabled,h&&W()};return l.addEventListener("click",Ae),l.addEventListener("keydown",De),M.addEventListener("keydown",ue),V.addEventListener("input",Ee),s.addEventListener("focusout",_e),q(),{update:u=>{o={...o,...u},q()},dispose:()=>{ie(),l.removeEventListener("click",Ae),l.removeEventListener("keydown",De),M.removeEventListener("keydown",ue),V.removeEventListener("input",Ee),s.removeEventListener("focusout",_e),s.remove()}}};var er=e=>e.filter(t=>!("separator"in t)),as=0,kt=(e,t)=>{F($);let o=t,r=`oc-sdk-menu-${as+=1}`,s=I("div","oc-sdk oc-sdk-menu");e.append(s);let c=I("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let l=null,E=null,k=me(s,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{l?L():V()}}),b=s.querySelector("button");b?.setAttribute("aria-haspopup","menu");let h=A=>{E=A,gt(c,c,r,A)},M=()=>{Ne(c);for(let A of o.items){if("separator"in A){let W=I("div","oc-sdk-separator");W.dataset.labeled="false",c.append(W);continue}c.append(ht(r,"menuitem",A,{hover:()=>h(A.id),pick:()=>K(A.id)}))}h(er(o.items).some(A=>A.id===E)?E:null)},L=()=>{let A=l;l=null,A?.(),E=null,b?.setAttribute("aria-expanded","false")},V=()=>{l||!b||(M(),l=bt(s,b,c,L),b.setAttribute("aria-expanded","true"),c.focus())},K=A=>{L(),b?.focus(),o.onSelect(A)},oe=A=>{let W=Oe(A);W?(A.preventDefault(),h(Pe(er(o.items),E,W))):A.key==="Enter"||A.key===" "?(A.preventDefault(),E&&K(E)):A.key==="Escape"&&(A.preventDefault(),L(),b?.focus())},pe=A=>{l&&!(A.relatedTarget instanceof Node&&s.contains(A.relatedTarget))&&L()};return c.addEventListener("keydown",oe),s.addEventListener("focusout",pe),{update:A=>{o={...o,...A},k.update({label:o.label,variant:o.variant,size:o.size}),l&&M()},dispose:()=>{L(),c.removeEventListener("keydown",oe),s.removeEventListener("focusout",pe),k.dispose(),s.remove()}}};var Oo=(e,t)=>e.name.localeCompare(t.name,void 0,{sensitivity:"base"})||e.id.localeCompare(t.id),tr=e=>{switch(e.state){case"conflict":return 0;case"mixed":return 1;case"enabled":return 2;default:return 3}},cs=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,ls=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return cs(e);case"all":default:return!0}},ds=(e,t)=>{let o=t.trim().toLowerCase();return o?[e.id,e.name,e.description,...e.warnings].join(" ").toLowerCase().includes(o):!0},Je=e=>({enable:e.filter(t=>t.state==="disabled").map(t=>t.key??t.id),disable:e.filter(t=>t.state==="enabled").map(t=>t.key??t.id)}),or=(e,t)=>{let o=t.sourceFilter??"all",r=e.filter(s=>(o==="all"||s.scope===o)&&ls(s,t.stateFilter)&&ds(s,t.query));switch(t.sortMode){case"tokens":return[...r].sort((s,c)=>c.estimatedTokens-s.estimatedTokens||Oo(s,c));case"name":return[...r].sort(Oo);case"state":return[...r].sort((s,c)=>tr(s)-tr(c)||Oo(s,c));case"default":default:return r}};function nr(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",r=>{let s=r.target===e?t:r.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var rr=`:root {
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
.sk-notice-dismissible {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0 8px;
  align-items: start;
}
.sk-notice-body {
  min-width: 0;
}
.sk-notice-close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  cursor: pointer;
  opacity: 0.7;
}
.sk-notice-close:hover {
  opacity: 1;
}
.sk-notice-dismissible > .sk-notice-actions,
.sk-notice-dismissible > .sk-preview,
.sk-notice-dismissible > details {
  grid-column: 1 / -1;
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
.sk-conflict-suggestion {
  margin: 2px 0 0;
  color: var(--sk-fg);
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
.sk-source-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
}
.sk-source-actions .sk-inline-button {
  padding: 2px 8px;
  font-size: 10px;
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
.sk-preview-list {
  max-height: 220px;
  overflow: auto;
  padding-left: 20px;
  overflow-wrap: anywhere;
}
.sk-preview-list li { margin: 6px 0; }

.sk-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 6px;
}
.sk-search-slot {
  flex: 1 1 100%;
  min-width: 0;
}
.sk-toolbar-selects {
  flex: 1 1 0;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}
.sk-toolbar-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
}
.sk-toolbar-actions .oc-sdk-trigger,
.sk-toolbar-actions .oc-sdk-btn {
  height: 30px;
  font-size: 11px;
}
.sk-toolbar-actions .sk-list-menu-trigger {
  width: 30px;
  padding: 0;
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
.sk-diagnostics {
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.sk-diagnostic {
  padding: 6px 8px;
  border-left: 2px solid var(--sk-warning);
  background: color-mix(in srgb, var(--sk-warning) 5%, transparent);
  border-radius: 0 var(--oc-radius, 6px) var(--oc-radius, 6px) 0;
}
.sk-diagnostic-message,
.sk-diagnostic-fix {
  margin: 0;
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.sk-diagnostic-message { color: var(--oc-warning-text); }
.sk-diagnostic-fix { color: var(--sk-fg); margin-top: 2px; }
.sk-diagnostic-file {
  display: block;
  margin-top: 2px;
  color: var(--sk-muted);
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 10px;
  line-height: 1.4;
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
  .sk-search-slot {
    flex: 1 1 180px;
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
      flex-flow: row wrap;
      align-items: center;
    }
    .sk-search-slot {
      flex: 1 1 100%;
    }
    .sk-toolbar-selects {
      flex: 1 1 0;
      min-width: 0;
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
    .sk-search-slot {
      flex: 1 1 180px;
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
`;var sr=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var a=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,r)=>Object.prototype.hasOwnProperty.call(t,r)?String(t[r]):o):e,de=Eo({requestTimeoutMs:3e4}),ur=document.querySelector("#root");if(!ur)throw new Error("Missing #root");nr(document);var Er=document.createElement("style");Er.textContent=sr+rr;document.head.append(Er);var d=(e,t="",o)=>{let r=document.createElement(e);return r.className=t,o!==void 0&&(r.textContent=o),r},Re=class extends Error{code;conflicts;constructor(t,o,r){super(t),this.name="ServiceError",this.code=o,this.conflicts=r}},Es=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",_s=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",ge=(e,t="")=>typeof e=="string"?e:t,Ot=e=>typeof e=="string"&&e.length>0?e:null,Rt=e=>e===!0,_r=e=>typeof e=="number"&&Number.isFinite(e)?e:0,ir=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],Lo=e=>{if(!e||typeof e!="object")return null;let t=e;return!_s(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:ge(t.message,a("Conflict")),suggestion:Ot(t.suggestion),activePath:Ot(t.activePath),disabledPath:Ot(t.disabledPath),blocking:Rt(t.blocking)}},fs=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!Es(t.state)?null:{key:ge(t.key,t.id),id:t.id,scope:t.scope==="project"?"project":"global",sourceId:ge(t.sourceId,"opencode-global"),rootPath:ge(t.rootPath),name:ge(t.name,t.id),description:ge(t.description),state:t.state,advertised:Rt(t.advertised),autoInvokeOff:Rt(t.autoInvokeOff),activePaths:ir(t.activePaths),disabledPaths:ir(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(Lo).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:_r(t.estimatedTokens),...t.duplicateResolution&&typeof t.duplicateResolution=="object"?{duplicateResolution:(()=>{let o=t.duplicateResolution;return{status:o.status==="highest-scanned"||o.status==="shadowed"?o.status:"unknown",winningPath:Ot(o.winningPath)}})()}:{}}},ar=e=>{if(!e||typeof e!="object")throw new Re(a("The service returned invalid skill directory information."),"parse",[]);let t=e;return{sourceId:ge(t.sourceId,"opencode-global"),scope:t.scope==="project"?"project":"global",label:ge(t.label,a("Skill directory")),path:ge(t.path),exists:Rt(t.exists),error:typeof t.error=="string"?t.error:null}},Le=e=>{if(!e||typeof e!="object")throw new Re(a("The service returned data in an unexpected format."),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new Re(a("The service returned data in an unexpected format."),"parse",[]);let o=t.skills.map(fs).filter(E=>E!==null),r=Array.isArray(t.conflicts)?t.conflicts.map(Lo).filter(E=>E!==null):o.flatMap(E=>E.conflicts),s=r.filter(E=>E.blocking).length,c={total:o.length,advertised:o.filter(E=>E.advertised).length,disabled:o.filter(E=>E.state==="disabled").length,blockingConflicts:s,warnings:r.length-s,estimatedTokens:o.reduce((E,k)=>E+k.estimatedTokens,0)},l=Array.isArray(t.roots)?t.roots.map(ar):t.root?[ar(t.root)]:[];return{skills:o,conflicts:r,summary:c,root:l[0]??{sourceId:"opencode-global",scope:"global",label:a("Skill directory"),path:"",exists:!1,error:null},roots:l,projectDirectory:typeof t.projectDirectory=="string"?t.projectDirectory:null,scannedAt:_r(t.scannedAt)}},Ss=async(e,t,o,r)=>{let s=await de.serviceRequest({method:e,path:t,...r?{query:r}:{},...o===void 0?{}:{body:JSON.stringify(o)}}),c;try{c=JSON.parse(s.body)}catch{throw new Re(a("The service returned unrecognized data. Try again."),"parse",[])}if(s.status>=400){let l=c&&typeof c=="object"?c:{},E=typeof l.error=="string"?l.error:a("Request failed ({status})",{status:s.status}),k=typeof l.code=="string"?l.code:null,b=Array.isArray(l.conflicts)?l.conflicts.map(Lo).filter(h=>h!==null):[];throw new Re(E,k,b)}return c},Ce=async(e,t,o)=>{let r=Ke,s=o===void 0||e==="GET"?void 0:{...o,directory:r??void 0},c=await Ss(e,t,s,e==="GET"&&r?{directory:r}:void 0);if(r!==Ke)throw new Error(a("The project changed; rescan before making changes."));return c},be=e=>e instanceof T?e.code==="NO_SERVICE"?a('Allow "Skills" to run its local service in Settings \u2192 Extensions.'):e.code==="SERVICE_FAILED"?a("The local service is not ready. Reload the extension and try again."):e.code==="DISABLED"?a("The Skills extension is disabled. Enable it in extension settings."):e.code==="HOST_TIMEOUT"?a("The local service timed out. Try again."):a("Cannot connect to the local service. Check extension permissions."):e instanceof Re||e instanceof Error?e.message:a("The operation failed. Try again."),Ct=d("main","ext ext-container sk");Ct.setAttribute("aria-label",a("Skills Manager"));var fr=d("header","sk-header"),Sr=d("div","sk-title-row"),Ts=d("h1","sk-title",a("Skills Manager")),wt=d("div","sk-actions"),ms=me(wt,{label:a("Rescan"),variant:"outline",size:"sm",onClick:()=>{ve(!0)}}),hs=me(wt,{label:a("Enable all"),variant:"outline",size:"sm",onClick:()=>Cr(!0)}),gs=me(wt,{label:a("Disable all"),variant:"outline",size:"sm",onClick:()=>Cr(!1)});Sr.append(Ts,wt);var Uo=d("p","sk-summary"),No=d("p","sk-summary sk-summary-secondary");fr.append(Sr,Uo,No);var Tr=d("div","sk-body"),z=d("div","sk-notice-root");z.setAttribute("aria-live","polite");var et=d("div"),Be=d("details","sk-sources"),mr=d("div","sk-toolbar"),Do=d("div","sk-search-slot"),hr=d("div","sk-toolbar-selects"),Go=d("div","sk-toolbar-actions"),Ho=d("div","sk-filter-slot"),Vo=d("div","sk-source-slot"),Xo=d("div","sk-sort-slot");hr.append(Ho,Vo,Xo);var yt=kt(Go,{label:a("List actions"),variant:"outline",size:"sm",items:[{id:"invert",label:a("Invert visible skills")},{id:"copy-ids",label:a("Copy visible IDs")}],onSelect:e=>{e==="invert"?Ms():e==="copy-ids"&&ws()}}),Fe=Go.querySelector(".oc-sdk-btn"),ye=document.createElementNS("http://www.w3.org/2000/svg","svg");ye.setAttribute("viewBox","0 0 16 16");ye.setAttribute("width","16");ye.setAttribute("height","16");ye.setAttribute("fill","currentColor");ye.setAttribute("aria-hidden","true");for(let e of["3","8","13"]){let t=document.createElementNS("http://www.w3.org/2000/svg","circle");t.setAttribute("cx",e),t.setAttribute("cy","8"),t.setAttribute("r","1.5"),ye.append(t)}var gr=()=>{Fe&&(Fe.classList.add("sk-list-menu-trigger"),Fe.setAttribute("aria-label",a("List actions")),Fe.title=a("Copy IDs or invert the visible skills"),Fe.firstChild!==ye&&Fe.replaceChildren(ye))},bs=yt.update.bind(yt);yt.update=e=>{bs(e),gr()};gr();mr.append(Do,hr,Go);var Ye=d("div","sk-list");Ye.setAttribute("role","list");var br=d("footer","sk-footer"),ks=d("p","",a("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open.")),As=d("p","",a("Enable all before disabling or uninstalling the extension; rescan after skills change."));br.append(ks,As);Tr.append(z,et,Be,mr,Ye,br);Ct.append(fr,Tr);ur.append(Ct);var m=null,le=!1,At=0,Qe=null,v=null,y=null,B=null,te=!1,se=null,Mt="",tt="all",ot="all",It="default",Ke=null,xt=new Set,cr,lr=!1,kr=()=>[{id:"all",label:a("All states")},{id:"enabled",label:a("Enabled")},{id:"disabled",label:a("Disabled")},{id:"attention",label:a("Needs attention")}],Ar=()=>[{id:"all",label:a("All sources")},{id:"global",label:a("Global")},{id:"project",label:a("Project")}],xr=()=>[{id:"default",label:a("Default order")},{id:"tokens",label:a("Tokens (high to low)")},{id:"name",label:a("Name (A\u2013Z)")},{id:"state",label:a("Needs attention first")}],xs=xo(Do,{value:"",placeholder:a("Search name, description, or ID (press / to focus)"),onChange:e=>{Mt=e,O()}}),Or=()=>Do.querySelector("input"),Rr=()=>{let e=Or();e&&e.setAttribute("aria-label",a("Search skills"))};Rr();var yr=qe(Ho,{value:"all",options:kr(),onChange:e=>{tt=e==="enabled"||e==="disabled"||e==="attention"?e:"all",yr.update({value:tt}),O()}}),Ro=Ho.querySelector(".oc-sdk-trigger");Ro&&(Ro.setAttribute("aria-label",a("Filter by status")),Ro.removeAttribute("aria-labelledby"));var Ir=qe(Vo,{value:"all",options:Ar(),onChange:e=>{ot=e==="global"||e==="project"?e:"all",Ir.update({value:ot}),O()}}),yo=Vo.querySelector(".oc-sdk-trigger");yo&&(yo.setAttribute("aria-label",a("Filter by skill source")),yo.removeAttribute("aria-labelledby"));var vr=qe(Xo,{value:"default",options:xr(),onChange:e=>{It=e==="tokens"||e==="name"||e==="state"?e:"default",vr.update({value:It}),O()}}),Io=Xo.querySelector(".oc-sdk-trigger");Io&&(Io.setAttribute("aria-label",a("Sort order")),Io.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=Or();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"&&(B!==null||te||se!==null)){e.preventDefault(),B=null,te=!1,se=null,O();return}}});var vt=()=>!!(m?.root.error||m?.roots.some(e=>e.error)),Ie=()=>{let e=m;return e?or(e.skills,{query:Mt,stateFilter:tt,sourceFilter:ot,sortMode:It}):[]},Os=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",Rs=e=>e.state==="conflict"?a("Conflict"):e.state==="mixed"?a("Mixed"):e.state==="disabled"?a("Disabled"):a("Enabled"),Ze=(e,t="neutral")=>{let o=d("span","sk-badge",e);return o.dataset.tone=t,o},ys=e=>{switch(e){case"both":return a("Both entry and disabled file exist");case"duplicate":return a("Multiple entries for one ID");case"invalid":return a("Frontmatter could not be parsed");case"empty":return a("Entry file is empty");case"read-error":return a("Entry cannot be read");case"manual":return a("Manual invocation only");case"no-description":return a("No description");default:return a("Conflict")}},vo=(e,t)=>{if(!t)return null;let o=d("p","sk-path");return o.append(d("span","sk-path-label",`${e}:`),d("code","",t)),o},re=(e,t,o=!1,r=!1)=>{let s=d("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return s.type="button",s.disabled=!!y||r,s.addEventListener("click",t),s},dr=e=>{let t=d("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=d("div","sk-conflict-copy");if(o.append(d("strong","",ys(e.kind)),d("p","sk-conflict-message",e.message)),e.suggestion&&o.append(d("p","sk-conflict-suggestion",a("Fix: {suggestion}",{suggestion:e.suggestion}))),e.kind==="both"?(o.append(vo(a("Active entry"),e.activePath)??d("span")),o.append(vo(a("Disabled entry"),e.disabledPath)??d("span"))):(e.activePath??e.disabledPath)&&o.append(vo(a("Entry"),e.activePath??e.disabledPath)??d("span")),t.append(o),e.kind==="both"&&e.activePath){let r=d("div","sk-conflict-actions");r.append(re(a("Keep enabled"),()=>void pr(e,"enabled"),!1,vt()),re(a("Keep disabled"),()=>void pr(e,"disabled"),!1,vt())),t.append(r)}return t},Is=()=>{if(et.replaceChildren(),!m)return;let t=[...m.roots.filter(l=>!!l.error).map(l=>({kind:"read-error",skillId:"",message:a("Cannot read {label}: {error} ({path})",{label:l.label,error:l.error??"",path:l.path}),suggestion:a("Check that the directory exists and is readable, then rescan."),activePath:l.path||null,disabledPath:null,blocking:!0})),...m.conflicts],o=t.filter(l=>l.blocking),r=t.filter(l=>!l.blocking);if(o.length===0&&r.length===0)return;let s=d("section","sk-conflicts");s.setAttribute("aria-label",a("Conflict check"));let c=d("div","sk-section-head");if(c.append(d("h2","sk-section-title",a("Conflict check")),d("span","sk-section-count",a("To resolve: {blocking} \xB7 Warnings: {warnings}",{blocking:o.length,warnings:r.length}))),s.append(c),o.length>0){let l=d("ul","sk-conflict-list");for(let E of o)l.append(dr(E));s.append(l)}if(r.length>0){let l=d("details","sk-warning-details");l.append(d("summary","",a("Warnings ({count})",{count:r.length})));let E=d("ul","sk-conflict-list");for(let k of r)E.append(dr(k));l.append(E),s.append(l)}et.append(s)},vs=()=>{let e=Be.open;Be.replaceChildren();let t=m;if(!t)return;let o=t.roots.filter(c=>c.exists).length;Be.append(d("summary","",a("Detected skill sources: {available}/{total} available",{available:o,total:t.roots.length})));let r=new Map;for(let c of t.skills)c.activePaths.length>0&&r.set(c.sourceId,(r.get(c.sourceId)??0)+1);let s=d("ul","sk-source-list");for(let c of t.roots){let l=d("li","sk-source-item"),E=d("div","sk-source-head"),k=c.error?a("Error"):c.exists?a("Available"):a("Not created");E.append(d("strong","",c.label),Ze(c.scope==="project"?a("Project"):a("Global"),c.scope==="project"?"info":"neutral"),Ze(k,c.error?"error":c.exists?"success":"neutral"));let b=d("div","sk-source-actions"),h=re(a("Disable all"),()=>Xs(c.sourceId),!1,(r.get(c.sourceId)??0)===0);if(b.append(h),c.path){let M=re(a("Open folder"),()=>{(async()=>{try{await Ce("POST","/sources/open",{path:c.path})}catch(L){v={text:be(L),tone:"error"},O()}})()},!1,!c.exists);b.append(M)}E.append(b),l.append(E,d("code","sk-source-path",c.path||a("No path"))),c.error&&l.append(d("p","sk-source-error",c.error)),s.append(l)}Be.append(s),Be.open=e},$o=()=>{if(z.replaceChildren(),te){let e=Je(Ie()),t=e.enable.length+e.disable.length,o=d("div","sk-notice",a("Invert visible skills: enable {enable}, disable {disable}.",{enable:e.enable.length,disable:e.disable.length}));o.dataset.tone="warning",o.setAttribute("role","status"),Co(o,Ie().filter(s=>s.state==="enabled"||s.state==="disabled"),s=>s.state==="disabled");let r=d("div","sk-notice-actions");r.append(re(a("Confirm invert"),()=>void Us(),!0,t===0),re(a("Cancel"),()=>{te=!1,O()})),o.append(r),z.append(o);return}if(B!==null){let e=m?m.skills.filter(r=>(B?r.disabledPaths.length:r.activePaths.length)>0).length:0,t=d("div","sk-notice",B?a("Skills to enable: {count}.",{count:e}):a("Skills to disable: {count}.",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status"),Co(t,m?.skills??[],()=>B===!0);let o=d("div","sk-notice-actions");o.append(re(a(B?"Confirm enable":"Confirm disable"),()=>void Vs(),!0),re(a("Cancel"),()=>{B=null,O()})),t.append(o),z.append(t);return}if(se!==null){let e=se,t=m?.roots.find(c=>c.sourceId===e),o=(m?.skills??[]).filter(c=>c.sourceId===e&&c.activePaths.length>0),r=d("div","sk-notice",a("Disable all skills in {source}? {count} skill(s) will be changed.",{source:t?.label??e,count:o.length}));r.dataset.tone="warning",r.setAttribute("role","status"),Co(r,o,()=>!1);let s=d("div","sk-notice-actions");s.append(re(a("Confirm disable"),()=>void $s(),!0,o.length===0),re(a("Cancel"),()=>{se=null,O()})),r.append(s),z.append(r);return}if(v){let e=d("div","sk-notice sk-notice-dismissible");e.dataset.tone=v.tone,e.setAttribute("role",v.tone==="error"?"alert":"status");let t=d("div","sk-notice-body",v.text),o=d("button","sk-notice-close","\xD7");if(o.type="button",o.setAttribute("aria-label",a("Dismiss notification")),o.addEventListener("click",()=>{v=null,$o()}),e.append(t,o),v.actions?.length){let r=d("div","sk-notice-actions");for(let s of v.actions)r.append(re(s.label,s.onClick,s.primary));e.append(r)}z.append(e);return}if(Qe){let e=d("div","sk-notice",Qe);e.dataset.tone="error",e.setAttribute("role","alert"),z.append(e);return}if(le&&!m){let e=d("div","sk-notice",a("Reading skills\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),z.append(e)}},Co=(e,t,o)=>{let r=d("details","sk-preview");r.open=!0,r.append(d("summary","",a("Files affected (current scan)")));let s=d("ul","sk-preview-list");for(let c of t){let l=o(c),E=l?c.disabledPaths:c.activePaths;for(let k of E){let b=d("li","");b.append(d("strong","",`${a(l?"Enable":"Disable")}: ${c.key}`),d("code","sk-source-path",k)),s.append(b)}}r.append(s),e.append(r)},Fo=async()=>{if(!y){y="undo",O();try{m=Le(await Ce("POST","/skills/undo",{})),v={text:a("The last bulk operation was undone."),tone:"success"}}catch(e){v={text:be(e),tone:"error"}}finally{y=null,O()}}},Cs=()=>{if(!m){Uo.textContent=a(le?"Reading skills\u2026":"Skills not read yet."),No.textContent=a("After disabling an entry document, OpenCode no longer discovers that skill.");return}Uo.textContent=a("Estimated advertised entries: {advertised} of {total} \xB7 about {tokens} tokens/step",{advertised:m.summary.advertised,total:m.summary.total,tokens:m.summary.estimatedTokens.toLocaleString("en")});let e=[a("Disabled: {count}",{count:m.summary.disabled})],t=m.skills.filter(o=>o.scope==="project").length;if(Ke&&e.push(a("Project skills: {count}",{count:t})),m.summary.blockingConflicts>0?e.push(a("Blocking conflicts: {count}",{count:m.summary.blockingConflicts})):e.push(a("No blocking conflicts")),m.summary.warnings>0&&e.push(a("Warnings: {count}",{count:m.summary.warnings})),m.roots.some(o=>o.error)&&e.push(a("A skill directory cannot be read")),m.scannedAt>0){let o=new Date(m.scannedAt);Number.isNaN(o.getTime())||e.push(a("Scanned {time}",{time:o.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})}))}No.textContent=a("{parts}. Estimates exclude built-in skills.",{parts:e.join(" \xB7 ")})},Po=async(e,t)=>{try{await de.writeClipboard(e),de.toast({kind:"success",message:t}).catch(()=>{})}catch(o){v={text:be(o),tone:"error"},$o()}},ws=async()=>{let e=Ie().map(t=>t.key);e.length!==0&&await Po(e.join(`
`),a("Copied {count} visible qualified IDs.",{count:e.length}))},Ms=()=>{if(!m||y)return;let e=Je(Ie());if(e.enable.length+e.disable.length===0){v={text:a("No enabled or disabled skills match the current view."),tone:"info"},O();return}te=!0,B=null,se=null,v=null,O(),z.scrollIntoView({block:"nearest"}),z.querySelector("button")?.focus()},Us=async()=>{if(!m||y||!te)return;let e=Je(Ie()),t=e.enable.length+e.disable.length;if(te=!1,t!==0){y="invert",v=null,O();try{let o=Ie().flatMap(c=>e.enable.includes(c.key)?c.disabledPaths:e.disable.includes(c.key)?c.activePaths:[]),r=await Ce("POST","/skills/batch",{...e,expectedPaths:o});m=Le(r);let s=!!(r&&typeof r=="object"&&r.undoAvailable);v={text:a("Inverted {count} visible skills.",{count:t}),tone:"success",...s?{actions:[{label:a("Undo last action"),onClick:()=>void Fo()}]}:{}},de.toast({kind:"success",message:a("Inverted {count} visible skills.",{count:t})}).catch(()=>{})}catch(o){v={text:be(o),tone:"error"},y=null,O(),ve(!1,!0);return}y=null,O()}},wo=(e,t)=>{let o=d("span","sk-menu-slot"),r=t.activePaths[0]??t.disabledPaths[0]??null;kt(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:a("Copy entry path"),disabled:!r},{id:"copy-id",label:a("Copy qualified skill ID")}],onSelect:c=>{c==="copy-path"&&r?Po(r,a("Copied entry path.")):c==="copy-id"&&Po(t.key,a("Copied qualified skill ID."))}});let s=o.querySelector(".oc-sdk-btn");s&&(s.setAttribute("aria-label",`${a("More actions")} ${t.name}`),s.title=a("More actions")),e.append(o)},Ns=e=>{let t=d("div","sk-skill-action"),o=d("span","sk-action-note"),r=d("div","sk-action-top"),s=vt();if(e.state==="conflict"){o.textContent=a(s?"Directory cannot be read":"Resolve conflicts first");let E=d("button","sk-inline-button",a("Resolve conflict"));return E.type="button",E.disabled=!!y||s,E.addEventListener("click",()=>{et.scrollIntoView({block:"nearest"}),et.querySelector("button")?.focus()}),r.append(E),wo(r,e),t.append(o,r),t}if(e.state==="mixed"){o.textContent=a(s?"Directory cannot be read":"Some entries disabled");let E=d("div","sk-mini-actions"),k=d("button","sk-inline-button",a("Enable all"));k.type="button",k.disabled=!!y||s,k.addEventListener("click",()=>void Mo(e,!0));let b=d("button","sk-inline-button",a("Disable all"));return b.type="button",b.disabled=!!y||s,b.addEventListener("click",()=>void Mo(e,!1)),E.append(k,b),wo(E,e),t.append(o,E),t}let c=e.state==="enabled",l=d("button","sk-switch");return l.type="button",l.setAttribute("role","switch"),l.setAttribute("aria-checked",c?"true":"false"),l.setAttribute("aria-label",`${a(c?"Disable":"Enable")} ${e.name}`),l.dataset.skillId=e.key,l.disabled=!!y||s,l.append(d("span","sk-thumb")),l.addEventListener("click",()=>{l.disabled||Mo(e,!c)}),c?o.textContent=s?a("Directory cannot be read"):e.advertised?a("Eligible for advertisement (estimate)"):a("Not advertised (estimate)"):o.textContent=a(s?"Directory cannot be read":"Entry disabled"),r.append(l),wo(r,e),t.append(o,r),t},Ps=e=>{let t=d("article","sk-skill");t.dataset.state=e.state,t.setAttribute("role","listitem");let o=d("div","sk-skill-main"),r=d("div","sk-skill-head");if(r.append(d("strong","sk-name",e.name),Ze(Rs(e),Os(e)),Ze(e.scope==="project"?a("Project"):a("Global"),e.scope==="project"?"info":"neutral")),e.duplicateResolution){let h=e.duplicateResolution.status;r.append(Ze(a(h==="highest-scanned"?"Highest scanned precedence":h==="shadowed"?"Shadowed in scanned sources":"Duplicate: uncertain"),"warning"))}let s=d("div","sk-meta");if(s.append(d("code","sk-id",e.id)),e.rootPath){let h=d("span","sk-source",e.sourceId==="opencode-global"?a("OpenCode"):e.sourceId==="opencode-project"?a("Project OpenCode"):e.sourceId.replace(/-/g," "));h.title=e.rootPath,s.append(h)}e.estimatedTokens>0&&s.append(d("span","sk-token",a("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString("en")})));let c=e.description,l=c||a("No description; the model will not select it automatically."),E=d("p","sk-desc",l),k=xt.has(e.key);if(k&&E.classList.add("is-expanded"),o.append(r,s,E),c.length>88||c.includes(`
`)){let h=d("button","sk-desc-toggle",a(k?"Show less":"Show more"));h.type="button",h.setAttribute("aria-expanded",k?"true":"false"),h.addEventListener("click",()=>{let M=!xt.has(e.key);M?xt.add(e.key):xt.delete(e.key),E.classList.toggle("is-expanded",M),h.textContent=a(M?"Show less":"Show more"),h.setAttribute("aria-expanded",M?"true":"false")}),o.append(h)}let b=e.conflicts.filter(h=>h.kind!=="both");if(b.length>0){let h=d("ul","sk-diagnostics");for(let M of b){let L=d("li","sk-diagnostic");L.append(d("p","sk-diagnostic-message",M.message)),M.suggestion&&L.append(d("p","sk-diagnostic-fix",a("Fix: {suggestion}",{suggestion:M.suggestion})));let V=M.activePath??M.disabledPath;V&&L.append(d("code","sk-diagnostic-file",V)),h.append(L)}o.append(h)}return t.append(o,Ns(e)),t},Ls=()=>{Mt="",tt="all",ot="all",It="default",xs.update({value:"",placeholder:a("Search name, description, or ID (press / to focus)")}),Rr(),yr.update({value:"all",options:kr()}),Ir.update({value:"all",options:Ar()}),vr.update({value:"default",options:xr()}),O()},Ds=()=>{Ye.replaceChildren();let e=m;if(!e)return;let t=Ie();if(t.length===0){let o=Mt.trim().length>0||tt!=="all"||ot!=="all",r=d("div","sk-empty");if(r.append(d("h2","",e.skills.length===0?a("No skills found"):a("No matching skills")),d("p","",e.skills.length===0?a("Check that a skill directory such as {path} exists, or rescan.",{path:e.roots[0]?.path??a("the skills directory")}):a("Try another search term or change the filters."))),e.skills.length>0&&o){let s=d("div","sk-empty-actions");s.append(re(a("Reset filters"),Ls)),r.append(s)}Ye.append(r);return}for(let o of t)Ye.append(Ps(o))},Gs=()=>{let e=m?m.roots.some(t=>t.error)?1:m.summary.blockingConflicts>0?m.summary.blockingConflicts:null:null;e!==cr&&(cr=e,de.setBadge(e).catch(()=>{}))},O=()=>{Ct.setAttribute("aria-busy",le?"true":"false"),Gs(),Cs(),$o(),Is(),vs(),Ds(),ms.update({label:a(le?"Reading\u2026":"Rescan"),loading:le,disabled:le||!!y});let e=vt();hs.update({disabled:le||!!y||!m||e}),gs.update({disabled:le||!!y||!m||e});let t=Ie(),o=Je(t);yt.update({items:[{id:"invert",label:a("Invert visible skills"),disabled:le||!!y||!m||o.enable.length+o.disable.length===0},{id:"copy-ids",label:a("Copy visible IDs"),disabled:!m||t.length===0}]})},Hs=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},ve=async(e=!1,t=!1)=>{let o=++At;le=!0,t||(Qe=null),e&&O();try{let r=Le(await Ce("GET","/skills"));if(o!==At)return;m=r,Qe=null}catch(r){o===At&&!t&&(Qe=be(r))}finally{o===At&&(le=!1,O())}},Mo=async(e,t)=>{if(!y){y=`toggle:${e.id}`,B=null,te=!1,v=null,O();try{m=Le(await Ce("POST","/skills/toggle",{id:e.key,enabled:t})),v={text:t?a("Enabled {name}.",{name:e.name}):a("Disabled {name}; OpenCode will no longer discover it after the next scan.",{name:e.name}),tone:"success"},de.toast({kind:"success",message:t?a("Enabled {name}",{name:e.name}):a("Disabled {name}",{name:e.name})}).catch(()=>{})}catch(o){v={text:be(o),tone:"error"},y=null,O(),ve(!1,!0);return}y=null,O(),Hs(e.id)}},pr=async(e,t)=>{if(y)return;let o=e.activePath??e.disabledPath;if(o){y=`resolve:${o}`,B=null,te=!1,v=null,O();try{let r=await Ce("POST","/skills/resolve",{path:o,keep:t}),s=r&&typeof r=="object"&&typeof r.backupPath=="string"?r.backupPath:null;m=Le(r),v={text:t==="enabled"?a("Kept the enabled entry{suffix}.",{suffix:s?a("; the old disabled file was backed up to {path}",{path:s}):""}):a("Kept the disabled entry{suffix}.",{suffix:s?a("; the old disabled file was backed up to {path}",{path:s}):""}),tone:"success"},de.toast({kind:"success",message:a("Entry conflict resolved")}).catch(()=>{})}catch(r){v={text:be(r),tone:"error"},y=null,O(),ve(!1,!0);return}y=null,O()}},Cr=e=>{!m||y||(B=e,te=!1,se=null,v=null,O(),z.scrollIntoView({block:"nearest"}),z.querySelector("button")?.focus())},Vs=async()=>{if(B===null||y)return;let e=B;B=null,te=!1,y="bulk",v=null,O();try{let t=m?.skills.flatMap(s=>e?s.disabledPaths:s.activePaths)??[],o=await Ce("POST","/skills/bulk",{enabled:e,expectedPaths:t}),r=o&&typeof o=="object"&&Array.isArray(o.changed)?o.changed.filter(s=>typeof s=="string"):[];m=Le(o),v={text:e?a("Skills enabled: {count}.",{count:r.length}):a("Skills disabled: {count}.",{count:r.length}),tone:"success",...o&&typeof o=="object"&&o.undoAvailable?{actions:[{label:a("Undo last action"),onClick:()=>void Fo()}]}:{}},de.toast({kind:"success",message:e?a("Skills enabled: {count}.",{count:r.length}):a("Skills disabled: {count}.",{count:r.length})}).catch(()=>{})}catch(t){v={text:be(t),tone:"error"},y=null,O(),ve(!1,!0);return}y=null,O()},Xs=e=>{!m||y||(se=e,B=null,te=!1,v=null,O(),z.scrollIntoView({block:"nearest"}),z.querySelector("button")?.focus())},$s=async()=>{if(!m||y||se===null)return;let e=se,t=m.skills.filter(o=>o.sourceId===e&&o.activePaths.length>0);if(se=null,t.length===0){O();return}y="bulk",v=null,O();try{let o=t.flatMap(c=>c.activePaths),r=await Ce("POST","/skills/bulk",{enabled:!1,sourceId:e,expectedPaths:o});m=Le(r);let s=r&&typeof r=="object"&&Array.isArray(r.changed)?r.changed.filter(c=>typeof c=="string"):t.map(c=>c.key);v={text:a("Skills disabled in {source}: {count}.",{source:m.roots.find(c=>c.sourceId===e)?.label??e,count:s.length}),tone:"success",...r&&typeof r=="object"&&r.undoAvailable?{actions:[{label:a("Undo last action"),onClick:()=>void Fo()}]}:{}}}catch(o){v={text:be(o),tone:"error"},y=null,O(),ve(!1,!0);return}y=null,O()},wr=e=>{let t=typeof e=="string"&&e?e:null;if(lr){t!==Ke?(Ke=t,m=null,B=null,te=!1,se=null,ve(!0)):O();return}lr=!0,Ke=t,ve(!0)};de.onReady(e=>{_o(e,document.documentElement),document.documentElement.lang="en",document.title=a("Skills Manager"),wr(e.directory)});de.onDirectory(e=>wr(e));document.title=a("Skills Manager");O();})();
