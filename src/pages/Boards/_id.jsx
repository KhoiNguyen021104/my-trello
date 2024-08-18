// Board details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Box } from '@mui/material'
// import Sidebar from './Sidebar/Sidebar'
import { mockData } from '~/apis/mock-data'
import { createContext, useEffect, useState } from 'react'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis'
import { createPlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

export const BoardIdContext = createContext()
function Board() {
  const [board, setBoard] = useState(null)
  const boardId = '66bf091ff8d0383207d508b7'
  useEffect(() => {
    // HardCode boardId = 66bf091ff8d0383207d508b7
    // Call Api
    fetchBoardDetailsAPI(boardId)
      .then((response) => {
        // Tạo playholderCard cho column rỗng
        response.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [createPlaceholderCard(column)]
            column.cardOrderIds = [createPlaceholderCard(column)._id]
          }
        })
        setBoard(response)
      })
  }, [])
  const createNewColumn = async (newColumnData) => {
    const newColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    newColumn.cards = [createPlaceholderCard(newColumn)]
    newColumn.cardOrderIds = [createPlaceholderCard(newColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push(newColumn)
    newBoard.columnOrderIds.push(newColumn._id)
    // Tạo playholderCard cho column rỗng
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const newCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === newCardData.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(newCard)
      columnToUpdate.cardOrderIds.push(newCard._id)
    }
    setBoard(newBoard)
  }
  const moveColumn = async (dndOrderedColumns) => {
    const newColumnOrderIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = {
      ...board,
      columns: dndOrderedColumns,
      columnOrderIds: newColumnOrderIds
    }
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
    setBoard(newBoard)
  }

  return (
    <BoardIdContext.Provider value={{ createNewColumn, createNewCard, moveColumn }}>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', maxHeight: '100vh', overflowY:'hidden !important' }}>
        <AppBar />
        <Box sx={{ display:'flex', height: (theme) => `calc(100vh - ${theme.app.APP_BAR_HEIGHT})`, overflow:'hidden' }}>
          {/* <Sidebar /> */}
          <Box sx={{ flex: 1, overflowX:'auto', overflowY:'hidden' }}>
            <BoardBar board={ board } />
            <BoardContent
              board={ board }
              createNewColumn = {createNewColumn}
            />
            {/* <BoardBar board={ mockData.board } />
            <BoardContent board={ mockData.board }/> */}
          </Box>
        </Box>
      </Container>
    </BoardIdContext.Provider>
  )
}

export default Board
