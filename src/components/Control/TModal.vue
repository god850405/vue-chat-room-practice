<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full h-full bg-opacity-70 bg-zinc-900"
        :class="{ flex: config.visible, hidden: !config.visible }">
        <div class="overflow-hidden rounded-xl min-w-[250px]">
            <div
                class="relative p-5 text-2xl font-bold text-green-100 bg-green-400 dark:bg-slate-900 dark:text-zinc-300">
                {{config.title}}
                <button type="button" class="absolute top-0 bottom-0 my-auto text-2xl right-5"
                    @click="config.visible = false">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="px-5 py-8 text-xl bg-white">
                <slot></slot>
            </div>
            <div class="flex justify-center p-2 pt-0 bg-white">
                <div class="w-1/2 p-1" v-if="(config.confirm??true)">
                    <button type="button"
                        class="w-full py-1 text-2xl font-bold text-green-100 duration-300 ease-in-out bg-green-400 dark:bg-slate-900 dark:text-zinc-300 rounded-3xl dark:hover:bg-slate-500 hover:bg-opacity-60"
                        @click="emit('confirm')">
                        確定
                    </button>
                </div>
                <div class="w-1/2 p-1" v-if="(config.cancel??true)">
                    <button type="button"
                        class="w-full py-1 text-2xl font-bold text-green-400 duration-300 border-2 border-green-400 hover:bg-green-400 hover:bg-opacity-30 dark:hover:bg-slate-300 dark:text-slate-900 dark:border-slate-300 rounded-3xl"
                        @click="config.visible = false">
                        關閉
                    </button>
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
const emit = defineEmits(['confirm']);
</script>
