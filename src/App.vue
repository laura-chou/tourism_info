<script setup>
import { useStore } from '@/stores/index.js'
import { onMounted } from 'vue'
const store = useStore()
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    store.isReload = true
    store.type = 99
  })
})
</script>

<template lang="pug">
router-view
</template>
