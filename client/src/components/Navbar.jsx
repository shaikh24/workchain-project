import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            WorkChain
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/gigs" className="text-gray-700 hover:text-indigo-600">Gigs</Link>
            <Link to="/messages" className="text-gray-700 hover:text-indigo-600">Messages</Link>
            <Link to="/wallet" className="text-gray-700 hover:text-indigo-600">Wallet</Link>
            <Link to="/profile" className="text-gray-700 hover:text-indigo-600">Profile</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 border border-indigo-600 rounded-lg text-indigo-600 hover:bg-indigo-50"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/gigs" className="block text-gray-700 hover:text-indigo-600">Gigs</Link>
            <Link to="/messages" className="block text-gray-700 hover:text-indigo-600">Messages</Link>
            <Link to="/wallet" className="block text-gray-700 hover:text-indigo-600">Wallet</Link>
            <Link to="/profile" className="block text-gray-700 hover:text-indigo-600">Profile</Link>

            <hr className="my-2" />

            <Link
              to="/login"
              className="block px-4 py-2 border border-indigo-600 rounded-lg text-indigo-600 text-center hover:bg-indigo-50"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
