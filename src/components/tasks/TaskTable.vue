<template>
  <div>
    <div class="hidden lg:block mb-2">
      <div class="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
        <table class="min-w-full table-auto">
          <thead>
            <tr class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <th class="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider w-16">ID</th>
              <th class="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider w-1/3">Tarea</th>
              <th class="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider w-2/5">Descripción</th>
              <th class="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-24">Estado</th>
              <th class="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-24">Creación</th>
              <th class="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-24">Actualización</th>
              <th class="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-32">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="task in tasks" :key="task.id" class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
              <td class="py-4 px-6 text-sm font-medium text-gray-900">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full font-bold">
                  {{ task.id }}
                </span>
              </td>
              <td class="py-4 px-6">
                <ExpandableText
                  :text="task.title"
                  :limit="35"
                  :truncatedLength="20"
                  textClass="text-sm font-medium text-gray-900 leading-5"
                  buttonClass="ml-1 text-indigo-600 hover:text-indigo-800 font-medium text-xs underline whitespace-nowrap"
                  label="título"
                  :iconHidden="true"
                />
              </td>
              <td class="py-4 px-6">
                <ExpandableText
                  :text="task.description"
                  :limit="100"
                  :truncatedLength="100"
                  textClass="text-sm text-gray-600"
                  buttonClass="ml-1 text-indigo-600 hover:text-indigo-800 font-medium text-xs underline whitespace-nowrap"
                  label="descripción"
                  :iconHidden="true"
                />
              </td>
              <td class="py-4 px-6 text-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" :checked="task.is_completed" @change="$emit('toggle', task)" :disabled="task.updating" class="sr-only peer"/>
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                  <span v-if="task.updating" class="ml-2 text-xs text-gray-500">Actualizando...</span>
                </label>
              </td>
              <td class="py-4 px-6 text-sm text-gray-600 text-center">
                {{ formatDate(task.created_at) }}
              </td>
              <td class="py-4 px-6 text-sm text-gray-600 text-center">
                {{ formatDate(task.updated_at) }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center justify-center gap-2">
                  <button @click="$emit('edit', task)" class="inline-flex items-center px-3 py-2 text-xs font-medium text-amber-700 bg-amber-100 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-800 transition-all duration-200 transform hover:scale-105">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Editar
                  </button>
                  <button @click="$emit('delete', task.id)" :disabled="task.deleting" class="inline-flex items-center px-3 py-2 text-xs font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:text-red-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50">
                    <svg v-if="!task.deleting" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <svg v-else class="animate-spin w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ task.deleting ? 'Eliminando...' : 'Eliminar' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="tasks.length === 0" class="py-12 text-center">
          <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay tareas registradas</h3>
          <p class="text-gray-500">Comienza creando tu primera tarea</p>
        </div>
      </div>
    </div>

    <div class="lg:hidden mb-2">
      <div class="space-y-4">
        <div v-for="task in tasks" :key="task.id" class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="inline-flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 text-indigo-800 rounded-full font-bold text-sm">
                {{ task.id }}
              </span>
              
              <div class="flex items-center gap-2">
                <span v-if="task.updating" class="text-white text-xs">Actualizando...</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" :checked="task.is_completed" @change="$emit('toggle', task)" :disabled="task.updating" class="sr-only peer"/>
                  <div class="w-11 h-6 bg-white bg-opacity-20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white peer-focus:ring-opacity-25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 disabled:opacity-50"></div>
                </label>
              </div>
            </div>
            
            <div class="w-full">
              <ExpandableText
                :text="task.title"
                :limit="40"
                :truncatedLength="30"
                textClass="text-white font-semibold text-base leading-5"
                buttonClass="ml-1 text-white text-opacity-80 hover:text-opacity-100 font-medium text-sm underline whitespace-nowrap"
                label="título"
                :iconHidden="true"
              />
            </div>
          </div>

          <div class="p-4">
            <div class="mb-4">
              <ExpandableText
                :text="task.description"
                :limit="150"
                :truncatedLength="150"
                textClass="text-gray-600 text-sm leading-relaxed"
                buttonClass="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200"
                label="descripción"
                :iconHidden="false" />
            </div>

            <div class="mb-4 bg-gray-50 rounded-lg p-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="font-medium text-gray-500">Creado:</span>
                  <p class="text-gray-700 mt-1">{{ formatDate(task.created_at) }}</p>
                </div>
                <div>
                  <span class="font-medium text-gray-500">Actualizado:</span>
                  <p class="text-gray-700 mt-1">{{ formatDate(task.updated_at) }}</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button @click="$emit('edit', task)" class="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-amber-700 bg-amber-100 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-800 transition-all duration-200 transform hover:scale-105">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Editar
              </button>
              <button @click="$emit('delete', task.id)" :disabled="task.deleting" class="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 hover:text-red-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50">
                <svg v-if="!task.deleting" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <svg v-else class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ task.deleting ? 'Eliminando...' : 'Eliminar' }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="tasks.length === 0" class="text-center py-12">
          <div class="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg class="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">¡Comienza a organizar tu día!</h3>
          <p class="text-gray-500 mb-6 max-w-sm mx-auto">No tienes tareas registradas. Crea tu primera tarea y empieza a ser más productivo.</p>
          <div class="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ExpandableText from '@/components/tasks/ExpandableText.vue';

defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

defineEmits(['toggle', 'delete', 'edit'])

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) return 'Fecha inválida'
    
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Error en fecha'
  }
}
</script>