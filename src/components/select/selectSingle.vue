<!-- 搜索框 -->
<template>
  <div class="flex flex-wrap"  style="width: 100%;">
    <div class="m-20">
      <!-- 强制刷新 $forceUpdate: 有些变量不在 state 上，但是你又想达到这个变量更新的时候，刷新 render -->
      <el-select
        :disabled="props.selectedDisabled"
        v-model="sea"
        filterable
        remote
        reserve-keyword
        placeholder="请输入测试关键字:小"
        remote-show-suffix
        :remote-method="remoteMethod"
        :loading="loading"
        style="width:100%"
        @change="selectNameFuc(sea)"
      >
         <!-- :value 绑定不能value是对象，而非某个属性值 -->
        <el-option
          v-for="item in options"
          :key= "item.value"
          :label="item.label"
          :value= "item"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref,defineProps, reactive, watchEffect,getCurrentInstance, type ComponentInternalInstance } from 'vue'
import { AccountUserService, type AccountUser } from '@/api/api'


let { proxy } = getCurrentInstance()  as ComponentInternalInstance

interface ListItem {
  value: number
  label: string
}

const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const loading = ref(false)
onMounted(() => {
  console.log("xxx")
  // 初始化列表
  accountUserSelectFuc();
})


const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

// 通过ajax请求获取到user列表
const users = ref(new Map<number,AccountUser>())
// 父子传值
const props = defineProps<{
  accountUser: AccountUser
  selectedDisabled: boolean
}>()
// 子父传值
// 监听方法
const emit = defineEmits([
  'update:fatherData',
])
// change事件获取值
const selectNameFuc = (para: ListItem)=>{
  console.log("para:" + para.label + para.value)
  // 刷新组件，让其显示选中的值
  proxy?.$forceUpdate()
  // 动态回显附属值
  const tmpUser = users.value.get(para.value)
  // 将值传递给父组件
  emit('update:fatherData',tmpUser);
}
// watchEffect(() => {
//   console.log(props.accountUser)
//   console.log()
//   emit('update: fatherData', props.accountUser)
// })

// 获取select选中的内容, `${}`是jquery的写法
const sea = reactive({
  value: props.accountUser.userId, label: `${props.accountUser.username}`
})

// 获取人员信息数据
const accountUserSelectFuc = async () => {
  const res: any = await AccountUserService.list({
    "pageNum": 1,
    "pageSize": 100000,
    "username": '',
    "remark": '',
    "mobile": ''
  })
  // 追加
  if(res.data.records){
    console.log(res.data.records)
    res.data.records.forEach((element: AccountUser) => {
      users.value.set(element.userId,element);
      // list.value = users.value.map((item) => {
      //   return {value: item.userId, label: `${item.username}`}
      // })
      list.value.push({value: element.userId, label: `${element.username}`})
    });
  }
}

</script>
<style>
.el-scrollbar {
    > .el-scrollbar__bar {
        opacity: 1 !important;
    }
}
</style>
