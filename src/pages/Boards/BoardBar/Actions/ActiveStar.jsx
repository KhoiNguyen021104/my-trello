import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import { Box } from '@mui/material'

function ActiveStar() {
  return (
    <Box>
      <Tooltip title='Star' arrow>
        <IconButton aria-label='Star'>
          <StarBorderOutlinedIcon fontSize='small' sx={{ color:'white' }}/>
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ActiveStar
