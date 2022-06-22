<template>
  <nav class="navbar navbar-expand-lg bg-main fixed-top">
    <div class="container d-flex justify-content-between align-items-center">
      <a class="navbar-brand text-light text-shadow" href="#">N E E D</a>
      <ul class="navbar-nav mb-2 mb-lg-0 align-items-center">
        <li class="nav-item">
          <a class="nav-link active text-light text-shadow" aria-current="page" href="#"
            >Products</a
          >
        </li>
        <li class="nav-item me-3">
          <a class="nav-link text-light text-shadow" href="#">Articles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light text-shadow" href="#"><i class="bi bi-cart4 nav-text"></i>
</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.nav-text{
  font-size: 1.4rem;
}
.text-shadow {
  text-shadow: 1px 3px 2px black;
}
.navbar-brand {
  font-size: 24px;
}
.bg-main {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>