import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarIcon from '@mui/icons-material/Star'
import { Box } from '@mui/material'
import { useState } from 'react'
import { updateBoardDetailsAPI } from '~/apis'
import { toast } from 'react-toastify'

function ActiveStar({ board }) {
  const [active, setActive] = useState(board.starred)
  const handleActiveStar = async () => {
    const userId = JSON.parse(localStorage.getItem('userInfo'))._id
    if (userId !== board.userId) {
      toast.info('You do not have the authority!')
      return
    }
    setActive(!active)
    await updateBoardDetailsAPI(board._id, {
      starred: !active
    })
  }
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
