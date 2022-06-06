<script setup>
import { io } from "socket.io-client";
import {onMounted,ref ,reactive} from "vue";
let history = reactive({messages:[]});
let messages = reactive({
  name:'Guest',
  message:'',
  type:'text',
  time:''
});
let typing = ref(false);
let socket = null;
onMounted(()=>{
  socket = io('https://zihchat.herokuapp.com/');
  // 進入聊天室時，會收到之前的全部訊息，並更新到 history.messages
  socket.on("allMessage", obj => {
    history.messages = obj;
  })

  // 設定接收到新訊息的監聽器
  socket.on("newMessage", obj => {
    history.messages.push(obj);
  })

  socket.on("someoneIsTyping", value => {
    typing.value = value;
  })
});
function sendMessage() {
  messages.time=ToDateTime(new Date());
  socket.emit("sendMessage", messages)
  messages.message = ""
}
function sendTyping() {
  socket.emit("sendTyping")
}
function ToDateTime(date,separate=`-`){
  const result = new Date(date);
  const _yyyy = result.getFullYear();
  const _MM = result.getMonth()+1;const MM = PadLeft(_MM,2,'0');
  const _dd = result.getDate();const dd = PadLeft(_dd,2,'0');
  const _hh = result.getHours();const hh = PadLeft(_hh,2,'0');
  const _mm = result.getMinutes();const mm = PadLeft(_mm,2,'0');
  const _ss = result.getSeconds();const ss = PadLeft(_ss,2,'0');
  return `${_yyyy}${separate}${MM}${separate}${dd} ${hh}:${mm}:${ss}`;
}
function PadLeft(self,n , str){
  if (typeof(n) !=='number' || isNaN(n)) return '';
  let selfStr = `${self}`;
  let leftStr = '';
  for (let i =0 ; i<5 ;i++){
    leftStr += str;
  }
  return (leftStr + selfStr).slice(-n);
}
function open(src) {
  var win = window.open();
  win.document.write(
      '<iframe src="' +
      src +
      '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  );
}
</script>

<template>
  <div class="h-full w-full overflow-auto">
    <div style="overscroll-behavior: none;">
      <div
          class="fixed w-full bg-green-400 h-16 pt-2 text-white flex justify-between shadow-md z-[1]"
          style="top:0; overscroll-behavior: none;">
        <!-- back button -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-12 h-12 my-1 text-green-100 ml-2"
        >
          <path
              class="text-green-100 fill-current"
              d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
          />
        </svg>
        <div class="my-3 text-green-100 font-bold text-lg tracking-wide">
          Socket.io Practice
          <span v-if="typing">輸入中...</span>
        </div>
        <!-- 3 dots -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-dots-vertical w-8 h-8 mt-2 mr-2"
        >
          <path
              class="text-green-100 fill-current"
              fill-rule="evenodd"
              d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          />
        </svg>
      </div>
      <div class="mt-20 mb-16 overflow-x-hidden overflow-y-auto">
        <div class="clearfix" v-for="(item, index) in history.messages" :key="index">
          <div class="w-3/5 mx-4 my-2 p-2 rounded-lg clearfix relative"
               :class="item.name==='Guest'?'bg-green-300 float-right':'bg-gray-300 float-left'">
            <span class="font-bold" v-if="item.name!=='Guest'">{{item.name}}：</span>
            <template v-if="item.type==='photo'">
              <img :src="item.message" class="w-full" @click="open(item.message)" alt="pic">
            </template>
            <template v-if="item.type==='text'">{{item.message}}</template>
            <span class="text-xs text-center absolute w-[120px] bottom-0"
            :class="item.name==='Guest'? 'left-[-120px]':'right-[-120px]'">{{item.time}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed w-full flex justify-between bg-green-100" style="bottom: 0;">
      <textarea
          v-model="messages.message"
          class="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
          rows="1"
          placeholder="Message..."
          style="outline: none;"
          @keydown.enter="sendMessage" @keypress="sendTyping"
      ></textarea>
      <button class="m-2" style="outline: none;"  @click="sendMessage">
        <svg
            class="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="paper-plane"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
          <path
              fill="currentColor"
              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>


