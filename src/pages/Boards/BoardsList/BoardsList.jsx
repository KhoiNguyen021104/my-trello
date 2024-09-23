import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import Modal from '@mui/material/Modal'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'

import {
  IconButton,
  MenuItem,
  TextField,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import earth from '~/assets/imgBoardsList/earth.svg'
import { createBoardAPI, deleteBoardAPI, fetchBoardDetailsAPI, fetchBoardListAPI, findOneUserByIdAPI, updateBoardDetailsAPI } from '~/apis'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'
import ViewClosedBoard from './BoardListAction/ViewClosedBoard'
import { SocketContext } from '~/components/Socket/SocketWrapper'

function BoardsList({ userId }) {
  const [boardStarredIcon, setBoardStarredIcon] = useState(null)
  const [boardStarredWorkspaceIcon, setBoardStarredWorkspaceIcon] = useState(null)
  const [boardList, setBoardList] = useState(null)
  const [boardDestroyList, setBoardDestroyList] = useState(null)
  const [boardStarred, setBoardStarred] = useState(null)
  const [boardMemberIds, setBoardMemberIds] = useState(null)
  useEffect(() => {
    if (userId) {
      fetchBoardListAPI(userId)
        .then(response => {
          const res = response?.filter(board => board._destroy === false)
          const resDestroy = response.filter(board => board._destroy === true)
          setBoardList(res)
          setBoardDestroyList(resDestroy)
        })
      findOneUserByIdAPI(userId)
        .then(response => {
          const boardMemberIds = response.boardMemberIds
          setBoardMemberIds(boardMemberIds)
          boardMemberIds?.forEach(_id => {
            fetchBoardDetailsAPI(_id)
              .then(response => {
                setBoardList(prev => [...prev, response])
                const resDestroy = response?.filter(board => board._destroy === true)
                setBoardDestroyList(pre => [...pre, resDestroy])
              })
          })
        })
    }
  }, [userId])

  useEffect(() => {
    const arrBoardStarred = boardList?.filter(board => board?.starred === true)
    setBoardStarred(arrBoardStarred)
  }, [boardList])

  useEffect(() => {
    const newState = {}
    boardStarred?.map(board => {
      newState[board._id] = true
    })
    setBoardStarredIcon((newState))
    setBoardStarredWorkspaceIcon(newState)
  }, [boardStarred])

  const handleEnterBoardStarredIcon = (key, field) => {
    if (field === 'starred') {
      setBoardStarredIcon((pre) => {
        const newState = { ...pre }
        newState[key] = false
        return newState
      })
    }
    if (field === 'workspace') {
      setBoardStarredWorkspaceIcon((pre) => {
        const newState = { ...pre }
        newState[key] = false
        return newState
      })
    }
  }

  const handleLeaveBoardStarredIcon = (key, field) => {
    if (field === 'starred') {
      setBoardStarredIcon((pre) => {
        const newState = { ...pre }
        newState[key] = true
        return newState
      })
    }
    if (field === 'workspace') {
      setBoardStarredWorkspaceIcon((pre) => {
        const newState = { ...pre }
        newState[key] = true
        return newState
      })
    }
  }

  const handleToggleStarredBoard = (event, key, isStarred) => {
    event.stopPropagation()
    updateBoardDetailsAPI(key, {
      starred: !isStarred
    })
    if (isStarred) {
      const newBoardList = cloneDeep(boardList)
      newBoardList.map(board => {
        if (board._id === key) {
          board.starred = false
        }
        return board
      })
      setBoardList(newBoardList)
    } else {
      const newBoardList = cloneDeep(boardList)
      newBoardList.map(board => {
        if (board._id === key) {
          board.starred = true
        }
        return board
      })
      setBoardList(newBoardList)
    }
  }

  // Modal
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
    setBoardList(pre => {
      const newList = [...pre, res]
      return newList
    })
    setOpen(false)
  }

  const handleAccessBoard = (boardId) => {
    const encodeBoardId = encodeURIComponent(btoa(JSON.stringify(boardId)))
    location.href = `/board/${encodeBoardId}`
  }

  // Put board into trash
  const handleTogglePutIntoTrash = (event, boardId, isDestroy) => {
    event.stopPropagation()
    const checkAuthor = boardMemberIds?.some(id => id === boardId)
    if (checkAuthor) {
      toast.info('You do not have the authority to delete the table')
      return
    }
    updateBoardDetailsAPI(boardId, {
      _destroy: !isDestroy
    })
    if (!isDestroy) {
      const newBoardList = boardList.filter(board => board._id !== boardId)
      setBoardList(newBoardList)
      const board = boardList.find(board => board._id === boardId)
      setBoardDestroyList(pre => {
        return [
          ...pre,
          board
        ]
      })
    } else {
      const board = boardDestroyList.find(board => board._id === boardId)
      setBoardList(pre => {
        return [
          ...pre,
          board
        ]
      })
      const newBoardDestroyList = boardDestroyList.filter(board => board._id !== boardId)
      setBoardDestroyList(newBoardDestroyList)
    }
  }
  // Delete board
  const handleDeleteBoard = async (event, boardId) => {
    event.stopPropagation()
    const res = await deleteBoardAPI(boardId)
    const newBoardDestroyList = boardDestroyList.filter(board => board._id !== boardId)
    setBoardDestroyList(newBoardDestroyList)
    if (res) {
      toast.success('Board deleted successfully', {
        position: 'top-right',
        autoClose: 2500
      })
    }
  }

  return (
    <Box
      sx={{
        flex: 1,
        ml: 4,
        maxWidth: '825px',
        minWidth: '288px',
        pt: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
      {/* Starred Boards */}
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
          {
            boardStarred?.map(board => {
              return (
                <Box
                  key={board._id}
                  onClick={() => handleAccessBoard(board._id)}
                >
                  <Box
                    sx={{
                      width: '194px',
                      height: '96px',
                      borderRadius: '3px',
                      display: 'flex',
                      flexDirection: 'column',
                      // board.background API
                      backgroundImage: `url(${earth})`,
                      bgcolor: '#000',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover .overlay': {
                        bgcolor: '#091e4224'
                      },
                      '&:hover > svg': {
                        display:'block'
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
                      {board.title}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'end', p: 1.25 }}
                      onClick={(event) => handleToggleStarredBoard(event, board._id, true)}
                    >
                      {boardStarredIcon[board._id] ? (
                        <StarOutlinedIcon
                          sx={{
                            width: 18,
                            height: 18,
                            color: 'yellow',
                            zIndex: 1000
                          }}
                          onMouseEnter={() => handleEnterBoardStarredIcon(board._id, 'starred')}
                        />
                      ) : (
                        <StarBorderOutlinedIcon
                          sx={{
                            width: 18,
                            height: 18,
                            color: 'yellow',
                            zIndex: 1000
                          }}
                          onMouseLeave={() => handleLeaveBoardStarredIcon(board._id, 'starred')}
                        />
                      )}
                    </Box>
                    <Tooltip
                      title='Put board into the trash'
                      placement='top-end'
                    >
                      <RemoveOutlinedIcon
                        onClick={(event) => handleTogglePutIntoTrash(event, board._id, false)}
                        sx={{
                          position:'absolute',
                          zIndex: 100,
                          right: 4,
                          top: 4,
                          color:'#ccc',
                          display: 'none'
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              )
            })
          }
        </Box>
      </Box>
      {/* Recently viewed */}
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
          {/* <Box
            sx={{
              width: '194px',
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
              {boardStarredIcon[1] ? (
                <StarOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: 'yellow',
                    zIndex: 1000
                  }}
                  onMouseEnter={() => handleEnterBoardStarredIcon(1)}
                />
              ) : (
                <StarBorderOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    color: 'yellow',
                    zIndex: 1000
                  }}
                  onMouseLeave={() => handleLeaveBoardStarredIcon(1)}
                />
              )}
            </Box>
          </Box> */}
          {/* <Box
            sx={{
              width: '194px',
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
          </Box> */}
        </Box>
      </Box>
      {/* Your workspace */}
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
          {
            boardList?.map(board => {
              return (
                board.starred ?
                  <Box
                    key={board._id}
                    onClick={() => handleAccessBoard(board._id)}
                    sx={{
                      width: '194px',
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
                      '&:hover > svg': {
                        display:'block'
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
                      {board.title}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'end', p: 1.25 }}
                      onClick={(event) => handleToggleStarredBoard(event, board._id, true)}
                    >
                      {boardStarredWorkspaceIcon[board._id] ? (
                        <StarOutlinedIcon
                          sx={{
                            width: 18,
                            height: 18,
                            color: 'yellow',
                            zIndex: 1000
                          }}
                          onMouseEnter={() => handleEnterBoardStarredIcon(board._id, 'workspace')}
                        />
                      ) : (
                        <StarBorderOutlinedIcon
                          sx={{
                            width: 18,
                            height: 18,
                            color: 'yellow',
                            zIndex: 1000
                          }}
                          onMouseLeave={() => handleLeaveBoardStarredIcon(board._id, 'workspace')}
                        />
                      )
                      }
                    </Box>
                    <Tooltip
                      title='Put board into the trash'
                      placement='top-end'
                    >
                      <RemoveOutlinedIcon
                        onClick={(event) => handleTogglePutIntoTrash(event, board._id, false)}
                        sx={{
                          position:'absolute',
                          zIndex: 100,
                          right: 4,
                          top: 4,
                          color:'#ccc',
                          display: 'none'
                        }}
                      />
                    </Tooltip>
                  </Box> :
                  <Box
                    key={board._id}
                    onClick={() => handleAccessBoard(board._id)}
                    sx={{
                      width: '194px',
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
                      },
                      '&:hover > svg': {
                        display:'block',
                        animation: 'unset'
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
                      {board.title}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        p: 1.25,
                        zIndex: 10000
                      }}
                      onClick={(event) => handleToggleStarredBoard(event, board._id, false)}
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
                    <Tooltip
                      title='Put board into the trash'
                      placement='top-end'
                    >
                      <RemoveOutlinedIcon
                        onClick={(event) => handleTogglePutIntoTrash(event, board._id, false)}
                        sx={{
                          position:'absolute',
                          zIndex: 100,
                          right: 4,
                          top: 4,
                          color:'#ccc',
                          display: 'none'
                        }}
                      />
                    </Tooltip>
                  </Box>
              )
            })
          }
          <Box
            onClick={handleOpen}
            sx={{
              width: '194px',
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
      {/* View all closed board */}
      <ViewClosedBoard
        boardDestroyList={boardDestroyList}
        handleTogglePutIntoTrash={handleTogglePutIntoTrash}
        handleDeleteBoard={handleDeleteBoard}
      />
      {/* Modal create new board */}
      <Modal
        // sx={{ zIndex: 999999999999 }}
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
            {titleInput==='' &&
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
            </Typography>}
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexDirection: 'column',
            justifyContent:'left',
            mt: 2
          }}>
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
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem
                  selected={true}
                  value='private'
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
                >
                  <em>
                    <Box sx={{ width: '100%', display: 'flex', alignItems:'center', gap: 1 }}>
                      <ListItemIcon sx={{ width: 'fit-content', minWidth: 'unset' }}>
                        <LockOutlinedIcon sx={{ height: 16, width: 16, color:'red' }} />
                      </ListItemIcon>
                      <ListItemText sx={{
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
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
                >
                  <Box sx={{ width: '100%', display: 'flex', alignItems:'center', gap: 1 }}>
                    <ListItemIcon sx={{ width: 'fit-content', minWidth: 'unset' }}>
                      <PeopleOutlinedIcon sx={{ height: 16, width: 16 }} />
                    </ListItemIcon>
                    <ListItemText sx={{
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
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
                >
                  <Box sx={{ width: '100%', display: 'flex', alignItems:'center', gap: 1 }}>
                    <ListItemIcon sx={{ width: 'fit-content', minWidth: 'unset' }}>
                      <PublicOutlinedIcon sx={{ height: 16, width: 16, color:'#22A06B' }} />
                    </ListItemIcon>
                    <ListItemText sx={{
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
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems:'center', gap: 1 }}>
                <Box sx={{ width: 'fit-content', minWidth: 'unset', display:'flex', alignItems: 'center' }}>
                  <LockOutlinedIcon sx={{ height: 16, width: 16, color:'red' }} />
                </Box>
                <Typography sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Private
                </Typography>
              </Box>
              <Typography variant='caption' color='text.secondary'
                sx={{
                  textWrap: 'wrap',
                  color: '#44546f',
                  fontWeight: 400,
                  lineHeight: '16px'
                }}>
                Only board members can see this board. Workspace admins can close the board or remove members.
              </Typography>
            </Box>
            <Box
              value='workspace'
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems:'center', gap: 1 }}>
                <Box sx={{ width: 'fit-content', minWidth: 'unset', display:'flex', alignItems: 'center' }}>
                  <PeopleOutlinedIcon sx={{ height: 16, width: 16 }} />
                </Box>
                <Typography sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Workspace
                </Typography>
              </Box>
              <Typography variant='caption' color='text.secondary'
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
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.75 }}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems:'center', gap: 1 }}>
                <Box sx={{ width: 'fit-content', minWidth: 'unset', display:'flex', alignItems: 'center' }}>
                  <PublicOutlinedIcon sx={{ height: 16, width: 16, color:'#22A06B' }} />
                </Box>
                <Typography sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Public
                </Typography>
              </Box>
              <Typography variant='caption' color='text.secondary'
                sx={{
                  textWrap: 'wrap',
                  color: '#44546f',
                  fontWeight: 400,
                  lineHeight: '16px'
                }}>
                  Anyone on the internet can see this board. Only board members can edit.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column', justifyContent:'left' }}>
            <Button
              disabled={titleInput==='' ? true : false}
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

export default BoardsList
