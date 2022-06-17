<template>
  <div class="flex justify-between items-center px-4">
    <button type="button" class="mr-2" @click="playAudio">
      <i class="fas fa-play"></i>
    </button>
    <span>{{currentTime}}</span>
    <div class="border grow border-black mx-2"></div>
    <span>{{duration}}</span>
  </div>
</template>
<script setup>
import {defineProps, watch, computed, ref, onMounted} from 'vue'
const props = defineProps({
  source: String
});
let audio;
const currentTime = ref('00:00');
const duration = ref('00:00');

onMounted(()=>{
  audio = new Audio(props.source);
  audio.ondurationchange = ()=>{
    duration.value = convertTime(audio.duration);
    currentTime.value = convertTime(audio.currentTime);
  }
  audio.ontimeupdate = () => {
    duration.value = convertTime(audio.duration);
    currentTime.value = convertTime(audio.currentTime);
  };
});
const playAudio = ()=>{
  audio.play();
}
const convertTime = (time)=>{
  if(!typeof(time) == 'number' || time == NaN || time === Infinity){
    return '00:00';
  }
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = '0' + String(min);
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = '0' + String(sec);
  }
  return min + ':' + sec;
}
</script>