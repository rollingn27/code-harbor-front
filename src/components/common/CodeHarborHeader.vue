<template>
  <div class="code-header">
    <div class="header-left">
      <img src="@/assets/logoCodeHarbor.png" alt="code harbor" @click="clickLogo" />
      <div class="code-harbor">Code Harbor <span>with algorithm</span></div>
    </div>
    <div class="header-right">
      <div class="user-info">
        <span class="user-nickname">{{ loginUser.userNickname }}님</span>
        <v-badge content="2" color="error" class="badge-class">
          <v-icon>mdi-bell-outline</v-icon>
          <v-card v-if="false" class="mx-auto noti-class" min-width="400">
            <v-list lines="three">
              <v-list-subheader>Notifications</v-list-subheader>
              <v-list-item>
                <v-list-item-title>Content filtering</v-list-item-title>
                <v-list-item-subtitle>
                  Set the content filtering level to restrict appts that can be downloaded
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Password</v-list-item-title>
                <v-list-item-subtitle>
                  Require password for purchase or use password to restrict purchase
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-badge>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getLocalStorage } from '@/utils/code-harbor-util'
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginService } from '@/api'
import useLogger from '@/composables/logger'
import { useUserStore } from '@/stores/user.store'
const { log, errorLog } = useLogger()
const userStore = useUserStore()
const router = useRouter()
const clickLogo = () => {
  router.push({ path: '/' })
}
const loginUser = userStore.userInfo
const updateUser = async () => {
  const userInfo = getLocalStorage('code-harbor-auth')
  const userId = userInfo.userId

  try {
    const response = await loginService.latestUserInfo({ userId })
    const user = response.data
    log(response)
    userStore.setUserInfo(user.userId, user.userNickname, user.userGroupname)
  } catch (error) {
    errorLog(error)
  }
}
onMounted(async () => {
  await updateUser()
})

onUpdated(async () => {
  await updateUser()
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
  top: 45px;
  z-index: 10;
  right: 0px;
}
.badge-class {
  cursor: pointer;
}
</style>
