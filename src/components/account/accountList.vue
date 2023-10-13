<script setup lang="ts">
import accountListItem from './accountListItem.vue'
import { computed, ref, defineProps, toRefs, onMounted, reactive } from 'vue'
import { type AccountBook, AccoutListService, type AccountUser } from '@/api/api'
// 样式组件
import { useGlobalColorStore } from '@/stores/backgroundcolor'
import 'vant/es/dialog/style';

// 全局样式
const GlobalColor = useGlobalColorStore()
// 初始化加载
// 账单搜索框
const inputSearch = ref('')
const pageNum = ref(1)
const pageSize = ref(8)
const total = ref(0)
const totalAmount = ref('')
const mobile = ref('')
const username = ref('')
const remark = ref('')

onMounted(() => {
  inputSearch.value = ''
  accountlist();
})
// 滚动翻页
const count = ref(8)
const loading = ref(false)
const error = ref(false);
const refreshing = ref(false);
const noMore = computed(() => {
  // alert(count.value + "------" + total.value)
  return count.value >= total.value
})
const disabled = computed(() => {
  return loading.value || noMore.value
})
const load = () => {
  // alert("滚动执行")
  loading.value = true
  pageNum.value = pageNum.value + 1;
  setTimeout(() => {
    // 如果此时刷新则置为false
    if (refreshing.value) {
      accountListData.value = [];
      count.value = total.value = 0
      totalAmount.value = ''
      refreshing.value = false;
    }
    accountlist();
    count.value = pageNum.value * pageSize.value;
    loading.value = false
  }, 2000)
}
const onRefresh = () => {
  // 清空列表数据
  count.value = total.value = 0
  totalAmount.value = ''
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  load();
};

// 获取账单列表
const accountListData = ref<AccountBook[]>([]);
const accountlist = async () => {
  const res: any = await AccoutListService.list({
    "pageNum": pageNum.value,
    "pageSize": pageSize.value,
    "username": username.value,
    "remark": remark.value,
    "mobile": mobile.value
  }).catch(() => {
    error.value = true;
  })
  // 追加
  if (res.data.records) {
    res.data.records.forEach((element: AccountBook) => {
      accountListData.value.push(element);
    });
    total.value = res.data.total;
    totalAmount.value = res.data.totalAmount
  }
}

// 查询
const searchAccoutBooks = () => {
  pageNum.value = 1
  accountListData.value = []
  total.value = 0
  count.value = 0
  totalAmount.value = '0'
  username.value = inputSearch.value
  remark.value = inputSearch.value
  mobile.value = inputSearch.value
  accountlist();
}

const accountEndDate = ref()
const accountEndDateCurrent = (para: any) => {
  accountEndDate.value = para
}
</script>

<template>
  <van-cell-group>
    <van-cell class="group-lay-out">
      <!-- 搜索 -->
      <van-search v-model="inputSearch" show-action clearable :background="GlobalColor.color" placeholder="请输入姓名、手机号、备注"
        @keydown.enter="searchAccoutBooks" @search="searchAccoutBooks" @clear="searchAccoutBooks">
        <template #action>
          <div @click="searchAccoutBooks">搜索</div>
        </template>
      </van-search>
    </van-cell>
    <van-cell class="group-lay-out">
      <!-- 总计 -->
      <div class="demo-input-suffix" style="background-color: aliceblue; font-size:1rem;margin-top: 0.8em;">
        <van-row :gutter="10" class="row-bg" justify="space-between">
          <van-col :span="7" style="text-align: left;">
            <span style="padding-left:0.25rem;line-height: 2.5rem;font-weight: bold; font-size:1rem;text-align: left;">
            共{{ total }}条</span>
          </van-col>
          <van-col :span="10" style="text-align: center">
            <span style="line-height: 2.5rem;color: red; font-size:1rem;"> {{ totalAmount }}￥</span>
          </van-col>
          <van-col :span="7">
            <van-cell to="/accountform" style="padding: 0.5rem 0px 0px;background-color: aliceblue;text-align: right;" is-link value="添加"/>
          </van-col>
        </van-row>
      </div>
    </van-cell>
    <van-cell class="group-lay-out">
      <div class="infinite-list-wrapper">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" v-model:error="error" error-text="请求失败，点击重新加载" :finished="noMore"
            finished-text="没有更多了" @load="load">
            <accountListItem :accountList="accountListData" class="list-item">
            </accountListItem>
          </van-list>
          <van-back-top right="10vw" bottom="10vh" />
        </van-pull-refresh>
      </div>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>
.infinite-list-wrapper {
  min-height: 35rem;
  max-height: 39rem;
  height: 100%;
  overflow-y: hidden visible;
  overflow-x: hidden;
}

.group-lay-out {
  padding: 0;
}
</style>


