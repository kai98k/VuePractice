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
    <Loading :active="isLoading">
      <img src="../../assets/image/Infinity-1.6s-200px.gif" />
    </Loading>
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
          <h5 v-if="cartLength == 0" class="text-center py-5">
            目前沒有商品，趕快去購物吧~
          </h5>
          <table v-else class="table table-hover">
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
                  <div
                    class="spinner-grow"
                    role="status"
                    v-if="cart.id == status.loading"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <input
                    :disabled="cart.id == status.loading"
                    type="number"
                    v-model="cart.qty"
                    class="form-control"
                    min="0"
                    @change="updateCart(cart)"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn delete"
                    @click="deleteCart(cart)"
                  >
                    <i class="bi bi-x-lg text-danger"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer" v-if="cartLength>0">
          <div>
            <button class="btn btn-outline-dark" type="button" @click="useCoupon">套用優惠</button>
            <input id="coupon" class="form-control ms-3" type="text" placeholder="輸入優惠券"  v-model="code" style="width:200px"/>
            <span class="ms-3 text-danger" v-if="!couponFound">*無此優惠券</span>
            <h5 class="mt-3">總計金額 : {{ cartData.total }} 元</h5>
            <h5>優惠金額 : {{Math.round(cartData.final_total)}} 元</h5>

          </div>
          <div>
            <button
              type="button"
              class="btn btn-danger me-3"
              @click="deleteAllCarts"
            >
              清空購物車
            </button>
            <router-link to="/userorder" class="btn btn-primary" @click="hideModal">前往下單</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.spinner-grow {
  margin-right: 5px;
  vertical-align: middle !important;
}
.delete {
  cursor: pointer;
  &:hover {
    transition: all 1.5s;
    transform: rotate(360deg);
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
  components: {},
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
      this.cartLength = this.cartData.carts.length;
    },
  },
  data() {
    return {
      couponFound:true,
      code:"",
      cartLength: 0,
      isLoading: false,
      modal: {},
      cartData: {},
      status: {
        loading: "",
      },
      // 變數拿來裝 ref 取到 modal DOM
    };
  },
  methods: {
    useCoupon(){
       let data = {
         code:this.code,
       }
       const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
       this.$http.post(api,{data})
        .then((res) => {
          this.couponFound = res.data.success;
          this.cartData.final_total = res.data.data.final_total;
          console.log("coupon",res);
        })
    },
    deleteAllCarts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(api).then((res) => {
        console.log("res", res);
        this.$emit("updateCart", "delete");
      });
      this.isLoading = false;
    },
    deleteCart(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http.delete(api).then((res) => {
        console.log("res", res);
        this.$emit("updateCart", "delete");
      });
      this.isLoading = false;
    },
    updateCart(item) {
      console.log(item);
      this.status.loading = item.id;
      let data = {
        product_id: item.id,
        qty: item.qty,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http.put(api, { data }).then((res) => {
        console.log("res", res);
        if (res.data.success) {
          console.log("data", res.data);
          this.$emit("updateCart", "update");
          this.status.loading = "";
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