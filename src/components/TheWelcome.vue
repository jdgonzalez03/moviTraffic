<script setup></script>

<template>
  <div class="splash">
    <div class="container">
      <img src="@/assets/logo.png" alt="Logo de MoviTraffic" />
      <h1>Movi<span>Traffic</span></h1>
    </div>
  </div>
</template>

<style scoped>
.splash {
  width: 100vw;
  min-height: 100vh;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  overflow: hidden;
  background-color: var(--color-background);
  max-width: 300px;
  text-align: center;
  padding: 1.3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: pulse 3s infinite ease-in-out;
}

span {
  color: var(--color-primary);
}

h1 {
  font-size: var(--font-size-h1);
  margin: 10px 0;
}
img {
  max-width: 100%;
  max-height: 150px;
}

p {
  color: var(--color-text);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
