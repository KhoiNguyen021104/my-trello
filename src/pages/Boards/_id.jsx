// Board details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Box } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', maxHeight: '100vh', overflowY:'hidden !important' }}>
      <AppBar />
      <Box sx={{ display:'flex', height: (theme) => `calc(100vh - ${theme.app.APP_BAR_HEIGHT})`, overflow:'hidden' }}>
        <Sidebar />
        <Box sx={{ flex: 1, overflowX:'auto', overflowY:'hidden' }}>
          <BoardBar />
          <BoardContent />
        </Box>
      </Box>
    </Container>
  )
}

export default Board
