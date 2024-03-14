<script setup>
import { ref } from 'vue'
const props = defineProps({
  pictures: Object,
  id: Number
})

const targetName = ref('#carousel' + props.id)
</script>
<template lang="pug">
img.no-picture(v-if="pictures.length == 0" src="@/assets/image.png")
div.carousel.slide.carousel-dark.carousel-fade(v-else :id="targetName.replace('#', '')" data-bs-ride="carousel")
  div.carousel-indicators
    button(v-for="(picture, index) in pictures"
      type="button"
      :class="index == 0 ? 'active' : ''"
      :aria-current="index == 0 ? true : false"
      :data-bs-target="targetName"
      :data-bs-slide-to="index")
  div.carousel-inner.text-center
    div.carousel-item(v-for="(picture, index) in pictures"
                      :class="index == 0 ? 'active' : ''"
                      :data-bs-interval="5000")
      img.picture(:src="picture")
  div(v-if="pictures.length > 1")
    button.carousel-control-prev(type="button" :data-bs-target="targetName" data-bs-slide="prev")
      span.carousel-control-prev-icon(aria-hidden="true")
      span.visually-hidden Previous
    button.carousel-control-next(type="button" :data-bs-target="targetName" data-bs-slide="next")
      span.carousel-control-next-icon(aria-hidden="true")
      span.visually-hidden Next
</template>

<style lang="stylus" scoped>
.no-picture
  width 100%
  height 200px
  object-fit contain
.picture
  height 300px
@media screen and (max-width: 576px)
  .picture
    width -webkit-fill-available
</style>
