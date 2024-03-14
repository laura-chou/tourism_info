<script setup>
import { computed } from 'vue'
import { useStore } from '@/stores/index.js'

const store = useStore()
const toastClass = computed(() => {
  return store.toastClass
})

</script>
<template lang="pug">
div.toast.fade(:class="toastClass" role="alert" aria-live="assertive" aria-atomic="true")
  div.toast-body.text-center.fw-bold
    | 複製成功
</template>
<style lang="stylus" scoped>
.toast
  z-index 99
  width 100px
  position absolute
  left 50%
  top 30%
  transform translate(-50%, -30%)
  background-color #FFFFDF
</style>
