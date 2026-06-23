import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand + About */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">PhotoGallery</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Share and discover amazing photos from around the world. Join our community of photographers and creators.
            </p>
            
            {/* Social Icons - react-icons version */}
            <div className="flex gap-4 text-xl">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-2.5-.01-5.01.01-7.51z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact + Subscribe */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="text-purple-500" />
                <span>hello@photogallery.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="text-purple-500" />
                <span>+233 24 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-purple-500" />
                <span>Accra, Ghana</span>
              </li>
            </ul>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe}>
              <label className="text-white font-semibold mb-2 block">Subscribe</label>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-gray-900 border-gray-700 rounded-l-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-r-lg transition-all duration-200"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 PhotoGallery. All rights reserved. Built with ❤️ in Accra by Vasco Galley 
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;