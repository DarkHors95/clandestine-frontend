import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login, register, googleAuthUrl, spotifyAuthUrl } from '../api/auth'
import '../assets/styles/main.css'

const LoginComponent = () => {
  const { user, storeToken, logout } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const fn = mode === 'login' ? login : register
      const data = await fn(email, password)
      if (data.token) {
        storeToken(data.token)
        window.location.href = '/'
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="auth-container">
        <p>Signed in as <strong>{user.email}</strong></p>
        <button className="btn btn-secondary btn-block" onClick={logout}>
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={`auth-tab${mode === 'login' ? ' active' : ''}`}
          onClick={() => { setMode('login'); setError('') }}
          type="button"
        >
          Login
        </button>
        <button
          className={`auth-tab${mode === 'register' ? ' active' : ''}`}
          onClick={() => { setMode('register'); setError('') }}
          type="button"
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-group">
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>

      <div className="auth-divider"><span>or</span></div>

      <a href={googleAuthUrl} className="btn btn-oauth btn-google btn-block">
        Continue with Google
      </a>
      <a href={spotifyAuthUrl} className="btn btn-oauth btn-spotify btn-block">
        Continue with Spotify
      </a>
    </div>
  )
}

export default LoginComponent
