<script setup lang="ts">
import UserList from './userList.vue'

import { onMounted, ref } from 'vue'
// 全局样式
import { useRouter, useRoute } from 'vue-router'

// 路由对象
const router = useRouter()
const route = useRoute();

// 初始化加载
onMounted(() => {
  // 
})

// 返回上一级
const onClickLeft = () => history.back();
// 自由拖拽气泡
// 点击气泡回到主页
const bubbleClick = () => {
  router.push({
    path: '/',
    // query: {
    //   op: 'add',
    //   role: route.query.role
    // }
  })
}
const offset = ref({ x: 0, y: 600 });
</script>

<template>
  <van-nav-bar class="navbartitle" fixed left-text="返回" left-arrow @click-left="onClickLeft" color="black">
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
  <van-floating-bubble :offset="{ x: -20, y: 600 }" axis="xy" icon="home-o" magnetic="x" @click="bubbleClick" :gap="-15"
    :style="{ 'opacity': '0.7' }" />
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
// }
</style>
