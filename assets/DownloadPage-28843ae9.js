import{d as p,j as g,E as a,G as i,c as f,aw as w,a as h,ay as x,ax as e,e as u,F as y,aA as b,aK as k,av as _,o as N,aD as C}from"./vue-1fd1c6f9.js";import{ac as j,ad as L,ax as S,ap as v,aj as D,ae as T,af as z,ai as B}from"./index-56365481.js";import{N as I}from"./Result-08fb3b60.js";import"./utils-1ed1b754.js";async function M(){return await j(L+"iso.json")}const E=["href"],F=p({__name:"DownloadTile",props:{item:null},setup(c){const o=c,{title:n,description:r,url:l}=g(o.item);return(s,t)=>(a(),i("a",{class:"download-tile",href:e(l),target:"_blank"},[f(e(S),{size:"small",title:e(n),embedded:"",hoverable:""},{default:w(()=>[h(x(e(r)),1)]),_:1},8,["title"])],8,E))}});const P=v(F,[["__scopeId","data-v-c5e87593"]]),R=p({__name:"DownloadList",props:{distro:null},setup(c){const o=c,n=D(),r=u(()=>o.distro.urls.map(s=>{const t=s.name.match(/(.*?) \((.*)\)/);return{title:t?t[1]:"null",description:t?t[2]:"null",url:s.url}})||[]),l=u(()=>n.state.isMobile?2:4);return(s,t)=>(a(),i("div",{style:k({columnCount:e(l)}),class:"tiles"},[(a(!0),i(y,null,b(e(r),d=>(a(),_(P,{key:d.url,item:d},null,8,["item"]))),128))],4))}});const V=v(R,[["__scopeId","data-v-c1c4b55e"]]),K=p({__name:"DownloadPage",setup(c){const{t:o}=T(),n=D(),r=C(),l=z();N(()=>M().then(t=>n.commit("setDownloads",t),t=>l.error(t.message)));const s=u(()=>n.state.downloadContents.find(t=>t.distro==r.params.distro));return(t,d)=>(a(),i(y,null,[f(e(B),{prefix:"bar"},{default:w(()=>{var m;return[h(x(((m=e(s))==null?void 0:m.distro)||e(o)("header.downloads")),1)]}),_:1}),e(s)?(a(),_(V,{key:0,distro:e(s)},null,8,["distro"])):(a(),_(e(I),{key:1,size:"huge",status:"info",title:e(o)("downloads.title"),description:e(o)("downloads.description")},null,8,["title","description"]))],64))}});export{K as default};