import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import { mapOrder } from '~/utils/sorts'

function TrelloCard({ card, noMediaCard }) {
  // const orderedCards = mapOrder(card?.cards, card?.cardOrderIds, '_id')
  // Drag n Drop
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
   useSortable({
     id: card._id,
     data: { ...card }
   })
  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging?0.5:1,
    border: isDragging?'1px solid #388bff':undefined
    // dùng với pointerSensor => ngăn chặn sự kiện click
    // touchAction: 'none'
  }
  return (
    <Card
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        overflow: 'unset',
        mt: '4px',
        width: (theme) => theme?.app?.WIDTH_CARD,
        maxWidth: (theme) => theme?.app?.WIDTH_CARD,
        minWidth: (theme) => theme?.app?.WIDTH_CARD,
        // '&:hover': {
        //   outline: (theme) =>
        //     theme.palette.mode === 'light'
        //       ? '#388bff auto 2px'
        //       : '#fff auto 0.5px'
        // }
        display: card?.FE_PlaceholderCard?'none':'block'
      }}>
      {!noMediaCard && (
        <CardMedia
          sx={{
            height: 159,
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit'
          }}
          image={card?.cover}
          title='green iguana'
        />
      )}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        {card?.title && <Typography variant='h6'>{card?.title}</Typography>}
        {card?.description && <Typography>{card?.description}</Typography>}
      </CardContent>
      {
        (!!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length) &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && (
            <Button
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? '#44546f' : '#fff'
              }}
              size='small'
              startIcon={
                <GroupIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? '#44546f' : '#fff'
                  }}
                />
              }>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? '#44546f' : '#fff'
              }}
              size='small'
              startIcon={
                <CommentIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? '#44546f' : '#fff'
                  }}
                />
              }>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? '#44546f' : '#fff'
              }}
              size='small'
              startIcon={
                <AttachFileIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light' ? '#44546f' : '#fff'
                  }}
                />
              }>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      }
    </Card>
  )
}

export default TrelloCard
