<template>
  <User></User>
  <main-navbar></main-navbar>
</template>

<script lang="ts" setup>

import { onMounted} from 'vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
import User from '@/components/user/user.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(()=>{
  TabbarActive.active = 'setting'
})
</script>

<style>

</style>
