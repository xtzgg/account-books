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
const width_left = ref(12);
const width_right = ref(12);

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
    <van-swipe-cell class="van_list_s">
      <div class="item" ref="container" >
        <!-- 粘性状态标识 -->
        <div style="position: absolute;right: 0.6rem;">
          <div :class="['triangle2',item.status === 1 ? 'triangle2_error':'']" style="color:black">{{ item.status == null ? '' :  
            BookStatus.get(item.status)}}</div>
          <div :class="['triangle',item.status === 1 ? 'triangle_error':'']"></div>
        </div>
        <div style="padding:0.5rem">
            <van-row style="text-align: left">
              <van-col :span="width_left" class="col_left">
                类型：<span class="content_s">{{ item.bookTypeDesc }}</span>
              </van-col>
              <van-col v-if="item.userId" :span="width_right" class="col_right">
                客户：<span class="content_s">{{ item.username }}</span>
              </van-col>
            </van-row>
            <van-row style="text-align: left">
              <van-col :span="width_left" class="col_left">
                金额：<span class="content_s">{{ item.totalAmount }}</span>
              </van-col>
              <van-col v-if="item.status !== 2" :span="width_right" class="col_right">
                欠款：<span class="content_s">{{ Number(item.totalAmount) - Number(item.payAmount) }}</span>
              </van-col>
            </van-row>
            <van-row style="text-align: left">
              <van-col :span="width_left" class="col_left">
                时间：<span class="content_s">{{ item.createDate }}</span>
              </van-col>
            </van-row>
          </div>
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
  // margin: 0.5vh 1vh;
  margin: 0.1rem 0;
  background-color: #fff;
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
  // color:black
}
.content_s {
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
