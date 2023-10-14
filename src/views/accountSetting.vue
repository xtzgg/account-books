<template>
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

import { ref, onMounted} from 'vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(()=>{
  TabbarActive.active = 'setting'
})
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
