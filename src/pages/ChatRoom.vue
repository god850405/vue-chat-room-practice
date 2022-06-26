<template>
    <div class="flex flex-col w-full h-full">
        <Header></Header>
        <MessageBox></MessageBox>
        <Footer></Footer>
    </div>
</template>
<script setup>
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";
import MessageBox from "../components/Layout/MessageBox.vue";
</script>