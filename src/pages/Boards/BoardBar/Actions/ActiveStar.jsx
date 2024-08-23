import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarIcon from '@mui/icons-material/Star'
import { Box } from '@mui/material'
import { useState } from 'react'

function ActiveStar() {
  const [active, setActive] = useState(false)
  const handleActiveStar = () => {
    setActive(!active)
  }
  // Call API update field_star board_collection
  return (
    <Box>
      <Tooltip title='Star' arrow>
        <IconButton aria-label='Star' onClick={handleActiveStar}>
          {
            active ?
              <StarIcon fontSize='small' sx={{ color:'white' }}/> :
              <StarBorderOutlinedIcon fontSize='small' sx={{ color:'white' }}/>
          }
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ActiveStar
