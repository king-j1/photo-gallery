{/*import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({})
  const [avatarPreview, setAvatarPreview] = useState(null)

  // Load user + messages from localStorage instead of API
  useEffect(() => {
    const savedUser = localStorage.getItem('demo_user')
    const savedMessages = localStorage.getItem('demo_messages')

    // Create demo user if none exists
    const defaultUser = savedUser? JSON.parse(savedUser) : {
      first_name: "Demo",
      last_name: "User",
      username: "demouser",
      email: "demo@example.com",
      phone: "+233 24 000 0000",
      avatar: null
    }

    // Demo messages
    const defaultMessages = savedMessages? JSON.parse(savedMessages) : [
      {
        id: 1,
        inquiry_type_display: "Booking Inquiry",
        message: "Hi, I'd like to book Queen for a photoshoot next week.",
        admin_reply: "Thanks! We'll get back to you within 24 hours.",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        inquiry_type_display: "General Question",
        message: "Do you work with commercial brands?",
        admin_reply: null,
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]

    setUser(defaultUser)
    setMessages(defaultMessages)
    setFormData({
      first_name: defaultUser.first_name,
      last_name: defaultUser.last_name,
      email: defaultUser.email,
      phone: defaultUser.phone
    })
    setAvatarPreview(defaultUser.avatar)
    setLoading(false)
  }, [])

  // Save to localStorage whenever user changes
  const saveUser = (newUser) => {
    setUser(newUser)
    localStorage.setItem('demo_user', JSON.stringify(newUser))
  }

  const saveMessages = (newMessages) => {
    setMessages(newMessages)
    localStorage.setItem('demo_messages', JSON.stringify(newMessages))
  }

  // Handle avatar upload - converts to base64
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // UPDATE - no API, just localStorage
  const handleUpdate = (e) => {
    e.preventDefault()
    const updatedUser = {
     ...user,
     ...formData,
      avatar: avatarPreview
    }
    saveUser(updatedUser)
    setShowEdit(false)
    alert('Profile updated! Saved locally.')
  }

  // DELETE - clear localStorage
  const handleDelete = () => {
    localStorage.removeItem('demo_user')
    localStorage.removeItem('demo_messages')
    alert('Account deleted locally')
    navigate('/signup')
  }

  // LOGOUT - just clear token if you had one
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="text-white text-xl animate-pulse">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -top-60 -left-60 animate-float"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl -bottom-40 -right-40 animate-float-delayed"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_10px_rgba(138,43,226,0.5)]">Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-red-300 px-6 py-2 rounded-xl transition-all backdrop-blur-sm">Logout</button>
        </div>

        {/* Profile Card /}
        
        <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {user?.avatar? (
              <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover border-2 border-purple-500" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{user?.first_name} {user?.last_name}</h2>
              <p className="text-white/60">@{user?.username}</p>
              <p className="text-white/60 text-sm">{user?.email}</p>
              {user?.phone && <p className="text-white/60 text-sm">{user?.phone}</p>}

              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <button onClick={() => setShowEdit(true)} className="bg-purple-600/30 hover:bg-purple-600/50 text-white px-5 py-2 rounded-xl transition-all backdrop-blur-sm">Edit Profile</button>
                <button onClick={() => setShowDeleteConfirm(true)} className="bg-red-600/30 hover:bg-red-600/50 text-red-300 px-5 py-2 rounded-xl transition-all backdrop-blur-sm">Delete Account</button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages /}
        <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6">Your Messages</h3>
          {messages.length === 0? (
            <p className="text-white/60 text-center py-10">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="bg-white/5 border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-400 text-sm font-semibold">{msg.inquiry_type_display}</span>
                    <span className="text-white/40 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-white/80 text-sm">{msg.message}</p>
                  {msg.admin_reply && (
                    <div className="bg-purple-500/10 border-l-4 border-purple-500 pl-4 py-2 mt-3">
                      <p className="text-purple-300 text-xs font-semibold mb-1">Admin Reply:</p>
                      <p className="text-white/80 text-sm">{msg.admin_reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal /}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-6">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input type="text" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" required />
              <input type="text" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" required />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" required />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full text-white/60 text-sm" />
              {avatarPreview && <img src={avatarPreview} alt="preview" className="w-16 h-16 rounded-full object-cover mx-auto" />}

              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">Save</button>
                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal /}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Delete Account?</h3>
            <p className="text-white/70 mb-6">This will clear your profile data from this browser. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl">Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }
       .animate-float { animation: float 20s infinite ease-in-out; }
       .animate-float-delayed { animation: float 15s infinite ease-in-out reverse; }
      `}</style>
    </div>
  )
}

export default Dashboard */}


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../api/api.js'

const API_URL = import.meta.env.VITE_API_URL || 'https://api-project-production-257e.up.railway.app'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({})
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)

  const getToken = () => localStorage.getItem('access_token')

  // Load user + messages from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = getToken()
        if (!token) {
          navigate('/login')
          return
        }

        // 1. GET PROFILE
        const res = await fetch(`${API_URL}/api/profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.status === 401) { // token expired
          localStorage.clear()
          navigate('/login')
          return
        }
        if (!res.ok) throw new Error('Failed to fetch profile')

        const userData = await res.json()
        setUser(userData)
        setFormData(userData) // prefill edit form

        // 2. GET MESSAGES - only if you have this endpoint
        const msgRes = await fetch(`${API_URL}/api/dashboard/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (msgRes.ok) {
          const msgData = await msgRes.json()
          setMessages(msgData.messages || [])
        }

        setLoading(false)

      } catch (err) {
        console.error("Dashboard loading failed:", err)
        localStorage.clear()
        navigate('/login')
        setLoading(false)
      }
    }
    loadData()
  }, [navigate])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('first_name', formData.first_name || '')
      formDataToSend.append('last_name', formData.last_name || '')
      formDataToSend.append('email', formData.email || '')
      formDataToSend.append('phone', formData.phone || '')
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile)
      }

      const updatedUser = await updateProfile(formDataToSend)
      setUser(updatedUser)
      localStorage.setItem('demo_user', JSON.stringify(updatedUser))
      setShowEdit(false)
      setAvatarFile(null)
      alert('Profile updated!')
    } catch (err) {
      console.error(err)
      alert('Error saving profile: ' + (err.body || err.message))
    }
  }

  // DELETE - FIXED ENDPOINT
  const handleDelete = async () => {
    try {
      const token = getToken()
      const res = await fetch(`${API_URL}/api/delete-account/`, { // <-- FIXED
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if(!res.ok) throw new Error('Delete failed')

      localStorage.clear()
      alert('Account deleted')
      navigate('/signup')
    } catch (err) {
      alert('Error deleting account: ' + err.message)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="text-white text-xl animate-pulse">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-8">
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -top-60 -left-60 animate-float"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl -bottom-40 -right-40 animate-float-delayed"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_10px_rgba(138,43,226,0.5)]">Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-red-300 px-6 py-2 rounded-xl transition-all backdrop-blur-sm">Logout</button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {user?.avatar? (
              <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover border-2 border-purple-500" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{user?.first_name} {user?.last_name}</h2>
              <p className="text-white/60">@{user?.username}</p>
              <p className="text-white/60 text-sm">{user?.email}</p>
              {user?.phone && <p className="text-white/60 text-sm">{user?.phone}</p>}

              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <button onClick={() => setShowEdit(true)} className="bg-purple-600/30 hover:bg-purple-600/50 text-white px-5 py-2 rounded-xl transition-all backdrop-blur-sm">Edit Profile</button>
                <button onClick={() => setShowDeleteConfirm(true)} className="bg-red-600/30 hover:bg-red-600/50 text-red-300 px-5 py-2 rounded-xl transition-all backdrop-blur-sm">Delete Account</button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6">Your Messages</h3>
          {messages.length === 0? (
            <p className="text-white/60 text-center py-10">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="bg-white/5 border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-400 text-sm font-semibold">{msg.inquiry_type_display}</span>
                    <span className="text-white/40 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-white/80 text-sm">{msg.message}</p>
                  {msg.admin_reply && (
                    <div className="bg-purple-500/10 border-l-4 border-purple-500 pl-4 py-2 mt-3">
                      <p className="text-purple-300 text-xs font-semibold mb-1">Admin Reply:</p>
                      <p className="text-white/80 text-sm">{msg.admin_reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-white mb-6">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input type="text" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" required />
              <input type="text" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" required />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" required />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full text-white/60 text-sm" />
              {avatarPreview && <img src={avatarPreview} alt="preview" className="w-16 h-16 rounded-full object-cover mx-auto" />}

              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">Save</button>
                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Delete Account?</h3>
            <p className="text-white/70 mb-6">This will permanently delete your account. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl">Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }
      .animate-float { animation: float 20s infinite ease-in-out; }
      .animate-float-delayed { animation: float 15s infinite ease-in-out reverse; }
      `}</style>
    </div>
  )
}

export default Dashboard