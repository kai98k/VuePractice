<template>
<UserNavbar></UserNavbar>
  <Swiper></Swiper>
</template>
<script>
import Swiper from '../components/Swiper.vue';
import UserNavbar from '../components/UserNavbar.vue';

export default {
  data() {
    return {
      products:[],
      isLoading:false,
    //   尚未emit
    };
  },
  components: {
    Swiper,
    UserNavbar,
  },
  methods: {
  },
  created() {
  },
};
</script>