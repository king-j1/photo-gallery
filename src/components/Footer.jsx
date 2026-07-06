import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-[#040407] text-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-slate-900 shadow-[0_20px_60px_rgba(168,85,247,0.22)]">
                <span className="text-lg font-semibold text-white">T</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-gray-400">Tugbe Studio</p>
                <p className="text-xl font-semibold text-white">Luxury Model Agency</p>
              </div>
            </div>
            <p className="max-w-xl text-gray-400">
              Discover premium fashion talent, editorial portfolios, and campaign-ready models curated for luxury brands.
            </p>
            <div className="flex items-center gap-4 text-2xl text-gray-400">
              <a href="#" className="transition hover:text-white"><FaInstagram /></a>
              <a href="#" className="transition hover:text-white"><FaFacebookF /></a>
              <a href="#" className="transition hover:text-white"><FaTwitter /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Explore</h3>
            <ul className="mt-6 space-y-3 text-sm text-gray-300">
              <li><Link to="/" className="transition hover:text-white">Home</Link></li>
              <li><Link to="/about" className="transition hover:text-white">About</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
              <li><Link to="/login" className="transition hover:text-white">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">Stay in the loop</h3>
            <p className="mt-4 text-sm text-gray-400">Join our newsletter for exclusive castings and production updates.</p>
            <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-3xl border border-white/10 bg-[#09090f] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-fuchsia-500 focus:outline-none"
              />
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5">
                <Send size={18} className="mr-2" /> Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 Tugbe Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
