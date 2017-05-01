webpackJsonp([22,54],{60:function(t,e){"use strict";function n(t){var e=new Blob([t],{type:"text/plain"});return e}function o(t){var e=new Blob(t),n=new FileReader;n.readAsText(e,"utf-8"),n.onload=function(t){return console.info(n.result),n.result}}function s(t){var e=new FileReader;e.readAsText(t,"utf-8"),e.onload=function(t){return console.info(e.result),e.result}}function a(t){var e=new FileReader;e.readAsArrayBuffer(t),e.onload=function(t){return console.info(e.result),e.result}}Object.defineProperty(e,"__esModule",{value:!0}),e.String2Blob=n,e.TypeArray2Blob=o,e.Blob2String=s,e.Blob2ArrayBuffer=a},62:function(t,e,n){var o,s,a;!function(n,c){s=[],o=c,a="function"==typeof o?o.apply(e,s):o,!(void 0!==a&&(t.exports=a))}(this,function(){function t(e,n,o){function s(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}var a={debug:!1,automaticOpen:!0,reconnectInterval:1e3,maxReconnectInterval:3e4,reconnectDecay:1.5,timeoutInterval:2e3,maxReconnectAttempts:null};o||(o={});for(var c in a)"undefined"!=typeof o[c]?this[c]=o[c]:this[c]=a[c];this.url=e,this.reconnectAttempts=0,this.readyState=WebSocket.CONNECTING,this.protocol=null;var i,r=this,u=!1,l=!1,d=document.createElement("div");d.addEventListener("open",function(t){r.onopen(t)}),d.addEventListener("close",function(t){r.onclose(t)}),d.addEventListener("connecting",function(t){r.onconnecting(t)}),d.addEventListener("message",function(t){r.onmessage(t)}),d.addEventListener("error",function(t){r.onerror(t)}),this.addEventListener=d.addEventListener.bind(d),this.removeEventListener=d.removeEventListener.bind(d),this.dispatchEvent=d.dispatchEvent.bind(d),this.open=function(e){if(i=new WebSocket(r.url,n||[]),e){if(this.maxReconnectAttempts&&this.reconnectAttempts>this.maxReconnectAttempts)return}else d.dispatchEvent(s("connecting")),this.reconnectAttempts=0;(r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","attempt-connect",r.url);var o=i,a=setTimeout(function(){(r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","connection-timeout",r.url),l=!0,o.close(),l=!1},r.timeoutInterval);i.onopen=function(n){clearTimeout(a),(r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onopen",r.url),r.protocol=i.protocol,r.readyState=WebSocket.OPEN,r.reconnectAttempts=0;var o=s("open");o.isReconnect=e,e=!1,d.dispatchEvent(o)},i.onclose=function(n){if(clearTimeout(a),i=null,u)r.readyState=WebSocket.CLOSED,d.dispatchEvent(s("close"));else{r.readyState=WebSocket.CONNECTING;var o=s("connecting");o.code=n.code,o.reason=n.reason,o.wasClean=n.wasClean,d.dispatchEvent(o),e||l||((r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onclose",r.url),d.dispatchEvent(s("close")));var a=r.reconnectInterval*Math.pow(r.reconnectDecay,r.reconnectAttempts);setTimeout(function(){r.reconnectAttempts++,r.open(!0)},a>r.maxReconnectInterval?r.maxReconnectInterval:a)}},i.onmessage=function(e){(r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onmessage",r.url,e.data);var n=s("message");n.data=e.data,d.dispatchEvent(n)},i.onerror=function(e){(r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","onerror",r.url,e),d.dispatchEvent(s("error"))}},1==this.automaticOpen&&this.open(!1),this.send=function(e){if(i)return(r.debug||t.debugAll)&&console.debug("ReconnectingWebSocket","send",r.url,e),i.send(e);throw"INVALID_STATE_ERR : Pausing to reconnect websocket"},this.close=function(t,e){"undefined"==typeof t&&(t=1e3),u=!0,i&&i.close(t,e)},this.refresh=function(){i&&i.close()}}if("WebSocket"in window)return t.prototype.onopen=function(t){},t.prototype.onclose=function(t){},t.prototype.onconnecting=function(t){},t.prototype.onmessage=function(t){},t.prototype.onerror=function(t){},t.debugAll=!1,t.CONNECTING=WebSocket.CONNECTING,t.OPEN=WebSocket.OPEN,t.CLOSING=WebSocket.CLOSING,t.CLOSED=WebSocket.CLOSED,t})},584:function(t,e,n){e=t.exports=n(3)(),e.push([t.id,"","",{version:3,sources:[],names:[],mappings:"",file:"websocket.vue",sourceRoot:"webpack://"}])},646:function(t,e,n){var o=n(584);"string"==typeof o&&(o=[[t.id,o,""]]);n(4)(o,{});o.locals&&(t.exports=o.locals)},776:function(t,e,n){n(646);var o=n(5)(n(1376),n(832),null,null);t.exports=o.exports},832:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"text-align":"center"}},[n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.socket_init}},[t._v("连接socket")]),t._v(" "),n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:t.disconnect}},[t._v("断开socket")]),t._v(" "),t.conn_status?n("input",{attrs:{value:"已经连接"}}):n("input",{attrs:{value:"已经断开"}}),t._v(" "),n("div",{staticStyle:{width:"800px",height:"300px","margin-left":"50%",transform:"translateX(-50%)"}},[n("label",{attrs:{for:"module"}},[t._v("module")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.yaf.module,expression:"yaf.module"}],attrs:{id:"module"},domProps:{value:t.yaf.module},on:{input:function(e){e.target.composing||(t.yaf.module=e.target.value)}}}),t._v(" "),n("label",{attrs:{for:"controller"}},[t._v("controller")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.yaf.controller,expression:"yaf.controller"}],attrs:{id:"controller"},domProps:{value:t.yaf.controller},on:{input:function(e){e.target.composing||(t.yaf.controller=e.target.value)}}}),t._v(" "),n("label",{attrs:{for:"action"}},[t._v("action")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.yaf.action,expression:"yaf.action"}],attrs:{id:"action"},domProps:{value:t.yaf.action},on:{input:function(e){e.target.composing||(t.yaf.action=e.target.value)}}}),t._v(" "),n("input",{attrs:{id:"send",value:"提交",type:"button"},on:{click:t.send}})]),t._v(" "),n("hr"),t._v(" "),n("div",{staticStyle:{width:"800px",height:"300px","margin-left":"50%",transform:"translateX(-50%)"}},[t._v("\n          "+t._s(t.socket_response)+"\n    ")])])},staticRenderFns:[]}},1312:function(t,e,n){(function(t){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=n(38),a=o(s),c=n(60),i=n(62),r=o(i),u={data:{wSock:null,to:"",message:null,payload:null,wsserver:"ws://iamsee.com:9501",response:"",this_vue:null,conn_status:!1,status:"暂未连接到服务器",check_socket_status:""},init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.copyright(),this.data.conn_status||this.ws(t)},ws:function(t){console.log("准备连接到服务器=>"),clearInterval(this.data.check_socket_status),this.data.wSock=new r.default("ws://iamsee.com:9501/?unique_auth_code="+t),this.wsOpen(),this.wsMessage(),this.wsOnclose(),this.wsOnerror()},wsSend:function(){var t=(0,c.String2Blob)((0,a.default)(this.data.payload));this.data.wSock.send(t)},wsClose:function(){console.log("关闭连接"),this.data.wSock.close()},wsOpen:function(){var t=this;this.data.wSock.onopen=function(e){t.data.status="连接正常",t.data.conn_status=!0,u.print("wsopen",e),t.data.this_vue.$root.eventHub.$emit("conn_status",t.data.conn_status)}},wsMessage:function(){var e=this;this.data.wSock.onmessage=function(n){var o=new FileReader;o.readAsText(n.data,"utf-8"),o.onload=function(s){n.datastr=o.result;var a=t.parseJSON(n.datastr);a.status,a.type;e.data.this_vue.$root.eventHub.$emit("socket_response",a)}}},wsOnclose:function(){var t=this;this.data.wSock.onclose=function(e){console.log("[c]close=>"),console.log(e),t.data.conn_status=!1,t.data.this_vue.$root.eventHub.$emit("conn_status",t.data.conn_status)}},wsOnerror:function(){this.data.wSock.onerror=function(t){console.log("[c]error=>"),console.log(t)}},print:function(t,e){console.log("----"+t+" start-------"),console.log(e),console.log("----"+t+" end-------")},copyright:function(){"连接正常"!==this.data.status&&(this.data.status="truesign ico pre connect to socket server ……",console.log(this.data.status))},loopCheckStatus:function(){}};e.default=u}).call(e,n(9))},1376:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=n(1312),a=o(s);e.default={mounted:function(){var t=this;this.$root.eventHub.$on("socket_response",function(e){console.log("socket_response",e),t.socket_response=e}),this.$root.eventHub.$on("conn_status",function(e){t.conn_status=e})},data:function(){return{conn_status:!1,yaf:{module:"index",controller:"index",action:"test"},socket_response:"..."}},computed:{},methods:{socket_init:function(){a.default.data.this_vue=this,a.default.init()},disconnect:function(){a.default.wsClose()},send:function(){var t={to:null,payload_type:"test",payload_data:{},yaf:this.yaf};a.default.data.payload=t,a.default.wsSend()}}}}});
//# sourceMappingURL=22.28829e4aefaa2082bf4a.js.map