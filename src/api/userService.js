import axios from 'axios'

const baseURL = 'http://localhost:8081/userCrud'
const axiosInstance = axios.create({
  baseURL
})

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
export { checkId, verifyCode, checkNickname, signupBasic }
