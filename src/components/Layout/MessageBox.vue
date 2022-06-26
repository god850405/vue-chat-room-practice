<template>
  <div id="messageBox" class="overflow-x-hidden overflow-y-auto bg-white grow dark:bg-zinc-700">
    <div class="clearfix" v-for="(item, index) in $store.getters.messages" :key="index">
      <div class="relative clearfix w-3/5 p-2 mx-4 my-2 rounded-lg"
            :class="item.userName==='Guest'?'bg-green-300 float-right':'bg-gray-300 float-left'">
        <span class="font-bold" v-if="item.userName!=='Guest'">{{item.userName}}：</span>
        <span class="text-black dark:text-zinc-400 text-xs text-center absolute w-[120px] bottom-0"
              :class="item.userName==='Guest'? 'left-[-120px]':'right-[-120px]'">{{item.time}}</span>
        <template v-if="item.type===MessageType.PHOTO">
          <img :src="item.message" class="w-full" @click="open(item.message)" alt="pic">
        </template>
        <template v-if="item.type===MessageType.TEXT">{{item.message}}</template>
        <template v-if="item.type===MessageType.AUDIO">
          <TAudio :source="item.message"></TAudio>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { MessageType } from '../../types';
import TAudio from '../Control/TAudio.vue';
const $store = useStore();
const open = (src) => {
  var win = window.open();
  win.document.write(
      '<iframe src="' +
      src +
      '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  );
}
</script>