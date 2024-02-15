import axios from 'axios'

const baseURL = 'http://localhost:8081/login'
const axiosInstance = axios.create({
  baseURL
})

const signIn = async (params) => {
  try {
    const response = await axiosInstance.post('/basic', params)
    return response.data
  } catch (error) {
    throw error
  }
}
export { signIn }
