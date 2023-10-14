<script setup lang="ts">
import UserList from '@/components/accountuser/userList.vue'

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
</template>

<style scoped>

</style>
