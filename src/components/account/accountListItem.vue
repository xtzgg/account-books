<script setup lang="ts">

// 左滑出现操作按钮
import { showConfirmDialog, showNotify,showToast } from 'vant';
import 'vant/es/dialog/style';
import { useRouter } from 'vue-router'

import { type AccountBook, BookStatus, AccoutListService } from '@/api/api';
import { ref, defineProps } from 'vue'

// 路由对象
const router = useRouter()
// 样式
const width_left = ref(8);
const width_right = ref(16);

// 父组件传值给子组件：账单列表数据
const props = defineProps<{
  accountList: AccountBook[]
}>()

// position 为关闭时点击的位置
const beforeClose = (position: string, index: number) => {
  switch (position) {
    case 'left':
    case 'edit':
      return new Promise((resolve) => {
        editAccountBooks(index);
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
          deleteAccountBook(index);
        }).catch(() => resolve(false));
      });
  }
}

// 编辑账本
const editAccountBooks = (i: number) => {
  const accountBook = props.accountList[i];
  router.push({
    path: '/accountedit',
    query: { 'id': accountBook.id, 'op': 'edit' } // JSON.parse(JSON.stringify(accountUser))
  })
}
const deleteAccountBook = async (i: number) => {
  const accountBook = props.accountList[i];
  const res: any = await AccoutListService.delete({
    'id': accountBook.id
  })
  if (res.status == 200 && res.data.code == 200) {
    showNotify({
      type: 'success',
      message: '删除成功',
      duration: 1000,
    });
    // 延迟1s重新加载
    setTimeout(() => {
      location.reload();
    }, 1000)
  } else {
    // showNotify({
    //   type: 'danger',
    //   message: '删除失败：' + res.data.msg,
    //   duration: 3000,
    // });
    showToast({
        type:'fail',
        message: '删除失败：' + res.data.msg,
        position: 'top',
    });
  }
}

const container = ref();
</script>

<template>
  <van-cell v-for="(item, index) in accountList" style="padding: 0;" :to="'/accountdetail?id='+ item.id">
    <!-- 分割线 -->
    <!-- <van-divider style="margin: 0.2em 0">
      <van-icon name="notes-o" />
    </van-divider> -->
    <van-swipe-cell class="van_list_s">
      <div class="item" ref="container" >
        <!-- 粘性状态标识 -->
        <van-sticky :container="container" :offset-right="20">
          <div style="position: absolute;right: 0.5rem;">
            <div class="triangle2" style="font-weight: bold;">{{ item.status == null ? '' :  
              BookStatus.get(item.status)}}</div>
            <div class="triangle"></div>
          </div>
        </van-sticky>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            <van-icon name="manager" />姓名：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.username }}
            <!-- <Edit style="width: 0.5rem; height: 0.5rem; float: right; margin-right: 0.1rem;"
              @click="editAccountBooks(index)" /> -->
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            制单日期：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.createDate }}
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            单据金额：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.accountAmount }}
            <van-tag plain type="danger">{{ item.status == null ? '' :
              BookStatus.get(item.status) }}</van-tag>
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            截至日期：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.endDate }}
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            联系号码：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.mobile }}
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            联系地址：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.area == null ? '' : item.area + item.areaDetail == null ? '' : item.areaDetail }}
          </van-col>
        </van-row>
        <van-row :gutter="10">
          <van-col :span="width_left" class="col_left">
            备注：
          </van-col>
          <van-col :span="width_right" class="col_right">
            {{ item.remark }}
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
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  background-color: #fff;
}
.van_list_s {
  background-color: $van_list_background;
}
.col_left {
  font-weight: bold;
}

.col_right {
  text-align: left;
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
