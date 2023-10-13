<script setup lang="ts">
import UserListItem from './userListItem.vue'
import { computed, ref,reactive,onMounted} from 'vue'
import { Calendar, Search, Plus } from '@element-plus/icons-vue'
import { AccountUserService, type AccountUser } from '@/api/api'

// 初始化加载
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'

const pageNum = ref(1)
const pageSize = ref(8)
const total = ref(0)
const mobile = ref('')
const username = ref('')
const remark = ref('')
// 搜索框
const inputSearch = ref('')

onMounted(()=>{
  inputSearch.value = ''
  accountUserSelectFuc();
})
// 滚动翻页
const count = ref(8)
const loading = ref(false)
const noMore = computed(() =>{ 
  // alert(count.value + "------" + total.value)
  return count.value >= total.value})
const disabled = computed(() => {
  return loading.value || noMore.value})
const load = () => {
  // alert("滚动执行")
  loading.value = true
  pageNum.value = pageNum.value + 1;
  setTimeout(() => {
    accountUserSelectFuc();
    count.value = pageNum.value * pageSize.value;
    loading.value = false
  }, 2000)
}
// 账单列表类型声明
// interface AccountUser {
//   username: string,
//   mobile: string,
//   address: string,
//   remark: string,
//   status: string,
//   createDate: string
// }

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
// 获取父组件传值：账单列表
// defineProps<{
// 		accountList: User[]
// 	}>()
// 添加

// 查询
const searchAccoutUser = ()=>{
  pageNum.value = 1
  accountUserList.value = []
  total.value = 0
  count.value = 0
  username.value = inputSearch.value
  remark.value = inputSearch.value
  mobile.value = inputSearch.value
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
  <header>
    <div class="demo-input-suffix" style="margin-bottom: 10px;">
      <el-row :gutter="10"  class="row-bg" justify="space-between">
        <el-col :span="18">
          <el-input @keydown.enter="searchAccoutUser" clearable v-model="inputSearch" class="w-50 m-2" placeholder="请输入姓名、手机号、备注" :prefix-icon="Search" />
        </el-col>
        <el-col :span="6">
          <el-button style="float: right; width: 80px;" :icon="Search" @click="searchAccoutUser">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="demo-input-suffix" style="background-color: aliceblue;height:40px">
      <el-row :gutter="10"  class="row-bg" justify="space-between">
        <el-col :span="15">
          <el-text style="line-height: 40px;padding-left:5px;font-weight: bold; font-size:16px">共<el-text style="font-size:16px">{{total}}</el-text>条</el-text>
        </el-col>
        <el-col :span="9"  style="padding-top: 5px;"><el-button style="float: right;background: aliceblue;"
            @click="dialogFormVisible = true" :icon="Plus" >添加</el-button></el-col>
      </el-row>
    </div>
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <div  class="infinite-list-wrapper" style="overflow-y: hidden visible; overflow-x: hidden;">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="1">
          <user-list-item v-for="(item,index) in accountUserList"  class="list-item">
            <template #username>
              {{ item.username }}
            </template>
            <template #mobile>
              {{ item.mobile }}
            </template>
            <template #address>
              {{ item.address }}
            </template>
            <template #status>
              {{ item.status }}
            </template>
            <template #remark>
              {{ item.remark }}
            </template>
          </user-list-item>
    </ul>
    <p v-if="noMore" style="text-align: center; background-color: aliceblue; font-weight: 100;height:35px;line-height: 35px;">~已经见底啦~</p>
  </div>
  <p v-if="loading" v-loading="loading" ></p>
  <el-backtop :right="5" :bottom="100" color="gray" />

  <!-- 模态框 -->
  <el-dialog v-model="dialogFormVisible" close-on-click-modal="false" title="新增人员" style="width: 90%;background-color: aliceblue;">
    <el-form :model="form">
      <el-form-item label="姓名:" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系电话:" :label-width="formLabelWidth">
        <el-input v-model="form.mobile" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系地址:" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态:" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择用户状态" style="width: 100%;">
          <el-option label="启用" selected value="1" />
          <el-option label="禁用" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style>
.el-loading-spinner .circular {
  animation: none !important;
}
.infinite-list-wrapper {
  height: 35rem;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.el-loading-spinner {
  height: 0;
}
</style>