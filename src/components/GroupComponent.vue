<template>
  <div class="main-page">
    <v-container>
      <v-card class="mx-auto" color="white" max-width="600">
        <v-text-field hide-details variant="plain" class="text-padding">
          OO그룹에 초대 받았습니다. 수락 하시겠습니까?
        </v-text-field>
        <div class="btn-box"><v-btn color="blue">Yes</v-btn> <v-btn color="success">No</v-btn></div>
      </v-card>
      <v-row justify="center" class="mb-6">
        <v-col v-for="(group, idx) in groupList" :key="idx" cols="auto">
          <v-card
            width="460"
            class="group-radius"
            :class="['d-flex flex-column justify-center align-center']"
          >
            <v-card-item>
              <div class="text-h2 mb-1">{{ group[0] }}</div>
              <div class="text-h6">
                <div>인원수: {{ group[3] }}명</div>
                <div>Since {{ group[2] }}</div>
              </div>
            </v-card-item>
            <v-card-actions>
              <v-btn color="red">신청취소</v-btn> <v-btn color="blue">가입신청</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getLocalStorage } from '@/utils/code-harbor-util'
import { onMounted } from 'vue'
import { groupService } from '@/api'
import useLogger from '@/composables/logger'
const userInfo = getLocalStorage('code-harbor-auth')
const { log, errorLog } = useLogger()

const groupList = ref([])
const getGroupList = async () => {
  try {
    const response = await groupService.showAllGroups({
      userId: userInfo.userId
    })
    groupList.value = response.data.groupLists
  } catch (error) {
    errorLog(error)
  }
}
onMounted(() => {
  getGroupList()
})
</script>

<style lang="scss" scoped>
.main-page {
  border-radius: 5px;
  box-shadow: 3px 3px 7px rgba(46, 44, 40, 0.5);
  width: 75vw;
  min-height: 642px;
  background: #e4f3f8;
  position: absolute;
  padding: 3rem 0;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 100px;
  overflow-y: auto;
  .text-h2 {
    margin-top: 3rem;
  }
  .text-h6 {
    margin-top: 3rem;
    text-align: end;
  }
  .group-radius {
    border-radius: 10px;
  }
}
.mb-6 > .v-col {
  margin: 2rem;
}
.btn-box {
  display: flex;
  margin: 0 15px 15px 0;
  justify-content: flex-end;
  button + button {
    margin-left: 1.5rem;
  }
}
.text-padding {
  padding: 10px 0 10px 20px;
}
</style>
