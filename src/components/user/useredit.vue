<script lang="ts" setup>

import { computed, reactive } from 'vue';
import { ref, onMounted } from 'vue';
import { showNotify, showToast } from 'vant';

import { UserService, type User } from '@/api/api'

// 挂载初始化
onMounted(() => {
    // 初始化个人信息，此处模拟值
    const userId = sessionStorage.getItem('userId');
    initUser(Number(userId));
})

// 初始化个人信息
const initUser = async (userId: number) => {
    const res: any = await UserService.detail({ 'userId': userId });
    if (res.data) {
        Object.assign(user, res.data);
        // 组件绑定input回显
        formShowFuc();
    }
}

// 表单信息
const user: User = reactive({
    userId: -1,
    username: '',
    nickname: '',
    mobile: '',
    imageUrl: '',
    createDate: ''
})

// 回显表单值
const formShowFuc = () => {
}

// 图片上传

// 图片预览
const images = ref([
    // { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);
// 图片前置校验
const beforeRead = (file: any) => {
    if (file.type !== 'image/jpeg') {
        showToast('请上传 jpg 格式图片');
        return false;
    }
    return true;
};
// 限制图片大小
const onOversize = (file: any) => {
    console.log(file);
    showToast('文件大小不能超过 500kb');
};
// 图片上传
const afterRead = async (file: any) => {
    // 将文件上传至服务器
    console.log(file);
    let res: any = UserService.upload(file);
    if (res.status === 200) {
        showToast({
            type: 'success',
            message: '上传成功',
            position: 'top',
        });
    } else {
        showToast({
            type: 'fail',
            message: '上传失败',
            position: 'top',
        });
    }
};

// 表单提交
const overlayShow = ref(false)
const onSubmit = (values: any) => {
    console.log('submit', values);
    console.log('submit2', user);
    // 加载中
    overlayShow.value = true
    // 组装数据
    userSubmit();
};

const userSubmit = async () => {
    console.log(user);
    const params = {
        "userId": user.userId,
        "username": user.username,
        "mobile": user.mobile,
        "nickName": user.nickname,
        "imageUrl": user.imageUrl
    }
    let res: any = await UserService.edit(params)
    // 编辑成功或失败
    // 关闭遮罩层
    overlayShow.value = false
    if (res.status === 200) {
        showToast({
            type: 'success',
            message: '保存成功',
            position: 'top',
        });
        // 延迟1s后跳转到上一页面
        setTimeout(() => {
            history.back();
        }, 1000)
    } else {
        showNotify({
            type: 'danger',
            message: '保存失败',
            duration: 1000,
        });
    }
}
// 返回上一页
const onClickLeft = () => history.back();

</script>
<template>
    <div style="padding-bottom: 2.2rem"></div>
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title>
            <span>个人信息编辑</span>
        </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
        <van-cell title="基础信息" style="background:#F7F6F6;" />
        <van-cell-group inset>
            <!-- 用户名 -->
            <van-field v-model="user.username" name="username" label="账号"  maxlength="20" placeholder="请输入登录账号" />
            <!-- 用户昵称 -->
            <van-field v-model="user.nickname" required 
            :rules="[{ required: true, message: '请填写昵称' }]"
            name="nickname" label="昵称" maxlength="20" placeholder="请输入昵称,不超过20个字符" />
            <!-- 电话 -->
            <van-field v-model="user.mobile" name="mobile" label="手机号" maxlength="20" placeholder="请输入手机号" />
            <!-- 头像上传 -->
            <van-field name="uploader" label="头像上传">
                <template #input>
                    <van-uploader v-model="images" :before-read="beforeRead" :after-read="afterRead" :max-size="500 * 1024"
                        @oversize="onOversize" :deletable="false" reupload  max-count="1"/>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <van-overlay :show="overlayShow" :custom-style="{ 'opacity': '0.7' }">
        <van-loading class="wrapper-loading" type="spinner" size="50px" color="#1989fa" />
    </van-overlay>
</template>

<style scoped lang="scss">
.wrapper-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

// .van-nav-bar--fixed {
//     top: 4.9vh
// }
</style>