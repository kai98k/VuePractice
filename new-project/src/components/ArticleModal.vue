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
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增文章</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
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
    article: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    article() {
      this.tempArticle = this.article;
      if(this.tempArticle.create_at == undefined || null||NaN) {
        this.tempArticle.create_at = Date.now();
      }
      // 觸發props，外層向內層注入資料，因為單向數據流，不可以直接修改外層資料
    //   console.log(this.tempProduct.imagesUrl);
    //   if (this.tempProduct.imagesUrl == undefined || null) {
    //     this.tempProduct.imagesUrl = [];
    //   }
    },
  },
  data() {
    return {
      modal: {},
      // 變數拿來裝 ref 取到 modal DOM
      tempArticle: {},
    };
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    // uploadFile(key) {
    //   let uploadedFile;
    //   console.log(key);
    //   if (key == undefined) {
    //     uploadedFile = this.$refs.fileInput.files[0];
    //     //利用 key 傳進來做判斷是主圖還是附圖
    //   } else {
    //     uploadedFile = this.$refs.file[key].files[0];
    //     //利用 ref 取得 NODELIST 回來
    //   }
    //   console.dir(uploadedFile);
    //   console.log(this.tempProduct);
    //   const formData = new FormData(); //post 方法
    //   formData.append("file-to-upload", uploadedFile);
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
    //   this.$http.post(url, formData).then((response) => {
    //     console.log(response.data);
    //     if (response.data.success) {
    //       if (key == undefined)
    //         this.tempProduct.imageUrl = response.data.imageUrl;
    //       else {
    //         this.tempProduct.imagesUrl[key] = response.data.imageUrl;
    //       }
    //     }
    //   });
    // },
  },
  mounted() {
    //  mounted 生命週期 created 完成後
    this.modal = new Modal(this.$refs.modal);
    // 在 template 掛載 ref，完整生成 template 後，使用 $refs 取得 DOM
  },
};
</script>