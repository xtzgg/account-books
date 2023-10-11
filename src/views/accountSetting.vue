<template>
  <!-- <div class="about"> -->
    <!-- <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect" style="width:100%">
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div> -->
    
  <!-- </div> -->
  <van-swipe-cell>
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" style="height: 100%;" />
        </template>
    </van-swipe-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VTouch from '../components/vtouch/vtouchpage2.vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.about {
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
}



.goods-card {
    margin: 0;
    background-color: #fff;
}

.delete-button {
    height: 100%;
}
</style>
