<template>
  <v-dialog v-model="dialog.status" width="35rem">
    <v-card>
      <v-card-text> {{ dialog.text }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="warning" @click="closeDialog">{{ dialog.buttonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <div class="sign-in">
    <div class="sign-in-content">
      <img class="logo" src="@/assets/logoCodeHarbor.png" />
      <div class="code-harbor">Code Harbor</div>
      <div class="input-box">
        <input
          type="text"
          placeholder="Email Address"
          autocomplete="off"
          v-model="signUpInputs.email"
          ref="userId"
          :disabled="confirmStatus.email"
        />
        <button v-if="!confirmStatus.email" @click="emailCheck">이메일인증</button>
        <img v-else class="check-img" src="@/assets/checkV.png" />
      </div>
      <div class="email-waiting" v-if="emailWaiting">
        <div class="waiting-box">
          <div>인증번호입력 :</div>
          <input type="text" :placeholder="emailWaitingTime" v-model="confirmStatus.emailCode" />
          <button @click="emailVerify">확인</button>
        </div>
      </div>
      <div class="input-box">
        <input
          type="text"
          placeholder="Nickname"
          autocomplete="off"
          ref="nickname"
          v-model="signUpInputs.nickname"
          :disabled="confirmStatus.nickname"
        />
        <button v-if="!confirmStatus.nickname" @click="checkNickname">중복확인</button>
        <img v-else class="check-img" src="@/assets/checkV.png" />
      </div>
      <input
        class="input"
        type="password"
        placeholder="Password"
        autocomplete="off"
        ref="passwordRef"
        v-model="signUpInputs.password"
      />
      <input
        class="input"
        type="password"
        placeholder="Confirm Password"
        autocomplete="off"
        v-model="signUpInputs.passwordConfirm"
      />
      <button class="sign-in-button" @click="signUp">Sign Up</button>
      <div class="link-area" @click="goSignIn">
        <div>Have An Account?</div>
        <div style="font-weight: bold">Sign In</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userService } from '@/api'
import useLogger from '@/composables/logger'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const { log, errorLog } = useLogger()
const router = useRouter()
const userId = ref(null)
const nickname = ref(null)
const passwordRef = ref(null)

const initialInputState = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: ''
}
const signUpInputs = reactive({
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: ''
})
const initialConfirmStatus = {
  email: false,
  emailCode: '',
  nickname: false
}
const confirmStatus = reactive({
  email: false,
  emailCode: '',
  nickname: false
})
const dialog = reactive({
  status: false,
  text: '',
  buttonText: '확인'
})
const closeDialog = () => {
  dialog.status = false
  if (dialog.type === 'success') {
    goSignIn()
  }
}
const emailWaiting = ref(false)
const emailWaitingTime = ref('05:00')
const emailInterval = ref(null)
const signUp = async () => {
  if (!confirmStatus.email) {
    dialog.status = true
    dialog.text = '이메일 인증을 먼저 하세요.'
    return
  }

  if (!confirmStatus.nickname) {
    dialog.status = true
    dialog.text = '닉네임 중복 확인을 먼저 먼저 하세요.'
    return
  }

  if (!signUpInputs.password.trim()) {
    dialog.status = true
    dialog.text = '비밀번호를 입력하세요.'
    return
  }

  if (signUpInputs.password !== signUpInputs.passwordConfirm) {
    dialog.status = true
    dialog.text = '입력하신 비밀번호가 다릅니다.'
    return
  }
  log(signUpInputs)
  try {
    const response = await userService.signupBasic({
      userId: signUpInputs.email,
      userNickname: signUpInputs.nickname,
      userPassword: signUpInputs.password
    })

    if (response.success) {
      dialog.status = true
      dialog.text = '회원가입에 성공하였습니다. 로그인해 주세요.'
      dialog.type = 'success'
    } else {
      dialog.status = true
      dialog.text = response.data.msg
    }
  } catch (error) {
    errorLog(error)
  } finally {
    Object.assign(signUpInputs, initialInputState)
    Object.assign(confirmStatus, initialConfirmStatus)
  }
}
const startWaiting = () => {
  let time = 5 * 60

  emailInterval.value = setInterval(() => {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    let formattedMinutes = minutes.toString().padStart(2, '0')
    let formattedSeconds = seconds.toString().padStart(2, '0')
    emailWaitingTime.value = `${formattedMinutes}:${formattedSeconds}`
    time--

    if (time < 0) {
      clearInterval(emailInterval.value)
      emailWaitingTime.value = '00:00'
    }
  }, 1000)
}
const checkNickname = async () => {
  log(signUpInputs.nickname)
  if (!signUpInputs.nickname) {
    dialog.status = true
    dialog.text = '닉네임을 입력하세요.'
    return
  }
  try {
    const response = await userService.checkNickname({
      userNickname: signUpInputs.nickname
    })

    if (response.success) {
      confirmStatus.nickname = true
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
const emailVerify = async () => {
  log(confirmStatus.emailCode)
  if (!confirmStatus.emailCode) {
    dialog.status = true
    dialog.text = '인증번호를 입력하세요.'
    return
  }
  try {
    const response = await userService.verifyCode({
      userId: signUpInputs.email,
      verifyCode: confirmStatus.emailCode
    })

    if (response.success) {
      dialog.status = true
      dialog.text = response.data.msg
      confirmStatus.email = true
      clearInterval(emailInterval.value)
      emailWaiting.value = false
    } else {
      dialog.status = true
      dialog.text = response.data.msg
    }
    log(response)
  } catch (error) {
    errorLog(error)
  } finally {
    confirmStatus.emailCode = ''
  }
}
const emailCheck = async () => {
  log(signUpInputs.email)
  if (!signUpInputs.email.trim()) {
    dialog.status = true
    dialog.text = '이메일을 입력하세요.'
    return
  }
  if (emailInterval.value) {
    clearInterval(emailInterval.value)
    emailWaitingTime.value = ''
  }

  try {
    const response = await userService.checkId({ userId: signUpInputs.email })
    log(response)

    if (response.success) {
      emailWaiting.value = true
      dialog.status = true
      dialog.text = response.data.msg
      startWaiting()
    } else {
      dialog.status = true
      dialog.text = response.data.msg
      return
    }
  } catch (error) {
    errorLog(error)
  }
}
const goSignIn = () => {
  router.push({ path: '/signIn' })
}

onMounted(() => {
  userId.value.focus()
})
onBeforeUnmount(() => {
  clearInterval(emailInterval.value)
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
  .email-waiting {
    width: 36.625rem;
    height: 2rem;
    display: flex;
    margin: 0 auto 1.75rem auto;
    justify-content: flex-end;
    align-items: center;
    .waiting-box {
      display: flex;
      input,
      button {
        all: unset;
      }
      input {
        border: 1px solid black;
        margin-left: 1rem;
        max-width: 5rem;
        margin-right: 0.75rem;
        border-radius: 3px;
        padding-left: 3rem;
      }
      input::placeholder {
        text-align: right;
        margin-right: 1.5rem;
      }

      button {
        background: #4686f7;
        border-radius: 5px;
        padding: 0 0.5rem;
        color: white;
      }
      button:hover {
        background: blue;
        cursor: pointer;
      }
    }
  }
  .input-box {
    width: 36.625rem;
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
    .check-img {
      margin: auto 2rem auto 0;
      width: 3rem;
      height: 3rem;
    }
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
  .link-area {
    color: #808080;
    display: flex;
    margin: 1.5rem 7.75rem;
    justify-content: center;
    div {
      cursor: pointer;
      margin-right: 1rem;
    }
  }
}
</style>
