<template>
<div class="container-fluid d-flex backMain p-0">
  <Navbar></Navbar>
  <div class="container mt-5">  
    <router-view />
  </div>

</div>
<ToastMessages></ToastMessages>
</template>
<style scoped lang="scss">
.backMain{
position: relative;
}
</style>
<script>
import emitter from "@/methods/emitter"; //https://israynotarray.com/vue/20190510/86469050/ @路徑位置
import ToastMessages from "@/components/ToastMessages.vue";
import Navbar from "../components/Navbar.vue"; //拆分元件


export default {
  components: {
    //區域註冊
    Navbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    // 取出cookie方法

    console.log(token);
    this.$http.defaults.headers.common["Authorization"] = token;
    // 已經把vue axios加入vue裡，所以可以直接呼叫方法
    // https://github.com/axios/axios#global-axios-defaults
    // axios 提供的方法
    // 將 token 加入 header 中
    const api = `${process.env.VUE_APP_API}api/user/check`;
    // 登入驗證api
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push("/Login");
      }
    });
  },
};
</script>