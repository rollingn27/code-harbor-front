import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const logined = ref(false)
  const changeLoginStatus = (status) => {
    logined.value = status
  }
  return { logined, changeLoginStatus }
})