import Tooltip from '@mui/material/Tooltip'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste
} from '@mui/icons-material'
import { capitalizeFirstLetter } from '~/utils/formatters'
function ChangeVisibility({ visibility }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title={!open && 'Change visibility'} arrow>
        <Button
          variant='text'
          id='basic-button-visibility'
          aria-controls={open ? 'basic-menu-visibility' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          startIcon={visibility==='public'?<PublicOutlinedIcon/>:<LockOutlinedIcon />}>
          {capitalizeFirstLetter(visibility)}
        </Button>
        <Menu
          id='basic-menu-visibility'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button-visibility'
          }}>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize='small' />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant='body2' color='text.secondary'>
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize='small' />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant='body2' color='text.secondary'>
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize='small' />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant='body2' color='text.secondary'>
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize='small' />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </Menu>
      </Tooltip>
    </Box>
  )
}

export default ChangeVisibility
