<template>
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="warning" @click="closeDialog">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog width="30rem" v-model="groupDialog.status" transition="dialog-top-transition">
    <v-card>
      <v-toolbar color="primary" title="Create Group"></v-toolbar>
      <v-card-text class="d-flex align-center">
        <div class="input-box">
          <input
            type="text"
            placeholder="Group Name"
            autocomplete="off"
            v-model="groupDialog.groupName"
          />
          <button @click="checkGroupName">확인</button>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="elevated" @click="closeGroupDialog">취소</v-btn>
        <v-btn variant="flat" color="primary" @click="createGroup">만들기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { groupService, loginService } from '@/api'
import useLogger from '@/composables/logger'
import { useUserStore } from '@/stores/user.store'
import { onUpdated, reactive } from 'vue'
import { useRouter } from 'vue-router'
const { log, errorLog } = useLogger()
const userStore = useUserStore()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeDialog'])

const groupDialog = reactive({
  status: false,
  groupName: ''
})
const dialog = reactive({
  status: false,
  text: '',
  setDialog(text) {
    this.status = true
    this.text = text
  }
})
const closeGroupDialog = () => {
  emit('closeDialog')
}

const closeDialog = () => {
  dialog.status = false
}

const createGroup = async () => {
  console.log(groupDialog)
  if (!groupDialog.groupName.trim()) {
    dialog.setDialog('그룹 이름을 입력하세요')
    return
  }

  try {
    const response = await groupService.createGroup({
      groupCreator: userStore.userInfo.userId,
      groupName: groupDialog.groupName,
      isChecked: true
    })
    log(response)
    const res = await loginService.latestUserInfo({ userId: userStore.userInfo.userId })
    const user = res.data
    userStore.setUserInfo(user.userId, user.userNickname, user.userGroupStatus)
    closeGroupDialog()
    dialog.setDialog(response.data.msg)
  } catch (error) {
    errorLog(error)
  } finally {
    groupDialog.groupName = ''
  }
}
const checkGroupName = async () => {
  if (!groupDialog.groupName.trim()) {
    dialog.setDialog('그룹 이름을 입력하세요')
    return
  }

  try {
    const response = await groupService.checkGroupName({
      groupName: groupDialog.groupName
    })
    log(response)
    dialog.setDialog(response.data.msg)
  } catch (error) {
    errorLog(error)
  }
}

onUpdated(() => {
  groupDialog.status = props.visible
})
</script>
<style lang="scss" scoped>
.input-box {
  width: 27rem;
  height: 4.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 2px 2px rgba(0, 0, 0, 0.1) inset;
  margin: 0 auto 1.75rem auto;
  display: flex;

  input,
  button {
    all: unset;
  }
  input {
    font-size: 1.5rem;
    padding: 0.75rem 1.75rem;
    flex: 8;
  }
  button {
    margin: auto 2rem auto 0;
    background: #4686f7;
    width: 6rem;
    height: 50%;
    text-align: center;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
  }
  button:hover {
    background: blue;
    cursor: pointer;
  }
}
</style>
