import { createRouter, createWebHistory } from 'vue-router'
import AccountMain from '../views/accountMain.vue'
import AccountAdd from '../views/accountadd.vue'
import AccountUnpayMain from '../views/accountunpaymain.vue'
import Setting from '../views/setting.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccountMain
    },{
      path: '/accountadd',
      name: 'accountadd',
      component: AccountAdd
    },{
      path: '/accountunpaymain',
      name: 'accountunpaymain',
      component: AccountUnpayMain
    },
    {
      path: '/accountuser',
      name: 'accountuser',
      component: () => import('../components/accountuser/accountuser.vue')
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    }
    ,{
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
    },{
      path: '/setting',
      name: 'setting',
      component: Setting
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/UserMain.vue')
    },{
      path: '/useredit',
      name: 'useredit',
      component: () => import('../components/user/useredit.vue')
    },{
      path: '/login',
      name: 'login',
      component: () => import('../components/common/login.vue')
    },{
      path: '/booktype',
      name: 'booktype',
      component: () => import('../components/common/booktype.vue')
    }
  ]
})

export default router
