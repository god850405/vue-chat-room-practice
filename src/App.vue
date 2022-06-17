<template>
  <div class="h-full w-full flex flex-col" :class="$store.getters.darkMode ? 'dark':'' ">
    <Header></Header>
    <MessageBox></MessageBox>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Header from "./components/ChatRoom/Header.vue";
import Footer from "./components/ChatRoom/Footer.vue";
import MessageBox from "./components/ChatRoom/MessageBox.vue";
import { useStore } from "vuex";
const $store = useStore();
</script>


