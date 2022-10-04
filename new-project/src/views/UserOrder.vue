<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid main">
    <div class="wrap text-center">
      <h2 class="text-light text-shadow">成功建立訂單!</h2>
      <h2 class="text-light text-shadow">祝你成為更好的自己</h2>
    </div>
  </div>
</template>
<style scoped lang="scss">
.text-shadow{
  text-shadow: 1px 3px 5px rgba(0,0,0,0.6);
}
.main {
  background: rgba(148, 122, 109, 0.6);
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .wrap{
    padding-top: 150px;
    width: 40%;
    height: 100vh;
    background: url(https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
    background-repeat: no-repeat;
  }
}
</style>
<script setup>
import UserNavbar from "../components/Userboard/UserNavbar.vue";
import Userfoot from "../components/Userboard/Userfoot.vue";
</script>
