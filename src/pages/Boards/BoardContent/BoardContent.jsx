import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.300',
        width: '100%',
        height: (theme) => theme.app.BOARD_CONTENT_HEIGHT,
        cursor: 'pointer',
        p: '10px 0'
      }}>
      <ListColumns/>
    </Box>
  )
}

export default BoardContent
