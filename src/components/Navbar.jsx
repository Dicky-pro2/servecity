import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext' // Add this

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth() // Add auth hook

  const links = ["Home", "About us", "Services", "Contact us", "Blog"]

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  const getDashboardLink = () => {
    if (!user) return '/'
    if (user.role === 'client') return '/client/dashboard'
    if (user.role === 'provider') return '/provider/dashboard'
    if (user.role === 'admin') return '/admin/dashboard'
    return '/'
  }

  return (
    <header className={`w-full sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#1A73E8] flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">SC</span>
          </div>
          <span className={`font-extrabold text-lg tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ServeCity
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(item => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              className={`text-sm font-medium transition-colors hover:text-[#1A73E8] ${
                item === "Home"
                  ? "text-[#1A73E8] font-bold"
                  : isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-13 h-7 rounded-full relative transition-colors duration-300 flex items-center ${
              isDark ? 'bg-[#1A73E8]' : 'bg-gray-200'
            }`}
            style={{ width: 52, height: 28 }}
          >
            <div className={`w-[22px] h-[22px] bg-white rounded-full absolute flex items-center justify-center text-xs shadow transition-all duration-300 ${
              isDark ? 'left-[27px]' : 'left-[3px]'
            }`}>
              {isDark ? '🌙' : '☀️'}
            </div>
          </button>

          {/* Auth Section - Shows different content based on login status */}
          {!isAuthenticated ? (
            <>
              {/* Login Button - ADDED */}
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors hover:text-[#1A73E8] ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Log in
              </Link>
              
              {/* Sign Up Button */}
              <Link
                to="/register"
                className="text-sm font-bold text-white bg-[#1A73E8] hover:bg-blue-700 px-6 py-2.5 rounded-full transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            /* User Menu when logged in */
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <svg className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                isDark ? 'bg-[#1a1a1a] border border-[#333]' : 'bg-white border border-gray-200'
              }`}>
                <div className={`px-4 py-2 border-b ${isDark ? 'border-[#333]' : 'border-gray-100'}`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.role === 'client' ? 'Client' : user?.role === 'provider' ? 'Service Provider' : 'Admin'}
                  </p>
                </div>
                <Link
                  to={getDashboardLink()}
                  className={`block px-4 py-2 text-sm ${
                    isDark ? 'text-gray-300 hover:bg-[#333]' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`block px-4 py-2 text-sm ${
                    isDark ? 'text-gray-300 hover:bg-[#333]' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDark ? 'text-gray-300 hover:bg-[#333]' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden flex flex-col gap-[5px] p-2 ${isDark ? 'text-white' : 'text-gray-800'}`}
        >
          <span className={`block w-5 h-0.5 rounded transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'} ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 rounded transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 rounded transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'} ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden border-t px-8 py-5 flex flex-col gap-4 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          {links.map(item => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium hover:text-[#1A73E8] transition-colors ${
                item === "Home" ? "text-[#1A73E8] font-bold" : isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {item}
            </Link>
          ))}
          <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: isDark ? '#222' : '#f0f0f0' }}>
            <button onClick={toggleTheme}
              className={`w-[52px] h-7 rounded-full relative transition-colors duration-300 ${isDark ? 'bg-[#1A73E8]' : 'bg-gray-200'}`}
              style={{ width: 52, height: 28 }}
            >
              <div className={`w-[22px] h-[22px] bg-white rounded-full absolute top-[3px] flex items-center justify-center text-xs shadow transition-all duration-300 ${isDark ? 'left-[27px]' : 'left-[3px]'}`}>
                {isDark ? '🌙' : '☀️'}
              </div>
            </button>
            
            {/* Mobile Auth Section */}
            {!isAuthenticated ? (
              <div className="flex gap-3">
                <Link to="/login" onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Log in
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}
                  className="text-sm font-bold text-white bg-[#1A73E8] px-6 py-2.5 rounded-full">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to={getDashboardLink()} onClick={() => setOpen(false)}
                  className="text-sm font-medium text-[#1A73E8]">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="text-sm font-medium text-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}