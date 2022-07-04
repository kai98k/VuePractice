<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <!-- 後綴prevent取消html預設事件 -->
      <div class="col-md-6 mt-5">
        <h1 class="h3 mb-3 font-weight-normal mt-5">後台登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      console.log("signIn");
      const api = `${process.env.VUE_APP_API}admin/signin`;
      // submit驗證 登入api
      console.log(api);
      this.$http.post(api, this.user).then((res) => {
        console.log(res,"res");
        if(res.data.success){
        const {token,expired} = res.data
        // 物件解構賦值 https://pjchender.blogspot.com/2017/01/es6-object-destructuring.html
        console.log(token,expired);
        document.cookie = `hexToken=${token};expires=${new Date(expired)}`
        // mdn存取cookie方式，自訂義token名稱存value
        console.log(res);
        this.$router.push('/dashboard/products');
        // 成功並換頁
        }
      });
    },
  },
};
</script>

