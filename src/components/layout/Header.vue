<template>
  <header>
    <nav class="flex justify-center items-center bg-white rounded-2xl shadow-md px-6 py-2 my-4 mx-auto max-w-md">
      <div class="flex gap-8">
        <router-link
          to="/" class="no-underline text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors hover:text-blue-600"exac>Home
        </router-link>
        
        <router-link
          to="/about" class="no-underline text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors hover:text-blue-600">About
        </router-link>
      </div>
    </nav>
  </header>
</template>