<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import { defineAsyncComponent } from 'vue'

const HomeApp = defineAsyncComponent(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('@/components/HomeApp.vue'))
    }, 3000)
  })
})
</script>

<template>
  <Suspense>
    <template #default>
      <HomeApp />
    </template>
    <template #fallback>
      <TheWelcome />
    </template>
  </Suspense>
</template>
