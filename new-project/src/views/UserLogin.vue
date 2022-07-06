<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid bg">
    <div class="container bar" ref="bar">
      <form class="loginCard px-5" :style="Card" ref="card">
        <label for="account" class="h3">Account</label>
        <input
          type="email"
          class="form-control mt-2"
          id="account"
          placeholder="請輸入電子信箱"
        />
        <label for="account" class="h3 mt-3">Password</label>
        <input
          type="text"
          class="form-control mt-2"
          id="account"
          placeholder="請輸入密碼"
        />
        <input v-if="change"
          type="text"
          class="form-control mt-2"
          id="account"
          placeholder="請確認輸入密碼"
        />

        <button type="submit" class="btn btn-primary mt-2 mt-md-5 align-self-end" v-if="!change">
          登入
        </button>
        <button  v-else type="submit" class="btn btn-primary mt-2 mt-md-5 align-self-end">
          註冊
        </button>
      </form>
      <div class="info" :style="Info">
        <h4 class="text-light" v-if="!change" >還沒註冊帳號嗎?</h4>
        <h4 class="text-light" v-else >已經有帳號了嗎?</h4>
        <button
          @click="changeLogin"
          type="button"
          class="btn btn-outline-primary mt-4"
          v-if="!change"
        >
          註冊
        </button>
                <button
          @click="changeLogin"
          type="button"
          class="btn btn-outline-primary mt-4"
          v-else
        >
          登入
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loginCard {
  border-radius: 5px;
  width: 50%;
  height: 400px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    width: 100px;
  }
}
.info {
  width: 50%;
}
.bar {
  justify-content: space-between;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  max-width: 70%;
  height: 250px;
  background: rgba(0, 0, 0, 0.7);
  transition: all 1s;
}
.bg {
  display: flex;
  align-items: center;
  background: url(https://images.unsplash.com/photo-1631730486784-5456119f69ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80);
  height: 100vh;
  background-size: cover;
}
@media (max-width: 968px) {
  .bar {
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 580px;
    padding:0px;
  }
  .info {
  margin-top:50px;
  width: 100%;
}
  .loginCard {
    width: 350px;
    height: 300px;
  }
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
      windowWidth: 0,
      distance: 0,
      Card: {
        transition: "all 1s",
        transform: "",
      },
      Info: {
        transition: "all 1s",
        transform: "",
        textAlign: "center",
      },
    };
  },
  methods: {
    CardMove() {
      console.log(this.windowWidth);
      if (this.windowWidth <= 968) {
        if (this.change) {
          this.Card.transform = `translateY(10rem) !important`;
        } else {
          this.Card.transform = `translateX(0em) !important`;
        }
      } else {
        if (this.change) {
          this.Card.transform = `translateX(${this.distance}px) !important`;
        } else {
          this.Card.transform = `translateX(0em) !important`;
        }
      }
    },
    InfoMove() {
      console.log(this.distance);
      console.log(this.windowWidth);
      if (this.windowWidth <= 968) {
        if (this.change) {
          this.Info.transform = `translateY(-20rem) !important`;
        } else {
          this.Info.transform = `translateY(0em) !important`;
        }
      } else {
        if (this.change) {
          this.Info.transform = `translateX(-${this.distance}px) !important`;
        } else {
          this.Info.transform = `translateX(0em) !important`;
        }
      }
    },
    changeLogin() {
      this.change = !this.change;
      this.distance =
        this.$refs.bar.clientWidth - (this.$refs.card.clientWidth + 100);
      this.CardMove();
      this.InfoMove();
    },
  },
  watch: {
    windowWidth(val) {
      this.windowWidth = val;
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  created() {
    this.windowWidth = window.innerWidth;
    console.log(this.windowWidth);
  },
};
</script> 