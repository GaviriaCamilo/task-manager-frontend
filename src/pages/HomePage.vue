<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center py-6 gap-3 sm:gap-4 w-full px-4 sm:px-0">
          <div class="relative w-full sm:max-w-sm sm:mr-4"> <input type="text" v-model="searchQuery" placeholder="Buscar tareas por título o descripción" class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 text-gray-700 hover:border-indigo-400 focus:outline-none" @input="loadTasksDebounced"/>
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button @click="openCreateModal" class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white
                        bg-gradient-to-r from-indigo-500 to-purple-600 border border-transparent rounded-lg
                        shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                        transition-all duration-200 transform hover:scale-105 active:scale-95">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Nueva Tarea
              </button>

              <button
                @click="exportPdf"
                class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white
                        bg-gradient-to-r from-green-500 to-teal-600 border border-transparent rounded-lg
                        shadow-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500
                        transition-all duration-200 transform hover:scale-105 active:scale-95">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v4m14 0h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2zM5 13h10a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3a1 1 0 011-1zM7 16a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Exportar PDF
              </button>
          </div>
        </div>
      </div>
    </div>

    <ModalCreateTask v-if="showModal" v-model="showModal" :loading="modalLoading" :formData="modalFormData" :mode="modalMode" @submit="handleSubmit"/>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading && tasks.length === 0" class="flex justify-center items-center py-20">
        <div class="flex items-center gap-3">
          <svg class="animate-spin w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-lg text-gray-600">Cargando tareas...</span>
        </div>
      </div>
      <TaskTable v-else :tasks="tasks" @toggle="handleToggleTask" @delete="handleDeleteTask" @edit="handleEditTask"/>
      
      <PaginationControls
        :current-page="pagination.currentPage"
        :total-pages="pagination.lastPage"
        :total="pagination.total"
        :from="pagination.from"
        :to="pagination.to"
        @page-changed="handlePageChange"
      />
    </div>

    <div v-if="toast.show" class="fixed top-4 right-4 z-50">
      <div :class="{ 'bg-green-500': toast.type === 'success', 'bg-red-500': toast.type === 'error', 'bg-blue-500': toast.type === 'info'}"
        class="px-6 py-4 rounded-lg shadow-lg text-white max-w-sm"
      >
        <div class="flex items-center gap-3">
          <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="font-medium">{{ toast.message }}</span>
        </div>
      </div>
    </div>

    <ModalDeleteTask v-if="showDeleteModal" @confirm="confirmDelete" @cancel="showDeleteModal = false"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import taskService from '@/services/taskService' 
import TaskTable from '@/components/tasks/TaskTable.vue'
import ModalCreateTask from '@/components/tasks/ModalTask.vue'
import ModalDeleteTask from '@/components/tasks/ModalDeleteTask.vue'
import PaginationControls from '@/components/tasks/PaginationControls.vue'

const tasks = ref([])
const loading = ref(false)
const showModal = ref(false)
const modalLoading = ref(false)
const modalMode = ref('create')
const currentTaskId = ref(null)

const toast = ref({
  show: false,
  message: '',
  type: 'info'
})

const modalFormData = ref({
  title: '',
  description: '',
  is_completed: false
})

const searchQuery = ref('') 
const currentPage = ref(1)
const perPage = ref(10)

const pagination = ref({
  currentPage: 1,
  perPage: 10,
  total: 0,
  lastPage: 1,
  from: 0,
  to: 0,
});

const loadTasks = async () => {
  try {
    loading.value = true
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
    }
    if (searchQuery.value) {
      params.search = searchQuery.value 
    }
    const response = await taskService.getTasks(params)
    tasks.value = response.data.map(task => ({
      ...task,
      updating: false,
      deleting: false
    }))
    pagination.value.currentPage = response.current_page;
    pagination.value.perPage = response.per_page;
    pagination.value.total = response.total;
    pagination.value.lastPage = response.last_page;
    pagination.value.from = response.from;
    pagination.value.to = response.to;
  } catch (error) {
    showToast('Error al cargar las tareas', 'error')
    console.error('Error al cargar tareas:', error);
  } finally {
    loading.value = false
  }
}

let debounceTimer = null;
const loadTasksDebounced = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentPage.value = 1; // Reiniciar a la primera página al buscar
    loadTasks();
  }, 300);
};

const handlePageChange = (page) => {
  currentPage.value = page;
  loadTasks();
};

const openCreateModal = () => {
  modalMode.value = 'create'
  modalFormData.value = {
    title: '',
    description: '',
    is_completed: false
  }
  currentTaskId.value = null
  showModal.value = true
}

const handleEditTask = (task) => {
  modalMode.value = 'edit'
  modalFormData.value = {
    title: task.title,
    description: task.description || '',
    is_completed: task.is_completed
  }
  currentTaskId.value = task.id
  showModal.value = true
}

const handleSubmit = async (data) => {
  try {
    modalLoading.value = true
    if (modalMode.value === 'create') {
      await taskService.createTask(data)
      showToast('Tarea creada correctamente', 'success')
    } else {
      await taskService.updateTask(currentTaskId.value, data)
      showToast('Tarea actualizada correctamente', 'success')
    }
    showModal.value = false
    await loadTasks() 
  } catch (error) {
    showToast(`Error al ${modalMode.value === 'create' ? 'crear' : 'actualizar'} la tarea`, 'error')
    console.error(`Error al ${modalMode.value === 'create' ? 'crear' : 'actualizar'} tarea:`, error);
  } finally {
    modalLoading.value = false
  }
}

const handleToggleTask = async (task) => {
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index === -1) return
  
  tasks.value[index].updating = true 

  try {
    const originalIsCompleted = task.is_completed;
    tasks.value[index].is_completed = !originalIsCompleted; 

    const response = await taskService.toggleTaskCompleted(task.id, !originalIsCompleted);
    showToast(`Tarea ${response.task.is_completed ? 'completada' : 'pendiente'} correctamente`, 'success');
    
    await loadTasks(); 
  } catch (error) {
    showToast('Error al actualizar la tarea', 'error');
    tasks.value[index].is_completed = originalIsCompleted; 
    console.error('Error al actualizar tarea:', error);
  } finally {
    tasks.value[index].updating = false; 
  }
}

const showDeleteModal = ref(false)
const taskIdToDelete = ref(null)

const handleDeleteTask = (id) => {
  taskIdToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  const index = tasks.value.findIndex(t => t.id === taskIdToDelete.value)
  if (index === -1) return
  try {
    tasks.value[index].deleting = true
    await taskService.deleteTask(taskIdToDelete.value)
    showToast('Tarea eliminada correctamente', 'success')
    // Si la última tarea en una página se elimina, ir a la página anterior si es posible
    if (tasks.value.length === 1 && currentPage.value > 1) { 
      currentPage.value--;
    }
    await loadTasks(); 
  } 
  catch (error) {
    showToast('Error al eliminar la tarea', 'error')
    tasks.value[index].deleting = false
    console.error('Error al eliminar tarea:', error);
  } finally {
    showDeleteModal.value = false
    taskIdToDelete.value = null
  }
}

const showToast = (message, type = 'info') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

const exportPdf = async () => {
  try {
    const response = await taskService.exportTasksToPdf(searchQuery.value);
    
    // Crear un objeto URL para el Blob (archivo binario) recibido
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `listado_tareas_${Date.now()}.pdf`); 
    document.body.appendChild(link); 
    link.click(); 
    link.remove();
    window.URL.revokeObjectURL(url);
    
    showToast('PDF generado y descargado correctamente', 'success');
  } 
  catch (error) {
    showToast('Error al generar el PDF', 'error');
    console.error('Error al exportar PDF:', error);
    if (error.response && error.response.data instanceof Blob) {
        error.response.data.text().then(text => console.error('Detalle del error del backend (texto):', text));
    } else if (error.response && error.response.data) {
        console.error('Detalle del error del backend (JSON):', error.response.data);
    }
  }
};

onMounted(() => {
  loadTasks()
})
</script>