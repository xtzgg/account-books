<script setup lang="ts">
import { showToast } from 'vant';
import { ref } from 'vue';

const onClickLeft = () => history.back();

const active = ref(0);
const onClickTab = ({ title }: any) => showToast(title);

const activeNames = ref(['1']);

// 点击图标保存，失焦后恢复
const enableEdit = ref(false);
const inputStyle = ref({ 'color': 'red' });
const onblur = () => {
    enableEdit.value = false;
    inputStyle.value = { 'color': 'red' };
}
const value3 = ref('');

const bookTypeList = ref([{
    name: '批发',
    code: 'pf',
    details:[{
        name: '土豆',
        code: 'td'
    },{
        name: '西红柿',
        code: 'xhs'
    },{
        name: '香蕉',
        code: 'xj'
    }]

},{
    name: '零售',
    code: 'ls',
    details: []
}])

const bottomActive = ref(0);
</script>

<template>
    <div style="padding-bottom: 1rem"></div>
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title>
            <span>品类管理</span>
        </template>
    </van-nav-bar>
    <div style="padding-top: 1.1rem;"></div>
    <div style="padding-bottom: 2rem;">
        <van-tabs v-model:active="active" @click-tab="onClickTab" color="black" background="#f7ca45" sticky
            offset-top="1rem">
            <van-tab title="收入">
                <van-collapse v-model="activeNames">
                    <div  v-for="item in bookTypeList">
                        <van-collapse-item :title="item.name" name="code">
                            <div v-for="sitem in item.details">
                                <!--  style="background-color: #bdefd9" -->
                                <van-cell  v-if="enableEdit == true" style="padding:0px" >
                                    <template #title>
                                        <van-field v-model="sitem.name" placeholder="填写二级分类" label-align="right"
                                        @blur="onblur"
                                        :disabled="!enableEdit"
                                        />
                                    </template>
                                    <!-- <template #right-icon>
                                        <van-icon style="padding-left:0.3rem;line-height:10.4vw" size="0.8rem" name="edit" @click="enableEdit = true" />
                                    </template> -->
                                </van-cell>
                                <van-swipe-cell class="van_list_s">
                                    <van-cell v-if="enableEdit == false" >
                                        <template #title>
                                        {{ sitem.name  }}
                                        </template>
                                        <template #right-icon>
                                            <van-icon style="line-height:5.4vw" size="0.55rem" name="edit" @click="enableEdit = true" />
                                        </template>
                                    </van-cell>
                                    <template #right>
                                        <van-button square type="primary" icon="delete-o" style="background-color:red" @click="beforeClose('edit', index)" />
                                    </template>
                                </van-swipe-cell>
                                <hr/>
                            </div>
                            <van-cell>
                                <template #value>
                                    <van-icon name="add-o" size="0.6rem"/>
                                </template>
                            </van-cell>
                        </van-collapse-item>
                    </div>
                </van-collapse>
                <!-- <van-cell>
                    <template #title>
                        <van-button icon="plus" size="mini" type="primary" @click="addvegetables"></van-button>
                    </template>
                </van-cell> -->
            </van-tab>
            <van-tab title="支出">
                内容 2
            </van-tab>
        </van-tabs>
        <!-- </div> -->
        <van-tabbar class="button_bottom_s" v-model="bottomActive" active-color="#fff">
            <van-tabbar-item class="tab_edit" icon="" style="font-size: 20px;" @click="clickRouteEdit">添加</van-tabbar-item>
            <!-- <van-tabbar-item class="tab_cal_amount" icon=""
            style="font-size: 20px;">删除</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>

<style lang="scss" scoped>
.button_bottom_s .tab_edit {
  background-color: $bottom_button_background
}

.button_bottom_s .tab_cal_amount {
  background-color: #f3cabe
}
</style>


