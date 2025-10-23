<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/stores';

const store = useStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toastClass = computed(() => {
  return store.toastClass;
});
</script>
<template lang="pug">
div.toast.fade(:class="toastClass" role="alert" aria-live="assertive" aria-atomic="true")
  div.toast-body.text-center.fw-bold
    | 複製成功
</template>
<style lang="stylus" scoped>
.toast
  width 100px
  position absolute
  right 40%
  top 0
  background-color #FFFFDF
</style>
