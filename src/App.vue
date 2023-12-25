<script setup lang="ts">

import { ref } from 'vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <RouterView/>
  <van-watermark content="accountbook" opacity="0.2" text-color="#abda74"/>
</template>

<style scoped type="scss">

.header_common {
  width: 100%;
  background-color: rgb(247, 202, 69);
  position: fixed;
  top: 0rem;
  height: 1.1rem; 
  z-index: 999;
}
</style>
