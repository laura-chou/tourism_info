<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
const store = useStore()
const router = useRouter()
const { type, isReload } = storeToRefs(store)

const link = (path) => {
  router.push('/' + path)
}

if (isReload.value) {
  router.push(`/show/${store.getPathByType(type.value)}`)
}
</script>

<template lang="pug">
div.d-flex.flex-column.justify-content-evenly.h-100
  div.menu(v-for="item in store.getMenu" @click="link(item.path)")
    h2.fw-bold {{ item.name }}
</template>
