<template>
  <Loading :active="isLoading"></Loading>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">建立時間</th>
      <th scope="col">標題</th>
      <th scope="col">描述</th>
      <th scope="col">作者</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
<pagination :pages="pagination" @emit-pages="getArticle"></pagination>
</template>

<script>
import pagination from "../components/Pagination.vue";


export default {
    data() {
        return {
            articles:[],
            pagination: {},
            tempArticles: {},
            isNew: false,
            isLoading: false,
        };
    },
    component:{
    pagination
    },
    inject: ["emitter"],
    methods: {
        getArticle(page = 5) {
      console.log(page);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`;
      this.isLoading = true;
      console.log(this.isLoading,"loading");
      this.$http.get(api).then((res) => {
        console.log("res", res);
        this.isLoading = false;
        console.log(this.isLoading,"loading");
        if (res.data.success) {
          console.log("article", res.data);
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        }
      });
    },
    },
    created() {
        this.getArticle();
    },
}
</script>