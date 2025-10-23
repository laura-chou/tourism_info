<script setup lang="ts">
import { useStore } from '@/stores/index.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = useStore();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  JsonData: {
    Pictures: string[]
    Add: string
    Tel: string
    OpenTime: string
    TicketInfo: string
    TravellingInfo: string
    Website: string
    Description: string
    ChangeTime: string
  }
}>();
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
    span {{ JsonData.Tel }}
  h5.mt-3
    strong 營業時間：
    span {{ JsonData.OpenTime }}
  h5.mt-3
    strong 售票資訊：
    span {{ JsonData.TicketInfo }}
  h5.mt-3
    strong 交通資訊：
    span(v-if="store.isNullOrEmpty(JsonData.TravellingInfo)") 無
    div.mt-2(v-else) {{ JsonData.TravellingInfo }}
  h5.mt-3
    strong 官方網站：
    span(v-if="store.isNullOrEmpty(JsonData.Website)") 無
    a.text-break(v-else :href="JsonData.Website" target="_blank") {{ JsonData.Website }}
  h5.mt-3
    span {{ JsonData.Description }}
  h5.mt-2.text-end
    span 最後更新時間：{{ JsonData.ChangeTime }}
</template>