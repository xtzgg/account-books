<script setup lang="ts">

import { onMounted } from 'vue';
import AccountUnpayList from '../components/account/accountunpayList.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(() => {
  TabbarActive.active = 'unpay'
})
</script>

<template>
  <van-nav-bar class="navbartitle" title="我的账单" fixed color="black">
    <template #title>
        <span>未结清账单</span>
    </template>
  </van-nav-bar>
  <!-- padding-bottom:10.5vh -->
  <div style="padding-bottom: 2.1rem"></div>
  <account-unpay-list :book-status="2"></account-unpay-list>
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
