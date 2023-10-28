<script setup lang="ts">

// 左滑出现操作按钮
import { showConfirmDialog, showNotify, showToast } from 'vant';
import 'vant/es/dialog/style';
import { useRouter, useRoute } from 'vue-router'

import { type AccountBook, AccoutListService, BookStatus  } from '@/api/api';
import { ref, defineProps, defineEmits, type ComponentInternalInstance, computed, reactive } from 'vue'
import { onMounted } from 'vue';

// 路由对象
const router = useRouter()
const route = useRoute()
// 样式
const width_left = ref(8);
const width_right = ref(16);

// 初始化详情
onMounted(() => {
  console.log(route.query.id);
  initAccountBook(Number(route.query.id));
})

// 初始化
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

const statusDesc = computed(() => {
  console.log(accounForm.status);
  let tmp = accounForm.status == null ? '' :  BookStatus.get(accounForm.status);
  console.log(tmp);
  return tmp;
})
const bookTypeDesc = '批发'
// 初始化账本信息
const initAccountBook = async (id: number) => {
  const res: any = await AccoutListService.detail({ 'id': id });
  if (res.data) {
    Object.assign(accounForm, res.data);
    accounForm.details = [{
      name: '土豆',
      amount: '100',
      weight: '10'
    },{
      name: '西红柿',
      amount: '101',
      weight: '12'
    },{
      name: '黄瓜',
      amount: '106',
      weight: '17'
    },{
      name: '土豆',
      amount: '100',
      weight: '10'
    },{
      name: '西红柿',
      amount: '101',
      weight: '12'
    },{
      name: '黄瓜',
      amount: '106',
      weight: '17'
    }]
    // TODO 参数转化
  }
}
// 返回上一级
const onClickLeft = () => history.back();

const container = ref();
const active = ref(0);

// 跳转编辑页面
const clickRouteEdit = ()=>{
  router.push({
    path: '/accountedit',
    query: { 'id': accounForm.id, 'op': 'edit' }
  })
}
</script>

<template>
  <div style="margin-bottom: 2rem;">
  <van-nav-bar fixed class="navbartitle" left-text="返回" left-arrow title="账单详情（收入）" @click-left="onClickLeft" />
  <van-cell-group style="margin-bottom: 0.5rem;margin-top: 0.8rem;"  ref="container">
    <van-cell>
    <!-- 粘性状态标识 -->
    <van-sticky :container="container" :offset-right="20">
      <div style="position: absolute;right: 0;">
        <div class="triangle2" style="font-weight: bold;">{{ statusDesc }}</div>
        <div class="triangle"></div>
      </div>
    </van-sticky>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        类型
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ bookTypeDesc }}
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        时间
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ accounForm.createDate }}
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        总金额
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ accounForm.totalAmount }}元
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        已付金额
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ accounForm.payAmount }}元
      </van-col>
    </van-row>
    <van-row :gutter="10"  v-if="accounForm.status === 1 && accounForm.userId">
      <van-col :span="width_left" class="col_left">
        未付金额
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ Number(accounForm.totalAmount) - Number(accounForm.payAmount) }} 元
      </van-col>
    </van-row>
    <div v-if="accounForm.status === 1 && accounForm.userId">
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        <!-- <van-icon name="manager" /> -->
        姓名
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ accounForm.username }}
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        联系号码
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ accounForm.mobile }}
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        地址
      </van-col>
      <van-col :span="width_right" class="col_right">
        {{ accounForm.area == null ? '' : accounForm.area}}
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        详细地址
      </van-col>
      <van-col :span="width_right" class="col_right">
        <van-text-ellipsis 
          :content="accounForm.areaDetail == null ? '' : accounForm.areaDetail" 
        expand-text="展开" collapse-text="收起" />
      </van-col>
    </van-row>
    <van-row :gutter="10">
      <van-col :span="width_left" class="col_left">
        备注
      </van-col>
      <van-col :span="width_right" class="col_right">
        <van-text-ellipsis 
          :content="accounForm.remark == null ? '' : accounForm.remark" 
        expand-text="展开" collapse-text="收起" />
      </van-col>
    </van-row>
    </div>
  </van-cell>
  </van-cell-group>
  <van-cell-group  v-for="detail in accounForm.details" style="margin-top: 0.2rem;">
  <van-cell  style="background-color: aliceblue;">
      <van-row :gutter="10">
        <van-col :span="width_left" class="col_left">
          品类
        </van-col>
        <van-col :span="width_right" class="col_right">
          {{ detail.name }}
        </van-col>
      </van-row>
      <van-row :gutter="10">
        <van-col :span="width_left" class="col_left">
          金额
        </van-col>
        <van-col :span="width_right" class="col_right">
          {{ detail.amount }} 元
        </van-col>
      </van-row>
      <van-row :gutter="10">
        <van-col :span="width_left" class="col_left">
          重量
        </van-col>
        <van-col :span="width_right" class="col_right">
          {{ detail.weight }}
        </van-col>
      </van-row>
      <!-- <hr style="margin-top: 0.2rem;"/> -->
    </van-cell>
  </van-cell-group>
</div>
  <van-tabbar class="button_bottom_s" v-model="active" active-color="#fff">
      <van-tabbar-item class="tab_edit" icon="" style="font-size: 20px;" @click="clickRouteEdit">编辑</van-tabbar-item>
      <van-tabbar-item class="tab_cal_amount" icon="" style="font-size: 20px;">结款</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped lang="scss">

.navbartitle {
  background: $main_search_background;
}
// .button_bottom_s .van-tabbar-item--active {
//     background-color: $bottom_button_background
// }
.button_bottom_s .tab_edit{
  background-color: $bottom_button_background
}
.button_bottom_s .tab_cal_amount{
  background-color: #f3cabe
}
.col_left {
  // font-weight: bold;
  text-align: left;
}

.col_right {
  text-align: left;
  color: black;
}

.triangle {
    width: 0;
    height: 0;
    border-top: 0.5rem solid $base_background;
    border-right: 0.7rem solid transparent;
    border-left: 0.7rem solid transparent;
}

.triangle2 {
    background-color: $base_background;
    width: 1.4rem;
    height: 0.8rem;
    text-align: center;
    line-height: 1rem;
}
</style>
