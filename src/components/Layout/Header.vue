<template>
  <div class="flex justify-between w-full h-16 bg-green-400 shadow-md dark:bg-slate-900">
    <button class="px-3 m-2 text-green-100 rounded-lg dark:text-zinc-300 hover:outline"
      @click="settingConfig.visible = true;">
      <i class="text-2xl fas fa-cog"></i>
    </button>
    <div class="flex items-center my-3 text-2xl font-bold tracking-wide text-green-100 dark:text-zinc-300">
      {{$store.getters.currentRoom}}
      <button type="button" class="px-2 mx-1 rounded focus:outline"
      @click="chatRoomConfig.visible = true">
        <i class="fas fa-caret-down"></i>
      </button>
    </div>
    <button class="px-3 m-2 text-green-100 rounded-lg dark:text-zinc-300 hover:outline"
            @click="toggleDarkMode(!$store.getters.darkMode)">
      <i v-if="$store.getters.darkMode" class="text-2xl fas fa-moon"></i>
      <i v-if="!$store.getters.darkMode" class="text-2xl fas fa-sun"></i>
    </button>
    <Setting :config="settingConfig"></Setting>
    <ChatRoom :config="chatRoomConfig"></ChatRoom>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import Setting from "../Setting.vue";
import ChatRoom from "../ChatRoom.vue";
const $store = useStore();
const toggleDarkMode = (val)=>{
  $store.commit('setDarkMode',val)
}

const settingConfig = reactive({
  visible:false,
  title:'聊天設定',
  confirmText:'離開'
});

const chatRoomConfig = reactive({
  visible:false,
  title:'聊天室',
  confirm:false
});

</script>