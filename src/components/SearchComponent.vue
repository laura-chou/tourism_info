<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'
const router = useRouter()
const store = useStore()
const { showPrevious } = storeToRefs(store)

const searchText = computed({
  get: () => store.searchText,
  set: (val) => {
    store.searchText = val
  }
})

const clearInput = () => {
  store.clear()
}

const previous = () => {
  store.$reset()
  router.push('/')
}
</script>

<template lang="pug">
div.input-group.p-2
  button.btn.btn-success.d-flex(type="button" v-if="showPrevious" @click="previous")
    vue-feather(type="arrow-left")
  input.form-control(type="text" placeholder="輸入關鍵字 Enter 搜尋" v-model="searchText" v-on:keyup.enter="store.searchResult()")
  button.btn.btn-secondary.d-flex(type="button" @click="clearInput")
    vue-feather(type="x")
</template>
