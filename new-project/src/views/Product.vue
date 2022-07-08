<template>
  <Loading :active="isLoading">
    <img src="../assets/image/Infinity-1.6s-200px.gif" />
  </Loading>
  <UserNavbar></UserNavbar>
  <div class="bg">
    <div class="container">
      <nav aria-label="breadcrumb" class="">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-light">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products" class="text-light"
              >Products</router-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">本商品</li>
        </ol>
      </nav>
      <div class="row main">
        <div class="img-box p-0 col-6">
          <img :src="mainImage" class="mainImg" />
          <ul class="imageList">
            <li><img :src="product.imageUrl" @click.prevent="seeImage(product.imageUrl)"/></li>
            <li v-for="(image, index) in product.imagesUrl" :key="index">
              <img :src="image" @click.prevent="seeImage(image)" />
            </li>
          </ul>
        </div>
        <div class="col-6">
          <h1 class="h2 text-light text-shadow mt-5">{{ product.title }}</h1>
          <p class="mt-5 text-primary text-shadow">描述 :</p>
          <p class="text-light text-shadow description">
            {{ product.description }}
          </p>
          <p class="mt-5 text-primary text-shadow">商品介紹 :</p>
          <p class="text-light text-shadow content">{{ product.content }}</p>
        </div>
      </div>
    </div>
    <Userfoot></Userfoot>
  </div>
</template>
<style scoped lang="scss">
.imageList {
    width: 600px;
    justify-content:space-between;
    display: flex;
  background: rgba(0,0,0,0.3);
  padding: 15px 0px;
  list-style-type: none;
  img {
    cursor: pointer;
    width: 150px;
    height: 150px;
  }
}
.description,
.content {
  white-space: pre-line;
}
.text-gray {
  color: hotpink;
}
.text-shadow {
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.6);
}
.main {
  overflow: hidden;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3);
  padding: 0px 0px !important;
}
.mainImg {
  width: 600px;
  height: 600px;
}
.bg {
  padding-top: 150px;
  background: url(https://images.unsplash.com/photo-1610353302603-19d561437882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
  background-size: cover;
  background-attachment: fixed;
  background-position: top;
  min-height: 100vh;
}
@media (max-width: 698px) {
  .mainImg {
    width: 300px;
    height: 300px;
  }
}
</style>
<script>
import UserNavbar from "../components/Userboard/UserNavbar.vue";
import Userfoot from "../components/Userboard/Userfoot.vue";

export default {
  components: {
    UserNavbar,
    Userfoot,
  },
  data() {
    return {
      isLoading: false,
      id: "",
      product: {},
      mainImage:"",
    };
  },
  watch: {
    product() {
      this.product.imagesUrl.forEach((value, index, array) => {
        if (value == "" || null || undefined) {
          console.log(value);
          this.product.imagesUrl[index] =
            "https://images.unsplash.com/photo-1537490613201-cabe37b1bf52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";
        }
      });
    },
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log("res", res);
        this.isLoading = false;
        if (res.data.success) {
          console.log("data", res.data);
          this.product = res.data.product;
          console.log("product", this.product);
        this.mainImage=this.product.imageUrl;
        }
      });
    },
    seeImage(url){
        this.mainImage = url;
    }
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
      },
};
</script>