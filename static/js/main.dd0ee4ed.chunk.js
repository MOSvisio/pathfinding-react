(this["webpackJsonppath-finding"]=this["webpackJsonppath-finding"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(7),c=n.n(a),i=(n(14),n(15),n(1)),u=n(4),s=function e(t,n,r,o,a){Object(u.a)(this,e),this.parent=void 0,this.cout=void 0,this.coord=void 0,this.heuristique=void 0,this.isWall=void 0,this.parent=a,this.cout=t,this.coord=n,this.heuristique=r,this.isWall=o},l=function e(t,n){Object(u.a)(this,e),this.x=void 0,this.y=void 0,this.x=t,this.y=n},f="depart",d="arrivee",h="wall",v={graph:[[]],setGraph:function(e){},depart:new l(-1,-1),setDepart:function(e){},arrivee:new l(0,0),setArrivee:function(e){},reset:function(){},block:"",setBlock:function(e){}},b=Object(r.createContext)(v),p=function(e){var t=e.children,n=function(){for(var e=window.innerWidth/30,t=window.innerHeight/40,n=[],r=0;r<t;r++){for(var o=[],a=0;a<e;a++){var c=new s(0,new l(r,a),0,!1);o.push(c)}n.push(o)}return n},a=Object(r.useState)(n),c=Object(i.a)(a,2),u=c[0],f=c[1],d=Object(r.useState)(new l(-1,-1)),h=Object(i.a)(d,2),v=h[0],p=h[1],m=Object(r.useState)(new l(-1,-1)),j=Object(i.a)(m,2),O=j[0],w=j[1],x=Object(r.useState)(""),y=Object(i.a)(x,2),g=y[0],k=y[1],E={graph:u,setGraph:function(e){return f(e)},depart:v,setDepart:function(e){return p(e)},arrivee:O,setArrivee:function(e){return w(e)},reset:function(){return f(n),p(new l(-1,-1)),void w(new l(-1,-1))},block:g,setBlock:function(e){return k(e)}};return o.a.createElement("div",null,o.a.createElement(b.Provider,{value:E},t))},m=n(5),j=n.n(m),O=n(8),w=n(2),x=Object(r.forwardRef)((function(e,t){var n=Object(r.useContext)(b),a=n.graph,c=n.depart,u=n.setDepart,s=n.arrivee,v=n.setArrivee,p=n.block,m=Object(r.useState)(new l(e.x,e.y)),j=Object(i.a)(m,2),O=j[0],w=(j[1],Object(r.useState)(e.color)),x=Object(i.a)(w,2),y=x[0],g=x[1],k=Object(r.useState)(!1),E=Object(i.a)(k,2),C=(E[0],E[1]),S=Object(r.useState)(0),W=Object(i.a)(S,2),q=(W[0],W[1]),A=Object(r.useState)(0),B=Object(i.a)(A,2),D=(B[0],B[1],O.x),I=O.y;return Object(r.useImperativeHandle)(t,(function(){return{coord:O,colorBg:y,setColor:function(e){"blue"!==y&&"yellow"!==y&&g(e)},resetColor:function(){g("white")},setIsWall:function(e){C(e)},setCout:function(e){q(e)}}})),o.a.createElement("td",{onClick:function(e){return function(e){if(console.log("clic",O),p===f&&-1===c.x)u(new l(D,I)),g("blue"),console.log("set Depart");else if(p===d)v(new l(D,I)),g("yellow"),console.log("set Arrivee");else if(p===h&&-1===s.x){C(!0),a[O.x][O.y].isWall=!0,g("black")}}()},style:{border:"1px solid #333",width:"30px",height:"30px",backgroundColor:y}},"")})),y=function(){var e=Object(r.useContext)(b),t=e.graph,n=e.depart,a=e.arrivee,c=e.reset,u=(e.block,e.setBlock),s=Object(r.useState)(Object(r.useRef)([])),l=Object(i.a)(s,2),v=l[0],p=(l[1],Object(r.useState)(!0)),m=Object(i.a)(p,2),y=m[0],g=m[1];Object(r.useEffect)((function(){console.log("changed graph",t),console.log("reset");var e,n=Object(w.a)(v.current);try{for(n.s();!(e=n.n()).done;){var r,o=e.value,a=Object(w.a)(o);try{for(a.s();!(r=a.n()).done;){var c=r.value;c&&(c.resetColor(),c.setCout(0),c.setIsWall(!1))}}catch(i){a.e(i)}finally{a.f()}}}catch(i){n.e(i)}finally{n.f()}}),[t]);var k=function(e,t){return e.heuristique<t.heuristique?-1:e.heuristique===t.heuristique?0:1},E=function(e){return new Promise((function(t){return setTimeout(t,e)}))},C=function(){var e=Object(O.a)(j.a.mark((function e(t){var n,r,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),n=Object(w.a)(t),e.prev=2,n.s();case 4:if((r=n.n()).done){e.next=11;break}return o=r.value,e.next=8,E(200);case 8:v.current[o.coord.x][o.coord.y].setColor("green");case 9:e.next=4;break;case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),n.e(e.t0);case 16:return e.prev=16,n.f(),e.finish(16);case 19:g(!0);case 20:case"end":return e.stop()}}),e,null,[[2,13,16,19]])})));return function(t){return e.apply(this,arguments)}}(),S=function(){g(!1);var e=[],r=[];if(!(-1===n.x&&-1===n.y||-1===a.x&&-1===a.y)){var o=t[n.x][n.y],c=t[a.x][a.y];r.push(o);for(var i=function(){var n=r.shift();if(n.coord.x===c.coord.x&&n.coord.y===c.coord.y)return function(e){for(var t=e,n=[];t.parent;)n.push(t),t=t.parent;C(n.reverse())}(n),{v:void 0};(function(e,n){var r=[];return t[e-1]&&t[e-1][n]&&r.push(t[e-1][n]),t[e+1]&&t[e+1][n]&&r.push(t[e+1][n]),t[e]&&t[e][n-1]&&r.push(t[e][n-1]),t[e]&&t[e][n+1]&&r.push(t[e][n+1]),r})(n.coord.x,n.coord.y).forEach((function(t){e.includes(t)||function(e,t){if(t.includes(e)){var n,r=Object(w.a)(t);try{for(r.s();!(n=r.n()).done;){return n.value.cout<=e.cout}}catch(o){r.e(o)}finally{r.f()}}return!1}(t,r)||t.isWall||(t.cout=n.cout+1,t.heuristique=t.cout+function(e,t){var n=Math.abs(e.coord.x-t.coord.x),r=Math.abs(e.coord.x-t.coord.y);return Math.floor(n+r)}(t,c),t.parent=n,r.push(t),r.sort(k))})),e.push(n)};r.length>0;){var u=i();if("object"===typeof u)return u.v}return[]}},W=function(e){u(e)};return o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("button",{disabled:!y,onClick:function(){return W(f)}},"Depart"),o.a.createElement("button",{disabled:!y,onClick:function(){return W(d)}},"Arrivee"),o.a.createElement("button",{disabled:!y,onClick:function(){return W(h)}},"Wall")),o.a.createElement("div",null,o.a.createElement("table",{className:"Graph",style:{borderSpacing:0}},o.a.createElement("tbody",null,t.map((function(e,t){var n=t,r=[],a=e.map((function(e,t){return o.a.createElement(x,{color:"white",ref:function(e){return r.push(e)},x:n,y:t,key:n+":"+t})}));return v.current.push(r),o.a.createElement("tr",{className:"row",key:t},a)}))))),o.a.createElement("button",{disabled:!y,onClick:function(){return S()}},"Resolve"),o.a.createElement("button",{disabled:!y,onClick:function(){return c()}},"Reset"))};n(17);var g=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(p,null),o.a.createElement(p,null,o.a.createElement(y,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.dd0ee4ed.chunk.js.map