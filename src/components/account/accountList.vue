<script setup lang="ts">
import accountListItem from './accountListItem.vue'
import { computed, ref, defineProps, toRefs, onMounted, reactive } from 'vue'
import { type AccountBook, AccoutListService, type AccountUser } from '@/api/api'
import { showToast } from 'vant'
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
  // 日历显示初始化
  const nowDate = new Date();
  date.value = `${formatDate(nowDate)} - ${formatDate(nowDate)}`;
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

// 改版需求
// 1 收入支出切换页面
const active = ref(0);
const onClickTab = ({ title }: any) => showToast(title);

// 日历
const date = ref('');
const show = ref(false);
const formatDate = (date: any) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (values: any) => {
  const [start, end] = values;
  show.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};
// 类型
const code = ref('');
const fieldNames = {
  text: 'name',
  value: 'code',
  children: 'items',
};
const options = [
  {
    name: '零售',
    code: '330000'
    // ,
    // items: [{ name: '杭州市', code: '330100' }],
  },
  {
    name: '批发',
    code: '320000',
    items: [{ name: '土豆', code: '320100' }],
  },
];
const show1 = ref(false);
const fieldValue = ref('类别');
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }: any) => {
  show1.value = false;
  fieldValue.value = selectedOptions.map((option: any) => option.name).join('/');
};
</script>

<template>
    <van-cell class="group-lay-out demo-input-search">
      <!-- 搜索 -->
      <div class="">
        <van-search class="main_search" v-model="inputSearch" show-action clearable  placeholder="请输入账单用户姓名、手机号"
          @keydown.enter="searchAccoutBooks" @search="searchAccoutBooks" @clear="searchAccoutBooks">
          <template #action>
            <div @click="searchAccoutBooks">搜索</div>
          </template>
        </van-search>
      </div>
    </van-cell>
    <van-row class="searchOptions">
      <van-col span="16">
        <van-cell :title="date" 
        @click="show = true" 
        is-link 
        arrow-direction="down"
        label="收入xxxx，支出xxxxx"
        />
        <van-calendar v-model:show="show" type="range" @confirm="onConfirm" allow-same-day/>
      </van-col>
      <van-col class="searchOptionTypes" span="8">
        <van-cell :title="fieldValue" 
        @click="show1 = true" 
        is-link 
        arrow-direction="down"
        color="black"
        />
        <van-popup v-model:show="show1" round position="bottom">
          <van-cascader
            v-model="code"
            title="选择类型"
            :options="options"
            :field-names="fieldNames"
            @close="show1 = false"
            @finish="onFinish"
          />
        </van-popup>
      </van-col>
    </van-row>
    <van-divider style="margin: 0.1rem 0"/>
    <van-cell  class="group-lay-out">
      <van-tabs v-model:active="active" @click-tab="onClickTab"  type="card">
        <van-tab title="收入">

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

        </van-tab>
        <van-tab title="支出">


        </van-tab>
      </van-tabs>
    </van-cell>
    <!-- <van-cell class="group-lay-out demo-input-suffix">
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
    </van-cell> -->
    <!-- <van-cell class="group-lay-out">
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
    </van-cell> -->
</template>

<style scoped lang="scss">
.demo-input-search {
  min-height: 5vh;
}
.main_search{
  background: $main_search_background;
}
.infinite-list-wrapper {
  /* min-height: 13.5rem; */
  /* max-height: 17rem; #f7f6f6*/
  /* max-height: 50vh; g4y*/
  height: calc(63vh - 0.7rem);
  overflow-y: hidden visible;
  overflow-x: hidden;
  margin-top: 0.1rem;
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
.searchOptions .van-cell--clickable,.searchOptionTypes{
  background-color: $main_search_background;
}

.searchOptions .van-cell:after{
  border-bottom: 0px
}
.demo-input-search:after {
  border-bottom: 0
}

</style>


