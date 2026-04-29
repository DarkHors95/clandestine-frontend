import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const AuthCallback = () => {
  const { storeToken } = useAuth()
  const [status, setStatus] = useState('Processing...')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      storeToken(token)
      setStatus('Logged in! Redirecting...')
      window.location.href = '/'
    } else {
      setStatus('Login failed — no token received.')
    }
  }, [storeToken])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>{status}</p>
    </div>
  )
}

export default AuthCallback
