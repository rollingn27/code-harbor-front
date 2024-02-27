<template>
  <div class="main-page">
    <v-card-title class="text-h5">
      <v-expand-x-transition>
        <v-icon> mdi-check </v-icon>
      </v-expand-x-transition>
      Code Harbor란?
    </v-card-title>
    <v-text-field readonly>
      <v-card-text>
        <v-icon>mdi-circle-small</v-icon>
        Code Harbor는 알고리즘 Study를 관리하는 공유 플랫폼입니다. 그룹원 간의 plan을 서로 체크하고
        문제를 공유하는 플랫폼입니다.
      </v-card-text>
    </v-text-field>
    <v-card-title class="text-h5">
      <v-icon> mdi-check </v-icon>
      Group 가입하기
    </v-card-title>
    <v-text-field readonly>
      <v-card-item>
        <v-card-text>
          <v-icon>mdi-circle-small</v-icon>Code Harbor를 이용하려면 Group이 있어야 합니다. 그룹을
          만들거나 가입을 하세요
        </v-card-text>
      </v-card-item>
      <v-card-actions>
        <v-btn variant="outlined" @click="onGroupDialog">그룹 생성하기</v-btn>
        <v-btn variant="outlined" @click="goGroupList">그룹 둘러보기</v-btn>
      </v-card-actions>
    </v-text-field>
    <group-make-dialog :visible="groupDialogVisible" @closeDialog="onCloseGroupDialog" />
    <v-card-title class="text-h5">
      <v-icon> mdi-check </v-icon>
      Group 가입 후 데일리 플랜!
    </v-card-title>
    <v-text-field readonly>
      <v-card-text>
        <v-icon>mdi-circle-small</v-icon> 그날의 계획을 세우고 계획을 공유하세요.
      </v-card-text>
    </v-text-field>
    <v-card-title class="text-h5">
      <v-icon> mdi-check </v-icon>
      문제 공유하기<img src="@/assets/sidebarIcon/shareproblem.png" />
    </v-card-title>
    <v-text-field readonly>
      <v-card-text>
        <v-icon>mdi-circle-small</v-icon> 자신이 푼 문제들을 그룹원과 공유하세요.
      </v-card-text>
    </v-text-field>
    <v-card-title class="text-h5">
      <v-icon> mdi-check </v-icon>
      친구 초대하기<img src="@/assets/sidebarIcon/invite.png" />
    </v-card-title>
    <v-text-field readonly>
      <v-card-text>
        <v-icon>mdi-circle-small</v-icon> 같이 공부를 원하는 친구에게 초대를 보내세요.
      </v-card-text>
    </v-text-field>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GroupMakeDialog from './dialogs/GroupMakeDialog.vue'

const groupDialogVisible = ref(false)
const router = useRouter()
const onGroupDialog = () => {
  groupDialogVisible.value = true
}
const onCloseGroupDialog = () => {
  groupDialogVisible.value = false
}
const goGroupList = () => {
  router.push('/group')
}
</script>
<style lang="scss" scoped>
.main-page {
  box-shadow: 3px 3px 7px rgba(46, 44, 40, 0.5);
  width: 75vw;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 100px;
  img {
    margin-left: 0.5rem;
    width: 2rem;
    height: 2rem;
  }
}
</style>
