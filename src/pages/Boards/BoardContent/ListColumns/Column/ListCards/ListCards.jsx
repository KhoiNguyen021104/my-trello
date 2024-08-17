import Box from '@mui/material/Box'
import TrelloCard from './Card/TrelloCard'
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Button, TextField } from '@mui/material'
import { Bounce, toast } from 'react-toastify'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'


function ListCards({ cards, openNewCardForm, setOpenNewCardForm }) {
  // Add new card
  const [newCardTitle, setNewCardTitle] = useState('')

  const toggleNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    setNewCardTitle('')
  }
  const handleAddNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter list title',
        {
          position: 'bottom-right',
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
    toggleNewCardForm()
    toast.success('Add new card successfully',
      {
        position: 'bottom-right',
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
      items={cards.map((c) => c._id)}
      strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: '0 5px',
          m: '0 5px',
          paddingBottom: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) =>
            `calc(${theme.app.BOARD_CONTENT_HEIGHT} 
        - ${theme.spacing(5)} 
        - ${theme.app.COLUMN_HEADER_HEIGHT}
        - ${theme.app.COLUMN_FOOTER_HEIGHT})`,
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}>
        {cards?.map((card) => (
          <TrelloCard
            key={card?._id}
            card={card}
            noMediaCard={card?.cover ? false : true}
          />
        ))}
        { openNewCardForm &&
        <Box
          sx={{
            width: (theme) => theme?.app?.WIDTH_CARD,
            maxWidth: (theme) => theme?.app?.WIDTH_CARD,
            minWidth: (theme) => theme?.app?.WIDTH_CARD,
            height: '100%',
            display: 'flex',
            alignItems: 'start',
            gap: 1.5,
            flexDirection: 'column',
            borderRadius: '8px',
            marginTop: '4px',
            paddingBottom: '16px',
            pt: cards[0].FE_PlaceholderCard ? '12px' : 0
          }}
          data-no-dnd='true'>
          <TextField
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            variant='outlined'
            autoFocus
            autoComplete='off'
            fullWidth
            placeholder='Enter a name for this card...'
            type='text'
            size='small'
            sx={{
              width: '100%',
              maxWidth: '100%',
              borderColor: '#8590A2',
              borderRadius: '4px',
              bgcolor: '#ffffff',
              '& input': { color: '#172b4d' },
              '& input::placeholder': {
                color: '#626F86 !important',
                opacity: 1
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'none', border: 'none' },
                '&:hover fieldset': {
                  boxShadow: 'inset 0 0 0 2px var(--ds-border-focused,#388bff)'
                },
                '&.Mui-focused fieldset': {
                  boxShadow: 'inset 0 0 0 2px var(--ds-border-focused,#388bff)'
                }
              }
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size='small'
              variant='contained'
              onClick={handleAddNewCard}
              sx={{
                bgcolor: '#0C66E4',
                '&.MuiButton-root:hover': {
                  bgcolor: '#0055CC'
                }
              }}>
              Add card
            </Button>
            <CloseIcon
              sx={{
                color: 'red',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red'
                }
              }}
              fontSize='small'
              onClick={toggleNewCardForm}
            />
          </Box>
        </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListCards
