<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-end items-center py-6">
          <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 border border-transparent rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nueva Tarea
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para crear o editar tareas -->
    <ModalCreateTask v-if="showModal" v-model="showModal" :loading="modalLoading" :formData="modalFormData" :mode="modalMode" @submit="handleSubmit"/>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Mostrar loading si está cargando y no hay tareas -->
      <div v-if="loading && tasks.length === 0" class="flex justify-center items-center py-20">
        <div class="flex items-center gap-3">
          <svg class="animate-spin w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-lg text-gray-600">Cargando tareas...</span>
        </div>
      </div>
      <!-- Tabla de tareas -->
      <TaskTable v-else :tasks="tasks" @toggle="handleToggleTask" @delete="handleDeleteTask" @edit="handleEditTask"/>
    </div>

    <!-- Toast de notificación -->
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

    <!-- Modal de confirmación para eliminar tarea -->
    <ModalDeleteTask v-if="showDeleteModal" @confirm="confirmDelete" @cancel="showDeleteModal = false"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/taskService'
import TaskTable from '@/components/tasks/TaskTable.vue'
import ModalCreateTask from '../components/tasks/ModalTask.vue' 
import ModalDeleteTask from '@/components/tasks/ModalDeleteTask.vue'

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

// Crea o actualiza una tarea según el modo del modal
const handleSubmit = async (data) => {
  try {
    modalLoading.value = true
    if (modalMode.value === 'create') {
      await api.createTask(data)
      showToast('Tarea creada correctamente', 'success')
    } else {
      await api.updateTask(currentTaskId.value, data)
      showToast('Tarea actualizada correctamente', 'success')
    }
    showModal.value = false
    await loadTasks()
  } catch (error) {
    showToast(`Error al ${modalMode.value === 'create' ? 'crear' : 'actualizar'} la tarea`, 'error')
  } finally {
    modalLoading.value = false
  }
}

// Carga todas las tareas y agrega flags de estado
const loadTasks = async () => {
  try {
    loading.value = true
    const response = await api.getTasks()
    tasks.value = response.data.map(task => ({
      ...task,
      updating: false,
      deleting: false
    }))
  } catch (error) {
    showToast('Error al cargar las tareas', 'error')
  } finally {
    loading.value = false
  }
}

// Cambia el estado de completado de una tarea
const handleToggleTask = async (task) => {
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index === -1) return
  try {
    tasks.value[index].updating = true
    const updatedTask = await api.toggleTaskCompleted(task.id, !task.is_completed)
    tasks.value[index] = { ...updatedTask, updating: false, deleting: false }
    showToast(`Tarea ${updatedTask.is_completed ? 'completada' : 'pendiente'} correctamente`, 'success')
  } catch (error) {
    showToast('Error al actualizar la tarea', 'error')
    tasks.value[index].updating = false
  }
}

const showDeleteModal = ref(false)
const taskIdToDelete = ref(null)

const handleDeleteTask = (id) => {
  taskIdToDelete.value = id
  showDeleteModal.value = true
}

// Elimina la tarea seleccionada y actualiza la lista
const confirmDelete = async () => {
  const index = tasks.value.findIndex(t => t.id === taskIdToDelete.value)
  if (index === -1) return
  try {
    tasks.value[index].deleting = true
    await api.deleteTask(taskIdToDelete.value)
    tasks.value.splice(index, 1)
    showToast('Tarea eliminada correctamente', 'success')
  } catch (error) {
    showToast('Error al eliminar la tarea', 'error')
    tasks.value[index].deleting = false
  } finally {
    showDeleteModal.value = false
    taskIdToDelete.value = null
  }
}

// Muestra un toast temporal
const showToast = (message, type = 'info') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

onMounted(() => {
  loadTasks()
})
</script>
