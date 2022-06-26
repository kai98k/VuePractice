<template>
<UserNavbar data-aos="flip-up"  data-aos-duration="2000"
@pageScroll="getPageScroll"></UserNavbar>
<Swiper></Swiper>
<div class="container-fluid  px-0 pt-5 parallax">
  <h2 class="text-center text-light">Ideal</h2>
  <div class="row mt-5 article container mx-auto">
    <div class="col-lg-5 px-5" data-aos="zoom-in-right" data-aos-duration="2000">
<img src="https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" class="img-fluid"></div>
   <div class="col-0 col-lg-2 center" ref="center"></div>
   <div class="col-lg-5 d-flex right text-justify px-lg-5 py-2"><p class="d-inline">We believe everyone is able to make himself or herself like the face that launched a thousand ships ! <a href="#" class="explore text-shadow">Explore More</a></p></div>
  </div>
  <h2 class="text-center mt-5 text-light" >NEED</h2>
   <div class="row flex-row-reverse mt-5 article container mx-auto">
    <div class="col-lg-5 px-5" data-aos="zoom-in-right" data-aos-duration="2000">
<img src="https://images.unsplash.com/photo-1440133197387-5a6020d5ace2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" class="img-fluid"></div>
   <div class="d-none d-lg-block col-lg-2 center2" ref="center2"><i class="bi bi-peace"></i>
</div>
   <div class="col-lg-5 d-lg-flex left px-lg-5 py-2"><p>不管種族、性別、性向，每個人與生俱來，就有變美麗的權利、潛力，不應該被世俗給侷限。<a href="#" class="explore mt-5 text-shadow">探 索 更 多</a></p></div>
  </div>
  <Marquee></Marquee>
  <News></News> 
  <Userfoot></Userfoot>
</div>

</template>
<style scoped lang="scss">
.text-shadow{
    text-shadow:2px 2px 5px #0D0D0D;

}
.text-light{
  text-shadow:2px 2px 5px #0D0D0D;
}
.parallax{
    background: url(https://images.unsplash.com/photo-1534543210152-32025bcfaad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)center center no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
.article{
  box-shadow: 3px 1px 10px rgba(0,0,0,0.5) ;
  background: rgba(255,255,255,0.3);
  border-radius: 10px;
}
body{
  background: #F2F1F0;
}
.explore{
  font-size: 20px;
  text-decoration: none;
}
.center{
    opacity: 0.6;
    transform: translateY(-700px);
    background:linear-gradient( 90deg,
    red 0%, red 15%,
    orange 15%, orange 30%,
    yellow 30%, yellow 45%,
    green 45%, green 60%,
    blue 60%, blue 75%,
    indigo 75%, indigo 90%,
    black 90%, black 100%);
    transition: all 1s;
}
.right,.left{
  flex-direction: column;
  justify-content: center;
  p{
    font-size: 30px;
    font-weight: 900;
  }
}
.left{
  align-self: center;
  height:auto;
}
@media(min-width:1024px) {
  .left{
      writing-mode: vertical-rl;
         height: 400px;
  }
}
.center2{
  transition: all 1s;
  transform: translateY(700px);
  text-align: center;
  background:linear-gradient(0deg, rgba(0, 87, 183,0.6)	 50%, rgba(	255, 215, 0,0.6)
 50%);
 i{
  color: #0D0D0D ;
  font-size: 100px;
 }
}
</style>
<script>
import AOS from "aos";
import Swiper from '../components/Userboard/Swiper.vue';
import UserNavbar from '../components/Userboard/UserNavbar.vue';
import Marquee from '../components/Userboard/Marquee.vue';
import News from '../components/Userboard/News.vue';
import Userfoot from '../components/Userboard/Userfoot.vue'

export default {
  data() {
    return {
      products:[],
      isLoading:false,
      scrollY:0,
    //   尚未emit
    };
  },
  components: {
    Swiper,
    UserNavbar,
    Marquee,
    News,
    Userfoot,
  },
  methods: {
    getPageScroll(val){
      this.scrollY = val;
      console.log(this.scrollY);
      if(val>200&&val<900){
        this.centerStart(val);
      }
      if(val>=900){
      console.log("true");
      this.$refs.center.style.cssText=`transform: translateY(0px);`
      }
      if(val>=1100){
      this.$refs.center2.style.cssText = `transform: translateY(0px);`;
      }
    },
    centerStart(val){
      let height = val - 900;
      let height2 = 1300 - val;
      this.$refs.center.style.cssText = `transform: translateY(${height}px);`;
      this.$refs.center2.style.cssText = `transform: translateY(${height2}px);`;
    },
  },
  created() {
   AOS.init();
  },
};
</script>