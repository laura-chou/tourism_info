<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  name: String
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goToMap = (address: string) => {
  window.open(`https://www.google.com/maps/search/${address}`);
};
</script>

<template lang="pug">
button.btn.btn-danger.d-flex(@click="goToMap(address)")
  vue-feather(type="map-pin")
</template>
