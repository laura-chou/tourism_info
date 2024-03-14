<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/stores/index.js'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const route = useRoute()
const router = useRouter()
const store = useStore()
const { originData } = storeToRefs(store)

onMounted(async () => {
  try {
    await store.getData(route.params)
    if (originData.value.length > 0) {
      router.push(`/show${location.pathname}`)
    }
  } catch (error) {
    router.push('/404')
  }
})
</script>

<template lang="pug">
div.loading
  img(src="@/assets/loading.svg")
</template>
