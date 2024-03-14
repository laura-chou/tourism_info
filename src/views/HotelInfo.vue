<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index.js'

const store = useStore()
const { collapseClass } = storeToRefs(store)

defineProps({ searchDataList: Object })
</script>

<template lang="pug">
div.accordion.accordion-flush(v-for="(item, index) in searchDataList" :key="item.Id")
  div.accordion-item(:id="'accordion-item'+index" :class="index == 0 ? collapseClass : ''")
    h2.d-flex.align-items-center
      copy-component.ms-2(:copyText="item.Name" color="btn-outline-dark")
      button.accordion-button(
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="true"
        :id="'accordion-button' + index"
        :class="index == 0 ? '' : 'collapsed'"
        :data-bs-target="store.collapseTargetName(item.Id)"
        @click="store.collapse(index)")
        strong {{ item.Order }}. {{ item.Name }}
    div.accordion-collapse.collapse.border-bottom.border-2(:id="'collapse' + item.Id" :class="index == 0 ? 'show' : ''")
      div.accordion-body.p-3
        div.row.g-0
          div.col-md-12
            picture-component(:pictures="item.Pictures" :id="item.Id")
          div.col-md-12.p-2
            h5
              strong 地址：
              span.d-inline-flex.align-items-center {{ item.Add }}
                copy-component.ms-2.me-2(:copyText="item.Add")
                map-component(:name="item.Name")
            h5
              strong 電話：
              | {{ item.Tel }}
            h5
              strong 官方網站：
              span(v-if="store.isNullOrEmpty(item.Website)") 無
              a.text-break(v-else :href="item.Website" target="_blank") {{ item.Website }}
            h5
              strong 服務資訊：
              span(v-if="store.isNullOrEmpty(item.Serviceinfo)") 無
              ul.m-2(v-else)
                li(v-for="service in item.Serviceinfo") {{ service }}
            h5(v-if="!store.isNullOrEmpty(item.Description)")
              | {{ item.Description }}
</template>
