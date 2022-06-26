<template>
<div class="w-full h-full" :class="$store.getters.darkMode ? 'dark':'' ">
  <router-view></router-view>
</div>
</template>
<script setup>
import { useStore } from "vuex";
const $store = useStore();

</script>
