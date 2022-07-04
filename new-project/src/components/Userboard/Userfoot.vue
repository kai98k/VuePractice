<template>
  <footer class="container mt-5 py-2">
    <div class="mx-auto text-center mt-3">
      <a href="#" class="px-2"
        ><i class="bi bi-instagram text-shadow text-light"></i>
      </a>
      <a href="#" class="px-2"
        ><i class="bi bi-facebook text-shadow text-light"></i>
      </a>
      <a href="#" class="px-2"
        ><i class="bi bi-line text-shadow text-light"></i>
      </a>
    </div>
    <p class="text-center text-shadow text-light mt-3">
      &copy; 2022 NEED 所有照片皆為練習使用，不具版權。
      <router-link to="/login" class="text-light text-shadow"><i class="bi bi-door-open"></i></router-link>
    </p>
  </footer>
</template>
<style scoped lang="scss">
.text-shadow {
  text-shadow: 1px 2px 2px black;
  font-weight: 900;
}
i {
  font-size: 25px;
}
</style>
<script>
export default {};
</script>