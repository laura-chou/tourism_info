<script setup lang="ts">
import { useStore } from '@/stores/index.js'

const store = useStore()

const props = defineProps({
  copyText: String,
})

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    store.showToast()
  } catch (error) {}
}
</script>

<template lang="pug">
button.btn.btn-success.d-flex(@click="copy(copyText)")
  vue-feather(type="copy")
</template>
