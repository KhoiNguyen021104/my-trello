// Board details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Box } from '@mui/material'
// import Sidebar from './Sidebar/Sidebar'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    // HardCode boardId = 66bf091ff8d0383207d508b7
    const boardId = '66bf091ff8d0383207d508b7'
    // Call Api
    fetchBoardDetailsAPI(boardId)
      .then((response) => {
        setBoard(response)
      })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', maxHeight: '100vh', overflowY:'hidden !important' }}>
      <AppBar />
      <Box sx={{ display:'flex', height: (theme) => `calc(100vh - ${theme.app.APP_BAR_HEIGHT})`, overflow:'hidden' }}>
        {/* <Sidebar /> */}
        <Box sx={{ flex: 1, overflowX:'auto', overflowY:'hidden' }}>
          <BoardBar board={ board } />
          <BoardContent board={ board }/>
        </Box>
      </Box>
    </Container>
  )
}

export default Board
