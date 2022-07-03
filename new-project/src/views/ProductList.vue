<template>
  <UserNavbar></UserNavbar>
  <Loading :active="isLoading">
    <img src="../assets/image/Infinity-1.6s-200px.gif" />
  </Loading>
  <div class="container-fluid main pt-5">
    <h1 class="text-center text-shadow text-light mt-5">
      你的美妝、保養都在 N E E D
    </h1>
  </div>
  <div class="container-fluid bg d-flex">
    <ul class="categories">
      <li v-for="(category, index) in categories" :key="index">
        <a href="#">{{ category }}</a>
      </li>
    </ul>
    <div class="container mx-0">
      <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
    </div>
  </div>

  <!-- :product 內層資料綁定外層資料 tempProduct，利用 emit前內後外，將資料從內層傳回外層 -->

  <!-- :item 內層資料綁定外層資料 tempProduct，一樣 call 外層進去渲染，ref 傳參考來使用內層 method -->
</template>
<style scoped lang="scss">
.categories {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  a {
    padding: 10px 15px;
  }
}
.text-shadow {
  text-shadow: 1px 3px 5px black;
}
.main {
  background-image: url(https://source.unsplash.com/1200x900/?beauty);
  background-color: rgba(255, 255, 255, 0.3);
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  min-height: 300px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
}
.bg {
  padding-top: 150px;
  background: url(https://images.unsplash.com/photo-1524313118018-d8139913a0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);

  box-shadow: -5px -6px 7px rgba(0, 0, 0, 0.3);

  min-height: 100vh;
}
</style>
<script>
import pagination from "../components/Pagination.vue";
import UserNavbar from "../components/Userboard/UserNavbar.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isLoading: false,
      categories: [],
    };
  },
  components: {
    pagination,
    UserNavbar,
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      console.log(page);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          console.log("products", res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.getMenu();
        }
      });
    },
    getMenu() {
      this.products.forEach((product, index, array) => {
        this.categories.push(product.category);
      });
      this.categories = [...new Set(this.categories)];
      console.log(this.categories);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>