<template>
  <nav
    class="navbar navbar-expand-lg bg-main fixed-top"
    :class="{ NavScroll: NavActive }"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <router-link
        class="navbar-brand text-light text-shadow"
        to="/"
        :class="{ textDark: NavActive }"
        >N E E D</router-link
      >
      <a
        href="#"
        class="nav-link text-light text-shadow bread"
        @click.prevent="openMenu"
        :class="{ textDark: NavActive }"
        ><i class="bi bi-list nav-text"></i
      ></a>
      <ul
        class="navbar-nav mb-2 mb-lg-0 align-items-center"
        :class="{ active: isActive }"
      >
        <li class="nav-item">
          <a
            v-if="HomePage"
            class="nav-link text-light text-shadow"
            aria-current="page"
            href="#"
            :class="{ textDark: NavActive }"
            v-scroll-to="'#news'"
            >News</a
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link text-light text-shadow"
            aria-current="page"
            :class="{ textDark: NavActive }"
            >Products</router-link
          >
        </li>
        <li class="nav-item" v-if="windowWidth > 986">
          <a
            class="nav-link text-light text-shadow"
            :class="{ textDark: NavActive }"
            href="#" @click.prevent="openModal()"
            ><i class="bi bi-cart-fill nav-text position-relative"><span v-if="cartsLength!==0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
    {{cartsLength}}
    <span class="visually-hidden">unread messages</span>
  </span></i>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a
            class="nav-link text-light text-shadow"
            :class="{ textDark: NavActive }"
            href="#"
            @click.prevent="openModal()"
            >ShoppingCart
          </a>
        </li>
        <li class="nav-item" v-if="windowWidth > 986">
          <router-link
            class="nav-link text-light text-shadow"
            :class="{ textDark: NavActive }"
            to="/userlogin"
            ><i class="bi bi-person-fill nav-text"></i>
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link
            class="nav-link text-light text-shadow"
            to="/userlogin"
            :class="{ textDark: NavActive }"
            >Sign In/Sign Up
          </router-link>
        </li>
        <li class="nav-item" v-if="windowWidth > 986">
          <router-link
            class="nav-link text-light text-shadow"
            :class="{ textDark: NavActive }"
            to="/userlogin"
            ><i class="bi bi-send-fill nav-text"></i>
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <a
            class="nav-link text-light text-shadow"
            href="#"
            :class="{ textDark: NavActive }"
            >Message
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <CartModal ref="CartModal" :carts="cartData" @updateCart="getCartList"></CartModal>
</template>
<style lang="scss" scoped>
.badge{
  padding: 2px 5px ;
  font-size: 1px;
  transform: translate(-50%, 10%) !important;
}
.nav-link {
  transition: 1s all;
  &:hover {
    transform: translateY(-5px);
    transition: 0.5s all;
  }
}
.nav-text {
  font-size: 1.4rem;
}
.text-shadow {
  text-shadow: 1px 3px 5px black;
}
.navbar-brand {
  font-size: 24px;
}
.bg-main {
  transition: all 2s;
  background: rgba(0, 0, 0, 0);
}
.bread {
  display: none;
}
@media (max-width: 986px) {
  .text-shadow {
  text-shadow: 1px 2px 1px black;
}
  .navbar-nav {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -100%);
    display: none;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 0px;
    &.active {
      animation: showMenu 2s forwards;
      display: block;
    }
  }
  .nav-link {
    padding: 15px 15px;
  }
  .bread {
    display: block;
  }
  .nav-text {
    font-size: 2rem;
  }
}
@keyframes showMenu {
  0% {
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}
.NavScroll {
  transition: all 2s;
  box-shadow: 1px 1px 10px #0d0d0d !important;
  background: #d9aa71 !important;
}
.textDark {
  transition: all 2s;
  color: #0d0d0d !important;
  text-shadow: none !important;
  font-weight: 900;
}
</style>
<script>
import CartModal from "../Userboard/CartModal.vue"
export default {
  props: {
    HomePage: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      isActive: false,
      NavActive: false,
      windowWidth: window.innerWidth,
      cartData:{},
      cartsLength:0,
    };
  },
  components: {CartModal},
  methods: {
    openMenu() {
      this.isActive = !this.isActive;
    },
    handleScroll() {
      console.log();
      if (window.scrollY > 100) {
        this.NavActive = true;
      } else {
        this.NavActive = false;
      }
    },
        openModal(){
      const cartComponent = this.$refs.CartModal;
      cartComponent.showModal();
    },
        getCartList(val){
          console.log(val);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
       this.$http.get(api).then((res) => {
        console.log(res);
        if(res.data.success){
          this.cartData=res.data.data
          this.cartsLength = this.cartData.carts.length
          console.log(this.cartData);
        }
      });
    },
  },
  created() {
    this.getCartList();
    window.addEventListener("scroll", (event) => {
      this.handleScroll();
      this.$emit("pageScroll", window.scrollY);
    });
  },
};
</script>