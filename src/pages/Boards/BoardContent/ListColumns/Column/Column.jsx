import { memo, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  SvgIcon
} from '@mui/material'
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste
} from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { ReactComponent as CreateTemplateCardIcon } from '~/assets/createTemplateCard.svg'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function Column({ column }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [columnData, setColumnData] = useState(
    {
      title: column?.title,
      editing: false
    },
    [column]
  )
  const textFieldRef = useRef(null)
  const titleRef = useRef(null)
  const handleClickInside = () => {
    setColumnData((preColumnData) => ({
      ...preColumnData,
      editing: true
    }))
  }
  const handleClickOutside = (event) => {
    if (textFieldRef.current && titleRef.current) {
      if (
        !textFieldRef.current.contains(event.target) &&
        !titleRef.current.contains(event.target)
      ) {
        setColumnData((prevColumnData) => ({
          ...prevColumnData,
          editing: false
        }))
      }
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setColumnData((prevColumnData) => ({
        ...prevColumnData,
        editing: false
      }))
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  // Drag n Drop
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: column._id,
      data: { ...column }
    })
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging?0.5:1
    // dùng với pointerSensor => ngăn chặn sự kiện click
    // touchAction: 'none'
  }
  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: (theme) => theme.app.WIDTH_COLUMN,
          maxWidth: (theme) => theme.app.WIDTH_COLUMN,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#000' : '#f1f2f4',
          ml: 2,
          mt: 1,
          borderRadius: '6px',
          height: 'fit-content',
          zIndex: 1000,
          maxHeight: (theme) =>
            `calc(${theme.app.BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)})`
        }}>
        {/* Header */}
        <Box
          sx={{
            height: (theme) => theme.app.COLUMN_HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
          <Box
            ref={titleRef}
            onClick={handleClickInside}
            sx={{ display: 'flex', flex: 1 }}>
            {columnData.editing ? (
              <TextField
                ref={textFieldRef}
                value={columnData.title}
                onChange={(e) =>
                  setColumnData((prevColumnData) => ({
                    ...prevColumnData,
                    title: e.target.value
                  }))
                }
                onKeyDown={handleKeyDown}
                size='small'
                variant='outlined'
              />
            ) : (
              <Typography variant='h6'>{columnData.title}</Typography>
            )}
          </Box>
          <Box>
            <IconButton
              id='basic-column-dropdown'
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick} >
              <MoreHorizIcon fontSize='small' />
            </IconButton>
            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘C
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant='body2' color='text.secondary'>
                  ⌘V
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Web Clipboard</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* List cards */}
        <ListCards cards={orderedCards}/>
        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.app.COLUMN_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
          <Button
            startIcon={
              <AddIcon
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? '#44546f' : '#fff'
                }}
              />
            }
            sx={{
              flex: 1,
              justifyContent: 'left',
              color: (theme) =>
                theme.palette.mode === 'light' ? '#44546f' : '#fff'
            }}>
            Add a card
          </Button>
          <IconButton>
            <SvgIcon
              component={CreateTemplateCardIcon}
              inheritViewBox
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? '#44546f' : '#fff',
                width: '20px',
                height: '20px'
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </div>
  )
}

export default memo(Column)
