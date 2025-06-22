<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button @click="onClose" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-5xl">
                &times;
            </button>
            
            <h2 class="text-xl font-bold mb-4">
                {{ isEditing ? 'Editar tarea' : 'Nueva tarea' }}
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                        Título
                    </label>
                    <input  id="title" v-model="form.title" type="text" required  maxlength="50" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ingresa el título de la tarea"/>
                    <div class="flex justify-between items-center mt-1">
                        <span v-if="form.title.length > 40" class="text-xs text-amber-600">
                            {{ 50 - form.title.length }} caracteres restantes
                        </span>
                        <span v-else class="text-xs text-gray-500">
                            Máximo 50 caracteres
                        </span>
                        <span class="text-xs" :class="form.title.length >= 50 ? 'text-red-500' : 'text-gray-400'">
                            {{ form.title.length }}/50
                        </span>
                    </div>
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea id="description" v-model="form.description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Descripción opcional de la tarea"></textarea>
                </div>

                <!-- Campo de estado solo visible en modo edición -->
                <div v-if="isEditing" class="flex items-center gap-3">
                    <label class="flex items-center cursor-pointer">
                        <input type="checkbox" v-model="form.is_completed" class="sr-only peer"/>
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-700">
                            Tarea completada
                        </span>
                    </label>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                    <button type="button" @click="onClose" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                        Cancelar
                    </button>

                    <button type="submit" :disabled="loading || !form.title.trim()" class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50">
                        <span v-if="loading">
                            {{ isEditing ? 'Actualizando...' : 'Creando...' }}
                        </span>
                        <span v-else>
                            {{ isEditing ? 'Actualizar' : 'Crear' }}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    loading: Boolean,
    formData: {
        type: Object,
        default: () => ({
            title: '',
            description: '',
            is_completed: false
        })
    },
    mode: {
        type: String,
        default: 'create',
        validator: (value) => ['create', 'edit'].includes(value)
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({ ...props.formData })

const isEditing = computed(() => props.mode === 'edit')

watch(() => props.formData, (newData) => {
    form.value = { ...newData }
}, { deep: true })

const handleSubmit = () => {
    emit('submit', { ...form.value })
}

const onClose = () => {
    emit('update:modelValue', false)
}
</script>