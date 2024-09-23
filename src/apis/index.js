// Apis
import axios from 'axios'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Board

export const createBoardAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/boards`, data)
  return response.data
}

export const fetchBoardListAPI = async (userId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/getBoardList/${userId}`)
  return response.data
}

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

export const deleteBoardAPI = async (boardId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

// Board


// Columns

export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  // response => object => kết quả trong data của response
  return response.data
}

// Columns


// Cards

export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

// Cards


// Send mail invite join board

export const sendMailAPI = async (sendMailData) => {
  const response = await axios.post(`${API_ROOT}/v1/sendMail`, sendMailData)
  return response.data
}

// Send mail invite join board


// Register

export const createNewUserAPI = async (createData) => {
  const response = await axios.post(`${API_ROOT}/v1/register`, createData)
  return response.data
}

// Verify OTP
export const verifyOtpAPI = async (verifyData) => {
  const response = await axios.post(`${API_ROOT}/v1/verify-otp`, verifyData)
  return response.data
}

// FinalizeStepRegister
export const finalizeStepRegisterAPI = async (updateData) => {
  const response = await axios.post(`${API_ROOT}/v1/finalizeStepRegister`, updateData)
  return response.data
}

// Register

// Login

export const handleLoginAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
  return response.data
}

// Login

// Logout

export const handleLogoutAPI = async () => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
  return response.data
}

// Logout

// Refresh token

export const handleRefreshTokenAPI = async (refreshToken) => {
  return await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`, { refreshToken })
}

// Refresh token


// Users

export const findOneUserByEmail = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/getUser`, data)
  return response.data
}

export const findOneUserByIdAPI = async (_id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/getUser/${_id}`)
  return response.data
}

// Users


// Invitations

export const createNewInvitationAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/invitations`, data)
  return response.data
}

export const fetchInvitationsListAPI = async (toUserId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations/${toUserId}`)
  return response.data
}

export const replyInvitation = async (_id, data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/${_id}`, data)
  return response.data
}

// Invitations