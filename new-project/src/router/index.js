import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'need',
    component: ()=> import('../views/UserBoard.vue')
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
    path:'/products/:productId',
    component: ()=>import('../views/Product.vue'),
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
