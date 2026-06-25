import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  // STATIC MODELS - hardcoded, no API
  const models = [
    {
      id: 1,
      name: "Queen",
      profile: "Professional fashion & runway model based in Accra",
      main_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
    },
    {
      id: 2,
      name: "Ama",
      profile: "Commercial and lifestyle model",
      main_image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800"
    },
    {
      id: 3,
      name: "Diana",
      profile: "Editorial and beauty model",
      main_image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800"
    }
  ]

  const filteredModels = models.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-4 md:px-12 bg-black border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg"></div>
          <h1 className="text-xl font-bold">PhotoGallery</h1>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="/" className="hover:text-purple-400">Home</a>
          <a href="/about" className="hover:text-purple-400">About</a>
          <a href="/contact" className="hover:text-purple-400">Contact</a>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/login')} className="text-white/70 hover:text-white">Login</button>
          <button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-lg">Signup</button>
        </div>
      </nav>

      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070"
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Browse All Talent</h2>

        <input
          type="text"
          placeholder="Search by name: Queen, Diana..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto block bg-white/5 border-white/20 rounded-xl px-4 py-3 mb-12 text-white placeholder-white/40"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map(model => (
            <div key={model.id} className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
              <img src={model.main_image} alt={model.name} className="w-full h-80 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-white/60 text-sm">{model.profile}</p>
                <button
                  onClick={() => navigate(`/model/${model.id}`)}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No models found</p>
        )}
      </div>
    </div>
  )
}

export default Home