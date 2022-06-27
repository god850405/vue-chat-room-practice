<template>
<div class="overflow-y-auto">
    <div v-for="(room,index) in config.data" :key="index" 
        class="flex flex-col p-5 my-2 shadow-md rounded-2xl bg-slate-200">
        <div class="flex">
            <span class="flex-1 text-2xl font-bold text-left text-slate-700">
                {{room.title}}
                <span class="px-2 py-1 text-sm text-slate-100 rounded-xl bg-slate-500">
                    {{room.roomID}}
                </span>
            </span>
        </div>
        <div class="flex py-2">
            <div class="flex flex-col text-sm font-bold">
                <div>                    
                    <span>人數：</span>
                    <span>{{room.count}}</span>
                </div>
                <div>                    
                    <span>室長：</span>
                    <span>{{room.owner}}</span>
                </div>
            </div>
            <div class="flex justify-end flex-1">
                <button  @click="emit('action',{action:'enter',data:room.roomID})"
                    type="button" class="px-5 py-1 text-sm font-bold duration-300 ease-in-out bg-green-400 dark:bg-slate-900 dark:text-zinc-300 rounded-3xl dark:hover:bg-slate-500 hover:bg-opacity-60">加入</button>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    config: Object,
});
const emit = defineEmits(['action']);
</script>