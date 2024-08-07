// Board details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { Box } from '@mui/material'
import Sidebar from './Sidebar'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', overflowY:'hidden' }}>
      <AppBar />
      <Box sx={{ display:'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          <BoardBar />
          <BoardContent />
        </Box>
      </Box>
    </Container>
  )
}

export default Board
