import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalColorStore = defineStore('GlobalStyle', () => {
  const color = ref('#00d0d4')
  return { color }
})

