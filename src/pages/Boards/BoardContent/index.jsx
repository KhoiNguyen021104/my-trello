import { Box } from '@mui/material'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.app.contentHeight,
        display: 'flex'
      }}>
      Content
    </Box>
  )
}

export default BoardContent
