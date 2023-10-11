<template>
    <van-swipe-cell>
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
        </template>
    </van-swipe-cell>
</template>
<script lang="ts" setup>

import { Dialog } from 'vant'

// // position 为关闭时点击的位置
// const beforeClose = ({ position }) => {
//     switch (position) {
//     case 'left':
//     case 'cell':
//     case 'outside':
//         return true;
//     case 'right':
//         return new Promise((resolve) => {
//         Dialog.confirm({
//             title: '确定删除吗？',
//         }).then(resolve);
//         });
//     }
// };
// return { beforeClose };

</script> 


<style scoped>
.goods-card {
    margin: 0;
    background-color: #fff;
}

.delete-button {
    height: 100%;
}
</style>
  