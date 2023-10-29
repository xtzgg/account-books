<script setup lang="ts">

import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTabbarActiveStore } from './stores/backgroundcolor'
const useGlobalColor = useTabbarActiveStore();

</script>

<template>
  <div class="header_common"></div>
  <RouterView />
</template>
<style scoped type="scss">

.header_common {
  width: 100%;
  background-color: rgb(247, 202, 69);
  position: fixed;
  top: 0rem;
  height: 1.1rem; 
  /* 5vh */
  z-index: 999;
}
</style>
