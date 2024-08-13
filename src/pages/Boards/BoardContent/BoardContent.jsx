import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core'
import { createContext, useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/TrelloCard'
import { cloneDeep } from 'lodash'

export const CardContext = createContext()

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  const sensors = useSensors(
    // pointerSensor,
    mouseSensor,
    touchSensor
  )

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [activeType, setActiveType] = useState(null)
  const [activeData, setActiveData] = useState(null)
  const [originalDraggingCardColumn, setOriginalDraggingCardColumn] = useState(null)

  useEffect(() => {
    setOrderedColumns(
      mapOrder(board?.columns, board?.columnOrderIds, '_id')
    )
  }, [board])

  const findColumn = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card?._id)?.includes(cardId)
    )
  }

  const moveCardBetweenTwoColumn = (
    overCardId,
    over,
    active,
    overColumn,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumn => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (c) => c._id === overCardId
      )
      // console.log('overCardIndex: ', overCardIndex)
      let newCardIndex
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1
      // console.log('NewCardIndex: ', newCardIndex)

      // clone orderedColumnState
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      // console.log(nextActiveColumn)
      // console.log(nextOverColumn)
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // console.log('nextColumns: ', nextColumns);

      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    // console.log('Start: ', event)
    setActiveId(event?.active?.id)
    setActiveType(event?.active?.data?.current?.columnId ? 'card' : 'column')
    setActiveData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOriginalDraggingCardColumn(findColumn(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeType === 'column') return
    const { active, over } = event
    if (!active || !over) return
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumn(activeDraggingCardId)
    const overColumn = findColumn(overCardId)
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenTwoColumn(overCardId, over, active, overColumn, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    if (activeType === 'card') {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumn(activeDraggingCardId)
      const overColumn = findColumn(overCardId)
      if (!activeColumn || !overColumn) return
      if (originalDraggingCardColumn._id !== overColumn._id) {
        moveCardBetweenTwoColumn(overCardId, over, active, overColumn, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        const activeCardIndex = originalDraggingCardColumn?.cards?.findIndex(c => c._id === activeId)
        const overCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(
          originalDraggingCardColumn?.cards,
          activeCardIndex,
          overCardIndex
        )
        setOrderedColumns(prevColumn => {
          const nextColumns = cloneDeep(prevColumn)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }
    if (activeType === 'column') {
      if (active?.id !== over?.id) {
        const activeColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        )
        const overColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          activeColumnIndex,
          overColumnIndex
        )
        setOrderedColumns(dndOrderedColumns)
      }
    }
    setActiveId(null)
    setActiveType(null)
    setActiveData(null)
    setOriginalDraggingCardColumn(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <Box
        sx={{
          bgcolor: 'primary.300',
          width: '100%',
          height: (theme) => theme.app.BOARD_CONTENT_HEIGHT,
          cursor: 'pointer',
          p: '10px 0'
        }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeId && null}
          {activeType == 'column' ? (
            <Column column={activeData} />
          ) : (
            <TrelloCard
              card={activeData}
              noMediaCard={activeData?.cover ? false : true}
            />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
