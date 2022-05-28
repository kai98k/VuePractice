<template>
  <swiper :modules="modules" :pagination="{ clickable: true }">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
  @import 'swiper/swiper.scss';

</style>

<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

  // import swiper module styles

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    setup() {
      return {
        modules: [Pagination]
      }
    }
  }
</script>