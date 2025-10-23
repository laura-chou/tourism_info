<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/stores/index.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useStore();

onMounted(async () => {
  try {
    await store.handleClick();
    router.push('/home');
  } catch (error) {
    console.log(`handleClick failed:${error}`);
    router.push('/not-found');
  }
});
</script>

<template lang="pug">
div.loading
  img(src="@/assets/loading.svg")
</template>

<style lang="stylus" scoped>
  .loading
    height 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
    img
      width 200px
</style>