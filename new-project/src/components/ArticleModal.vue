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
          <h5 class="modal-title" id="exampleModalLabel">新增文章</h5>
          <button
            type="button"
            class="btn-close btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-end">
            文章建立時間: {{ date(tempArticle.create_at) }}
          </p>
          <div class="d-flex justify-content-around align-items-center">
            <img :src="tempArticle.image" class="img-fluid image" />
            <div class="">
              <label for="image">照片網址</label>
              <input
                type="text"
                class="form-control mx-3"
                id="image"
                placeholder="請輸入照片網址"
                v-model="tempArticle.image"
              />
              <label for="customFile" class="form-label"
                >或 上傳圖片
                <i class="fas fa-spinner fa-spin"></i>
              </label>
              <input
                type="file"
                id="customFile"
                class="form-control mx-3"
                ref="fileInput"
                @change="uploadFile()"
              />
            </div>
          </div>

          <div class="input-group d-flex mt-3 align-items-center">
            <label for="title">文章標題 :</label>
            <input
              type="text"
              class="form-control mx-3"
              id="title"
              placeholder="請輸入文章標題"
              v-model="tempArticle.title"
            />
            <label for="author">文章作者 :</label>
            <input
              type="text"
              class="form-control mx-3"
              id="author"
              placeholder="請輸入文章作者"
              v-model="tempArticle.author"
            />
          </div>
          <div class="input-group d-flex mt-3 align-items-center">
            <label for="tag">文章標籤 :</label>
            <input
              type="text"
              class="form-control mx-3"
              id="tag"
              placeholder="請輸入文章標籤"
              v-model="tempArticle.tag"
            />
            <label for="public">是否發布 :</label>
            <input
              type="checkbox"
              class="form-check-input mx-3"
              id="public"
              v-model="tempArticle.isPublic"
            />
          </div>
          <label for="description">文章描述 :</label>
          <textarea
            class="form-control"
            v-model="tempArticle.description"
            id="description"
            placeholder="請輸入描述"
          >
          </textarea>
          <label for="content">文章內容 :</label>
          <textarea
            class="form-control"
            v-model="tempArticle.content"
            id="content"
            placeholder="請輸入內容"
          >
          </textarea>
        </div>
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
<style scoped lang="scss">
.image {
  margin: 10px 0;
  width: 300px;
}
</style>
<script>
import Modal from "bootstrap/js/dist/modal";
import { date } from "../methods/filters";

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
      console.log(this.tempArticle);
      if (this.tempArticle.create_at == undefined || null || NaN) {
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
    date,
    showModal() {
      this.modal.show();
      console.log(this.article, "article-inner");
    },
    hideModal() {
      this.modal.hide();
    },
    uploadFile() {
      let uploadedFile;
      uploadedFile = this.$refs.fileInput.files[0];
      console.dir(uploadedFile);
      const formData = new FormData(); //post 方法
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.tempArticle.image = response.data.imageUrl;
        }
      });
    },
  },
  mounted() {
    //  mounted 生命週期 created 完成後
    this.modal = new Modal(this.$refs.modal);
    // 在 template 掛載 ref，完整生成 template 後，使用 $refs 取得 DOM
  },
};
</script>