import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { SvgIcon, Tooltip } from '@mui/material'
import FlashOnIcon from '@mui/icons-material/FlashOn'

import { ReactComponent as BoardIcon } from '~/assets/board.svg'
import { ReactComponent as RocketIcon } from '~/assets/rocket.svg'
import ChangeVisibility from './Actions/ChangeVisibility'
import ActiveStar from './Actions/ActiveStar'
import CustomizeView from './Actions/CustomizeView'
import Calendar from './Actions/Calendar'
import Filter from './Actions/Filter'
import ShareBoard from './Actions/ShareBoard'
import MoreMenu from './Actions/MoreMenu'
import Members from './Actions/Members'

function BoardBar({ board }) {
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
        overflowY: 'hidden',
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
          sx={{ fontSize: '1.125rem', fontWeight: 'bold', color:'white' }}>
          {board?.title}
        </Button>
        <ActiveStar board={board}/>
        <ChangeVisibility board={ board } />
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
          <Members board={board}/>
          <ShareBoard board={board}/>
          <MoreMenu/>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardBar
