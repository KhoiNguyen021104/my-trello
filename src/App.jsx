import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Auth/Login/login'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Register from './pages/Auth/Register/Register'
import Board from './pages/Boards/_id'
import VerifyOTP from './pages/Auth/Register/VerifyOtp'
import FinalizeStepRegister from './pages/Auth/Register/FinalizeStepRegister'

function App() {
  const PrivateRegisterRoute = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (!userInfo) return <Navigate to="/" replace={true} />
    return <Outlet/>
  }
  return <>
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />
      <Route element={<PrivateRegisterRoute/>}>
        <Route path="/verifyAccount" element={<VerifyOTP />} />
        <Route path="/finalizeStepRegister" element={<FinalizeStepRegister />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  </>
}

export default App