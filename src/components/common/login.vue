<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { MemberService } from '@/api/api'
import { showToast } from 'vant';

const active = ref(0);
const errorMsg = ref('');
const errorImageCodeMsg = ref('');
const errorUserMsg = ref('');
const overlayShow = ref(false);
const showIfUsername = ref(false);
// 用户名密码
const username = ref('');
const password = ref('');
const imageCode = ref('');
const imageStream = ref();
// 手机号验证码
const phone = ref("13211111111");
const smsCode = ref("1234");
const onSubmit = (values: any) => {
    overlayShow.value = true;
    setTimeout(()=>{
        console.log('submit', values);
        login();
    },500);
};

const login = async () => {
  
  let res: any;
  if(active.value === 0){
    // 短信验证码登录
    res = await MemberService.loginsms({
        "username": phone.value,
        "verifyCode": smsCode.value
    });
  } else {
    // 用户名密码登录
    res = await MemberService.loginImageCode({
        "username": username.value,
        "password": password.value,
        "verifyCode": imageCode.value
    });
  }
  //  处理登录结果
  if(res.data && res.data.code === -1){
    if(active.value === 0){
        errorMsg.value = res.data.msg;
    } else {
        if(res.data.msg === '验证码错误'){
            errorImageCodeMsg.value = res.data.msg;
            // 刷新验证码
            getImageCode();
        } else {
            errorUserMsg.value = res.data.msg;
        }
    }
  } else if(res.data.code === 0){
    console.log('登录成功');
    const user: any = JSON.parse(res.data.data);
    sessionStorage.setItem('userId', user.memberId);
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('nickname', user.nickName);
    sessionStorage.setItem('phone', user.phone);
    router.push({
        path: '/',
    })
  }
  overlayShow.value = false;
}
// 短信验证码倒计时
const showTitle = ref(true);
const countDown = ref();
const start = () => {
    // 发送获取验证码请求
    getSmsCode();
    showTitle.value = false;
}
const onFinish = () => {
    countDown.value.reset();
    showTitle.value = true;
}
// 获取短信验证码
const getSmsCode = async () => {
  const res: any = await MemberService.getSmsCode({
    "phone": phone.value
  })
  if(res.data.code === 200){
    console.log('获取验证码成功');
    smsCode.value = res.data.data;
  }
}
// 验证码必填校验
const validatorMessage = (val: string)=>{
    if(!val){
        errorMsg.value = "请输入验证码"
    }
    return !!val;
}
// 验证码必填校验
const validatorImageCodeMessage = (val: string)=>{
    if(!val){
        errorImageCodeMsg.value = "请输入验证码"
    }
    return !!val;
}
// 密码必填校验
const validatorUserMessage = (val: string)=>{
    if(!val){
        errorUserMsg.value = "请填写密码"
    }
    return !!val;
}

// 获取图片验证码
const getImageCode = async () => {
  const res: any = await MemberService.getImageCode({
    "phone": username.value
  })
  if(res.data.code === 200){
    console.log('获取图片验证码成功');
    imageStream.value = res.data.data;
  }
}
const showImageCode = (val: string)=>{
    if(username.value && username.value !== '') {
        getImageCode();
        showIfUsername.value = true;
    }
}

</script>
<template>
    <div class="backImage">
        <van-cell-group inset>
            <van-tabs v-model:active="active">
                <van-tab title="短信登录">
                    <van-form @submit="onSubmit">
                        <van-cell-group inset>
                            <van-field v-model="phone" name="phone" label="手机号" placeholder="手机号"
                                :rules="[{ required: true, message: '请填写手机号' }]"/>
                                <van-field
                                    v-model="smsCode"
                                    center
                                    clearable
                                    label="验证码"
                                    placeholder="请输入验证码"
                                    :rules="[{ validator: validatorMessage }]"
                                    :error-message="errorMsg"
                                >
                                    <template #button>
                                        <van-button size="small" type="primary" @click="start">
                                            <span v-if="showTitle">发送验证码</span>
                                            <van-count-down v-if="!showTitle"
                                                ref="countDown"
                                                :time="6000"
                                                :auto-start="true"
                                                format="ss 秒"
                                                @finish="onFinish"
                                                />
                                        </van-button>
                                    </template>
                                </van-field>
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" native-type="submit">
                                登录
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
                <van-tab title="密码登录">
                    <van-form @submit="onSubmit">
                        <van-cell-group inset v-if="active === 1">
                            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" @blur="showImageCode"
                                :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" clearable
                            :rules="[{ validator: validatorUserMessage }]"
                                    :error-message="errorUserMsg"
                            />
                            <van-field v-if="showIfUsername"
                                    v-model="imageCode"
                                    center
                                    clearable
                                    label="验证码"
                                    placeholder="请输入验证码"
                                    :rules="[{ validator: validatorImageCodeMessage }]"
                                    :error-message="errorImageCodeMsg"
                                >
                                    <template #right-icon>
                                        <van-image
                                            width="100"
                                            height="40"
                                            :src="imageStream"
                                            @click="getImageCode"
                                        />
                                    </template>
                                </van-field>
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" native-type="submit">
                                登录
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
            </van-tabs>
        </van-cell-group>
    </div>
    <van-overlay :show="overlayShow" :custom-style="{ 'opacity': '0.7' }">
        <van-loading class="wrapper-loading" type="spinner" size="50px" color="#1989fa" />
    </van-overlay>
</template>
<style scoped lang="scss">
.backImage {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  padding-top: 300px;
  background-image: url('https://img.zcool.cn/community/0175e35a0e5155a80121985c1c5da0.jpg@1280w_1l_2o_100sh.jpg');
}

.wrapper-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>

  