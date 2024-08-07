// App bar

import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Create from './Menus/Create'
import Profile from './Menus/Profile'
// import Notification from './Menus/Notification'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Tooltip from '@mui/material/Tooltip'

function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.app.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap:2,
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <AppsOutlinedIcon sx={{ color: 'primary.main' }} />
          <Box sx={{
            display: 'flex',
            gap: 0.5,
            alignItems: 'center'
          }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main', width:'20px', height:'20px' }}/>
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight:'bold', color: 'primary.main' }}>Trello</Typography>
          </Box>
          <Box sx={{ display:{xs:'none', md:'flex' }, gap: 1 }}>
            <Workspaces/>
            <Recent />
            <Starred/>
            <Templates/>
            <Create/>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap: 1 }}>
        <Tooltip arrow title="Search">
          <TextField fullWidth id="outlined-search" label="Search..." type="search" size='small' sx={{ color:'primary.main', minWidth: 120 }} />
        </Tooltip>
        <ModeSelect sx={{ cursor: 'pointer' }}/>
        <Tooltip arrow title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneOutlinedIcon sx={{ color:'primary.main' }}/>
          </Badge>
        </Tooltip>
        {/* <Notification/> */}
        <Tooltip arrow title="Help">
          <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color:'primary.main' }}/>
        </Tooltip>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar
