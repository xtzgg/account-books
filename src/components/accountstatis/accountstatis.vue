<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { showToast } from 'vant';
// 引入echart
import * as echarts from 'echarts';
import MainNavbar from '@/components/mainnavbar/mainnavbar.vue'
import { useTabbarActiveStore } from '../../stores/backgroundcolor'

// 全局声明变量和类型
const TabbarActive = useTabbarActiveStore();
type EChartsOption = echarts.EChartsOption

onMounted(() => {
    // 初始化选中样式
    TabbarActive.active = 'accountstatis';
});
nextTick(() => {
    initEchartsTotal();
    initEchartsType();
})
// 初始化图标
var myChart: any;
const initEchartsTotal = () => {
    if(myChart){
        myChart.dispose(); // 销毁
    }
    var chartDom = document.getElementById('main')!;
    myChart = echarts.init(chartDom);
    var option: EChartsOption = {
        title: {
            text: '汇总'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['收入', '支出', '未收款'],
            top: '5%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '收入',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '支出',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '未收款',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ],
        backgroundColor: '#abda74'
    };
    option && myChart.setOption(option);
}

// 品类初始化
const initEchartsType = () => {
    var chartDom = document.getElementById('main1')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption = {
        title: {
            text: '品类收入'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['土豆', '西红柿', '香蕉'],
            top: '6%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '土豆',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '西红柿',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '香蕉',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            }
        ],
        backgroundColor: '#abda74'
    };
    option && myChart.setOption(option);
}

const active = ref(0);
const onClickTab = ({ title }: any) => {
    initEchartsTotal();
    initEchartsType();
}

</script>
<template>
    <van-nav-bar class="navbartitle" fixed>
        <template #title>
            <span>收支分析</span>
        </template>
    </van-nav-bar>
    <div style="padding-bottom: 2rem"></div>
    <van-tabs v-model:active="active" @click-tab="onClickTab" height="100px" color="black" background="#f7ca45"
     sticky
        title-active-color='blue'
        offset-top="2rem"
        >   
        <van-tab title="周">
            <div style="font-size: 14px;margin-top: 0.2rem;">
                <van-row>
                    <van-col span="12" style="text-indent: 0.5rem;">总收入: 40000元</van-col>
                    <van-col span="12">总支出: 40000元</van-col>
                </van-row>
                <van-row>
                    <van-col span="12"  style="text-indent: 0.5rem;">未收款: 40000元</van-col>
                </van-row>
                <div id="main" style="width: 100%;height:60vh;margin-top:0.2rem;margin-bottom:0.5rem"></div>
                <div id="main1" style="width: 100%;height:60vh;margin-bottom:2rem"></div>
            </div>
        </van-tab>
        <van-tab title="月">内容 2</van-tab>
        <van-tab title="年">内容 3</van-tab>
    </van-tabs>
    <main-navbar></main-navbar>
</template>

<style scoped lang="scss">
.navbartitle {
  background: $main_search_background;
//   top: 1rem
}
.navbartitle::after {
  border-bottom-width: 0
}
</style>