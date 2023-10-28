<script lang="ts" setup>


</script>
<template>
    <van-cell-group inset style="margin:0">
        <!-- 个人头像 -->
        <van-cell center style="background-color: #eff9f9;">
            <div style="text-align: center;">
                <div>
                    <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" round width="3rem" height="3rem"
                        position="center">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                </div>
                <div @click="">点击登录</div>
            </div>
        </van-cell>
        <!-- 导航图片 -->
        <van-cell>
            <van-grid :gutter="0">
                <van-grid-item icon="photo-o" text="收入账本" />
                <van-grid-item icon="photo-o" text="支出账本" />
                <van-grid-item icon="photo-o" text="账本统计" />
                <van-grid-item icon="photo-o" text="人员维护" />
            </van-grid>
        </van-cell>
        <!-- 导航栏 -->
        <van-cell title="收入账本" value="内容" is-link />
        <van-cell title="支出账本" value="内容" label="进货相关的单据" is-link />
        <van-cell title="" value="" is-link>
            <template #title>
                <span class="custom-title">账本统计</span>
                <van-tag type="primary">蔬菜</van-tag>
            </template>
        </van-cell>
        <van-cell title="人员维护" value="内容" is-link />
        <van-cell title="设置" value="内容" is-link />
    </van-cell-group>
</template>
<style scoped>

</style>
