<template>
  <UserNavbar></UserNavbar>
  <Loading :active="isLoading">
    <img src="../assets/image/Infinity-1.6s-200px.gif" />
  </Loading>
  <div class="wrap">
    <div class="container-fluid main pt-5">
      <h1 class="text-center text-shadow text-light mt-5">
        你的美妝、保養都在<br />N E E D
      </h1>
    </div>
    <div class="container-fluid bg d-flex px-0">
      <div class="container mt-5">
        <select
          class="form-select catergorySelect"
          aria-label="Default select example"
          @change="changeMenu"
        >
          <option selected disabled>產品分類</option>
          <option value="全部">全部商品</option>
          <option
            :value="category"
            v-for="(category, index) in categories"
            :key="index"
          >
            {{ category }}
          </option>
        </select>
        <nav aria-label="breadcrumb" class="ms-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-light">Home</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Products</li>
          </ol>
        </nav>
        <ul class="card-group row-cols-xl-5 row-cols-md-2 p-0 d-sm-flex">
          <li
            v-for="(product, index) in tempProducts"
            :key="index"
            class="mb-5"
          >
            <div class="card mx-1 h-100">
              <div class="img-box">
                <img :src="product.imageUrl" class="card-img-top" alt="..." />
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#" @click.prevent="pushProductPage(product.id)">{{
                    product.title
                  }}</a>
                </h5>
                <p class="card-text d-flex justify-content-between mt-3">
                  <del>{{ product.origin_price }}元</del
                  ><i class="bi bi-arrow-right-short"></i>
                  <span class="text-danger">特價 {{ product.price }} 元</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <pagination
          :pages="pagination"
          @emit-pages="getProducts"
          class="mt-5"
        ></pagination>
        <Userfoot></Userfoot>
      </div>
    </div>
  </div>
  <!-- :product 內層資料綁定外層資料 tempProduct，利用 emit前內後外，將資料從內層傳回外層 -->

  <!-- :item 內層資料綁定外層資料 tempProduct，一樣 call 外層進去渲染，ref 傳參考來使用內層 method -->
</template>
<style scoped lang="scss">
.catergorySelect {
  width: 300px;
  text-align: center;
  margin: 0 auto;
  option {
    text-align: center;
  }
}
.wrap {
  background-image: url(https://images.unsplash.com/photo-1533387520709-752d83de3630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
.card-title {
  a {
    text-decoration: none;
    color: #73513d;
  }
}
.card-group {
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    transition: all 0.5s;
    width: 200px;
    cursor: pointer;
    &:hover {
      transition: all 0.5s;
      transform: scale(1.2);
    }
  }
  li {
    display: flex;
    justify-content: center;
  }
}
ul,
li {
  list-style: none;
}
.card {
  width: 200px;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.3);
  .card-title {
    font-size: 20px !important;
  }
}
.img-box {
  display: flex;
  justify-content: center;
  height: 200px;
  overflow: hidden;
}
.categories {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  li {
    list-style: none;
    text-align: center;
    width: 300px;
    border-bottom: 1px solid rgba(217, 170, 113, 0.3);
  }
  a {
    font-weight: 900;
    font-size: 20px;
    text-decoration: none;
    display: block;
    padding: 10px 15px;
    transition: all 0.5s;

    &:hover {
      transition: all 0.5s;
      color: #f2f1f0;
      text-shadow: 1px 3px 5px black;
      background: rgba(217, 170, 113, 0.5);
    }
  }
}
.text-shadow {
  text-shadow: 1px 3px 5px black;
}
.main {
  // background-image: url(https://source.unsplash.com/1200x900/?beauty);
  // background-color: rgba(255, 255, 255, 0.3);
  // background-position: top;
  // background-attachment: fixed;
  // background-size: cover;
  // box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
}
.bg {
  // background: url(https://images.unsplash.com/photo-1603050906757-df6b62765342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  // background-position: center;
  // background-attachment: fixed;
  // background-size: cover;

  // box-shadow: -5px -6px 7px rgba(0, 0, 0, 0.3);
}
</style>
<script>
import pagination from "../components/Pagination.vue";
import UserNavbar from "../components/Userboard/UserNavbar.vue";
import Userfoot from "../components/Userboard/Userfoot.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isLoading: false,
      categories: [],
      tempProducts: [],
      category: "全部",
    };
  },
  components: {
    pagination,
    UserNavbar,
    Userfoot,
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
          this.clickMenu();
        }
      });
    },
    changeMenu(event) {
      console.log(event.target.value);
      this.clickMenu(event.target.value);
    },
    getMenu() {
      this.products.forEach((product, index, array) => {
        this.categories.push(product.category);
      });
      this.categories = [...new Set(this.categories)];
      console.log(this.categories);
    },
    clickMenu(category = "全部") {
      this.category = category;
      this.tempProducts = [];
      console.log(category);
      this.products.forEach((product, index, array) => {
        if (product.category == category) {
          this.tempProducts.push(product);
        }
        return;
      });
      if (category == "全部") {
        this.products.forEach((product, index, array) => {
          this.tempProducts.push(product);
        });
      }
      console.log(this.tempProducts);
    },
    pushProductPage(id) {
      this.$router.push(`/products/${id}`);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>