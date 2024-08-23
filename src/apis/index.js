// Apis
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Board

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // response => object => kết quả trong data của response
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  // response => object => kết quả trong data của response
  return response.data
}

export const moveCardDifferentColumnAPI = async (updateData) => {
  // console.log('updateData: ', updateData);
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
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