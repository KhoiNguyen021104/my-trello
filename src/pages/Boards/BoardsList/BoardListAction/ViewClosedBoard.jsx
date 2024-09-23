import { Box, Button, Divider, IconButton } from '@mui/material'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

import earth from '~/assets/imgBoardsList/earth.svg'
import MyButton from '~/components/AppBar/Button/MyButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

function ViewClosedBoard({ boardDestroyList, handleTogglePutIntoTrash, handleDeleteBoard }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        sx={{
          mt: 6,
          mb: 4,
          color: '#172b4d',
          fontWeight: 500,
          padding: '6px 12px',
          bgcolor: '#091e420f',
          cursor: 'pointer',
          boxShadow: 'none',
          '&:hover': {
            bgcolor: '#091e4224',
            boxShadow: 'none'
          }
        }}>
        View trash boards
      </Button>
      <Modal
        sx={{ zIndex: 99999999999 }}
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 768,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 2.5
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <svg
                width='24'
                height='24'
                role='presentation'
                focusable='false'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M3.03418 5.59621C2.98604 5.04603 3.39303 4.56099 3.94322 4.51286L19.8823 3.11837C20.4325 3.07023 20.9175 3.47722 20.9657 4.02741L21.0528 5.0236L3.12133 6.5924L3.03418 5.59621Z'
                  fill='currentColor'></path>
                <path
                  d='M9 12.9999C9 12.4476 9.44772 11.9999 10 11.9999H14C14.5523 11.9999 15 12.4476 15 12.9999C15 13.5522 14.5523 13.9999 14 13.9999H10C9.44772 13.9999 9 13.5522 9 12.9999Z'
                  fill='currentColor'></path>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3 18.9999V7.99993H21V18.9999C21 20.1045 20.1046 20.9999 19 20.9999H5C3.89543 20.9999 3 20.1045 3 18.9999ZM5 9.99993H19V18.9999H5L5 9.99993Z'
                  fill='currentColor'></path>
              </svg>
              <Typography
                variant='h2'
                sx={{
                  fontSize: '20px',
                  color: '#172b4d',
                  letterSpacing: '-0.008em',
                  lineHeight: '24px',
                  fontWeight: 500,
                  flex: 1,
                  m: 0
                }}>
                Trash boards
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            {boardDestroyList?.map((board, index) => {
              return (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box
                        style={{
                          width: 40,
                          height: 32,
                          borderRadius: '2px',
                          // background API
                          backgroundImage: `url(${earth})`
                        }}></Box>
                      <Box sx={{ fontSize: '14px' }}>
                        <Box
                          sx={{
                            color: '#0c66e4',
                            fontWeight: 400
                          }}>
                          {board?.title}
                        </Box>
                        <Typography
                          sx={{
                            color: '#44546f',
                            fontWeight: 400,
                            fontSize: '14px'
                          }}>
                          Trello Workspaces
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1
                      }}>
                      <MyButton
                        text='Restore'
                        type='contained'
                        bgcolor='#0c66e4'
                        bgcolorHover='#0055cc'
                        onClick={(event) => handleTogglePutIntoTrash(event, board._id, true)}
                      />
                      <MyButton
                        text='Delete'
                        type='contained'
                        bgcolor='#ca3521'
                        bgcolorHover='#ae2a19'
                        icon={<DeleteIcon />}
                        onClick={(event) => handleDeleteBoard(event, board._id)}
                      />
                    </Box>
                  </Box>
                  {
                    index!== boardDestroyList.length - 1 &&
                    <Divider sx={{ marginBlock: 1 }} />
                  }
                </>
              )
            })}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ViewClosedBoard
