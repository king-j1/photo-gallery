import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'booking',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // STATIC SUBMIT - no API call
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Fake "sending" delay so it feels real
    setTimeout(() => {
      // Save to localStorage as demo
      const existingMessages = JSON.parse(localStorage.getItem('demo_contact_messages') || '[]')
      const newMessage = {
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString()
      }
      localStorage.setItem('demo_contact_messages', JSON.stringify([...existingMessages, newMessage]))
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', inquiry_type: 'booking', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=2070&auto=format&fit=crop"
          alt="Studio background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
      </div>

      <div className="h-20"></div>

      <div className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let's Create Together
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Book our studio, join our talent network, or discuss your next project. 
              We're ready to bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              
              {submitted && (
                <div className="bg-green-500/20 border-green-500/50 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-semibold">✓ Message saved locally!</p>
                  <p className="text-sm text-gray-300 mt-1">Demo mode: No backend needed. Check browser console to see saved data.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      placeholder="john@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      placeholder="+233 XX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type *</label>
                  <select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white"
                  >
                    <option value="booking" className="bg-gray-900">Book Studio Session</option>
                    <option value="talent" className="bg-gray-900">Join Talent Network</option>
                    <option value="commercial" className="bg-gray-900">Commercial Project</option>
                    <option value="collaboration" className="bg-gray-900">Brand Collaboration</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden h-64 lg:h-80">
                <img
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
                  alt="Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-sm text-gray-300">Professional Studio</p>
                  <p className="text-2xl font-bold">Accra, Ghana</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl p-8 space-y-6">
                <h3 className="text-2xl font-bold mb-4">Get in Touch Directly</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email</p>
                    <a href="mailto:hello@yourstudio.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                      hello@yourstudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Phone</p>
                    <a href="tel:+233XXXXXXXXX" className="text-gray-300 hover:text-purple-400 transition-colors">
                      +233 XX XXXX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Studio Location</p>
                    <p className="text-gray-300">East Legon, Accra<br/>Greater Accra Region, Ghana</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">Business Hours</p>
                  <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sat: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-300">Sun: By Appointment</p>
                </div>
              </div>

              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;