<template>
  <div id="messageBox" class="overflow-x-hidden overflow-y-auto bg-white grow dark:bg-zinc-700">
    <div class="flex" v-for="(item, index) in $store.getters.messages" :key="index">
      <div v-if="item.userName==='notification'"
        class="w-auto px-3 py-1 mx-auto my-2 text-sm text-center bg-gray-400 text-slate-800 rounded-2xl dark:text-slate-300 bg-opacity-30">
          {{item.message}}
      </div>
      <div v-else class="flex w-full mx-4 my-2" 
        :class=" item.userName===$store.state.userName?
            `justify-end`:`justify-start`">
        <div class="relative flex p-2 font-bold rounded-lg"
            style="max-width:calc(100% - 150px);"
            :class=" item.userName===$store.state.userName?
            `bg-green-300`:`bg-gray-300`">
          <div v-if="item.userName!==$store.state.userName">
            {{item.userName}}：
          </div>
          <div class="flex-1">
            <template v-if="item.type===MessageType.TEXT">
              {{item.message}}
            </template>
            <template v-else-if="item.type===MessageType.PHOTO">
              <img :src="item.message" class="w-full" @click="open(item.message)" alt="pic">
            </template>
            <template v-else-if="item.type===MessageType.AUDIO">
              <TAudio :source="item.message"></TAudio>
            </template>
          </div>
          <span class="text-black dark:text-zinc-400 text-xs text-center absolute w-[120px] bottom-0"
                :class="item.userName===$store.state.userName? 'left-[-130px]':'right-[-130px]'">
                {{item.time}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
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