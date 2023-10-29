<script lang="ts" setup>

import { computed, reactive } from 'vue';
import { ref, onMounted, watch } from 'vue';

import { areaList } from '../../common/area';
import { showConfirmDialog, showNotify, showToast } from 'vant';
import type { PickerInstance } from 'vant';

import { AccountUserService, type AccountUser, AccoutListService, type AccountBook, type AccountEditKey } from '@/api/api'

import { useRouter, useRoute } from 'vue-router'

// 系统对象
const router = useRouter()
// const route = useRoute()
// 约束
interface PickerItem {
    value: number
    text: string
}

// 父组件传值给子组件：账单详情
const props = defineProps<{
    accountEditKey: AccountEditKey
}>()

// 挂载初始化
onMounted(() => {
    // 异步获取人员列表
    searchAccountUserListFuc('')
    // 编辑
    if (props.accountEditKey.op === 'edit') {
        initAccountBooks(Number(props.accountEditKey.id));
    }
})
// watch(props.accountEditKey,(newVal,oldVal) => {
//     initAccountBooks(Number(props.accountEditKey.id));
// })

// 初始化账本编辑信息
const initAccountBooks = async (id: number) => {
    const res: any = await AccoutListService.detail({ 'id': id });
    if (res.data) {
        Object.assign(accounForm, res.data);
        accounForm.details = [{
            name: '',
            amount: '',
            weight: ''
        }]
        // 组件绑定input回显
        formShowFuc();
    }
}

// 返回上级
// const onClickLeft = () => history.back();

// 样式相关属性
const overlayCustomStyle = { 'opacity': '0.7' }
const textAreaSize = { maxHeight: 100, minHeight: 0 }
const showUserPicker = ref(false);
const showBookTypePicker = ref(false);
const showVegetableTypePicker = ref<boolean[]>([]);
const endDateshowCalendar = ref(false);
const showArea = ref(false);
const loading = ref(true);
const userResult = ref('');
const bookTypeResult = ref('');
const vegetableResult = ref('');
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
    totalAmount: '',
    payAmount: '',
    bookType: null,
    endDate: '',
    mobile: '',
    area: '',
    areaCode: '',
    areaDetail: '',
    remark: '',
    createDate: '',
    details: [{
        name: '',
        amount: '',
        weight: ''
    }]
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
    const status = getStatus(accounForm.bookType);
    bookTypeResult.value = status == null ? '' : status.text;
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
            if (element.userId != null) {
                userMap.value.set(element.userId, element);
                userListColumns.value.push({ value: element.userId, text: `${element.username}` })
            }
        });
    }
}
// 根据code结算状态获取
const getStatus = (value: number | null) => {
    if (value != null) {
        return accountBookTypeColumns[value - 1]
    }
    return null;
}

const accountBookTypeColumns = [
    { text: '批发', value: 1 },
    { text: '零售', value: 2 }
];
const accountVegetableTypeColumns = [
    { text: '土豆', value: 1 },
    { text: '西红柿', value: 2 },
    { text: '香蕉', value: 3 }
];

// 账单类型选择
const onConfirmBookType = ({ selectedOptions }: any) => {

    bookTypeResult.value = selectedOptions[0]?.text;
    // 通过index获取值
    // 赋值表单
    accounForm.bookType = selectedOptions[0]?.value;
    // 隐藏
    showBookTypePicker.value = false;
};

/** ref动态挂载组件并自定义参数值 */
let pickerRefs = new Map<number, PickerInstance>();
const createPickerRef = (el: any, i: number) => {
    // console.log(i);
    if (el) {
        pickerRefs.set(i, el);
    }
}
// 品类选择
const onConfirmVegetableType = (i: number) => {
    console.log(i)
    let options1: any = pickerRefs.get(i)?.getSelectedOptions()[0];
    if (options1?.text && options1?.text != undefined) {
        vegetableResult.value = options1?.text;
        accounForm.details[i].name = options1?.text;
    }
    // 隐藏
    showVegetableTypePicker.value[i] = false;
};
// 总和计算
const totalAmount = computed(() => {
    // 正常情况下返回需要的数据
    try {
        let tmpAmount: number = 0;
        accounForm.details.forEach(d => {
            tmpAmount = tmpAmount + Number(d.amount == '' ? 0 : d.amount)
        });
        return tmpAmount;
    } catch (e) {
        // 处理失败则返回一个默认值
        return ''
    }
})

// 表单提交
const overlayShow = ref(false)
const onSubmit = (values: any) => {
    console.log('submit', values);
    console.log('submit2', accounForm);
    // 加载中
    overlayShow.value = true
    // 组装数据
    accountConfirmSubmit();
};

// 添加确认框
const accountConfirmSubmit = async () => {
    let tmpAmount = 0;
    accounForm.details.forEach(d => {
        tmpAmount = tmpAmount + Number(d.amount)
    });
    if (Number(accounForm.payAmount) === tmpAmount) {
        accountSubmit();
        return;
    }
    const unPayAmount = tmpAmount - Number(accounForm.payAmount);
    showConfirmDialog({
        title: '确认信息',
        allowHtml: true,
        message:
            '<hr/>'
            + '<div>'
            + '<div><div style="display:inline-flex;width: 100%;"><span style="text-align: right;width: 50%;">总金额：</span><span style="text-align: left;width: 50%;">' + tmpAmount + '元</span></div></div>'
            + '<div><div style="display:inline-flex;width: 100%;"><span style="text-align: right;width: 50%;">已付金额：</span><span style="text-align: left;width: 50%;">' + accounForm.payAmount + '元</div></div>'
            + '<div><div style="display:inline-flex;width: 100%; color:red"><span style="text-align: right;width: 50%;">欠款金额：</span><span style="text-align: left;width: 50%;">' + unPayAmount + '元</div></div>'
            + '<div><div style="display:inline-flex;width: 100%; color:red"><span style="text-align: right;width: 50%;">状态：</span><span style="text-align: left;width: 50%;">' + '未结清' + '</div></div>'
            + '</div>'
    }).then(() => {
        accountSubmit();
    }).catch(() => {
        // on cancel
        console.log('已取消')
    });
}

const accountSubmit = async () => {
    console.log(accounForm);
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
        "remark": accounForm.remark,
        "items": accounForm.details
    }
    let res: any;
    if (props.accountEditKey.id && props.accountEditKey.id !== null) {
        params.id = Number(props.accountEditKey.id);
        res = await AccoutListService.edit(params)
    } else {
        res = await AccoutListService.add(params)
    }
    // 编辑成功或失败
    // 关闭遮罩层
    overlayShow.value = false
    if (res.status === 200) {
        // 通知
        // showNotify({
        //     type: 'success',
        //     message: '保存成功',
        //     duration: 1000,
        // });
        showToast({
            type: 'success',
            message: '保存成功',
            position: 'top',
        });
        // 延迟1s后跳转到上一页面
        setTimeout(() => {
            if (props.accountEditKey.op === 'edit') {
                router.go(-1);
            } else {
                router.go(0);
            }
        }, 1000)
    } else {
        showNotify({
            type: 'danger',
            message: '保存失败',
            duration: 1000,
        });
    }
}

const showUserPickerClick = () => {
    console.log(searchValue.value);
    accountUserListFuc(searchValue.value);
    showUserPicker.value = true;
}
const addUser = () => {
    router.push({
        path: '/accountuserform',
        query: { 'op': 'add' }
    })
}
// 新增样式，后续修改
const active = ref(0);
const unpayAmount = ref(0);
const addvegetables = () => {
    accounForm.details.push({
        name: '',
        amount: '',
        weight: ''
    })
    setTimeout(() => {
        window.scrollBy({
            top: 200,
            behavior: "smooth"
        });
    }, 100)
}

const subvegetables = (i: number) => {
    if (accounForm.details.length == 1) {
        showToast({
            type: 'fail',
            message: '至少保留一条明细',
            position: 'top',
        });
        return;
    }
    accounForm.details.splice(i, 1);
}
// 校验人员信息是否必填
const validatorMessage = () => {
    let tmpAmount = 0;
    accounForm.details.forEach(d => {
        tmpAmount += Number(d.amount);
    })
    // 未结清
    if (Number(accounForm.payAmount) <= tmpAmount && !accounForm.userId) {
        return "存在欠款，人员必选";
    }
    return '';
}
</script>
<template>
    <van-form @submit="onSubmit">
        <van-cell title="基础信息" style="background:#F7F6F6;" />
        <van-cell-group inset>
            <!-- 类型 -->
            <van-field v-model="bookTypeResult" required is-link readonly name="bookType" label="类型" placeholder="点击选择账单类型"
                @click="showBookTypePicker = true" :rules="[{ required: true, message: '请选择账单类型' }]" />
            <van-popup v-model:show="showBookTypePicker" position="bottom">
                <van-picker title="账单类型" :columns="accountBookTypeColumns" @confirm="onConfirmBookType"
                    @cancel="showBookTypePicker = false" :loading="loading" />
            </van-popup>
            <!-- 结算金额 -->
            <van-field v-model="accounForm.payAmount" type="number" required name="accountAmount" label="已付金额(元)"
                placeholder="请输入结算金额" :rules="[{ required: true, message: '请输入已付金额' }]" />
            <!-- 用户名 -->
            <van-field v-model="userResult" is-link readonly name="username" label="姓名" placeholder="点击选择人员"
                @click="showUserPickerClick" validate-trigger="onSubmit" :rules="[{ validator: validatorMessage }]" />
            <van-popup v-model:show="showUserPicker" position="bottom">
                <van-picker :columns="userListColumns" @confirm="onConfirmUser" @cancel="addUser" cancel-button-text="去添加"
                    :loading="loading">
                    <template #title>
                        <!-- left-icon="" -->
                        <van-search v-model="searchValue" placeholder="请输入人员姓名" @search="searchAccountUserListFuc" />
                    </template>
                </van-picker>
            </van-popup>
            <!-- 结算状态 -->
            <!-- <van-field v-model="bookTypeResult" is-link readonly name="status" label="结算状态" placeholder="点击选择结算状态"
                @click="showBookTypePicker = true" :rules="[{ required: true, message: '请选择结算状态' }]" />
            <van-popup v-model:show="showBookTypePicker" position="bottom">
                <van-picker title="结算状态" :columns="accountBookStatusColumns" @confirm="onConfirmBookType"
                    @cancel="showBookTypePicker = false" :loading="loading" />
            </van-popup> -->
            <!-- <van-field v-model="unpayAmount" name="accountAmount" label="未付金额(元)" readonly />
            <van-field v-model="accounForm.totalAmount" name="accountAmount" label="总金额(元)" readonly /> -->
            <!-- 截至日期 -->
            <!-- <van-field v-model="endDateResult" is-link readonly name="calendar" label="截至日期" placeholder="点击选择日期"
                @click="endDateshowCalendar = true" />
            <van-calendar v-model:show="endDateshowCalendar" :min-date="minDate" :max-date="maxDate"
                :defaultDate="defaultDate" @confirm="onConfirmEndDate" /> -->

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
        <van-cell title="明细信息" style="background:#F7F6F6;">
            <span style="color:red">{{ totalAmount }}元</span>
        </van-cell>
        <van-cell-group inset>
            <div v-for="(detail, index) in accounForm.details" :key="index" style="background-color:aliceblue;">
                <van-cell title-style="font-weight: bold;">
                    <template #title>
                        条目{{ index + 1 }}
                    </template>
                    <van-button icon="minus" size="mini" type="primary" @click="subvegetables(index)" />
                </van-cell>
                <van-field v-model="detail.name" required is-link readonly label="品类" placeholder="点击选择品类"
                    @click="showVegetableTypePicker[index] = true" :rules="[{ required: true, message: '请选择品类' }]" />
                <van-popup v-model:show="showVegetableTypePicker[index]" position="bottom">
                    <van-picker title="品类" :ref="(el) => createPickerRef(el, index)" :columns="accountVegetableTypeColumns"
                        @confirm="onConfirmVegetableType(index)" @cancel="showVegetableTypePicker[index] = false"
                        :loading="loading">
                    </van-picker>
                </van-popup>
                <!-- :formatter="amountFormatter" -->
                <van-field v-model="detail.amount" type="number" required name="accountAmount" label="金额(元)"
                    placeholder="请输入结算金额" :rules="[{ required: true, message: '请输入结算金额' }]" />
                <van-field v-model="detail.weight" type="number" name="weight" label="重量(公斤)" placeholder="请输入重量信息" />
            </div>
        </van-cell-group>
        <van-cell-group inset>
            <van-cell>
                <van-button icon="plus" size="mini" type="primary" @click="addvegetables"></van-button>
            </van-cell>
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

<style scoped lang="scss">
.wrapper-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.button_bottom_s .van-tabbar-item--active {
    background-color: $bottom_button_background
}
</style>