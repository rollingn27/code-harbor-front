import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const logined = ref(false)
  const changeLoginStatus = (status) => {
    logined.value = status
  }
  return { logined, changeLoginStatus }
})
