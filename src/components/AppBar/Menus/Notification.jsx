import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import Badge from '@mui/material/Badge'
import { SocketContext } from '~/components/Socket/SocketWrapper'
import { Box, IconButton } from '@mui/material'
import { cloneDeep, isEmpty } from 'lodash'
import { fetchInvitationsListAPI, replyInvitation } from '~/apis'
import MyButton from '../Button/MyButton'
import { toast } from 'react-toastify'
import socket from '~/components/Socket/socket'

function Notification() {
  const contextValue = useContext(SocketContext).dataNotification
  const [dataNotify, setDataNotify] = useState([])
  const [dataNotification, setDataNotification] = useState([])
  const [invitationsNoReply, setInvitationsNoReply] = useState([])

  const toUserId = JSON.parse(localStorage.getItem('userInfo'))._id

  // useEffect(() => {
  //   console.log('🚀 ~ Notification ~ dataNotification:', dataNotification)
  // }, [dataNotification])

  // useEffect(() => {
  //   console.log('🚀 ~ Notification ~ dataNotify:', dataNotify)
  // }, [dataNotify])

  useEffect(() => {
    setDataNotify(contextValue)
  }, [contextValue])

  const updateInvitationsNoReply = useCallback(() => {
    const dataInvitationsNoReply = dataNotification.filter(notify => !notify.isReply)
    setInvitationsNoReply(dataInvitationsNoReply)
  }, [dataNotification])

  useEffect(() => {
    if (Array.isArray(dataNotify) && !isEmpty(dataNotify)) {
      // console.log('🚀 ~ useEffect ~ dataNotify:', dataNotify)
      setDataNotification(prevData => {
        // console.log('🚀 ~ useEffect ~ prevData:', prevData)
        // const newDataNotify = dataNotify?.filter(dn => !prevData?.some(pd => pd?.boardId === dn?._id))
        const newDataNotify = dataNotify[dataNotify.length - 1]
        // console.log('🚀 ~ useEffect ~ newDataNotify:', newDataNotify)
        newDataNotify.isReply = false
        return [newDataNotify, ...prevData]
      })
    }
  }, [dataNotify])

  useEffect(() => {
    const fetchInvitations = async () => {
      if (toUserId) {
        const response = await fetchInvitationsListAPI(toUserId)
        // console.log('🚀 ~ fetchInvitations ~ response:', response)
        setDataNotification(response)
      }
    }
    fetchInvitations()
  }, [toUserId])

  useEffect(() => {
    updateInvitationsNoReply()
  }, [dataNotification, updateInvitationsNoReply])


  const handleReplyInvitation = async (notifyId, replied) => {
    const newDataNotification = cloneDeep(dataNotification)
    // console.log('🚀 ~ newDataNotification.forEach ~ newDataNotification:', newDataNotification)
    newDataNotification.forEach((notify) => {
      if (notify._id === notifyId) {
        notify.isReply = true
      }
    })
    // console.log('🚀 ~ handleReplyInvitation ~ notifyId:', notifyId)
    const resUpdated = await replyInvitation(notifyId, { replied })
    setDataNotification(newDataNotification)
    const dataSocketReplyInvite = {
      fromUserId: resUpdated.toUserId,
      toUserId: resUpdated.fromUserId,
      boardId: resUpdated.boardId,
      replied
    }
    // console.log('🚀 ~ handleReplyInvitation ~ dataSocketReplyInvite:', dataSocketReplyInvite)
    socket.emit('replyInvite', dataSocketReplyInvite)
    if (resUpdated.replied) {
      toast.success('Join board successfully', { position: 'top-center' })
      const encodeBoardId = encodeURIComponent(btoa(JSON.stringify(resUpdated.boardId)))
      location.href = `/board/${encodeBoardId}`
    } else {
      toast.info('You just rejected their invitation', { position: 'top-center' })
    }
  }
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {(popupState) => (
        <Box>
          <IconButton
            {...bindTrigger(popupState)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              p: 0.75,
              m: 0
            }}>
            <Badge
              badgeContent={invitationsNoReply.length}
              color='secondary'
              invisible={isEmpty(dataNotification) ? true : false}
              size='medium'
              sx={{
                cursor: 'pointer',
                '@keyframes notify': {
                  '0%': { transform: 'rotate(0deg)' },
                  '10%': { transform: 'rotate(30deg)' },
                  '20%': { transform: 'rotate(-28deg)' },
                  '30%': { transform: 'rotate(34deg)' },
                  '40%': { transform: 'rotate(-32deg)' },
                  '50%': { transform: 'rotate(30deg)' },
                  '60%': { transform: 'rotate(-28deg)' },
                  '70%': { transform: 'rotate(28deg)' },
                  '80%': { transform: 'rotate(-26deg)' },
                  '90%': { transform: 'rotate(26deg)' },
                  '100%': { transform: 'rotate(0deg)' }
                }
              }}>
              <NotificationsNoneOutlinedIcon
                sx={{
                  color: 'white',
                  animation: isEmpty(invitationsNoReply)
                    ? 'none'
                    : 'notify 1.5s ease-in-out'
                }}
              />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <Typography sx={{ p: 2, pb: 0 }} variant='h6'>
              Your Invitations
            </Typography>
            <Box
              sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center'
              }}>
              {dataNotification?.map((notify) => (
                <Box
                  key={notify._id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%'
                  }}>
                  <Typography variant='body2'>
                    {notify.isReply && ' (Replied) '}
                    {notify.fromUserId} invited you to their board
                  </Typography>
                  {notify.isReply === false && (
                    <Box
                      sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                      <MyButton
                        text='Accept'
                        type='contained'
                        bgcolor='#0c66e4'
                        bgcolorHover='#0055cc'
                        onClick={() => handleReplyInvitation(notify._id, true)}
                      />
                      <MyButton
                        text='Reject'
                        type='contained'
                        bgcolor='#ca3521'
                        bgcolorHover='#ae2a19'
                        onClick={() => handleReplyInvitation(notify._id, false)}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Popover>
        </Box>
      )}
    </PopupState>
  )
}

export default Notification
