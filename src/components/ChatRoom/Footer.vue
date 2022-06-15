<template>
  <div class="w-full flex justify-between bg-green-100" style="bottom: 0;">
    <div class="relative flex items-center">
      <input type="file" accept="image/*" id="choosePhoto" class="hidden" @change="selectingPhoto">
      <label for="choosePhoto" class="flex justify-center items-center mx-2">
        <i class="fas fa-images text-green-400 text-2xl py-2 ml-2"></i>
      </label>
      <div v-if="photoPreviewUrl!==''" class="absolute w-[100px] h-[100px] top-[-110px] right-[-60px]
      bg-green-100 border border-green-400 rounded-lg flex justify-center items-center z-[1]
      after:absolute after:content-[''] after:h-[10px] after:w-[10px] after:bottom-[-6px]
      after:left-0 after:right-0 after:mx-auto after:rotate-45 after:z-[-1]
      after:border after:border-green-400 after:bg-green-100 after:border-t-0 after:border-l-0">
        <img class="h-full max-w-full" :src="photoPreviewUrl" alt="preview photo" @click="sendPhoto">
      </div>
    </div>
    <textarea
        v-model="message"
        class="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
        rows="1"
        placeholder="Message..."
        style="outline: none;"
        @keydown.enter="sendMessage" @keypress="sendTyping"
    ></textarea>
    <button class="m-2" style="outline: none;"  @click="sendMessage">
      <i class="fas fa-paper-plane text-green-400 text-2xl py-2 mr-2"></i>
    </button>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Message} from "../../models/Message";
import {Socket} from "../../io/SocketClient";

const message = ref('');
const photoPreviewUrl = ref('');
let socket,msg ;
onMounted(()=>{
  socket = new Socket();
  msg = new Message();
});

const sendMessage = () => {
  socket.sendMessage(msg.Text(message.value));
  message.value = '';
}
const sendPhoto = () => {
  socket.sendMessage(msg.Photo(photoPreviewUrl.value));
  photoPreviewUrl.value = '';
}
const sendTyping = () => socket.sendTyping();

const selectingPhoto = (e) => {
  const [file] = e.target.files;
  const _fileReader = new FileReader();
  _fileReader.readAsDataURL(file);
  _fileReader.onload = (e => {
    photoPreviewUrl.value = e.target.result;
  })
}
</script>
