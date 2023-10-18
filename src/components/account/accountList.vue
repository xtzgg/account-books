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
  total.value = 0
  count.value = 0
  totalAmount.value = '0'
  username.value = inputSearch.value
  remark.value = inputSearch.value
  mobile.value = inputSearch.value
  accountListData.value = []
  accountlist();
}
</script>

<template>
  <van-cell-group>
    <van-cell class="group-lay-out demo-input-search">
      <!-- 搜索 -->
      <div class="">
        <van-search v-model="inputSearch" show-action clearable :background="GlobalColor.color" placeholder="请输入姓名、手机号、备注"
          @keydown.enter="searchAccoutBooks" @search="searchAccoutBooks" @clear="searchAccoutBooks">
          <template #action>
            <div @click="searchAccoutBooks">搜索</div>
          </template>
        </van-search>
      </div>
    </van-cell>
    <van-cell class="group-lay-out demo-input-suffix">
      <!-- 总计 -->
        <van-row :gutter="10"  justify="space-between">
          <van-col :span="7" style="text-align: left;">
            <span style="padding-left:0.25rem;font-weight: bold; text-align: left;">
            共{{ total }}条</span>
          </van-col>
          <van-col :span="10" style="text-align: center">
            <span style="color: red;"> {{ totalAmount }}￥</span>
          </van-col>
          <van-col :span="7">
            <van-cell to="/accountform?op=add" style="padding: 0.25rem 0px 0px;background-color: aliceblue;text-align: right;" is-link value="添加"/>
          </van-col>
        </van-row>
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

<style scoped type="css">
.demo-input-search {
  height: 8vh;
}
.infinite-list-wrapper {
  /* min-height: 13.5rem; */
  /* max-height: 17rem; */
  /* max-height: 50vh; g4y*/
  height: calc(80vh - 0.7rem);
  overflow-y: hidden visible;
  overflow-x: hidden;
}
.demo-input-suffix {
  /* height: 1rem; */
  background-color: aliceblue; 
  font-size:0.4rem;
  /* margin-top: 0.8rem; */
  line-height: 6vh;
  height: 6vh;
  margin-top: 0.2rem;
}

.group-lay-out {
  padding: 0;
}
</style>


