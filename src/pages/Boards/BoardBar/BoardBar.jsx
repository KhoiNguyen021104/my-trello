import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ReactComponent as BoardIcon } from '~/assets/board.svg'
import { ReactComponent as RocketIcon } from '~/assets/rocket.svg'
import { SvgIcon, Tooltip } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ChangeVisibility from './Actions/ChangeVisibility'
import ActiveStar from './Actions/ActiveStar'
import CustomizeView from './Actions/CustomizeView'
import Calendar from './Actions/Calendar'
import Filter from './Actions/Filter'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import ShareBoard from './Actions/ShareBoard'
import MoreMenu from './Actions/MoreMenu'

function BoardBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.app.BOARD_BAR_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        bgcolor: 'primary.800',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Button
          variant='text'
          size='small'
          sx={{ fontSize: '1.2rem', fontWeight: 'bold', color:'white' }}>
          MyTrello
        </Button>
        <ActiveStar />
        <ChangeVisibility />
        <Tooltip title='Board' arrow>
          <Button
            variant='contained'
            startIcon={
              <SvgIcon
                component={BoardIcon}
                inheritViewBox
                sx={{ width: '16px', height: '16px', color:'#172B4D' }}
              />
            }
            sx={{
              bgcolor:'white',
              color:'#172B4D',
              alignItems:'baseline',
              '&:hover': { bgcolor:'#bdc3c7' }
            }}>
            Board
          </Button>
        </Tooltip>
        <CustomizeView />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Calendar />
        <SvgIcon
          component={RocketIcon}
          inheritViewBox
          sx={{ color: 'white', width: '20px', height: '20px', cursor: 'pointer' }}
        />
        <FlashOnIcon
          sx={{ color: 'white', width: '16px', height: '16px', cursor: 'pointer' }}
        />
        <Filter />
        <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
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
            }}
          >
            <Tooltip title='KhoiNguyenDev' arrow>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ padding: '0', margin: '0', verticalAlign: 'top' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}>
                <Avatar
                  src='https://secure.gravatar.com/avatar/b4291bc903004b496b9050f736850091?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKV-1.png'
                  alt='KhoiNguyenDev'>
                </Avatar>
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
            <Tooltip title='KhoiNguyenDev' arrow>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ padding: '0', margin: '0', verticalAlign: 'top' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}>
                <Avatar
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-u4DPECN8An8_4jTgXYe-wnP2YEG87HycfA&s'
                  alt='KhoiNguyenDev'>
                </Avatar>
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
            <Tooltip title='KhoiNguyenDev' arrow>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ padding: '0', margin: '0', verticalAlign: 'top' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}>
                <Avatar
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-u4DPECN8An8_4jTgXYe-wnP2YEG87HycfA&s'
                  alt='KhoiNguyenDev'>
                </Avatar>
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
            <Tooltip title='KhoiNguyenDev' arrow>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ padding: '0', margin: '0', verticalAlign: 'top' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}>
                <Avatar
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-u4DPECN8An8_4jTgXYe-wnP2YEG87HycfA&s'
                  alt='KhoiNguyenDev'>
                </Avatar>
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
            <Tooltip title='KhoiNguyenDev' arrow>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ padding: '0', margin: '0', verticalAlign: 'top' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}>
                <Avatar
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-u4DPECN8An8_4jTgXYe-wnP2YEG87HycfA&s'
                  alt='KhoiNguyenDev'>
                </Avatar>
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
          </AvatarGroup>
          <ShareBoard/>
          <MoreMenu/>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardBar
