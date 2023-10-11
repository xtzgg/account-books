<script setup lang="ts">
import accountListItem from './accountListItem.vue'
import { computed, ref, defineProps,toRefs,onMounted,reactive } from 'vue'
import { Calendar, Search,Plus } from '@element-plus/icons-vue'
import { type AccountBook,AccoutListService, type AccountUser} from '@/api/api'
import DateSingle from '../date/dateSingle.vue'
import Select from '../select/selectSingle.vue'
import { ElMessage } from 'element-plus'

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
const accountBookChild = ref()
const selectedDisabled = ref(true)
const endDate = ref('')

onMounted(()=>{
  inputSearch.value = ''
  accountlist();
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
    accountlist();
    count.value = pageNum.value * pageSize.value;
    loading.value = false
  }, 2000)
}
// // 账单列表类型声明
// export interface AccountBook {
//   username: string,
//   mobile: string,
//   address: string,
//   remark: string,
//   endDate: string,
//   accountAmount: string,
//   status: string,
//   createDate: string
// }

// 获取账单列表
const accountListData = ref<AccountBook[]>([]);
const accountlist = async () => {
  const res: any = await AccoutListService.list({
    "pageNum": pageNum.value,
    "pageSize": pageSize.value,
    "username": username.value,
    "remark": remark.value,
    "mobile": mobile.value
  })
  // 追加
  if(res.data.records){
    res.data.records.forEach((element: AccountBook) => {
      accountListData.value.push(element);
    });
    total.value = res.data.total;
    totalAmount.value = res.data.totalAmount
  }
}

// 查询
const searchAccoutBooks = ()=>{
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

// 模态框
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
// 添加
const addAccountBooks = ()=>{
    // 可选
    selectedDisabled.value = false;
    // 赋值
    form.id = -1
    form.userId = -1
    form.username = ''
    form.mobile = ''
    form.address = ''
    form.remark = ''
    form.endDate = ''
    form.status = ''
    form.accountAmount = ''
    // 传值给子组件
    accountBookChild.value = form
    endDate.value = form.endDate
    // 打开模态框
    dialogFormVisible.value = true
}
// 编辑
const editAccountBooks3 = (accountBook: AccountBook)=>{
  // 可选
  selectedDisabled.value = true;
  // 赋值
  if(accountBook){

    accountBookChild.value = accountBook
    endDate.value = accountBook.endDate

    form.id = accountBook.id
    form.userId = accountBook.userId
    form.username = accountBook.username
    form.mobile = accountBook.mobile
    form.address = accountBook.address
    form.remark = accountBook.remark
    form.endDate = accountBook.endDate
    form.status = accountBook.status
    form.accountAmount = accountBook.accountAmount
    // 打开模态框
    dialogFormVisible.value = true
  } else {
    ElMessage({
      message: '请选择要编辑的目录',
      type: 'warning',
    })
  }
}
// 获取子组件的值
const accountUserCurrent = (para: AccountUser)=>{
  // accountBookChild.value = para
  // 动态变更
  form.address = para.address
  form.remark = para.remark
  form.mobile = para.remark
  form.userId = para.userId
  form.username = para.username
}
const accountEndDate = ref()
const accountEndDateCurrent = (para: any)=>{
  accountEndDate.value = para
}
const form = reactive({
  id: 1,
  userId: 3,
  username: '小xx-1号',
  mobile: '12333333309',
  address: '梦想一号小店',
  remark: '我不知道写什么',
  endDate: '2999-01-01 23:59:59',
  accountAmount: '10000',
  status: "2"
})

const accountSubmit = async () => {
  console.log(accountBookChild.value + "===" + accountEndDate.value)
  const res: any = await AccoutListService.edit({
    "id": form.id,
    "userId": form.userId,
    "username": form.username,
    "mobile": form.mobile,
    "address": form.address,
    "endDate": accountEndDate,
    "accountAmount": form.accountAmount,
    "status": form.status,
    "remark": form.remark
  })
  // 编辑成功或失败
  if(res.status === 200){
    ElMessage({
      message: '保存成功',
      type: 'success',
    })
    // 关闭模态框
    dialogFormVisible.value = false
    // 重新加载
    location.reload;
  } else {
    ElMessage({
      message: '保存失败',
      type: 'error',
    })
  }
}
</script>

<template>
   <header>
    <div class="demo-input-suffix" style="margin-bottom: 10px;">
      <el-row :gutter="10"  class="row-bg" justify="space-between">
        <el-col :span="18">
          <el-input @keydown.enter="searchAccoutBooks" clearable @clear="searchAccoutBooks" v-model="inputSearch" class="w-50 m-2" placeholder="请输入姓名、手机号、备注" :prefix-icon="Search" />
        </el-col>
        <el-col :span="6">
          <el-button style="float: right; width: 80px;" :icon="Search" @click="searchAccoutBooks">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="demo-input-suffix" style="background-color: aliceblue;height:40px;font-size:20px">
      <el-row :gutter="10"  class="row-bg" justify="space-between">
        <el-col :span="7">
          <el-text style="padding-left:5px;line-height: 40px;font-weight: bold; font-size:16px">共<el-text style="font-size:16px">{{total}}</el-text>条</el-text>
        </el-col>
        <el-col :span="10" style="text-align: center"><el-text style="line-height: 40px;color: red; font-size:16px">{{ totalAmount }}￥</el-text></el-col>
        <el-col :span="7" style="padding-top: 5px;"><el-button :icon="Plus" style="float: right;background: aliceblue;"
            @click="addAccountBooks">添加</el-button></el-col>
      </el-row>
    </div>
  </header>
  <div  class="infinite-list-wrapper" style="overflow-y: hidden visible; overflow-x: hidden;">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="1">
      <accountListItem :accountList="accountListData" @editAccountBooks2="editAccountBooks3" class="list-item">
      </accountListItem>
    </ul>
    <p v-if="noMore" style="text-align: center; background-color: aliceblue; font-weight: 100;height:35px;line-height: 35px;">~已经见底啦~</p>
  </div>
  <p v-if="loading" v-loading="loading" ></p>
  <el-backtop :right="5" :bottom="100" color="gray" />

  <!-- 模态框 -->
  <el-dialog v-model="dialogFormVisible" :close-on-click-modal="false" title="新增账单" style="width: 90%;background-color: aliceblue;">
    <el-form :model="form">
      <el-form-item label="姓名:" :label-width="formLabelWidth">
        <!-- v-if重新加载组件 -->
        <Select :accountUser=accountBookChild  :selectedDisabled="selectedDisabled" v-if="dialogFormVisible" @update:father-data="accountUserCurrent"></Select>
      </el-form-item>
      <el-form-item label="结算状态:" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择结算状态" style="width: 100%;">
          <el-option label="未结清" value="1" />
          <el-option label="已结清" value="2" />
          <el-option label="部分结清" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="结算金额:" :label-width="formLabelWidth">
        <el-row style="width: 100%;">
          <el-col :span="22" style="padding-right: 5px;">
            <el-input
                v-model="form.accountAmount"
                placeholder="请输入金额"
                :formatter="(value: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
              />
          </el-col>
          <el-col :span="2"><el-text>元</el-text></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="截至日期:" :label-width="formLabelWidth">
        <date-single :endDate="endDate" v-if="dialogFormVisible" @update:father-data="accountEndDateCurrent"></date-single>
      </el-form-item>
      <el-form-item label="联系电话:" :label-width="formLabelWidth">
        <el-input v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="联系地址:" :label-width="formLabelWidth">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="备注:" :label-width="formLabelWidth">
        <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="accountSubmit">
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
  height: 660px;
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


