<script setup lang="ts">
import accountListItem from './accountListItem.vue'
import { computed, ref, defineProps, toRefs, onMounted, reactive } from 'vue'
import { type AccountBook, AccoutListService, type AccountUser } from '@/api/api'
import { showToast, type DatePickerColumnType } from 'vant'
import 'vant/es/dialog/style';

// 父组件传值给子组件：账单列表数据
const props = defineProps<{
  bookStatus: number
}>()
// 初始化加载
onMounted(() => {
  inputSearch.value = ''
  accountlist();
  // 日历显示初始化
  const nowDate = new Date();
  currentDate.value = [`${nowDate.getFullYear()}`, `${nowDate.getMonth() + 1}`];
  currentDateResult.value = formatDate(nowDate);
})

// 账单搜索框
const inputSearch = ref('')
const pageNum = ref(1)
const pageSize = ref(8)
const total = ref(0)
const totalAmount = ref('')
const mobile = ref('')
const username = ref('')
const remark = ref('')
// 滚动翻页
const count = ref(8)
const loading = ref(false)
const error = ref(false);
const refreshing = ref(false);
const noMore = computed(() => {
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
  pageNum.value = 1
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
    "createDate": createDate.value,
    "mobile": mobile.value,
    "status": Number(props.bookStatus)
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

// 日期
// 范围
const minDate = new Date(2020, 1, 1);
const maxDate = new Date(2030, 11, 31);
const showDatePicker = ref(false);
const createDate = ref('');
const currentDate = ref<string[]>([]);
const currentDateResult = ref('');
const columnsType = ref(['year', 'month']);
const formatter = (type: string, option: any) => {
      if (type === 'year') {
        option.text += '年';
      }
      if (type === 'month') {
        option.text += '月';
      }
      return option;
}
const onConfirm = ({selectedOptions}: any) => {
  console.log(selectedOptions);
  currentDateResult.value = selectedOptions[0].text + selectedOptions[1].text;
  createDate.value = selectedOptions[0].value + '-' + selectedOptions[1].value;
  showDatePicker.value = false;
  // 触发搜索
};
const formatDate = (date: any) => `${date.getFullYear()}年${date.getMonth() + 1}月`;
// 类型
const code = ref('');
const fieldNames = {
  text: 'name',
  value: 'code',
  children: 'items',
};
const show1 = ref(false);
const fieldValue = ref();
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }: any) => {
  show1.value = false;
  fieldValue.value = selectedOptions.map((option: any) => option.name).join('/');
};
</script>

<template>
  <div class="fixed_header">
    <van-cell class="group-lay-out demo-input-search">
      <!-- 搜索 -->
      <van-search class="main_search" v-model="inputSearch" clearable placeholder="请输入账单用户姓名、手机号"
        @keydown.enter="searchAccoutBooks" @search="searchAccoutBooks" @clear="searchAccoutBooks">
        <!-- <template #action>
              <div @click="searchAccoutBooks">搜索</div>
            </template> -->
      </van-search>
    </van-cell>
    <van-row class="searchOptions" style="background-color: #f7ca45;">
      <van-col span="1"></van-col>
      <van-col span="10">
        <van-field
          v-model="currentDateResult"
          right-icon="notes"
          readonly
          placeholder="选择日期"
          style="background-color: #f7ca45;"
          @click="showDatePicker = true"
        />
        <van-popup v-model:show="showDatePicker" round position="bottom">
          <van-date-picker
            v-model="currentDate"
            title="选择年月"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            :columns-type="columnsType"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-col>
    </van-row>
  </div>
  <div style="padding-bottom: 2.7rem;"></div>
  <van-cell class="group-lay-out">
    <div class="infinite-list-wrapper">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" v-model:error="error" error-text="请求失败，点击重新加载" :finished="noMore"
          finished-text="没有更多了" @load="load">
          <accountListItem :accountList="accountListData">
          </accountListItem>
        </van-list>
        <van-back-top right="10vw" bottom="10vh" />
      </van-pull-refresh>
    </div>
  </van-cell>
</template>

<style scoped lang="scss">
.fixed_header {
    position: fixed;
    top: 2rem;
    left: 0;
    width: 100%;
    z-index: 1;
}
.demo-input-search {
  min-height: 6vh;
}

.main_search {
  background: $main_search_background;
}

.infinite-list-wrapper {
  height: 77vh;
  overflow-y: hidden visible;
  overflow-x: hidden;
  // margin-top: 0.1rem;
}

.demo-input-suffix {
  /* height: 1rem; */
  background-color: aliceblue;
  font-size: 0.4rem;
  /* margin-top: 0.8rem; */
  line-height: 6vh;
  height: 6vh;
  margin-top: 1vh;
}

.group-lay-out {
  padding: 0;
  background-color: #F7F6F6;
}

.searchOptions .van-cell--clickable,
.searchOptionTypes {
  background-color: $main_search_background;
}

.searchOptions .van-cell:after {
  border-bottom: 0px;
  height: 8vh
}

.demo-input-search:after {
  border-bottom: 0
}

.van-cell--clickable {
  padding-top: 0
}
</style>


