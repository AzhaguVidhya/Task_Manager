import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Dashboard'
import ProtectedRoute from './Components/ProtectedRoute'
// import Demo from './Pages/Demo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tasks" element={<Dashboard/>} />
          <Route path="/dashboard/calendar" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
        {/* <Route path='/demo' element ={ <Demo/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App