import { createRouter, createWebHistory } from 'vue-router'
import AccountMain from '../views/accountMain.vue'
import UserMain from '../views/userMain.vue'
import AccountSetting from '../views/accountSetting.vue'
import User from '../components/user/user.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccountMain
    },
    {
      path: '/accountuser',
      name: 'accountuser',
      component: UserMain
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    },{
      path: '/accountsetting',
      name: 'accountsetting',
      component: AccountSetting
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    },{
      path: '/accountform',
      name: 'accountform',
      component: () => import('../components/account/accountform.vue')
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    },{
      path: '/accountuserform',
      name: 'accountuserform',
      component: () => import('../components/accountuser/accountuserform.vue')
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    },{
      path: '/user',
      name: 'user',
      component: User
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    }
  ]
})

export default router
