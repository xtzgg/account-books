<script setup lang="ts">
import { ref, defineEmits,onMounted } from 'vue';
import router from '@/router';

const username = ref('xiaohua');
const password = ref('123456');
const imageCode = ref('1234');
const onSubmit = (values: any) => {
    console.log('submit', values);
    console.log('登录成功');
    sessionStorage.setItem('userId', "1");
    sessionStorage.setItem('username', 'xiaohua');
    sessionStorage.setItem('nickname', '小花');
    router.push({
        path: '/',
    })
};
</script>
<template>
    <div class="test11">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field
                        v-model="imageCode"
                        center
                        clearable
                        label="验证码"
                        placeholder="请输入验证码"
                    >
                        <template #button>
                            <van-button size="small" type="primary">发送验证码</van-button>
                        </template>
                    </van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<style scoped lang="scss">
.test11 {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  padding-top: 300px;
  background-image: url('https://img.zcool.cn/community/0175e35a0e5155a80121985c1c5da0.jpg@1280w_1l_2o_100sh.jpg');
}
</style>

  