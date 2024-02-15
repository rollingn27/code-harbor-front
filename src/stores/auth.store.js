import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const logined = ref(false)

  return { logined }
})
