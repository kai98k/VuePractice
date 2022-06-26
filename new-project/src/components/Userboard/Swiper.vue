<template>
  <swiper
    :slides-per-view="1"
    :navigation="true"
    :pagination="pagination"
    @slideChange="onSlideChange"
    @swiper="onSwiper"
    ref="mySwiper"
    :autoplay="autoplay"
  >
    <swiper-slide>
      <div class="container">
        <h2 class="BannerText d-inline-block">
          <span v-html="animatedText" class="slogan"></span>
          <span id="caret"> </span>
        </h2>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="container">
        <h2 class="BannerText d-inline-block">
          <span v-html="animatedText" class="slogan2"></span>
          <span id="caret"></span>
        </h2>
      </div>
    </swiper-slide>
    <swiper-slide>
    <div class="container">
        <h2 class="BannerText d-inline-block">
          <span v-html="animatedText" class="slogan2"></span>
          <span id="caret"></span>
        </h2>
      </div>
    </swiper-slide>
      <div id="scrollDown">
      <a href="#"><span></span></a>
  </div>
  </swiper>
</template>

<style  lang="scss">
#scrollDown a{
  z-index: 100;
  position: absolute;
  bottom: 15rem;
  left: 17%;
  width: 30px;
  height: 50px;
  margin-left: -15px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50px;
  box-sizing: border-box;
}
#scrollDown a::before {
  position: absolute;
  top: 10px;
  left: 50%;
  content: '';
  width: 6px;
  height: 6px;
  margin-left: -3px;
  background-color: #fff;
  border-radius: 100%;
  -webkit-animation: sdb10 2s infinite;
  animation: sdb10 2s infinite;
  box-sizing: border-box;
}
@-webkit-keyframes sdb10 {
  0% {
    -webkit-transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0, 20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes sdb10 {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0, 20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.swiper {
  width: 100%;
  height: 100%;

  &-pagination {
    position: absolute;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    transition: 0.3s opacity;
    z-index: 10;
    text-shadow: 1px 1px 4px black;
    bottom: 2rem !important;
    left: 20% !important;
    &-item {
      display: flex;
      align-items: center;

      .pagination-number {
        opacity: 0.5;
      }

      &:hover,
      &:focus {
        cursor: pointer;
      }

      &:last-of-type {
        .pagination-separator {
          width: 0;
        }
      }

      &.active {
        .pagination-number {
          opacity: 1;
        }

        .pagination-separator {
          width: 10vw;
        }
      }
    }
  }

  &-slide {
    background-position: center;
    background-size: cover;
  }
}
.swiper{
  box-shadow: 1px 2px 10px black;
}
.swiper-button-next::after {
  text-shadow: 1px 1px 4px black;
}
.swiper-button-next,
.swiper-button-prev {
  z-index: 10000;
}
.swiper-button-prev::after {
  text-shadow: 1px 1px 4px black;
}

.pagination-number {
  font-size: 2.5rem;
  color: #f2f1f0;
  padding: 0 0.5rem;
}

.pagination-separator {
  display: none;

  @media (min-width: 45em) {
    display: block;
  }

  position: relative;
  width: 40px;
  height: 1px;
  background: rgba(#f2f1f0, 0.25);
  transition: all 0.3s ease;
  box-shadow: 1px 1px 4px black;
  &-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f2f1f0;
    transform-origin: 0 0;
  }
}

.intro-campaign-cta {
  background-color: transparent;
  border-color: #f2f1f0;
  cursor: pointer;
}

.button-cta {
  border-radius: 50px;
  display: inline-block;
  border: 1px solid #f2f1f0;
  transition: 0.3s background-color ease-in-out;
  padding: 15px;
  color: #f2f1f0;
  text-shadow: 1px 1px 4px black;
  // box-shadow: 1px 1px 1px black;
  &:hover {
    background-color: #f2f1f0;
    color: black;
    text-shadow: none;
  }
}
.swiper-button-next,
.swiper-button-prev {
  color: #f2f1f0;
}
.swiper-slide {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  font-weight: 700;
}
.swiper-slide:nth-child(1n) {
  background-image: url(https://images.unsplash.com/photo-1594325624708-75a0a6cf806f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-clip: content-box;
  background-size: cover;
  background-position: center;
  justify-content: flex-start;

}
.swiper-slide:nth-child(2n) {
  background-image: url(https://images.unsplash.com/photo-1631730359585-38a4935cbec4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-clip: content-box;
  background-size: cover;
  background-position: center;
}
.swiper-slide:nth-child(3n) {
  background-image: url(https://images.unsplash.com/photo-1642505173077-c06eba91b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-clip: content-box;
  background-size: cover;
  background-position: center;


}
.slogan {
  color: #0d0d0d;
  text-shadow: 1px 1px 2px #0d0d0d;
  font-weight:900;
}
.slogan2 {
  color: #f2f1f0;
  text-shadow: 1px 3px 4px #0d0d0d;
    font-weight: 900;

}
#caret {
  border-right: 5px solid #f2f1f0;
  margin-left: 3px;
  animation: blink-caret 1s infinite;
}

@keyframes blink-caret {
  from {
    border-color: transparent;
  }
  to {
    border-color: #f2f1f0;
  }
}
  @media (max-width: 568px) {
    .swiper-button-next,
.swiper-button-prev,#scrollDown{
  display:none !important;
}
  }
</style>
<script>
// Import Swiper Vue.js components
import { Swiper } from "swiper/vue/swiper";
import { SwiperSlide } from "swiper/vue/swiper-slide";
import SwiperCore, { Navigation, Pagination,Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";

SwiperCore.use([Navigation, Pagination,Autoplay]);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      activeIndex: 0,
      sloganText: `In NEED<br>YOU CAN EXPLORE<br>WHAT YOU NEED<br>INDEED`,
      animatedText: "",
      i: 0,
      mySwiper: {},
      autoplay:{
          "delay": 3000,
      },
      pagination: {
        clickable: true,
        bulletClass: "swiper-pagination-item",
        bulletActiveClass: "active",
        clickableClass: "swiper-pagination-clickable",
        modifierClass: "swiper-pagination-",
        renderBullet: function (index, className) {
          var slideIndex = index;
          let number = "";
          // number = index <= 10 ? "0" + (slideIndex + 1) : slideIndex + 1;
          for (var i = 0; i <= index; i++) {
            number += "I";
          }
          var paginationItem = '<span class="swiper-pagination-item">';
          paginationItem +=
            '<span class="pagination-number">' + number + "</span>";
          paginationItem =
            index <= 10
              ? paginationItem +
                '<span class="pagination-separator"><span class="pagination-separator-loader"></span></span>'
              : paginationItem;
          paginationItem += "</span>";

          return paginationItem;
        },
      },
    };
  },
  watch: {
    animatedText(newV) {
      if (newV === this.sloganText) {
        setTimeout(() => {
          //注意這裡必須使用arrow function才能讓this被正確指向
          this.i = 0;
          this.animatedText = "";
          this.typeWriter();
        }, 5000);
      }
    },
  },
  methods: {
    onSlideChange(event) {
      //可以在這做換頁面事件操縱
        this.activeIndex = event.activeIndex;
      },
    onSwiper(swiper) {
      //可以在這初始頁面事件操縱
    },
    typeWriter() {
      const speed = 200;
      if (this.i < this.sloganText.length) {
        this.animatedText += this.sloganText.charAt(this.i);
        this.i++;
        setTimeout(this.typeWriter, speed);
      }
    },
  },
  created() {
    setTimeout(() => this.typeWriter(), 1000);
  },
  mounted() {
    //  mounted 生命週期 created 完成後
    // 在 template 掛載 ref，完整生成 template 後，使用 $refs 取得 DOM
  },
};
</script>