var EmbedTestimonials=function(){"use strict";var o={exports:{}},t={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a;function m(){if(a)return t;a=1;var i=Symbol.for("react.transitional.element"),u=Symbol.for("react.fragment");function s(l,e,n){var d=null;if(n!==void 0&&(d=""+n),e.key!==void 0&&(d=""+e.key),"key"in e){n={};for(var x in e)x!=="key"&&(n[x]=e[x])}else n=e;return e=n.ref,{$$typeof:i,type:l,key:d,ref:e!==void 0?e:null,props:n}}return t.Fragment=u,t.jsx=s,t.jsxs=s,t}var c;function p(){return c||(c=1,o.exports=m()),o.exports}var r=p();function v({data:i,layout:u}){return!i||i.length===0?r.jsx("div",{children:"No favourites found."}):(console.log(i),r.jsxs("div",{style:{padding:"1rem",fontFamily:"Arial"},children:[r.jsxs("h2",{children:["Favourite Testimonials (",u," layout)"]}),u==="card"?r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"1rem"},children:i.map((s,l)=>r.jsxs("div",{style:{width:"200px",border:"1px solid #ccc",padding:"1rem",borderRadius:"8px",background:"#fff"},children:[r.jsx("h4",{className:"text-black",children:s.name}),r.jsx("p",{children:s.email})]},l))}):r.jsx("ul",{children:i.map((s,l)=>r.jsxs("li",{style:{marginBottom:"0.5rem"},children:[r.jsxs("strong",{children:[s.name,":"]})," ",s.message]},l))})]}))}return v}();
