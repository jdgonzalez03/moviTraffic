<script setup>
import './form.css'

import { ref } from 'vue'
import confetti from 'canvas-confetti'
import axios from 'axios'

const URL_REGISTER = import.meta.env.VITE_REGISTER_URL

const showPswd = ref(false)
const hasVehicle = ref('no')
const vehiclePlates = ref([{ plate: '', dateSoat: '' }]) // Inicializar como un array de objetos

const fullname = ref('')
const phone = ref('')
const CC = ref('')
const password = ref('')

const toggleVehicleFields = () => {
  if (hasVehicle.value === 'yes') {
    vehiclePlates.value = [{ plate: '', dateSoat: '' }] // Reiniciar a un objeto vacío
  } else {
    vehiclePlates.value = []
  }
}

const handleSubmit = async () => {
  const isConfirmed = confirm(`
    ¿Estás seguro de que deseas enviar los datos? 
      fullname: ${fullname.value},
      phone: ${phone.value},
      vehicles: ${JSON.stringify(vehiclePlates.value)},
      password: ${password.value}
  `)

  if (isConfirmed) {
    try {
      const response = await axios.post(URL_REGISTER, {
        fullname: fullname.value,
        phone: phone.value,
        CC: CC.value,
        vehiclePlates: vehiclePlates.value, // Enviar el array de objetos
        password: password.value,
      })

      console.log('Usuario registrado:', response)
      alert('Usuario registrado exitosamente')
      confetti()

      // Limpiar los campos del formulario
      fullname.value = ''
      phone.value = ''
      CC.value = ''
      vehiclePlates.value = [{ plate: '', dateSoat: '' }] // Reiniciar a un objeto vacío
      password.value = ''
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      alert('Error al registrar el usuario: ' + error)
    }
  } else {
    alert('Ingresa datos nuevamente')
  }
}
</script>

<template>
  <form class="form-login" @submit.prevent="handleSubmit">
    <label for="name">Nombre Completo</label>
    <input
      v-model="fullname"
      class="form-input"
      type="text"
      id="name"
      placeholder="Ingresa tu nombre completo"
      required
    />

    <label for="phone">Número de Teléfono</label>
    <input
      v-model="phone"
      class="form-input"
      type="tel"
      id="phone"
      placeholder="Ingresa tu número de teléfono"
      required
    />

    <label for="cedula">Cédula</label>
    <input
      v-model="CC"
      class="form-input"
      type="text"
      id="cedula"
      placeholder="Ingresa tu cédula"
      required
    />

    <div>
      <label for="hasVehicle">¿Tienes vehículo?</label>
      <select
        v-model="hasVehicle"
        @change="toggleVehicleFields"
        id="hasVehicle"
      >
        <option value="no">No</option>
        <option value="yes">Sí</option>
      </select>
    </div>

    <div v-if="hasVehicle === 'yes'">
      <label for="vehicle-plate">Placas de Vehículos</label>
      <div class="vehicle-inputs">
        <div v-for="(vehicle, index) in vehiclePlates" :key="index">
          <input
            class="form-input"
            type="text"
            :placeholder="`Ingresa la placa del vehículo ${index + 1}`"
            v-model="vehicle.plate"
            required
            :pattern="'^[A-Z]{3}[0-9]{2,3}[A-Z]?$'"
            title="Formato de placa incorrecto"
          />
          <label :for="`date-soat-${index}`">Fecha del SOAT</label>
          <input
            class="form-input"
            type="date"
            v-model="vehicle.dateSoat"
            required
          />
        </div>
        <button
          class="btn"
          @click.prevent="vehiclePlates.push({ plate: '', dateSoat: '' })"
        >
          Agregar placa
        </button>
      </div>
    </div>

    <label for="password">Contraseña</label>
    <input
      class="form-input"
      v-model="password"
      :type="!showPswd ? 'password' : 'text'"
      id="password"
      placeholder="Ingresa tu contraseña"
      minlength="6"
      required
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
    <button type="submit" class="btn">Registrar</button>
  </form>
</template>

<style scoped></style>
