import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    userId: '',
    userNickname: '',
    userGroupname: ''
  })

  const setUserInfo = (userId, userNickname, userGroupName) => {
    userInfo.userId = userId
    userInfo.userNickname = userNickname
    userInfo.userGroupname = userGroupName
  }
  return { userInfo, setUserInfo }
})
