<script setup>
import { useStore } from '@/stores/index.js'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    store.isReload = true
    sessionStorage.redirect = store.getDataPath(route.params)
  })
})
</script>

<template lang="pug">
router-view
</template>
