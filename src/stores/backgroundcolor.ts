import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalColorStore = defineStore('GlobalStyle', () => {
  const color = ref('#00d0d4')
  return { color }
})


export const useTabbarActiveStore = defineStore('TabbarActive', {
  state() {
    return {
      active: 'home'
    }
  }
})
