<script setup lang="ts">

import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTabbarActiveStore } from '../../stores/backgroundcolor'

const useGlobalColor = useTabbarActiveStore();

</script>
<template>
<!-- 底部导航 -->
<van-tabbar v-model="useGlobalColor.active">
      <van-row :gutter="0" class="row-bg" justify="space-around" style="width: 100%;">
        <van-col :span="4">
          <RouterLink to="/">
            <van-tabbar-item name="home" icon="home-o" class="tabbar-item-self">主页</van-tabbar-item>
          </RouterLink>
        </van-col>
        <van-col :span="4">
          <RouterLink to="/accountunpaymain"><van-tabbar-item name="unpay" icon="balance-list-o"
              class="tabbar-item-self">欠款</van-tabbar-item>
          </RouterLink>
        </van-col>
        <van-col :span="5">
          <RouterLink to="/accountadd"><van-tabbar-item name="editBook" icon="add-square"
              class="tabbar-item-self">记账</van-tabbar-item>
          </RouterLink>
        </van-col>
        <van-col :span="4">
          <RouterLink to="/accountstatis"><van-tabbar-item name="accountstatis" icon="chart-trending-o"
              class="tabbar-item-self">统计</van-tabbar-item>
          </RouterLink>
        </van-col>
        <van-col :span="4">
          <RouterLink to="/setting"><van-tabbar-item name="setting" icon="manager-o"
              class="tabbar-item-self">我的</van-tabbar-item>
          </RouterLink>
        </van-col>
      </van-row>
    </van-tabbar>
</template>
<style scoped lang="scss">

</style>