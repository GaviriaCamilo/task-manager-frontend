<!-- Este es App.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>