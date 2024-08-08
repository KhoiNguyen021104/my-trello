import { useEffect, useRef, useState } from 'react'
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
import { ReactComponent as EditCardIcon } from '~/assets/editCard.svg'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import SubjectIcon from '@mui/icons-material/Subject'
import AttachFileIcon from '@mui/icons-material/AttachFile'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [columns, setColumns] = useState({
    1: { title: 'Column 1', editing: false }
  })

  const textFieldRef = useRef(null)
  const titleRef = useRef(null)
  const inputsRef = {
    1: { inputRef: useRef() },
    2: { inputRef: useRef() }
  }

  const handleClickInside = (columnId) => {
    Object.keys(columns).forEach((key) => {
      columns[key].editing = false
    })
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: { ...prevColumns[columnId], editing: true }
    }))
  }

  // useEffect((columnId) => {
  //   console.log(inputsRef[columnId])
  //   // inputsRef[columnId].inputRef.current.focus()
  // }, [columns])

  const handleClickOutside = (event) => {
    if (textFieldRef.current && titleRef.current) {
      if (
        !textFieldRef.current.contains(event.target) &&
        !titleRef.current.contains(event.target)
      ) {
        setColumns((prevColumns) => {
          const updatedColumns = { ...prevColumns }
          Object.keys(updatedColumns).forEach((key) => {
            updatedColumns[key].editing = false
          })
          return updatedColumns
        })
      }
    }
  }

  const handleKeyDown = (columnId) => (event) => {
    if (event.key === 'Enter') {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnId]: { ...prevColumns[columnId], editing: false }
      }))
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Box
      sx={{
        bgcolor: 'primary.light',
        width: '100%',
        height: (theme) => theme.app.BOARD_CONTENT_HEIGHT,
        display: 'flex',
        borderTop: '1px solid',
        borderColor: 'primary.main',
        pt: 1.5,
        cursor: 'pointer'
      }}>
      {/* Column 1 */}
      <Box
        sx={{
          minWidth: '272px',
          maxWidth: '272px',
          height: '570px',
          bgcolor: '#f1f2f4',
          ml: 2,
          borderRadius: '6px'
        }}>
        {/* Header */}
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
          <Box
            ref={titleRef}
            onClick={() => handleClickInside(1)}
            sx={{ display: 'flex', flex: 1 }}>
            {columns[1].editing ? (
              <TextField
                ref={textFieldRef}
                inputRef={inputsRef[1].inputRef}
                value={columns[1].title}
                onChange={(e) =>
                  setColumns((prevColumns) => ({
                    ...prevColumns,
                    [1]: { ...prevColumns[1], title: e.target.value }
                  }))
                }
                onKeyDown={handleKeyDown(1)}
                size='small'
                variant='outlined'
              />
            ) : (
              <Typography fontWeight={'500'}>{columns[1].title}</Typography>
            )}
          </Box>
          <Box>
            <IconButton
              id='basic-column-dropdown'
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
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

        {/* Card content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
          {/* Card 1 */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '8px',
              p: 0.5,
              width: '100%'
            }}>
            <Tooltip title='Color: green, title: Product' arrow>
              <Box
                sx={{
                  width: '40px',
                  height: '8px',
                  bgcolor: 'primary.light',
                  borderRadius: '4px'
                }}></Box>
            </Tooltip>
            <IconButton sx={{ p: 0 }}>
              <SvgIcon
                component={EditCardIcon}
                inheritViewBox
                sx={{ width: '16px', height: '16px' }}
              />
            </IconButton>
          </Box> */}
          <Card
            sx={{
              borderRadius:'8px',
              position:'relative',
              '&:hover': {
                outline: '#388bff auto 2px'
              }
            }}>
            <IconButton sx={{
              padding: 0.8,
              position:'absolute',
              zIndex: 1,
              right:2,
              top:2,
              bgcolor:'#fff',
              '&:hover': {
                bgcolor:'#ccc'
              }
            }}>
              <SvgIcon
                component={EditCardIcon}
                inheritViewBox
                sx={{ width: '16px', height: '16px' }}
              />
            </IconButton>
            <CardMedia
              sx={{ height: 159 }}
              image='https://trello.com/1/cards/66b493c9b1e1bf01d0242235/attachments/66b493c9b1e1bf01d02423e8/previews/66b493c9b1e1bf01d02423e7/download/ScratchPaper.jpg'
              title='green iguana'
            />
            <CardContent>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <IconButton sx={{ p:0 }}><SubjectIcon fontSize='small'/></IconButton>
              <IconButton sx={{ p:0 }}>
                <AttachFileIcon fontSize='small' sx={{ transform: 'rotate(45deg)' }}/>
                <Typography ml={1} variant='caption'>1</Typography>
              </IconButton>
            </CardActions>
          </Card>
        </Box>
        {/* Footer */}
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
          <Button
            startIcon={<AddIcon />}
            sx={{ flex: 1, justifyContent: 'left' }}>
            Add a card
          </Button>
          <IconButton>
            <SvgIcon
              component={CreateTemplateCardIcon}
              inheritViewBox
              sx={{ color: 'primary.main', width: '20px', height: '20px' }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
