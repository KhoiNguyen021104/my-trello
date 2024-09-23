import { Box, Button, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'

import {
  IconButton,
  MenuItem,
  TextField,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useRef, useState } from 'react'
import { createBoardAPI } from '~/apis'
import { toast } from 'react-toastify'

function CreateNewBoard({ userId }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
    setTitleInput('')
  }
  const handleClose = () => {
    setOpen(false)
    setTitleInput('')
  }

  const titleRef = useRef()
  const [titleInput, setTitleInput] = useState('')

  const modalRef = useRef()
  const btnCreateRef = useRef()

  // Select visibility
  const [visibility, setVisibility] = useState('workspace')

  const handleChangeSelect = (event) => {
    setVisibility(event.target.value)
  }

  const handleCreateNewBoard = async () => {
    const board = {
      title: titleInput,
      type: visibility,
      userId
    }
    const res = await createBoardAPI(board)
    if (res._id) {
      toast.success('Board created successfully', {
        position: 'top-right',
        autoClose: 2500
      })
    }
    // setBoardList(pre => {
    //   const newList = [...pre, res]
    //   return newList
    // })
    setOpen(false)
  }
  return (
    <Box sx={{ mt: 6 }}>
      <Button
        variant='contained'
        sx={{
          color: '#172b4d',
          fontWeight: 500,
          padding: '6px 12px',
          bgcolor: '#091e420f',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#091e4224'
          }
        }}>
        View all closed boards
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          ref={modalRef}
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 304,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              position: 'relative',
              mb: 1.5
            }}>
            <Typography
              sx={{
                width: '100%',
                textAlign: 'center',
                flex: 1,
                height: '40px',
                margin: 0,
                padding: ' 0 32px',
                overflow: 'hidden',
                color: '#44546f',
                fontsize: '14px',
                fontWeight: 600,
                letterSpacing: '-0.003em',
                lineHeight: '40px',
                textOverflow: 'ellipsis',
                whitespace: 'nowrap'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
              Create board
            </Typography>
            <IconButton
              size='small'
              sx={{
                padding: '10px',
                position: 'absolute',
                right: 0
              }}>
              <CloseIcon fontSize='small' onClick={handleClose} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexDirection: 'column',
              justifyContent: 'left',
              mt: 2
            }}>
            <Typography
              sx={{
                width: '100%',
                fontWeight: 700,
                letterSpacing: '1px',
                lineHeight: '16px',
                flex: 1,
                color: '#44546f',
                fontSize: '12px'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
              Board title
              <span
                style={{
                  marginLeft: '2px',
                  color: '#e34935'
                }}>
                *
              </span>
            </Typography>
            <TextField
              value={titleInput}
              inputRef={titleRef}
              onChange={(e) => setTitleInput(e.target.value)}
              autoComplete='off'
              fullWidth
              placeholder='Enter board title...'
              type='text'
              size='small'
              variant='outlined'
              sx={{
                flex: 1,
                border: 'none',
                borderRadius: '4px',
                '& input': { padding: '12px 14px' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'none' },
                  '&:hover fieldset': {
                    boxShadow: 'inset 0 0 0 2px #388bff',
                    border: 'none'
                  },
                  '&.Mui-focused fieldset': {
                    boxShadow: 'inset 0 0 0 2px #388bff',
                    border: 'none'
                  }
                }
              }}
            />
            {titleInput === '' && (
              <Typography
                variant='p'
                sx={{
                  width: '100%',
                  lineHeight: '16px',
                  flex: 1,
                  color: '#44546f',
                  fontSize: '13px'
                }}
                onClick={(event) => {
                  event.stopPropagation()
                }}>
                👋 Board title is required
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexDirection: 'column',
              justifyContent: 'left',
              mt: 2
            }}>
            <Typography
              sx={{
                width: '100%',
                fontWeight: 700,
                letterSpacing: '1px',
                lineHeight: '16px',
                flex: 1,
                color: '#44546f',
                fontSize: '12px'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
              Visibility
            </Typography>
            <FormControl
              sx={{
                width: '100%',
                '.MuiOutlinedInput-input': {
                  p: 1
                },
                '& fieldset': { borderColor: 'none' },
                '&:hover fieldset': {
                  boxShadow: 'inset 0 0 0 2px #388bff',
                  border: 'unset'
                },
                '.Mui-focused fieldset': {
                  boxShadow: 'inset 0 0 0 2px #388bff',
                  border: 'unset !important'
                }
              }}>
              <Select
                value={visibility}
                onChange={handleChangeSelect}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem
                  selected={true}
                  value='private'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 0.75
                  }}>
                  <em>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                      <ListItemIcon
                        sx={{ width: 'fit-content', minWidth: 'unset' }}>
                        <LockOutlinedIcon
                          sx={{ height: 16, width: 16, color: 'red' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          '.MuiTypography-root': {
                            display: 'flex',
                            alignItems: 'center'
                          }
                        }}>
                        Private
                      </ListItemText>
                    </Box>
                  </em>
                </MenuItem>
                <MenuItem
                  value='workspace'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 0.75
                  }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                    <ListItemIcon
                      sx={{ width: 'fit-content', minWidth: 'unset' }}>
                      <PeopleOutlinedIcon sx={{ height: 16, width: 16 }} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        '.MuiTypography-root': {
                          display: 'flex',
                          alignItems: 'center'
                        }
                      }}>
                      Workspace
                    </ListItemText>
                  </Box>
                </MenuItem>
                <MenuItem
                  value='public'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: 0.75
                  }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                    <ListItemIcon
                      sx={{ width: 'fit-content', minWidth: 'unset' }}>
                      <PublicOutlinedIcon
                        sx={{ height: 16, width: 16, color: '#22A06B' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        '.MuiTypography-root': {
                          display: 'flex',
                          alignItems: 'center'
                        }
                      }}>
                      Public
                    </ListItemText>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            <Box
              value='private'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 0.75
              }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                <Box
                  sx={{
                    width: 'fit-content',
                    minWidth: 'unset',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <LockOutlinedIcon
                    sx={{ height: 16, width: 16, color: 'red' }}
                  />
                </Box>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  Private
                </Typography>
              </Box>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{
                  textWrap: 'wrap',
                  color: '#44546f',
                  fontWeight: 400,
                  lineHeight: '16px'
                }}>
                Only board members can see this board. Workspace admins can
                close the board or remove members.
              </Typography>
            </Box>
            <Box
              value='workspace'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 0.75
              }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                <Box
                  sx={{
                    width: 'fit-content',
                    minWidth: 'unset',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <PeopleOutlinedIcon sx={{ height: 16, width: 16 }} />
                </Box>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  Workspace
                </Typography>
              </Box>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{
                  textWrap: 'wrap',
                  color: '#44546f',
                  fontWeight: 400,
                  lineHeight: '16px'
                }}>
                All members of the workspace can see and edit this board.
              </Typography>
            </Box>
            <Box
              value='public'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 0.75
              }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                <Box
                  sx={{
                    width: 'fit-content',
                    minWidth: 'unset',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <PublicOutlinedIcon
                    sx={{ height: 16, width: 16, color: '#22A06B' }}
                  />
                </Box>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  Public
                </Typography>
              </Box>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{
                  textWrap: 'wrap',
                  color: '#44546f',
                  fontWeight: 400,
                  lineHeight: '16px'
                }}>
                Anyone on the internet can see this board. Only board members
                can edit.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexDirection: 'column',
              justifyContent: 'left'
            }}>
            <Button
              disabled={titleInput === '' ? true : false}
              ref={btnCreateRef}
              onClick={handleCreateNewBoard}
              sx={{
                width: '100%',
                mt: 2,
                bgcolor: '#0c66e4',
                color: '#fff',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#0055cc', boxShadow: 'none' },
                '&:active': { boxShadow: 'none' }
              }}
              variant='contained'
              id='basic-button-member'
              aria-haspopup='true'>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default CreateNewBoard
