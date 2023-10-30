<script setup lang="ts">

// 左滑出现操作按钮
import 'vant/es/dialog/style';
import { useRouter, useRoute } from 'vue-router'

import { AccountUserService, type AccountUser, EnableStatus } from '@/api/api';
import { ref, computed, reactive, onMounted } from 'vue'

// 路由对象
const router = useRouter()
const route = useRoute()
// 样式
const width_left = ref(8);
const width_right = ref(16);

// 初始化详情
onMounted(() => {
    console.log(route.query.userId);
    initAccountUser(Number(route.query.userId));
})

// 初始化
const accountUser: AccountUser = reactive({
    userId: null,
    username: '',
    status: null,
    type: null,
    mobile: '',
    area: '',
    areaCode: '',
    areaDetail: '',
    createDate: '',
    updateDate: ''
})

const statusDesc = computed(() => {
    console.log(accountUser.status);
    let tmp = accountUser.status == null ? '' : EnableStatus.get(accountUser.status);
    console.log(tmp);
    return tmp;
})
// 初始化账本信息
const initAccountUser = async (userId: number) => {
    const res: any = await AccountUserService.detail({ 'userId': userId });
    if (res.data) {
        Object.assign(accountUser, res.data);
        // TODO 参数转化
    }
}
// 返回上一级
const onClickLeft = () => history.back();

const container = ref();
const active = ref(0);

// 跳转编辑页面
const clickRouteEdit = () => {
    router.push({
        path: '/accountuseredit',
        query: {
            'userId': accountUser.userId,
            'op': 'edit',
            'role': route.query.role
        }
    })
}
</script>

<template>
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title>
            <span v-if="'customer' === route.query.role"> 客户详情 </span>
            <span v-if="'cargo' === route.query.role"> 货主详情 </span>
            <span v-if="'worker' === route.query.role"> 工人详情 </span>
        </template>
    </van-nav-bar>
    <div style="margin-bottom: 2rem;">
        <van-cell-group style="margin-bottom: 0.5rem;margin-top: 2.2rem;background-color: #F7F6F6;" ref="container">
            <van-cell>
                <!-- 粘性状态标识 -->
                <van-sticky :container="container" :offset-right="20">
                    <div style="position: absolute;right: 0;">
                        <div :class="['triangle2', accountUser.status === 0 ? 'triangle2_error' : '']"
                            style="color: black;">
                            {{ statusDesc }}</div>
                        <div :class="['triangle', accountUser.status === 0 ? 'triangle_error' : '']"></div>
                    </div>
                </van-sticky>
                <van-row>
                    <van-col :span="width_left" class="col_left">
                        <!-- <van-icon name="manager" /> -->
                        姓名
                    </van-col>
                    <van-col :span="width_right" class="col_right">
                        {{ accountUser.username }}
                    </van-col>
                </van-row>
                <van-row>
                    <van-col :span="width_left" class="col_left">
                        <!-- <van-icon name="manager" /> -->
                        日期
                    </van-col>
                    <van-col :span="width_right" class="col_right">
                        {{ accountUser.createDate }}
                    </van-col>
                </van-row>
                <van-row>
                    <van-col :span="width_left" class="col_left">
                        电话
                    </van-col>
                    <van-col :span="width_right" class="col_right">
                        {{ accountUser.mobile }}
                    </van-col>
                </van-row>
                <van-row>
                    <van-col :span="width_left" class="col_left">
                        地址
                    </van-col>
                    <van-col :span="width_right" class="col_right">
                        {{ accountUser.area == null ? '' : accountUser.area }}
                    </van-col>
                </van-row>
                <van-row>
                    <van-col :span="width_left" class="col_left">
                        详细地址
                    </van-col>
                    <van-col :span="width_right" class="col_right">
                        <van-text-ellipsis :content="accountUser.areaDetail == null ? '' : accountUser.areaDetail"
                            expand-text="展开" collapse-text="收起" />
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
    <van-tabbar class="button_bottom_s" v-model="active" active-color="#fff">
        <van-tabbar-item class="tab_edit" icon="" style="font-size: 20px;" @click="clickRouteEdit">编辑</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped lang="scss">
.navbartitle {
    background: $main_search_background;
}

.button_bottom_s .tab_edit {
    background-color: $bottom_button_background
}

.button_bottom_s .tab_cal_amount {
    background-color: #f3cabe
}

.col_left {
    text-align: left;
}

.col_right {
    text-align: left;
    color: black;
}

.triangle {
    width: 0;
    height: 0;
    border-top: 0.5rem solid #DAEDC1;
    // $base_background;
    border-right: 0.7rem solid transparent;
    border-left: 0.7rem solid transparent;
}

.triangle2 {
    background-color: #DAEDC1;
    // $base_background;
    width: 1.4rem;
    height: 0.8rem;
    text-align: center;
    line-height: 1rem;
}

.triangle_error {
    border-top: 0.5rem solid #EDC8C1;
}

.triangle2_error {
    background-color: #EDC8C1;
}

.van-nav-bar--fixed {
    top: 4.9vh
}
</style>
