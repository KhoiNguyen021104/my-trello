import Box from '@mui/material/Box'
import TrelloCard from './Card/TrelloCard'

function ListCards() {
  return (
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
      <TrelloCard/>
      <TrelloCard noMediaCard/>
    </Box>
  )
}

export default ListCards
