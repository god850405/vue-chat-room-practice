<template>
    <TModal :config="config" @confirm="settingConfirm">
        <div class="px-5 py-8 text-xl bg-white">
            <div class="flex flex-wrap items-center">
                <label class="mr-3 font-bold">暱稱</label>
                <input disabled v-model="userName" type="text" class="flex-1 text-center border-2 focus:outline-green-400 bg-slate-200"/>
            </div>
        </div>
    </TModal>
</template>
<script setup>
import { useStore } from "vuex";
import TModal from "./Control/TModal.vue";
import { defineProps, onMounted, reactive, ref } from 'vue';
const $store = useStore();
const props = defineProps({
    config: Object,
});
const settingConfirm = () =>{
    $store.commit('clearUserName');
}
const userName = ref('');
onMounted(()=>{
    userName.value = $store.state.userName;
});
</script>