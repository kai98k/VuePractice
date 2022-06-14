<template>
  
  <pagination :pages="pagination" @emit-pages="getProducts"></pagination>

  <!-- :product 內層資料綁定外層資料 tempProduct，利用 emit前內後外，將資料從內層傳回外層 -->

  <!-- :item 內層資料綁定外層資料 tempProduct，一樣 call 外層進去渲染，ref 傳參考來使用內層 method -->
</template>
<style scoped lang="scss">
table{
  box-shadow:3px 3px 10px black;
}
</style>
<script>
import pagination from "../components/Pagination.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
    };
  },
  components: {
    pagination,
  },
  inject: ["emitter"],
  methods: {
    currency,
    getProducts(page = 1) {
      console.log(page);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          console.log("products", res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
  },
  created() {
  },
};
</script>