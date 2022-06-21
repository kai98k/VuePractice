<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-scrollable" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mt-3 align-items-center flex-wrap">
            <label class="form-label" for="title">優惠券名稱</label>
            <input
              type="text"
              class="form-control mx-3"
              id="title"
              placeholder="請輸入優惠券名稱"
              v-model="tempCoupon.title"
            />
          </div>
          <div class="input-group mt-3 align-items-center flex-wrap">
            <label class="form-label" for="sale">折扣%數</label>
            <input
              type="number"
              class="form-control mx-3"
              id="sale"
              placeholder="請輸入折扣%數"
              v-model="tempCoupon.percent"
              max="100"
            /><label class="form-label" for="num">優惠券數量</label>
            <input
              type="number"
              class="form-control mx-3"
              id="num"
              placeholder="請輸入數量"
              v-model="tempCoupon.is_enabled"
            />
          </div>
          <div class="input-group mt-3 align-items-center flex-wrap">
            <label class="form-label" for="code">兌換碼</label>
            <input
              type="text"
              class="form-control mx-3"
              id="code"
              placeholder="請輸入兌換碼"
              v-model="tempCoupon.code"
            />
            <label class="form-label" for="date">優惠券到期日</label>
            <input
              type="date"
              class="form-control mx-3"
              id="date"
              v-model="tempCoupon.due_date"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-coupon', tempCoupon)"
          >
            <!-- emit 將內層資料向外傳遞 -->
            確認
          </button>
          <!-- emit 也可以寫在 method 中 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      if (this.tempCoupon.due_date) {
        console.log("22");
        this.tempCoupon.due_date = new Date(this.coupon.due_date)
          .toISOString()
          .slice(0, 10);
      }
    },
  },
  data() {
    return {
      modal: {},
      tempCoupon: {},
    };
  },
  methods: {
    showModal() {
      this.modal.show();
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