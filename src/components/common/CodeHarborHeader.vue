<template>
  <div class="code-header">
    <div class="header-left">
      <img src="@/assets/logoCodeHarbor.png" alt="code harbor" @click="clickLogo" />
      <div class="code-harbor">Code Harbor <span>with algorithm</span></div>
    </div>
    <div class="header-right">
      <div class="user-info">
        <span class="user-nickname">{{ loginUser.userNickname }}님</span>
        <v-icon @click="notiCheck" size="30" style="margin-bottom: 10px; cursor: pointer"
          >mdi-bell-outline</v-icon
        >
        <v-badge class="badge-class" v-if="noitCount > 0" :content="noitCount" color="error" />

        <v-card
          v-if="notiShow"
          class="mx-auto noti-class"
          min-width="400"
          v-click-outside="onClickOutside"
        >
          <v-list lines="three">
            <v-list-subheader>Notifications</v-list-subheader>
            <v-list-item v-for="(noti, idx) in notiList" :key="idx">
              <template v-for="(value, key) in noti" :key="key">
                <v-list-item-title>{{ value[0] }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ value[1] }}
                </v-list-item-subtitle>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getLocalStorage } from '@/utils/code-harbor-util'
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginService, userService } from '@/api'
import useLogger from '@/composables/logger'
import { useUserStore } from '@/stores/user.store'
const { log, errorLog } = useLogger()
const userStore = useUserStore()
const router = useRouter()

const clickLogo = () => {
  router.push({ path: '/' })
}
const notiShow = ref(false)

const onClickOutside = async () => {
  notiShow.value = false
  try {
    await userService.readAllMessages({ userId: loginUser.userId })
    await updateUser()
    noitCount.value = 0
  } catch (error) {
    errorLog(error)
  }
}
const loginUser = userStore.userInfo
const notiList = ref([])
const noitCount = ref(0)
const updateUser = async () => {
  try {
    const userInfo = getLocalStorage('code-harbor-auth')
    const userId = userInfo.userId
    const response = await loginService.latestUserInfo({ userId })
    const user = response.data
    log(response)
    userStore.setUserInfo(user.userId, user.userNickname, user.userGroupStatus, user.newMessageList)
    notiList.value = loginUser.newMessageList
    if (notiList.value) noitCount.value = notiList.value.length
  } catch (error) {
    errorLog(error)
  }
}

const notiCheck = () => {
  if (noitCount.value > 0) {
    notiShow.value = true
  }
}
onMounted(() => {
  updateUser()
})
</script>
<style lang="scss" scoped>
.code-header {
  width: 100%;
  height: 90px;

  display: flex;
  padding: 0 2rem;
  position: relative;

  .header-left,
  .header-right {
    width: 50%;
    color: #808080;
    height: 90px;
    margin-right: 2rem;
  }
  .header-left {
    display: flex;

    .code-harbor {
      font-size: 3rem;
      font-weight: bold;
      height: 100%;
      line-height: 100px;
      span {
        font-size: 1.25rem;
      }
    }
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 1.25rem;
    span {
      font-size: 2rem;
      font-style: italic;
    }
  }
}
.code-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 2%;
  width: 96%;
  border-bottom: 1px solid #808080;
}
.user-nickname {
  margin-right: 0.5rem;
}
.noti-class {
  position: absolute;
  top: 110px;
  z-index: 10;
  right: 20px;
}
.badge-class {
  position: relative;
  top: -25px;
}
</style>
