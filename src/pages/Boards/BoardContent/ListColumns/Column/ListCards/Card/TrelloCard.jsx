import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'

function TrelloCard({ noMediaCard }) {
  return (
    <Card
      sx={{
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        overflow: 'unset',
        mt: '4px',
        width: theme => theme.app.WIDTH_CARD,
        maxWidth: (theme) => theme.app.WIDTH_CARD,
        minWidth: (theme) => theme.app.WIDTH_CARD,
        '&:hover': {
          outline: (theme) =>
            theme.palette.mode === 'light'
              ? '#388bff auto 2px'
              : '#fff auto 0.5px'
        }
      }}>
      {!noMediaCard && <CardMedia
        sx={{
          height: 159,
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit'
        }}
        image='https://trello.com/1/cards/66b493c9b1e1bf01d0242235/attachments/66b493c9b1e1bf01d02423e8/previews/66b493c9b1e1bf01d02423e7/download/ScratchPaper.jpg'
        title='green iguana'
      />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>KhoiNguyenDev</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
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
          10
        </Button>
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
          15
        </Button>
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
          20
        </Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard
