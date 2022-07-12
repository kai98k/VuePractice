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
          <h5 class="modal-title textShadow" id="exampleModalLabel">購物車
</h5>
          <button
            type="button"
            class="btn-close btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
         <table class="table"> <thead>
    <tr>
      <th scope="col text-center">商品圖片</th>
      <th scope="col text-center">商品名稱</th>
      <th scope="col text-center">售價</th>
      <th scope="col text-center">數量</th>
    </tr>
  </thead></table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.textShadow{
  text-shadow: 1px 3px 5px rgba(0,0,0,0.5);
}
.text-center{
  text-align: center !important;
}
</style>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      modal: {},
      // 變數拿來裝 ref 取到 modal DOM
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