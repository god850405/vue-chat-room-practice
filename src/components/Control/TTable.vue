<template>
<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <table class="min-w-full">
        <thead class="bg-white border-b">
            <tr>
                <th scope="col" class="px-6 py-4 text-sm font-medium text-left text-gray-900"
                    v-for="(col,index) in config.columns" :key="index">
                    {{col.label}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="transition duration-300 ease-in-out bg-white border-b hover:bg-gray-100"
                v-for="(val,i) in config.data" :key="i">
                <td class="px-6 py-4 text-sm font-medium text-center text-gray-900 whitespace-nowrap"
                    v-for="(col,j) in config.columns" :key="j">
                    <template v-if="col.type==='text'">
                        {{val[col.prop]}}
                    </template>
                    <template v-else-if="col.type==='operate'">
                        <button type="button"
                                class="px-2 py-1 mx-1 text-sm font-bold duration-300 ease-in-out rounded-full" 
                                :class="{ 'text-green-100  bg-green-400 dark:bg-slate-900 dark:text-zinc-300 dark:hover:bg-slate-500 hover:bg-opacity-60':operation.type==='success',
            'text-green-400 border-green-400 hover:bg-green-400 hover:bg-opacity-30 dark:hover:bg-slate-300 dark:text-slate-900 dark:border-slate-300 border-2':operation.type==='danger'}"
                            
                            v-for="(operation, index) in col.operations" :key="index">
                            <i :class="operation.icon"></i>
                            {{operation.text}}
                        </button>
                    </template>
                    <template v-else-if="col.type==='btn'">
                        <button type="button" :class="col.btn.class"
                                class="px-2 py-1 mx-1 text-sm font-bold duration-300 ease-in-out rounded-full text-slate-900 " 
                        >
                            <i :class="col.btn.icon"></i>
                            {{col.btn.text}}
                        </button>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    config: Object,
});
const emit = defineEmits(['action']);

</script>