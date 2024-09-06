import { Box, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import AppBar from '~/components/AppBar/AppBar'
import SidebarBoards from '../Boards/SidebarBoards/SidebarBoards'
import { useEffect, useState } from 'react'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { paramsDecodeUrlBase64 } from '~/utils/formatters'

function Dashboard() {
  let DashboardPageContent = useSelector(state => state.dashboardPageContentReducer)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const userId = paramsDecodeUrlBase64()

    const fetchAccess = async () => {
      await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`)
    }
    fetchAccess()
    const handleFetchUserAPI = async () => {
      const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/getUser/${userId}`)
      setUserInfo(res.data)
    }
    handleFetchUserAPI()
  }, [])
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
      <DashboardPageContent userInfo={userInfo}/>
    </Box>
  </Container>
}

export default Dashboard
