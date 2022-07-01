import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay';
// loading畫面
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import App from './App.vue'
import router from './router'
import { currency } from './methods/filters';
import VueTags from "vue-tags";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css'
var VueScrollTo = require('vue-scrollto');



/* add icons to the library */


const app = createApp(App);
// 宣告變數儲存
app.config.globalProperties.$filters = {
    currency,
};
app.use(VueAxios, axios);
app.use(router);
app.use(VueScrollTo);
app.component('Loading',Loading);
app.component('VueTags',VueTags);
app.mount('#app');
