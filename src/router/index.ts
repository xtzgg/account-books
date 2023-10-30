import { createRouter, createWebHistory } from 'vue-router'
import AccountMain from '../views/accountMain.vue'
import UserMain from '../views/userMain.vue'
import AccountSetting from '../views/accountSetting.vue'
import AccountAdd from '../views/accountadd.vue'
import AccountUnpayMain from '../views/accountunpaymain.vue'

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
      path: '/accountadd',
      name: 'accountadd',
      component: AccountAdd
    },{
      path: '/accountunpaymain',
      name: 'accountunpaymain',
      component: AccountUnpayMain
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
      path: '/accountstatis',
      name: 'accountstatis',
      component: () => import('../components/accountstatis/accountstatis.vue')
    },{
      path: '/accountedit',
      name: 'accountedit',
      component: () => import('../components/account/accountedit.vue')
    },{
      path: '/accountdetail',
      name: 'accountdetail',
      component: () => import('../components/account/accountdetail.vue')
    },{
      path: '/accountuserdetail',
      name: 'accountuserdetail',
      component: () => import('../components/accountuser/accountuserdetail.vue')
    },{
      path: '/accountuseredit',
      name: 'accountuseredit',
      component: () => import('../components/accountuser/accountuseredit.vue')
    }
  ]
})

export default router
