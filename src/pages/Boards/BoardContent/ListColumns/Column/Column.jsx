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
import ListCards from './ListCards/ListCards'

function Column() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [columns, setColumns] = useState({
    1: { title: 'Column 1', editing: false },
    2: { title: 'Column 2', editing: false }
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
        minWidth: theme => theme.app.WIDTH_COLUMN,
        maxWidth: theme => theme.app.WIDTH_COLUMN,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#000' : '#f1f2f4',
        ml: 2,
        mt: 1,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: (theme) =>
          `calc(${theme.app.BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)})`
      }}>
      {/* Header */}
      <Box
        sx={{
          height:(theme) => theme.app.COLUMN_HEADER_HEIGHT,
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
            <Typography variant='h6'>{columns[1].title}</Typography>
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
      {/* List cards */}
      <ListCards/>
      {/* List cards */}
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
  )
}

export default Column
