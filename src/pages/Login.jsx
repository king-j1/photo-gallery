import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        localStorage.setItem('user', JSON.stringify(data.user))

        navigate('/dashboard')
      } else {
        setError(data.detail || 'Invalid username or password')
      }
    } catch (err) {
      setError('Connection error. Make sure Django server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">

      {/* Animated background blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl -top-52 -left-52 animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-3xl -bottom-40 -right-40 animate-float-delayed"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 md:p-10">

        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-[0_2px_10px_rgba(138,43,226,0.5)]">
          Welcome Back
        </h1>
        <p className="text-white/70 text-center mb-8 text-sm">Login to your Talent Hub account</p>

        {error && (
          <div className="bg-red-500/20 border-red-500/40 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all backdrop-blur-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-white/60 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
            Sign up here
          </Link>
        </p>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }
       .animate-float {
          animation: float 20s infinite ease-in-out;
        }
       .animate-float-delayed {
          animation: float 15s infinite ease-in-out reverse;
        }
      `}</style>
    </div>
  )
}

export default Login