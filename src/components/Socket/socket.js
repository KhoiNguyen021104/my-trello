import io from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'

const socket = io(`${API_ROOT}`, {
  transports: ['websocket'],
  reconnection: true
})

export default socket
