<script setup  lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from 'vant';
import AccountUserForm from './accountuserform.vue'
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

const AccountEditKey = ref<AccountEditKey>({
    userId: Number(route.query.userId),
    role: route.query.role + '',
    op: route.query.op + ''
})
// 返回上一级
const onClickLeft = () => history.back();
</script>

<template>
    <div>
        <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft">
            <template #title>
                <span v-if="'customer' === route.query.role">客户</span>
                <span v-if="'cargo' === route.query.role">货主</span>
                <span v-if="'worker' === route.query.role">工人</span>
                <span v-if="route.query.op === 'edit'">编辑</span>
                <span v-if="route.query.op === 'add'">添加</span>
            </template>
        </van-nav-bar>
        <div style="padding-top:2.2rem">
            <AccountUserForm :accountEditKey="AccountEditKey"></AccountUserForm>
        </div>
    </div>
</template>

<style scoped lang="scss">
.navbartitle {
    background: $main_search_background;
}

.navbartitle::after {
    border-bottom-width: 0
}

.van-nav-bar--fixed {
    top: 4.9vh
}
</style>

