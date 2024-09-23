import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
  // PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision
  // closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/TrelloCard'
import { cloneDeep, isEmpty } from 'lodash'
import { createPlaceholderCard } from '~/utils/formatters'
import { BoardIdContext } from '../_id'

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
  const moveColumn = useContext(BoardIdContext).moveColumn
  const moveCardInSameColumn = useContext(BoardIdContext).moveCardInSameColumn
  const moveCardDifferentColumn = useContext(BoardIdContext).moveCardDifferentColumn

  const lastOverId = useRef(null)

  useEffect(() => {
    // column đã đc sort ở _id.jsx
    setOrderedColumns(board?.columns)
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
    activeDraggingCardData,
    triggerFrom = ''
  ) => {
    setOrderedColumns((prevColumn) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (c) => c._id === overCardId
      )
      let newCardIndex
      const isBelowOverItem =
        over &&
        active?.rect?.current?.translated &&
        active?.rect?.current?.translated?.top > over?.rect?.top + over?.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.card?.length + 1

      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      )
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      )
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        // Nếu kéo card cuối cùng => thêm placeholderCard vào nextActiveColumn
        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [createPlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        delete rebuild_activeDraggingCardData.sortable
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        )

        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }
      if (triggerFrom === 'handleDragEnd') {
        moveCardDifferentColumn(
          activeDraggingCardId,
          originalDraggingCardColumn._id,
          nextOverColumn._id,
          nextColumns
        )
      }
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
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
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over
    const activeColumn = findColumn(activeDraggingCardId)
    const overColumn = findColumn(overCardId)
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenTwoColumn(
        overCardId,
        over,
        active,
        overColumn,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    if (activeType === 'card') {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over
      const activeColumn = findColumn(activeDraggingCardId)
      const overColumn = findColumn(overCardId)
      if (!activeColumn || !overColumn) return
      if (originalDraggingCardColumn._id !== overColumn._id) {
        moveCardBetweenTwoColumn(
          overCardId,
          over,
          active,
          overColumn,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        // cùng 1 column
        const activeCardIndex = originalDraggingCardColumn?.cards?.findIndex(
          (c) => c._id === activeId
        )
        // console.log('activeCardIndex: ', activeCardIndex);
        const overCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        )
        // console.log('overCardIndex: ', overCardIndex);

        const dndOrderedCards = arrayMove(
          originalDraggingCardColumn?.cards,
          activeCardIndex,
          overCardIndex
        )
        // console.log('dndOrderedCards: ', dndOrderedCards);
        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id)
        setOrderedColumns((prevColumn) => {
          const nextColumns = cloneDeep(prevColumn)
          const targetColumn = nextColumns.find(
            (c) => c._id === overColumn._id
          )
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds
          return nextColumns
        })
        moveCardInSameColumn(dndOrderedCards, dndOrderedCardIds, originalDraggingCardColumn._id)
      }
    }
    if (activeType === 'column') {
      if (active?.id !== over?.id) {
        const activeColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        )
        const overColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        )
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          activeColumnIndex,
          overColumnIndex
        )
        setOrderedColumns(dndOrderedColumns)
        moveColumn(dndOrderedColumns)
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
          opacity: '0.5',
          transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease'
        }
      }
    })
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      // args => object
      if (activeType === 'column') return closestCorners({ ...args })
      const pointerIntersections = pointerWithin(args)
      // console.log('pointerIntersections: ', pointerIntersections)
      if (!pointerIntersections?.length) return
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        )
        if (checkColumn) {
          // console.log('args.droppableContainers: ', args.droppableContainers);
          // console.log('checkColumn: ', checkColumn);
          // console.log(args.droppableContainers.filter(
          //   (container) =>
          //     container.id !== overId &&
          //     checkColumn?.cardOrderIds?.includes(container.id)
          // ));
          // console.log('Before: ', overId)
          // console.log('args: ', args);
          // console.log('closestCenter: ', closestCenter({
          //   ...args,
          //   droppableContainers: args.droppableContainers.filter(
          //     (container) =>
          //       container.id !== overId &&
          //       checkColumn?.cardOrderIds?.includes(container.id)
          //   )
          // }));
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id
          // console.log('After: ', overId)
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeType, orderedColumns]
  )
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      collisionDetection={collisionDetectionStrategy}
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