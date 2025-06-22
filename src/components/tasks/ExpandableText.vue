<template>
    <div :class="textClass">
        <template v-if="!text">
            <span class="text-gray-400 italic">Sin {{ label }}</span>
        </template>

        <template v-else-if="text.length <= limit">
            <span class="break-words">{{ text }}</span>
        </template>

        <template v-else>
        <div v-if="!isExpanded">
            <span class="break-words">{{ text.substring(0, truncatedLength) }}...</span>
            <button @click="toggleExpand" :class="buttonClass">
            Ver más
            <svg v-if="!iconHidden" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            </button>
        </div>

        <div v-else>
            <div class="mb-1 break-words">{{ text }}</div>
            <button @click="toggleExpand" :class="buttonClass">
            Ver menos
            <svg v-if="!iconHidden" class="w-4 h-4 ml-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            </button>
        </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    text: {
        type: String, 
        default: ''
    },
    limit: { 
        type: Number,
        default: 100
    },
    truncatedLength: { 
        type: Number,
        default: 80
    },
    textClass: { 
        type: String,
        default: 'text-sm text-gray-600'
    },
    buttonClass: {
        type: String,
        default: 'ml-1 text-indigo-600 hover:text-indigo-800 font-medium text-xs underline whitespace-nowrap'
    },
    label: { 
        type: String,
        default: 'texto'
    },
    iconHidden: {
        type: Boolean,
        default: false
    }
});

const isExpanded = ref(false);

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};
</script>