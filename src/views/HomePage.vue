<template>
  <code-harbor-header />
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="info" @click="closeDialog('ok')">ok</v-btn>
        <v-btn color="info" @click="closeDialog" ref="logoutCancel">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog width="30rem" v-model="groupStatus">
    <v-card>
      <v-toolbar color="info" title="그룹 초대하기"></v-toolbar>
      <v-card-text class="d-flex align-center">
        <v-text-field label="Email" variant="outlined" v-model="groupInvitee" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="flat" color="info" @click="invite">초대하기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="code-harbor-main">
    <div class="side-bar">
      <div class="img-box" @click="goGroupList">
        <img src="@/assets/sidebarIcon/groups.png" alt="group list" />
        <v-tooltip activator="parent" location="end">그룹 둘러보기</v-tooltip>
      </div>
      <div class="img-box" @click="goShare">
        <img src="@/assets/sidebarIcon/shareproblem.png" alt="문제 공유" />
        <v-tooltip activator="parent" location="end">문제공유 페이지</v-tooltip>
      </div>
      <div class="img-box" @click="onInviteDialog">
        <img src="@/assets/sidebarIcon/invite.png" alt="그룹초대" />
        <v-tooltip activator="parent" location="end">그룹에 친구 초대</v-tooltip>
      </div>
      <div class="img-box" @click="goHelp">
        <img class="cursor-help" src="@/assets/sidebarIcon/help.png" alt="help" />
        <v-tooltip activator="parent" location="end">Code Harbor 알아보기</v-tooltip>
      </div>
      <div class="img-box" @click="onSignOut">
        <img src="@/assets/sidebarIcon/logout.png" alt="log out" />
        <v-tooltip activator="parent" location="end">로그아웃</v-tooltip>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { loginService, groupService } from '@/api'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import CodeHarborHeader from '@/components/common/CodeHarborHeader.vue'
import useLogger from '@/composables/logger'
const { log, errorLog } = useLogger()
const router = useRouter()
const dialog = reactive({
  status: false,
  text: '',
  type: '',
  setDialog(text, type) {
    this.status = true
    this.text = text
    this.type = type
  }
})
const userStore = useUserStore()
const userInfo = userStore.userInfo
const groupStatus = ref(false)
const groupInvitee = ref('')
const signOut = () => {
  loginService.signOut()
  router.push({ path: '/signIn' })
}

const closeDialog = (ok) => {
  if (dialog.type === 'logout' && ok === 'ok') {
    signOut()
  }
  dialog.status = false
}

const onInviteDialog = () => {
  groupStatus.value = true
}

const invite = async () => {
  if (!groupInvitee.value.trim()) {
    dialog.setDialog('초대받을 사람의 이메일을 입력하세요.')
    return
  }
  try {
    const response = await groupService.inviteGroup({
      groupInvitor: userInfo.userId,
      groupName: userInfo.userGroupStatus.userGroupName,
      groupInvitee: groupInvitee.value
    })
    log(response)
    dialog.setDialog(response.data.msg)
  } catch (error) {
    errorLog(error)
  } finally {
    groupInvitee.value = ''
  }
}
const onSignOut = () => {
  dialog.setDialog('로그아웃 하시겠습니까?', 'logout')
}

const goShare = () => {
  router.push({ path: '/share' })
}

const goHelp = () => {
  router.push({ path: '/help' })
}

const goGroupList = () => {
  router.push({ path: '/group' })
}
</script>
<style lang="scss" scoped>
.code-harbor-main {
  display: flex;
  align-items: center;
  height: 50rem;
  .side-bar {
    margin-left: 7.25rem;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(92, 88, 81, 0.5);
    .img-box {
      margin: auto;
      width: 5.25rem;
      height: 5.25rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      img {
        width: 4rem;
        height: 4rem;
        cursor: pointer;
      }
    }
    .img-box:hover {
      background: rgb(238, 218, 234);
    }
  }
}
</style>
