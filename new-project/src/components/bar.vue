<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-light
      bg-light
      container-fluid
      pb-0
      pt-2
    "
  >
    <div class="container">
      <router-link to="/UserBoard" class="navbar-brand text-center" href="#"
        ><span class="h1">NEED</span>
        <h5 class="mb-0 mt-2">你的雜貨專賣</h5>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">商品管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">文章管理</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="#">訂單管理</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="#">優惠券管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");
nav {
  position: fixed;
  z-index: 50;
  top: 0;
}
.navbar-collapse {
  flex-grow: 0;
}
.h1 {
  font-size: 25px;
  font-family: "Rock Salt", cursive;
}
</style>
<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      // 登出功能
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>