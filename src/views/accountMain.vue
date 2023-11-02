<script setup lang="ts">

import { onMounted } from 'vue';
import AccountList from '../components/account/accountList.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(() => {
  TabbarActive.active = 'home'
})
</script>

<template>
  <van-nav-bar class="navbartitle" title="我的账单" fixed color="black">
    <template #title>
      <div style="display: inline-flex">
        <span><van-icon name="aim" size="0.6rem" color="black" /></span><span
          style="padding-left:0.1rem;line-height:0.6rem">我的账本</span>
      </div>
    </template>
  </van-nav-bar>
  <!-- padding-bottom:10.5vh -->
  <div style="padding-bottom: 2.1rem"></div>
  <account-list></account-list>
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

// .van-nav-bar--fixed {
//   top: 1rem; 
//   // 4.9vh
// }
</style>
