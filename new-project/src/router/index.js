import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'need',
    component: ()=> import('../views/UserBoard.vue')
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
    path: '/news/:articleId',
    component: ()=>import('../views/NewsArticle.vue'),
  },
  {
    path: '/products',
    component: ()=>import('../views/ProductList.vue'),
  },
  {
    path: '/userlogin',
    component: ()=>import('../views/UserLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
