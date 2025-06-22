import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'
import AboutView from '../pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router