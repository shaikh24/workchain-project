// src/App.jsx
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            WorkChain
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">Jobs</a>
            <a href="#" className="hover:text-blue-500">Auth</a>
            <a href="#" className="hover:text-blue-500">Wallet</a>
          </div>

          {/* Profile Button (desktop) */}
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
              Profile
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              {menuOpen ? (
                <span className="text-2xl">✖</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-md px-6 py-4 space-y-4">
            <a href="#" className="block hover:text-blue-500">Home</a>
            <a href="#" className="block hover:text-blue-500">Jobs</a>
            <a href="#" className="block hover:text-blue-500">Auth</a>
            <a href="#" className="block hover:text-blue-500">Wallet</a>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
              Profile
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="flex flex-1 items-center justify-center text-center px-6 py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to WorkChain 🚀
          </h1>
          <p className="text-lg md:text-xl mb-8">
            A decentralized platform to find jobs, manage wallets, and grow your career.  
            Simple, fast, and secure.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 shadow">
              Get Started
            </button>
            <button className="bg-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-800 shadow">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Counter Section */}
      <section className="py-16 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Counter Demo</h2>
        <p className="text-lg mb-6">Count is {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Increase Count
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} WorkChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
