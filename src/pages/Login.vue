<template>
    <div class="flex flex-col items-center justify-center w-full h-full bg-zinc-200">
        <div class="w-11/12 p-5 bg-white rounded-lg shadow-lg md:w-auto md:p-10">
            <div class="flex my-2 text-xl">
                <label class="mr-3 font-bold">暱稱</label>
                <input v-model="userName" type="text" class="flex-1 text-center border-2 focus:outline-green-400" />
            </div>
            <div class="flex justify-center">
                <button type="button" @click="submit()"
                    class="w-full py-1 my-2 text-2xl font-bold text-green-100 duration-300 ease-in-out bg-green-400 dark:bg-slate-900 dark:text-zinc-300 rounded-3xl dark:hover:bg-slate-500 hover:bg-opacity-60">
                    <i class="fas fa-sign-in"></i>
                    加入
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from 'vuex';
import {socket} from "../io/SocketClient";

const $store = useStore();
const userName = ref('');

function submit() {
    if (userName.value !== '' && userName.value !== undefined) {
        fetch(import.meta.env.VITE_SOCKET_URL +`checkUserName/${userName.value}`)
        .then(res => {
            res.json().then(exist=>{
                if(exist){
                    alert('暱稱已存在');
                }else{
                    socket.addUser(userName.value);
                    $store.commit('setUserName', userName.value);
                }
            })
        });
    }
    else {
        alert('請輸入使用者名稱');
    }
}
</script>