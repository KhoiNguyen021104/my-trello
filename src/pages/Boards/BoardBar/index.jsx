import { Box } from '@mui/material'

function BoardBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.app.boardBarHeight,
        display: 'flex'
      }}>
      Board bar
    </Box>
  )
}

export default BoardBar
