<template>
  <div id="messageBox" class="grow overflow-x-hidden overflow-y-auto bg-white dark:bg-zinc-700">
    <div class="clearfix" v-for="(item, index) in $store.getters.messages" :key="index">
      <div class="w-3/5 mx-4 my-2 p-2 rounded-lg clearfix relative"
           :class="item.name==='Guest'?'bg-green-300 float-right':'bg-gray-300 float-left'">
        <span class="font-bold" v-if="item.name!=='Guest'">{{item.name}}：</span>
        <span class="text-black dark:text-zinc-400 text-xs text-center absolute w-[120px] bottom-0"
              :class="item.name==='Guest'? 'left-[-120px]':'right-[-120px]'">{{item.time}}</span>
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
import { MessageType } from '../../types'
import TAudio from '../TAudio.vue'
import {reactive} from "vue";
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