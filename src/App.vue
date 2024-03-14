<script setup>
import { useStore } from '@/stores/index.js'
import { onMounted } from 'vue'
const store = useStore()
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    store.reload = true
  })
})
</script>

<template lang="pug">
router-view
</template>
