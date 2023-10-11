<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { computed, reactive, ref, nextTick,onMounted } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import { dividerProps } from 'element-plus';


const active = ref('home');

const input2 = ref('')

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'

// 点击改变样式
const isActive1 = ref(false);
const isActive2 = ref(false);
const isActive3 = ref(false);
const changeColor = (n: number) => {
  isActive1.value = false;
  isActive2.value = false;
  isActive3.value = false;
  if (n == 1) {
    isActive1.value = true;
  } else if (n == 2) {
    isActive2.value = true;
  } else {
    isActive3.value = true;
  }
}
</script>

<template>
  <!-- <header>
  </header> -->
  <!-- 底部导航 -->
  <RouterView />
  <div>
    <!-- <van-tabbar v-model="active">
      <RouterLink to="/"><van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item></RouterLink>
      <RouterLink to="/user"><van-tabbar-item name="search" icon="search">标签</van-tabbar-item></RouterLink>
      <RouterLink to="/accountsetting"><van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item></RouterLink>
    </van-tabbar> -->


    <van-tabbar v-model="active">
    <van-row :gutter="50" class="row-bg" justify="space-around" style="width: 100%;">
      <van-col :span="8">
        <RouterLink to="/"><van-tabbar-item name="home" icon="home-o" class="tabbar-item-self">主页</van-tabbar-item></RouterLink>
      </van-col>
      <van-col :span="8">
        <RouterLink to="/user"><van-tabbar-item name="search" icon="search" class="tabbar-item-self">用户</van-tabbar-item></RouterLink>
      </van-col>
      <van-col :span="8">
        <RouterLink to="/accountsetting"><van-tabbar-item name="setting" icon="setting-o" class="tabbar-item-self">设置</van-tabbar-item></RouterLink>
      </van-col>
    </van-row>
    </van-tabbar>
  </div>
</template>
<style scoped>

.tabbar-item-self {
  padding-top: 0.4em;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */

/* 底部导航 */
/* .affix-container {
    text-align: center;
    height: 400px;
    border-radius: 4px;
    background: var(--van-color-primary-light-9);
  } */
.font_size_active {
  /* color: rgb(98, 217, 207) !important; */
  color: #fff !important;
  background-color: #a9e9b9 !important;
}
</style>
