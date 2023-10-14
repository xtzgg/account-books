<script setup lang="ts">

import { onMounted } from 'vue';
import AccountList from '../components/account/accountList.vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(()=>{
  TabbarActive.active = 'home'
})
</script>

<template>
  <account-list></account-list>
</template>

<style scoped>

</style>
