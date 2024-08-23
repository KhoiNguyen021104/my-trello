import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { useState } from 'react'
import Box from '@mui/material/Box'
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'

function ChangeVisibility({ visibility }) {
  const [uiVisibility, setUiVisibility] = useState(visibility)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChangeVisibility = (visibility) => {
    setUiVisibility(visibility)
  }
  return (
    <Box>
      <IconButton aria-label='Star'
        aria-controls={open ? 'basic-menu-star-dropdown' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {
          uiVisibility === 'public' ?
            <PublicOutlinedIcon fontSize='small' sx={{ color:'white' }}/> :
            (
              uiVisibility === 'workspace' ?
                <PeopleOutlinedIcon fontSize='small' sx={{ color:'white' }}/> :
                <LockOutlinedIcon fontSize='small' sx={{ color:'white' }}/>
            )
        }
      </IconButton>
      <Menu
        id='basic-menu-column-dropdown'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-column-dropdown'
        }}
        sx={{
          '& .MuiPaper-root': {
            width: 384,
            maxWidth: 'none',
            top: '100px !important',
            boxShadow:' 0px 8px 12px #091e4226, 0px 0px 1px #091e424f'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            position: 'relative'
          }}
        >
          <Typography variant='body2'
            sx={{
              width: '100%',
              padding: '0 32px',
              fontWeight: 600,
              color: '#44546f',
              letterSpacing: '1px',
              lineHeight: '40px',
              flex: 1,
              textAlign: 'center'
            }}
            onClick={(event) => {event.stopPropagation()}}
          >
            Change visibility
          </Typography>
          <IconButton size='small' sx={{
            padding: '10px',
            position: 'absolute',
            right: 0
          }}>
            <CloseIcon fontSize='small'/>
          </IconButton>
        </Box>
        <MenuItem
          onClick={() => {handleChangeVisibility('private')}}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems:'center' }}>
            <ListItemIcon>
              <LockOutlinedIcon sx={{ height: 16, width: 16, color:'red' }} />
            </ListItemIcon>
            <ListItemText sx={{
              '.MuiTypography-root': {
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }
            }}>
              Private
              {uiVisibility=='private' && <DoneIcon sx={{ height: 16, width: 16 }}/> }
            </ListItemText>
          </Box>
          <Typography variant='caption' color='text.secondary' sx={{ textWrap: 'wrap', color: '#44546f', fontWeight: 400, lineHeight: '16px' }}>
            Only board members can see this board. Workspace admins can close the board or remove members.
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {handleChangeVisibility('workspace')}}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems:'center' }}>
            <ListItemIcon>
              <PeopleOutlinedIcon sx={{ height: 16, width: 16 }} />
            </ListItemIcon>
            <ListItemText sx={{
              '.MuiTypography-root': {
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }
            }}>
              Workspace
              {uiVisibility=='workspace' && <DoneIcon sx={{ height: 16, width: 16 }}/> }
            </ListItemText>
          </Box>
          <Typography variant='caption' color='text.secondary' sx={{ textWrap: 'wrap', color: '#44546f', fontWeight: 400, lineHeight: '16px' }}>
            All members of the workspace can see and edit this board.
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {handleChangeVisibility('public')}}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems:'center' }}>
            <ListItemIcon>
              <PublicOutlinedIcon sx={{ height: 16, width: 16, color:'#22A06B' }} />
            </ListItemIcon>
            <ListItemText sx={{
              '.MuiTypography-root': {
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }
            }}>
              Public
              {uiVisibility=='public' && <DoneIcon sx={{ height: 16, width: 16 }}/> }
            </ListItemText>
          </Box>
          <Typography variant='caption' color='text.secondary' sx={{ textWrap: 'wrap', color: '#44546f', fontWeight: 400, lineHeight: '16px' }}>
              Anyone on the internet can see this board. Only board members can edit.
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ChangeVisibility
