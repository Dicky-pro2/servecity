// src/pages/public/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Login() {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'client'
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password, formData.role);
      
      if (result.success) {
        if (formData.role === 'client') {
          navigate(from === '/' ? '/client/dashboard' : from);
        } else if (formData.role === 'provider') {
          navigate(from === '/' ? '/provider/dashboard' : from);
        } else if (formData.role === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth will be implemented later
    console.log('Google login clicked');
  };

  // Demo credentials for testing
  const demoCredentials = {
    client: { email: 'client@test.com', password: 'password123' },
    provider: { email: 'provider@test.com', password: 'password123' },
    admin: { email: 'admin@test.com', password: 'admin123' }
  };

  const fillDemoCredentials = (role) => {
    setFormData({
      ...formData,
      email: demoCredentials[role].email,
      password: demoCredentials[role].password,
      role: role
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 py-12 md:py-20">
        {/* Login Card */}
        <div className={`rounded-2xl border p-8 transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#1A73E8]/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className={`text-2xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Welcome back
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Sign in to your ServeCity account
            </p>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border transition-colors mb-6 ${
              isDark 
                ? 'bg-[#1a1a1a] border-[#333] text-white hover:bg-[#252525]' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-[#222]' : 'border-gray-200'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-3 ${isDark ? 'bg-[#141414] text-gray-400' : 'bg-white text-gray-500'}`}>
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
                placeholder="you@example.com"
              />
            </div>
            
            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            {/* Role Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Sign in as
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'client', label: 'Client', icon: '👤' },
                  { value: 'provider', label: 'Provider', icon: '🛠️' },
                  { value: 'admin', label: 'Admin', icon: '👑' }
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({...formData, role: role.value})}
                    className={`py-2 px-3 rounded-xl border-2 transition-all text-sm font-medium ${
                      formData.role === role.value
                        ? 'border-[#1A73E8] bg-[#1A73E8]/10 text-[#1A73E8]'
                        : isDark
                          ? 'border-[#333] text-gray-400 hover:border-[#555]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{role.icon}</div>
                    <div>{role.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#1A73E8] w-4 h-4" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Remember me
                </span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#1A73E8] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1A73E8] text-white rounded-full font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <Link to="/register" className="text-[#1A73E8] font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Helper */}
        <div className={`mt-6 p-4 rounded-xl ${
          isDark ? 'bg-[#141414]' : 'bg-white'
        } border ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
          <p className={`text-xs font-medium mb-2 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            🧪 Demo Credentials (Click to auto-fill):
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => fillDemoCredentials('client')}
              className="text-xs px-3 py-1.5 rounded-full bg-[#1A73E8] text-white hover:bg-blue-700 transition"
            >
              👤 Client Demo
            </button>
            <button
              onClick={() => fillDemoCredentials('provider')}
              className="text-xs px-3 py-1.5 rounded-full bg-[#1A73E8] text-white hover:bg-blue-700 transition"
            >
              🛠️ Provider Demo
            </button>
            <button
              onClick={() => fillDemoCredentials('admin')}
              className="text-xs px-3 py-1.5 rounded-full bg-[#1A73E8] text-white hover:bg-blue-700 transition"
            >
              👑 Admin Demo
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}