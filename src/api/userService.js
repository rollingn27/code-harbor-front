import axios from 'axios'
import { useLoadingStore } from '@/stores/loading.store.js'

const loadingStore = useLoadingStore()
const baseURL = 'http://localhost:8081/userCrud'
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

const checkId = async (params) => {
  try {
    const response = await axiosInstance.post('/checkId', params)
    return response.data
  } catch (error) {
    throw error
  }
}

const verifyCode = async (params) => {
  try {
    const response = await axiosInstance.post('/verifyCode', params)
    return response.data
  } catch (error) {
    throw error
  }
}

const checkNickname = async (params) => {
  try {
    const response = await axiosInstance.post('/checkNickname', params)
    return response.data
  } catch (error) {
    throw error
  }
}

const signupBasic = async (params) => {
  try {
    const response = await axiosInstance.post('/signupBasic', params)
    return response.data
  } catch (error) {
    throw error
  }
}

const findPassword = async (params) => {
  try {
    const response = await axiosInstance.post('/findPassword', params)
    return response.data
  } catch (error) {
    throw error
  }
}
export { checkId, verifyCode, checkNickname, signupBasic, findPassword }
