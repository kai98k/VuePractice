<template>
  <swiper :slides-per-view="1" :navigation="true">
    <swiper-slide>
      <div class="container"> <h2>Explore What<br>You Need!</h2></div>
     
    </swiper-slide>
    <swiper-slide> </swiper-slide>
    <swiper-slide> </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss">
.swiper-slide {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: 700;
}
.swiper-slide:nth-child(1n) {

  background-image: url(https://images.unsplash.com/photo-1594325624708-75a0a6cf806f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-clip: content-box;
  background-size: cover;
  background-position: center;
  justify-content: flex-start;

}
.swiper-slide:nth-child(2n) {


  background-image: url(https://images.unsplash.com/photo-1642505173110-c51e4fc1d5c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-clip: content-box;
  background-size: cover;
  background-position: center;
}
.swiper-slide:nth-child(3n) {
  background-color: peru;
}
.swiper-slide:nth-child(4n) {
  background-color: cadetblue;
}
.swiper-slide:nth-child(5n) {
  background-color: plum;
}
.swiper-slide:nth-child(6n) {
  background-color: goldenrod;
}
.swiper-slide:nth-child(7n) {
  background-color: palegreen;
}
</style>
<script>
// Import Swiper Vue.js components
import { Swiper } from "swiper/vue/swiper";
import { SwiperSlide } from "swiper/vue/swiper-slide";
import SwiperCore, { Navigation } from "swiper";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
SwiperCore.use([Navigation]);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>