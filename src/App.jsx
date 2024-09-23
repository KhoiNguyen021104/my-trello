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

  const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (!user) return <Navigate to="/" replace={true} />
    return <Outlet/>
  }
  const UnauthorizedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) return <Navigate to={`/dashboard/${encodeURIComponent(btoa(JSON.stringify(user._id)))}`}replace={true} />
    return <Outlet/>
  }

  return <>
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />
      <Route element={<PrivateRegisterRoute/>}>
        <Route path="/verifyAccount/:data" element={<VerifyOTP />} />
        <Route path="/finalizeStepRegister/:data" element={<FinalizeStepRegister />} />
      </Route>
      <Route element={<UnauthorizedRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/:_id" element={<Dashboard />} />
        <Route path="/board/:_id" element={<Board />} />
      </Route>
    </Routes>
  </>
}

export default App