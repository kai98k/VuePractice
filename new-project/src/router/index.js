import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      // 巢狀路由
      {
      path: 'products',
      component: () => import('../views/Products.vue'),
    },
    {
      path: 'articles',
      component: () => import('../views/Articles.vue')
    },
    {
      path: 'coupons',
      component: () => import('../views/Coupons.vue')
    }
    ],
  },
  {
    path:'/userboard',
    component: ()=>import('../views/UserBoard.vue'),
  },
  {
    path: '/news/:articleId',
    component: ()=>import('../views/NewsArticle.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
