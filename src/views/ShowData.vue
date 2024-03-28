<script setup>
import FoodInfo from '@/views/FoodInfo.vue'
import HotelInfo from '@/views/HotelInfo.vue'
import TouristSpots from '@/views/TouristSpots.vue'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index.js'

const store = useStore()
const { type, isReload, searchData, paginationPageSize, paginationOffset } = storeToRefs(store)

const searchDataList = computed(() => {
  const array = searchData.value
  const offset = paginationOffset.value
  const pageSize = paginationPageSize.value
  if (!Array.isArray(array)) return []
  return array.slice(offset, offset + pageSize)
})

if (isReload.value) {
  store.searchResult()
}

onMounted(() => {
  // window.addEventListener('pagehide', () => {
  //   store.isReload = true
  // })
  window.onpagehide = (event) => {
    store.isReload = true
  }
})
</script>

<template lang="pug">
div#showData
  search-component
  div(v-if="store.haveData")
    component(v-if="type == 1" :is="FoodInfo" :searchDataList="searchDataList")
    component(v-if="type == 2" :is="TouristSpots" :searchDataList="searchDataList")
    component(v-if="type == 3" :is="HotelInfo" :searchDataList="searchDataList")
    pagination-component
    toast-component
  div.no-data(v-else)
    img(src="@/assets/empty.png")
    h2.fw-bold 查無資料
</template>
