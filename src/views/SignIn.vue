<template>
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="warning" @click="closeDialog">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="sign-in">
    <div class="sign-in-content">
      <img class="logo" src="@/assets/logoCodeHarbor.png" />
      <div class="code-harbor">Code Harbor</div>
      <template v-if="!passwordCheckStatus">
        <input
          type="type"
          class="input"
          placeholder="Email Address"
          autocomplete="off"
          v-model="loginInfo.userId"
          ref="userId"
        />

        <input
          type="password"
          class="input"
          placeholder="Password"
          autocomplete="off"
          v-model="loginInfo.userPassword"
          ref="userPassword"
          @keydown.enter="signIn"
        />
      </template>
      <input
        v-else
        type="type"
        class="input"
        placeholder="Enter email to find password"
        autocomplete="off"
        v-model="loginInfo.userId"
        ref="userId"
      />
      <button v-if="!passwordCheckStatus" class="sign-in-button" @click="signIn">Sign In</button>
      <button v-else class="sign-in-button password-button" @click="sendPassword">
        비밀번호 전송
      </button>
      <div class="link-area">
        <div v-if="!passwordCheckStatus" @click="changeStatus">Forgot password?</div>
        <div v-else @click="goSignIn">Sign In</div>
        <div @click="goSignUp">Sign Up</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginService, userService } from '@/api'
import useLogger from '@/composables/logger'
import { useAuthStore } from '@/stores/auth.store'
import { setLocalStorage } from '@/utils/code-harbor-util.js'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const userId = ref(null)
const userPassword = ref(null)
const initialLoginInfo = {
  userId: '',
  userPassword: ''
}
const loginInfo = reactive({
  userId: '',
  userPassword: ''
})

const authStore = useAuthStore()
const router = useRouter()
const { log, errorLog } = useLogger()
const passwordCheckStatus = ref(false)

const dialog = reactive({
  status: false,
  text: '',
  type: ''
})

const goSignUp = () => {
  router.push({ path: '/signUp' })
}
const changeStatus = () => {
  passwordCheckStatus.value = true
}

const closeDialog = () => {
  dialog.status = false
}

const goSignIn = () => {
  passwordCheckStatus.value = false
}

const sendPassword = async () => {
  log(loginInfo.userId)
  if (!loginInfo.userId.trim()) {
    dialog.status = true
    dialog.text = '이메일(아이디)를 입력하세요'
    return
  }
  try {
    const response = await userService.findPassword({
      userId: loginInfo.userId
    })
    log(response)
    if (response.success) {
      dialog.status = true
      dialog.text = response.data.msg
    } else {
      dialog.status = true
      dialog.text = response.data.msg
    }
  } catch (error) {
    errorLog(error)
  }
}
const signIn = async () => {
  log(loginInfo)
  if (!loginInfo.userId.trim()) {
    dialog.status = true
    dialog.text = '이메일(아이디)를 입력하세요.'
    return
  }
  if (!loginInfo.userPassword.trim()) {
    dialog.status = true
    dialog.text = '패스워드를 입력하세요.'
    return
  }

  try {
    const response = await loginService.signIn(loginInfo)
    log(response)
    if (response.success) {
      const userInfo = response.data
      authStore.changeLoginStatus(true)
      setLocalStorage('code-harbor-auth', userInfo)
      router.push({ path: '/' })
    } else {
      errorLog('SignIn Error: ', response.data)
      dialog.status = true
      dialog.text = response.data.msg
    }
  } catch (error) {
    errorLog('SignIn Error: ', error)
  } finally {
    Object.assign(loginInfo, initialLoginInfo)
  }
}
onMounted(() => {
  userId.value.focus()
})
</script>

<style lang="scss" scoped>
.sign-in {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #e5e7ef;
  z-index: 1;
  opacity: 0.7;
}

.sign-in-content {
  background-color: #fefefe;
  margin: 5% auto;
  width: 52rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 5px rgba(55, 55, 75, 0.5);
  .logo {
    width: 6.25rem;
    height: 6.25rem;
    margin: 1rem auto 0 auto;
  }
  .code-harbor {
    margin: auto;
    width: 19.125rem;
    height: 4rem;
    text-align: center;
    color: #808080;
    font-size: 2rem;
    font-weight: 600;
  }
  .input {
    all: unset;
    width: 33.125rem;
    height: 3rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.2),
      0 2px 2px rgba(0, 0, 0, 0.1) inset;
    margin: 0 auto 1.75rem auto;
    font-size: 1.5rem;
    padding: 0.75rem 1.75rem;
  }

  .sign-in-button {
    all: unset;
    width: 36.625rem;
    height: 4.5rem;
    background: #808080;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    margin: 0 auto;
    border-radius: 3px;
  }
  .sign-in-button:hover {
    background: #999999;
    cursor: pointer;
  }
  .password-button {
    background: #a998ff;
  }
  .password-button:hover {
    background: #7a5cff;
  }
  .link-area {
    color: #808080;
    display: flex;
    margin: 1.5rem 7.75rem;
    justify-content: space-between;
    div {
      cursor: pointer;
    }
  }
}
</style>
