import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import {
  Login,
  Signup,
  VerifyOTP,
  Home,
  BuscarMedico,
  Consultas,
  Receitas,
  Perfil,
  Historico,
} from './pages'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { isLoggedIn } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buscar"
        element={
          <ProtectedRoute>
            <BuscarMedico />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultas"
        element={
          <ProtectedRoute>
            <Consultas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receitas"
        element={
          <ProtectedRoute>
            <Receitas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historico"
        element={
          <ProtectedRoute>
            <Historico />
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/login'} />} />
    </Routes>
  )
}

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
