import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold text-white">Tugbe</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-purple-500/30"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:bg-gray-900 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-800 space-y-2">
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)} 
                className="block px-4 py-2 text-gray-300 hover:bg-gray-900 rounded-lg"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                onClick={() => setIsOpen(false)} 
                className="block mx-4 py-2 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;