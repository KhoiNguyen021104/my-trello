import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import { Box } from '@mui/material'

function ChangeVisibility() {
  return (
    <Box>
      <Tooltip title='Change visibility' arrow>
        <IconButton aria-label='Change visibility'>
          <PeopleOutlinedIcon sx={{ color:'white' }}/>
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ChangeVisibility
