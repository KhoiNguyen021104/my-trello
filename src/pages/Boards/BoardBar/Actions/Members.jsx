/* eslint-disable no-console */
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { useContext, useEffect, useMemo, useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { Tooltip } from '@mui/material'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { SocketContext } from '~/components/Socket/SocketWrapper'
import { updateBoardDetailsAPI } from '~/apis'

function Member({ board }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [participantIds, setParticipantIds] = useState([])
  const [participants, setParticipants] = useState([])
  const open = Boolean(anchorEl)
  const contextValue = useContext(SocketContext).dataReceiveReliedInvite
  const dataReceiveReliedInvite = useMemo(() => contextValue || [], [contextValue])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    setParticipantIds([...board.ownerIds, ...board.memberIds])
  }, [board.memberIds, board.ownerIds])

  useEffect(() => {
    if (dataReceiveReliedInvite.length > 0) {
      const verifiedId = (dataReceiveReliedInvite.filter(invite => invite.boardId === board._id && invite.replied)).map(i => i.fromUserId)
      setParticipantIds(prev => {
        const newParticipantIds = verifiedId.filter(vId => !(prev?.find(prevId => prevId === vId)))
        updateBoardDetailsAPI(board._id, {
          memberIds: [
            ...board.memberIds,
            ...newParticipantIds
          ]
        })
        return [...prev, ...newParticipantIds]
      })
    }
  }, [board._id, board.memberIds, dataReceiveReliedInvite])

  useEffect(() => {
    participantIds?.forEach((participantId) => {
      authorizedAxiosInstance
        .get(`${API_ROOT}/v1/users/getUser/${participantId}`)
        .then((response) =>
          setParticipants((prevParticipants) => {
            const exist = prevParticipants?.find(p => p._id === participantId)
            if (exist) return prevParticipants
            return [...prevParticipants, response.data]
          })
        )
        .catch((error) => console.error(error))
    })
  }, [participantIds])

  return (
    <AvatarGroup
      max={4}
      sx={{
        '& .MuiAvatar-root': {
          width: '28px',
          height: '28px',
          fontSize: '12px',
          border: 'none',
          marginRight: '4px',
          '&:first-of-type': {
            bgcolor: '#a4b0de'
          }
        },
        '& .MuiAvatarGroup-avatar': {
          marginRight: '4px'
        }
      }}>
      {participants?.map((participant) => {
        return (
          <Tooltip key={participant._id} title={open ? '': participant.displayName} arrow>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ padding: '0', margin: '0', verticalAlign: 'top' }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}>
              <Avatar
                src='/broken-image.jpg'
                // src='https://secure.gravatar.com/avatar/b4291bc903004b496b9050f736850091?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKV-1.png'
                alt=''></Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize='small' />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Tooltip>
        )
      })}
    </AvatarGroup>
  )
}

export default Member
