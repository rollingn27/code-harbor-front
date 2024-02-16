<template>
  <div class="sign-in">
    <div class="sign-in-content">
      <img class="logo" src="@/assets/logoCodeHarbor.png" />
      <div class="code-harbor">Code Harbor</div>
      <div class="input-box">
        <input type="text" placeholder="Email Address" autocomplete="off" />
        <button>이메일인증</button>
      </div>
      <div class="input-box">
        <input type="text" placeholder="Nickname" autocomplete="off" />
        <button>중복확인</button>
      </div>
      <input class="input" placeholder="Password" autocomplete="off" />
      <input class="input" placeholder="Confirm Password" autocomplete="off" />
      <button class="sign-in-button">Sign Up</button>
      <div class="link-area" @click="goSignIn">
        <div>Have An Account?</div>
        <div style="font-weight: bold">Sign In</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useLogger from '@/composables/logger'
import { useRouter } from 'vue-router'
const { log, errorLog } = useLogger()
const router = useRouter()
const goSignIn = () => {
  router.push({ path: '/signIn' })
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
