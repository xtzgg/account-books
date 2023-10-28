<script setup lang="ts">

import { onMounted } from 'vue';
import AccountList from '../components/account/accountList.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(()=>{
  TabbarActive.active = 'home'
})
</script>

<template>
  <van-nav-bar class="navbartitle" title="我的账本" color="black"/>
  <account-list></account-list>
  <main-navbar></main-navbar>
</template>

<style scoped lang="scss">
.navbartitle {
  background: $main_search_background;
}
.navbartitle::after {
  border-bottom-width: 0
}
</style>
