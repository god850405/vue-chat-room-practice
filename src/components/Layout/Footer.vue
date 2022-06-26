<template>
  <div class="flex justify-between w-full bg-green-100 dark:bg-slate-800" style="bottom: 0;">
    <div class="relative flex items-center">
      <input type="file" accept="image/*" id="choosePhoto" class="hidden" @change="selectingPhoto">
      <label for="choosePhoto" class="flex items-center justify-center mx-2">
        <i class="py-2 ml-2 text-2xl text-green-400 fas fa-images dark:text-zinc-300"></i>
      </label>
      <div v-if="photoPreviewUrl!==''" class="absolute w-[100px] h-[100px] top-[-110px] right-[-60px]
      bg-green-100 border border-green-400 rounded-lg flex justify-center items-center z-[1]
      after:absolute after:content-[''] after:h-[10px] after:w-[10px] after:bottom-[-6px]
      after:left-0 after:right-0 after:mx-auto after:rotate-45 after:z-[-1]
      after:border after:border-green-400 after:bg-green-100 after:border-t-0 after:border-l-0">
        <img class="h-full max-w-full" :src="photoPreviewUrl" alt="preview photo" @click="sendPhoto">
      </div>
    </div>
    <button class="m-2" style="outline: none;"  @click="sendAudio">
      <i class="py-2 mr-2 text-2xl fas fa-microphone-alt"
        :class="recording ? 'text-gray-500 dark:text-green-400' : 'text-green-400 dark:text-zinc-300'"></i>
    </button>
    <textarea
        v-model="message"
        class="flex-grow px-4 py-2 m-2 mr-1 bg-gray-200 border border-gray-300 rounded-full resize-none dark:bg-zinc-500 dark:placeholder:text-zinc-300"
        rows="1"
        placeholder="Message..."
        style="outline: none;"
        @keydown.enter="sendMessage" 
    ></textarea>
    <button class="m-2" style="outline: none;"  @click="sendMessage">
      <i class="py-2 mr-2 text-2xl text-green-400 fas fa-paper-plane dark:text-zinc-300"></i>
    </button>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {Message} from "../../models/Message";
import {Socket} from "../../io/SocketClient";
import {Recorder} from "../../utils/Recorder";
const message = ref('');
const photoPreviewUrl = ref('');
const recording = ref(false);
let socket,msg,record ;
onMounted(()=>{
  socket = new Socket();
  msg = new Message();
  record = new Recorder();
});
const sendMessage = () => {
  socket.post(msg.Text(message.value));
  message.value = '';
}
const sendPhoto = () => {
  socket.post(msg.Photo(photoPreviewUrl.value));
  photoPreviewUrl.value = '';
}
const sendAudio = () => {
  recording.value = record.recording();
  if(!recording.value) {
    record.getDataUrl().then((res)=>{
      socket.post(msg.Audio(res));
      recording.value = false;
    });
  }
}
const selectingPhoto = (e) => {
  const [file] = e.target.files;
  const _fileReader = new FileReader();
  _fileReader.readAsDataURL(file);
  _fileReader.onload = (e => {
    photoPreviewUrl.value = e.target.result;
  });
}
</script>
