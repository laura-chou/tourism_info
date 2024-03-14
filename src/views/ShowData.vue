<script setup>
import FoodInfo from '@/views/FoodInfo.vue'
import HotelInfo from '@/views/HotelInfo.vue'
import TouristSpots from '@/views/TouristSpots.vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'

const store = useStore()
const route = useRoute()
const router = useRouter()
const { type, searchData, originData, paginationPageSize, paginationOffset } = storeToRefs(store)

const searchDataList = computed(() => {
  const array = searchData.value
  const offset = paginationOffset.value
  const pageSize = paginationPageSize.value
  if (!Array.isArray(array)) return []
  return array.slice(offset, offset + pageSize)
})

if (originData.value.length === 0) {
  const pathName = location.pathname
  router.push(pathName.substring(5, pathName.length))
}

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
