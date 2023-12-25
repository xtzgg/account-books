<script setup lang="ts">
import { showConfirmDialog, showDialog, showToast } from 'vant';
import { ref, onMounted,watch } from 'vue';
// import draggable from 'vuedraggable'

// const drag = ref(false);

onMounted(() => {
    // 格式化边部按钮在折叠时无法充满样式问题
    init_btn_style();
})
const init_btn_style = ()=>{
    setTimeout(() => {
        let btn_first_style = document.getElementsByClassName('btn_first_style_ts') as any;
        for (let a = 0; a < btn_first_style.length; a++ ){
            let btn_cont_class = btn_first_style[a].getElementsByClassName('van-button__content');
            for (let i = 0; i < btn_cont_class.length; i++ ){
                btn_cont_class[i].style.alignItems = 'end';
                if (i >= 2) {
                    break;
                }
            }
            let btn_cont_class1 = btn_first_style[a].getElementsByClassName('van-button__text');
            for (let i = 0; i < btn_cont_class1.length; i++ ){
                btn_cont_class1[i].style.height = '100%';
                btn_cont_class1[i].style.display = 'flex';
                btn_cont_class1[i].style.alignItems = 'center';
                if (i >= 2) {
                    break;
                }
            }
        }
        // let btn_cont_class = document.getElementsByClassName('van-button__content')[0] as HTMLElement;
        // btn_cont_class.style.alignItems = 'end';
        // let btn_text_class = document.getElementsByClassName('van-button__text')[0] as HTMLElement;
        // btn_text_class.style.height='100%';
        // btn_text_class.style.display = 'flex';
        // btn_text_class.style.alignItems = 'center';
    }, 500)
}


const onClickLeft = () => history.back();

const active = ref(0);
const onClickTab = ({ title }: any) => showToast(title);

const activeNames = ref(['1']);

// 点击图标保存，失焦后恢复
const enableEdit = ref<boolean[][]>([[false]]);
const onblur = (i1: number, i: number) => {
    // bookTypeList.value[i].details[i].name
    enableEdit.value[i1][i] = false;

    // 如果不为空，则触发保存；否则提示填写该项
}
// 添加单元格
const addCell = (i: number) => {
    let tmp = bookTypeList.value[i].details;
    if (!tmp || tmp.length === 0) {
        enableEdit.value[i] = [];
    }
    bookTypeList.value[i].details.push({
        name: '',
        code: ''
    })
    enableEdit.value[i][bookTypeList.value[i].details.length - 1] = true;
}
// 删除一级分类
const tmpInputValue = ref('');
const beforeCloseFirst = (i: number, op: string) => {

    let msg = '';
    let alertSuccess = '';
    if (op === 'delete') {
        msg = '是否要删除一级分类<span style="color:red">' + bookTypeList.value[i].name + '</span>'
        alertSuccess = '删除';
    } else if (op === 'edit') {
        msg = '<input type="text"  value="' + bookTypeList.value[i].name + '" id="tmpName"/>'
        alertSuccess = '编辑';
    } else {
        const s = new Date();
        // 新增
        msg = '<input type="text" data="' + s + '" value="' + tmpInputValue.value + '" id="tmpNameAdd"/>'
        alertSuccess = '新增';
    }

    showConfirmDialog({
        title: alertSuccess + '一级分类',
        allowHtml: true,
        message: msg
    }).then(() => {
        if (op === 'edit') {
            let elInput = document.getElementById('tmpName') as any;
            if (!elInput || elInput.value === '') {
                // showToast({
                //     type:'fail',
                //     message: ''
                // })
                showToast('请填写数据');
                return;
            }
            for (let a = 0; a < bookTypeList.value.length; a++) {
                if (bookTypeList.value[a].name === elInput.value && bookTypeList.value[i].name != elInput.value) {
                    // showToast({
                    //     type:'fail',
                    //     message: '已存在该分类'
                    // })
                    showToast('已存在该分类');
                    return;
                }
            }
            bookTypeList.value[i].name = elInput.value;
        } else if (op === 'add') {
            let elInput = document.getElementById('tmpNameAdd') as any;
            if (!elInput || elInput.value === '') {
                // showToast({
                //     type:'fail',
                //     message: '请填写数据'
                // })
                showToast('请填写数据');
                return;
            }
            for (let a = 0; a < bookTypeList.value.length; a++) {
                if (bookTypeList.value[a].name === elInput.value) {
                    // showToast({
                    //     type:'fail',
                    //     message: '已存在该分类'
                    // })
                    showToast('已存在该分类');
                    return;
                }
            }
            bookTypeList.value.push({
                name: elInput.value,
                code: elInput.value,
                details: []
            })
        } else {
            bookTypeList.value.splice(i, 1);
        }
        showToast({
            type: 'success',
            message: alertSuccess + '成功'
        })
    }).catch(() => {
        showToast({
            type: 'fail',
            message: '取消' + alertSuccess
        })
    })
}


const bookTypeList = ref([{
    name: '批发',
    code: 'pf',
    details: [{
        name: '土豆',
        code: 'td'
    }, {
        name: '西红柿',
        code: 'xhs'
    }, {
        name: '香蕉',
        code: 'xj'
    }]

}, {
    name: '零售',
    code: 'ls',
    details: []
}])
// 监听数组变化
watch(bookTypeList.value,(newVal,oldVal)=>{
    init_btn_style();
})
const beforeClose = (i1: number, i: number) => {
    console.log('删除该条目');
    bookTypeList.value[i1].details.splice(i, 1);
}
const bottomActive = ref(0);
// const myArray = [{
//     name: '小花'
// }, {
//     name: '小xx'
// }, {
//     name: '小xx2'
// }]

// const onEnd = (el: any) => {
//     console.log(myArray)
//     const s = myArray[el.oldIndex];
//     myArray[el.oldIndex] = myArray[el.newIndex];
//     myArray[el.newIndex] = s;
//     console.log(myArray);
// }
</script>

<template>
    <div style="padding-bottom: 1rem"></div>
    <van-nav-bar fixed left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title>
            <span>品类管理</span>
        </template>
    </van-nav-bar>
    <div style="padding-top: 1rem;"></div>
    <div style="padding-bottom: 2rem;">
        <van-tabs v-model:active="active" @click-tab="onClickTab" color="black" background="#f7ca45" sticky
            offset-top="1rem">
            <van-tab title="收入">
                <van-collapse v-model="activeNames">
                    <div class="btn_first_style_ts" v-for="(item, index) in bookTypeList">
                        <van-swipe-cell class="van_list_s">
                            <van-collapse-item :title="item.name" :name="'code' + index">
                                <div v-for="(sitem, indexm) in item.details">
                                    <van-cell v-if="enableEdit[index][indexm] === true" style="padding:0px">
                                        <template #title>
                                            <van-field v-model="sitem.name" placeholder="填写二级分类" label-align="right"
                                                @blur="onblur(index, indexm)" :disabled="!enableEdit[index][indexm]" />
                                        </template>
                                    </van-cell>
                                    <van-swipe-cell class="van_list_s" :draggable="true">
                                        <van-cell v-if="enableEdit[index][indexm] === false || !enableEdit[index][indexm]">
                                            <template #title>
                                                {{ sitem.name }}
                                            </template>
                                            <template #right-icon>
                                                <van-icon style="line-height:5.4vw" size="0.55rem" name="edit"
                                                    @click="enableEdit[index][indexm] = true" />
                                            </template>
                                        </van-cell>
                                        <template #right>
                                            <van-button square type="primary" icon="delete-o" style="background-color:red"
                                                @click="beforeClose(index, indexm)" />
                                        </template>
                                    </van-swipe-cell>
                                    <hr />
                                </div>
                                <van-cell>
                                    <template #value>
                                        <van-icon name="add-o" size="0.6rem" @click="addCell(index)" />
                                    </template>
                                </van-cell>
                            </van-collapse-item>
                            <template #left>
                                <van-button square type="primary" text="删除" style="height:100%;background-color:red"
                                    @click="beforeCloseFirst(index, 'delete')" />
                                <van-button square type="primary" text="编辑" style="height:100%;"
                                    @click="beforeCloseFirst(index, 'edit')" />
                            </template>
                        </van-swipe-cell>
                    </div>
                </van-collapse>
            </van-tab>
            <van-tab title="支出">
                <!-- <draggable v-model="myArray" tag="transition-group" :component-data="{ name: 'fade' }" @end="onEnd">
                    <template #item="{ element }">
                        <div>{{ element.name }}</div>
                    </template>
                </draggable> -->
            </van-tab>
        </van-tabs>
        <van-tabbar class="button_bottom_s" v-model="bottomActive" active-color="#fff">
            <van-tabbar-item class="tab_edit" icon="" style="font-size: 20px;"
                @click="beforeCloseFirst(0, 'add')">添加</van-tabbar-item>
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

.navbartitle {
    background: $main_search_background;
}

.navbartitle::after {
    border-bottom-width: 0
}

.van-button__content::after {
    align-items: end;
}

.van-button__text::after {
    height: 52%;
}
</style>


