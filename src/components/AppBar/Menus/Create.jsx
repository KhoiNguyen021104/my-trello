import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

function Create() {
  return (
    <Box>
      <PopupState variant='popover' popupId='demo-popup-menu'>
        {(popupState) => (
          <>
            <Button
              size='small'
              sx={{
                p: '6px 8px',
                height: 36.5,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
              }}
              {...bindTrigger(popupState)}>
              Create
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Profile</MenuItem>
              <MenuItem onClick={popupState.close}>My account</MenuItem>
              <MenuItem onClick={popupState.close}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
    </Box>
  )
}

export default Create
