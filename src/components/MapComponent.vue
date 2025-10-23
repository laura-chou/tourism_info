<script setup>
defineProps({
  name: String
})

const goToMap = (name) => {
  window.open('https://www.google.com/maps/search/' + name)
}
</script>

<template lang="pug">
button.btn.btn-danger.d-flex(@click="goToMap(name)")
  vue-feather(type="map-pin")
</template>
