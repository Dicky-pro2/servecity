// src/pages/Profile.jsx
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Profile Settings
        </h1>
        <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-[#0a0a0a] border-[#333] text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-[#0a0a0a] border-[#333] text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Role
              </label>
              <input
                type="text"
                value={user?.role === 'client' ? 'Client' : user?.role === 'provider' ? 'Service Provider' : 'Admin'}
                disabled
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-[#0a0a0a] border-[#333] text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
              />
            </div>
            <div className="pt-4 text-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Profile editing features coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}