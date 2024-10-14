import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RouteView from '@/views/RouteView.vue'
import AlertView from '@/views/AlertView.vue'
import PicoPlaca from '@/views/PicoPlaca.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // requiere autenticación
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNavbar: true },
    },
    {
      path: '/routes',
      name: 'routes',
      component: RouteView,
      meta: { requiresAuth: true }, // requiere autenticación
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: AlertView,
      meta: { requiresAuth: true }, // requiere autenticación
    },
    {
      path: '/pico-placa',
      name: 'pico-placa',
      component: PicoPlaca,
      meta: { requiresAuth: true }, // requiere autenticación
    },
  ],
})

// Verifica la autenticación antes de cada ruta
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token') // Comprueba si el token está almacenado

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirige al login si el usuario no está autenticado
    next({ name: 'login' })
  } else {
    // Permite el acceso si está autenticado
    next()
  }
})

export default router
