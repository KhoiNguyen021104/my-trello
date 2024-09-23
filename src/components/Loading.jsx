import { Box, CircularProgress, Typography } from '@mui/material'

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
      }}>
      <CircularProgress color='success' />
      <Typography>Loading... </Typography>
    </Box>
  )
}

export default Loading
