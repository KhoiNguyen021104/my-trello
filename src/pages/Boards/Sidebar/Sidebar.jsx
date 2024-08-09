import Box from '@mui/material/Box'

function Sidebar() {
  return (
    <Box
      sx={{
        backgroundColor: 'red',
        width: 260,
        minWidth: 260,
        overflowX: 'hidden',
        height: (theme) => `calc(100vh - ${theme.app.APP_BAR_HEIGHT})`
      }}>
    </Box>
  )
}

export default Sidebar
