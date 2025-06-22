<template>
  <div v-if="totalPages > 1" class="flex flex-col sm:flex-row justify-between items-center py-4 px-4 bg-white shadow-md rounded-b-xl border-t border-gray-100">
    <div class="text-sm text-gray-600 mb-4 sm:mb-0">
      Mostrando <span class="font-semibold">{{ from }}</span> a <span class="font-semibold">{{ to }}</span> de <span class="font-semibold">{{ total }}</span> tareas
    </div>

    <nav class="flex items-center space-x-2">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
        class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
        :class="{
          'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700': page === currentPage,
          'bg-white text-gray-700 border-gray-300 hover:bg-gray-50': page !== currentPage
        }"
        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg transition-colors duration-200">
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
        class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  </div>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  from: {
    type: Number,
    default: 0
  },
  to: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['page-changed']);

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-changed', page);
  }
};

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5; 

  let startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);

  // Ajustar startPage si endPage es demasiado lejos de totalPages
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});
</script>