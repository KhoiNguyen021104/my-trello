import { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'

function MoreMenu() {
  const [state, setState] = useState(false)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <Box sx={{ width: '100%', p: 2 }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '20px', textAlign: 'center' }}> Menu </Typography>
      </Box>
      <Divider/>
      <List>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <Box>
              <Typography>About this board</Typography>
              <Typography variant='caption'>Add a description to your board</Typography>
            </Box>
          </ListItemButton>
        </ListItem>
        {['About this board', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <Box>
      <IconButton onClick={toggleDrawer('right', true)}>
        <MoreHorizIcon sx={{ color: 'white' }} />
      </IconButton>
      <Drawer
        sx={{
          '.MuiDrawer-paper': {
            width: '339px',
            height: (theme) => theme.app.RIGHT_SIDEBAR_HEIGHT,
            top:'unset',
            bottom: 0
          }
        }}
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false)}>
        {list('right')}
      </Drawer>
    </Box>
  )
}

export default MoreMenu
