<template>
  <div class="sign-in">
    <div class="sign-in-content">
      <img class="logo" src="@/assets/logoCodeHarbor.png" />
      <div class="code-harbor">Code Harbor</div>
      <input
        type="type"
        class="input"
        placeholder="Email Address"
        autocomplete="off"
        v-model="loginInfo.userId"
      />
      <input
        type="password"
        class="input"
        placeholder="Password"
        autocomplete="off"
        v-model="loginInfo.userPassword"
      />
      <button class="sign-in-button" @click="signIn">Sign In</button>
      <div class="link-area">
        <div>Forgot password?</div>
        <div>Sign Up</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginService } from '@/api'
import { reactive } from 'vue'
import useLogger from '@/composables/logger'
import { useLoadingStore } from '@/stores/loading.store'
const loginInfo = reactive({
  userId: '',
  userPassword: ''
})
const loadingStore = useLoadingStore()
const { log, errorLog } = useLogger()
const signIn = async () => {
  log(loginInfo)
  loadingStore.changeLoadingStatus(true)
  loginInfo.userId = loginInfo.userId.trim()
  try {
    const userInfo = await loginService.signIn(loginInfo)
    log(userInfo)
  } catch (error) {
    errorLog('SignIn Error: ', 'error')
  } finally {
    loadingStore.changeLoadingStatus(false)
    loginInfo.email = ''
    loginInfo.password = ''
  }
}
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
