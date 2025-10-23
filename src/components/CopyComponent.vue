<script setup>
import { useStore } from '@/stores/index.js'

const store = useStore()

defineProps({
  copyText: String,
})

const copy = async (text) => {
  try {
    navigator.clipboard.writeText(text)
    store.showToast()
  } catch (error) {}
}
</script>

<template lang="pug">
button.btn.btn-success.d-flex(@click="copy(copyText)")
  vue-feather(type="copy")
</template>
