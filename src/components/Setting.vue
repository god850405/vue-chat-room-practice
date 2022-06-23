<template>
    <TModal :config="config" @confirm="settingConfirm">
        <div class="flex flex-wrap items-center">
            <label class="mr-3 font-bold">暱稱</label>
            <input type="text" class="flex-1 border-2 focus:outline-green-400" />
        </div>
    </TModal>
</template>
<script setup>
import TModal from "./Control/TModal.vue";
import { defineProps, reactive } from 'vue';
const props = defineProps({
    config: Object,
});
const settingConfirm = () =>{
    console.log('confirm');
}
</script>