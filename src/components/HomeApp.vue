<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav>
      <RouterLink to="/">
        <i class="bi bi-house"></i>
        <p>Home</p>
      </RouterLink>
      <RouterLink to="/routes">
        <i class="bi bi-sign-turn-right"></i>
        <p>Routes</p>
      </RouterLink>
      <RouterLink to="/alerts">
        <i class="bi bi-exclamation-triangle"></i>
        <p>Alerts</p>
      </RouterLink>
      <RouterLink to="/pico-placa">
        <i class="bi bi-car-front-fill"></i>
        <p>Pico y placa</p>
      </RouterLink>
    </nav>
  </header>

  <main class="main">
    <div class="wrapper">
      <h1>Movi<span>Traffic</span></h1>
    </div>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  height: 100%;
}

.wrapper {
  padding-top: 40px;
}

h1 {
  text-align: center;
  font-size: var(--font-size-h1);
  color: var(--color-text);
}

span {
  color: var(--color-primary);
}

.header {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: var(--color-background);
  padding: 0.5rem 0;
  z-index: 1;
  max-width: 500px;
}

nav {
  padding: 0.4rem;
  border-radius: 16px;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-primary);
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

a {
  max-height: 20px;
  padding: 2px 4px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  background-color: var(--color-background);
}

i {
  margin: 0 auto;
  font-size: var(--font-size-small);
}

p {
  margin-left: 4px;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-width 0.3s ease,
    opacity 0.3s ease;
}

a:focus > p {
  opacity: 1;
  max-width: 100%;
}
</style>
