<template>
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="warning" @click="closeDialog">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="main-page">
    <div class="main-description">
      아직 속한 group이 없으시네요. <br />code harbor를 이용하려면 소속 group이 있어야 합니다.
    </div>
    <div class="main-content">
      <div class="content-box">
        <div class="img-box">
          <img src="@/assets/arrowRight.png" />
        </div>
        <div class="content-text" @click="onGroupDialog">그룹 생성하기</div>
        <v-dialog width="30rem" v-model="groupStatus" transition="dialog-top-transition" persistent>
          <v-card>
            <v-toolbar color="primary" title="Create Group"></v-toolbar>
            <v-card-text class="d-flex align-center">
              <div class="input-box">
                <input
                  type="text"
                  placeholder="Group Name"
                  autocomplete="off"
                  v-model="groupName"
                />
                <button>확인</button>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn variant="elevated" @click="onCloseGroupDialog">취소</v-btn>
              <v-btn variant="flat" color="primary" @click="createGroup">만들기</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="content-box">
        <div class="img-box">
          <img src="@/assets/arrowRight.png" />
        </div>
        <div class="content-text cursor-help">Code Harbor 알아보기(물음표 아이콘 클릭)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { groupService } from '@/api'
import useLogger from '@/composables/logger'
import { reactive, ref } from 'vue'

const { log, errorLog } = useLogger()
const groupStatus = ref(false)
const groupName = ref('')
const dialog = reactive({
  status: false,
  text: '',
  setDialog(text) {
    this.status = true
    this.text = text
  }
})
const closeDialog = () => {
  dialog.status = false
}

const onGroupDialog = () => {
  groupStatus.value = true
}
const onCloseGroupDialog = () => {
  groupStatus.value = false
}

const createGroup = async () => {
  if (!groupName.value.trim()) {
    dialog.setDialog('그룹 이름을 입력하세요')
    return
  }

  try {
    const response = await groupService.createGroup({
      groupCreator: 'test@naver.com',
      groupName: groupName.value
    })
    log(response)
    dialog.setDialog(response.data.msg)
  } catch (error) {
    errorLog(error)
  } finally {
    groupName.value = ''
  }
}
</script>
<style lang="scss" scoped>
.main-page {
  border-radius: 5px;
  box-shadow: 3px 3px 7px rgba(46, 44, 40, 0.5);

  width: 75vw;
  min-height: 40rem;
  background: #e4f3f8;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 100px;
  .make-plan {
    position: relative;
    text-align: end;
    top: -30px;
    text-decoration: underline;
    color: #909090;
  }

  .main-description {
    width: 65vw;
    margin: 2rem auto;
    text-align: left;
    font-size: 2rem;
    color: #666666;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    font-weight: bold;
  }
  .main-content {
    width: 60vw;
    margin: 3rem auto;

    .content-box {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      .img-box {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-right: 1.5rem;
      }
      .content-text {
        color: #9370db;
        font-size: 2rem;
        font-weight: 500;
        margin: auto 0;
      }
    }
    .content-box:hover {
      background: rgb(203, 228, 240);
    }
  }
}
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

.plan-content {
  font-size: 3rem;
  font-weight: 700;
  width: 90%;
  margin: 1rem auto 1rem auto;
  text-align: center;
  height: 5rem;
}
.card-container {
  display: flex;
  flex-wrap: wrap;

  width: 90%;
  margin: 0 auto;
}
.plan-card {
  padding: 10px;
  overflow-y: auto;
}
</style>
