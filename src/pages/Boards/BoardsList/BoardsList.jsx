import { Box, Button, Typography } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import Modal from '@mui/material/Modal'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import {
  IconButton,
  MenuItem,
  TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useRef, useState } from 'react'

import earth from '~/assets/imgBoardsList/earth.svg'

function BoardsList(user) {
  const [changeStyleStar, setChangeStyleStar] = useState([true, true, true])

  const handleEnterChangeStyleStar = (index) => {
    setChangeStyleStar((pre) => {
      const newState = [...pre]
      newState[index] = false
      return newState
    })
  }

  const handleLeaveChangeStyleStar = (index) => {
    setChangeStyleStar((pre) => {
      const newState = [...pre]
      newState[index] = true
      return newState
    })
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const searchRef = useRef()
  // const [searchInput, setSearchInput] = useState('')
  const [emailInput, setEmailInput] = useState('')

  const modelRef = useRef()
  const btnShareRef = useRef()
  const handleClickOutside = (event) => {
    if (event.target === modelRef.current || event.target === btnShareRef.current ) return
    setEmailInput('')
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Select visibility
  const [age, setAge] = useState('')

  const handleChangeSelect = (event) => {
    setAge(event.target.value)
  }

  const handleCreateNewBoard = () => {
    console.log('🚀 ~ BoardsList ~ user:', user)
  }

  return (
    <Box
      sx={{
        flex: 1,
        ml: 4,
        mb: '72px',
        maxWidth: '825px',
        minWidth: '288px',
        pt: 1,
        overflow: 'auto'
      }}>
      <Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <StarBorderOutlinedIcon
              sx={{ color: '#44546f', height: 24, width: 24 }}
            />
          </Box>
          <Typography
            variant='h3'
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              lineWeight: '24px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}>
            Starred boards
          </Typography>
        </Box>
        <Box sx={{ display:'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Box
              sx={{
                width: '172px',
                height: '96px',
                borderRadius: '3px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url(${earth})`,
                bgcolor: '#000',
                cursor: 'pointer',
                position: 'relative',
                '&:hover .overlay': {
                  bgcolor: '#091e4224'
                }
              }}>
              <div
                className='overlay'
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  height: '100%',
                  width: '100%',
                  bgcolor: 'transparent'
                }}></div>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                  p: 1,
                  flex: 1
                }}>
                MyTrello
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'end', p: 1.25 }}>
                {changeStyleStar[0] ? (
                  <StarOutlinedIcon
                    sx={{
                      width: 18,
                      height: 18,
                      color: 'yellow',
                      zIndex: 1000
                    }}
                    onMouseEnter={() => handleEnterChangeStyleStar(0)}
                  />
                ) : (
                  <StarBorderOutlinedIcon
                    sx={{
                      width: 18,
                      height: 18,
                      color: 'yellow',
                      zIndex: 1000
                    }}
                    onMouseLeave={() => handleLeaveChangeStyleStar(0)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <AccessTimeOutlinedIcon
              sx={{ color: '#44546f', height: 24, width: 24 }}
            />
          </Box>
          <Typography
            variant='h3'
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              lineWeight: '24px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}>
            Recently viewed
          </Typography>
        </Box>
        <Box sx={{ display:'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box
            sx={{
              width: '172px',
              height: '96px',
              borderRadius: '3px',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${earth})`,
              bgcolor: '#000',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .overlay': {
                bgcolor: '#091e4224'
              }
            }}>
            <div
              className='overlay'
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
                bgcolor: 'transparent',
                borderRadius: '3px'
              }}></div>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                p: 1,
                flex: 1
              }}>
              MyTrello
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', p: 1.25 }}>
              {changeStyleStar[1] ? (
                <StarOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: 'yellow',
                    zIndex: 1000
                  }}
                  onMouseEnter={() => handleEnterChangeStyleStar(1)}
                />
              ) : (
                <StarBorderOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: 'yellow',
                    zIndex: 1000
                  }}
                  onMouseLeave={() => handleLeaveChangeStyleStar(1)}
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: '172px',
              height: '96px',
              borderRadius: '3px',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${earth})`,
              bgcolor: '#000',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .overlay': {
                bgcolor: '#091e4224'
              },
              '&:hover svg': {
                visibility: 'visible',
                opacity: 1,
                animation: 'slideIn 0.2s ease-in-out'
              },
              '@keyframes slideIn': {
                '0%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(0)' }
              }
            }}>
            <div
              className='overlay'
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
                bgcolor: 'transparent',
                borderRadius: '3px'
              }}></div>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                p: 1,
                flex: 1
              }}>
              MyTrello
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                p: 1.25,
                zIndex: 10000
              }}
            >
              <StarBorderOutlinedIcon
                sx={{
                  width: 18,
                  height: 18,
                  color: '#fff',
                  transition: 'opacity 0.2s ease',
                  visibility: 'hidden',
                  opacity: 0,
                  '&:hover': {
                    transform: 'scale(1.25)'
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <Typography
            variant='h3'
            sx={{
              color: '#44546f',
              fontSize: '16px',
              fontWeight: 700,
              lineWeight: '24px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}>
            YOUR WORKSPACES
          </Typography>
        </Box>
        <Box sx={{ display:'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box
            sx={{
              width: '172px',
              height: '96px',
              borderRadius: '3px',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${earth})`,
              bgcolor: '#000',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .overlay': {
                bgcolor: '#091e4224'
              }
            }}>
            <div
              className='overlay'
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
                bgcolor: 'transparent',
                borderRadius: '3px'
              }}></div>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                p: 1,
                flex: 1
              }}>
              MyTrello
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', p: 1.25 }}>
              {changeStyleStar[2] ? (
                <StarOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: 'yellow',
                    zIndex: 1000
                  }}
                  onMouseEnter={() => handleEnterChangeStyleStar(2)}
                />
              ) : (
                <StarBorderOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: 'yellow',
                    zIndex: 1000
                  }}
                  onMouseLeave={() => handleLeaveChangeStyleStar(2)}
                />
              )}
            </Box>
          </Box>
          <Box
            onClick={handleOpen}
            sx={{
              width: '172px',
              height: '96px',
              borderRadius: '3px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#091e420f',
              cursor: 'pointer',
              position: 'relative',
              '&:hover .overlay': {
                bgcolor: '#091e4224'
              }
            }}>
            <div
              className='overlay'
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
                bgcolor: 'transparent',
                borderRadius: '3px'
              }}></div>
            <Typography
              sx={{
                color: '#44546f',
                fontSize: '14px',
                fontWeight: 400,
                lineWeight: '24px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center'
              }}
            >
              Create new board
            </Typography>
            {/* Giới hạn số board được tạo */}
            {/* <Typography
              sx={{
                color: '#44546f',
                fontSize: '12px',
                fontWeight: 400,
                lineWeight: '24px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center'
              }}
            >
              3 remaining
            </Typography> */}
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Button variant='contained'
          sx={{
            color: '#172b4d',
            fontWeight: 500,
            padding: '6px 12px',
            bgcolor: '#091e420f',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: '#091e4224'
            }
          }}
        >View all closed boards</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box
          ref={modelRef}
          sx={{
            position: 'absolute',
            top: '30%',
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
                padding:' 0 32px',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', justifyContent:'left', mt: 2 }}>
            <Typography
              sx={{
                width: '100%',
                fontWeight: 700,
                letterSpacing: '1px',
                lineHeight: '16px',
                flex: 1,
                color:'#44546f',
                fontSize: '12px'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
                Board title
              <span style={{
                marginLeft: '2px',
                color:  '#e34935'
              }}>*</span>
            </Typography>
            <TextField
              value={emailInput}
              inputRef={searchRef}
              onChange={(e) => setEmailInput(e.target.value)}
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
            <Typography
              variant='p'
              sx={{
                width: '100%',
                lineHeight: '16px',
                flex: 1,
                color:'#44546f',
                fontSize: '13px'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
                👋
                Board title is required
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', justifyContent:'left', mt: 2 }}>
            <Typography
              sx={{
                width: '100%',
                fontWeight: 700,
                letterSpacing: '1px',
                lineHeight: '16px',
                flex: 1,
                color:'#44546f',
                fontSize: '12px'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
                Visibility
            </Typography>
            <FormControl
              sx={{
                minWidth: '100%',
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
                value={age}
                onChange={handleChangeSelect}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>Workspace</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', justifyContent:'left' }}>
            <Button
              // disabled
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

export default BoardsList
