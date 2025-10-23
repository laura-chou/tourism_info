<script setup lang="ts">
const props = defineProps({
  name: String
})

const goToMap = (address: string) => {
  window.open(`https://www.google.com/maps/search/${address}`)
}
</script>

<template lang="pug">
button.btn.btn-danger.d-flex(@click="goToMap(address)")
  vue-feather(type="map-pin")
</template>
