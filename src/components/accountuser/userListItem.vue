<script setup lang="ts">

import { computed, ref, defineProps, defineEmits, type ComponentInternalInstance } from 'vue'
import { showConfirmDialog, showToast } from 'vant';
import { useRouter, useRoute } from 'vue-router'

import { UserManageService, type AccountUser,EnableStatus } from '@/api/api';

// 路由对象
const router = useRouter()
const route = useRoute();

const width_left = ref(6);
const width_right = ref(18);

// 父组件传值给子组件：账单列表数据
const props = defineProps<{
  accountUserList: AccountUser[],
  role: string
}>()

// 编辑用户
const editAccountUser = (i: number) => {
  const accountUser = props.accountUserList[i];
  router.push({
    path: '/accountuseredit',
    query: { 'userManagerId': accountUser.userManagerId, 'op': 'edit','role': props.role }
  })
}

// position 为关闭时点击的位置
const beforeClose = (position: string, index: number) => {
  switch (position) {
    case 'left':
    case 'edit':
      return new Promise((resolve) => {
        editAccountUser(index);
      }).then(() => {
        console.log("编辑成功")
      }).catch(() => { console.log("服务异常") });
    case 'outside':
      return true;
    case 'delete':
      return new Promise((resolve) => {
        showConfirmDialog({
          title: '确定删除吗？',
        }).then(() => {
          // resolve(true)
          deleteAccountUser(index);
        }).catch(() => resolve(false));
      });
  }
}

const deleteAccountUser = async (i: number) => {
  const accountBook = props.accountUserList[i];
  const res: any = await UserManageService.delete({
    'userManagerId': accountBook.userManagerId
  })
  if(res.status == 200 && res.data.code == 200) {
    showToast({
      type: 'success',
      message: '删除成功',
      duration: 1000,
    });
    // 延迟1s重新加载
    setTimeout(() => {
      location.reload();
    }, 1000)
  } else {
    showToast({
      type: 'fail',
      message: res.data.msg,
      duration: 3000,
    });
  }
}
const container = ref();
</script>

<template>
  <van-cell v-for="(item, index) in accountUserList" style="padding: 0;" :to="'/accountuserdetail?userManagerId='+ item.userManagerId + '&role=' + props.role">
    <van-swipe-cell  class="van_list_s">
      <div class="item"  ref="container" >
        <!-- 粘性状态标识 -->
        <div style="position: absolute;right: 0.6rem;">
          <div :class="['triangle2',item.enabled === 0 ? 'triangle2_error':'']" style="color:black">{{ item.enabled == null ? '' :  
            EnableStatus.get(item.enabled == null ? 0 : item.enabled)}}</div>
          <div :class="['triangle',item.enabled === 0 ? 'triangle_error':'']"></div>
        </div>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            姓名：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.name }}
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            电话：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.phone }}
          </van-col>
        </van-row>
        <!-- <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            地址：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.area == null ? '' : item.area}}
          </van-col>
        </van-row> -->
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            详细地址：
          </van-col>
          <van-col :span="width_right" class="col_right">
            <van-text-ellipsis style="z-index:2" :content="item.address == null ? '' : item.address"
                />
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            创建日期：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.createTime }}
          </van-col>
        </van-row>
      </div>
      <template #right>
        <van-button square type="primary" text="编辑" style="height: 100%;" @click="beforeClose('edit', index)" />
        <van-button square type="danger" text="删除" style="height: 100%;" @click="beforeClose('delete', index)" />
      </template>
    </van-swipe-cell>
  </van-cell>
</template>
  
<style scoped lang="scss">
.item {
  margin: 0.1rem 0rem;
  background-color: #fff;
  // padding:0.5rem;
}
.van_list_s {
  background-color: $van_list_background;
}
.col_left {
  // font-weight: bold;
  text-indent: 0.2rem
}
.col_right {
  text-align: left;
  color:black
}

.triangle {
    width: 0;
    height: 0;
    border-top: 0.5rem solid #DAEDC1;
    border-right: 0.7rem solid transparent;
    border-left: 0.7rem solid transparent;
}

.triangle_error {
    border-top: 0.5rem solid #EDC8C1;
}

.triangle2 {
    background-color: #DAEDC1;
    width: 1.4rem;
    height: 0.8rem;
    text-align: center;
    line-height: 1rem;
}

.triangle2_error {
  background-color: #EDC8C1;
}
</style>
  