import{d as m,j as g,E as a,G as d,c as w,aw as f,a as v,ay as x,ax as t,e as _,F as y,aA as b,aK as k,av as p,o as C,aD as N}from"./vue-4ba37823.js";import{az as S,aA as z,aS as B,aK as D,aG as h,aB as L,aC as T,aF as j}from"./index-6363e5e1.js";import{N as F}from"./Result-7fb21548.js";import"./utils-1ed1b754.js";async function I(){return await S(z+"iso.json")}const M={class:"download-tile"},$=m({__name:"DownloadTile",props:{item:null},setup(c){const o=c,{title:n,description:l,url:i}=g(o.item),s=()=>window.open(i);return(e,r)=>(a(),d("div",M,[w(t(B),{onClick:r[0]||(r[0]=u=>s()),size:"small",title:t(n),embedded:"",hoverable:""},{default:f(()=>[v(x(t(l)),1)]),_:1},8,["title"])]))}});const A=D($,[["__scopeId","data-v-99dab299"]]),E=m({__name:"DownloadList",props:{distro:null},setup(c){const o=c,n=h(),l=_(()=>o.distro.urls.map(s=>{const e=s.name.match(/(.*?) \((.*)\)/);return{title:e?e[1]:"null",description:e?e[2]:"null",url:s.url}})||[]),i=_(()=>n.state.isMobile?2:4);return(s,e)=>(a(),d("div",{style:k({columnCount:t(i)}),class:"tiles"},[(a(!0),d(y,null,b(t(l),r=>(a(),p(A,{key:r.url,item:r},null,8,["item"]))),128))],4))}});const G=D(E,[["__scopeId","data-v-c1c4b55e"]]),H=m({__name:"DownloadPage",setup(c){const{t:o}=L(),n=h(),l=N(),i=T();C(()=>I().then(e=>n.commit("setDownloads",e),e=>i.error(e.message)));const s=_(()=>n.state.downloadContents.find(e=>e.distro==l.params.distro));return(e,r)=>(a(),d(y,null,[w(t(j),{prefix:"bar"},{default:f(()=>{var u;return[v(x(((u=t(s))==null?void 0:u.distro)||t(o)("header.downloads")),1)]}),_:1}),t(s)?(a(),p(G,{key:0,distro:t(s)},null,8,["distro"])):(a(),p(t(F),{key:1,size:"huge",status:"info",title:t(o)("downloads.title"),description:t(o)("downloads.description")},null,8,["title","description"]))],64))}});export{H as default};