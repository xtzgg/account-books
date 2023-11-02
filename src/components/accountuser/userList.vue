<script setup lang="ts">
import UserListItem from './userListItem.vue'
import { computed, ref,reactive,onMounted} from 'vue'
import 'vant/es/dialog/style';
import { AccountUserService, type AccountUser } from '@/api/api'

// 初始化加载
const dialogFormVisible = ref(false)

const pageNum = ref(1)
const pageSize = ref(8)
const total = ref(0)
const mobile = ref('')
const username = ref('')
const remark = ref('')
// 搜索框
const inputSearch = ref('')

// 父组件传值给子组件：账单列表数据
const props = defineProps<{
  role: string
}>()

onMounted(()=>{
  inputSearch.value = ''
  accountUserSelectFuc();
})
// 滚动翻页
const count = ref(8)
const loading = ref(false)
const error = ref(false);
const refreshing = ref(false);
const noMore = computed(() =>{ 
  // alert(count.value + "------" + total.value)
  return count.value >= total.value})

const load = () => {
  // alert("滚动执行")
  loading.value = true
  pageNum.value = pageNum.value + 1;
  setTimeout(() => {
    // 如果此时刷新则置为false
    if (refreshing.value) {
      accountUserList.value = [];
      count.value = total.value = 0
      refreshing.value = false;
    }
    accountUserSelectFuc();
    count.value = pageNum.value * pageSize.value;
    loading.value = false
  }, 2000)
}
const onRefresh = () => {
  // 清空列表数据
  count.value = total.value = 0
  pageNum.value = 1;
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  // 重新加载数据
  load();
};
// 获取账单用户列表
const accountUserList = ref<AccountUser[]>([]);
const accountUserSelectFuc = async () => {
  const res: any = await AccountUserService.list({
    "pageNum": pageNum.value,
    "pageSize": pageSize.value,
    "username": username.value,
    "remark": remark.value,
    "mobile": mobile.value
  })
  // 追加
  if(res.data.records){
    res.data.records.forEach((element: AccountUser) => {
      accountUserList.value.push(element);
    });
    total.value = res.data.total;
  }
}
// 添加

// 查询
const searchAccoutUser = ()=>{
  pageNum.value = 1
  total.value = 0
  count.value = 0
  username.value = inputSearch.value
  remark.value = inputSearch.value
  mobile.value = inputSearch.value
  accountUserList.value = []
  accountUserSelectFuc();
}

const form = reactive({
  username: '小xx-1号',
  mobile: '12333333300',
  address: '梦想一号小店',
  remark: '我不知道写什么',
  endDate: '2999-01-01 23:59:59',
  accountAmount: '10000',
  status: "1"
})
// 编辑
const accountUserEdit = ()=>{
  // 赋值
  if(accountUserList){
    
  }
  // 模态框显示
  dialogFormVisible.value = true

}

</script>

<template>
  <van-cell-group>
    <van-cell class="group-lay-out demo-input-search">
      <!-- 搜索 -->
      <van-search class="main_search" v-model="inputSearch" clearable placeholder="请输入姓名、电话"
        @keydown.enter="searchAccoutUser" @search="searchAccoutUser" @clear="searchAccoutUser">
        <!-- <template #action>
          <div @click="searchAccoutUser">搜索</div>
        </template> -->
      </van-search>
    </van-cell>
    <div style="margin-bottom: 1.6rem;"></div>
    <van-cell class="group-lay-out">
      <div class="infinite-list-wrapper">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" v-model:error="error" error-text="请求失败，点击重新加载" :finished="noMore"
            finished-text="没有更多了" @load="load">
            <user-list-item :accountUserList="accountUserList" :role="props.role" class="list-item"></user-list-item>
          </van-list>
          <van-back-top right="10vw" bottom="10vh" />
        </van-pull-refresh>
      </div>
    </van-cell>
  </van-cell-group>
</template>


<style scoped lang="scss">
.demo-input-search {
  height: 1.7rem;
  background: $main_search_background;
  position: fixed;
  top: 2rem;
  left: 0;
  width: 100%;
}
.main_search{
  background: $main_search_background;
}
.infinite-list-wrapper {
  height: calc(88vh - 1rem);
  overflow-y: hidden visible;
  overflow-x: hidden;
  padding-top: 0.1rem;
  background-color: #F7F6F6;
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