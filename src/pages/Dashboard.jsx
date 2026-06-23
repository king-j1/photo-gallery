import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({})
  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [navigate])

  const fetchDashboard = () => {
    const token = localStorage.getItem('access_token')
    if (!token) return navigate('/login')

    fetch('http://127.0.0.1:8000/api/dashboard/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  .then(res => res.ok? res.json() : Promise.reject('Session expired'))
  .then(data => {
      setUser(data.user)
      setMessages(data.messages)
      setFormData({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        phone: data.user.phone
      })
      setLoading(false)
    })
  .catch(() => {
      localStorage.clear()
      navigate('/login')
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    const formDataToSend = new FormData()

    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]))
    if (avatarFile) formDataToSend.append('avatar', avatarFile)

    const res = await fetch('http://127.0.0.1:8000/api/update-profile/', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formDataToSend
    })

    if (res.ok) {
      setShowEdit(false)
      fetchDashboard()
    }
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('access_token')
    const res = await fetch('http://127.0.0.1:8000/api/delete-account/', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.ok) {
      localStorage.clear()
      navigate('/signup')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"><div className="text-white text-xl animate-pulse">Loading...</div></div>

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
              <img src={`http://127.0.0.1:8000${user.avatar}`} alt="avatar" className="w-24 h-24 rounded-full object-cover border-2 border-purple-500" />
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
              <input type="text" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" />
              <input type="text" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border-white/20 rounded-xl px-4 py-3 text-white" />
              <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} className="w-full text-white/60 text-sm" />

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
            <p className="text-white/70 mb-6">This will permanently delete your account and all messages. This action cannot be undone.</p>
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

export default Dashboard