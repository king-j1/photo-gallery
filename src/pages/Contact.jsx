import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  // useState = React hook to store form data in component memory
  // formData = object holding all input values
  // setFormData = function to update formData
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'booking', // FIX: Changed from 'type' to 'inquiry_type' to match Django model field
    message: ''
  });
  
  // submitted = track if form was sent successfully
  // used to show success message instead of form
  const [submitted, setSubmitted] = useState(false);
  
  // loading = prevent double-clicks while sending to server
  const [loading, setLoading] = useState(false);

  // handleChange = runs every time user types in input
  // e = event object from input
  // ...formData = spread operator keeps other fields unchanged
  // [e.target.name] = dynamic key. 'name', 'email', etc based on input name attribute
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleSubmit = runs when user clicks "Send Message" button
  // async = allows using await for API calls
  // e.preventDefault() = stop browser from reloading page on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state, disable button
    
    try {
      // fetch = browser API to send HTTP request to Django backend
      // 'http://127.0.0.1:8000/api/contact/' = Django API endpoint from urls.py
      const res = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST', // POST = create new data in database
        headers: {
          'Content-Type': 'application/json' // Tell Django we're sending JSON data
        },
        body: JSON.stringify(formData) // Convert JS object to JSON string
      });
      
      // res.ok = true if HTTP status 200-299. Django returns 201 for created
      if(res.ok) {
        setSubmitted(true); // Show success message
        setFormData({ name: '', email: '', phone: '', inquiry_type: 'booking', message: '' }); // Clear form
      } else {
        // If Django returns 400 error, log it for debugging
        const errorData = await res.json();
        console.error('Form error:', errorData);
        alert('Error: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      // Catch network errors like Django server offline
      console.error('Network error:', error);
      alert('Network error. Is Django server running on port 8000?');
    }
    
    setLoading(false); // Re-enable button
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Cinematic Background - full screen image with gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=2070&auto=format&fit=crop"
          alt="Studio background"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
      </div>

      {/* Navbar Spacer - pushes content down so navbar doesn't overlap */}
      <div className="h-20"></div>

      {/* Contact Content - relative z-10 puts it above background */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
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
            
            {/* Contact Form - Glassmorphism card effect */}
            <div className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              
              {/* Success message - only shows when submitted=true */}
              {submitted && (
                <div className="bg-green-500/20 border-green-500/50 rounded-lg p-4 mb-6 animate-fade-in">
                  <p className="text-green-400 font-semibold">✓ Message sent successfully!</p>
                  <p className="text-sm text-gray-300 mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {/* Form - onSubmit calls handleSubmit function */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name" // Must match Django model field name
                    value={formData.name} // Controlled input: value comes from state
                    onChange={handleChange} // Update state on every keystroke
                    required // HTML5 validation
                    className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email" // Must match Django model field name
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
                      name="phone" // Must match Django model field name
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                      placeholder="+233 XX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Type *</label>
                  <select
                    name="inquiry_type" // FIX: Changed from 'type' to 'inquiry_type' to match Django ContactMessage.inquiry_type field
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white"
                  >
                    {/* option value must match Django INQUIRY_TYPES choices first value */}
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
                    name="message" // Must match Django model field name
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/5 border-white/10 rounded-lg focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Tell us about your project, preferred dates, or any questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading} // Disable button while sending
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'} // Show loading text
                </button>
              </form>
            </div>

            {/* Contact Info + Studio Image - right column */}
            <div className="space-y-8">
              
              {/* Studio Image */}
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

              {/* Contact Details Card */}
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

              {/* Back to Home Link */}
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