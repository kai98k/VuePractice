<template>
  <div>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-primary mx-5"
        type="button"
        @click="openModal(true)"
      >
        新增文章
      </button>
    </div>

    <Loading :active="isLoading"></Loading>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col" width="200">建立時間</th>
          <th scope="col" width="300">標題</th>
          <th scope="col" width="300">標籤</th>
          <th scope="col">是否發布</th>
          <th scope="col">作者</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="item in articles" :key="item.id">
          <td>{{ date(item.create_at) }}</td>
          <td>{{ item.title }}</td>
          <td>
            <span v-for="(tagItem, index) in item.tag" :key="index">{{
              tagItem
            }}</span>
          </td>
          <td>
            <span class="text-success" v-if="item.isPublic">已發布</span>
            <span class="text-danger" v-else>未發布</span>
          </td>
          <td>{{ item.author }}</td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-secondary btn-sm"
                @click="openModal(false, item)"
              >
                <i class="bi bi-pencil-square"></i>

                編輯
              </button>
              <button class="btn btn-danger btn-sm" @click="openDelModal(item)">
                <i class="bi bi-trash3-fill"></i>
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-pages="getArticles"></pagination>
    <articleModal
      ref="articleModal"
      :article="tempArticle"
      @update-article="updateArticle"
    ></articleModal>
    <delModal
      ref="delModal"
      :item="tempArticle"
      @del-item="delArticle"
    ></delModal>
  </div>
</template>

<script>
// import page from "../components/page.vue";
import { date } from "../methods/filters.js";
import articleModal from "../components/Dashboard/ArticleModal.vue";
import delModal from "../components/Dashboard/DelModal.vue";
import pagination from "../components/Pagination.vue";

export default {
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    articleModal,
    delModal,
    pagination,
  },
  inject: ["emitter"],
  methods: {
    date,
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`;
      this.isLoading = true;
      console.log(this.isLoading, "loading");
      this.$http.get(api).then((res) => {
        console.log("res", res);
        this.isLoading = false;
        console.log(this.isLoading, "loading");
        if (res.data.success) {
          console.log("article", res.data);
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {};
      } else {
        this.tempArticle = { ...item };
      }
      this.isNew = isNew;
      console.log(isNew, item);
      const articleComponent = this.$refs.articleModal;
      articleComponent.showModal();
    },
    openDelModal(item) {
      // v-for 傳 item 進來到
      this.tempArticle = { ...item };
      console.log(this.tempArticle, "item");
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delArticle() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getArticles();
      });
    },
    updateArticle(item) {
      this.tempArticle = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      const articleComponent = this.$refs.articleModal;
      let httpMethod = "post"; //如果是新產品就用post

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        httpMethod = "put";
      }
      //axios 搭配變數使用方法
      this.$http[httpMethod](api, { data: this.tempArticle }).then((res) => {
        console.log(res);
        articleComponent.hideModal();
        if (res.data.success) {
          this.getArticles();
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
    var a = Date.now();
    // let b = a.getTime();
    console.log("time", date(a));

    // console.log('time',this.date(a));
    this.getArticles();
  },
};
</script>