<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark backBar"
    style="width: 280px"
  >
    <a
      href="/"
      class="
        d-flex
        align-items-center
        mb-3 mb-md-0
        me-md-auto
        text-white text-decoration-none
      "
    >
      brandA
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/dashboard/products" href="#" class="nav-link d-flex">
          <i class="bi bi-shop"></i>
          <h5 class="mx-2">商品管理</h5>
        </router-link>
      </li>
      <li class="nav-item">
        <a  href="#" class="nav-link d-flex">
          <i class="bi bi-calculator"></i>

          <h5 class="mx-2">訂單管理</h5>
        </a>
      </li>
      <li>
        <router-link to="/dashboard/article" href="#" class="nav-link d-flex">
          <i class="bi bi-file-text"></i>
          <h5 class="mx-2">文章管理</h5>
        </router-link>
      </li>
      <li>
        <a href="#" class="nav-link d-flex">
          <i class="bi bi-ticket-perforated"></i>
          <h5 class="mx-2">優惠券管理</h5>
        </a>
      </li>
    </ul>
    <h4>Dashboard</h4>
    <hr />
    <div class="admin d-flex">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none"
      >
        <img
          src="https://github.com/mdo.png"
          alt=""
          width="32"
          height="32"
          class="rounded-circle me-2"
        />
        <strong>admin_test</strong>
      </a>
      <a class="nav-link" href="#" @click.prevent="logout">登出</a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");
.backBar {
  height: 100vh;
  left: 0;
}

.router-link-active{
  color: #fff;
    background-color: #D9AA71;
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
