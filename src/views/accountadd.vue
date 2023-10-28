<script setup  lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from 'vant';
import AccountForm from '../components/account/accountform.vue'
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'
import { useTabbarActiveStore } from '@/stores/backgroundcolor'
import { type AccountEditKey } from '@/api/api';
// 全局样式
const TabbarActive = useTabbarActiveStore();
onMounted(() => {
    TabbarActive.active = 'editBook';
    let texts = document.getElementsByClassName('van-tab__text--ellipsis')[0].style;
    let texts2 = document.getElementsByClassName('van-tab__text--ellipsis')[1].style;
    texts.fontWeight = 'bold';
    texts2.fontWeight = 'bold';
})
const active = ref(0);
const onClickTab = ({ title }: any) => showToast(title);
const accountEditKey = ref<AccountEditKey>({
    id: null,
    op: 'add'
})
</script>

<template>
    <div style="padding-bottom: 2rem;">
        <van-nav-bar class="navbartitle" title="新增账单"/>
        <!-- offset-top = '0.5rem' -->
        <van-tabs v-model:active="active" @click-tab="onClickTab" color="black" background="#f7ca45" sticky>
            <van-tab title="收入">
                <AccountForm :accountEditKey="accountEditKey" ></AccountForm>
            </van-tab>
            <van-tab title="支出">
                内容 2
            </van-tab>
        </van-tabs>
    </div>
    <main-navbar></main-navbar>
</template>

<style scoped lang="scss">
.navbartitle {
  background: $main_search_background;
}
.navbartitle::after {
  border-bottom-width: 0
}
</style>

