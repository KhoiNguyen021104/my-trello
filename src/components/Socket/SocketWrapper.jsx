import { createContext, useEffect, useState } from 'react'
import socket from './socket'

const SocketContext = createContext([])

function SocketWrapper({ children }) {
  const [dataNotification, setDataNotification] = useState([])
  const [dataReceiveReliedInvite, setDataReceiveReliedInvite] = useState([])
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Socket connected:', socket.id)
  //   })

  //   socket.on('disconnect', () => {
  //     console.log('Socket disconnected')
  //   })

  //   return () => {
  //     socket.off('connect')
  //     socket.off('disconnect')
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('🚀 ~ SocketWrapper ~ dataNotification:', dataNotification)
  // }, [dataNotification])

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo._id) {
      socket.emit('registerUser', userInfo._id)
    }
  }, [])

  useEffect(() => {
    const handleReceiveInvite = (data) => {
      setDataNotification((prevData) => {
        const exists = prevData.some(d => d.boardId === data.boardId)
        return exists ? prevData : [...prevData, data]
      })
    }
    socket.on('receiveInvite', handleReceiveInvite)

    const handleReceiveReliedInvite = (data) => {
      setDataReceiveReliedInvite(preData => [...preData, data])
    }
    socket.on('receiveReplyInvite', handleReceiveReliedInvite)

    return () => {
      socket.off('receiveInvite', handleReceiveInvite)
      socket.off('receiveReplyInvite', handleReceiveReliedInvite)
    }
  }, [])

  return (
    <SocketContext.Provider value={
      {
        dataNotification,
        dataReceiveReliedInvite
      }
    }>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketWrapper
export { SocketContext }
