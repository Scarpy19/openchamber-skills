"use strict";(()=>{var k="openchamber.sdk";var it="data-oc-scrolling",Lt=`
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
`;function Dt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",n=>{let s=n.target===e?t:n.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Nn=`(${Dt.toString()})(document);`;var or=e=>{let t=[],o=0,n=0;return{push:s=>{for(t.push(s),n+=s.length;n-o>e&&t.length>1;){let c=t.shift();n-=c?.length??0,o=0}},pull:s=>{let c=0;for(;c<s.length&&t.length>0;){let l=t[0],E=Math.min(s.length-c,l.length-o);s.set(l.subarray(o,o+E),c),c+=E,o+=E,o>=l.length&&(t.shift(),n-=l.length,o=0)}s.fill(0,c)},clear:()=>{t.length=0,o=0,n=0},get size(){return n-o}}};var ir=/^[a-z][a-z0-9-]{0,39}$/;var rr=e=>Object(e)===e&&!Array.isArray(e),Gt=(e,t)=>Object.keys(e).every(o=>t.includes(o)),nr=e=>String(e)===e&&e.length>=1&&e.length<=60,sr=e=>String(e)===e&&e.length>=1&&e.length<=80,ar=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!rr(o)||!ir.test(o.id)||!nr(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Gt(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Gt(o,["kind","id","label","value","options","disabled"])||!sr(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let n=new Set;for(let s of o.options){if(!rr(s)||!Gt(s,["value","label"])||!sr(s.value)||!nr(s.label)||n.has(s.value))return!1;n.add(s.value)}if(!n.has(o.value))return!1}return!0};var Ln=1024*1024;var cr=["{id}","{segment}","{segments+}"];var Zs=new Set(cr);var lr=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var ti=new Set(lr);var Ht=e=>"bytes"in e?e.bytes.byteLength:e.content.length,dr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var pr=/^[A-Za-z0-9_-]{1,80}$/;var ur=["left","right","top","bottom"];var Er=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of n)if(!Er(s,t+1,o))return!1;return!0},Vt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Vt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Vt)}return String(e)===e||Number.isFinite(e)},Xt=e=>{try{return String(e.id)!==e.id||!pr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ur.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Er(e.data)||!Vt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ft=2e3;var fr=["file","directory","other","missing"],Bt=e=>!!(e&&"sessionId"in e),Kt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Sr=/^[0-9a-f]{7,64}$/i,jt=e=>Sr.test(e),at=500,ct=32e3,Tr=16e3,mr=128,hr=200,gr=2e3,br=16e3,Ar=80,kr=200,xr=16e3;var Or=2e3;var Wt=2e4,lt=1024,dt=2e6;var pt=64e3,ut=8e3,zt=4e3;var qt=96e4,Dn=60*6e4;var Rr=999,yr=1e4,ze=500,Ir=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],vr=["stopped","starting","ready","failed"],Gn=new Set(Ir),Cr=e=>Gn.has(e),wr=e=>e&&Cr(e)?e:"HOST_REJECTED",He=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(He):Object(e)===e?Object.values(e).every(He):!1,Mr=e=>He(e)&&JSON.stringify(e).length<=xr,_r=e=>e?.trim().slice(0,kr)??"",Ve=e=>{let t=e.id.trim().slice(0,mr),o=e.title.trim().slice(0,hr),n=e.url.trim().slice(0,gr),s=e.text?.trim().slice(0,br),c=e.author?.trim().slice(0,Ar),l=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:t,title:o||t,url:n,kind:l};if(s&&(E.text=s),c&&(E.author=c),l==="pull"){let b=_r(e.branches?.head),m=_r(e.branches?.base);b&&m&&(E.branches={head:b,base:m})}return Mr(e.data)&&(E.data=e.data),E},Jt=e=>{let t=Ve(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},Yt=e=>{let t={text:e.text.trim().slice(0,Tr)};return e.send&&(t.send=!0),t},Qt=e=>e===null||!Number.isFinite(e)?null:Math.min(Rr,Math.max(0,Math.round(e))),Zt=e=>Number.isFinite(e)?Math.min(yr,Math.max(0,Math.ceil(e))):0;var Xe=e=>e.length>0&&e.length<=lt&&!e.includes("\0")&&!e.includes("\\");var Et=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Or?!1:!e.split("/").some(o=>o==="."||o===".."),Hn=new Set(vr),eo=e=>!!(e&&"status"in e&&Hn.has(String(e.status))&&!("body"in e)),_t=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),to=e=>!!(e&&"content"in e&&String(e.content)===e.content),oo=e=>!!(e&&"written"in e&&e.written===!0),ro=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Vn=new Set(fr),no=e=>!!(e&&"kind"in e&&"size"in e&&Vn.has(String(e.kind))&&Number.isFinite(e.size)),so=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Xn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),$n=e=>Object(e)===e?e:null,$t=e=>String(e)===e&&e.length>0,Fn=e=>{if(!$t(e.id))return null;if(e.ok===!0){let t={channel:k,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&$t(e.error)?{channel:k,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:wr($t(e.code)?e.code:void 0)}:null},io=e=>{let t=$n(e);return!t||t.channel!==k||t.v!==1?null:t.type==="result"?Fn(t):!Xn.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Ur=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Bn=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",T=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},Nr=()=>Promise.reject(new T("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),ft=()=>Promise.reject(new T("BAD_PATH",`File path must be 1 to ${lt} characters without NUL or backslash.`)),St=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new T("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},g=e=>(e.value+=1,`oc-${e.value}`),uo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new T("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(r=>r===t.parent),n=e.requestTimeoutMs??Wt,s=new Set,c=new Set,l=new Set,E=new Set,b=new Set,m=new Set,O=new Set,j=new Set,$=new Set,X=new Set,B=new Set,oe=new Set,pe=[],A=null,W=null,ie=new Set,we=new Set,Ae=null,ke=null,De=!1,ue=new Map,Ee=new Map,_e=new Map,q=!1,u={value:0},_=null,fe=null,je=!1,We=!1,Bo=null,Q=null,Ko=r=>r?{sessionId:r.id,phase:r.busy?"started":"completed"}:null,J=r=>{t.parent.postMessage(r,"*")},jo=()=>{q||t.parent===t||oe.size===0||_?.features?.lateGenerateResults!==!0||J({channel:k,v:1,type:"generate-late-listen"})},M=(r,i)=>{for(let S of r)try{S(i)}catch(f){console.error(f)}},Wo=r=>{if(!(r instanceof MessageEvent)||!o(r.source))return;let i=io(r.data);if(!i)return;if(i.type==="workspace"){let f=Ee.get(i.payload.subscriptionId);f&&M([f],i.payload.snapshot);return}if(i.type==="shells"){let f=_e.get(i.payload.subscriptionId);f&&M([f],i.payload.snapshot);return}if(i.type==="microphone-audio"){Q?.queue.push(i.payload.samples);return}if(i.type==="microphone-ended"){let f=Q;if(!f)return;Q=null,f.release(),M(f.endedListeners,i.payload.reason);return}if(i.type==="ready"){_=i.payload,fe=Ko(i.payload.session),M(s,i.payload),M(c,i.payload.directory),M(l,i.payload.session),fe&&M(E,fe),M(b,i.payload.connection),M(m,i.payload.settings),M(O,i.payload.item),i.payload.block&&M(j,i.payload.block),jo();return}if(i.type==="service-event"){M($,i.payload);return}if(i.type==="generate-late"){oe.size===0?pe.push(i.payload):M(oe,i.payload);return}if(i.type==="directory"){_&&(_={..._,directory:i.payload.directory}),M(c,i.payload.directory);return}if(i.type==="session"){_&&(_={..._,session:i.payload.session}),i.payload.session?fe?.sessionId!==i.payload.session.id&&(fe=Ko(i.payload.session)):fe=null,M(l,i.payload.session);return}if(i.type==="session-lifecycle"){fe=i.payload,M(E,i.payload);return}if(i.type==="connection"){_&&(_={..._,connection:i.payload.connection}),M(b,i.payload.connection);return}if(i.type==="settings"){_&&(_={..._,settings:i.payload.settings}),M(m,i.payload.settings);return}if(i.type==="item"){_&&(_={..._,item:i.payload.item}),M(O,i.payload.item);return}if(i.type==="status-control-event"){M(X,i.payload);return}if(i.type==="popover-closed"){M(B,i.payload);return}if(i.type==="action"){let f=w=>{q||J({channel:k,v:1,type:"action-result",id:i.id,payload:w})},C=W;if(!C){f({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>C(i.payload)).then(()=>f({ok:!0}),w=>{let U=(w instanceof Error?w.message:String(w)).trim();f({ok:!1,error:(U||"Action failed.").slice(0,ze)})});return}if(i.type==="file-open"){let f=i.payload;if(ke&&dr(ke,f))return;ke=f,M(ie,i.payload);return}if(i.type==="file-saved"){M(we,i.payload.version);return}if(i.type==="file-snapshot"){let f=U=>{q||J({channel:k,v:1,type:"file-snapshot-result",id:i.id,payload:U})},C=U=>f({error:(U.trim()||"Could not read the edited file.").slice(0,ze)}),w=Ae;if(!w){C("This extension does not edit files.");return}Promise.resolve().then(()=>w(i.payload.purpose)).then(U=>{if(Ht(U)>2e7){C(`The file is over ${2e7} ${"bytes"in U?"bytes":"characters"}.`);return}if(U.version.length>256){C(`The snapshot version is over ${256} characters.`);return}f({snapshot:"bytes"in U?{bytes:U.bytes,version:U.version}:{content:U.content,version:U.version}})},U=>C(U instanceof Error?U.message:String(U)));return}if(i.type==="resolve"){let f=w=>{J({channel:k,v:1,type:"resolve-result",id:i.id,payload:w})},C=A;if(!C){f({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>C(i.payload)).then(w=>f({item:w?Ve(w):null}),w=>{let U=(w instanceof Error?w.message:String(w)).trim();f({error:(U||"Command failed.").slice(0,ze)})});return}let S=ue.get(i.id);if(S){if(clearTimeout(S.timer),ue.delete(i.id),i.ok){S.resolve(i.payload);return}S.reject(new T(i.code,i.error))}};t.addEventListener("message",Wo),J({channel:k,v:1,type:"hello"});let K=(r,i=n)=>q||t.parent===t?Promise.reject(new T("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((S,f)=>{let C=setTimeout(()=>{ue.delete(r.id),f(new T("HOST_TIMEOUT","Host did not answer in time."))},i);ue.set(r.id,{resolve:S,reject:f,timer:C}),J(r)}),G=r=>K(r).then(()=>{}),P={channel:k,v:1},Mt=r=>{!q&&t.parent!==t&&J(r)},zo=()=>Mt({...P,type:"file-save"}),Ut=()=>{!q&&t.parent!==t&&J({...P,type:"microphone-close",id:g(u)})},Mn=async()=>{if(Q)throw new T("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new T("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let r=globalThis.AudioContext;if(typeof r!="function")throw new T("UNSUPPORTED","This frame has no Web Audio.");let i=new r;if(i.sampleRate<8e3||i.sampleRate>192e3)throw i.close().catch(()=>{}),new T("UNSUPPORTED",`Audio at ${i.sampleRate} Hz is not supported.`);let S=i.state==="suspended"?i.resume().catch(()=>{}):void 0,f=or(Math.round(i.sampleRate/4)),C=i.createScriptProcessor(1024,1,1);C.onaudioprocess=re=>f.pull(re.outputBuffer.getChannelData(0));let w=i.createMediaStreamDestination();C.connect(w);let U=new Set,Ge={queue:f,endedListeners:U,release:()=>{C.onaudioprocess=null,C.disconnect(),f.clear();for(let re of w.stream.getTracks())re.stop();i.close().catch(()=>{})}};Q=Ge;try{let re=await K({...P,type:"microphone-open",id:g(u),payload:{sampleRate:i.sampleRate}},12e4);if(!re||!("opened"in re)||re.opened!==!0)throw new T("HOST_REJECTED","Host did not open the microphone.");if(await S,Q!==Ge)throw new T("DISCONNECTED","The microphone closed while it was opening.")}catch(re){throw Q===Ge&&(Q=null),Ge.release(),Ut(),re}return{stream:w.stream,close:()=>{Q===Ge&&(Q=null,Ge.release(),Ut())},onEnded:re=>(U.add(re),()=>{U.delete(re)})}},qo=r=>{!Ur(r)||!Bn(r)||(r.preventDefault(),zo())},Jo=r=>{!Ur(r)||r.key!=="Escape"||_?.surface!=="popover"||!_.popover||(r.preventDefault(),er(_.popover.id,"escape").catch(()=>{}))},rt=()=>{let r=_?.surface==="popover"?_.popover:void 0;if(!r)return;let i=je||We;Bo!==i&&(Bo=i,tr(r.id,i).catch(()=>{}))},nt=()=>{_?.surface!=="popover"||je||(je=!0,rt())},Yo=r=>{_?.surface!=="popover"||r.relatedTarget!==null||!je||(je=!1,rt())},Qo=()=>{_?.surface!=="popover"||We||(We=!0,rt())},Zo=()=>{_?.surface!=="popover"||!We||(We=!1,rt())},ae=(r,i=1024)=>{if(!r.trim()||r.length>i)throw new T("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Nt=async r=>{r.kind!=="projects"&&ae(r.projectId);let i=await K({...P,type:"workspace-read",id:g(u),payload:r});if(!i||!("kind"in i)||!("state"in i)||i.kind!==r.kind)throw new T("HOST_REJECTED","Host did not return workspace data.");return i},Pt=async(r,i)=>{r.kind!=="projects"&&ae(r.projectId);let S=g(u);Ee.set(S,i);try{await G({...P,type:"workspace-subscribe",id:g(u),payload:{subscriptionId:S,query:r}})}catch(f){throw Ee.delete(S),q||J({...P,type:"workspace-unsubscribe",id:g(u),payload:{subscriptionId:S}}),f}return()=>{!Ee.delete(S)||q||J({...P,type:"workspace-unsubscribe",id:g(u),payload:{subscriptionId:S}})}},Un=async(r,i)=>{r.kind==="session"&&ae(r.sessionId),r.kind==="project"&&ae(r.projectId);let S=g(u);_e.set(S,i);try{await G({...P,type:"shells-subscribe",id:g(u),payload:{subscriptionId:S,scope:r}})}catch(f){throw _e.delete(S),q||J({...P,type:"shells-unsubscribe",id:g(u),payload:{subscriptionId:S}}),f}return()=>{!_e.delete(S)||q||J({...P,type:"shells-unsubscribe",id:g(u),payload:{subscriptionId:S}})}},st=async r=>{if("key"in r&&(r.key.length===0||r.key.length>128))throw new T("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!He(r.value))throw new T("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>65536)throw new T("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&_?.features?.deviceStorage!==!0)throw new T("UNSUPPORTED","This host does not support device storage.");let i=await K({...P,type:"storage",id:g(u),payload:r});if(!i||!("storage"in i)||i.op!==r.op)throw new T("HOST_REJECTED","Host did not return storage data.");return i},er=(r,i)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===r)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):G({...P,type:"popover-close",id:g(u),payload:i?{id:r,reason:i}:{id:r}}),tr=(r,i)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===r)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):G({...P,type:"popover-anchor",id:g(u),payload:{id:r,active:i}});return t.addEventListener("keydown",Jo,!0),t.addEventListener("pointerover",nt),t.addEventListener("pointermove",nt),t.addEventListener("pointerout",Yo),t.addEventListener("focus",Qo),t.addEventListener("blur",Zo),{onAction:r=>(W=r,()=>{W===r&&(W=null)}),listProjects:async()=>{let r=await Nt({kind:"projects"});if(r.kind!=="projects")throw new T("HOST_REJECTED","Expected projects.");return r},listWorktrees:async r=>{let i=await Nt({kind:"worktrees",projectId:r});if(i.kind!=="worktrees")throw new T("HOST_REJECTED","Expected worktrees.");return i},listSessions:async r=>{let i=await Nt({kind:"sessions",projectId:r});if(i.kind!=="sessions")throw new T("HOST_REJECTED","Expected sessions.");return i},onProjects:r=>Pt({kind:"projects"},i=>{i.kind==="projects"&&r(i)}),onWorktrees:(r,i)=>Pt({kind:"worktrees",projectId:r},S=>{S.kind==="worktrees"&&i(S)}),onSessions:(r,i)=>Pt({kind:"sessions",projectId:r},S=>{S.kind==="sessions"&&i(S)}),onRunningShells:(r,i)=>Un(r,i),readShellOutput:async(r,i)=>{ae(r,128);let S=i?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new T("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let f=i?.tailBytes;if(f!==void 0&&(!Number.isInteger(f)||f<1||f>65536))throw new T("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let w=await K({...P,type:"shell-output",id:g(u),payload:{shellId:r,cursor:S,tailBytes:f}});if(!w||typeof w.output!="string"||!Number.isFinite(w.cursor))throw new T("HOST_REJECTED","Host did not return shell output.");return w},stopShell:async r=>{if(ae(r,128),(await K({...P,type:"shell-stop",id:g(u),payload:{shellId:r}}))?.stopped!==!0)throw new T("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async r=>{ae(r),await G({...P,type:"open-session",id:g(u),payload:{sessionId:r}})},storage:{get:async(r,i)=>{let S=St(i),f={op:"get",key:r};S&&(f.scope=S);let C=await st(f);return C.op==="get"&&C.found?C.value:void 0},set:async(r,i,S)=>{let f=St(S),C={op:"set",key:r,value:i};f&&(C.scope=f),await st(C)},delete:async(r,i)=>{let S=St(i),f={op:"delete",key:r};S&&(f.scope=S),await st(f)},keys:async r=>{let i=St(r),S={op:"keys"};i&&(S.scope=i);let f=await st(S);if(f.op!=="keys")throw new T("HOST_REJECTED","Expected storage keys.");return f.keys}},onReady:r=>(s.add(r),_&&r(_),()=>{s.delete(r)}),onDirectory:r=>(c.add(r),_&&r(_.directory),()=>{c.delete(r)}),onSession:r=>(l.add(r),_&&r(_.session),()=>{l.delete(r)}),onSessionLifecycle:r=>(E.add(r),fe&&r(fe),()=>{E.delete(r)}),onConnection:r=>(b.add(r),_&&r(_.connection),()=>{b.delete(r)}),onSettings:r=>(m.add(r),_&&r(_.settings),()=>{m.delete(r)}),onItem:r=>(O.add(r),_&&r(_.item),()=>{O.delete(r)}),onBlock:r=>(j.add(r),_?.block&&r(_.block),()=>{j.delete(r)}),onServiceEvent:r=>($.add(r),()=>{$.delete(r)}),onStatusControl:r=>(X.add(r),()=>{X.delete(r)}),onPopoverClosed:r=>(B.add(r),()=>{B.delete(r)}),setStatusControls:r=>_?.features?.statusControls!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support status controls.")):ar(r)?G({...P,type:"status-controls",id:g(u),payload:{controls:r}}):Promise.reject(new T("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:r=>_?.features?.popovers!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):Xt(r)?G({...P,type:"popover-open",id:g(u),payload:r}):Promise.reject(new T("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:er,setPopoverAnchorActive:tr,onResolve:r=>(A=r,()=>{A===r&&(A=null)}),toast:r=>{let i=r.message.trim();return!i||i.length>at?Promise.reject(new T("HOST_REJECTED",`Toast message must contain 1 to ${at} characters.`)):r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>ct)?Promise.reject(new T("HOST_REJECTED",`Toast copy text must contain 1 to ${ct} characters.`)):G({channel:k,v:1,type:"toast",id:g(u),payload:{...r,message:i}})},openUrl:r=>G({channel:k,v:1,type:"open-url",id:g(u),payload:{url:r}}),openCommit:r=>jt(r)?G({channel:k,v:1,type:"open-commit",id:g(u),payload:{sha:r}}):Promise.reject(new T("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:r=>G({channel:k,v:1,type:"block-answer",id:g(u),payload:{text:r.trim().slice(0,Ft)}}),openSurface:r=>G({channel:k,v:1,type:"open-surface",id:g(u),payload:{surfaceId:r}}),writeClipboard:r=>G({channel:k,v:1,type:"clipboard-write",id:g(u),payload:{text:r}}),compose:r=>G({channel:k,v:1,type:"compose",id:g(u),payload:r}),attach:r=>G({channel:k,v:1,type:"attach",id:g(u),payload:Ve(r)}),startSession:async r=>{r.projectId!==void 0&&ae(r.projectId);let i=r.worktree;i&&i!==!0&&(i.kind==="existing"?ae(i.directory):(i.name!==void 0&&ae(i.name,200),i.baseBranch!==void 0&&ae(i.baseBranch,200)));let S=await K({channel:k,v:1,type:"start-session",id:g(u),payload:Jt(r)},e.requestTimeoutMs??18e4);if(!Bt(S))throw new T("HOST_REJECTED","Host did not return a session.");return S},prompt:r=>K({channel:k,v:1,type:"prompt",id:g(u),payload:Yt(r)}).then(i=>{if(!Kt(i))throw new T("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:r=>G({channel:k,v:1,type:"session-link",id:g(u),payload:Ve(r)}),close:()=>G({channel:k,v:1,type:"close",id:g(u)}),oauthStart:()=>G({channel:k,v:1,type:"oauth-start",id:g(u)}),oauthDisconnect:()=>G({channel:k,v:1,type:"oauth-disconnect",id:g(u)}),request:r=>(Et(r.path)?K({channel:k,v:1,type:"request",id:g(u),payload:r}):Nr()).then(i=>{if(!_t(i))throw new T("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:r=>(Et(r.path)?K({channel:k,v:1,type:"service-request",id:g(u),payload:r}):Nr()).then(i=>{if(!_t(i))throw new T("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>K({channel:k,v:1,type:"service-status",id:g(u)}).then(r=>{if(!eo(r))throw new T("HOST_REJECTED","Host did not return service status.");return r}),readFile:r=>(Xe(r)?K({channel:k,v:1,type:"file-read",id:g(u),payload:{path:r}}):ft()).then(i=>{if(!to(i))throw new T("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(r,i)=>Xe(r)?i.length>dt?Promise.reject(new T("FILE_TOO_LARGE",`Content is over ${dt} characters.`)):K({channel:k,v:1,type:"file-write",id:g(u),payload:{path:r,content:i}}).then(S=>{if(!oo(S))throw new T("HOST_REJECTED","Host did not confirm the write.");return S}):ft(),listDir:r=>(Xe(r)?K({channel:k,v:1,type:"file-list",id:g(u),payload:{path:r}}):ft()).then(i=>{if(!ro(i))throw new T("HOST_REJECTED","Host did not return directory entries.");return i}),stat:r=>(Xe(r)?K({channel:k,v:1,type:"file-stat",id:g(u),payload:{path:r}}):ft()).then(i=>{if(!no(i))throw new T("HOST_REJECTED","Host did not return file status.");return i}),generate:r=>{let i=r.prompt.trim(),S=r.system?.trim();if(i.length===0||i.length>pt)return Promise.reject(new T("HOST_REJECTED",`Prompt must be 1 to ${pt} characters.`));if(S!==void 0&&(S.length===0||S.length>ut))return Promise.reject(new T("HOST_REJECTED",`System prompt must be 1 to ${ut} characters.`));let f=r.maxOutputTokens===void 0?void 0:Math.min(zt,Math.max(1,Math.floor(r.maxOutputTokens)));if(f!==void 0&&!Number.isFinite(f))return Promise.reject(new T("HOST_REJECTED","maxOutputTokens must be a number."));let C={prompt:i};return S!==void 0&&(C.system=S),f!==void 0&&(C.maxOutputTokens=f),K({channel:k,v:1,type:"generate",id:g(u),payload:C},e.requestTimeoutMs??qt).then(w=>{if(!so(w))throw new T("HOST_REJECTED","Host did not return generated text.");return w})},onLateGenerateResult:r=>{oe.add(r);for(let i of pe.splice(0))M([r],i);return jo(),()=>{oe.delete(r)}},openMicrophone:Mn,setBadge:r=>G({channel:k,v:1,type:"badge",id:g(u),payload:{count:Qt(r)}}),setHeight:r=>G({channel:k,v:1,type:"resize",id:g(u),payload:{height:Zt(r)}}),onFileOpen:r=>(ie.add(r),De||(De=!0,t.addEventListener("keydown",qo,!0)),ke&&r(ke),()=>{ie.delete(r)}),onFileSnapshot:r=>(Ae=r,()=>{Ae===r&&(Ae=null)}),onFileSaved:r=>(we.add(r),()=>{we.delete(r)}),reportFileChange:r=>Mt({...P,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:zo,reportFileUnsupported:()=>Mt({...P,type:"file-unsupported"}),dispose:()=>{for(let r of Ee.keys())J({...P,type:"workspace-unsubscribe",id:g(u),payload:{subscriptionId:r}});Ee.clear();for(let r of _e.keys())J({...P,type:"shells-unsubscribe",id:g(u),payload:{subscriptionId:r}});_e.clear(),Q&&(Ut(),Q.release(),Q=null),q=!0,A=null,W=null,Ae=null,ie.clear(),we.clear(),De&&t.removeEventListener("keydown",qo,!0),t.removeEventListener("message",Wo),t.removeEventListener("keydown",Jo,!0),t.removeEventListener("pointerover",nt),t.removeEventListener("pointermove",nt),t.removeEventListener("pointerout",Yo),t.removeEventListener("focus",Qo),t.removeEventListener("blur",Zo);for(let r of ue.values())clearTimeout(r.timer),r.reject(new T("HOST_UNAVAILABLE","Host client was disposed."));ue.clear(),s.clear(),c.clear(),l.clear(),E.clear(),b.clear(),m.clear(),O.clear(),j.clear(),$.clear(),X.clear(),B.clear(),oe.clear(),pe.length=0}}};var Vr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var mi=new Set(Vr);var Kn=10*6e4;var jn=10*6e4;var Wn=10*6e4;var zn=10*6e4;var Xr=["none","agent","user"];var gi=new Set(Xr);var qn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Jn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],$r=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,n]of qn)t.style.setProperty(o,e.tokens[n]);for(let[o,n,s]of Jn){let c=e.tokens[s]??"";t.style.setProperty(o,c),t.style.setProperty(n,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Eo=(e,t)=>{$r(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Yn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},N=(e,t)=>`var(--${e}, var(--oc-${Yn[e]}, ${t}))`,Te=N("surface-background","transparent"),mt=N("surface-elevated","transparent"),$e=N("surface-elevated-foreground","inherit"),Z=N("surface-foreground","inherit"),L=N("surface-muted-foreground","gray"),Qn=N("surface-muted","transparent"),Me=N("interactive-border","currentColor"),Y=N("interactive-hover","transparent"),Ue=N("interactive-active","transparent"),_o=N("interactive-selection","transparent"),fo=N("interactive-selection-foreground","inherit"),Se=N("primary","currentColor"),So=N("primary-text","inherit"),To=N("error-text","inherit"),Zn=N("font-sans","inherit"),mo=N("font-mono","monospace"),jr=N("radius","9px"),ho=`calc(${jr} - 2px)`,Fr=`calc(${jr} - 4px)`,D=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Br=`background-image: linear-gradient(${Y}, ${Y});`,go=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,bo="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Kr="box-shadow: var(--oc-sdk-lit);",Ao=`inset 0 0.5px 0 0 ${D(Z,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,es=`
:root {
  --oc-sdk-edge: ${D(Z,16)};
  --oc-sdk-field-bg: ${mt};
  --oc-sdk-raised-bg: ${Te};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${D(Z,14)};
  --oc-sdk-field-bg: ${D(Te,50,mt)};
  --oc-sdk-raised-bg: ${mt};
  --oc-sdk-field-lift: ${Ao};
  --oc-sdk-raised-lift: ${Ao};
  --oc-sdk-lit: ${Ao};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Tt=e=>{let t=N(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${N(`${e}-text`,"inherit")}; }`},d=e=>`calc(${e}rem / 14)`,ts=`
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
`,Wr=`${es}
.oc-sdk { color: ${Z}; font-family: ${Zn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Br} }
.oc-sdk-mono { font-family: ${mo}; }
.oc-sdk-muted { color: ${L}; }
${Tt("success")}${Tt("warning")}${Tt("error")}${Tt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Se}; --oc-sdk-tone-text: ${So}; }

.oc-sdk-btn { border-radius: ${ho}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Fr}; }
.oc-sdk-btn[data-variant="default"] { color: ${So}; background: ${D(Se,10,Te)}; border-color: ${D(Se,12)}; ${Kr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${D(Se,16,Te)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${D(Se,22,Te)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Qn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ue}, ${Ue}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${$e}; ${bo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ue}, ${Ue}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Y}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ue}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${N("status-error","red")}; color: ${To}; background: ${D("var(--oc-sdk-tone)",7,Te)}; border-color: ${D("var(--oc-sdk-tone)",12)}; ${Kr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${D("var(--oc-sdk-tone)",9,Te)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${D("var(--oc-sdk-tone)",11,Te)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${To}; }
.oc-sdk-input { border-radius: ${ho}; background: var(--oc-sdk-field-bg); color: ${$e}; ${go("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${go(D(Z,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${go(N("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${mo}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Se}; }
.oc-sdk-search-clear { border-radius: ${Fr}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${Y}; color: ${Z}; }

.oc-sdk-trigger { border-radius: ${ho}; background: var(--oc-sdk-raised-bg); color: ${$e}; ${bo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Y}, ${Y}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ue}, ${Ue}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${L}; }
.oc-sdk-trigger-chevron { color: ${L}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${$e}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${mt}; background-clip: padding-box; color: ${$e}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Y}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${_o}; color: ${fo}; }
.oc-sdk-option-check { color: ${Z}; }
.oc-sdk-option[data-destructive="true"] { color: ${To}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${D(N("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${L}; }
.oc-sdk-popup-empty { color: ${L}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Me}; border-radius: 4px; color: ${Z}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${D(Z,60,Me)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Me}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Te}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Se}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Br} }
.oc-sdk-check-desc { color: ${L}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${D(Z,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${L}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Z}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fo}; background: ${_o}; border-color: ${Me}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${$e}; background: var(--oc-sdk-raised-bg); ${bo} }
.oc-sdk-tab-count { color: ${L}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${D(Z,6)}; color: ${L}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${D("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Y}; }
.oc-sdk-row[aria-selected="true"] { background: ${_o}; color: ${fo}; }
.oc-sdk-row-lead { font-family: ${mo}; color: ${L}; }
.oc-sdk-row-sub { color: ${L}; }
.oc-sdk-row-meta { color: ${L}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${L}; }

.oc-sdk-empty-body { color: ${L}; }

.oc-sdk-spinner { color: ${L}; }
.oc-sdk-spinner-ring { border-color: ${Me}; border-top-color: ${Se}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${D("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${L}; }

.oc-sdk-separator { color: ${L}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${D(Me,40)}; }

.oc-sdk-progress-label { color: ${L}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${D(Z,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Se}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${N("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${N("success-text","inherit")}; }

.oc-sdk-text a { color: ${So}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${D(Me,60)}; }
`,H=`
${Lt}
${ts}
${Wr}`;var zr="oc-sdk-ui-style",Ne=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},V=e=>{let t=document.getElementById(zr);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Dt(document);let o=document.createElement("style");o.id=zr,o.textContent=e,document.head.appendChild(o)},I=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},ce=e=>{let t=I("button",e);return t.type="button",t},ee=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},xe=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},qr=(e,t)=>{let o=n=>{n.target instanceof Node&&e.contains(n.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var os=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},me=(e,t)=>{V(H);let o=t,n=ce("oc-sdk oc-sdk-btn"),s=os(),c=document.createElement("span");n.append(c),e.append(n);let l=()=>{n.dataset.variant=o.variant??"default",n.dataset.size=o.size??"default",n.disabled=!!o.disabled||!!o.loading,n.dataset.loading=o.loading?"true":"false",n.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&s.parentNode!==n?n.prepend(s):!o.loading&&s.parentNode===n&&s.remove(),ee(c,o.label)},E=()=>{o.disabled||o.loading||o.onClick()};return n.addEventListener("click",E),l(),{update:b=>{o={...o,...b},l()},dispose:()=>{n.removeEventListener("click",E),n.remove()}}};var Jr="http://www.w3.org/2000/svg",rs={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},he=(e,t,o)=>{let n=document.createElementNS(Jr,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.style.width=d(t),n.style.height=d(t),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),o&&n.setAttribute("class",o);let s=document.createElementNS(Jr,"path");return s.setAttribute("d",rs[e]),n.append(s),n};var ko=(e,t)=>{V(H);let o=t,n=I("div","oc-sdk oc-sdk-search"),s=I("input","oc-sdk-input");s.type="text",s.spellcheck=!1,s.autocomplete="off",s.setAttribute("role","searchbox");let c=ce("oc-sdk-search-clear");c.append(he("close",14)),c.tabIndex=-1,n.append(he("search",16,"oc-sdk-search-icon"),s,c),e.append(n);let l=()=>{let O=o.placeholder??"Search";xe(s,"placeholder",O),s.setAttribute("aria-label",o.label??O),c.setAttribute("aria-label","Clear search"),s.value!==o.value&&(s.value=o.value),n.dataset.active=o.value.trim()===""?"false":"true"},E=()=>{o.value!==""&&o.onChange(""),s.focus()},b=()=>{o.onChange(s.value)},m=O=>{O.key==="Escape"&&s.value!==""&&(O.preventDefault(),E())};return s.addEventListener("input",b),s.addEventListener("keydown",m),c.addEventListener("click",E),l(),o.autofocus&&s.focus(),{update:O=>{o={...o,...O},l()},dispose:()=>{s.removeEventListener("input",b),s.removeEventListener("keydown",m),c.removeEventListener("click",E),n.remove()}}};var Oe=(e,t="vertical")=>{let[o,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},Pe=(e,t,o)=>{let n=e.filter(b=>!b.disabled);if(n.length===0)return null;let s=n[0],c=n[n.length-1];if(o==="first"||!s||!c)return s?.id??null;if(o==="last")return c.id;let l=n.findIndex(b=>b.id===t);return l===-1?o==="next"?s.id:c.id:n[Math.min(n.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var Yr=(e,t)=>`${e}-${t??""}`,ht=(e,t,o,n)=>{let s=ce("oc-sdk-option");s.id=Yr(e,o.id),s.setAttribute("role",t),s.tabIndex=-1,s.disabled=!!o.disabled,t==="option"&&s.setAttribute("aria-selected",o.selected?"true":"false"),s.dataset.destructive=o.destructive?"true":"false";let c=I("span","oc-sdk-option-label");if(c.textContent=o.label,s.append(c),o.hint){let l=I("span","oc-sdk-option-hint");l.textContent=o.hint,s.append(l)}if(t==="option"){s.dataset.mark="check";let l=I("span","oc-sdk-option-check");l.append(he("check",14)),s.append(l)}return s.addEventListener("pointerenter",n.hover),s.addEventListener("click",n.pick),s},gt=(e,t,o,n)=>{let s=Yr(o,n);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===s?"true":"false");xe(t,"aria-activedescendant",n?s:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ns=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let n=e.offsetHeight,s=window.innerHeight-o.bottom-8;n>s&&o.top-8>s&&(e.style.top=`${Math.max(8,Math.round(o.top-4-n))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},bt=(e,t,o,n)=>{e.append(o),ns(o,t);let s=qr(e,n),c=()=>{n()},l=E=>{E.target instanceof Node&&o.contains(E.target)||n()};return window.addEventListener("resize",c),window.addEventListener("scroll",l,!0),()=>{s(),window.removeEventListener("resize",c),window.removeEventListener("scroll",l,!0),o.remove()}};var Qr=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(n=>n.label.toLowerCase().includes(o)||n.id.toLowerCase().includes(o)):[...e]},ss=0,qe=(e,t)=>{V(H);let o=t,n=`oc-sdk-select-${ss+=1}`,s=I("div","oc-sdk oc-sdk-select"),c=I("span","oc-sdk-field-label");c.id=`${n}-label`;let l=ce("oc-sdk-trigger");l.setAttribute("aria-haspopup","listbox"),l.setAttribute("aria-labelledby",c.id);let E=I("span","oc-sdk-trigger-value");l.append(E,he("chevron",14,"oc-sdk-trigger-chevron")),s.append(c,l),e.append(s);let b="",m=null,O=null,j=I("div","oc-sdk oc-sdk-popup"),$=I("div","oc-sdk-popup-search"),X=I("input","oc-sdk-input");X.type="text",X.autocomplete="off",$.append(X);let B=I("div");B.setAttribute("role","listbox"),B.tabIndex=-1,j.append(B);let oe=()=>Qr(o.options,o.searchable?b:""),pe=()=>o.searchable?X:B,A=u=>{m=u,gt(B,pe(),n,u)},W=()=>{Ne(B);let u=oe();if(u.length===0){let _=I("div","oc-sdk-popup-empty");_.textContent="No matches",B.append(_)}for(let _ of u)B.append(ht(n,"option",{..._,selected:_.id===o.value},{hover:()=>A(_.id),pick:()=>Ae(_.id)}));A(u.some(_=>_.id===m)?m:u[0]?.id??null)},ie=()=>{let u=O;O=null,u?.(),b="",X.value="",l.setAttribute("aria-expanded","false")},we=()=>{O||o.disabled||(m=o.value,X.placeholder=o.searchPlaceholder??"Search",o.searchable?j.prepend($):$.remove(),W(),O=bt(s,l,j,ie),l.setAttribute("aria-expanded","true"),pe().focus())},Ae=u=>{ie(),l.focus(),u!==o.value&&o.onChange(u)},ke=()=>{O?ie():we()},De=u=>{!O&&Oe(u)&&(u.preventDefault(),we())},ue=u=>{let _=Oe(u);_?(u.preventDefault(),A(Pe(oe(),m,_))):u.key==="Enter"?(u.preventDefault(),m&&Ae(m)):u.key==="Escape"?(u.preventDefault(),ie(),l.focus()):o.searchable&&u.target!==X&&u.key.length===1&&!u.ctrlKey&&!u.metaKey&&X.focus()},Ee=()=>{b=X.value,W()},_e=u=>{O&&!(u.relatedTarget instanceof Node&&s.contains(u.relatedTarget))&&ie()},q=()=>{ee(c,o.label),c.hidden=!o.label;let u=o.options.find(_=>_.id===o.value);ee(E,u?.label??o.placeholder??"Select"),E.dataset.empty=u?"false":"true",l.disabled=!!o.disabled,O&&W()};return l.addEventListener("click",ke),l.addEventListener("keydown",De),j.addEventListener("keydown",ue),X.addEventListener("input",Ee),s.addEventListener("focusout",_e),q(),{update:u=>{o={...o,...u},q()},dispose:()=>{ie(),l.removeEventListener("click",ke),l.removeEventListener("keydown",De),j.removeEventListener("keydown",ue),X.removeEventListener("input",Ee),s.removeEventListener("focusout",_e),s.remove()}}};var Zr=e=>e.filter(t=>!("separator"in t)),as=0,At=(e,t)=>{V(H);let o=t,n=`oc-sdk-menu-${as+=1}`,s=I("div","oc-sdk oc-sdk-menu");e.append(s);let c=I("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let l=null,E=null,b=me(s,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{l?$():X()}}),m=s.querySelector("button");m?.setAttribute("aria-haspopup","menu");let O=A=>{E=A,gt(c,c,n,A)},j=()=>{Ne(c);for(let A of o.items){if("separator"in A){let W=I("div","oc-sdk-separator");W.dataset.labeled="false",c.append(W);continue}c.append(ht(n,"menuitem",A,{hover:()=>O(A.id),pick:()=>B(A.id)}))}O(Zr(o.items).some(A=>A.id===E)?E:null)},$=()=>{let A=l;l=null,A?.(),E=null,m?.setAttribute("aria-expanded","false")},X=()=>{l||!m||(j(),l=bt(s,m,c,$),m.setAttribute("aria-expanded","true"),c.focus())},B=A=>{$(),m?.focus(),o.onSelect(A)},oe=A=>{let W=Oe(A);W?(A.preventDefault(),O(Pe(Zr(o.items),E,W))):A.key==="Enter"||A.key===" "?(A.preventDefault(),E&&B(E)):A.key==="Escape"&&(A.preventDefault(),$(),m?.focus())},pe=A=>{l&&!(A.relatedTarget instanceof Node&&s.contains(A.relatedTarget))&&$()};return c.addEventListener("keydown",oe),s.addEventListener("focusout",pe),{update:A=>{o={...o,...A},b.update({label:o.label,variant:o.variant,size:o.size}),l&&j()},dispose:()=>{$(),c.removeEventListener("keydown",oe),s.removeEventListener("focusout",pe),b.dispose(),s.remove()}}};var xo=(e,t)=>e.name.localeCompare(t.name,void 0,{sensitivity:"base"})||e.id.localeCompare(t.id),en=e=>{switch(e.state){case"conflict":return 0;case"mixed":return 1;case"enabled":return 2;default:return 3}},cs=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,ls=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return cs(e);case"all":default:return!0}},ds=(e,t)=>{let o=t.trim().toLowerCase();return o?[e.id,e.name,e.description,...e.warnings].join(" ").toLowerCase().includes(o):!0},Je=e=>({enable:e.filter(t=>t.state==="disabled").map(t=>t.key??t.id),disable:e.filter(t=>t.state==="enabled").map(t=>t.key??t.id)}),tn=(e,t)=>{let o=t.sourceFilter??"all",n=e.filter(s=>(o==="all"||s.scope===o)&&ls(s,t.stateFilter)&&ds(s,t.query));switch(t.sortMode){case"tokens":return[...n].sort((s,c)=>c.estimatedTokens-s.estimatedTokens||xo(s,c));case"name":return[...n].sort(xo);case"state":return[...n].sort((s,c)=>en(s)-en(c)||xo(s,c));case"default":default:return n}};function on(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",n=>{let s=n.target===e?t:n.target;if(!(s instanceof Element))return;s.hasAttribute("data-oc-scrolling")||s.setAttribute("data-oc-scrolling","");let c=o.get(s);c!==void 0&&clearTimeout(c),o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var rn=`:root {
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
`;var nn=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
`;var a=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,n)=>Object.prototype.hasOwnProperty.call(t,n)?String(t[n]):o):e,de=uo({requestTimeoutMs:3e4}),un=document.querySelector("#root");if(!un)throw new Error("Missing #root");on(document);var En=document.createElement("style");En.textContent=nn+rn;document.head.append(En);var p=(e,t="",o)=>{let n=document.createElement(e);return n.className=t,o!==void 0&&(n.textContent=o),n},Re=class extends Error{code;conflicts;constructor(t,o,n){super(t),this.name="ServiceError",this.code=o,this.conflicts=n}},Es=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",_s=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",ge=(e,t="")=>typeof e=="string"?e:t,Mo=e=>typeof e=="string"&&e.length>0?e:null,Ot=e=>e===!0,_n=e=>typeof e=="number"&&Number.isFinite(e)?e:0,sn=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],Lo=e=>{if(!e||typeof e!="object")return null;let t=e;return!_s(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:ge(t.message,a("Conflict")),activePath:Mo(t.activePath),disabledPath:Mo(t.disabledPath),blocking:Ot(t.blocking)}},fs=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!Es(t.state)?null:{key:ge(t.key,t.id),id:t.id,scope:t.scope==="project"?"project":"global",sourceId:ge(t.sourceId,"opencode-global"),rootPath:ge(t.rootPath),name:ge(t.name,t.id),description:ge(t.description),state:t.state,advertised:Ot(t.advertised),autoInvokeOff:Ot(t.autoInvokeOff),activePaths:sn(t.activePaths),disabledPaths:sn(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(Lo).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:_n(t.estimatedTokens),...t.duplicateResolution&&typeof t.duplicateResolution=="object"?{duplicateResolution:(()=>{let o=t.duplicateResolution;return{status:o.status==="highest-scanned"||o.status==="shadowed"?o.status:"unknown",winningPath:Mo(o.winningPath)}})()}:{}}},an=e=>{if(!e||typeof e!="object")throw new Re(a("The service returned invalid skill directory information."),"parse",[]);let t=e;return{sourceId:ge(t.sourceId,"opencode-global"),scope:t.scope==="project"?"project":"global",label:ge(t.label,a("Skill directory")),path:ge(t.path),exists:Ot(t.exists),error:typeof t.error=="string"?t.error:null}},Le=e=>{if(!e||typeof e!="object")throw new Re(a("The service returned data in an unexpected format."),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new Re(a("The service returned data in an unexpected format."),"parse",[]);let o=t.skills.map(fs).filter(E=>E!==null),n=Array.isArray(t.conflicts)?t.conflicts.map(Lo).filter(E=>E!==null):o.flatMap(E=>E.conflicts),s=n.filter(E=>E.blocking).length,c={total:o.length,advertised:o.filter(E=>E.advertised).length,disabled:o.filter(E=>E.state==="disabled").length,blockingConflicts:s,warnings:n.length-s,estimatedTokens:o.reduce((E,b)=>E+b.estimatedTokens,0)},l=Array.isArray(t.roots)?t.roots.map(an):t.root?[an(t.root)]:[];return{skills:o,conflicts:n,summary:c,root:l[0]??{sourceId:"opencode-global",scope:"global",label:a("Skill directory"),path:"",exists:!1,error:null},roots:l,projectDirectory:typeof t.projectDirectory=="string"?t.projectDirectory:null,scannedAt:_n(t.scannedAt)}},Ss=async(e,t,o,n)=>{let s=await de.serviceRequest({method:e,path:t,...n?{query:n}:{},...o===void 0?{}:{body:JSON.stringify(o)}}),c;try{c=JSON.parse(s.body)}catch{throw new Re(a("The service returned unrecognized data. Try again."),"parse",[])}if(s.status>=400){let l=c&&typeof c=="object"?c:{},E=typeof l.error=="string"?l.error:a("Request failed ({status})",{status:s.status}),b=typeof l.code=="string"?l.code:null,m=Array.isArray(l.conflicts)?l.conflicts.map(Lo).filter(O=>O!==null):[];throw new Re(E,b,m)}return c},Ce=async(e,t,o)=>{let n=Ke,s=o===void 0||e==="GET"?void 0:{...o,directory:n??void 0},c=await Ss(e,t,s,e==="GET"&&n?{directory:n}:void 0);if(n!==Ke)throw new Error(a("The project changed; rescan before making changes."));return c},be=e=>e instanceof T?e.code==="NO_SERVICE"?a('Allow "Skills" to run its local service in Settings \u2192 Extensions.'):e.code==="SERVICE_FAILED"?a("The local service is not ready. Reload the extension and try again."):e.code==="DISABLED"?a("The Skills extension is disabled. Enable it in extension settings."):e.code==="HOST_TIMEOUT"?a("The local service timed out. Try again."):a("Cannot connect to the local service. Check extension permissions."):e instanceof Re||e instanceof Error?e.message:a("The operation failed. Try again."),vt=p("main","ext ext-container sk");vt.setAttribute("aria-label",a("Skills Manager"));var fn=p("header","sk-header"),Sn=p("div","sk-title-row"),Ts=p("h1","sk-title",a("Skills Manager")),Ct=p("div","sk-actions"),ms=me(Ct,{label:a("Rescan"),variant:"outline",size:"sm",onClick:()=>{ve(!0)}}),hs=me(Ct,{label:a("Enable all"),variant:"outline",size:"sm",onClick:()=>Cn(!0)}),gs=me(Ct,{label:a("Disable all"),variant:"outline",size:"sm",onClick:()=>Cn(!1)});Sn.append(Ts,Ct);var Uo=p("p","sk-summary"),No=p("p","sk-summary sk-summary-secondary");fn.append(Sn,Uo,No);var Tn=p("div","sk-body"),z=p("div","sk-notice-root");z.setAttribute("aria-live","polite");var et=p("div"),Be=p("details","sk-sources"),mn=p("div","sk-toolbar"),Do=p("div","sk-search-slot"),hn=p("div","sk-toolbar-selects"),Go=p("div","sk-toolbar-actions"),Ho=p("div","sk-filter-slot"),Vo=p("div","sk-source-slot"),Xo=p("div","sk-sort-slot");hn.append(Ho,Vo,Xo);var Rt=At(Go,{label:a("List actions"),variant:"outline",size:"sm",items:[{id:"invert",label:a("Invert visible skills")},{id:"copy-ids",label:a("Copy visible IDs")}],onSelect:e=>{e==="invert"?Ms():e==="copy-ids"&&ws()}}),Fe=Go.querySelector(".oc-sdk-btn"),ye=document.createElementNS("http://www.w3.org/2000/svg","svg");ye.setAttribute("viewBox","0 0 16 16");ye.setAttribute("width","16");ye.setAttribute("height","16");ye.setAttribute("fill","currentColor");ye.setAttribute("aria-hidden","true");for(let e of["3","8","13"]){let t=document.createElementNS("http://www.w3.org/2000/svg","circle");t.setAttribute("cx",e),t.setAttribute("cy","8"),t.setAttribute("r","1.5"),ye.append(t)}var gn=()=>{Fe&&(Fe.classList.add("sk-list-menu-trigger"),Fe.setAttribute("aria-label",a("List actions")),Fe.title=a("Copy IDs or invert the visible skills"),Fe.firstChild!==ye&&Fe.replaceChildren(ye))},bs=Rt.update.bind(Rt);Rt.update=e=>{bs(e),gn()};gn();mn.append(Do,hn,Go);var Ye=p("div","sk-list");Ye.setAttribute("role","list");var bn=p("footer","sk-footer"),As=p("p","",a("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open.")),ks=p("p","",a("Enable all before disabling or uninstalling the extension; rescan after skills change."));bn.append(As,ks);Tn.append(z,et,Be,mn,Ye,bn);vt.append(fn,Tn);un.append(vt);var h=null,le=!1,kt=0,Qe=null,v=null,y=null,F=null,te=!1,se=null,wt="",tt="all",ot="all",yt="default",Ke=null,xt=new Set,cn,ln=!1,An=()=>[{id:"all",label:a("All states")},{id:"enabled",label:a("Enabled")},{id:"disabled",label:a("Disabled")},{id:"attention",label:a("Needs attention")}],kn=()=>[{id:"all",label:a("All sources")},{id:"global",label:a("Global")},{id:"project",label:a("Project")}],xn=()=>[{id:"default",label:a("Default order")},{id:"tokens",label:a("Tokens (high to low)")},{id:"name",label:a("Name (A\u2013Z)")},{id:"state",label:a("Needs attention first")}],xs=ko(Do,{value:"",placeholder:a("Search name, description, or ID (press / to focus)"),onChange:e=>{wt=e,x()}}),On=()=>Do.querySelector("input"),Rn=()=>{let e=On();e&&e.setAttribute("aria-label",a("Search skills"))};Rn();var yn=qe(Ho,{value:"all",options:An(),onChange:e=>{tt=e==="enabled"||e==="disabled"||e==="attention"?e:"all",yn.update({value:tt}),x()}}),Oo=Ho.querySelector(".oc-sdk-trigger");Oo&&(Oo.setAttribute("aria-label",a("Filter by status")),Oo.removeAttribute("aria-labelledby"));var In=qe(Vo,{value:"all",options:kn(),onChange:e=>{ot=e==="global"||e==="project"?e:"all",In.update({value:ot}),x()}}),Ro=Vo.querySelector(".oc-sdk-trigger");Ro&&(Ro.setAttribute("aria-label",a("Filter by skill source")),Ro.removeAttribute("aria-labelledby"));var vn=qe(Xo,{value:"default",options:xn(),onChange:e=>{yt=e==="tokens"||e==="name"||e==="state"?e:"default",vn.update({value:yt}),x()}}),yo=Xo.querySelector(".oc-sdk-trigger");yo&&(yo.setAttribute("aria-label",a("Sort order")),yo.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=On();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"&&(F!==null||te||se!==null)){e.preventDefault(),F=null,te=!1,se=null,x();return}}});var It=()=>!!(h?.root.error||h?.roots.some(e=>e.error)),Ie=()=>{let e=h;return e?tn(e.skills,{query:wt,stateFilter:tt,sourceFilter:ot,sortMode:yt}):[]},Os=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",Rs=e=>e.state==="conflict"?a("Conflict"):e.state==="mixed"?a("Mixed"):e.state==="disabled"?a("Disabled"):a("Enabled"),Ze=(e,t="neutral")=>{let o=p("span","sk-badge",e);return o.dataset.tone=t,o},ys=e=>{switch(e){case"both":return a("Both entry and disabled file exist");case"duplicate":return a("Multiple entries for one ID");case"invalid":return a("Frontmatter could not be parsed");case"empty":return a("Entry file is empty");case"read-error":return a("Entry cannot be read");case"manual":return a("Manual invocation only");case"no-description":return a("No description");default:return a("Conflict")}},Io=(e,t)=>{if(!t)return null;let o=p("p","sk-path");return o.append(p("span","sk-path-label",`${e}:`),p("code","",t)),o},ne=(e,t,o=!1,n=!1)=>{let s=p("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return s.type="button",s.disabled=!!y||n,s.addEventListener("click",t),s},dn=e=>{let t=p("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=p("div","sk-conflict-copy");if(o.append(p("strong","",ys(e.kind)),p("p","sk-conflict-message",e.message)),e.kind==="both"?(o.append(Io(a("Active entry"),e.activePath)??p("span")),o.append(Io(a("Disabled entry"),e.disabledPath)??p("span"))):(e.activePath??e.disabledPath)&&o.append(Io(a("Entry"),e.activePath??e.disabledPath)??p("span")),t.append(o),e.kind==="both"&&e.activePath){let n=p("div","sk-conflict-actions");n.append(ne(a("Keep enabled"),()=>void pn(e,"enabled"),!1,It()),ne(a("Keep disabled"),()=>void pn(e,"disabled"),!1,It())),t.append(n)}return t},Is=()=>{if(et.replaceChildren(),!h)return;let t=[...h.roots.filter(l=>!!l.error).map(l=>({kind:"read-error",skillId:"",message:a("Cannot read {label}: {error} ({path})",{label:l.label,error:l.error??"",path:l.path}),activePath:null,disabledPath:null,blocking:!0})),...h.conflicts],o=t.filter(l=>l.blocking),n=t.filter(l=>!l.blocking);if(o.length===0&&n.length===0)return;let s=p("section","sk-conflicts");s.setAttribute("aria-label",a("Conflict check"));let c=p("div","sk-section-head");if(c.append(p("h2","sk-section-title",a("Conflict check")),p("span","sk-section-count",a("To resolve: {blocking} \xB7 Warnings: {warnings}",{blocking:o.length,warnings:n.length}))),s.append(c),o.length>0){let l=p("ul","sk-conflict-list");for(let E of o)l.append(dn(E));s.append(l)}if(n.length>0){let l=p("details","sk-warning-details");l.append(p("summary","",a("Warnings ({count})",{count:n.length})));let E=p("ul","sk-conflict-list");for(let b of n)E.append(dn(b));l.append(E),s.append(l)}et.append(s)},vs=()=>{let e=Be.open;Be.replaceChildren();let t=h;if(!t)return;let o=t.roots.filter(c=>c.exists).length;Be.append(p("summary","",a("Detected skill sources: {available}/{total} available",{available:o,total:t.roots.length})));let n=new Map;for(let c of t.skills)c.activePaths.length>0&&n.set(c.sourceId,(n.get(c.sourceId)??0)+1);let s=p("ul","sk-source-list");for(let c of t.roots){let l=p("li","sk-source-item"),E=p("div","sk-source-head"),b=c.error?a("Error"):c.exists?a("Available"):a("Not created");E.append(p("strong","",c.label),Ze(c.scope==="project"?a("Project"):a("Global"),c.scope==="project"?"info":"neutral"),Ze(b,c.error?"error":c.exists?"success":"neutral"));let m=p("div","sk-source-actions"),O=ne(a("Disable all"),()=>Xs(c.sourceId),!1,(n.get(c.sourceId)??0)===0);if(m.append(O),c.path){let j=ne(a("Open folder"),()=>{(async()=>{try{await Ce("POST","/sources/open",{path:c.path})}catch($){v={text:be($),tone:"error"},x()}})()},!1,!c.exists);m.append(j)}E.append(m),l.append(E,p("code","sk-source-path",c.path||a("No path"))),c.error&&l.append(p("p","sk-source-error",c.error)),s.append(l)}Be.append(s),Be.open=e},$o=()=>{if(z.replaceChildren(),te){let e=Je(Ie()),t=e.enable.length+e.disable.length,o=p("div","sk-notice",a("Invert visible skills: enable {enable}, disable {disable}.",{enable:e.enable.length,disable:e.disable.length}));o.dataset.tone="warning",o.setAttribute("role","status"),vo(o,Ie().filter(s=>s.state==="enabled"||s.state==="disabled"),s=>s.state==="disabled");let n=p("div","sk-notice-actions");n.append(ne(a("Confirm invert"),()=>void Us(),!0,t===0),ne(a("Cancel"),()=>{te=!1,x()})),o.append(n),z.append(o);return}if(F!==null){let e=h?h.skills.filter(n=>(F?n.disabledPaths.length:n.activePaths.length)>0).length:0,t=p("div","sk-notice",F?a("Skills to enable: {count}.",{count:e}):a("Skills to disable: {count}.",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status"),vo(t,h?.skills??[],()=>F===!0);let o=p("div","sk-notice-actions");o.append(ne(a(F?"Confirm enable":"Confirm disable"),()=>void Vs(),!0),ne(a("Cancel"),()=>{F=null,x()})),t.append(o),z.append(t);return}if(se!==null){let e=se,t=h?.roots.find(c=>c.sourceId===e),o=(h?.skills??[]).filter(c=>c.sourceId===e&&c.activePaths.length>0),n=p("div","sk-notice",a("Disable all skills in {source}? {count} skill(s) will be changed.",{source:t?.label??e,count:o.length}));n.dataset.tone="warning",n.setAttribute("role","status"),vo(n,o,()=>!1);let s=p("div","sk-notice-actions");s.append(ne(a("Confirm disable"),()=>void $s(),!0,o.length===0),ne(a("Cancel"),()=>{se=null,x()})),n.append(s),z.append(n);return}if(v){let e=p("div","sk-notice sk-notice-dismissible");e.dataset.tone=v.tone,e.setAttribute("role",v.tone==="error"?"alert":"status");let t=p("div","sk-notice-body",v.text),o=p("button","sk-notice-close","\xD7");if(o.type="button",o.setAttribute("aria-label",a("Dismiss notification")),o.addEventListener("click",()=>{v=null,$o()}),e.append(t,o),v.actions?.length){let n=p("div","sk-notice-actions");for(let s of v.actions)n.append(ne(s.label,s.onClick,s.primary));e.append(n)}z.append(e);return}if(Qe){let e=p("div","sk-notice",Qe);e.dataset.tone="error",e.setAttribute("role","alert"),z.append(e);return}if(le&&!h){let e=p("div","sk-notice",a("Reading skills\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),z.append(e)}},vo=(e,t,o)=>{let n=p("details","sk-preview");n.open=!0,n.append(p("summary","",a("Files affected (current scan)")));let s=p("ul","sk-preview-list");for(let c of t){let l=o(c),E=l?c.disabledPaths:c.activePaths;for(let b of E){let m=p("li","");m.append(p("strong","",`${a(l?"Enable":"Disable")}: ${c.key}`),p("code","sk-source-path",b)),s.append(m)}}n.append(s),e.append(n)},Fo=async()=>{if(!y){y="undo",x();try{h=Le(await Ce("POST","/skills/undo",{})),v={text:a("The last bulk operation was undone."),tone:"success"}}catch(e){v={text:be(e),tone:"error"}}finally{y=null,x()}}},Cs=()=>{if(!h){Uo.textContent=a(le?"Reading skills\u2026":"Skills not read yet."),No.textContent=a("After disabling an entry document, OpenCode no longer discovers that skill.");return}Uo.textContent=a("Estimated advertised entries: {advertised} of {total} \xB7 about {tokens} tokens/step",{advertised:h.summary.advertised,total:h.summary.total,tokens:h.summary.estimatedTokens.toLocaleString("en")});let e=[a("Disabled: {count}",{count:h.summary.disabled})],t=h.skills.filter(o=>o.scope==="project").length;if(Ke&&e.push(a("Project skills: {count}",{count:t})),h.summary.blockingConflicts>0?e.push(a("Blocking conflicts: {count}",{count:h.summary.blockingConflicts})):e.push(a("No blocking conflicts")),h.summary.warnings>0&&e.push(a("Warnings: {count}",{count:h.summary.warnings})),h.roots.some(o=>o.error)&&e.push(a("A skill directory cannot be read")),h.scannedAt>0){let o=new Date(h.scannedAt);Number.isNaN(o.getTime())||e.push(a("Scanned {time}",{time:o.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})}))}No.textContent=a("{parts}. Estimates exclude built-in skills.",{parts:e.join(" \xB7 ")})},Po=async(e,t)=>{try{await de.writeClipboard(e),de.toast({kind:"success",message:t}).catch(()=>{})}catch(o){v={text:be(o),tone:"error"},$o()}},ws=async()=>{let e=Ie().map(t=>t.key);e.length!==0&&await Po(e.join(`
`),a("Copied {count} visible qualified IDs.",{count:e.length}))},Ms=()=>{if(!h||y)return;let e=Je(Ie());if(e.enable.length+e.disable.length===0){v={text:a("No enabled or disabled skills match the current view."),tone:"info"},x();return}te=!0,F=null,se=null,v=null,x(),z.scrollIntoView({block:"nearest"}),z.querySelector("button")?.focus()},Us=async()=>{if(!h||y||!te)return;let e=Je(Ie()),t=e.enable.length+e.disable.length;if(te=!1,t!==0){y="invert",v=null,x();try{let o=Ie().flatMap(c=>e.enable.includes(c.key)?c.disabledPaths:e.disable.includes(c.key)?c.activePaths:[]),n=await Ce("POST","/skills/batch",{...e,expectedPaths:o});h=Le(n);let s=!!(n&&typeof n=="object"&&n.undoAvailable);v={text:a("Inverted {count} visible skills.",{count:t}),tone:"success",...s?{actions:[{label:a("Undo last action"),onClick:()=>void Fo()}]}:{}},de.toast({kind:"success",message:a("Inverted {count} visible skills.",{count:t})}).catch(()=>{})}catch(o){v={text:be(o),tone:"error"},y=null,x(),ve(!1,!0);return}y=null,x()}},Co=(e,t)=>{let o=p("span","sk-menu-slot"),n=t.activePaths[0]??t.disabledPaths[0]??null;At(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:a("Copy entry path"),disabled:!n},{id:"copy-id",label:a("Copy qualified skill ID")}],onSelect:c=>{c==="copy-path"&&n?Po(n,a("Copied entry path.")):c==="copy-id"&&Po(t.key,a("Copied qualified skill ID."))}});let s=o.querySelector(".oc-sdk-btn");s&&(s.setAttribute("aria-label",`${a("More actions")} ${t.name}`),s.title=a("More actions")),e.append(o)},Ns=e=>{let t=p("div","sk-skill-action"),o=p("span","sk-action-note"),n=p("div","sk-action-top"),s=It();if(e.state==="conflict"){o.textContent=a(s?"Directory cannot be read":"Resolve conflicts first");let E=p("button","sk-inline-button",a("Resolve conflict"));return E.type="button",E.disabled=!!y||s,E.addEventListener("click",()=>{et.scrollIntoView({block:"nearest"}),et.querySelector("button")?.focus()}),n.append(E),Co(n,e),t.append(o,n),t}if(e.state==="mixed"){o.textContent=a(s?"Directory cannot be read":"Some entries disabled");let E=p("div","sk-mini-actions"),b=p("button","sk-inline-button",a("Enable all"));b.type="button",b.disabled=!!y||s,b.addEventListener("click",()=>void wo(e,!0));let m=p("button","sk-inline-button",a("Disable all"));return m.type="button",m.disabled=!!y||s,m.addEventListener("click",()=>void wo(e,!1)),E.append(b,m),Co(E,e),t.append(o,E),t}let c=e.state==="enabled",l=p("button","sk-switch");return l.type="button",l.setAttribute("role","switch"),l.setAttribute("aria-checked",c?"true":"false"),l.setAttribute("aria-label",`${a(c?"Disable":"Enable")} ${e.name}`),l.dataset.skillId=e.key,l.disabled=!!y||s,l.append(p("span","sk-thumb")),l.addEventListener("click",()=>{l.disabled||wo(e,!c)}),c?o.textContent=s?a("Directory cannot be read"):e.advertised?a("Eligible for advertisement (estimate)"):a("Not advertised (estimate)"):o.textContent=a(s?"Directory cannot be read":"Entry disabled"),n.append(l),Co(n,e),t.append(o,n),t},Ps=e=>{let t=p("article","sk-skill");t.dataset.state=e.state,t.setAttribute("role","listitem");let o=p("div","sk-skill-main"),n=p("div","sk-skill-head");if(n.append(p("strong","sk-name",e.name),Ze(Rs(e),Os(e)),Ze(e.scope==="project"?a("Project"):a("Global"),e.scope==="project"?"info":"neutral")),e.duplicateResolution){let m=e.duplicateResolution.status;n.append(Ze(a(m==="highest-scanned"?"Highest scanned precedence":m==="shadowed"?"Shadowed in scanned sources":"Duplicate: uncertain"),"warning"))}let s=p("div","sk-meta");if(s.append(p("code","sk-id",e.id)),e.rootPath){let m=p("span","sk-source",e.sourceId==="opencode-global"?a("OpenCode"):e.sourceId==="opencode-project"?a("Project OpenCode"):e.sourceId.replace(/-/g," "));m.title=e.rootPath,s.append(m)}e.estimatedTokens>0&&s.append(p("span","sk-token",a("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString("en")})));let c=e.description,l=c||a("No description; the model will not select it automatically."),E=p("p","sk-desc",l),b=xt.has(e.key);if(b&&E.classList.add("is-expanded"),o.append(n,s,E),c.length>88||c.includes(`
`)){let m=p("button","sk-desc-toggle",a(b?"Show less":"Show more"));m.type="button",m.setAttribute("aria-expanded",b?"true":"false"),m.addEventListener("click",()=>{let O=!xt.has(e.key);O?xt.add(e.key):xt.delete(e.key),E.classList.toggle("is-expanded",O),m.textContent=a(O?"Show less":"Show more"),m.setAttribute("aria-expanded",O?"true":"false")}),o.append(m)}if(e.warnings.length>0){let m=p("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));o.append(m)}return t.append(o,Ns(e)),t},Ls=()=>{wt="",tt="all",ot="all",yt="default",xs.update({value:"",placeholder:a("Search name, description, or ID (press / to focus)")}),Rn(),yn.update({value:"all",options:An()}),In.update({value:"all",options:kn()}),vn.update({value:"default",options:xn()}),x()},Ds=()=>{Ye.replaceChildren();let e=h;if(!e)return;let t=Ie();if(t.length===0){let o=wt.trim().length>0||tt!=="all"||ot!=="all",n=p("div","sk-empty");if(n.append(p("h2","",e.skills.length===0?a("No skills found"):a("No matching skills")),p("p","",e.skills.length===0?a("Check that a skill directory such as {path} exists, or rescan.",{path:e.roots[0]?.path??a("the skills directory")}):a("Try another search term or change the filters."))),e.skills.length>0&&o){let s=p("div","sk-empty-actions");s.append(ne(a("Reset filters"),Ls)),n.append(s)}Ye.append(n);return}for(let o of t)Ye.append(Ps(o))},Gs=()=>{let e=h?h.roots.some(t=>t.error)?1:h.summary.blockingConflicts>0?h.summary.blockingConflicts:null:null;e!==cn&&(cn=e,de.setBadge(e).catch(()=>{}))},x=()=>{vt.setAttribute("aria-busy",le?"true":"false"),Gs(),Cs(),$o(),Is(),vs(),Ds(),ms.update({label:a(le?"Reading\u2026":"Rescan"),loading:le,disabled:le||!!y});let e=It();hs.update({disabled:le||!!y||!h||e}),gs.update({disabled:le||!!y||!h||e});let t=Ie(),o=Je(t);Rt.update({items:[{id:"invert",label:a("Invert visible skills"),disabled:le||!!y||!h||o.enable.length+o.disable.length===0},{id:"copy-ids",label:a("Copy visible IDs"),disabled:!h||t.length===0}]})},Hs=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},ve=async(e=!1,t=!1)=>{let o=++kt;le=!0,t||(Qe=null),e&&x();try{let n=Le(await Ce("GET","/skills"));if(o!==kt)return;h=n,Qe=null}catch(n){o===kt&&!t&&(Qe=be(n))}finally{o===kt&&(le=!1,x())}},wo=async(e,t)=>{if(!y){y=`toggle:${e.id}`,F=null,te=!1,v=null,x();try{h=Le(await Ce("POST","/skills/toggle",{id:e.key,enabled:t})),v={text:t?a("Enabled {name}.",{name:e.name}):a("Disabled {name}; OpenCode will no longer discover it after the next scan.",{name:e.name}),tone:"success"},de.toast({kind:"success",message:t?a("Enabled {name}",{name:e.name}):a("Disabled {name}",{name:e.name})}).catch(()=>{})}catch(o){v={text:be(o),tone:"error"},y=null,x(),ve(!1,!0);return}y=null,x(),Hs(e.id)}},pn=async(e,t)=>{if(y)return;let o=e.activePath??e.disabledPath;if(o){y=`resolve:${o}`,F=null,te=!1,v=null,x();try{let n=await Ce("POST","/skills/resolve",{path:o,keep:t}),s=n&&typeof n=="object"&&typeof n.backupPath=="string"?n.backupPath:null;h=Le(n),v={text:t==="enabled"?a("Kept the enabled entry{suffix}.",{suffix:s?a("; the old disabled file was backed up to {path}",{path:s}):""}):a("Kept the disabled entry{suffix}.",{suffix:s?a("; the old disabled file was backed up to {path}",{path:s}):""}),tone:"success"},de.toast({kind:"success",message:a("Entry conflict resolved")}).catch(()=>{})}catch(n){v={text:be(n),tone:"error"},y=null,x(),ve(!1,!0);return}y=null,x()}},Cn=e=>{!h||y||(F=e,te=!1,se=null,v=null,x(),z.scrollIntoView({block:"nearest"}),z.querySelector("button")?.focus())},Vs=async()=>{if(F===null||y)return;let e=F;F=null,te=!1,y="bulk",v=null,x();try{let t=h?.skills.flatMap(s=>e?s.disabledPaths:s.activePaths)??[],o=await Ce("POST","/skills/bulk",{enabled:e,expectedPaths:t}),n=o&&typeof o=="object"&&Array.isArray(o.changed)?o.changed.filter(s=>typeof s=="string"):[];h=Le(o),v={text:e?a("Skills enabled: {count}.",{count:n.length}):a("Skills disabled: {count}.",{count:n.length}),tone:"success",...o&&typeof o=="object"&&o.undoAvailable?{actions:[{label:a("Undo last action"),onClick:()=>void Fo()}]}:{}},de.toast({kind:"success",message:e?a("Skills enabled: {count}.",{count:n.length}):a("Skills disabled: {count}.",{count:n.length})}).catch(()=>{})}catch(t){v={text:be(t),tone:"error"},y=null,x(),ve(!1,!0);return}y=null,x()},Xs=e=>{!h||y||(se=e,F=null,te=!1,v=null,x(),z.scrollIntoView({block:"nearest"}),z.querySelector("button")?.focus())},$s=async()=>{if(!h||y||se===null)return;let e=se,t=h.skills.filter(o=>o.sourceId===e&&o.activePaths.length>0);if(se=null,t.length===0){x();return}y="bulk",v=null,x();try{let o=t.flatMap(c=>c.activePaths),n=await Ce("POST","/skills/bulk",{enabled:!1,sourceId:e,expectedPaths:o});h=Le(n);let s=n&&typeof n=="object"&&Array.isArray(n.changed)?n.changed.filter(c=>typeof c=="string"):t.map(c=>c.key);v={text:a("Skills disabled in {source}: {count}.",{source:h.roots.find(c=>c.sourceId===e)?.label??e,count:s.length}),tone:"success",...n&&typeof n=="object"&&n.undoAvailable?{actions:[{label:a("Undo last action"),onClick:()=>void Fo()}]}:{}}}catch(o){v={text:be(o),tone:"error"},y=null,x(),ve(!1,!0);return}y=null,x()},wn=e=>{let t=typeof e=="string"&&e?e:null;if(ln){t!==Ke?(Ke=t,h=null,F=null,te=!1,se=null,ve(!0)):x();return}ln=!0,Ke=t,ve(!0)};de.onReady(e=>{Eo(e,document.documentElement),document.documentElement.lang="en",document.title=a("Skills Manager"),wn(e.directory)});de.onDirectory(e=>wn(e));document.title=a("Skills Manager");x();})();
