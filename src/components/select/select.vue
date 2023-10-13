<template>
    <van-picker :show="show" :columns="columns" :loading="loading" :valueKey="valueKey" :itemHeight="itemHeight"
        @cancel="onCancel" @confirm="onConfirm" />
</template>
  
<script lang="ts" setup>

import { reactive, ref } from 'vue';

const show = ref(false);
const columns = reactive([{
    values: ['选项1', '选项2', '选项3', '选项4']
}])
const loading = ref(false)
const valueKey = ref('text')
const itemHeight = ref(44)
const selectedIndexes = ref<number>()
const onCancel = () => {
    show.value = false;
}
const onConfirm = (values: string, index: number) => {
    selectedIndexes.value = index;
    show.value = false;
}
</script>
  