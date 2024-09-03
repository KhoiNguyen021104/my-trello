import { Box, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import AppBar from '~/components/AppBar/AppBar'
import SidebarBoards from '../Boards/SidebarBoards/SidebarBoards'

function Dashboard() {
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

export default Dashboard
