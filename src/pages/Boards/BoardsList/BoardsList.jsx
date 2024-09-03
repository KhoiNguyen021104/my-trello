import { Box, Typography } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

import earth from '~/assets/imgBoardsList/earth.svg'
import { useState } from 'react'

function BoardsList() {
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
                  bgcolor: '#00000040'
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
                bgcolor: '#00000040'
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
                bgcolor: '#00000040'
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
                bgcolor: '#00000040'
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
        </Box>
      </Box>
    </Box>
  )
}

export default BoardsList
