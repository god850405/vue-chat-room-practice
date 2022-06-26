<template>
    <TModal :config="config">
        <TTable :config="tableConfig" @action="handleTableAction"></TTable>
    </TModal>
</template>
<script setup>
import { defineProps, reactive, watch } from 'vue';
import TModal from "./Control/TModal.vue";
import TTable from "./Control/TTable.vue";
const props = defineProps({
    config: Object,
});

const tableConfig = reactive({
    columns:[
        {prop: "", label: "", type: "operate",
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

const handleTableAction = (val) =>{
    switch (val) {
        case "enter":break;
        case "exit":break;
        case "edit":break;
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