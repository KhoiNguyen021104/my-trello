import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Bounce, toast } from 'react-toastify'

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const toggleNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
    setNewColumnTitle('')
  }
  const handleAddNewList = () => {
    if (!newColumnTitle) {
      // alert('Please enter list title')
      toast.error('Please enter list title',
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce
        }
      )
      return
    }
    // Call API
    toggleNewColumnForm()
    toast.success('Add new column successfully',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce
      }
    )
  }

  return (
    <SortableContext
      items={columns.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}>
        {columns?.map(column => {
          return (
            <Column
              key={column._id}
              column={column}
            />
          )
        })}
        {/* Add new column */}
        {
          !openNewColumnForm ?
            <Box
              onClick={toggleNewColumnForm}
              sx={{
                minWidth: (theme) => theme.app.WIDTH_COLUMN,
                maxWidth: (theme) => theme.app.WIDTH_COLUMN,
                bgcolor: '#ffffff3d',
                mt: 1,
                mx: 2.2,
                borderRadius: '6px',
                height: 'fit-content',
                maxHeight: (theme) =>
                  `calc(${theme.app.BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)})`
              }}>
              <Button
                sx={{
                  width: '100%',
                  height: '100%',
                  py: 1,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
                startIcon={<AddOutlinedIcon />}>
              Add another list
              </Button>
            </Box>
            :
            <Box
              sx={{
                minWidth: (theme) => theme.app.WIDTH_COLUMN,
                maxWidth: (theme) => theme.app.WIDTH_COLUMN,
                bgcolor: '#ffffff3d',
                mt: 1,
                mx: 2.2,
                borderRadius: '6px',
                height: 'fit-content',
                maxHeight: (theme) =>
                  `calc(${theme.app.BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)})`,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1, m: 1 }}>
                <TextField
                  value={newColumnTitle}
                  // inputRef={searchRef}
                  // onClick={handleClickInside}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  variant='outlined'
                  autoFocus
                  autoComplete='off'
                  fullWidth
                  placeholder='Enter list name..'
                  type='text'
                  size='small'
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    borderColor:'#8590A2',
                    borderRadius: '4px',
                    bgcolor: '#ffffff',
                    '& input': { color:'#172b4d', fontWeight: '600' },
                    '& input::placeholder': { color: '#626F86 !important', opacity:1 },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'none', border: 'none' },
                      '&:hover fieldset': { boxShadow: 'inset 0 0 0 2px var(--ds-border-focused,#388bff)' },
                      '&.Mui-focused fieldset': { boxShadow: 'inset 0 0 0 2px var(--ds-border-focused,#388bff)' }
                    }
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant='contained'
                    onClick={handleAddNewList}
                    sx={{
                      bgcolor: '#0C66E4',
                      '&.MuiButton-root:hover': {
                        bgcolor: '#0055CC'
                      }
                    }}
                  >
                    Add list
                  </Button>
                  <CloseIcon
                    sx={{
                      color: 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'red'
                      }
                    }}
                    fontSize='small'
                    onClick={toggleNewColumnForm}
                  />
                </Box>
              </Box>
            </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
