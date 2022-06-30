<template>
  <div class="container main mx-auto" id="news">
    <h4 class="text-center text-light text-shadow py-5 m-0">News</h4>
    <hr>
    <ul>
      <li v-for="item in articles" :key="item.id" class="d-flex text-light text-shadow mx-auto my-2">
        <p class="me-5">{{date(item.create_at)}}</p><p><a href="#" @click.prevent="pushArticlePage(item.id)">{{item.title}}</a></p>
      </li>
    </ul>
      <pagination :pages="pagination" @emit-pages="getArticles" class="page"></pagination>
  </div>
</template>
<style scoped lang="scss">
li{
  border-bottom: 0.5px solid rgba(255,255,255,0.4);
  justify-content: space-between;
}
a{
    text-decoration: none;
}
.main {
  margin-top: 100px;
  padding-bottom:100px ;
  display: flex;
    flex-direction: column;
    align-items: center;
}
.text-shadow {
  font-weight: 900;
  text-shadow: 2px 2px 5px #0d0d0d;
}
.bg{
    margin: 0 auto;
    max-width: 1000px;
    background: rgba(255,255,255,0.4);
    border-radius: 10px;
}
</style>
<script>
import pagination from "../Pagination.vue";
import {date} from '../../methods/filters'
export default {
  data() {
    return {
      pagination: {},
    articles: [],
    };
  },
  components: {
    pagination,
  },
  methods: {
    date,
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles/?page=${page}`;
      this.$http.get(api).then((res) => {
        console.log("res", res);
        if (res.data.success) {
          console.log("article", res.data);
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        }
      });
    },
      pushArticlePage(id) {
      this.$router.push(`/news/${id}`);
    },
  },
  created() {
    this.getArticles();
  },
};
</script>