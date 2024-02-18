import axios from 'axios'
import { useLoadingStore } from '@/stores/loading.store.js'

const loadingStore = useLoadingStore()
const baseURL = 'http://localhost:8081/login'
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
    const response = await axiosInstance.post('/basic', params)
    return response.data
  } catch (error) {
    throw error
  }
}
export { signIn }
