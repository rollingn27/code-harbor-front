import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const changeLoadingStatus = (status) => {
    isLoading.value = status
  }
  return { isLoading, changeLoadingStatus }
})
