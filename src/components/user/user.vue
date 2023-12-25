<script lang="ts" setup>
import router from '@/router';
import { showImagePreview, showToast, type ToastOptions } from 'vant';
import { ref, onMounted } from 'vue';
import { MemberService } from '@/api/api'

// 初始化加载
onMounted(() => {
    // 样式初始化
    // let el = document.getElementsByClassName('van-cell__value')[0] as HTMLElement; 
    // el.style.color = 'black';
    // 加载个人信息
    
})
// 预览头像
const showImage = () => {
    showImagePreview(['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg']);
}
// 点击设置
const showSettingSelect = () => {
    show.value = true;
}
const show = ref(false);
const actions = [
    { name: '切换账户' },
    { name: '退出登录' }
];
const onSelect = (item: { name: string | ToastOptions | undefined; }) => {
    show.value = false;
    // showToast(item.name);
    if(item.name === '退出登录' || item.name === '切换账户'){
        logout();
        router.push({
            path:'/login',
        })
    }
};
// 
const skipEdit = ()=>{
    router.push('useredit');
}
// 退出登录
const logout = async ()=>{
    const res: any = await MemberService.logout({});
    if (res.data.code !== 200) {
        showToast('登出失败');
    }
}

</script>
<template>
    <van-cell-group inset style="margin:0; background-color: #F7F6F6;">
        <!-- 个人头像 -->
        <van-cell center class="user_header">
            <template #title>
                <van-cell class="user_header_image" center is-link>
                    <template #title>
                        <lazy-component>
                            <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" round width="2rem"
                                @click="showImage" height="2rem" position="center">
                                <template v-slot:loading>
                                    <van-loading type="spinner" size="20" />
                                </template>
                            </van-image>
                        </lazy-component>
                    </template>
                    <span style="color: black;" @click="skipEdit">小花</span>
                </van-cell>
            </template>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <span style="margin-right: 0.5rem">
                    <van-icon name="setting-o" size="0.8rem" class="setting-icon" @click="showSettingSelect" />
                </span>
            </template>
        </van-cell>
        <!-- 导航图片 -->
        <van-cell>
            <van-grid :gutter="0">
                <van-grid-item icon="photo-o" text="收入账本" />
                <van-grid-item icon="photo-o" text="支出账本" />
                <van-grid-item icon="photo-o" text="账本统计" />
                <van-grid-item icon="photo-o" text="人员维护" />
            </van-grid>
        </van-cell>
        <!-- 导航栏 -->
        <div style="padding: 0.5rem 0;">
        <van-cell title="客户管理" value="进入" icon="friends-o" is-link to="/accountuser?role=customer" />
        <van-cell title="货主管理" value="进入" label="卖货的老板" icon="contact-o" is-link to="/accountuser?role=cargo" />
        </div>
        <div>
        <van-cell title="品类管理" value="进入" icon="friends-o" is-link to="/booktype"/>
        <van-cell title="工人管理" value="进入" icon="manager-o" is-link to="/accountuser?role=worker" />
        </div>
    </van-cell-group>
    <!-- 动作按钮 -->
    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action @select="onSelect" />
</template>
<style scoped lang="scss">
.user_header {
    background-color: $main_search_background;
    padding: 1.3rem 0 0;
}

.user_header_image {
    width: 55%;
    background-color: $main_search_background;
}

.user_header .van-cell--clickable:active {
    background-color: $main_search_background;
}

.user_header_image_value {
    color: black !important;
}
</style>
