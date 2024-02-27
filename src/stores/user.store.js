import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({
    userId: '',
    userNickname: '',
    userGroupStatus: {
      groupStatus: 0,
      userGroupName: ''
    },
    newMessageList: []
  })

  const setUserInfo = (userId, userNickname, userGroupStatus, newMessageList) => {
    userInfo.userId = userId
    userInfo.userNickname = userNickname
    userInfo.userGroupStatus = userGroupStatus
    userInfo.newMessageList = newMessageList
  }
  return { userInfo, setUserInfo }
})
