<script lang="ts" setup>

import { reactive } from 'vue';
import { ref, onMounted } from 'vue';

import { areaList } from '@vant/area-data';
import { showConfirmDialog, showNotify } from 'vant';

import { AccountUserService, type AccountUser, AccoutListService, type AccountBook,accountBookStatusColumns } from '@/api/api'

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
    // 异步获取人员列表
    searchAccountUserListFuc('')
    // 编辑路由传值初始化 accounForm
    if (route.query.op === 'edit') {
        initAccountBooks(Number(route.query.id));
    }
})

// 初始化账本编辑信息
const initAccountBooks = async (id: number) => {
    const res: any = await AccoutListService.detail({ 'id': id });
    if (res.data) {
        Object.assign(accounForm, res.data);
        // 组件绑定input回显
        formShowFuc();
    }
}

// 返回上级
const onClickLeft = () => history.back();

// 样式相关属性
const overlayCustomStyle = { 'opacity': '0.7' }
const textAreaSize = { maxHeight: 100, minHeight: 0 }
const showUserPicker = ref(false);
const showStatusPicker = ref(false);
const endDateshowCalendar = ref(false);
const showArea = ref(false);
const loading = ref(true);
const userResult = ref('');
const statusResult = ref('');
const endDateResult = ref('');
// 组件日期范围
const minDate = new Date(2023, 9, 1);
const maxDate = new Date(2025, 11, 31);
const amountFormatter = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const areaResult = ref('');
const searchValue = ref('')
// 组件初始化
// 用于设置初始选项
const defaultDate = ref(new Date())

const userListColumns = ref<PickerItem[]>([])
// 人员信息
const userMap = ref(new Map<number, AccountUser>());
// 表单信息
const accounForm: AccountBook = reactive({
    id: null,
    userId: null,
    username: '',
    status: null,
    accountAmount: '',
    endDate: '',
    mobile: '',
    area: '',
    areaCode: '',
    areaDetail: '',
    remark: '',
    createDate: ''
})
// 人员选择
const onConfirmUser = ({ selectedOptions }: any) => {
    userResult.value = selectedOptions[0]?.text;
    // 通过index获取值
    const accountUser = userMap.value.get(selectedOptions[0]?.value);
    // 赋值表单
    if (accountUser) {
        // 赋值及其绑定组件回显初始化
        assignAndInitComponent(accountUser);
    }
    // 清空搜索框的值
    searchValue.value = ''
    // 隐藏
    showUserPicker.value = false;
};
const assignAndInitComponent = (accountUser: AccountUser) => {
    // 赋值
    accounForm.userId = accountUser.userId
    accounForm.username = accountUser.username
    accounForm.area = accountUser.area
    accounForm.areaDetail = accountUser.areaDetail
    accounForm.mobile = accountUser.mobile
    // 组件绑定input回显
    formShowFuc();
    // 组件回显 TODO 需要地区码
    if (accountUser.area) {

    }
}
// 回显表单值
const formShowFuc = () => {
    userResult.value = accounForm.username
    const status = getStatus(accounForm.status);
    statusResult.value = status == null ? '' : status.text;
    endDateResult.value = accounForm.endDate
    areaResult.value = accounForm.area
    console.log(accounForm)
}
// 组件回显

// 截至日期：年月日
const onConfirmEndDate = (value: any) => {
    endDateResult.value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
    endDateshowCalendar.value = false;
    accounForm.endDate = endDateResult.value;
};

// 地区选择
const onConfirmArea = ({ selectedOptions }: any) => {
    areaResult.value = selectedOptions.map((item: any) => item.text).join('/');
    showArea.value = false;
    // 表单：地区赋值
    accounForm.area = areaResult.value
    accounForm.areaCode = selectedOptions.map((item: any) => item.value).join('/');
};

const searchAccountUserListFuc = (value: string) => {
    // 异步获取
    loading.value = true;
    setTimeout(() => {
        accountUserListFuc(value)
        loading.value = false;
    }, 1000);
}
// 获取人员信息数据
const accountUserListFuc = async (value: string) => {
    const res: any = await AccountUserService.list({
        "pageNum": 1,
        "pageSize": 1000,
        "username": value,
        "remark": '',
        "mobile": ''
    })
    // 追加
    if (res.data.records) {
        console.log(res.data.records)
        userListColumns.value = [];
        userMap.value.clear;
        res.data.records.forEach((element: AccountUser) => {
            userMap.value.set(element.userId, element);
            userListColumns.value.push({ value: element.userId, text: `${element.username}` })
        });
    }
}
// 根据code结算状态获取
const getStatus = (value: number | null) => {
    if (value != null) {
        return accountBookStatusColumns[value - 1]
    }
    return null;
}

// 结算状态选择
const onConfirmStatus = ({ selectedOptions }: any) => {

    statusResult.value = selectedOptions[0]?.text;
    // 通过index获取值
    // 赋值表单
    accounForm.status = selectedOptions[0]?.value;
    // 隐藏
    showStatusPicker.value = false;
};
// 表单提交
const overlayShow = ref(false)
const onSubmit = (values: any) => {
    console.log('submit', values);
    console.log('submit2', accounForm);
    // 加载中
    overlayShow.value = true
    // 组装数据
    accountSubmit();
};

const accountSubmit = async () => {
    console.log(accounForm)
    const params = {
        "id": accounForm.id,
        "userId": accounForm.userId,
        "username": accounForm.username,
        "mobile": accounForm.mobile,
        "area": accounForm.area,
        "areaCode": accounForm.areaCode,
        "areaDetail": accounForm.areaDetail,
        "endDate": accounForm.endDate,
        "accountAmount": accounForm.accountAmount,
        "status": accounForm.status,
        "remark": accounForm.remark
    }
    let res: any;
    if(route.query.id){
        params.id = Number(route.query.id);
        res = await AccoutListService.edit(params)
    } else {
        res = await AccoutListService.add(params)
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
    <van-nav-bar title="添加账本" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <!-- 用户名 -->
            <van-field v-model="userResult" is-link readonly name="username" label="姓名" placeholder="点击选择人员"
                @click="showUserPicker = true" :rules="[{ required: true, message: '请选择人员信息' }]" />
            <van-popup v-model:show="showUserPicker" position="bottom">
                <van-picker :columns="userListColumns" @confirm="onConfirmUser" @cancel="showUserPicker = false"
                    :loading="loading">
                    <template #title>
                        <!-- left-icon="" -->
                        <van-search v-model="searchValue" placeholder="请输入人员姓名" @search="searchAccountUserListFuc" />
                    </template>
                </van-picker>
            </van-popup>
            <!-- 结算状态 -->
            <van-field v-model="statusResult" is-link readonly name="status" label="结算状态" placeholder="点击选择结算状态"
                @click="showStatusPicker = true" :rules="[{ required: true, message: '请选择结算状态' }]" />
            <van-popup v-model:show="showStatusPicker" position="bottom">
                <van-picker title="结算状态" :columns="accountBookStatusColumns" @confirm="onConfirmStatus"
                    @cancel="showStatusPicker = false" :loading="loading" />
            </van-popup>
            <!-- 结算金额 -->
            <van-field v-model="accounForm.accountAmount" name="accountAmount" label="金额(元)" placeholder="请输入结算金额"
                :formatter="amountFormatter" :rules="[{ required: true, message: '请输入结算金额' }]" />
            <!-- 截至日期 -->
            <van-field v-model="endDateResult" is-link readonly name="calendar" label="截至日期" placeholder="点击选择日期"
                @click="endDateshowCalendar = true" />
            <van-calendar v-model:show="endDateshowCalendar" :min-date="minDate" :max-date="maxDate"
                :defaultDate="defaultDate" @confirm="onConfirmEndDate" />

            <van-field v-model="accounForm.mobile" name="mobile" label="联系电话" placeholder="请输入联系电话" />
            <!-- 联系地址 -->
            <van-field v-model="areaResult" is-link readonly name="area" label="地区选择" placeholder="点击选择省市区"
                @click="showArea = true" />
            <van-popup v-model:show="showArea" position="bottom">
                <van-area :area-list="areaList" @confirm="onConfirmArea" @cancel="showArea = false" />
            </van-popup>
            <van-field type="textarea" :autosize="textAreaSize" show-word-limit maxlength="50"
                v-model="accounForm.areaDetail" name="areaDetail" label="详细地址" placeholder="请输入详细地址" />
            <van-field type="textarea" :autosize="textAreaSize" show-word-limit maxlength="50" v-model="accounForm.remark"
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