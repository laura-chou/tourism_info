<script setup lang="ts">
import { useStore } from '@/stores/index.js'

const store = useStore()
const props = defineProps<{
  JsonData: {
    Pictures: string[]
    Add: string
    Tel: string
    OpenTime: string
    Website: string
    Description: string
  }
}>()
</script>

<template lang="pug">
  picture-component(:pictures="JsonData.Pictures" :id="JsonData.Id")
  h5.mt-3
    strong 地址：
    span.d-inline-flex.align-items-center {{ JsonData.Add }}
      copy-component.ms-2.me-2(:copyText="JsonData.Add")
      map-component(:name="JsonData.Add")
  h5.mt-3
    strong 電話：
    | {{ JsonData.Tel }}
  h5.mt-3
    strong 營業時間：
    | {{ JsonData.OpenTime }}
  h5.mt-3
    strong 官方網站：
    span(v-if="store.isNullOrEmpty(JsonData.Website)") 無
    a.text-break(v-else :href="JsonData.Website" target="_blank") {{ JsonData.Website }}
  h5.mt-3 {{ JsonData.Description }}
</template>