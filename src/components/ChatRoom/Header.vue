<template>
  <div class="w-full dark:bg-slate-900 bg-green-400 h-16 flex justify-between shadow-md">
    <button class="text-green-100 dark:text-zinc-300 hover:outline rounded-lg m-2 px-3">
      <i class="fas fa-cog text-2xl"></i>
    </button>
    <div class="my-3 text-green-100 dark:text-zinc-300 font-bold text-lg tracking-wide flex items-center">
      Socket.io Practice
    </div>
    <button class="text-green-100 dark:text-zinc-300 hover:outline rounded-lg m-2 px-3"
            @click="toggleDarkMode(!$store.getters.darkMode)">
      <i v-if="$store.getters.darkMode" class="fas fa-moon text-2xl"></i>
      <i v-if="!$store.getters.darkMode" class="fas fa-sun text-2xl"></i>
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const $store = useStore();
const toggleDarkMode = (val)=>{
  $store.commit('setDarkMode',val)
}
</script>