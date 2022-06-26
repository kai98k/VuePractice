<template>
  <Loading :active="isLoading"></Loading>
  <UserNavbar></UserNavbar>
  <div class="container-fluid main pt-5">
    <div class="container">
      <h1 class="text-center mt-5 text-shadow text-light">
        {{ article.title }}
      </h1>
        <h5  class="text-center mt-3 text-shadow text-light"><span>發布於 </span>{{ date(article.create_at) }}</h5>
      <h4  class="text-center mt-3 text-shadow text-light">作者 : {{ article.author }}<span></span></h4>
      <p class="text-center mt-3 text-shadow text-light">標籤: <span v-for="(tagItem, index) in article.tag" :key="index">{{
              tagItem
            }}</span></p>
    </div>
  </div>
  <div class="container-fluid bg pt-5">
      <div class="container article mx-auto pb-5 relative">
         <span class="sticky"><img src="http://pngimg.com/uploads/pin/pin_PNG64.png"></span>
         <span class="sticky2"><img src="http://pngimg.com/uploads/pin/pin_PNG64.png"></span>
        <img :src="article.image" class="image" />
        <span class="mx-3 mt-5 pre">{{article.description}}</span>
        <p style="white-space:pre-wrap;" class="mx-3 mt-5">{{article.content}}</p>
      </div>
      <Userfoot></Userfoot>
  </div>
</template>
<style scoped lang="scss">
.sticky,.sticky2{
 
    position: absolute;
    width: 60px;
    img{
        width: 60px;
        transform: rotate3d(-1, -2, 7, 250deg);
    }
}
.sticky{   top: 10px;
        left: 25px;
}
.sticky2{
    top: 13px;
    right: 25px;
    position: absolute;
}
.relative{
    position: relative;
}
.bg{
background: url(https://images.unsplash.com/photo-1560780552-ba54683cb263?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
box-shadow: -5px -6px 7px rgba(0,0,0,0.3);
background-size: cover;

}
.image{
    max-height: 500px;
}
.article{
    box-shadow: 2px 6px 10px rgba(5,5,5,0.5);
    overflow: hidden;
    padding: 0px;
    max-width: 900px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: #ffffff;
}

.pre{
    border-radius: 15px;
    border-left: 15px #D9AA71  solid;
    background: rgba(0,0,0,0.2);
    padding: 15px 20px;
}
.main {
  background-image: url(https://source.unsplash.com/1600x900/?skin);
  background-color: rgba(255,255,255,0.3);
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  min-height: 400px;
box-shadow: 1px 1px 2px black;
}
.text-shadow {
  text-shadow: 1px 3px 5px black;
}
</style>
<script>
import AOS from "aos";
import UserNavbar from "../components/Userboard/UserNavbar.vue";
import {date} from '../methods/filters'
import Userfoot from '../components/Userboard/Userfoot.vue'
export default {
  data() {
    return {
      id: "",
      isLoading: false,
      article: {},
    };
  },
  components: {
    UserNavbar,
    Userfoot
  },
  methods: {
    date,
    getArticle() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log("res", res);
        this.isLoading = false;
        if (res.data.success) {
          console.log("article", res.data);
          this.article = res.data.article;
        }
      });
    },
  },
  created() {
    this.id = this.$route.params.articleId;
    console.log(this.id);
    this.getArticle();
  },
};
</script>