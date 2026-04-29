import React, { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('clandestine_token') : null
  )

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    getMe(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('clandestine_token')
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  function storeToken(t) {
    localStorage.setItem('clandestine_token', t)
    setToken(t)
  }

  function logout() {
    localStorage.removeItem('clandestine_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, storeToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
