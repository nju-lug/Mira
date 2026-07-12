import{A as e,L as t,M as n,O as r,P as i,b as a,st as o}from"./vue-DwBCmn35.js";import{E as s,T as c,_ as l,c as u,d,f,h as p,k as m,l as h,o as g,p as _,v}from"./headers-Dwo3oHLJ.js";import{u as y}from"./utils-0cKF2RZj.js";var b=/^(\d|\.)+$/,x=/(\d|\.)+/;function S(e,{c:t=1,offset:n=0,attachPx:r=!0}={}){if(typeof e==`number`){let r=(e+n)*t;return r===0?`0`:`${r}px`}else if(typeof e==`string`)if(b.test(e)){let i=(Number(e)+n)*t;return r?i===0?`0`:`${i}px`:`${i}`}else{let r=x.exec(e);return r?e.replace(x,String((Number(r[0])+n)*t)):e}return e}function C(e,r,i){if(!r)return;let a=v(),o=n(p,null),s=()=>{let t=i.value;r.mount({id:t===void 0?e:t+e,head:!0,anchorMetaName:d,props:{bPrefix:t?`.${t}-`:void 0},ssr:a,parent:o?.styleMountTarget}),o?.preflightStyleDisabled||h.mount({id:`n-global`,head:!0,anchorMetaName:d,ssr:a,parent:o?.styleMountTarget})};a?s():t(s)}var w=s(`base-icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[c(`svg`,`
 height: 1em;
 width: 1em;
 `)]),T=r({name:`BaseIcon`,props:{role:String,ariaLabel:String,ariaDisabled:{type:Boolean,default:void 0},ariaHidden:{type:Boolean,default:void 0},clsPrefix:{type:String,required:!0},onClick:Function,onMousedown:Function,onMouseup:Function},setup(e){C(`-base-icon`,w,o(e,`clsPrefix`))},render(){return e(`i`,{class:`${this.clsPrefix}-base-icon`,onClick:this.onClick,onMousedown:this.onMousedown,onMouseup:this.onMouseup,role:this.role,"aria-label":this.ariaLabel,"aria-hidden":this.ariaHidden,"aria-disabled":this.ariaDisabled},this.$slots)}});function E(t,i){let a=r({render(){return i()}});return r({name:y(t),setup(){let r=n(p,null)?.mergedIconsRef;return()=>{let n=r?.value?.[t];return n?n():e(a,null)}}})}function D(e){let{textColorBase:t,opacity1:n,opacity2:r,opacity3:i,opacity4:a,opacity5:o}=e;return{color:t,opacity1Depth:n,opacity2Depth:r,opacity3Depth:i,opacity4Depth:a,opacity5Depth:o}}var O={name:`Icon`,common:g,self:D},k=s(`icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[m(`color-transition`,{transition:`color .3s var(--n-bezier)`}),m(`depth`,{color:`var(--n-color)`},[c(`svg`,{opacity:`var(--n-opacity)`,transition:`opacity .3s var(--n-bezier)`})]),c(`svg`,{height:`1em`,width:`1em`})]),A=r({_n_icon__:!0,name:`Icon`,inheritAttrs:!1,props:Object.assign(Object.assign({},u.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n}=_(e),r=u(`Icon`,`-icon`,k,O,e,t),i=a(()=>{let{depth:t}=e,{common:{cubicBezierEaseInOut:n},self:i}=r.value;if(t!==void 0){let{color:e,[`opacity${t}Depth`]:r}=i;return{"--n-bezier":n,"--n-color":e,"--n-opacity":r}}return{"--n-bezier":n,"--n-color":``,"--n-opacity":``}}),o=n?f(`icon`,a(()=>`${e.depth||`d`}`),i,e):void 0;return{mergedClsPrefix:t,mergedStyle:a(()=>{let{size:t,color:n}=e;return{fontSize:S(t),color:n}}),cssVars:n?void 0:i,themeClass:o?.themeClass,onRender:o?.onRender}},render(){let{$parent:t,depth:n,mergedClsPrefix:r,component:a,onRender:o,themeClass:s}=this;return t?.$options?._n_icon__&&l(`icon`,"don't wrap `n-icon` inside `n-icon`"),o?.(),e(`i`,i(this.$attrs,{role:`img`,class:[`${r}-icon`,s,{[`${r}-icon--depth`]:n,[`${r}-icon--color-transition`]:n!==void 0}],style:[this.cssVars,this.mergedStyle]}),a?e(a):this.$slots)}});export{C as a,T as i,D as n,S as o,E as r,A as t};