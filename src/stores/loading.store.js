import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const changeLoadingStatus = (status) => {
    isLoading.value = status
  }
  return { isLoading, changeLoadingStatus }
})
