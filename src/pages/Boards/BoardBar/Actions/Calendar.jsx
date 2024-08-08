import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function Calendar() {
  return (
    <Box>
      <IconButton>
        <CalendarMonthIcon
          sx={{ color: 'primary.main', width: '16px', height: '16px' }}
        />
      </IconButton>
    </Box>
  )
}

export default Calendar
