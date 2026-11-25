"use strict";(()=>{var k="openchamber.sdk";var rt="data-oc-scrolling",wt=`
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
:hover, [${rt}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${rt}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${rt}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${rt}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Ut(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",s=>{let n=s.target===e?t:s.target;if(!(n instanceof Element))return;n.hasAttribute("data-oc-scrolling")||n.setAttribute("data-oc-scrolling","");let c=o.get(n);c!==void 0&&clearTimeout(c),o.set(n,setTimeout(()=>{o.delete(n),n.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Cn=`(${Ut.toString()})(document);`;var Jo=e=>{let t=[],o=0,s=0;return{push:n=>{for(t.push(n),s+=n.length;s-o>e&&t.length>1;){let c=t.shift();s-=c?.length??0,o=0}},pull:n=>{let c=0;for(;c<n.length&&t.length>0;){let l=t[0],E=Math.min(n.length-c,l.length-o);n.set(l.subarray(o,o+E),c),c+=E,o+=E,o>=l.length&&(t.shift(),s-=l.length,o=0)}n.fill(0,c)},clear:()=>{t.length=0,o=0,s=0},get size(){return s-o}}};var er=/^[a-z][a-z0-9-]{0,39}$/;var Yo=e=>Object(e)===e&&!Array.isArray(e),Nt=(e,t)=>Object.keys(e).every(o=>t.includes(o)),Qo=e=>String(e)===e&&e.length>=1&&e.length<=60,Zo=e=>String(e)===e&&e.length>=1&&e.length<=80,tr=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!Yo(o)||!er.test(o.id)||!Qo(o.label)||o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1||t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Nt(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Nt(o,["kind","id","label","value","options","disabled"])||!Zo(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let s=new Set;for(let n of o.options){if(!Yo(n)||!Nt(n,["value","label"])||!Zo(n.value)||!Qo(n.label)||s.has(n.value))return!1;s.add(n.value)}if(!s.has(o.value))return!1}return!0};var wn=1024*1024;var or=["{id}","{segment}","{segments+}"];var js=new Set(or);var rr=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var qs=new Set(rr);var Lt=e=>"bytes"in e?e.bytes.byteLength:e.content.length,nr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var sr=/^[A-Za-z0-9_-]{1,80}$/;var ir=["left","right","top","bottom"];var ar=(e,t=0,o={remaining:16e3})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let n of s)if(!ar(n,t+1,o))return!1;return!0},Pt=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Pt);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Pt)}return String(e)===e||Number.isFinite(e)},Dt=e=>{try{return String(e.id)!==e.id||!sr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ir.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ar(e.data)||!Pt(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ht=2e3;var lr=["file","directory","other","missing"],Vt=e=>!!(e&&"sessionId"in e),Xt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var dr=/^[0-9a-f]{7,64}$/i,$t=e=>dr.test(e),nt=500,st=32e3,pr=16e3,ur=128,Er=200,_r=2e3,fr=16e3,Sr=80,Tr=200,mr=16e3;var hr=2e3;var Ft=2e4,it=1024,at=2e6;var ct=64e3,lt=8e3,Bt=4e3;var Kt=96e4,Un=60*6e4;var gr=999,Ar=1e4,Ke=500,br=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],kr=["stopped","starting","ready","failed"],Nn=new Set(br),Or=e=>Nn.has(e),xr=e=>e&&Or(e)?e:"HOST_REJECTED",Le=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Le):Object(e)===e?Object.values(e).every(Le):!1,Rr=e=>Le(e)&&JSON.stringify(e).length<=mr,cr=e=>e?.trim().slice(0,Tr)??"",Pe=e=>{let t=e.id.trim().slice(0,ur),o=e.title.trim().slice(0,Er),s=e.url.trim().slice(0,_r),n=e.text?.trim().slice(0,fr),c=e.author?.trim().slice(0,Sr),l=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:t,title:o||t,url:s,kind:l};if(n&&(E.text=n),c&&(E.author=c),l==="pull"){let A=cr(e.branches?.head),m=cr(e.branches?.base);A&&m&&(E.branches={head:A,base:m})}return Rr(e.data)&&(E.data=e.data),E},Wt=e=>{let t=Pe(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},jt=e=>{let t={text:e.text.trim().slice(0,pr)};return e.send&&(t.send=!0),t},zt=e=>e===null||!Number.isFinite(e)?null:Math.min(gr,Math.max(0,Math.round(e))),qt=e=>Number.isFinite(e)?Math.min(Ar,Math.max(0,Math.ceil(e))):0;var De=e=>e.length>0&&e.length<=it&&!e.includes("\0")&&!e.includes("\\");var dt=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>hr?!1:!e.split("/").some(o=>o==="."||o===".."),Ln=new Set(kr),Jt=e=>!!(e&&"status"in e&&Ln.has(String(e.status))&&!("body"in e)),pt=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Yt=e=>!!(e&&"content"in e&&String(e.content)===e.content),Qt=e=>!!(e&&"written"in e&&e.written===!0),Zt=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Pn=new Set(lr),eo=e=>!!(e&&"kind"in e&&"size"in e&&Pn.has(String(e.kind))&&Number.isFinite(e.size)),to=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Dn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),Gn=e=>Object(e)===e?e:null,Gt=e=>String(e)===e&&e.length>0,Hn=e=>{if(!Gt(e.id))return null;if(e.ok===!0){let t={channel:k,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Gt(e.error)?{channel:k,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:xr(Gt(e.code)?e.code:void 0)}:null},oo=e=>{let t=Gn(e);return!t||t.channel!==k||t.v!==1?null:t.type==="result"?Hn(t):!Dn.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var yr=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Vn=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",T=class extends Error{code;constructor(t,o){super(o),this.name="HostRequestError",this.code=t}},Ir=()=>Promise.reject(new T("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),ut=()=>Promise.reject(new T("BAD_PATH",`File path must be 1 to ${it} characters without NUL or backslash.`)),Et=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new T("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},h=e=>(e.value+=1,`oc-${e.value}`),ao=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new T("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??(r=>r===t.parent),s=e.requestTimeoutMs??Ft,n=new Set,c=new Set,l=new Set,E=new Set,A=new Set,m=new Set,x=new Set,J=new Set,K=new Set,X=new Set,$=new Set,ee=new Set,le=[],b=null,W=null,ne=new Set,Re=new Set,he=null,ge=null,Ue=!1,de=new Map,pe=new Map,ue=new Map,j=!1,u={value:0},_=null,Ee=null,Fe=!1,Be=!1,Go=null,Y=null,Ho=r=>r?{sessionId:r.id,phase:r.busy?"started":"completed"}:null,z=r=>{t.parent.postMessage(r,"*")},Vo=()=>{j||t.parent===t||ee.size===0||_?.features?.lateGenerateResults!==!0||z({channel:k,v:1,type:"generate-late-listen"})},M=(r,i)=>{for(let S of r)try{S(i)}catch(f){console.error(f)}},Xo=r=>{if(!(r instanceof MessageEvent)||!o(r.source))return;let i=oo(r.data);if(!i)return;if(i.type==="workspace"){let f=pe.get(i.payload.subscriptionId);f&&M([f],i.payload.snapshot);return}if(i.type==="shells"){let f=ue.get(i.payload.subscriptionId);f&&M([f],i.payload.snapshot);return}if(i.type==="microphone-audio"){Y?.queue.push(i.payload.samples);return}if(i.type==="microphone-ended"){let f=Y;if(!f)return;Y=null,f.release(),M(f.endedListeners,i.payload.reason);return}if(i.type==="ready"){_=i.payload,Ee=Ho(i.payload.session),M(n,i.payload),M(c,i.payload.directory),M(l,i.payload.session),Ee&&M(E,Ee),M(A,i.payload.connection),M(m,i.payload.settings),M(x,i.payload.item),i.payload.block&&M(J,i.payload.block),Vo();return}if(i.type==="service-event"){M(K,i.payload);return}if(i.type==="generate-late"){ee.size===0?le.push(i.payload):M(ee,i.payload);return}if(i.type==="directory"){_&&(_={..._,directory:i.payload.directory}),M(c,i.payload.directory);return}if(i.type==="session"){_&&(_={..._,session:i.payload.session}),i.payload.session?Ee?.sessionId!==i.payload.session.id&&(Ee=Ho(i.payload.session)):Ee=null,M(l,i.payload.session);return}if(i.type==="session-lifecycle"){Ee=i.payload,M(E,i.payload);return}if(i.type==="connection"){_&&(_={..._,connection:i.payload.connection}),M(A,i.payload.connection);return}if(i.type==="settings"){_&&(_={..._,settings:i.payload.settings}),M(m,i.payload.settings);return}if(i.type==="item"){_&&(_={..._,item:i.payload.item}),M(x,i.payload.item);return}if(i.type==="status-control-event"){M(X,i.payload);return}if(i.type==="popover-closed"){M($,i.payload);return}if(i.type==="action"){let f=v=>{j||z({channel:k,v:1,type:"action-result",id:i.id,payload:v})},I=W;if(!I){f({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>I(i.payload)).then(()=>f({ok:!0}),v=>{let w=(v instanceof Error?v.message:String(v)).trim();f({ok:!1,error:(w||"Action failed.").slice(0,Ke)})});return}if(i.type==="file-open"){let f=i.payload;if(ge&&nr(ge,f))return;ge=f,M(ne,i.payload);return}if(i.type==="file-saved"){M(Re,i.payload.version);return}if(i.type==="file-snapshot"){let f=w=>{j||z({channel:k,v:1,type:"file-snapshot-result",id:i.id,payload:w})},I=w=>f({error:(w.trim()||"Could not read the edited file.").slice(0,Ke)}),v=he;if(!v){I("This extension does not edit files.");return}Promise.resolve().then(()=>v(i.payload.purpose)).then(w=>{if(Lt(w)>2e7){I(`The file is over ${2e7} ${"bytes"in w?"bytes":"characters"}.`);return}if(w.version.length>256){I(`The snapshot version is over ${256} characters.`);return}f({snapshot:"bytes"in w?{bytes:w.bytes,version:w.version}:{content:w.content,version:w.version}})},w=>I(w instanceof Error?w.message:String(w)));return}if(i.type==="resolve"){let f=v=>{z({channel:k,v:1,type:"resolve-result",id:i.id,payload:v})},I=b;if(!I){f({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>I(i.payload)).then(v=>f({item:v?Pe(v):null}),v=>{let w=(v instanceof Error?v.message:String(v)).trim();f({error:(w||"Command failed.").slice(0,Ke)})});return}let S=de.get(i.id);if(S){if(clearTimeout(S.timer),de.delete(i.id),i.ok){S.resolve(i.payload);return}S.reject(new T(i.code,i.error))}};t.addEventListener("message",Xo),z({channel:k,v:1,type:"hello"});let F=(r,i=s)=>j||t.parent===t?Promise.reject(new T("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((S,f)=>{let I=setTimeout(()=>{de.delete(r.id),f(new T("HOST_TIMEOUT","Host did not answer in time."))},i);de.set(r.id,{resolve:S,reject:f,timer:I}),z(r)}),G=r=>F(r).then(()=>{}),L={channel:k,v:1},It=r=>{!j&&t.parent!==t&&z(r)},$o=()=>It({...L,type:"file-save"}),vt=()=>{!j&&t.parent!==t&&z({...L,type:"microphone-close",id:h(u)})},In=async()=>{if(Y)throw new T("HOST_REJECTED","The microphone is already open in this frame.");if(_?.features?.microphone!==!0)throw new T("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let r=globalThis.AudioContext;if(typeof r!="function")throw new T("UNSUPPORTED","This frame has no Web Audio.");let i=new r;if(i.sampleRate<8e3||i.sampleRate>192e3)throw i.close().catch(()=>{}),new T("UNSUPPORTED",`Audio at ${i.sampleRate} Hz is not supported.`);let S=i.state==="suspended"?i.resume().catch(()=>{}):void 0,f=Jo(Math.round(i.sampleRate/4)),I=i.createScriptProcessor(1024,1,1);I.onaudioprocess=te=>f.pull(te.outputBuffer.getChannelData(0));let v=i.createMediaStreamDestination();I.connect(v);let w=new Set,Ne={queue:f,endedListeners:w,release:()=>{I.onaudioprocess=null,I.disconnect(),f.clear();for(let te of v.stream.getTracks())te.stop();i.close().catch(()=>{})}};Y=Ne;try{let te=await F({...L,type:"microphone-open",id:h(u),payload:{sampleRate:i.sampleRate}},12e4);if(!te||!("opened"in te)||te.opened!==!0)throw new T("HOST_REJECTED","Host did not open the microphone.");if(await S,Y!==Ne)throw new T("DISCONNECTED","The microphone closed while it was opening.")}catch(te){throw Y===Ne&&(Y=null),Ne.release(),vt(),te}return{stream:v.stream,close:()=>{Y===Ne&&(Y=null,Ne.release(),vt())},onEnded:te=>(w.add(te),()=>{w.delete(te)})}},Fo=r=>{!yr(r)||!Vn(r)||(r.preventDefault(),$o())},Bo=r=>{!yr(r)||r.key!=="Escape"||_?.surface!=="popover"||!_.popover||(r.preventDefault(),zo(_.popover.id,"escape").catch(()=>{}))},et=()=>{let r=_?.surface==="popover"?_.popover:void 0;if(!r)return;let i=Fe||Be;Go!==i&&(Go=i,qo(r.id,i).catch(()=>{}))},tt=()=>{_?.surface!=="popover"||Fe||(Fe=!0,et())},Ko=r=>{_?.surface!=="popover"||r.relatedTarget!==null||!Fe||(Fe=!1,et())},Wo=()=>{_?.surface!=="popover"||Be||(Be=!0,et())},jo=()=>{_?.surface!=="popover"||!Be||(Be=!1,et())},se=(r,i=1024)=>{if(!r.trim()||r.length>i)throw new T("HOST_REJECTED",`Identity must contain 1 to ${i} characters.`)},Ct=async r=>{r.kind!=="projects"&&se(r.projectId);let i=await F({...L,type:"workspace-read",id:h(u),payload:r});if(!i||!("kind"in i)||!("state"in i)||i.kind!==r.kind)throw new T("HOST_REJECTED","Host did not return workspace data.");return i},Mt=async(r,i)=>{r.kind!=="projects"&&se(r.projectId);let S=h(u);pe.set(S,i);try{await G({...L,type:"workspace-subscribe",id:h(u),payload:{subscriptionId:S,query:r}})}catch(f){throw pe.delete(S),j||z({...L,type:"workspace-unsubscribe",id:h(u),payload:{subscriptionId:S}}),f}return()=>{!pe.delete(S)||j||z({...L,type:"workspace-unsubscribe",id:h(u),payload:{subscriptionId:S}})}},vn=async(r,i)=>{r.kind==="session"&&se(r.sessionId),r.kind==="project"&&se(r.projectId);let S=h(u);ue.set(S,i);try{await G({...L,type:"shells-subscribe",id:h(u),payload:{subscriptionId:S,scope:r}})}catch(f){throw ue.delete(S),j||z({...L,type:"shells-unsubscribe",id:h(u),payload:{subscriptionId:S}}),f}return()=>{!ue.delete(S)||j||z({...L,type:"shells-unsubscribe",id:h(u),payload:{subscriptionId:S}})}},ot=async r=>{if("key"in r&&(r.key.length===0||r.key.length>128))throw new T("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Le(r.value))throw new T("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>65536)throw new T("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&_?.features?.deviceStorage!==!0)throw new T("UNSUPPORTED","This host does not support device storage.");let i=await F({...L,type:"storage",id:h(u),payload:r});if(!i||!("storage"in i)||i.op!==r.op)throw new T("HOST_REJECTED","Host did not return storage data.");return i},zo=(r,i)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===r)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):G({...L,type:"popover-close",id:h(u),payload:i?{id:r,reason:i}:{id:r}}),qo=(r,i)=>_?.features?.popovers!==!0&&!(_?.surface==="popover"&&_.popover?.id===r)?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):G({...L,type:"popover-anchor",id:h(u),payload:{id:r,active:i}});return t.addEventListener("keydown",Bo,!0),t.addEventListener("pointerover",tt),t.addEventListener("pointermove",tt),t.addEventListener("pointerout",Ko),t.addEventListener("focus",Wo),t.addEventListener("blur",jo),{onAction:r=>(W=r,()=>{W===r&&(W=null)}),listProjects:async()=>{let r=await Ct({kind:"projects"});if(r.kind!=="projects")throw new T("HOST_REJECTED","Expected projects.");return r},listWorktrees:async r=>{let i=await Ct({kind:"worktrees",projectId:r});if(i.kind!=="worktrees")throw new T("HOST_REJECTED","Expected worktrees.");return i},listSessions:async r=>{let i=await Ct({kind:"sessions",projectId:r});if(i.kind!=="sessions")throw new T("HOST_REJECTED","Expected sessions.");return i},onProjects:r=>Mt({kind:"projects"},i=>{i.kind==="projects"&&r(i)}),onWorktrees:(r,i)=>Mt({kind:"worktrees",projectId:r},S=>{S.kind==="worktrees"&&i(S)}),onSessions:(r,i)=>Mt({kind:"sessions",projectId:r},S=>{S.kind==="sessions"&&i(S)}),onRunningShells:(r,i)=>vn(r,i),readShellOutput:async(r,i)=>{se(r,128);let S=i?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new T("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let f=i?.tailBytes;if(f!==void 0&&(!Number.isInteger(f)||f<1||f>65536))throw new T("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let v=await F({...L,type:"shell-output",id:h(u),payload:{shellId:r,cursor:S,tailBytes:f}});if(!v||typeof v.output!="string"||!Number.isFinite(v.cursor))throw new T("HOST_REJECTED","Host did not return shell output.");return v},stopShell:async r=>{if(se(r,128),(await F({...L,type:"shell-stop",id:h(u),payload:{shellId:r}}))?.stopped!==!0)throw new T("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async r=>{se(r),await G({...L,type:"open-session",id:h(u),payload:{sessionId:r}})},storage:{get:async(r,i)=>{let S=Et(i),f={op:"get",key:r};S&&(f.scope=S);let I=await ot(f);return I.op==="get"&&I.found?I.value:void 0},set:async(r,i,S)=>{let f=Et(S),I={op:"set",key:r,value:i};f&&(I.scope=f),await ot(I)},delete:async(r,i)=>{let S=Et(i),f={op:"delete",key:r};S&&(f.scope=S),await ot(f)},keys:async r=>{let i=Et(r),S={op:"keys"};i&&(S.scope=i);let f=await ot(S);if(f.op!=="keys")throw new T("HOST_REJECTED","Expected storage keys.");return f.keys}},onReady:r=>(n.add(r),_&&r(_),()=>{n.delete(r)}),onDirectory:r=>(c.add(r),_&&r(_.directory),()=>{c.delete(r)}),onSession:r=>(l.add(r),_&&r(_.session),()=>{l.delete(r)}),onSessionLifecycle:r=>(E.add(r),Ee&&r(Ee),()=>{E.delete(r)}),onConnection:r=>(A.add(r),_&&r(_.connection),()=>{A.delete(r)}),onSettings:r=>(m.add(r),_&&r(_.settings),()=>{m.delete(r)}),onItem:r=>(x.add(r),_&&r(_.item),()=>{x.delete(r)}),onBlock:r=>(J.add(r),_?.block&&r(_.block),()=>{J.delete(r)}),onServiceEvent:r=>(K.add(r),()=>{K.delete(r)}),onStatusControl:r=>(X.add(r),()=>{X.delete(r)}),onPopoverClosed:r=>($.add(r),()=>{$.delete(r)}),setStatusControls:r=>_?.features?.statusControls!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support status controls.")):tr(r)?G({...L,type:"status-controls",id:h(u),payload:{controls:r}}):Promise.reject(new T("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:r=>_?.features?.popovers!==!0?Promise.reject(new T("UNSUPPORTED","This host does not support popovers.")):Dt(r)?G({...L,type:"popover-open",id:h(u),payload:r}):Promise.reject(new T("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:zo,setPopoverAnchorActive:qo,onResolve:r=>(b=r,()=>{b===r&&(b=null)}),toast:r=>{let i=r.message.trim();return!i||i.length>nt?Promise.reject(new T("HOST_REJECTED",`Toast message must contain 1 to ${nt} characters.`)):r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>st)?Promise.reject(new T("HOST_REJECTED",`Toast copy text must contain 1 to ${st} characters.`)):G({channel:k,v:1,type:"toast",id:h(u),payload:{...r,message:i}})},openUrl:r=>G({channel:k,v:1,type:"open-url",id:h(u),payload:{url:r}}),openCommit:r=>$t(r)?G({channel:k,v:1,type:"open-commit",id:h(u),payload:{sha:r}}):Promise.reject(new T("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:r=>G({channel:k,v:1,type:"block-answer",id:h(u),payload:{text:r.trim().slice(0,Ht)}}),openSurface:r=>G({channel:k,v:1,type:"open-surface",id:h(u),payload:{surfaceId:r}}),writeClipboard:r=>G({channel:k,v:1,type:"clipboard-write",id:h(u),payload:{text:r}}),compose:r=>G({channel:k,v:1,type:"compose",id:h(u),payload:r}),attach:r=>G({channel:k,v:1,type:"attach",id:h(u),payload:Pe(r)}),startSession:async r=>{r.projectId!==void 0&&se(r.projectId);let i=r.worktree;i&&i!==!0&&(i.kind==="existing"?se(i.directory):(i.name!==void 0&&se(i.name,200),i.baseBranch!==void 0&&se(i.baseBranch,200)));let S=await F({channel:k,v:1,type:"start-session",id:h(u),payload:Wt(r)},e.requestTimeoutMs??18e4);if(!Vt(S))throw new T("HOST_REJECTED","Host did not return a session.");return S},prompt:r=>F({channel:k,v:1,type:"prompt",id:h(u),payload:jt(r)}).then(i=>{if(!Xt(i))throw new T("HOST_REJECTED","Host did not return a prompt result.");return i}),sessionLink:r=>G({channel:k,v:1,type:"session-link",id:h(u),payload:Pe(r)}),close:()=>G({channel:k,v:1,type:"close",id:h(u)}),oauthStart:()=>G({channel:k,v:1,type:"oauth-start",id:h(u)}),oauthDisconnect:()=>G({channel:k,v:1,type:"oauth-disconnect",id:h(u)}),request:r=>(dt(r.path)?F({channel:k,v:1,type:"request",id:h(u),payload:r}):Ir()).then(i=>{if(!pt(i))throw new T("HOST_REJECTED","Host request result was empty.");return i}),serviceRequest:r=>(dt(r.path)?F({channel:k,v:1,type:"service-request",id:h(u),payload:r}):Ir()).then(i=>{if(!pt(i))throw new T("HOST_REJECTED","Host service request result was empty.");return i}),serviceStatus:()=>F({channel:k,v:1,type:"service-status",id:h(u)}).then(r=>{if(!Jt(r))throw new T("HOST_REJECTED","Host did not return service status.");return r}),readFile:r=>(De(r)?F({channel:k,v:1,type:"file-read",id:h(u),payload:{path:r}}):ut()).then(i=>{if(!Yt(i))throw new T("HOST_REJECTED","Host did not return file content.");return i}),writeFile:(r,i)=>De(r)?i.length>at?Promise.reject(new T("FILE_TOO_LARGE",`Content is over ${at} characters.`)):F({channel:k,v:1,type:"file-write",id:h(u),payload:{path:r,content:i}}).then(S=>{if(!Qt(S))throw new T("HOST_REJECTED","Host did not confirm the write.");return S}):ut(),listDir:r=>(De(r)?F({channel:k,v:1,type:"file-list",id:h(u),payload:{path:r}}):ut()).then(i=>{if(!Zt(i))throw new T("HOST_REJECTED","Host did not return directory entries.");return i}),stat:r=>(De(r)?F({channel:k,v:1,type:"file-stat",id:h(u),payload:{path:r}}):ut()).then(i=>{if(!eo(i))throw new T("HOST_REJECTED","Host did not return file status.");return i}),generate:r=>{let i=r.prompt.trim(),S=r.system?.trim();if(i.length===0||i.length>ct)return Promise.reject(new T("HOST_REJECTED",`Prompt must be 1 to ${ct} characters.`));if(S!==void 0&&(S.length===0||S.length>lt))return Promise.reject(new T("HOST_REJECTED",`System prompt must be 1 to ${lt} characters.`));let f=r.maxOutputTokens===void 0?void 0:Math.min(Bt,Math.max(1,Math.floor(r.maxOutputTokens)));if(f!==void 0&&!Number.isFinite(f))return Promise.reject(new T("HOST_REJECTED","maxOutputTokens must be a number."));let I={prompt:i};return S!==void 0&&(I.system=S),f!==void 0&&(I.maxOutputTokens=f),F({channel:k,v:1,type:"generate",id:h(u),payload:I},e.requestTimeoutMs??Kt).then(v=>{if(!to(v))throw new T("HOST_REJECTED","Host did not return generated text.");return v})},onLateGenerateResult:r=>{ee.add(r);for(let i of le.splice(0))M([r],i);return Vo(),()=>{ee.delete(r)}},openMicrophone:In,setBadge:r=>G({channel:k,v:1,type:"badge",id:h(u),payload:{count:zt(r)}}),setHeight:r=>G({channel:k,v:1,type:"resize",id:h(u),payload:{height:qt(r)}}),onFileOpen:r=>(ne.add(r),Ue||(Ue=!0,t.addEventListener("keydown",Fo,!0)),ge&&r(ge),()=>{ne.delete(r)}),onFileSnapshot:r=>(he=r,()=>{he===r&&(he=null)}),onFileSaved:r=>(Re.add(r),()=>{Re.delete(r)}),reportFileChange:r=>It({...L,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:$o,reportFileUnsupported:()=>It({...L,type:"file-unsupported"}),dispose:()=>{for(let r of pe.keys())z({...L,type:"workspace-unsubscribe",id:h(u),payload:{subscriptionId:r}});pe.clear();for(let r of ue.keys())z({...L,type:"shells-unsubscribe",id:h(u),payload:{subscriptionId:r}});ue.clear(),Y&&(vt(),Y.release(),Y=null),j=!0,b=null,W=null,he=null,ne.clear(),Re.clear(),Ue&&t.removeEventListener("keydown",Fo,!0),t.removeEventListener("message",Xo),t.removeEventListener("keydown",Bo,!0),t.removeEventListener("pointerover",tt),t.removeEventListener("pointermove",tt),t.removeEventListener("pointerout",Ko),t.removeEventListener("focus",Wo),t.removeEventListener("blur",jo);for(let r of de.values())clearTimeout(r.timer),r.reject(new T("HOST_UNAVAILABLE","Host client was disposed."));de.clear(),n.clear(),c.clear(),l.clear(),E.clear(),A.clear(),m.clear(),x.clear(),J.clear(),K.clear(),X.clear(),$.clear(),ee.clear(),le.length=0}}};var Nr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ui=new Set(Nr);var Xn=10*6e4;var $n=10*6e4;var Fn=10*6e4;var Bn=10*6e4;var Lr=["none","agent","user"];var _i=new Set(Lr);var Kn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Wn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Pr=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,s]of Kn)t.style.setProperty(o,e.tokens[s]);for(let[o,s,n]of Wn){let c=e.tokens[n]??"";t.style.setProperty(o,c),t.style.setProperty(s,c)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},co=(e,t)=>{Pr(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var jn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},U=(e,t)=>`var(--${e}, var(--oc-${jn[e]}, ${t}))`,fe=U("surface-background","transparent"),ft=U("surface-elevated","transparent"),Ge=U("surface-elevated-foreground","inherit"),Q=U("surface-foreground","inherit"),P=U("surface-muted-foreground","gray"),zn=U("surface-muted","transparent"),ye=U("interactive-border","currentColor"),q=U("interactive-hover","transparent"),Ie=U("interactive-active","transparent"),lo=U("interactive-selection","transparent"),po=U("interactive-selection-foreground","inherit"),_e=U("primary","currentColor"),uo=U("primary-text","inherit"),Eo=U("error-text","inherit"),qn=U("font-sans","inherit"),_o=U("font-mono","monospace"),Vr=U("radius","9px"),fo=`calc(${Vr} - 2px)`,Dr=`calc(${Vr} - 4px)`,D=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,Gr=`background-image: linear-gradient(${q}, ${q});`,So=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,To="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Hr="box-shadow: var(--oc-sdk-lit);",mo=`inset 0 0.5px 0 0 ${D(Q,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Jn=`
:root {
  --oc-sdk-edge: ${D(Q,16)};
  --oc-sdk-field-bg: ${ft};
  --oc-sdk-raised-bg: ${fe};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${D(Q,14)};
  --oc-sdk-field-bg: ${D(fe,50,ft)};
  --oc-sdk-raised-bg: ${ft};
  --oc-sdk-field-lift: ${mo};
  --oc-sdk-raised-lift: ${mo};
  --oc-sdk-lit: ${mo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,_t=e=>{let t=U(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${U(`${e}-text`,"inherit")}; }`},d=e=>`calc(${e}rem / 14)`,Yn=`
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
`,Xr=`${Jn}
.oc-sdk { color: ${Q}; font-family: ${qn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Gr} }
.oc-sdk-mono { font-family: ${_o}; }
.oc-sdk-muted { color: ${P}; }
${_t("success")}${_t("warning")}${_t("error")}${_t("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${_e}; --oc-sdk-tone-text: ${uo}; }

.oc-sdk-btn { border-radius: ${fo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Dr}; }
.oc-sdk-btn[data-variant="default"] { color: ${uo}; background: ${D(_e,10,fe)}; border-color: ${D(_e,12)}; ${Hr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${D(_e,16,fe)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${D(_e,22,fe)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${zn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ie}, ${Ie}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ge}; ${To} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ie}, ${Ie}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${q}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ie}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${U("status-error","red")}; color: ${Eo}; background: ${D("var(--oc-sdk-tone)",7,fe)}; border-color: ${D("var(--oc-sdk-tone)",12)}; ${Hr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${D("var(--oc-sdk-tone)",9,fe)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${D("var(--oc-sdk-tone)",11,fe)}; box-shadow: none; }

.oc-sdk-field-note { color: ${P}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Eo}; }
.oc-sdk-input { border-radius: ${fo}; background: var(--oc-sdk-field-bg); color: ${Ge}; ${So("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${P}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${So(D(Q,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${So(U("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${_o}; }

.oc-sdk-search-icon { color: ${P}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${_e}; }
.oc-sdk-search-clear { border-radius: ${Dr}; color: ${P}; }
.oc-sdk-search-clear:hover { background: ${q}; color: ${Q}; }

.oc-sdk-trigger { border-radius: ${fo}; background: var(--oc-sdk-raised-bg); color: ${Ge}; ${To} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${q}, ${q}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ie}, ${Ie}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${P}; }
.oc-sdk-trigger-chevron { color: ${P}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ge}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ft}; background-clip: padding-box; color: ${Ge}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${q}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${lo}; color: ${po}; }
.oc-sdk-option-check { color: ${Q}; }
.oc-sdk-option[data-destructive="true"] { color: ${Eo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${D(U("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${P}; }
.oc-sdk-popup-empty { color: ${P}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ye}; border-radius: 4px; color: ${Q}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${D(Q,60,ye)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ye}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${fe}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${_e}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Gr} }
.oc-sdk-check-desc { color: ${P}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${D(Q,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${P}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Q}; }
.oc-sdk-tab[aria-selected="true"] { color: ${po}; background: ${lo}; border-color: ${ye}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ge}; background: var(--oc-sdk-raised-bg); ${To} }
.oc-sdk-tab-count { color: ${P}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${D(Q,6)}; color: ${P}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${D("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${q}; }
.oc-sdk-row[aria-selected="true"] { background: ${lo}; color: ${po}; }
.oc-sdk-row-lead { font-family: ${_o}; color: ${P}; }
.oc-sdk-row-sub { color: ${P}; }
.oc-sdk-row-meta { color: ${P}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${P}; }

.oc-sdk-empty-body { color: ${P}; }

.oc-sdk-spinner { color: ${P}; }
.oc-sdk-spinner-ring { border-color: ${ye}; border-top-color: ${_e}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${D("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${P}; }

.oc-sdk-separator { color: ${P}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${D(ye,40)}; }

.oc-sdk-progress-label { color: ${P}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${D(Q,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${_e}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${U("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${U("success-text","inherit")}; }

.oc-sdk-text a { color: ${uo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${D(ye,60)}; }
`,H=`
${wt}
${Yn}
${Xr}`;var $r="oc-sdk-ui-style",ve=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},V=e=>{let t=document.getElementById($r);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Ut(document);let o=document.createElement("style");o.id=$r,o.textContent=e,document.head.appendChild(o)},R=(e,t)=>{let o=document.createElement(e);return t&&(o.className=t),o},ie=e=>{let t=R("button",e);return t.type="button",t},Z=(e,t)=>{let o=t??"";e.textContent!==o&&(e.textContent=o)},Ae=(e,t,o)=>{o==null||o===""?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)},Fr=(e,t)=>{let o=s=>{s.target instanceof Node&&e.contains(s.target)||t()};return document.addEventListener("pointerdown",o,!0),()=>{document.removeEventListener("pointerdown",o,!0)}};var Qn=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Se=(e,t)=>{V(H);let o=t,s=ie("oc-sdk oc-sdk-btn"),n=Qn(),c=document.createElement("span");s.append(c),e.append(s);let l=()=>{s.dataset.variant=o.variant??"default",s.dataset.size=o.size??"default",s.disabled=!!o.disabled||!!o.loading,s.dataset.loading=o.loading?"true":"false",s.setAttribute("aria-busy",o.loading?"true":"false"),o.loading&&n.parentNode!==s?s.prepend(n):!o.loading&&n.parentNode===s&&n.remove(),Z(c,o.label)},E=()=>{o.disabled||o.loading||o.onClick()};return s.addEventListener("click",E),l(),{update:A=>{o={...o,...A},l()},dispose:()=>{s.removeEventListener("click",E),s.remove()}}};var Br="http://www.w3.org/2000/svg",Zn={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Te=(e,t,o)=>{let s=document.createElementNS(Br,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("width",String(t)),s.setAttribute("height",String(t)),s.style.width=d(t),s.style.height=d(t),s.setAttribute("aria-hidden","true"),s.setAttribute("fill","currentColor"),o&&s.setAttribute("class",o);let n=document.createElementNS(Br,"path");return n.setAttribute("d",Zn[e]),s.append(n),s};var ho=(e,t)=>{V(H);let o=t,s=R("div","oc-sdk oc-sdk-search"),n=R("input","oc-sdk-input");n.type="text",n.spellcheck=!1,n.autocomplete="off",n.setAttribute("role","searchbox");let c=ie("oc-sdk-search-clear");c.append(Te("close",14)),c.tabIndex=-1,s.append(Te("search",16,"oc-sdk-search-icon"),n,c),e.append(s);let l=()=>{let x=o.placeholder??"Search";Ae(n,"placeholder",x),n.setAttribute("aria-label",o.label??x),c.setAttribute("aria-label","Clear search"),n.value!==o.value&&(n.value=o.value),s.dataset.active=o.value.trim()===""?"false":"true"},E=()=>{o.value!==""&&o.onChange(""),n.focus()},A=()=>{o.onChange(n.value)},m=x=>{x.key==="Escape"&&n.value!==""&&(x.preventDefault(),E())};return n.addEventListener("input",A),n.addEventListener("keydown",m),c.addEventListener("click",E),l(),o.autofocus&&n.focus(),{update:x=>{o={...o,...x},l()},dispose:()=>{n.removeEventListener("input",A),n.removeEventListener("keydown",m),c.removeEventListener("click",E),s.remove()}}};var be=(e,t="vertical")=>{let[o,s]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===o||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===s||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},Ce=(e,t,o)=>{let s=e.filter(A=>!A.disabled);if(s.length===0)return null;let n=s[0],c=s[s.length-1];if(o==="first"||!n||!c)return n?.id??null;if(o==="last")return c.id;let l=s.findIndex(A=>A.id===t);return l===-1?o==="next"?n.id:c.id:s[Math.min(s.length-1,Math.max(0,l+(o==="next"?1:-1)))]?.id??null};var Kr=(e,t)=>`${e}-${t??""}`,St=(e,t,o,s)=>{let n=ie("oc-sdk-option");n.id=Kr(e,o.id),n.setAttribute("role",t),n.tabIndex=-1,n.disabled=!!o.disabled,t==="option"&&n.setAttribute("aria-selected",o.selected?"true":"false"),n.dataset.destructive=o.destructive?"true":"false";let c=R("span","oc-sdk-option-label");if(c.textContent=o.label,n.append(c),o.hint){let l=R("span","oc-sdk-option-hint");l.textContent=o.hint,n.append(l)}if(t==="option"){n.dataset.mark="check";let l=R("span","oc-sdk-option-check");l.append(Te("check",14)),n.append(l)}return n.addEventListener("pointerenter",s.hover),n.addEventListener("click",s.pick),n},Tt=(e,t,o,s)=>{let n=Kr(o,s);for(let c of Array.from(e.children))c instanceof HTMLElement&&c.classList.contains("oc-sdk-option")&&(c.dataset.active=c.id===n?"true":"false");Ae(t,"aria-activedescendant",s?n:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var es=(e,t)=>{let o=t.getBoundingClientRect();e.style.minWidth=`${Math.round(o.width)}px`,e.style.left=`${Math.round(o.left)}px`,e.style.top=`${Math.round(o.bottom+4)}px`;let s=e.offsetHeight,n=window.innerHeight-o.bottom-8;s>n&&o.top-8>n&&(e.style.top=`${Math.max(8,Math.round(o.top-4-s))}px`);let c=o.left+e.offsetWidth-window.innerWidth+8;c>0&&(e.style.left=`${Math.max(8,Math.round(o.left-c))}px`)},mt=(e,t,o,s)=>{e.append(o),es(o,t);let n=Fr(e,s),c=()=>{s()},l=E=>{E.target instanceof Node&&o.contains(E.target)||s()};return window.addEventListener("resize",c),window.addEventListener("scroll",l,!0),()=>{n(),window.removeEventListener("resize",c),window.removeEventListener("scroll",l,!0),o.remove()}};var Wr=(e,t)=>{let o=t.trim().toLowerCase();return o?e.filter(s=>s.label.toLowerCase().includes(o)||s.id.toLowerCase().includes(o)):[...e]},ts=0,We=(e,t)=>{V(H);let o=t,s=`oc-sdk-select-${ts+=1}`,n=R("div","oc-sdk oc-sdk-select"),c=R("span","oc-sdk-field-label");c.id=`${s}-label`;let l=ie("oc-sdk-trigger");l.setAttribute("aria-haspopup","listbox"),l.setAttribute("aria-labelledby",c.id);let E=R("span","oc-sdk-trigger-value");l.append(E,Te("chevron",14,"oc-sdk-trigger-chevron")),n.append(c,l),e.append(n);let A="",m=null,x=null,J=R("div","oc-sdk oc-sdk-popup"),K=R("div","oc-sdk-popup-search"),X=R("input","oc-sdk-input");X.type="text",X.autocomplete="off",K.append(X);let $=R("div");$.setAttribute("role","listbox"),$.tabIndex=-1,J.append($);let ee=()=>Wr(o.options,o.searchable?A:""),le=()=>o.searchable?X:$,b=u=>{m=u,Tt($,le(),s,u)},W=()=>{ve($);let u=ee();if(u.length===0){let _=R("div","oc-sdk-popup-empty");_.textContent="No matches",$.append(_)}for(let _ of u)$.append(St(s,"option",{..._,selected:_.id===o.value},{hover:()=>b(_.id),pick:()=>he(_.id)}));b(u.some(_=>_.id===m)?m:u[0]?.id??null)},ne=()=>{let u=x;x=null,u?.(),A="",X.value="",l.setAttribute("aria-expanded","false")},Re=()=>{x||o.disabled||(m=o.value,X.placeholder=o.searchPlaceholder??"Search",o.searchable?J.prepend(K):K.remove(),W(),x=mt(n,l,J,ne),l.setAttribute("aria-expanded","true"),le().focus())},he=u=>{ne(),l.focus(),u!==o.value&&o.onChange(u)},ge=()=>{x?ne():Re()},Ue=u=>{!x&&be(u)&&(u.preventDefault(),Re())},de=u=>{let _=be(u);_?(u.preventDefault(),b(Ce(ee(),m,_))):u.key==="Enter"?(u.preventDefault(),m&&he(m)):u.key==="Escape"?(u.preventDefault(),ne(),l.focus()):o.searchable&&u.target!==X&&u.key.length===1&&!u.ctrlKey&&!u.metaKey&&X.focus()},pe=()=>{A=X.value,W()},ue=u=>{x&&!(u.relatedTarget instanceof Node&&n.contains(u.relatedTarget))&&ne()},j=()=>{Z(c,o.label),c.hidden=!o.label;let u=o.options.find(_=>_.id===o.value);Z(E,u?.label??o.placeholder??"Select"),E.dataset.empty=u?"false":"true",l.disabled=!!o.disabled,x&&W()};return l.addEventListener("click",ge),l.addEventListener("keydown",Ue),J.addEventListener("keydown",de),X.addEventListener("input",pe),n.addEventListener("focusout",ue),j(),{update:u=>{o={...o,...u},j()},dispose:()=>{ne(),l.removeEventListener("click",ge),l.removeEventListener("keydown",Ue),J.removeEventListener("keydown",de),X.removeEventListener("input",pe),n.removeEventListener("focusout",ue),n.remove()}}};var jr=e=>e.filter(t=>!("separator"in t)),rs=0,ht=(e,t)=>{V(H);let o=t,s=`oc-sdk-menu-${rs+=1}`,n=R("div","oc-sdk oc-sdk-menu");e.append(n);let c=R("div","oc-sdk oc-sdk-popup");c.setAttribute("role","menu"),c.tabIndex=-1;let l=null,E=null,A=Se(n,{label:o.label,variant:o.variant,size:o.size,onClick:()=>{l?K():X()}}),m=n.querySelector("button");m?.setAttribute("aria-haspopup","menu");let x=b=>{E=b,Tt(c,c,s,b)},J=()=>{ve(c);for(let b of o.items){if("separator"in b){let W=R("div","oc-sdk-separator");W.dataset.labeled="false",c.append(W);continue}c.append(St(s,"menuitem",b,{hover:()=>x(b.id),pick:()=>$(b.id)}))}x(jr(o.items).some(b=>b.id===E)?E:null)},K=()=>{let b=l;l=null,b?.(),E=null,m?.setAttribute("aria-expanded","false")},X=()=>{l||!m||(J(),l=mt(n,m,c,K),m.setAttribute("aria-expanded","true"),c.focus())},$=b=>{K(),m?.focus(),o.onSelect(b)},ee=b=>{let W=be(b);W?(b.preventDefault(),x(Ce(jr(o.items),E,W))):b.key==="Enter"||b.key===" "?(b.preventDefault(),E&&$(E)):b.key==="Escape"&&(b.preventDefault(),K(),m?.focus())},le=b=>{l&&!(b.relatedTarget instanceof Node&&n.contains(b.relatedTarget))&&K()};return c.addEventListener("keydown",ee),n.addEventListener("focusout",le),{update:b=>{o={...o,...b},A.update({label:o.label,variant:o.variant,size:o.size}),l&&J()},dispose:()=>{K(),c.removeEventListener("keydown",ee),n.removeEventListener("focusout",le),A.dispose(),n.remove()}}};var go=(e,t)=>e.name.localeCompare(t.name,void 0,{sensitivity:"base"})||e.id.localeCompare(t.id),zr=e=>{switch(e.state){case"conflict":return 0;case"mixed":return 1;case"enabled":return 2;default:return 3}},ns=e=>e.state==="conflict"||e.state==="mixed"||e.conflicts.length>0||e.warnings.length>0||e.state==="enabled"&&!e.advertised,ss=(e,t)=>{switch(t){case"enabled":return e.state==="enabled";case"disabled":return e.state==="disabled";case"attention":return ns(e);case"all":default:return!0}},is=(e,t)=>{let o=t.trim().toLowerCase();return o?[e.id,e.name,e.description,...e.warnings].join(" ").toLowerCase().includes(o):!0},je=e=>({enable:e.filter(t=>t.state==="disabled").map(t=>t.key??t.id),disable:e.filter(t=>t.state==="enabled").map(t=>t.key??t.id)}),qr=(e,t)=>{let o=t.sourceFilter??"all",s=e.filter(n=>(o==="all"||n.scope===o)&&ss(n,t.stateFilter)&&is(n,t.query));switch(t.sortMode){case"tokens":return[...s].sort((n,c)=>c.estimatedTokens-n.estimatedTokens||go(n,c));case"name":return[...s].sort(go);case"state":return[...s].sort((n,c)=>zr(n)-zr(c)||go(n,c));case"default":default:return s}};function Jr(e=document){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",s=>{let n=s.target===e?t:s.target;if(!(n instanceof Element))return;n.hasAttribute("data-oc-scrolling")||n.setAttribute("data-oc-scrolling","");let c=o.get(n);c!==void 0&&clearTimeout(c),o.set(n,setTimeout(()=>{o.delete(n),n.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Yr=`:root {
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
.sk-preview-list {
  max-height: 220px;
  overflow: auto;
  padding-left: 20px;
  overflow-wrap: anywhere;
}
.sk-preview-list li { margin: 6px 0; }

.sk-toolbar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 6px;
}
.sk-search-slot {
  flex: 0 0 auto;
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
      flex-direction: column;
      align-items: stretch;
    }
    .sk-search-slot {
      flex: 0 0 auto;
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
`;var a=(e,t)=>t?e.replace(/\{(\w+)\}/g,(o,s)=>Object.prototype.hasOwnProperty.call(t,s)?String(t[s]):o):e,ce=ao({requestTimeoutMs:3e4}),an=document.querySelector("#root");if(!an)throw new Error("Missing #root");Jr(document);var cn=document.createElement("style");cn.textContent=Qr+Yr;document.head.append(cn);var p=(e,t="",o)=>{let s=document.createElement(e);return s.className=t,o!==void 0&&(s.textContent=o),s},Oe=class extends Error{code;conflicts;constructor(t,o,s){super(t),this.name="ServiceError",this.code=o,this.conflicts=s}},ls=e=>e==="enabled"||e==="disabled"||e==="mixed"||e==="conflict",ds=e=>e==="both"||e==="duplicate"||e==="invalid"||e==="empty"||e==="read-error"||e==="manual"||e==="no-description",me=(e,t="")=>typeof e=="string"?e:t,Io=e=>typeof e=="string"&&e.length>0?e:null,bt=e=>e===!0,ln=e=>typeof e=="number"&&Number.isFinite(e)?e:0,Zr=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],wo=e=>{if(!e||typeof e!="object")return null;let t=e;return!ds(t.kind)||typeof t.skillId!="string"?null:{kind:t.kind,skillId:t.skillId,message:me(t.message,a("Conflict")),activePath:Io(t.activePath),disabledPath:Io(t.disabledPath),blocking:bt(t.blocking)}},ps=e=>{if(!e||typeof e!="object")return null;let t=e;return typeof t.id!="string"||!t.id||!ls(t.state)?null:{key:me(t.key,t.id),id:t.id,scope:t.scope==="project"?"project":"global",sourceId:me(t.sourceId,"opencode-global"),rootPath:me(t.rootPath),name:me(t.name,t.id),description:me(t.description),state:t.state,advertised:bt(t.advertised),autoInvokeOff:bt(t.autoInvokeOff),activePaths:Zr(t.activePaths),disabledPaths:Zr(t.disabledPaths),conflicts:Array.isArray(t.conflicts)?t.conflicts.map(wo).filter(o=>o!==null):[],warnings:Array.isArray(t.warnings)?t.warnings.filter(o=>typeof o=="string"):[],estimatedTokens:ln(t.estimatedTokens),...t.duplicateResolution&&typeof t.duplicateResolution=="object"?{duplicateResolution:(()=>{let o=t.duplicateResolution;return{status:o.status==="highest-scanned"||o.status==="shadowed"?o.status:"unknown",winningPath:Io(o.winningPath)}})()}:{}}},en=e=>{if(!e||typeof e!="object")throw new Oe(a("The service returned invalid skill directory information."),"parse",[]);let t=e;return{sourceId:me(t.sourceId,"opencode-global"),scope:t.scope==="project"?"project":"global",label:me(t.label,a("Skill directory")),path:me(t.path),exists:bt(t.exists),error:typeof t.error=="string"?t.error:null}},Xe=e=>{if(!e||typeof e!="object")throw new Oe(a("The service returned data in an unexpected format."),"parse",[]);let t=e;if(!Array.isArray(t.skills))throw new Oe(a("The service returned data in an unexpected format."),"parse",[]);let o=t.skills.map(ps).filter(E=>E!==null),s=Array.isArray(t.conflicts)?t.conflicts.map(wo).filter(E=>E!==null):o.flatMap(E=>E.conflicts),n=s.filter(E=>E.blocking).length,c={total:o.length,advertised:o.filter(E=>E.advertised).length,disabled:o.filter(E=>E.state==="disabled").length,blockingConflicts:n,warnings:s.length-n,estimatedTokens:o.reduce((E,A)=>E+A.estimatedTokens,0)},l=Array.isArray(t.roots)?t.roots.map(en):t.root?[en(t.root)]:[];return{skills:o,conflicts:s,summary:c,root:l[0]??{sourceId:"opencode-global",scope:"global",label:a("Skill directory"),path:"",exists:!1,error:null},roots:l,projectDirectory:typeof t.projectDirectory=="string"?t.projectDirectory:null,scannedAt:ln(t.scannedAt)}},us=async(e,t,o,s)=>{let n=await ce.serviceRequest({method:e,path:t,...s?{query:s}:{},...o===void 0?{}:{body:JSON.stringify(o)}}),c;try{c=JSON.parse(n.body)}catch{throw new Oe(a("The service returned unrecognized data. Try again."),"parse",[])}if(n.status>=400){let l=c&&typeof c=="object"?c:{},E=typeof l.error=="string"?l.error:a("Request failed ({status})",{status:n.status}),A=typeof l.code=="string"?l.code:null,m=Array.isArray(l.conflicts)?l.conflicts.map(wo).filter(x=>x!==null):[];throw new Oe(E,A,m)}return c},$e=async(e,t,o)=>{let s=Ve,n=o===void 0||e==="GET"?void 0:{...o,directory:s??void 0},c=await us(e,t,n,e==="GET"&&s?{directory:s}:void 0);if(s!==Ve)throw new Error(a("The project changed; rescan before making changes."));return c},we=e=>e instanceof T?e.code==="NO_SERVICE"?a('Allow "Skills" to run its local service in Settings \u2192 Extensions.'):e.code==="SERVICE_FAILED"?a("The local service is not ready. Reload the extension and try again."):e.code==="DISABLED"?a("The Skills extension is disabled. Enable it in extension settings."):e.code==="HOST_TIMEOUT"?a("The local service timed out. Try again."):a("Cannot connect to the local service. Check extension permissions."):e instanceof Oe||e instanceof Error?e.message:a("The operation failed. Try again."),xt=p("main","ext ext-container sk");xt.setAttribute("aria-label",a("Skills Manager"));var dn=p("header","sk-header"),pn=p("div","sk-title-row"),Es=p("h1","sk-title",a("Skills Manager")),Rt=p("div","sk-actions"),_s=Se(Rt,{label:a("Rescan"),variant:"outline",size:"sm",onClick:()=>{Me(!0)}}),fs=Se(Rt,{label:a("Enable all"),variant:"outline",size:"sm",onClick:()=>Rn(!0)}),Ss=Se(Rt,{label:a("Disable all"),variant:"outline",size:"sm",onClick:()=>Rn(!1)});pn.append(Es,Rt);var vo=p("p","sk-summary"),Co=p("p","sk-summary sk-summary-secondary");dn.append(pn,vo,Co);var un=p("div","sk-body"),oe=p("div","sk-notice-root");oe.setAttribute("aria-live","polite");var Ye=p("div"),He=p("details","sk-sources"),En=p("div","sk-toolbar"),Uo=p("div","sk-search-slot"),_n=p("div","sk-toolbar-selects"),No=p("div","sk-toolbar-actions"),Lo=p("div","sk-filter-slot"),Po=p("div","sk-source-slot"),Do=p("div","sk-sort-slot");_n.append(Lo,Po,Do);var Ts=ht(No,{label:a("List actions"),variant:"ghost",size:"sm",items:[{id:"invert",label:a("Invert visible skills")},{id:"copy-ids",label:a("Copy visible IDs")}],onSelect:e=>{e==="invert"?Is():e==="copy-ids"&&ys()}}),Ao=No.querySelector(".oc-sdk-btn");Ao&&(Ao.setAttribute("aria-label",a("List actions")),Ao.title=a("Copy IDs or invert the visible skills"));En.append(Uo,_n,No);var ze=p("div","sk-list");ze.setAttribute("role","list");var fn=p("footer","sk-footer"),ms=p("p","",a("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open.")),hs=p("p","",a("Enable all before disabling or uninstalling the extension; rescan after skills change."));fn.append(ms,hs);un.append(oe,Ye,He,En,ze,fn);xt.append(dn,un);an.append(xt);var g=null,ae=!1,gt=0,qe=null,N=null,y=null,B=null,re=!1,yt="",Qe="all",Ze="all",kt="default",Ve=null,At=new Set,tn,on=!1,Sn=()=>[{id:"all",label:a("All states")},{id:"enabled",label:a("Enabled")},{id:"disabled",label:a("Disabled")},{id:"attention",label:a("Needs attention")}],Tn=()=>[{id:"all",label:a("All sources")},{id:"global",label:a("Global")},{id:"project",label:a("Project")}],mn=()=>[{id:"default",label:a("Default order")},{id:"tokens",label:a("Tokens (high to low)")},{id:"name",label:a("Name (A\u2013Z)")},{id:"state",label:a("Needs attention first")}],gs=ho(Uo,{value:"",placeholder:a("Search name, description, or ID (press / to focus)"),onChange:e=>{yt=e,C()}}),hn=()=>Uo.querySelector("input"),gn=()=>{let e=hn();e&&e.setAttribute("aria-label",a("Search skills"))};gn();var An=We(Lo,{value:"all",options:Sn(),onChange:e=>{Qe=e==="enabled"||e==="disabled"||e==="attention"?e:"all",An.update({value:Qe}),C()}}),bo=Lo.querySelector(".oc-sdk-trigger");bo&&(bo.setAttribute("aria-label",a("Filter by status")),bo.removeAttribute("aria-labelledby"));var bn=We(Po,{value:"all",options:Tn(),onChange:e=>{Ze=e==="global"||e==="project"?e:"all",bn.update({value:Ze}),C()}}),ko=Po.querySelector(".oc-sdk-trigger");ko&&(ko.setAttribute("aria-label",a("Filter by skill source")),ko.removeAttribute("aria-labelledby"));var kn=We(Do,{value:"default",options:mn(),onChange:e=>{kt=e==="tokens"||e==="name"||e==="state"?e:"default",kn.update({value:kt}),C()}}),Oo=Do.querySelector(".oc-sdk-trigger");Oo&&(Oo.setAttribute("aria-label",a("Sort order")),Oo.removeAttribute("aria-labelledby"));document.addEventListener("keydown",e=>{if(!e.defaultPrevented){if(e.key==="/"&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable))return;let o=hn();o&&(e.preventDefault(),o.focus(),o.select());return}if(e.key==="Escape"&&(B!==null||re)){e.preventDefault(),B=null,re=!1,C();return}}});var Ot=()=>!!(g?.root.error||g?.roots.some(e=>e.error)),xe=()=>{let e=g;return e?qr(e.skills,{query:yt,stateFilter:Qe,sourceFilter:Ze,sortMode:kt}):[]},As=e=>e.state==="conflict"?"error":e.state==="mixed"?"warning":e.state==="disabled"?"info":e.advertised?"success":"warning",bs=e=>e.state==="conflict"?a("Conflict"):e.state==="mixed"?a("Mixed"):e.state==="disabled"?a("Disabled"):a("Enabled"),Je=(e,t="neutral")=>{let o=p("span","sk-badge",e);return o.dataset.tone=t,o},ks=e=>{switch(e){case"both":return a("Both entry and disabled file exist");case"duplicate":return a("Multiple entries for one ID");case"invalid":return a("Frontmatter could not be parsed");case"empty":return a("Entry file is empty");case"read-error":return a("Entry cannot be read");case"manual":return a("Manual invocation only");case"no-description":return a("No description");default:return a("Conflict")}},xo=(e,t)=>{if(!t)return null;let o=p("p","sk-path");return o.append(p("span","sk-path-label",`${e}:`),p("code","",t)),o},ke=(e,t,o=!1,s=!1)=>{let n=p("button",o?"sk-inline-button sk-inline-primary":"sk-inline-button",e);return n.type="button",n.disabled=!!y||s,n.addEventListener("click",t),n},rn=e=>{let t=p("li","sk-conflict-item");t.dataset.tone=e.blocking?"error":"warning";let o=p("div","sk-conflict-copy");if(o.append(p("strong","",ks(e.kind)),p("p","sk-conflict-message",e.message)),e.kind==="both"?(o.append(xo(a("Active entry"),e.activePath)??p("span")),o.append(xo(a("Disabled entry"),e.disabledPath)??p("span"))):(e.activePath??e.disabledPath)&&o.append(xo(a("Entry"),e.activePath??e.disabledPath)??p("span")),t.append(o),e.kind==="both"&&e.activePath){let s=p("div","sk-conflict-actions");s.append(ke(a("Keep enabled"),()=>void sn(e,"enabled"),!1,Ot()),ke(a("Keep disabled"),()=>void sn(e,"disabled"),!1,Ot())),t.append(s)}return t},Os=()=>{if(Ye.replaceChildren(),!g)return;let t=[...g.roots.filter(l=>!!l.error).map(l=>({kind:"read-error",skillId:"",message:a("Cannot read {label}: {error} ({path})",{label:l.label,error:l.error??"",path:l.path}),activePath:null,disabledPath:null,blocking:!0})),...g.conflicts],o=t.filter(l=>l.blocking),s=t.filter(l=>!l.blocking);if(o.length===0&&s.length===0)return;let n=p("section","sk-conflicts");n.setAttribute("aria-label",a("Conflict check"));let c=p("div","sk-section-head");if(c.append(p("h2","sk-section-title",a("Conflict check")),p("span","sk-section-count",a("To resolve: {blocking} \xB7 Warnings: {warnings}",{blocking:o.length,warnings:s.length}))),n.append(c),o.length>0){let l=p("ul","sk-conflict-list");for(let E of o)l.append(rn(E));n.append(l)}if(s.length>0){let l=p("details","sk-warning-details");l.append(p("summary","",a("Warnings ({count})",{count:s.length})));let E=p("ul","sk-conflict-list");for(let A of s)E.append(rn(A));l.append(E),n.append(l)}Ye.append(n)},xs=()=>{let e=He.open;He.replaceChildren();let t=g;if(!t)return;let o=t.roots.filter(n=>n.exists).length;He.append(p("summary","",a("Detected skill sources: {available}/{total} available",{available:o,total:t.roots.length})));let s=p("ul","sk-source-list");for(let n of t.roots){let c=p("li","sk-source-item"),l=p("div","sk-source-head"),E=n.error?a("Error"):n.exists?a("Available"):a("Not created");l.append(p("strong","",n.label),Je(n.scope==="project"?a("Project"):a("Global"),n.scope==="project"?"info":"neutral"),Je(E,n.error?"error":n.exists?"success":"neutral")),c.append(l,p("code","sk-source-path",n.path||a("No path"))),n.error&&c.append(p("p","sk-source-error",n.error)),s.append(c)}He.append(s),He.open=e},On=()=>{if(oe.replaceChildren(),re){let e=je(xe()),t=e.enable.length+e.disable.length,o=p("div","sk-notice",a("Invert visible skills: enable {enable}, disable {disable}.",{enable:e.enable.length,disable:e.disable.length}));o.dataset.tone="warning",o.setAttribute("role","status"),nn(o,xe().filter(n=>n.state==="enabled"||n.state==="disabled"),n=>n.state==="disabled");let s=p("div","sk-notice-actions");s.append(ke(a("Confirm invert"),()=>void vs(),!0,t===0),ke(a("Cancel"),()=>{re=!1,C()})),o.append(s),oe.append(o);return}if(B!==null){let e=g?g.skills.filter(s=>(B?s.disabledPaths.length:s.activePaths.length)>0).length:0,t=p("div","sk-notice",B?a("Skills to enable: {count}.",{count:e}):a("Skills to disable: {count}.",{count:e}));t.dataset.tone="warning",t.setAttribute("role","status"),nn(t,g?.skills??[],()=>B===!0);let o=p("div","sk-notice-actions");o.append(ke(a(B?"Confirm enable":"Confirm disable"),()=>void Ps(),!0),ke(a("Cancel"),()=>{B=null,C()})),t.append(o),oe.append(t);return}if(N){let e=p("div","sk-notice",N.text);if(e.dataset.tone=N.tone,e.setAttribute("role",N.tone==="error"?"alert":"status"),N.actions?.length){let t=p("div","sk-notice-actions");for(let o of N.actions)t.append(ke(o.label,o.onClick,o.primary));e.append(t)}oe.append(e);return}if(qe){let e=p("div","sk-notice",qe);e.dataset.tone="error",e.setAttribute("role","alert"),oe.append(e);return}if(ae&&!g){let e=p("div","sk-notice",a("Reading skills\u2026"));e.dataset.tone="info",e.setAttribute("role","status"),oe.append(e)}},nn=(e,t,o)=>{let s=p("details","sk-preview");s.open=!0,s.append(p("summary","",a("Files affected (current scan)")));let n=p("ul","sk-preview-list");for(let c of t){let l=o(c),E=l?c.disabledPaths:c.activePaths;for(let A of E){let m=p("li","");m.append(p("strong","",`${a(l?"Enable":"Disable")}: ${c.key}`),p("code","sk-source-path",A)),n.append(m)}}s.append(n),e.append(s)},xn=async()=>{if(!y){y="undo",C();try{g=Xe(await $e("POST","/skills/undo",{})),N={text:a("The last bulk operation was undone."),tone:"success"}}catch(e){N={text:we(e),tone:"error"}}finally{y=null,C()}}},Rs=()=>{if(!g){vo.textContent=a(ae?"Reading skills\u2026":"Skills not read yet."),Co.textContent=a("After disabling an entry document, OpenCode no longer discovers that skill.");return}vo.textContent=a("Estimated advertised entries: {advertised} of {total} \xB7 about {tokens} tokens/step",{advertised:g.summary.advertised,total:g.summary.total,tokens:g.summary.estimatedTokens.toLocaleString("en")});let e=[a("Disabled: {count}",{count:g.summary.disabled})],t=g.skills.filter(o=>o.scope==="project").length;if(Ve&&e.push(a("Project skills: {count}",{count:t})),g.summary.blockingConflicts>0?e.push(a("Blocking conflicts: {count}",{count:g.summary.blockingConflicts})):e.push(a("No blocking conflicts")),g.summary.warnings>0&&e.push(a("Warnings: {count}",{count:g.summary.warnings})),g.roots.some(o=>o.error)&&e.push(a("A skill directory cannot be read")),g.scannedAt>0){let o=new Date(g.scannedAt);Number.isNaN(o.getTime())||e.push(a("Scanned {time}",{time:o.toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"})}))}Co.textContent=a("{parts}. Estimates exclude built-in skills.",{parts:e.join(" \xB7 ")})},Mo=async(e,t)=>{try{await ce.writeClipboard(e),ce.toast({kind:"success",message:t}).catch(()=>{})}catch(o){N={text:we(o),tone:"error"},On()}},ys=async()=>{let e=xe().map(t=>t.key);e.length!==0&&await Mo(e.join(`
`),a("Copied {count} visible qualified IDs.",{count:e.length}))},Is=()=>{if(!g||y)return;let e=je(xe());if(e.enable.length+e.disable.length===0){N={text:a("No enabled or disabled skills match the current view."),tone:"info"},C();return}re=!0,B=null,N=null,C(),oe.scrollIntoView({block:"nearest"}),oe.querySelector("button")?.focus()},vs=async()=>{if(!g||y||!re)return;let e=je(xe()),t=e.enable.length+e.disable.length;if(re=!1,t!==0){y="invert",N=null,C();try{let o=xe().flatMap(c=>e.enable.includes(c.key)?c.disabledPaths:e.disable.includes(c.key)?c.activePaths:[]),s=await $e("POST","/skills/batch",{...e,expectedPaths:o});g=Xe(s);let n=!!(s&&typeof s=="object"&&s.undoAvailable);N={text:a("Inverted {count} visible skills.",{count:t}),tone:"success",...n?{actions:[{label:a("Undo last action"),onClick:()=>void xn()}]}:{}},ce.toast({kind:"success",message:a("Inverted {count} visible skills.",{count:t})}).catch(()=>{})}catch(o){N={text:we(o),tone:"error"},y=null,C(),Me(!1,!0);return}y=null,C()}},Ro=(e,t)=>{let o=p("span","sk-menu-slot"),s=t.activePaths[0]??t.disabledPaths[0]??null;ht(o,{label:"\u22EF",variant:"ghost",size:"sm",items:[{id:"copy-path",label:a("Copy entry path"),disabled:!s},{id:"copy-id",label:a("Copy qualified skill ID")}],onSelect:c=>{c==="copy-path"&&s?Mo(s,a("Copied entry path.")):c==="copy-id"&&Mo(t.key,a("Copied qualified skill ID."))}});let n=o.querySelector(".oc-sdk-btn");n&&(n.setAttribute("aria-label",`${a("More actions")} ${t.name}`),n.title=a("More actions")),e.append(o)},Cs=e=>{let t=p("div","sk-skill-action"),o=p("span","sk-action-note"),s=p("div","sk-action-top"),n=Ot();if(e.state==="conflict"){o.textContent=a(n?"Directory cannot be read":"Resolve conflicts first");let E=p("button","sk-inline-button",a("Resolve conflict"));return E.type="button",E.disabled=!!y||n,E.addEventListener("click",()=>{Ye.scrollIntoView({block:"nearest"}),Ye.querySelector("button")?.focus()}),s.append(E),Ro(s,e),t.append(o,s),t}if(e.state==="mixed"){o.textContent=a(n?"Directory cannot be read":"Some entries disabled");let E=p("div","sk-mini-actions"),A=p("button","sk-inline-button",a("Enable all"));A.type="button",A.disabled=!!y||n,A.addEventListener("click",()=>void yo(e,!0));let m=p("button","sk-inline-button",a("Disable all"));return m.type="button",m.disabled=!!y||n,m.addEventListener("click",()=>void yo(e,!1)),E.append(A,m),Ro(E,e),t.append(o,E),t}let c=e.state==="enabled",l=p("button","sk-switch");return l.type="button",l.setAttribute("role","switch"),l.setAttribute("aria-checked",c?"true":"false"),l.setAttribute("aria-label",`${a(c?"Disable":"Enable")} ${e.name}`),l.dataset.skillId=e.key,l.disabled=!!y||n,l.append(p("span","sk-thumb")),l.addEventListener("click",()=>{l.disabled||yo(e,!c)}),c?o.textContent=n?a("Directory cannot be read"):e.advertised?a("Eligible for advertisement (estimate)"):a("Not advertised (estimate)"):o.textContent=a(n?"Directory cannot be read":"Entry disabled"),s.append(l),Ro(s,e),t.append(o,s),t},Ms=e=>{let t=p("article","sk-skill");t.dataset.state=e.state,t.setAttribute("role","listitem");let o=p("div","sk-skill-main"),s=p("div","sk-skill-head");if(s.append(p("strong","sk-name",e.name),Je(bs(e),As(e)),Je(e.scope==="project"?a("Project"):a("Global"),e.scope==="project"?"info":"neutral")),e.duplicateResolution){let m=e.duplicateResolution.status;s.append(Je(a(m==="highest-scanned"?"Highest scanned precedence":m==="shadowed"?"Shadowed in scanned sources":"Duplicate: uncertain"),"warning"))}let n=p("div","sk-meta");if(n.append(p("code","sk-id",e.id)),e.rootPath){let m=p("span","sk-source",e.sourceId==="opencode-global"?a("OpenCode"):e.sourceId==="opencode-project"?a("Project OpenCode"):e.sourceId.replace(/-/g," "));m.title=e.rootPath,n.append(m)}e.estimatedTokens>0&&n.append(p("span","sk-token",a("~{tokens} tok",{tokens:e.estimatedTokens.toLocaleString("en")})));let c=e.description,l=c||a("No description; the model will not select it automatically."),E=p("p","sk-desc",l),A=At.has(e.key);if(A&&E.classList.add("is-expanded"),o.append(s,n,E),c.length>88||c.includes(`
`)){let m=p("button","sk-desc-toggle",a(A?"Show less":"Show more"));m.type="button",m.setAttribute("aria-expanded",A?"true":"false"),m.addEventListener("click",()=>{let x=!At.has(e.key);x?At.add(e.key):At.delete(e.key),E.classList.toggle("is-expanded",x),m.textContent=a(x?"Show less":"Show more"),m.setAttribute("aria-expanded",x?"true":"false")}),o.append(m)}if(e.warnings.length>0){let m=p("p","sk-warn",e.warnings.slice(0,2).join(" \xB7 "));o.append(m)}return t.append(o,Cs(e)),t},ws=()=>{yt="",Qe="all",Ze="all",kt="default",gs.update({value:"",placeholder:a("Search name, description, or ID (press / to focus)")}),gn(),An.update({value:"all",options:Sn()}),bn.update({value:"all",options:Tn()}),kn.update({value:"default",options:mn()}),C()},Us=()=>{ze.replaceChildren();let e=g;if(!e)return;let t=xe();if(t.length===0){let o=yt.trim().length>0||Qe!=="all"||Ze!=="all",s=p("div","sk-empty");if(s.append(p("h2","",e.skills.length===0?a("No skills found"):a("No matching skills")),p("p","",e.skills.length===0?a("Check that a skill directory such as {path} exists, or rescan.",{path:e.roots[0]?.path??a("the skills directory")}):a("Try another search term or change the filters."))),e.skills.length>0&&o){let n=p("div","sk-empty-actions");n.append(ke(a("Reset filters"),ws)),s.append(n)}ze.append(s);return}for(let o of t)ze.append(Ms(o))},Ns=()=>{let e=g?g.roots.some(t=>t.error)?1:g.summary.blockingConflicts>0?g.summary.blockingConflicts:null:null;e!==tn&&(tn=e,ce.setBadge(e).catch(()=>{}))},C=()=>{xt.setAttribute("aria-busy",ae?"true":"false"),Ns(),Rs(),On(),Os(),xs(),Us(),_s.update({label:a(ae?"Reading\u2026":"Rescan"),loading:ae,disabled:ae||!!y});let e=Ot();fs.update({disabled:ae||!!y||!g||e}),Ss.update({disabled:ae||!!y||!g||e});let t=xe(),o=je(t);Ts.update({items:[{id:"invert",label:a("Invert visible skills"),disabled:ae||!!y||!g||o.enable.length+o.disable.length===0},{id:"copy-ids",label:a("Copy visible IDs"),disabled:!g||t.length===0}]})},Ls=e=>{Array.from(document.querySelectorAll("[data-skill-id]")).find(o=>o.dataset.skillId===e)?.focus()},Me=async(e=!1,t=!1)=>{let o=++gt;ae=!0,t||(qe=null),e&&C();try{let s=Xe(await $e("GET","/skills"));if(o!==gt)return;g=s,qe=null}catch(s){o===gt&&!t&&(qe=we(s))}finally{o===gt&&(ae=!1,C())}},yo=async(e,t)=>{if(!y){y=`toggle:${e.id}`,B=null,re=!1,N=null,C();try{g=Xe(await $e("POST","/skills/toggle",{id:e.key,enabled:t})),N={text:t?a("Enabled {name}.",{name:e.name}):a("Disabled {name}; OpenCode will no longer discover it after the next scan.",{name:e.name}),tone:"success"},ce.toast({kind:"success",message:t?a("Enabled {name}",{name:e.name}):a("Disabled {name}",{name:e.name})}).catch(()=>{})}catch(o){N={text:we(o),tone:"error"},y=null,C(),Me(!1,!0);return}y=null,C(),Ls(e.id)}},sn=async(e,t)=>{if(y)return;let o=e.activePath??e.disabledPath;if(o){y=`resolve:${o}`,B=null,re=!1,N=null,C();try{let s=await $e("POST","/skills/resolve",{path:o,keep:t}),n=s&&typeof s=="object"&&typeof s.backupPath=="string"?s.backupPath:null;g=Xe(s),N={text:t==="enabled"?a("Kept the enabled entry{suffix}.",{suffix:n?a("; the old disabled file was backed up to {path}",{path:n}):""}):a("Kept the disabled entry{suffix}.",{suffix:n?a("; the old disabled file was backed up to {path}",{path:n}):""}),tone:"success"},ce.toast({kind:"success",message:a("Entry conflict resolved")}).catch(()=>{})}catch(s){N={text:we(s),tone:"error"},y=null,C(),Me(!1,!0);return}y=null,C()}},Rn=e=>{!g||y||(B=e,re=!1,N=null,C(),oe.scrollIntoView({block:"nearest"}),oe.querySelector("button")?.focus())},Ps=async()=>{if(B===null||y)return;let e=B;B=null,re=!1,y="bulk",N=null,C();try{let t=g?.skills.flatMap(n=>e?n.disabledPaths:n.activePaths)??[],o=await $e("POST","/skills/bulk",{enabled:e,expectedPaths:t}),s=o&&typeof o=="object"&&Array.isArray(o.changed)?o.changed.filter(n=>typeof n=="string"):[];g=Xe(o),N={text:e?a("Skills enabled: {count}.",{count:s.length}):a("Skills disabled: {count}.",{count:s.length}),tone:"success",...o&&typeof o=="object"&&o.undoAvailable?{actions:[{label:a("Undo last action"),onClick:()=>void xn()}]}:{}},ce.toast({kind:"success",message:e?a("Skills enabled: {count}.",{count:s.length}):a("Skills disabled: {count}.",{count:s.length})}).catch(()=>{})}catch(t){N={text:we(t),tone:"error"},y=null,C(),Me(!1,!0);return}y=null,C()},yn=e=>{let t=typeof e=="string"&&e?e:null;if(on){t!==Ve?(Ve=t,g=null,B=null,re=!1,Me(!0)):C();return}on=!0,Ve=t,Me(!0)};ce.onReady(e=>{co(e,document.documentElement),document.documentElement.lang="en",document.title=a("Skills Manager"),yn(e.directory)});ce.onDirectory(e=>yn(e));document.title=a("Skills Manager");C();})();
