<script setup  lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from 'vant';
import AccountForm from './accountform.vue'
import { useRouter, useRoute } from 'vue-router'
import { type AccountEditKey } from '../../api/api'

// 系统对象
const router = useRouter()
const route = useRoute()
onMounted(() => {
    // 样式初始化
    // let texts = document.getElementsByClassName('van-tab__text--ellipsis')[0].style;
    // let texts2 = document.getElementsByClassName('van-tab__text--ellipsis')[1].style;
    // texts.fontWeight = 'bold';
    // texts2.fontWeight = 'bold';
})
// const active = ref(0);
// const onClickTab = ({ title }: any) => showToast(title);

const accountEditKey = ref<AccountEditKey>({
    incomeOrderId: Number(route.query.incomeOrderId),
    op: route.query.op + ''
})
// 返回上一级
const onClickLeft = () => history.back();
</script>

<template>
    <div>
        <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft">
            <template #title>
                <span>编辑账单（收入）</span>
            </template>
        </van-nav-bar>
        <div style="padding-top:2.2rem">
        <AccountForm :accountEditKey="accountEditKey"></AccountForm>
        </div>
        <!--  <van-tabs v-model:active="active" @click-tab="onClickTab" color="black" background="#f7ca45" sticky>
            <van-tab title="收入">
                <AccountForm :accountEditKey="accountEditKey"></AccountForm>
            </van-tab>
            <van-tab title="支出" disabled>
            </van-tab>
        </van-tabs> -->
    </div>
</template>

<style scoped lang="scss">
.navbartitle {
    background: $main_search_background;
}

.navbartitle::after {
    border-bottom-width: 0
}
// .van-nav-bar--fixed {
//     top: 4.9vh
// }
</style>

