import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Box, Typography } from '@mui/material'
// import Sidebar from './Sidebar/Sidebar'
// import { mockData } from '~/apis/mock-data'
import { createContext, useEffect, useState } from 'react'
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
  moveCardDifferentColumnAPI,
  sendMailAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import { createPlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import CircularProgress from '@mui/material/CircularProgress'

export const BoardIdContext = createContext()
function Board() {
  const [board, setBoard] = useState(null)
  const boardId = '66bf091ff8d0383207d508b7'
  useEffect(() => {
    // HardCode boardId = 66bf091ff8d0383207d508b7
    fetchBoardDetailsAPI(boardId).then((response) => {
      response.columns = mapOrder(
        response.columns,
        response.columnOrderIds,
        '_id'
      ) .catch(() => {})
      // Tạo playholderCard cho column rỗng
      response.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [createPlaceholderCard(column)]
          column.cardOrderIds = [createPlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
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
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const newCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === newCardData.columnId
    )
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [newCard]
        columnToUpdate.cardOrderIds = [newCard._id]
      } else {
        columnToUpdate.cards.push(newCard)
        columnToUpdate.cardOrderIds.push(newCard._id)
      }
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
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
    setBoard(newBoard)
  }

  const moveCardInSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    activeColumnId
  ) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === activeColumnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(activeColumnId, {
      cardOrderIds: dndOrderedCardIds
    })
  }

  const moveCardDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const newColumnOrderIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = {
      ...board,
      columns: dndOrderedColumns,
      columnOrderIds: newColumnOrderIds
    }
    setBoard(newBoard)
    // Call API
    // khi kéo card cuối cùng ra khỏi col => col còn 1 card là placeholder-card
    // cần xóa đi sau đó mới update lại board
    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardDifferentColumnAPI(
      {
        currentCardId,
        prevColumnId,
        prevCardOrderIds,
        nextColumnId,
        nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
      }
    )
  }

  const sendMailInviteJoinBoard = async (sendMailData) => {
    const result = await sendMailAPI(sendMailData)
    // console.log('🚀 ~ sendMailInviteJoinBoard ~ result:', result)
    return isEmpty(result)
  }

  if (!board) {
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
        <Typography>Loading board... </Typography>
      </Box>
    )
  }

  return (
    <BoardIdContext.Provider
      value={{
        createNewColumn,
        createNewCard,
        moveColumn,
        moveCardInSameColumn,
        moveCardDifferentColumn,
        sendMailInviteJoinBoard
      }}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          height: '100vh',
          maxHeight: '100vh',
          overflowY: 'hidden !important'
        }}>
        <AppBar />
        <Box
          sx={{
            display: 'flex',
            height: (theme) => `calc(100vh - ${theme.app.APP_BAR_HEIGHT})`,
            overflow: 'hidden'
          }}>
          {/* <Sidebar /> */}
          <Box sx={{ flex: 1, overflowX: 'auto', overflowY: 'hidden' }}>
            <BoardBar board={board} />
            <BoardContent board={board} createNewColumn={createNewColumn} />
            {/* <BoardBar board={ mockData.board } />
            <BoardContent board={ mockData.board }/> */}
          </Box>
        </Box>
      </Container>
    </BoardIdContext.Provider>
  )
}

export default Board
