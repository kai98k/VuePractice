<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title textShadow" id="exampleModalLabel">購物車</h5>
          <button
            type="button"
            class="btn-close btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col text-center">商品圖片</th>
                <th scope="col text-center">商品名稱</th>
                <th scope="col text-center">售價</th>
                <th scope="col text-center">數量</th>
                <th scope="col text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in cartData.carts" :key="index">
                <td><img :src="cart.product.imageUrl" class="cartImg" /></td>
                <td>{{ cart.product.title }}</td>
                <td>{{ cart.product.price }}/{{ cart.product.unit }}</td>
                <td>
                  <input
                    type="number"
                    v-model="cart.qty"
                    class="form-control"
                    min="0"
                    @change="updateCart(cart)"
                  />
                </td>
                <td><button type="button" class="btn delete"><i class="bi bi-x-lg text-danger"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <div class="text-end h5">總計金額: {{ cartData.final_total }}</div>
          <div>
            <button type="button" class="btn btn-danger me-3">
              清空購物車
            </button>
            <button type="button" class="btn btn-primary">前往下單</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.delete{
  cursor: pointer;
  &:hover{
    transition: all 1.5s;
    transform:rotate(360deg);
  }
}
.modal-footer {
  border: 0;
  padding: 10px 25px;
  justify-content: space-between;
}
.cartImg {
  width: 200px;
  height: 200px;
}
.textShadow {
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5);
}
.text-center {
  text-align: center !important;
}
th,
tr {
  text-align: center !important;
}
td {
  vertical-align: middle;
}
.form-control {
  display: inline-block;
  width: 100px;
}
@media (max-width: 698px) {
  .cartImg {
    width: 90px;
    height: 90px;
  }
  .form-control {
    display: inline-block;
    width: 50px;
  }
}
</style>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  props: {
    carts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    carts() {
      this.cartData = this.carts;
    },
  },
  data() {
    return {
      modal: {},
      cartData: {},
      // 變數拿來裝 ref 取到 modal DOM
    };
  },
  methods: {
    updateCart(item) {
      console.log(item);
      let data = {
        product_id: item.id,
        qty: item.qty,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http.put(api, { data }).then((res) => {
        console.log("res", res);
        if (res.data.success) {
          console.log("data", res.data);
          this.$emit("updateCart", "no");
        }
      });
    },
    showModal() {
      this.modal.show();
      console.log(this.cartData);
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    //  mounted 生命週期 created 完成後
    this.modal = new Modal(this.$refs.modal);
    // 在 template 掛載 ref，完整生成 template 後，使用 $refs 取得 DOM
  },
};
</script>