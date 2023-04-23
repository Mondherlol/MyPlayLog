"use strict";(self.webpackChunkmyplaylog_frontend_web=self.webpackChunkmyplaylog_frontend_web||[]).push([[427],{3744:function(e,t,n){n.d(t,{Z:function(){return w}});var o=n(1413),r=n(3433),s=n(9439),a=n(2744),i=n(2791),l=n(592),c=n(5443),u=n(1912),d=n(9085),h=n(7689),f=n(1793),p=n(7192),m=n(6031),x=n(2835),g=n(8848),v=n(4422),b=n(5303),Z=n(184),C=x.Z.Search;function y(e){var t=e.lists,n=e.setFilteredLists,o=(0,i.useState)(""),r=(0,s.Z)(o,2),a=r[0],l=r[1],c=(0,i.useState)("all"),u=(0,s.Z)(c,2),d=u[0],h=u[1];return(0,i.useEffect)((function(){var e=t.filter((function(e){var t=e.name.toLowerCase().includes(a.toLowerCase()),n="all"===d||("ranked"===d?e.ranked:!e.ranked);return t&&n}));n(e)}),[a,d]),(0,Z.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,Z.jsx)(g.ZP,{theme:{token:{colorTextPlaceholder:"grey"}},children:(0,Z.jsx)(C,{id:"search",type:"text",placeholder:"Chercher une liste ou un top...",value:a,onChange:function(e){l(e.target.value)},allowClear:!0,size:"large"})}),(0,Z.jsx)("div",{className:"flex flex-row",children:(0,Z.jsx)(g.ZP,{theme:{token:{colorPrimary:p.Z.primary,colorPrimaryHover:p.Z.primary,colorText:"white",colorTextDisabled:"grey"}},children:(0,Z.jsx)(v.ZP.Group,{onChange:function(e){return h(e.target.value)},value:d,children:(0,Z.jsxs)(b.Z,{direction:"horizontal",children:[(0,Z.jsx)(v.ZP,{value:"all",children:"Tous"}),(0,Z.jsx)(v.ZP,{value:"classic",children:"Classiques"}),(0,Z.jsx)(v.ZP,{value:"ranked",children:"Ranked"})]})})})})]})}var j=function(e){var t=e.isConfirmCloseModalOpen,n=e.setIsConfirmCloseModalOpen,o=e.setIsModalOpen,r=(0,i.useState)(!1),l=(0,s.Z)(r,2),c=l[0],u=l[1];return(0,i.useEffect)((function(){u(!t)}),[t]),(0,Z.jsx)(a.Z,{title:"Close without saving ?",open:t&&!c,onCancel:function(){return n(!1)},onOk:function(){n(!1),o(!1),u(!0)},okText:"Yes",okType:"danger",okButtonProps:{style:{background:p.Z.danger,borderColor:p.Z.danger,color:"white"}},cancelText:"No"})},k=n(9230);function w(e){var t=e.isModalOpen,n=e.setIsModalOpen,x=e.gameId,g=(0,i.useState)([]),v=(0,s.Z)(g,2),b=v[0],C=v[1],w=(0,i.useState)([]),T=(0,s.Z)(w,2),_=T[0],O=T[1],N=(0,i.useState)([]),S=(0,s.Z)(N,2),I=S[0],P=S[1],L=(0,i.useState)(!1),M=(0,s.Z)(L,2),A=M[0],G=M[1],B=(0,i.useState)(!1),E=(0,s.Z)(B,2),R=E[0],D=E[1],H=(0,i.useContext)(f.V).loginData,F=(0,k.$G)().t,W=(0,h.s0)(),V=(0,i.useState)(0),$=(0,s.Z)(V,2),z=$[0],q=$[1],J=(0,i.useState)([]),K=(0,s.Z)(J,2),Y=K[0],Q=K[1],U=(0,i.useState)(null),X=(0,s.Z)(U,2),ee=X[0],te=X[1];(0,i.useEffect)((function(){t&&(H?(q(5),ne(),P([]),Q([])):W("/login"))}),[t]);var ne=function(){q(10),u.Z.get("".concat("http://141-95-162-17.nip.io:8000","/api/lists/withGame/").concat(x),{withCredentials:!0}).then((function(e){console.log(e.data),C(e.data.lists),O(e.data.lists),e.data.lists.forEach((function(e){0!==e.games.length&&P((function(t){return[].concat((0,r.Z)(t),[e._id])}))}))})).catch((function(e){return console.log(e)})).finally((function(){return q(100)}))},oe=function(){var e=Object.values(b).map((function(e){if(0!==e.games.length)return e._id})).filter((function(e){return void 0!==e})),t=I.length===e.length&&I.every((function(t){return e.includes(t)})),o=Y.filter((function(e){return b.some((function(t){return t._id===e&&0!==t.games.length}))}));console.log(o),t&&0===o.length?n(!1):D(!0)};return(0,i.useEffect)((function(){null===ee||b.includes(ee)||(C((function(e){return[ee].concat((0,r.Z)(e))})),O((function(e){return[ee].concat((0,r.Z)(e))})),P((function(e){return[].concat((0,r.Z)(e),[ee._id])})))}),[ee]),(0,Z.jsxs)(a.Z,{title:"Add game to lists",open:t,className:"addingGameStyle",onCancel:oe,style:{top:20},footer:[(0,Z.jsx)("button",{className:"btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer",onClick:oe,children:"CANCEL"},"back"),(0,Z.jsx)("button",{className:"btn-save-list p-2 mx-2 rounded-xl text-black border-none cursor-pointer",style:{backgroundColor:p.Z.primary},type:"primary",onClick:function(){q(5),function(){q(20);var e={id_IGDB:x.toString()},t=I.join(",");if(void 0!==t&&""!==t){var n={method:"post",withCredentials:!0,url:"".concat("http://141-95-162-17.nip.io:8000","/api/lists/game?ids=").concat(t),headers:{"Content-Type":"application/json"},data:(0,o.Z)({},e)};(0,u.Z)(n).then((function(e){d.Am.success(F("games_added_with_success"),{position:d.Am.POSITION.BOTTOM_RIGHT,theme:"dark",autoClose:3e3})})).catch((function(e){console.log(e),d.Am.error(e.message,{position:d.Am.POSITION.BOTTOM_RIGHT,theme:"dark",autoClose:3e3})})).finally((function(){return q(100)}))}}(),function(){q(80);var e=Y.filter((function(e){return b.some((function(t){return t._id===e&&0!==t.games.length}))})).join(",");if(void 0!==e&&""!==e&&","!==e){var t={method:"delete",url:"".concat("http://141-95-162-17.nip.io:8000","/api/lists/remove/").concat(x,"?listIds=").concat(e),withCredentials:!0,headers:{"Content-Type":"application/json"}};(0,u.Z)(t).then((function(e){d.Am.success(F("games_removed_with_success"),{position:d.Am.POSITION.BOTTOM_RIGHT,theme:"dark",autoClose:3e3})})).catch((function(e){console.log(e),d.Am.error(e.message,{position:d.Am.POSITION.BOTTOM_RIGHT,theme:"dark",autoClose:3e3})})).finally((function(){return q(100)}))}}(),n(!1)},children:"ENREGISTRER"},"submit")],children:[(0,Z.jsx)(c.Z,{color:p.Z.primary,progress:z,onLoaderFinished:function(){return q(0)}}),(0,Z.jsx)(m.Z,{isModalOpen:A,setIsModalOpen:G,setListCreated:te}),(0,Z.jsx)(j,{isConfirmCloseModalOpen:R,setIsConfirmCloseModalOpen:D,setIsModalOpen:n}),(0,Z.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,Z.jsx)(y,{setLists:C,lists:b,setFilteredLists:O}),(0,Z.jsxs)("div",{className:"flex flex-col  gap-2 h-96 overflow-y-scroll pr-5 scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]  w-full ",children:[0===_.length&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("h4",{children:"No list with that name..."}),(0,Z.jsxs)("button",{onClick:function(){G(!0)},style:{color:p.Z.backgroundDerivation,backgroundColor:p.Z.primary,fontWeight:"extra-bold"},className:" text-white p-3 btn-save-list border-none hover:cursor-pointer ",children:["CREATE IT"," "]})]}),_.map((function(e){return(0,Z.jsx)("div",{className:" w-full   ".concat(I.includes(e._id)?"style-checked-list":"selectList"),children:(0,Z.jsx)(l.Z,{style:{padding:"8px",borderRadius:"4px",width:"100%","--background-color":p.Z.primary,"--border-color":p.Z.primary,color:"white",backgroundColor:"rgb(8, 7, 27,0.5)"},onChange:function(t){return function(e,t){e.target.checked?(P((function(e){return[].concat((0,r.Z)(e),[t])})),Q((function(e){return e.filter((function(e){return e!==t}))}))):(P((function(e){return e.filter((function(e){return e!==t}))})),Q((function(e){return[].concat((0,r.Z)(e),[t])})))}(t,e._id)},checked:I.includes(e._id),children:(0,Z.jsxs)("h2",{className:" text-base ",children:[e.name,(0,Z.jsxs)("span",{className:"text-xs  font-normal",children:[" ","\u2022"," ",e.ranked?" Top":"Liste"]})]})})},e._id)})),0!==_.length&&(0,Z.jsxs)("button",{onClick:function(){G(!0)},style:{color:p.Z.backgroundDerivation,backgroundColor:p.Z.primary,fontWeight:"extra-bold"},className:" text-white p-3 btn-save-list border-none hover:cursor-pointer ",children:["CREATE LIST"," "]})]})]})]})}},6031:function(e,t,n){n.d(t,{Z:function(){return v}});var o=n(9439),r=n(2835),s=n(2744),a=n(4422),i=n(2791),l=n(1912),c=n(3433),u=n(9230),d=n(184);var h=function(e){var t=e.tags,n=e.setTags,r=(0,i.useState)(""),s=(0,o.Z)(r,2),a=s[0],l=s[1],h=(0,u.$G)().t,f=function(){var e=a.trim();if(e&&!t.includes(e)){if(t.find((function(e){return e.toLowerCase()===a.toLowerCase()})))return void a("");n([].concat((0,c.Z)(t),[e])),l("")}};return(0,d.jsxs)("div",{className:"flex flex-row ",children:[(0,d.jsxs)("div",{className:"tags-container",children:[t.map((function(e,o){return(0,d.jsxs)("div",{className:"tag",children:[(0,d.jsx)("span",{className:"tag__name",children:e}),(0,d.jsx)("button",{className:"tag__remove",onClick:function(e){return function(e,o){e.preventDefault();var r=(0,c.Z)(t);r.splice(o,1),n(r)}(e,o)},children:"\xd7"})]},o)})),(0,d.jsx)("input",{type:"text",className:"tag-input",placeholder:h("add_tag"),value:a,maxLength:20,onKeyDown:function(e){"Enter"!==e.key&&","!==e.key||(e.preventDefault(),f())},onChange:function(e){l(e.target.value)}})]}),(0,d.jsx)("button",{className:"bg-red-600 text-white border-none p-2 hover:bg-red-700 hover:cursor-pointer min-w-fit",onClick:function(e){e.preventDefault(),n([])},children:h("clear_tags")})]})},f=n(7689),p=n(8848),m=n(9085),x=n(7192),g=r.Z.TextArea;function v(e){var t=e.isModalOpen,n=e.setIsModalOpen,c=e.redirectEdit,v=void 0!==c&&c,b=e.setListCreated,Z=void 0===b?null:b,C=(0,i.useState)(""),y=(0,o.Z)(C,2),j=y[0],k=y[1],w=(0,i.useState)(!1),T=(0,o.Z)(w,2),_=T[0],O=T[1],N=(0,i.useState)(!1),S=(0,o.Z)(N,2),I=S[0],P=S[1],L=(0,i.useState)(""),M=(0,o.Z)(L,2),A=M[0],G=M[1],B=(0,i.useState)([]),E=(0,o.Z)(B,2),R=E[0],D=E[1],H=(0,u.$G)().t,F=(0,f.s0)(),W=function(e){F("/list/".concat(e,"/edit"))},V=function(){n(!1)};return(0,d.jsx)(s.Z,{title:H("create_new_list"),open:t,onCancel:V,style:{minWidth:"300px"},className:"createListStyle",footer:[(0,d.jsx)("button",{className:"btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer",onClick:V,children:H("cancel")},"back"),(0,d.jsx)("button",{className:"btn-save-list p-2 mx-2 rounded-xl text-black border-none cursor-pointer",style:{backgroundColor:x.Z.primary},type:"primary",onClick:function(){var e=JSON.stringify({name:j,idOwner:"Mondher",public:_,ranked:I,description:A,tags:R.map((function(e){return{tag:e}}))}),t={method:"post",withCredentials:!0,url:"".concat("http://141-95-162-17.nip.io:8000","/api/lists/"),headers:{"Content-Type":"application/json"},data:e};(0,l.Z)(t).then((function(e){!v&&m.Am.success("List created with success",{position:m.Am.POSITION.BOTTOM_RIGHT,theme:"dark",autoClose:1e3}),v&&W(e.data.listCreated._id),null!==Z&&Z(e.data.listCreated)})).catch((function(e){console.log(e),m.Am.error(e.message,{position:m.Am.POSITION.BOTTOM_RIGHT,theme:"dark"})})).finally((function(){return n(!1)}))},children:H("create")},"submit")],children:(0,d.jsx)("div",{children:(0,d.jsxs)("form",{className:"flex flex-col gap-2",children:[(0,d.jsx)("label",{children:H("name_your_list")}),(0,d.jsxs)(p.ZP,{theme:{token:{fontWeightStrong:800,colorText:"white",colorBgBase:x.Z.backgroundDerivation,colorBorder:"white",colorPrimary:x.Z.primary,colorTextPlaceholder:"grey",fontFamily:"Inter"}},children:[(0,d.jsx)(r.Z,{showCount:!0,maxLength:100,placeholder:"".concat(H("best_fighting_games"),"..."),value:j,onChange:function(e){k(e.target.value)}}),(0,d.jsxs)("div",{className:"flex flex-row justify-between gap-10",children:[(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("label",{children:H("visibility")}),(0,d.jsxs)(a.ZP.Group,{defaultValue:"private",buttonStyle:"solid",onChange:function(e){O("public"===e.target.value)},children:[(0,d.jsx)(a.ZP.Button,{style:{color:_?"black":"white"},value:"public",children:H("public")}),(0,d.jsx)(a.ZP.Button,{style:{color:_?"white":"black"},value:"private",children:H("private")})]})]}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("label",{children:H("type")}),(0,d.jsxs)(a.ZP.Group,{defaultValue:"classic",buttonStyle:"solid",onChange:function(e){P("ranked"===e.target.value)},children:[(0,d.jsx)(a.ZP.Button,{style:{color:I?"white":"black"},value:"classic",children:H("classic")}),(0,d.jsx)(a.ZP.Button,{value:"ranked",style:{color:I?"black":"white"},children:H("top")})]})]})]}),(0,d.jsx)(g,{className:"mb-4",placeholder:"".concat(H("describe_your_list_in_some_words"),"..."),showCount:!0,maxLength:300,value:A,onChange:function(e){G(e.target.value)}}),(0,d.jsx)(h,{tags:R,setTags:D})]})]})})})}},6625:function(e,t,n){e.exports=n.p+"static/media/save.79bcbe17807266bf760b.png"}}]);
//# sourceMappingURL=427.e77ab941.chunk.js.map