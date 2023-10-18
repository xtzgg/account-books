<script lang="ts" setup>

import { reactive } from 'vue';
import { ref, onMounted } from 'vue';

import { areaList } from '../../common/area';
import { showConfirmDialog, showNotify } from 'vant';

import { type AccountUser, accountUserStatusColumns, AccountUserService } from '@/api/api'

import { useRouter, useRoute } from 'vue-router'

// 系统对象
const router = useRouter()
const route = useRoute()
// 约束
interface PickerItem {
    value: number
    text: string
}
// 挂载初始化
onMounted(() => {
    // 编辑路由传值初始化 accountUser
    if (route.query.op === 'edit') {
        initAccountUser(Number(route.query.userId));
    }
})

// 返回上级
const onClickLeft = () => history.back();

// 初始化账本编辑信息
const initAccountUser = async (userId: number) => {
    const res: any = await AccountUserService.detail({ 'userId': userId });
    if (res.data) {
        Object.assign(accountUser, res.data);
        // 组件绑定input回显
        formShowFuc();
    }
}

// 样式相关属性
const overlayCustomStyle = { 'opacity': '0.7' }
const textAreaSize = { maxHeight: 100, minHeight: 0 }
const showStatusPicker = ref(false);
const showArea = ref(false);
const userResult = ref('');
const statusResult = ref('');
const areaResult = ref('');

// 表单信息
const accountUser: AccountUser = reactive({
    userId: null,
    username: '',
    status: null,
    mobile: '',
    area: '',
    areaCode: '',
    areaDetail: '',
    remark: '',
    createDate: ''
})

// 回显表单值
const formShowFuc = () => {
    userResult.value = accountUser.username
    const status = getStatus(accountUser.status);
    statusResult.value = status == null ? '' : status.text;
    areaResult.value = accountUser.area
    console.log(accountUser)
}
// 组件回显

// 地区选择
const onConfirmArea = ({ selectedOptions }: any) => {
    areaResult.value = selectedOptions.map((item: any) => item.text).join('/');
    showArea.value = false;
    // 表单：地区赋值
    accountUser.area = areaResult.value
    accountUser.areaCode = selectedOptions.map((item: any) => item.value).join('/');
};

// 根据code结算状态获取
const getStatus = (value: number | null) => {
    if (value != null) {
        return accountUserStatusColumns[value == 1 ? 0 : 1]
    }
    return null;
}

// 用户状态选择
const onConfirmStatus = ({ selectedOptions }: any) => {
    statusResult.value = selectedOptions[0]?.text;
    // 赋值表单
    accountUser.status = selectedOptions[0]?.value;
    // 隐藏
    showStatusPicker.value = false;
};
// 表单提交
const overlayShow = ref(false)
const onSubmit = (values: any) => {
    console.log('submit', values);
    console.log('submit2', accountUser);
    // 加载中
    overlayShow.value = true
    // 组装数据
    accountSubmit();
};

const accountSubmit = async () => {
    console.log(accountUser)
    const params = {
        "userId": accountUser.userId,
        "username": accountUser.username,
        "mobile": accountUser.mobile,
        "area": accountUser.area,
        "areaCode": accountUser.areaCode,
        "areaDetail": accountUser.areaDetail,
        "status": accountUser.status,
        "remark": accountUser.remark
    }
    let res: any;
    if(route.query.userId){
        params.userId = Number(route.query.userId);
        res = await AccountUserService.edit(params)
    } else {
        res = await AccountUserService.add(params)
    }
    // 编辑成功或失败
    // 关闭遮罩层
    overlayShow.value = false
    if (res.status === 200) {
        // 通知
        showNotify({
            type: 'success',
            message: '保存成功',
            duration: 1000,
        });
        // 延迟1s后跳转到上一页面
        setTimeout(()=>{
            router.go(-1);
        },1000)
    } else {
        showNotify({
            type: 'danger',
            message: '保存失败',
            duration: 1000,
        });
    }
}

</script>
<template>
    <van-nav-bar title="添加人员" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <!-- 用户名 -->
            <van-field v-model="accountUser.username" name="username" label="姓名" placeholder="请输入姓名" />
            <!-- 状态 -->
            <van-field v-model="statusResult" is-link readonly name="status" label="用户状态" placeholder="点击选择用户状态"
                @click="showStatusPicker = true" :rules="[{ required: true, message: '请选择用户状态' }]" />
            <van-popup v-model:show="showStatusPicker" position="bottom">
                <van-picker title="用户状态" :columns="accountUserStatusColumns" @confirm="onConfirmStatus"
                    @cancel="showStatusPicker = false" :loading="false" />
            </van-popup>
            <van-field v-model="accountUser.mobile" name="mobile" label="联系电话" placeholder="请输入联系电话" />
            <!-- 联系地址 -->
            <van-field v-model="areaResult" is-link readonly name="area" label="地区选择" placeholder="点击选择省市区"
                @click="showArea = true" />
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :area-list="areaList" @confirm="onConfirmArea" @cancel="showArea = false" />
            </van-popup>
            <van-field type="textarea" :autosize="textAreaSize" show-word-limit maxlength="50"
                v-model="accountUser.areaDetail" name="areaDetail" label="详细地址" placeholder="请输入详细地址" />
            <van-field type="textarea" :autosize="textAreaSize" show-word-limit maxlength="50" v-model="accountUser.remark"
                name="remark" label="备注" placeholder="请输入备注信息" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <van-overlay :show="overlayShow" :custom-style="overlayCustomStyle">
        <van-loading class="wrapper-loading" type="spinner" size="50px" color="#1989fa" />
    </van-overlay>
</template>

<style scoped>
.wrapper-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>