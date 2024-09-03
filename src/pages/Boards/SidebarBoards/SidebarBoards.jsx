import { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Box, Divider, Typography } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { useDispatch } from 'react-redux'
import { boards as boardsAction, templates as templatesAction, home as homeAction } from '~/redux/actions/dashboardPageContentAction'

function SidebarBoards() {
  const [open, setOpen] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const dispatch = useDispatch()
  const handleClick = () => {
    setOpen(!open)
  }

  const navigationItems = [
    {
      title: 'Boards',
      active: true,
      icon: (
        <svg
          width='24'
          height='24'
          role='presentation'
          focusable='false'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z'
            fill='currentColor'></path>
        </svg>
      ),
      action: boardsAction
    },
    {
      title: 'Templates',
      active: false,
      icon: (
        <svg
          width='24'
          height='24'
          role='presentation'
          focusable='false'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M3 6V5C3 3.89543 3.89543 3 5 3H6C6.55228 3 7 3.44772 7 4C7 4.55228 6.55228 5 6 5H5V6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6Z'
            fill='currentColor'></path>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6 8C6 6.89543 6.89543 6 8 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H8C6.89543 20 6 19.1046 6 18V8ZM8 8H19V14H8V8ZM18 18C17.4477 18 17 17.5523 17 17C17 16.4477 17.4477 16 18 16C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18ZM8 17C8 17.5523 8.44772 18 9 18H12C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16H9C8.44772 16 8 16.4477 8 17Z'
            fill='currentColor'></path>
          <path
            d='M4 14C3.44772 14 3 14.4477 3 15V16C3 17.1046 3.89543 18 5 18V15C5 14.4477 4.55228 14 4 14Z'
            fill='currentColor'></path>
          <path
            d='M3 9C3 8.44772 3.44772 8 4 8C4.55228 8 5 8.44772 5 9V12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12V9Z'
            fill='currentColor'></path>
          <path
            d='M8 4C8 3.44772 8.44772 3 9 3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H9C8.44772 5 8 4.55228 8 4Z'
            fill='currentColor'></path>
          <path
            d='M16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H19C19 3.89543 18.1046 3 17 3H16Z'
            fill='currentColor'></path>
        </svg>
      ),
      action: templatesAction
    },
    {
      title: 'Home',
      active: false,
      icon: <HomeOutlinedIcon />,
      action: homeAction
    },
    {
      title: 'Trello workspaces',
      active: false,
      icon: <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        margin: 0,
        borderRadius: '4px',
        fontSize: '14px',
        background: 'linear-gradient(#403294,  #0747a6) !important',
        color: '#fff'
      }}>
        T
      </Box>,
      children: [
        {
          title: 'Boards',
          active: false,
          icon: (
            <svg
              width='24'
              height='24'
              role='presentation'
              focusable='false'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z'
                fill='currentColor'></path>
            </svg>
          )
        },
        {
          title: 'Highlights',
          active: false,
          icon: <FavoriteBorderOutlinedIcon />
        },
        {
          title: 'Views',
          active: false,
          icon: <GridViewOutlinedIcon />
        },
        {
          title: 'Members',
          active: false,
          icon: <PeopleOutlineOutlinedIcon />
        },
        {
          title: 'Settings',
          active: false,
          icon: <SettingsOutlinedIcon />
        }
      ]
    }
  ]
  const handleClickListItem = (index) => {
    setActiveIndex(index)
    if (navigationItems[index]?.action) {
      dispatch((navigationItems[index].action)())
    }
  }

  const styleActiveItem = {
    color: '#0c66e4',
    borderRadius: '8px',
    bgcolor: '#e9f2ff',
    gap: 2,
    '&:hover': {
      bgcolor: '#e9f2ff'
    },
    '.MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px'
    },
    '.MuiListItemIcon-root': {
      color: '#0c66e4',
      minWidth: 'unset',
      '& svg': {
        height: 16,
        width: 16
      }
    }
  }

  const styleNoActiveItem = {
    color: '#172b4d',
    borderRadius: '8px',
    gap: 2,
    '&:hover': {
      bgcolor: '#091e4224'
    },
    '.MuiTypography-root': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px'
    },
    '.MuiListItemIcon-root': {
      color: '#44546f',
      minWidth: 'unset',
      '& svg': {
        height: 16,
        width: 16
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 288,
        bgcolor: 'white'
      }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }}
        component='nav'
        aria-labelledby='nested-list-subheader'>
        {navigationItems.map((item, index) => {
          return (
            !item?.children
              ?
              <ListItemButton
                key={index}
                sx={activeIndex === index ? styleActiveItem : styleNoActiveItem}
                onClick={() => handleClickListItem(index)}>
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.title} />
              </ListItemButton>
              :
              <>
                <Divider/>
                <Typography variant='body1'
                  sx={{
                    color: '#172b4d',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '20px 0px 8px 16px'
                  }}
                >Workspaces</Typography>
                <ListItemButton
                  onClick={handleClick}
                  key={index}
                  sx={styleNoActiveItem}
                >
                  <ListItemIcon>
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText primary='Trello workspaces' />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </>
          )
        })}
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {
              navigationItems[3]?.children?.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    sx={activeIndex === (index + 1 + navigationItems.length) ? { ...styleActiveItem, pl: 4 } : { ...styleNoActiveItem, pl: 4 }}
                    onClick={() => handleClickListItem(index + 1 + navigationItems.length)}
                  >
                    <ListItemIcon>
                      {item?.icon}
                    </ListItemIcon>
                    <ListItemText primary={item?.title} />
                  </ListItemButton>
                )
              })
            }
          </List>
        </Collapse>
      </List>
    </Box>
  )
}

export default SidebarBoards
