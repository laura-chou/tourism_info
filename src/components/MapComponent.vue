<script setup>
defineProps({
  name: String,
  color: {
    type: String,
    default: 'btn-outline-primary'
  }
})

const goToMap = (name) => {
  window.open('https://www.google.com/maps/search/' + name)
}
</script>

<template lang="pug">
button.btn.d-flex(:class="color" @click="goToMap(name)")
  vue-feather(type="map-pin")
</template>
