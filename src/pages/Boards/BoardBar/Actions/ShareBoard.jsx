import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useContext, useEffect, useRef, useState } from 'react'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
// import { ContentCopy, ContentCut } from '@mui/icons-material'
import { Link as MuiLink } from '@mui/material'
import Tab from '@mui/material/Tab'
import Avatar from '@mui/material/Avatar'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { BoardIdContext } from '../../_id'
import { Bounce, toast } from 'react-toastify'
import { createHtmlShareBoard } from '~/utils/formatters'

function ShareBoard() {
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

  const [anchorElMemberMenu, setAnchorElMemberMenu] = useState(null)
  const openMemberMenu = Boolean(anchorElMemberMenu)
  const handleClickMemberMenu = (event) => {
    setAnchorElMemberMenu(event.currentTarget)
  }
  const handleCloseMemberMenu = () => {
    setAnchorElMemberMenu(null)
  }

  const [anchorElRoleMenu, setAnchorElRoleMenu] = useState(null)
  const openRoleMenu = Boolean(anchorElRoleMenu)
  const handleClickRoleMenu = (event) => {
    setAnchorElRoleMenu(event.currentTarget)
  }
  const handleCloseRoleMenu = () => {
    setAnchorElRoleMenu(null)
  }

  const [value, setValue] = useState('0')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // Send Mail
  const sendMailInviteJoinBoard = useContext(BoardIdContext).sendMailInviteJoinBoard
  const html = createHtmlShareBoard({
    name: 'Nguyễn Văn Khôi',
    href: 'http://localhost:5173/'
  })
  const handleShareBoard = async () => {
    const to = emailInput
    setEmailInput('')
    const res = await sendMailInviteJoinBoard({
      from: '"Trello"<khoindt10a4@gmail.com>',
      to: to,
      // subject => Khôi Nguyễn Văn => update user_full_name => api user
      subject: 'Khôi Nguyễn Văn đã mời bạn vào bảng Trello',
      html: html
    })
    if (res) {
      toast.error('Please enter email address!',
        {
          position: 'top-center',
          autoClose: 2500,
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
    toast.success('Invite successfully',
      {
        position: 'top-center',
        autoClose: 2500,
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
    <Box>
      <Tooltip title='Share board' arrow>
        <Button
          onClick={handleOpen}
          variant='contained'
          startIcon={<PersonAddAltIcon />}
          sx={{
            bgcolor: 'white',
            color: '#172B4D',
            '&:hover': { bgcolor: '#bdc3c7' }
          }}>
          Share
        </Button>
      </Tooltip>
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
            width: 584,
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
                fontWeight: 400,
                color: '#172b4d',
                letterSpacing: '1px',
                lineHeight: '20px',
                flex: 1,
                fontSize: '20px'
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}>
              Share board
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              value={emailInput}
              inputRef={searchRef}
              // onClick={handleClickInside}
              onChange={(e) => setEmailInput(e.target.value)}
              autoComplete='off'
              fullWidth
              placeholder='Enter email address or name...'
              type='text'
              size='small'
              variant='outlined'
              sx={{
                flex: 1,
                border: 'none',
                borderRadius: '4px',
                paddingBlock: 1,
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
            <Button
              sx={{
                p: 1,
                bgcolor: !openMemberMenu ? 'rgba(9, 30, 66, 0.04)' : '#E9F2FF',
                color: !openMemberMenu ? '#42526E' : '#0C66E4',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#091e4214', boxShadow: 'none' },
                '&:active': { boxShadow: 'none' }
              }}
              variant='contained'
              endIcon={<KeyboardArrowDownOutlinedIcon />}
              id='basic-button-member'
              aria-controls={openMemberMenu ? 'basic-menu-member' : undefined}
              aria-haspopup='true'
              aria-expanded={openMemberMenu ? 'true' : undefined}
              onClick={handleClickMemberMenu}>
              Member
            </Button>
            <Menu
              sx={{
                '.MuiPaper-root': {
                  width: '288px',
                  top: '180px !important',
                  left: '676px !important'
                }
              }}
              id='basic-menu-member'
              anchorEl={anchorElMemberMenu}
              open={openMemberMenu}
              onClose={handleCloseMemberMenu}
              onClick={handleCloseMemberMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button-member'
              }}>
              <MenuItem
                sx={{
                  borderLeft: '3px solid #0C66E4',
                  bgcolor: '#E9F2FF',
                  color: '#0C66E4',
                  '&:hover': {
                    bgcolor: '#CCE0FF'
                  },
                  '.MuiListItemText-root': { p: 0.5 }
                }}>
                <ListItemText>Member</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'start',
                  color: '#091E424F',
                  bgcolor: '#00000000',
                  '.MuiListItemText-root': { p: 0.5 }
                }}>
                <Typography sx={{ textWrap: 'wrap' }} variant='body2'>
                  Observer
                </Typography>
                <Typography sx={{ textWrap: 'wrap' }} variant='caption'>
                  Add people with limited permissions to this board.
                </Typography>
              </MenuItem>
            </Menu>
            <Button
              ref={btnShareRef}
              onClick={handleShareBoard}
              sx={{
                p: 1,
                bgcolor: '#0c66e4',
                color: '#fff',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#05c' },
                '&:active': { boxShadow: 'none' }
              }}
              variant='contained'>
              Share
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
            <Box
              size='small'
              sx={{
                width: 32,
                minWidth: 32,
                height: 32,
                p: 1,
                bgcolor: 'rgba(9, 30, 66, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1
              }}>
              <InsertLinkOutlinedIcon
                fontSize='small'
                sx={{ transform: 'rotate(-45deg)' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left'
              }}>
              <Typography variant='body1' sx={{ fontWeight: 300 }}>
                Share this board with a link
              </Typography>
              <MuiLink
                variant='caption'
                href='#'
                sx={{
                  width: 'fit-content',
                  textAlign: 'left',
                  color: '#0c66e4',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}>
                Create link
              </MuiLink>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              '& .MuiTabPanel-root': {
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0
              }
            }}>
            <TabContext
              value={value}
              sx={{
                borderBottom: 1,
                borderColor: 'divider'
              }}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label='lab API tabs example'
                  sx={{
                    '.MuiTabs-indicator': {
                      bgcolor: '#0c66e4'
                    },
                    '.MuiTab-root.Mui-selected': {
                      color: '#0c66e4'
                    },
                    '& button': {
                      fontSize: '14px',
                      textTransform: 'none'
                    }
                  }}>
                  <Tab
                    value='0'
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                        <span>Board member</span>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            backgroundColor: 'rgba(9, 30, 66, 0.04)',
                            borderRadius: '50%',
                            width: 18,
                            height: 18,
                            fontSize: '12px'
                          }}>
                          1
                        </Box>
                      </Box>
                    }
                  />
                  <Tab value='1' label='Join request' />
                </TabList>
              </Box>
              <TabPanel value='0'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display:'flex' }}>
                    <Avatar
                      alt='@khoinguyenvan1'
                      src='https://secure.gravatar.com/avatar/b4291bc903004b496b9050f736850091?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FKV-1.png'
                      sx={{
                        width: 32,
                        height: 32
                      }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography sx={{ color: '#44546f' }} variant='body1'>
                        Khôi Nguyễn Văn (you)
                      </Typography>
                      <Typography
                        sx={{ display: 'flex', color: '#44546f', gap: 1 }}
                        variant='caption'>
                        @khoinguyenvan1
                        <span> - Workspace admin</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      p: 1,
                      bgcolor: !openRoleMenu ? 'rgba(9, 30, 66, 0.04)' : '#E9F2FF',
                      color: !openRoleMenu ? '#42526E' : '#0C66E4',
                      boxShadow: 'none',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#091e4214', boxShadow: 'none' },
                      '&:active': { boxShadow: 'none' }
                    }}
                    variant='contained'
                    endIcon={<KeyboardArrowDownOutlinedIcon />}
                    id='basic-button-role'
                    aria-controls={openRoleMenu ? 'basic-menu-role' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openRoleMenu ? 'true' : undefined}
                    onClick={handleClickRoleMenu}
                  >
                    Admin
                  </Button>
                  <Menu
                    sx={{
                      '.MuiPaper-root': {
                        width: '288px',
                        top: '375px !important',
                        left: '746px !important'
                      }
                    }}
                    id='basic-menu-role'
                    anchorEl={anchorElRoleMenu}
                    open={openRoleMenu}
                    onClose={handleCloseRoleMenu}
                    onClick={handleCloseRoleMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button-role'
                    }}>
                    <MenuItem
                      sx={{
                        borderLeft: '3px solid #0C66E4',
                        bgcolor: '#E9F2FF',
                        color: '#0C66E4',
                        '&:hover': {
                          bgcolor: '#CCE0FF'
                        },
                        '.MuiListItemText-root': { p: 0.5 }
                      }}>
                      <ListItemText>Admin</ListItemText>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        color: '#091E424F',
                        bgcolor: '#00000000',
                        '.MuiListItemText-root': { p: 0.5 }
                      }}>
                      <Typography sx={{ textWrap: 'wrap' }} variant='body2'>
                        Member
                      </Typography>
                      <Typography sx={{ textWrap: 'wrap' }} variant='caption'>
                        Board must have at least one admin
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        color: '#091E424F',
                        bgcolor: '#00000000',
                        '.MuiListItemText-root': { p: 0.5 }
                      }}>
                      <Typography sx={{ textWrap: 'wrap' }} variant='body2'>
                        Observer
                      </Typography>
                      <Typography sx={{ textWrap: 'wrap' }} variant='caption'>
                        Add people with limited permissions to this board.
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        color: '#091E424F',
                        bgcolor: '#00000000',
                        '.MuiListItemText-root': { p: 0.5 }
                      }}>
                      <Typography sx={{ textWrap: 'wrap' }} variant='body2'>
                        Leave board
                      </Typography>
                      <Typography sx={{ textWrap: 'wrap' }} variant='caption'>
                        Board must have at least one admin
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </TabPanel>
              <TabPanel value='1'>Item Two</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ShareBoard
