<template>
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full space-y-4">
        <h2 class="text-lg font-bold text-gray-800">¿Eliminar tarea?</h2>
        <p class="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
        <div class="flex justify-end gap-3 pt-4">
            <button @click="$emit('cancel')" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
                Cancelar
            </button>

            <button @click="$emit('confirm')" class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Eliminar
            </button>
        </div>
        </div>
    </div>
</template>
