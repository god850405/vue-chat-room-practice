<template>
    <TModal :config="config">
        <div class="px-5 py-8 text-xl bg-white">
            <TTable :config="tableConfig" @action="handleTableAction"></TTable>
        </div>
    </TModal>
</template>
<script setup>
import { defineProps, reactive, watch } from 'vue';
import TModal from "./Control/TModal.vue";
import TTable from "./Control/TTable.vue";
import {socket} from "../io/SocketClient";
const props = defineProps({
    config: Object,
});

const tableConfig = reactive({
    data:[],
    loading:false
});

const handleTableAction = ({action,data}) =>{
    switch (action) {
        case "enter":socket.join(data,'');break;
        case "edit":break;
        case "create":break;
        default:break;
    }
}

watch(()=>props.config.visible,(val)=>{
    if(val){
        fetch(import.meta.env.VITE_SOCKET_URL +'getRoom')
        .then(res => {
            res.json().then(data=>{
                tableConfig.data = data;
            })
        });
    }
});
</script>