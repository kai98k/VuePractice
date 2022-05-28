<template>
  <Loading :active="isLoading"></Loading>
  <div class="d-flex justify-content-between">
    <h2>後台管理頁</h2>
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      增加一個產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal(item)"
            >
              <!-- 將 item 傳進 modal 中 -->
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
  <productModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></productModal>
  <!-- :product 內層資料綁定外層資料 tempProduct，利用 emit前內後外，將資料從內層傳回外層 -->
  <delModal
    ref="delModal"
    :item="tempProduct"
    @del-item="delProduct"
  ></delModal>
  <!-- :item 內層資料綁定外層資料 tempProduct，一樣 call 外層進去渲染，ref 傳參考來使用內層 method -->
</template>
<script>
import productModal from "../components/ProductModal.vue";
import delModal from "../components/DelModal.vue";
import pagination from "../components/Pagination.vue";
import {currency} from "../methods/filters.js";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    delModal,
    productModal,
    pagination,
  },
  inject: ["emitter"],
  methods: {
    currency,
    getProducts(page = 1) {
      console.log(page);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
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
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
        console.log("temp", this.tempProduct);
      }
      this.isNew = isNew;
      console.log(isNew, item);
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    openDelModal(item) {
      // v-for 傳 item 進來到
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      const productComponent = this.$refs.productModal;
      let httpMethod = "post";

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        console.log(res);
        productComponent.hideModal();
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit("push-message", {
            style: "success",
            title: "更新成功",
          });
        } else {
          this.emitter.emit("push-message", {
            style: "danger",
            title: "更新失敗",
            content: res.data.message.join("、"),
          });
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
