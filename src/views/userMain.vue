<script setup lang="ts">
import UserList from '@/components/accountuser/userList.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'

import { onMounted } from 'vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
import { useRouter, useRoute } from 'vue-router'

// 路由对象
const router = useRouter()
const route = useRoute();

// 初始化加载
onMounted(()=>{
  // TabbarActive.active = 'search'
  // console.log(route.query.role)
})
</script>

<template>
  <van-nav-bar class="navbartitle" fixed color="black">
    <template #title>
      <div style="display: inline-flex">
        <span v-if="route.query.role === 'customer'" style="padding-left:0.1rem;line-height:0.6rem">客户管理</span>
        <span v-if="route.query.role === 'cargo'" style="padding-left:0.1rem;line-height:0.6rem">货主管理</span>
        <span v-if="route.query.role === 'worker'" style="padding-left:0.1rem;line-height:0.6rem">工人管理</span>
      </div>
    </template>
  </van-nav-bar>
  <div style="padding-bottom: 2.1rem"></div>
  <user-list :role="route.query.role + ''"></user-list>
  <main-navbar></main-navbar>
</template>

<style scoped lang="scss">
.navbartitle {
  background: $main_search_background;
  font-weight: normal
}

.navbartitle::after {
  border-bottom-width: 0
}

.van-nav-bar--fixed {
  top: 1rem; 
  // 4.9vh
}
</style>
