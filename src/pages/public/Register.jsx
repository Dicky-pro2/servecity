// src/pages/public/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Register() {
  const { isDark } = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client' // client or provider
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      });
      
      if (result.success) {
        // Redirect based on role
        if (formData.role === 'client') {
          navigate('/client/dashboard');
        } else if (formData.role === 'provider') {
          navigate('/provider/dashboard');
        } else {
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

  const handleGoogleRegister = () => {
    // Google OAuth will be implemented later
    console.log('Google register clicked');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg ${
        isDark ? 'bg-[#1a1a1a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create an account
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join ServeCity as a client or service provider
          </p>
        </div>

        {/* Google Register Button */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border transition-colors ${
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-[#333]' : 'border-gray-200'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${isDark ? 'bg-[#1a1a1a] text-gray-400' : 'bg-white text-gray-500'}`}>
              Or register with email
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0a0a0a] border-[#333] text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0a0a0a] border-[#333] text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0a0a0a] border-[#333] text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0a0a0a] border-[#333] text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0a0a0a] border-[#333] text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I want to join as *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'client'})}
                  className={`py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.role === 'client'
                      ? 'border-[#1A73E8] bg-[#1A73E8]/10 text-[#1A73E8]'
                      : isDark
                        ? 'border-[#333] text-gray-400 hover:border-[#555]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Client</div>
                  <div className="text-xs mt-1">Hire service providers</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'provider'})}
                  className={`py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.role === 'provider'
                      ? 'border-[#1A73E8] bg-[#1A73E8]/10 text-[#1A73E8]'
                      : isDark
                        ? 'border-[#333] text-gray-400 hover:border-[#555]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Service Provider</div>
                  <div className="text-xs mt-1">Offer services & earn</div>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#1A73E8] text-white rounded-lg font-semibold hover:bg-[#1557b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
          
          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-[#1A73E8] hover:underline font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}