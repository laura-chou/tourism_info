<script setup>
import useClipboard from 'vue-clipboard3'
import { useStore } from '@/stores/index.js'

const store = useStore()
const { toClipboard } = useClipboard()

defineProps({
  copyText: String,
  color: {
    type: String,
    default: 'btn-outline-success'
  }
})

const copy = async (text) => {
  try {
    await toClipboard(text)
    store.showToast()
  } catch (error) {}
}
</script>

<template lang="pug">
button.btn.d-flex(:class="color" @click="copy(copyText)")
  vue-feather(type="copy")
</template>
