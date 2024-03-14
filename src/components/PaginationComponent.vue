<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index.js'
import { usePagination } from 'vue-composable'

const store = useStore()
const { searchData, paginationPage, paginationPageSize } = storeToRefs(store)

const {
  currentPage,
  next,
  prev,
  first,
  last,
  offset,
  pageSize,
  lastPage
} = usePagination({
  currentPage: computed({
    get: () => paginationPage.value,
    set: (val) => {
      store.paginationPage = val
    }
  }),
  pageSize: computed(() => paginationPageSize.value),
  total: computed(() => searchData.value.length)
})

watch(offset, (newValue) => {
  store.paginationOffset = newValue
})
</script>

<template lang="pug">
div.text-center.m-2
  div.btn-group(role="group")
    button.btn.btn-primary.d-flex(@click="first")
      vue-feather(type="chevrons-left")
    button.btn.btn-primary.d-flex(@click="prev")
      vue-feather(type="chevron-left")
    div.pagnation.border-primary
      | {{ currentPage }}&ensp;of&ensp;{{ lastPage }}
    button.btn.btn-primary.d-flex(@click="next")
      vue-feather(type="chevron-right")
    button.btn.btn-primary.d-flex(@click="last")
      vue-feather(type="chevrons-right")
</template>
