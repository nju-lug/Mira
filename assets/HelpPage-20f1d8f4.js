import{d,e as f,v as _,E as o,G as h,c as g,aw as v,ax as e,av as c,F as x,aD as k,a as D,ay as N}from"./vue-4ba37823.js";import{aB as y,aC as B,aD as w,aF as C,aL as E,aG as F,aM as M}from"./index-6363e5e1.js";import{N as R}from"./Result-7fb21548.js";import"./utils-1ed1b754.js";const V=d({__name:"HelpPage",setup(b){const{t:s}=y(),i=k(),u=F(),l=B(),[m,p]=w(""),a=f(()=>{const t=i.params.distro;if(t!=null)return u.state.docItems.find(n=>n.name==t)});return _(()=>{a.value&&M(a.value).then(t=>p(t),t=>l.error(t.message))}),(t,n)=>(o(),h(x,null,[g(e(C),{prefix:"bar"},{default:v(()=>{var r;return[D(N((((r=e(a))==null?void 0:r.name)||"")+" "+e(s)("header.doc")),1)]}),_:1}),e(a)?(o(),c(E,{key:0,content:e(m)},null,8,["content"])):(o(),c(e(R),{key:1,size:"huge",status:"info",title:e(s)("help.title"),description:e(s)("help.description")},null,8,["title","description"]))],64))}});export{V as default};