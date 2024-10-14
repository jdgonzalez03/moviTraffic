<script setup>
import './form.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL

const CC = ref('')
const password = ref('')
const showPswd = ref(false)
const errorMessage = ref('')

const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post(LOGIN_URL, {
      CC: CC.value,
      password: password.value,
    })

    console.log('Funciona el login')
    // Asumiendo que el token está en el campo `token` de la respuesta
    console.log(response.data.token)

    const token = response.data.token
    localStorage.setItem('token', token) // Guarda el token en localStorage

    router.push('/') // Redirecciona al usuario al home

    //Limpiar los datos
    CC.value = ''
    password.value = ''
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Error al iniciar sesión'
  }
}
</script>

<template>
  <form class="form-login" @submit.prevent="handleLogin">
    <label for="cedula">Cedula</label>
    <input
      class="form-input"
      type="text"
      id="cedula"
      placeholder="Enter your ID"
      required
      v-model="CC"
    />

    <label for="password">Password</label>
    <input
      :type="!showPswd ? 'password' : 'text'"
      class="form-input"
      id="password"
      placeholder="Enter your password"
      required
      v-model="password"
    />

    <div>
      <input
        class="show-password"
        type="checkbox"
        id="showPassword"
        v-model="showPswd"
      />
      <label class="show-password" for="showPassword">Mostrar contraseña</label>
    </div>
    <button class="btn">Log in</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<style scoped></style>
