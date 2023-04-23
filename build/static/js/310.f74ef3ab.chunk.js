"use strict";(self.webpackChunkmyplaylog_frontend_web=self.webpackChunkmyplaylog_frontend_web||[]).push([[310],{6031:function(e,n,t){t.d(n,{Z:function(){return v}});var r=t(9439),l=t(2835),o=t(2744),a=t(4422),i=t(2791),s=t(1912),c=t(3433),d=t(9230),u=t(184);var h=function(e){var n=e.tags,t=e.setTags,l=(0,i.useState)(""),o=(0,r.Z)(l,2),a=o[0],s=o[1],h=(0,d.$G)().t,x=function(){var e=a.trim();if(e&&!n.includes(e)){if(n.find((function(e){return e.toLowerCase()===a.toLowerCase()})))return void a("");t([].concat((0,c.Z)(n),[e])),s("")}};return(0,u.jsxs)("div",{className:"flex flex-row ",children:[(0,u.jsxs)("div",{className:"tags-container",children:[n.map((function(e,r){return(0,u.jsxs)("div",{className:"tag",children:[(0,u.jsx)("span",{className:"tag__name",children:e}),(0,u.jsx)("button",{className:"tag__remove",onClick:function(e){return function(e,r){e.preventDefault();var l=(0,c.Z)(n);l.splice(r,1),t(l)}(e,r)},children:"\xd7"})]},r)})),(0,u.jsx)("input",{type:"text",className:"tag-input",placeholder:h("add_tag"),value:a,maxLength:20,onKeyDown:function(e){"Enter"!==e.key&&","!==e.key||(e.preventDefault(),x())},onChange:function(e){s(e.target.value)}})]}),(0,u.jsx)("button",{className:"bg-red-600 text-white border-none p-2 hover:bg-red-700 hover:cursor-pointer min-w-fit",onClick:function(e){e.preventDefault(),t([])},children:h("clear_tags")})]})},x=t(7689),f=t(8848),p=t(9085),m=t(7192),g=l.Z.TextArea;function v(e){var n=e.isModalOpen,t=e.setIsModalOpen,c=e.redirectEdit,v=void 0!==c&&c,b=e.setListCreated,A=void 0===b?null:b,j=(0,i.useState)(""),y=(0,r.Z)(j,2),w=y[0],Z=y[1],k=(0,i.useState)(!1),N=(0,r.Z)(k,2),C=N[0],P=N[1],M=(0,i.useState)(!1),T=(0,r.Z)(M,2),O=T[0],E=T[1],X=(0,i.useState)(""),Q=(0,r.Z)(X,2),V=Q[0],D=Q[1],G=(0,i.useState)([]),H=(0,r.Z)(G,2),B=H[0],R=H[1],I=(0,d.$G)().t,K=(0,x.s0)(),q=function(e){K("/list/".concat(e,"/edit"))},W=function(){t(!1)};return(0,u.jsx)(o.Z,{title:I("create_new_list"),open:n,onCancel:W,style:{minWidth:"300px"},className:"createListStyle",footer:[(0,u.jsx)("button",{className:"btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer",onClick:W,children:I("cancel")},"back"),(0,u.jsx)("button",{className:"btn-save-list p-2 mx-2 rounded-xl text-black border-none cursor-pointer",style:{backgroundColor:m.Z.primary},type:"primary",onClick:function(){var e=JSON.stringify({name:w,idOwner:"Mondher",public:C,ranked:O,description:V,tags:B.map((function(e){return{tag:e}}))}),n={method:"post",withCredentials:!0,url:"".concat("http://141-95-162-17.nip.io:8000","/api/lists/"),headers:{"Content-Type":"application/json"},data:e};(0,s.Z)(n).then((function(e){!v&&p.Am.success("List created with success",{position:p.Am.POSITION.BOTTOM_RIGHT,theme:"dark",autoClose:1e3}),v&&q(e.data.listCreated._id),null!==A&&A(e.data.listCreated)})).catch((function(e){console.log(e),p.Am.error(e.message,{position:p.Am.POSITION.BOTTOM_RIGHT,theme:"dark"})})).finally((function(){return t(!1)}))},children:I("create")},"submit")],children:(0,u.jsx)("div",{children:(0,u.jsxs)("form",{className:"flex flex-col gap-2",children:[(0,u.jsx)("label",{children:I("name_your_list")}),(0,u.jsxs)(f.ZP,{theme:{token:{fontWeightStrong:800,colorText:"white",colorBgBase:m.Z.backgroundDerivation,colorBorder:"white",colorPrimary:m.Z.primary,colorTextPlaceholder:"grey",fontFamily:"Inter"}},children:[(0,u.jsx)(l.Z,{showCount:!0,maxLength:100,placeholder:"".concat(I("best_fighting_games"),"..."),value:w,onChange:function(e){Z(e.target.value)}}),(0,u.jsxs)("div",{className:"flex flex-row justify-between gap-10",children:[(0,u.jsxs)("div",{className:"flex flex-col",children:[(0,u.jsx)("label",{children:I("visibility")}),(0,u.jsxs)(a.ZP.Group,{defaultValue:"private",buttonStyle:"solid",onChange:function(e){P("public"===e.target.value)},children:[(0,u.jsx)(a.ZP.Button,{style:{color:C?"black":"white"},value:"public",children:I("public")}),(0,u.jsx)(a.ZP.Button,{style:{color:C?"white":"black"},value:"private",children:I("private")})]})]}),(0,u.jsxs)("div",{className:"flex flex-col",children:[(0,u.jsx)("label",{children:I("type")}),(0,u.jsxs)(a.ZP.Group,{defaultValue:"classic",buttonStyle:"solid",onChange:function(e){E("ranked"===e.target.value)},children:[(0,u.jsx)(a.ZP.Button,{style:{color:O?"white":"black"},value:"classic",children:I("classic")}),(0,u.jsx)(a.ZP.Button,{value:"ranked",style:{color:O?"black":"white"},children:I("top")})]})]})]}),(0,u.jsx)(g,{className:"mb-4",placeholder:"".concat(I("describe_your_list_in_some_words"),"..."),showCount:!0,maxLength:300,value:V,onChange:function(e){D(e.target.value)}}),(0,u.jsx)(h,{tags:B,setTags:R})]})]})})})}},6310:function(e,n,t){t.r(n),t.d(n,{default:function(){return H}});var r,l=t(9439),o=t(168),a=t(2360),i=t(8848),s=t(7133),c=t(1912),d=t(2791),u=t(7689),h=t(5443),x=t(7192),f=t(6031),p=t(2835),m=t(4422),g=t(5303),v=t(9230),b=t(184),A=p.Z.Search,j=a.ZP.div(r||(r=(0,o.Z)(["\n  background-color: ",";\n  border-radius: 16px;\n  min-width: 250px;\n"])),x.Z.backgroundDerivation);function y(e){var n=e.query,t=e.ranked,r=e.sortQuery,o=(0,u.s0)(),a=(0,d.useState)(""),s=(0,l.Z)(a,2),c=s[0],h=s[1],f=(0,d.useState)("all"),p=(0,l.Z)(f,2),y=p[0],w=p[1],Z=(0,d.useState)(!1),k=(0,l.Z)(Z,2),N=k[0],C=k[1],P=(0,v.$G)().t;(0,d.useEffect)((function(){h(n),w("true"===t?"ranked":"false"===t?"classic":"all")}),[n,t]);var M=function(e){var n="all"!==y?"ranked"===y:void 0,t=[];null!==c&&""!==c&&t.push("q=".concat(c.trim())),void 0!==n&&t.push("ranked=".concat(n)),t.push(r);var l=t.length>0?"?".concat(t.join("&")):"",a="/lists".concat(l);o(a),e&&e.preventDefault&&e.preventDefault(),C(!1)};(0,d.useEffect)((function(){N&&M()}),[N]);return(0,b.jsx)(j,{className:"flex flex-col h-full px-4 py-6",children:(0,b.jsxs)("form",{onSubmit:M,children:[(0,b.jsxs)("div",{className:"mb-4",children:[(0,b.jsx)("label",{style:{color:x.Z.primary},className:"block font-bold mb-2",htmlFor:"search",children:P("search")}),(0,b.jsx)(i.ZP,{theme:{token:{colorTextPlaceholder:"grey"}},children:(0,b.jsx)(A,{id:"search",type:"text",placeholder:P("name_tag"),value:c,onChange:function(e){h(e.target.value)},onSearch:M,allowClear:!0,size:"large"})})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{style:{color:x.Z.primary},className:"block font-bold mb-2",htmlFor:"search",children:P("type")}),(0,b.jsxs)("div",{className:"mt-2",children:[(0,b.jsx)(i.ZP,{theme:{token:{colorPrimary:x.Z.primary,colorPrimaryHover:x.Z.primary,colorText:"white",colorTextDisabled:"grey"}},children:(0,b.jsx)(m.ZP.Group,{onChange:function(e){w(e.target.value),C(!0)},value:y,children:(0,b.jsxs)(g.Z,{direction:"vertical",children:[(0,b.jsx)(m.ZP,{value:"all",children:P("all")}),(0,b.jsx)(m.ZP,{value:"classic",children:P("classic")}),(0,b.jsx)(m.ZP,{value:"ranked",children:P("top")})]})})}),(0,b.jsx)("button",{type:"button",onClick:function(e){return function(e){e.preventDefault(),h(""),w("all"),C(!0)}(e)},style:{backgroundColor:x.Z.danger},className:"text-white p-2 w-full mt-2 border-none rounded-md hover:cursor-pointer",children:P("clear_filters")})]})]})]})})}var w=t(7295),Z=t(3080);t(8631);function k(e){var n=e.sortBy,t=e.setSortBy,r=e.setSortOrder,o=e.sortOrder,a=e.setSortQuery,i=(0,d.useState)("Name"),s=(0,l.Z)(i,2),c=s[0],u=s[1],h=(0,v.$G)().t,x=[{key:"name",label:h("name")},{key:"lastUpdate",label:h("last_update")},{key:"likesCount",label:h("sort_likes")}];(0,d.useEffect)((function(){a("&sort=".concat(n,"&order=").concat(o)),u(h("name"===n?"name":"lastUpdate"===n?"last_update":"sort_likes"))}),[n,o]);var f=function(e){r(e)};return(0,b.jsxs)("div",{className:"flex flex-row",children:[(0,b.jsx)(Z.Z,{menu:{items:x,onClick:function(e){!function(e){t(e)}(e.key)}},onClick:function(e){var n=e.key;return console.log(n)},children:(0,b.jsx)("h2",{className:"text-white font-normal hover:text-yellow-500  cursor-pointer",children:(0,b.jsxs)(g.Z,{children:[c,(0,b.jsx)(w.Z,{})]})})}),(0,b.jsxs)("div",{className:"arrow-wrapper",children:[(0,b.jsxs)("div",{className:"arrow",onClick:function(){return f("desc")},children:[(0,b.jsx)("div",{className:"arrow-head",style:{borderBottom:"4px solid ".concat("desc"===o?"#FCD500":"white")}}),(0,b.jsx)("div",{className:"arrow-body",style:{backgroundColor:" ".concat("desc"===o?"#FCD500":"white")}})]}),(0,b.jsxs)("div",{className:"arrow",onClick:function(){return f("asc")},children:[(0,b.jsx)("div",{className:"arrow-body",style:{backgroundColor:" ".concat("asc"===o?"#FCD500":"white")}})," ",(0,b.jsx)("div",{className:"down-arrow-head",style:{borderTop:"4px solid ".concat("asc"===o?"#FCD500":"white")},children:" "})]})]})]})}var N,C=t(5114),P=t(2744),M=t(7309),T=p.Z.Search,O=a.ZP.div(N||(N=(0,o.Z)(["\n  background-color: ",";\n  border-radius: 16px;\n  min-width: 250px;\n"])),x.Z.backgroundDerivation);function E(e){var n=e.isFilterModalVisible,t=e.setIsFilterModalVisible,r=e.ranked,o=e.query,a=(e.setIsModalOpen,e.sortQuery),s=function(){t(!1)},c=(0,u.s0)(),h=(0,d.useState)(""),f=(0,l.Z)(h,2),p=f[0],A=f[1],j=(0,d.useState)("all"),y=(0,l.Z)(j,2),w=y[0],Z=y[1],k=(0,d.useState)(!1),N=(0,l.Z)(k,2),C=N[0],E=N[1],X=(0,v.$G)().t;(0,d.useEffect)((function(){A(o),Z("true"===r?"ranked":"false"===r?"classic":"all")}),[o,r]);var Q=function(e){var n="all"!==w?"ranked"===w:void 0,r=[];null!==p&&""!==p&&r.push("q=".concat(p.trim())),void 0!==n&&r.push("ranked=".concat(n)),r.push(a);var l=r.length>0?"?".concat(r.join("&")):"",o="/lists".concat(l);c(o),e&&e.preventDefault&&e.preventDefault(),E(!1),t(!1)};(0,d.useEffect)((function(){C&&Q()}),[C]);return(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(P.Z,{className:"listFilterModal",title:X("filter"),open:n,onCancel:s,style:{minWidth:300},footer:[(0,b.jsx)("button",{type:"button",onClick:function(e){return function(e){e.preventDefault(),A(""),Z("all"),E(!0)}(e)},style:{backgroundColor:x.Z.danger},className:"text-white p-2  border-none mr-2 rounded-md hover:cursor-pointer",children:X("clear_filters")}),(0,b.jsx)(M.ZP,{onClick:s,children:X("cancel")},"back")],children:(0,b.jsx)(O,{className:"flex flex-col h-full px-4 py-6",children:(0,b.jsxs)("form",{onSubmit:Q,children:[(0,b.jsxs)("div",{className:"mb-4",children:[(0,b.jsx)("label",{style:{color:x.Z.primary},className:"block font-bold mb-2",htmlFor:"search",children:X("search")}),(0,b.jsx)(i.ZP,{theme:{token:{colorTextPlaceholder:"grey"}},children:(0,b.jsx)(T,{id:"search",type:"text",placeholder:X("name_tag"),value:p,onChange:function(e){A(e.target.value)},onSearch:Q,allowClear:!0,size:"large"})})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("label",{style:{color:x.Z.primary},className:"block font-bold mb-2",htmlFor:"search",children:X("type")}),(0,b.jsx)("div",{className:"mt-2",children:(0,b.jsx)(i.ZP,{theme:{token:{colorPrimary:x.Z.primary,colorPrimaryHover:x.Z.primary,colorText:"white",colorTextDisabled:"grey"}},children:(0,b.jsx)(m.ZP.Group,{onChange:function(e){Z(e.target.value),E(!0)},value:w,children:(0,b.jsxs)(g.Z,{direction:"vertical",children:[(0,b.jsx)(m.ZP,{value:"all",children:X("all")}),(0,b.jsx)(m.ZP,{value:"classic",children:X("classic")}),(0,b.jsx)(m.ZP,{value:"ranked",children:X("top")})]})})})})]})]})})})})}var X,Q=t(927),V=t(738),D=t(1793),G=a.ZP.div(X||(X=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  padding-top: 80px;\n  background-color: ",";\n  justify-content: start;\n  align-items: start;\n  min-height: 100vh;\n"])),x.Z.background);var H=function(){var e=(0,u.TH)(),n=(0,d.useState)(null),t=(0,l.Z)(n,2),r=t[0],o=t[1],a=(0,d.useState)(null),p=(0,l.Z)(a,2),m=p[0],g=p[1],A=(0,d.useState)([]),j=(0,l.Z)(A,2),w=j[0],Z=j[1],N=(0,d.useState)(!0),P=(0,l.Z)(N,2),M=P[0],T=P[1],O=(0,d.useState)(!1),X=(0,l.Z)(O,2),H=X[0],B=X[1],R=(0,d.useState)(0),I=(0,l.Z)(R,2),K=I[0],q=I[1],W=(0,d.useState)(1),S=(0,l.Z)(W,2),F=S[0],U=S[1],L=(0,d.useState)(0),z=(0,l.Z)(L,2),Y=z[0],J=z[1],_=(0,d.useState)("lastUpdate"),$=(0,l.Z)(_,2),ee=$[0],ne=$[1],te=(0,d.useState)("desc"),re=(0,l.Z)(te,2),le=re[0],oe=re[1],ae=(0,d.useState)(""),ie=(0,l.Z)(ae,2),se=ie[0],ce=ie[1],de=(0,d.useState)(!1),ue=(0,l.Z)(de,2),he=ue[0],xe=ue[1],fe=(0,u.s0)(),pe=(0,d.useState)(!0),me=(0,l.Z)(pe,2),ge=me[0],ve=me[1],be=(0,v.$G)().t,Ae=(0,d.useContext)(D.O).loggedIn,je=(0,d.useCallback)((function(){window.innerHeight+30+window.scrollY>=document.documentElement.scrollHeight?ve(!1):ve(!0)}),[]);(0,d.useEffect)((function(){return window.addEventListener("scroll",je),function(){window.removeEventListener("scroll",je)}}),[je]);var ye=function(){document.title=be("lists")+" - My PlayLog",J(20),T(!0);var e="".concat("http://141-95-162-17.nip.io:8000","/api/lists/?page=").concat(F,"&limit=").concat(10).concat(null!==r&&""!==r?"&q="+r:"").concat(null!==m&&""!==m?"&ranked="+m:"").concat(se,"\n    ");c.Z.get(e.trim(),{withCredentials:!0}).then((function(e){console.log(e.data),Z(e.data.lists),q(e.data.totalLists)})).catch((function(e){return console.log(e)})).finally((function(){T(!1),J(100)}))};return(0,d.useEffect)((function(){var n=new URLSearchParams(e.search);o((function(){return n.get("q")||""})),g((function(){return n.get("ranked")||""})),ne((function(){return n.get("sort")||"lastUpdate"})),oe((function(){return n.get("order")||"desc"})),U(1)}),[e]),(0,d.useEffect)((function(){null!==m&&null!==r&&ye()}),[m,r]),(0,d.useEffect)((function(){console.log(F),w&&0!==w.length&&ye()}),[F]),(0,d.useEffect)((function(){if(w&&0!==w.length){var e="/lists?".concat(null!==r&&""!==r?"&q="+r:"").concat(null!==m&&""!==m?"&ranked="+m:"").concat(se,"\n      ");console.log(e),fe(e),1===F&&ye()}}),[se]),(0,b.jsxs)(G,{children:[(0,b.jsx)(h.Z,{color:x.Z.primary,progress:Y,onLoaderFinished:function(){return J(0)}}),(0,b.jsx)(E,{isFilterModalVisible:he,setIsFilterModalVisible:xe,ranked:m,query:r,setIsModalOpen:B,sortQuery:se}),(0,b.jsxs)("div",{className:" flex   z-20 justify-center fixed bottom-[80px]   items-center w-full  lg:hidden ",style:{minWidth:"300px"},children:[(0,b.jsxs)("button",{type:"button",className:" font-bold rounded-2xl px-5 p-2  shadow-2xl  text-center lg:hidden cursor-pointer ",style:{backgroundColor:"".concat(x.Z.primary),fontSize:"1rem",display:ge?"block":"none"},onClick:function(){return xe(!0)},children:[(0,b.jsx)("img",{src:C,height:"15",alt:"filter icon",className:"pt-[5px] mr-[6px]"})," ",be("filter")]}),(0,b.jsx)("button",{onClick:function(){return B(!0)},className:"fixed z-50 right-5 bottom-[80px]  rounded-full p-2 px-3 text-center lg:hidden cursor-pointer shadow-2xl ",style:{backgroundColor:"".concat(x.Z.primary),fontSize:"1.5em"},children:"+"})]}),(0,b.jsxs)("div",{className:"flex flex-row justify-start items-start w-full py-8 h-full min-h-full ",children:[(0,b.jsxs)("div",{className:" hidden lg:flex flex-col  ml-4 gap-2 sticky top-20",children:[(0,b.jsx)(y,{ranked:m,query:r,setIsModalOpen:B,sortQuery:se}),(0,b.jsx)("button",{onClick:function(){Ae?B(!0):fe("/login")},style:{color:x.Z.backgroundDerivation,backgroundColor:x.Z.primary,fontWeight:"extra-bold"},className:" text-white p-2 m-2 border-none hover:cursor-pointer ",children:be("create_your_list").toUpperCase()})]}),(0,b.jsxs)("div",{className:"flex flex-col  justify-center items-center w-full ",children:[(0,b.jsxs)("div",{className:"flex  flex-row justify-".concat(0!==K?"between":"end"," items-end w-full px-8"),children:[0!==K&&(0,b.jsxs)("h3",{className:"font-normal p-2",children:[K," ",be("results")]}),(0,b.jsx)(k,{setSortOrder:oe,setSortBy:ne,sortOrder:le,sortBy:ee,setSortQuery:ce})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2  gap-2 px-8",children:[M&&(0,b.jsx)(b.Fragment,{children:Array.from({length:6}).map((function(e,n){return(0,b.jsx)(V.Z,{},"list + "+n)}))}),!M&&0===w.length&&(0,b.jsxs)("h2",{style:{color:x.Z.primary,margin:"auto",textAlign:"center"},children:[be("no_result"),"."]})," ",!M&&w.map((function(e){return(0,b.jsx)(Q.Z,{list:e})}))]}),(0,b.jsx)(f.Z,{isModalOpen:H,setIsModalOpen:B,redirectEdit:!0}),0!==w.length&&(0,b.jsx)(i.ZP,{theme:{token:{colorPrimary:x.Z.backgroundDerivation,colorText:"white",colorTextDisabled:"grey"}},children:(0,b.jsx)(s.Z,{className:"mt-12 mb-4",onChange:function(e){return U(e)},defaultCurrent:F,current:F,pageSize:10,total:K})})]})]})]})}},927:function(e,n,t){t.d(n,{Z:function(){return A}});var r,l,o,a,i,s,c=t(168),d=(t(2791),t(2360)),u=t(1087),h=t(7192),x=t(9230),f=t(184),p=(0,d.F4)(r||(r=(0,c.Z)(["\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-150%);\n  }\n  200% {\n    transform: translateX(0%);\n  }\n"]))),m=d.ZP.div(l||(l=(0,c.Z)(["\n  display: flex;\n  min-height: 200px;\n\n  flex-direction: column;\n  min-width: 260px;\n  width: 100%;\n  background-color: ",";\n  border-bottom-left-radius: 16px;\n  border-bottom-right-radius: 16px;\n  transition: 0.1s;\n  &:hover {\n    transform: scale(1.01);\n    // z-index: 1;\n  }\n  &:hover img {\n    ","\n  }\n  overflow: hidden;\n  box-shadow: inset 0 3px 15px 3px #0009;\n  position: relative;\n"])),h.Z.backgroundDerivation,(function(e){return e.gamesLength>4?(0,d.iv)(o||(o=(0,c.Z)(["\n            animation: "," ","s linear infinite;\n            animation-direction: alternate;\n          "])),p,e.gamesLength+2):""})),g=d.ZP.div(a||(a=(0,c.Z)(["\n  // border-top-left-radius: 16px;\n  // border-top-right-radius: 16px;\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100px;\n  background-color: rgb(83 81 126 / 21%);\n  overflow: hidden;\n  position: relative;\n"]))),v=d.ZP.img(i||(i=(0,c.Z)(["\n  // width: 100px;\n  // height: 100px;\n  // object-fit: cover;\n  // flex-shrink: 0;\n  // box-shadow: inset 0 3px 15px 3px #0009;\n"]))),b=d.ZP.div(s||(s=(0,c.Z)(["\n  box-shadow: inset 0 3px 15px 3px #0009;\n"])));function A(e){var n=e.list,t=n.games?n.games.length:0;(0,x.$G)().t;return(0,f.jsx)(m,{gamesLength:t,children:(0,f.jsxs)(u.rU,{className:"text-white hover:text-white",to:"/list/".concat(n._id),children:[(0,f.jsx)(b,{className:"absolute w-full h-full",style:{zIndex:1}}),(0,f.jsxs)(g,{children:[n.games.map((function(e){return(0,f.jsx)(v,{alt:e.name,height:"150%",src:e.cover?"https://images.igdb.com/igdb/image/upload/t_cover_big/".concat(e.cover.image_id,".jpg"):"https://images.igdb.com/igdb/image/upload/t_cover_big/undefined.jpg"},"cover for"+e._id)})),(0,f.jsxs)("div",{className:"flex flex-row gap-2 absolute bottom-2 right-2 ",children:[(0,f.jsxs)("h4",{className:"  p-1 px-2 rounded-xl bg-yellow-600",children:[n.gamesLength," games"]}),n.ranked&&(0,f.jsx)("h3",{className:"  p-1 px-2 rounded-xl bg-[#080705]",children:n.ranked?"Ranked":"Classique"})]})]}),(0,f.jsxs)("div",{className:"flex flex-col p-2",children:[(0,f.jsx)("h2",{children:n.name}),(0,f.jsx)("p",{className:"  overflow-hidden text-ellipsis whitespace-nowrap py-2 ",children:n.description}),(0,f.jsxs)("div",{className:"flex flex-row gap-2  w-10/12 justify-start flex-nowrap  overflow-hidden",children:[n.tags.map((function(e){return(0,f.jsx)("h5",{className:"border-solid border-2 rounded-xl border-white  whitespace-nowrap p-1 px-2",children:e.tag},e._id)})),(0,f.jsxs)("h3",{className:"absolute right-5",children:[n.likesCount," \u2764"]})]})]})]})})}},738:function(e,n,t){t.d(n,{Z:function(){return u}});var r,l,o=t(168),a=t(2360),i=t(7192),s=t(184),c=a.ZP.div(r||(r=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  min-width: 260px;\n  width: 100%;\n  background-color: ",";\n  border-bottom-left-radius: 16px;\n  border-bottom-right-radius: 16px;\n  transition: 0.1s;\n  &:hover {\n    transform: scale(1.01);\n    z-index: 1;\n  }\n\n  overflow: hidden;\n  box-shadow: inset 0 3px 15px 3px #0009;\n  position: relative;\n"])),i.Z.backgroundDerivation),d=a.ZP.div(l||(l=(0,o.Z)(["\n  // border-top-left-radius: 16px;\n  // border-top-right-radius: 16px;\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  height: 100px;\n  background-color: rgb(83 81 126 / 21%);\n  overflow: hidden;\n  position: relative;\n"])));function u(){return(0,s.jsxs)(c,{children:[(0,s.jsx)(d,{children:(0,s.jsx)("div",{className:"loading",style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}})}),(0,s.jsx)("div",{style:{display:"flex",flexDirection:"column",p:2},children:(0,s.jsxs)("div",{style:{padding:"20px 30px"},children:[(0,s.jsx)("h2",{className:"loading mb-4",style:{width:300,height:30,background:"rgb(83 81 126 / 21%)"},children:" "}),(0,s.jsx)("p",{className:"loading",style:{height:50,background:"rgb(83 81 126 / 21%)"}})]})})]})}},8631:function(){},5114:function(e){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=310.f74ef3ab.chunk.js.map