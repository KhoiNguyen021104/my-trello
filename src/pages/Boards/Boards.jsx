import { Box, Container } from '@mui/material'
import SidebarBoards from './SidebarBoards/SidebarBoards'
import AppBar from '~/components/AppBar/AppBar'
import { useSelector } from 'react-redux'

function Boards() {
  let DashboardPageContent = useSelector(state => state.dashboardPageContentReducer)

  return <Container
    disableGutters
    maxWidth={false}
    sx={{
      height: '100vh',
      maxHeight: '100vh'
    }}>
    <AppBar />
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      mt: '32px'
    }}>
      <SidebarBoards/>
      <DashboardPageContent />
    </Box>
  </Container>
}

export default Boards
