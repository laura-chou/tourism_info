<script setup lang="ts">
import { useStore } from '@/stores/index.js';

const store = useStore();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  copyText: String,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    store.showToast();
  } catch (error) {
    console.log(`copy failed:${error}`);
  }
};
</script>

<template lang="pug">
button.btn.btn-success.d-flex(@click="copy(copyText)")
  vue-feather(type="copy")
</template>
