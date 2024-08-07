import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'

function Notification() {
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {(popupState) => (
        <div style={{ borderRadius: '50%', width:'33.94px', height:'33.94px' }}>
          <Button {...bindTrigger(popupState)} sx={{ borderRadius: '50%', width:'33.94px !important', height:'33.94px !important' }}>
            <Tooltip arrow title='Notification'>
              <Badge
                color='secondary'
                variant='dot'
                invisible={true}
                size='medium'
                sx={{ cursor: 'pointer', transform: 'rotate(45deg)' }}>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </Tooltip>
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default Notification
