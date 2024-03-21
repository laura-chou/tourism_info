<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/stores/index.js'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useStore()

onMounted(async () => {
  try {
    const params = route.params
    await store.getData(params)
    router.push(`/show/${store.getDataPath(params)}`)
  } catch (error) {
    router.push('/404')
  }
})
</script>

<template lang="pug">
div.loading
  img(src="@/assets/loading.svg")
</template>
