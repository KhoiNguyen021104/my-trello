import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'

function ActiveStar() {
  return (
    <Tooltip title='Star' arrow>
      <IconButton aria-label='Star'>
        <StarBorderOutlinedIcon sx={{ color:'primary.main' }}/>
      </IconButton>
    </Tooltip>
  )
}

export default ActiveStar
