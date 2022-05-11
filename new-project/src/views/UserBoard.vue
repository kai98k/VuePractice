<template>
  <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
</template>
<script>
import pagination from "../components/Pagination.vue";
import {currency} from "../methods/filters.js";

export default {
  data() {
    return {
      products:[],
      isLoading:false,
      pagination: {},
    //   尚未emit
    };
    
  },
  components: {
    pagination,
  },
  methods: {
    currency,
    getProducts(page = 1) {
      console.log(page);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          console.log("products", res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;

        }
      });
    },
  },
  created() {
    console.log(currency(1000));
    this.getProducts();
  },
};
</script>