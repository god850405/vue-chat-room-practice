<template>
    <TModal :config="config" @confirm="chatRoomConfirm">
        <div class="flex flex-wrap items-center my-1">
            <label class="mr-3 font-bold">聊天室代碼</label>
            <input type="text" class="flex-1 border-2 focus:outline-green-400" />
        </div>
        <div class="flex flex-wrap items-center my-1">
            <label class="mr-3 font-bold">聊天室密碼</label>
            <input type="text" class="flex-1 border-2 focus:outline-green-400" />
        </div>        
        <button type="button"
            class="w-full py-1 my-2 text-2xl font-bold text-green-100 duration-300 ease-in-out bg-green-400 dark:bg-slate-900 dark:text-zinc-300 rounded-3xl dark:hover:bg-slate-500 hover:bg-opacity-60"
            >
            加入
        </button>
        <TTable :config="tableConfig"></TTable>
    </TModal>
</template>
<script setup>
import { defineProps, reactive } from 'vue';
import TModal from "./Control/TModal.vue";
import TTable from "./Control/TTable.vue";

const props = defineProps({
    config: Object,
});
const chatRoomConfirm = () =>{
    console.log('confirm');
}

const tableConfig = reactive({
    columns:[
        '編號','聊天室','密碼','在線人數','室長'
    ],
    data:[
        {
            編號:'1001',
            聊天室:'聊天室 1',
            密碼:'0000',
            在線人數:'8',
            室長:'小明'
        },
        {
            編號:'1002',
            聊天室:'聊天室 2',
            密碼:'8888',
            在線人數:'15',
            室長:'大華'
        }
    ]
});
</script>