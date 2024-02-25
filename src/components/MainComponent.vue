<template>
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="warning" @click="closeDialog">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="main-page" v-if="!userStore.userInfo.userGroupname">
    <div class="main-description">
      아직 속한 group이 없으시네요. <br />code harbor를 이용하려면 소속 group이 있어야 합니다.
    </div>
    <div class="main-content">
      <div class="content-box">
        <div class="img-box">
          <img src="@/assets/arrowRight.png" />
        </div>
        <div class="content-text" @click="onGroupDialog">그룹 생성하기</div>
        <group-make-dialog :visible="groupDialogVisible" @closeDialog="onCloseGroupDialog" />
      </div>
      <div class="content-box">
        <div class="img-box">
          <img src="@/assets/arrowRight.png" />
        </div>
        <div class="content-text cursor-help" @click="goHelp">Code Harbor 알아보기</div>
      </div>
    </div>
  </div>
  <div v-else class="main-page">
    <div class="make-plan">네카라쿠배로 첫걸음.. 목표를 세우세요!</div>
    <div class="plan-content">{{ testGroup }} - Day plans</div>
    <div class="card-container">
      <v-card
        class="mx-auto my-8 plan-card"
        width="380"
        height="340"
        elevation="16"
        title="Rolling's plan"
        append-icon="mdi-dots-horizontal"
      >
        <v-container style="max-width: 500px">
          <v-text-field
            v-model="newTask"
            label="What are you working on?"
            variant="solo"
            @keydown.enter="create"
          >
            <template v-slot:append-inner>
              <v-fade-transition>
                <v-btn
                  v-show="newTask"
                  icon="mdi-plus-circle"
                  variant="text"
                  @click="create"
                ></v-btn>
              </v-fade-transition>
            </template>
          </v-text-field>

          <v-card v-if="tasks.length > 0">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                <v-list-item @click="task.done = !task.done">
                  <v-list-item-title>
                    <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.text }}</span>
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-expand-x-transition>
                      <v-icon color="success"> mdi-check </v-icon>
                    </v-expand-x-transition>
                  </template>
                </v-list-item>
              </template>
            </v-slide-y-transition>
          </v-card>
        </v-container>
      </v-card>
      <v-card
        class="mx-auto my-8 plan-card"
        width="380"
        height="340"
        elevation="16"
        title="Rolling's plan"
        append-icon="mdi-dots-horizontal"
        ><v-container>
          <v-checkbox v-model="selected" label="백준 2문제" value="John1"></v-checkbox>
          <v-checkbox v-model="selected" label="백준 2문제" value="John1"></v-checkbox>
          <v-checkbox v-model="selected" label="백준 2문제" value="John1"></v-checkbox>
          <v-checkbox v-model="selected" label="백준 2문제" value="John1"></v-checkbox>
          <v-checkbox v-model="selected" label="백준 2문제" value="John1"></v-checkbox>
          <v-checkbox v-model="selected" label="알고리즘" value="Jacob1"></v-checkbox>
        </v-container> </v-card
      ><v-card
        class="mx-auto my-8 plan-card"
        width="380"
        height="340"
        elevation="16"
        title="Sally's plan"
        append-icon="mdi-dots-horizontal"
        ><v-container>
          <v-checkbox v-model="selected" label="프로그래머스 2문제" value="John1"></v-checkbox>
          <v-checkbox v-model="selected" label="리트코트 1문제" value="Jacob1"></v-checkbox>
          <v-checkbox v-model="selected" label="다이나믹프로그래밍" value="Jacob2"></v-checkbox>
        </v-container>
      </v-card>

      <v-card
        class="mx-auto my-8 plan-card"
        width="380"
        height="340"
        elevation="16"
        title="Teddy's plan"
        append-icon="mdi-dots-horizontal"
        fluid
        ><v-container>
          <v-checkbox v-model="selected" label="골드 1문제" value="John"></v-checkbox>
          <v-checkbox v-model="selected" label="정렬 복습" value="Jacob5"></v-checkbox>
          <v-checkbox v-model="selected" label="이론 포스팅" value="Jacob7"></v-checkbox>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import useLogger from '@/composables/logger'
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import GroupMakeDialog from './dialogs/GroupMakeDialog.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const temp = ref(false)
const selected = ref(['John', 'Jacob5', 'Jacob7'])
const tasks = reactive([
  {
    done: false,
    text: 'Foobar'
  },
  {
    done: false,
    text: 'Fizzbuzz'
  }
])

const newTask = ref(null)

const create = () => {
  tasks.push({
    done: false,
    text: newTask.value
  })

  newTask.value = null
}
const model = ref(null)
const userStore = useUserStore()
const testGroup = computed(() => userStore.userInfo.userGroupname)

const { log, errorLog } = useLogger()
const groupDialogVisible = ref(false)
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
  groupDialogVisible.value = true
}
const onCloseGroupDialog = () => {
  groupDialogVisible.value = false
}

const goHelp = () => {
  router.push('/help')
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
