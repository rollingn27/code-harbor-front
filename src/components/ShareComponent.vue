<template>
  <div class="main-page">
    <v-row justify="end">
      <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> 문제공유 </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">문제 공유</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="['백준', '프로그래머스', '리트코드']"
                    label="플랫폼*"
                    required
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="문제번호" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="[
                      '구현',
                      '자료구조',
                      '그리디',
                      '문자열',
                      '그래프',
                      'DP',
                      '수학',
                      '기하학',
                      '기타'
                    ]"
                    label="분류(카테고리)"
                    required
                    variant="outlined"
                    multiple
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="문제이름*" required variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['Bronze', 'Silver', 'Over Gold']"
                    label="난이도"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['T', 'A', 'B', 'C']" label="우선순위" variant="outlined" />
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Comment" type="text" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*는 필수 사항입니다.</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Cancel </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> 공유하기 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
      :hover="true"
      class="test"
    >
    </v-data-table-server>
  </div>
</template>
<script>
const desserts = [
  {
    name: '백준',
    calories: 1024,
    fat: '부녀회장이 될테야',
    carbs: 'DP',
    protein: '실버',
    iron: 'A',
    iron2: '같이 풀어보면 좋을거 같습니다.'
  },
  {
    name: '프로그래머스',
    calories: 20452,
    fat: '네트워크 연결 상태 확인하기',
    carbs: '그래프, 그래프, 그래프',
    protein: '3이상',
    iron: 'T',
    iron2: '이론에 도움이 됩니다.'
  },
  {
    name: '프로그래머스',
    calories: 20452,
    fat: '네트워크 연결 상태 확인하기ddddddddddddddddddddddddddddddddddddddd',
    carbs: '그래프',
    protein: '3이상',
    iron: 'T',
    iron2: '이론에 도움이 됩니다.ddddddddddddddddddddddddddddfdfdfdfdddddddddddd'
  }
]

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  }
}

export default {
  data: () => ({
    dialog: false,
    itemsPerPage: 5,
    headers: [
      {
        title: '플랫폼',
        align: 'center',
        key: 'name',
        width: '120'
      },
      { title: '문제번호', key: 'calories', align: 'center', width: '110' },
      { title: '문제이름', key: 'fat', align: 'start', width: '200' },
      { title: '분류', key: 'carbs', align: 'start', sortable: false, width: '120' },
      { title: '난이도', key: 'protein', align: 'end', width: '100' },
      { title: '우선순위', key: 'iron', align: 'end', width: '110' },
      { title: 'Comment', key: 'iron2', align: 'center' }
    ],
    serverItems: [],
    loading: true,
    totalItems: 0
  }),
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items
        this.totalItems = total
        this.loading = false
      })
    }
  }
}
</script>
<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

const selected = ref(['John', 'Jacob5', 'Jacob7'])
const groupStatus = ref(false)
const temp = ref(false)
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

const groupCreate = () => {
  groupStatus.value = true
}
const groupMakeCancel = () => {
  groupStatus.value = false
}
const create = () => {
  tasks.push({
    done: false,
    text: newTask.value
  })

  newTask.value = null
}
const model = ref(null)
</script>
<style lang="scss" scoped>
.main-page {
  box-shadow: 3px 3px 7px rgba(46, 44, 40, 0.5);
  width: 75vw;
  position: absolute;
  min-height: 642px;
  top: 150px;

  left: 50%;
  transform: translateX(-50%);
  margin-left: 100px;
  button {
    top: -2rem;
    right: 2rem;
  }
}
</style>
