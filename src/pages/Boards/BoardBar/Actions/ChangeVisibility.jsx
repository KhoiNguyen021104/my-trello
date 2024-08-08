import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'

function ChangeVisibility() {
  return (
    <Tooltip title='Change visibility' arrow>
      <IconButton aria-label='Change visibility'>
        <PeopleOutlinedIcon sx={{ color:'primary.main' }}/>
      </IconButton>
    </Tooltip>
  )
}

export default ChangeVisibility
