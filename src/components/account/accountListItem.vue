<script setup lang="ts">
import type { AccountBook } from '@/api/api';
import { computed, ref, defineProps, defineEmits } from 'vue'
// 样式
const width_left = ref(8);
const width_right = ref(16);

// 父组件传值给子组件：账单列表数据
const props = defineProps<{
		accountList: AccountBook[]
	}>()
const fromFather = defineEmits([
  "editAccountBooks2"
])
// 编辑
const editAccountBooks = (i: number)=>{
  // 将方法和参数传递给父组件
  fromFather('editAccountBooks2', props.accountList[i])
}
</script>

<template>
  <li v-for="(item, index) in accountList">
     <!-- 分割线 -->
     <el-divider style="margin:10px 5px"><el-text style="padding: 0 5px"><el-icon><Notebook /></el-icon></el-text></el-divider>
     <div class="item" >
      <el-row :gutter="10">
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;"><el-icon style="margin-right: 5px;">
            <User style="width: 1em; height: 1em; "/></el-icon>姓名：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.username }}</el-text>
          <Edit style="width: 1.3em; height: 1.3em; float: right; margin-right: 8px;" @click="editAccountBooks(index)"/>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;">制单日期：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.createDate }}</el-text>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;">单据金额：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.accountAmount }}</el-text>
          <el-text style="padding:3px;margin-left:3px;font-size:12px;color:red;background-color:rgb(188, 195, 211);line-height:100%">
            {{ item.status }}
          </el-text>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;">截至日期：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.endDate }}</el-text>
        </el-col>
      </el-row>
      <el-row :gutter="10" >
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;">联系号码：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.mobile }}</el-text>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;">联系地址：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.address }}</el-text>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="width_left">
          <el-text style="float: right; font-weight: bold;">备注：</el-text>
        </el-col>
        <el-col :span="width_right">
          <el-text>{{ item.remark }}</el-text>
        </el-col>
      </el-row>
     </div> 
    </li>
</template>

<style scoped>
  .item {
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: rgb(239 249 249);
    /* rgb(244 251 251); */
  }

</style>
