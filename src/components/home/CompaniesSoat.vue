<script setup>
import { companiesSoat } from '@/components/home/soatPlaces'
</script>

<template>
  <h2 style="margin: 0 auto">Compañías de Seguro</h2>
  <article style="margin: 0 auto">
    <ul>
      <li v-for="companie in companiesSoat" :key="companie.name">
        <img :src="companie.imgScr" :alt="companie.name" />
        <p>{{ companie.name }}</p>
        <a target="_blank" :href="companie.linkPage">Vista</a>
      </li>
    </ul>
  </article>
</template>

<style scoped>
article {
  padding: 16px;
  background-color: var(--color-background);
  font-family: var(--font-family);
}

h2 {
  font-size: var(--font-size-h2);
  color: var(--color-primary);
  margin-bottom: 16px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

li {
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

li:hover {
  transform: translateY(-4px);
}

img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 50%;
}

p {
  font-size: var(--font-size-paragraph);
  color: var(--color-text);
  flex-grow: 1;
  margin: 0;
}

a {
  padding: 8px 12px;
  font-size: var(--font-size-small);
  color: #ffffff;
  background-color: var(--color-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: var(--color-accent);
}

/* Media query para pantallas más grandes */
@media (min-width: 768px) {
  ul {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    width: calc(50% - 16px);
  }
}
</style>
