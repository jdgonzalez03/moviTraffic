<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'

const modeLogin = ref('login')
</script>

<template>
  <div class="container">
    <h1>Movi<span>Traffic</span></h1>
    <ul class="options-login">
      <li>
        <input type="radio" id="login" value="login" v-model="modeLogin" />
        <label for="login" class="btn">Log in</label>
      </li>
      <li>
        <input type="radio" id="signup" value="signup" v-model="modeLogin" />
        <label for="signup" class="btn">Sign up</label>
      </li>
    </ul>
    <div class="form-container">
      <LoginForm v-if="modeLogin === 'login'" />
      <RegisterForm v-else-if="modeLogin === 'signup'" />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-background);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  z-index: 2;
}

input[type='radio'] {
  opacity: 0;
}

li:has(input[type='radio']:checked) label {
  background-color: var(--color-secondary);
  transform: scale(0.9);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--color-background);
  font-family: var(--font-family);
}

h1 {
  font-size: var(--font-size-h1);
  color: var(--color-text);
  margin-bottom: 20px;
}

span {
  color: var(--color-primary);
}

.options-login {
  list-style: none;
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.form-container {
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
