import axios from 'axios'
import { toast } from 'react-toastify'
import { handleLogoutAPI, handleRefreshTokenAPI } from '~/apis'
// import { handleLogoutAPI, refreshTokenAPI } from '~/apis'

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  (error) => {
    // console.log('🚀 ~ error:', error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Xử lí tự động refresh token
    // Nếu BE return mã 401
    if (error.message?.status === 401) {
      handleLogoutAPI().then(() => {
        localStorage.removeItem('userInfo')
        location.href = '/'
      })
    }

    // Nêu BE return mã 410 => refresh token
    // Đầu tiên phải lấy các request API đang bị lỗi thông qua error.config
    const originalRequest = error.config // Các request API bị lỗi
    // console.log('🚀 ~ originalRequest:', originalRequest)
    if (error.response?.status === 410 && !originalRequest._retry) {
      // Gán thêm giá trị _retry = true => để refresh token chỉ diễn ra 1 lần tại 1 thời điểm
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      // Gọi API refresh token
      return handleRefreshTokenAPI(refreshToken)
        .then(() => { // res => params
          // return lại axios instance kết hơp với originalRequest => để gọi lại các request API bị lỗi
          return authorizedAxiosInstance(originalRequest)
        })
        .catch((_err) => {
          handleLogoutAPI().then(() => {
            localStorage.removeItem('userInfo')
            location.href = '/login'
          })
          Promise.reject(_err)
        })
    }

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message)
    }
    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
