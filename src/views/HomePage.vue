<template>
  <code-harbor-header />
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="info" @click="closeDialog('ok')" v-if="dialog.buttonText1">{{
          dialog.buttonText1
        }}</v-btn>
        <v-btn color="info" @click="closeDialog" ref="logoutCancel">{{ dialog.buttonText2 }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="code-harbor-main">
    <div class="side-bar">
      <div class="img-box">
        <img src="@/assets/sidebarIcon/shareproblem.png" alt="문제 공유" />
        <v-tooltip activator="parent" location="end">문제공유 페이지</v-tooltip>
      </div>
      <div class="img-box">
        <img src="@/assets/sidebarIcon/statistics.png" alt="통계" />
        <v-tooltip activator="parent" location="end">통계 페이지</v-tooltip>
      </div>
      <div class="img-box">
        <img src="@/assets/sidebarIcon/knowhow.png" alt="노하우" />
        <v-tooltip activator="parent" location="end">알고리즘 노하우 공유</v-tooltip>
      </div>
      <div class="img-box">
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
import { loginService } from '@/api'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const dialog = reactive({
  status: false,
  text: '',
  buttonText1: '',
  buttonText2: ''
})
const signOut = () => {
  loginService.signOut()
  router.push({ path: '/signIn' })
}

const closeDialog = (type) => {
  if (type === 'ok') {
    signOut()
  }
  dialog.status = false
}

const onSignOut = () => {
  dialog.status = true
  dialog.text = '로그아웃 하시겠습니까?'
  dialog.buttonText1 = 'ok'
  dialog.buttonText2 = 'cancel'
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
