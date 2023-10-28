<script setup lang="ts">
import UserList from '@/components/accountuser/userList.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'

import { onMounted } from 'vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(()=>{
  TabbarActive.active = 'search'
})
</script>

<template>
  <user-list></user-list>
  <main-navbar></main-navbar>
</template>

<style scoped>

</style>
