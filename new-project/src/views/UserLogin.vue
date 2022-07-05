<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid bg">
    <div class="container bar">
      <div class="loginCard" :style="Card"></div>
      <div class="info p-5" :style="Info">
        <h4 class="text-light">還沒註冊帳號嗎?</h4>
        <button @click="changeLogin">註冊</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loginCard {
  border-radius: 5px;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 1);
}
.bar {
  justify-content: space-between;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  width: 100%;
  height: 300px;
  background: rgba(0, 0, 0, 0.7);
  transition: all 2s;
  transform: translateX();
}
.bg {
  display: flex;
  align-items: center;
  background: url(https://images.unsplash.com/photo-1519414442781-fbd745c5b497?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1182&q=80);
  height: 100vh;
  background-size: cover;
}
</style>
<script>
import UserNavbar from "../components/Userboard/UserNavbar.vue";
export default {
  components: {
    UserNavbar,
  },
  data() {
    return {
      change: false,
      Card: {
        transition: "all 2s",
        transform: "",
      },
      Info: {
        transition: "all 2s",
        transform: "",
      },
    };
  },
  methods: {
    CardMove() {
      if (this.change) {
        this.Card.transform = `translateX(45rem)`;
      } else {
        this.Card.transform = `translateX(0rem)`;
      }
    },
    InfoMove() {
      if (this.change) {
        this.Info.transform = `translateX(-50rem)`;
      } else {
        this.Info.transform = `translateX(0rem)`;
      }
    },
    changeLogin() {
      this.change = !this.change;
      this.CardMove();
      this.InfoMove();
    },
  },
};
</script>