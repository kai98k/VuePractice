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
        <div class="modal-footer" v-if="cartLength > 0">
          <div class="wrap">
            <div>
              <button
                class="btn btn-outline-dark"
                type="button"
                @click="useCoupon"
              >
                套用優惠
              </button>
              <input
                id="coupon"
                class="form-control ms-3"
                type="text"
                placeholder="輸入優惠券"
                v-model="code"
                style="width: 200px"
              />
              <span class="ms-3 text-danger" v-if="!couponFound"
                >*無此優惠券</span
              >
              <h5 class="mt-3">總計金額 : {{ cartData.total }} 元</h5>
              <h5>優惠金額 : {{ Math.round(cartData.final_total) }} 元</h5>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-danger me-3"
                @click="deleteAllCarts"
                v-if="!IsOrdered"
              >
                清空購物車
              </button>
              <button
                type="button"
                class="btn btn-success me-3"
                v-if="IsOrdered"
                @click="SendOrder"
              >
                確定下單
              </button>
              <button
                class="btn btn-primary"
                @click="openOrder"
                v-if="!IsOrdered"
              >
                前往下單
              </button>
              <button
                class="btn btn-danger"
                @click="openOrder"
                v-if="IsOrdered"
              >
                取消下單
              </button>
            </div>
          </div>
          <div v-if="IsOrdered" class="order">
            <div>
              <h5 class="text-center">下單資料</h5>
              <label for="name" class="form-label">姓名</label>
              <input
                v-model="user.name"
                type="text"
                class="form-control"
                id="name"
                placeholder="下單者姓名"
                required
              />
              <label for="email" class="form-label mt-2">電子郵件</label>
              <input
                v-model="user.email"
                type="email"
                class="form-control"
                id="email"
                placeholder="email@.com"
                required
              />
              <label for="tel" class="form-label mt-2">手機號碼</label>
              <input
                v-model="user.tel"
                type="tel"
                class="form-control"
                id="tel"
                placeholder="您的手機號碼"
                required
              />
              <label for="address" class="form-label mt-2">地址</label>
              <input
                v-model="user.address"
                type="text"
                class="form-control"
                id="address"
                placeholder="您的寄送地址"
                required
              />
              <label for="message" class="form-label mt-2">留言</label>
              <textarea
                id="message"
                rows="5"
                cols="33"
                class="form-control"
                v-model="message"
              >
您的特殊需求...
</textarea
              >
            </div>
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
  display: block;
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-control {
    display: inline-block;
    width: 100%;
  }
  .order {
    display: flex;
    justify-content: center;
  }
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
      couponFound: true,
      code: "",
      cartLength: 0,
      isLoading: false,
      modal: {},
      cartData: {},
      status: {
        loading: "",
      },
      IsOrdered: false,

      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      message: "",
    };
  },
  methods: {
    useCoupon() {
      let data = {
        code: this.code,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http.post(api, { data }).then((res) => {
        this.couponFound = res.data.success;
        this.cartData.final_total = res.data.data.final_total;
        console.log("coupon", res);
      });
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
    SendOrder() {
      let data = {
        user: this.user,
        message: this.message,
      };
      console.log("orderData",data);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(api, { data }).then((res) => {
        console.log("res", res);
        if (res.data.success) {
          this.hideModal();
          this.$router.push('/userorder')
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
    openOrder() {
      console.log(this.IsOrdered);
      this.IsOrdered = !this.IsOrdered;
    },
  },
  mounted() {
    //  mounted 生命週期 created 完成後
    this.modal = new Modal(this.$refs.modal);
    // 在 template 掛載 ref，完整生成 template 後，使用 $refs 取得 DOM
  },
};
</script>
