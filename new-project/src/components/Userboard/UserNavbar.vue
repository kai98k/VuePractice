<template>
  <nav class="navbar navbar-expand-lg bg-main fixed-top" :class="{NavScroll:NavActive}">
    <div class="container d-flex justify-content-between align-items-center">
      <a class="navbar-brand text-light text-shadow" href="#" :class="{textDark:NavActive}">N E E D</a>
      <a
        href="#"
        class="nav-link text-light text-shadow bread"
        @click.prevent="openMenu"
        ><i class="bi bi-list nav-text"></i
      ></a>
      <ul class="navbar-nav mb-2 mb-lg-0 align-items-center" :class="{active: isActive}">
        <li class="nav-item">
          <a
            class="nav-link text-light text-shadow"
            aria-current="page"
            href="#" :class="{textDark:NavActive}"
            >News</a
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link text-light text-shadow"
            aria-current="page"
             :class="{textDark:NavActive}"
            >Products</router-link
          >
        </li>
        <li class="nav-item me-xl-3">
          <a class="nav-link text-light text-shadow" href="#" :class="{textDark:NavActive}">Posts</a>
        </li>
        <li class="nav-item" v-if="windowWidth > 986">
          <a class="nav-link text-light text-shadow"  :class="{textDark:NavActive}" href="#"
            ><i class="bi bi-cart-fill nav-text"></i>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link text-light text-shadow"  :class="{textDark:NavActive}" href="#"
            >ShoppingCart
          </a>
        </li>
        <li class="nav-item" v-if="windowWidth > 986">
          <a class="nav-link text-light text-shadow" :class="{textDark:NavActive}" href="#"
            ><i class="bi bi-person-fill nav-text"></i>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link text-light text-shadow" href="#" :class="{textDark:NavActive}"
            >Sign In/Sign Up
          </a>
        </li>
        <li class="nav-item" v-if="windowWidth > 986">
          <a class="nav-link text-light text-shadow" :class="{textDark:NavActive}" href="#"
            ><i class="bi bi-send-fill nav-text"></i>
          </a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link text-light text-shadow" href="#" :class="{textDark:NavActive}"
            >Message
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
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
  .navbar-nav {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%,-100%);
    display: none;
    text-align: center;
    background:rgba(255,255,255,0.6);
    padding: 10px 0px;
    &.active{
      animation: showMenu 2s forwards;
      display: block;
    }
  }
  .nav-link{
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
    transform: translate(-50%,0%);
    opacity: 1;
  }
}
.NavScroll{
    transition: all 2s;
    box-shadow:1px 1px 10px  #0D0D0D !important;
    background: #D9AA71  !important;
}
.textDark{
  transition: all 2s;
  color:#0D0D0D !important;
  text-shadow: none !important;
  font-weight: 900;
}
</style>
<script>
export default {
  data() {
    return {
      isActive:false,
      NavActive:false,
      windowWidth: window.innerWidth,
    };
  },
  components:{

  },
  methods: {
    openMenu() {
      this.isActive=!this.isActive;
    },
    handleScroll(){
      console.log();
      if(window.scrollY>200){
        this.NavActive=true;
      }else{
        this.NavActive=false;
      }
    },
  },
  created() {
    window.addEventListener('scroll', (event)=>{
       this.handleScroll();
       this.$emit('pageScroll',window.scrollY)
    })
  },
};
</script>