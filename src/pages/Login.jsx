import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/api.js'

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

  // REAL LOGIN - hits Django
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(formData.username, formData.password)
      
      // Save REAL JWT tokens from Django
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('is_logged_in', 'true')
      
      navigate('/dashboard')
    } catch (err) {
      setError(err.body || 'Invalid username or password')
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
        
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-white/60 text-center mt-6">
          Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-purple-300">Sign up here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login