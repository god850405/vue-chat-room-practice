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
        <button type="button" @click="joinRoom"
            class="w-full py-1 my-2 text-2xl font-bold text-green-100 duration-300 ease-in-out bg-green-400 dark:bg-slate-900 dark:text-zinc-300 rounded-3xl dark:hover:bg-slate-500 hover:bg-opacity-60"
            >
            <i class="fas fa-sign-in"></i>
            加入
        </button>
        <TTable :config="tableConfig"></TTable>
    </TModal>
</template>
<script setup>
import { defineProps, reactive, watch } from 'vue';
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
        {prop: "", label: "",  type: "operate",
        operations: [
            {action: "enter",key:'roomNo',type: "success", text: "進入", icon: "fas fa-sign-in-alt"},
            {action: "exit",key:'roomNo',type: "danger", text: "離開", icon: "fas fa-sign-out-alt"},
        ]},
        {prop: "roomID", label: "編號",  type: "text"},
        {prop: "title", label: "聊天室",  type: "text"},
        {prop: "count", label: "人數",  type: "text"},
        {prop: "owner", label: "室長",  type: "text"},
        {prop: "", label: "",  type: "btn", 
            btn:{action: "edit", key:'roomNo', class: "bg-amber-300",  text: "編輯",  icon: "fas fa-edit"}
        },
    ],
    data:[],
    loading:false
});

watch(()=>props.config.visible,(val)=>{
    console.log(val);
});
</script>