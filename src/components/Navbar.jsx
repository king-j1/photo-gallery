import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05050b]/95 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-slate-900 shadow-[0_25px_60px_rgba(168,85,247,0.24)]">
            <span className="text-lg font-semibold text-white">T</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.48em] text-gray-400">Tugbe Studio</p>
            <p className="text-lg font-semibold text-white">The Fashion Collective</p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium uppercase tracking-[0.18em] text-gray-300 transition-colors duration-200 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold uppercase tracking-[0.20em] text-gray-300 transition-colors duration-200 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 px-6 py-2 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/25 transition duration-200 hover:-translate-y-0.5"
          >
            Join Access
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 transition-colors duration-200 hover:text-white"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#05050b]/95 p-4 shadow-[0_25px_50px_rgba(0,0,0,0.22)]">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block rounded-3xl px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block rounded-3xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/25"
            >
              Join Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
