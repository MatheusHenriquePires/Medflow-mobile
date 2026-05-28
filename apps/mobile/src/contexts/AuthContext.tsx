import { createContext, useContext, useState } from 'react'
import type { User, ReactNode } from '../types'
import { loginUser, signupUser, updateProfile } from '../services/api'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => Promise<User>
  logout: () => void
  signup: (user: User) => Promise<User>
  updateUser: (user: Partial<User>) => Promise<User | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const storageKey = 'medflow:user'

const getSavedUser = () => {
  const savedUser = window.localStorage.getItem(storageKey)
  return savedUser ? (JSON.parse(savedUser) as User) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSavedUser())
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getSavedUser()))

  const persistUser = (userData: User) => {
    const userToStore = { ...userData, senha: '' }
    setUser(userToStore)
    setIsLoggedIn(true)
    window.localStorage.setItem(storageKey, JSON.stringify(userToStore))
    return userToStore
  }

  const login = async (userData: User) => {
    const authenticatedUser = await loginUser(userData.email, userData.senha)
    return persistUser(authenticatedUser)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    window.localStorage.removeItem(storageKey)
  }

  const signup = async (userData: User) => {
    const authenticatedUser = await signupUser(userData)
    return persistUser(authenticatedUser)
  }

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const nextUser = await updateProfile(user, userData)
      return persistUser(nextUser)
    }

    return null
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
