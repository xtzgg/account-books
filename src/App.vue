<script setup lang="ts">

import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTabbarActiveStore } from './stores/backgroundcolor'
const useGlobalColor = useTabbarActiveStore();

</script>

<template>
  <RouterView />
  <!-- 底部导航 -->
  <div >
    <van-tabbar v-model="useGlobalColor.active">
      <van-row :gutter="50" class="row-bg" justify="space-around" style="width: 100%;">
        <van-col :span="8">
          <RouterLink to="/">
            <van-tabbar-item name="home" icon="home-o" class="tabbar-item-self">主页</van-tabbar-item>
          </RouterLink>
        </van-col>
        <van-col :span="8">
          <RouterLink to="/accountuser"><van-tabbar-item name="search" icon="friends-o"
              class="tabbar-item-self">用户</van-tabbar-item>
          </RouterLink>
        </van-col>
        <van-col :span="8">
          <RouterLink to="/user"><van-tabbar-item name="setting" icon="setting-o"
              class="tabbar-item-self">设置</van-tabbar-item>
          </RouterLink>
        </van-col>
      </van-row>
    </van-tabbar>
  </div>
</template>
<style scoped type="css">
.tabbar-item-self {
  padding-top: 0.4em;
}
</style>
