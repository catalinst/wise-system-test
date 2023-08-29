import { Route, Routes } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'

const RouterConfig = () => (
  <Routes>
    <Route exact path={'/'} element={<Login />} />
    <Route exact path={'/register'} element={<Register />} />
    <Route exact path={'/dashboard'} element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default RouterConfig
