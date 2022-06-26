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
            <span>新增產品</span>
          </h5>
          <button
            type="button" 
            class="btn-close btn-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageMain" class="form-label">輸入主圖網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageMain"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile()"
                />
              </div>
              <img class="img-fluid" alt="" :src="tempProduct.imageUrl" />
              <!-- 延伸技巧，多圖 -->
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品說明內容"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap">
            <div
              v-for="(image, key) in tempProduct.imagesUrl"
              :key="key"
              class="col-4"
            >
              <label :for="'url' + key" class="form-label"
                >輸入副圖{{ key + 1 }}網址</label
              >
              <input
                type="text"
                class="form-control"
                :id="key"
                placeholder="請輸入圖片連結"
                v-model="tempProduct.imagesUrl[key]"
              />
              <label :for="'file' + key" class="form-label"
                >或 上傳圖片
                <i class="fas fa-spinner fa-spin"></i>
              </label>
              <input
                type="file"
                :id="'file' + key"
                class="form-control"
                ref="file"
                @change="uploadFile(key)"
              />
                        
              <img :src="image" class="img-fluid" />
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="tempProduct.imagesUrl.splice(key, 1)"
              >
                移除
              </button>
            </div>
            <div v-if="tempProduct.imagesUrl">
              <button
                v-if="tempProduct.imagesUrl.length !== 5"
                class="btn btn-secondary btn-sm d-block w-100"
                @click="tempProduct.imagesUrl.push('')"
              >
                新增副圖圖片
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
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
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product() {
      this.tempProduct = this.product;
      // 觸發props，外層向內層注入資料，因為單向數據流，不可以直接修改外層資料
      console.log(this.tempProduct.imagesUrl);
      if (this.tempProduct.imagesUrl == undefined || null) {
        this.tempProduct.imagesUrl = [];
      }
    },
  },
  data() {
    return {
      modal: {},
      // 變數拿來裝 ref 取到 modal DOM
      tempProduct: {},
    };
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    uploadFile(key) {
      let uploadedFile;
      console.log(key);
      if (key == undefined) {
        uploadedFile = this.$refs.fileInput.files[0];
        //利用 key 傳進來做判斷是主圖還是附圖
      } else {
        uploadedFile = this.$refs.file[key].files[0];
        //利用 ref 取得 NODELIST 回來
      }
      console.dir(uploadedFile);
      console.log(this.tempProduct);
      const formData = new FormData(); //post 方法
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          if (key == undefined)
            this.tempProduct.imageUrl = response.data.imageUrl;
          else {
            this.tempProduct.imagesUrl[key] = response.data.imageUrl;
          }
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