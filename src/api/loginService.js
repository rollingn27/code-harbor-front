import axios from 'axios'
import { useLoadingStore } from '@/stores/loading.store.js'
import { removeLocalStorage } from '@/utils/code-harbor-util.js'

const loadingStore = useLoadingStore()
const baseURL = 'http://localhost:8081/auth'
const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    loadingStore.changeLoadingStatus(true)
    return config
  },
  (error) => {
    loadingStore.changeLoadingStatus(false)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    loadingStore.changeLoadingStatus(false)
    return response
  },
  (error) => {
    loadingStore.changeLoadingStatus(false)
    return Promise.reject(error)
  }
)

const signIn = async (params) => {
  try {
    const response = await axiosInstance.post('/basicLogIn', params)
    return response.data
  } catch (error) {
    throw error
  }
}

const latestUserInfo = async (params) => {
  try {
    const response = await axiosInstance.post('/latestUserInfo', params)
    return response.data
  } catch (error) {
    throw error
  }
}

const signOut = () => {
  try {
    removeLocalStorage('code-harbor-auth')
  } catch (error) {
    throw error
  }
}
export { signIn, signOut, latestUserInfo }
