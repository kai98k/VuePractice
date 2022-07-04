<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid bg">
    <div class="container bar">
      <div class="loginCard" :class="{ active: change }"></div>
      <div class="info p-5" :class="{ active: change }">
        <h4 class="text-light">還沒註冊帳號嗎?</h4>
        <button @click="changeLogin">註冊</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.info{
    &.active{
            animation: changeInfo 2s forwards;
    }
}
.loginCard {
  border-radius: 5px;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 1);
  &.active {
    animation: changeCard 2s forwards;
  }
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
}
@keyframes changeCard {
  0% {
  }
  100% {
    transform: translateX(45rem);
  }
}
@keyframes changeInfo {
  0% {
  }
  100% {
    transform: translateX(-45rem);
  }
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
    };
  },
  methods: {
    changeLogin() {
      this.change = !this.change;
    },
  },
};
</script>