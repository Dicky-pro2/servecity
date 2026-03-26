// src/pages/admin/UserManagement.jsx
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_ALL_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "08012345678", role: "client", joined: "2024-01-15", bookings: 12, status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "08087654321", role: "provider", joined: "2024-01-20", jobs: 24, earnings: 187500, status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "08011223344", role: "client", joined: "2024-02-01", bookings: 5, status: "active" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "08055667788", role: "provider", joined: "2024-02-10", jobs: 8, earnings: 65000, status: "suspended" },
  { id: 5, name: "David Brown", email: "david@example.com", phone: "08099887766", role: "client", joined: "2024-02-15", bookings: 3, status: "active" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", phone: "08044556677", role: "provider", joined: "2024-02-20", jobs: 15, earnings: 112000, status: "active" }
];

export default function UserManagement() {
  const { isDark } = useTheme();
  const [users, setUsers] = useState(MOCK_ALL_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            User Management
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Manage all platform users
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className={`flex-1 min-w-[200px] flex items-center gap-2 rounded-full px-5 py-2.5 border ${
            isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'
          }`}>
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm ${
                isDark ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
              }`}
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={`px-4 py-2.5 rounded-full border text-sm ${
              isDark 
                ? 'bg-[#1a1a1a] border-[#333] text-white' 
                : 'bg-white border-gray-200 text-gray-700'
            }`}
          >
            <option value="all">All Roles</option>
            <option value="client">Clients</option>
            <option value="provider">Providers</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2.5 rounded-full border text-sm ${
              isDark 
                ? 'bg-[#1a1a1a] border-[#333] text-white' 
                : 'bg-white border-gray-200 text-gray-700'
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Users Table */}
        <div className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-200'}`}>
                  <th className="text-left py-4 px-6 text-sm font-semibold">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Joined</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Activity</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                    <td className="py-4 px-6">
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          ID: {user.id}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {user.email}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        user.role === 'provider' 
                          ? 'bg-purple-500/10 text-purple-600'
                          : 'bg-blue-500/10 text-blue-600'
                      }`}>
                        {user.role === 'provider' ? 'Service Provider' : 'Client'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {user.joined}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      {user.role === 'client' ? (
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {user.bookings} bookings
                        </p>
                      ) : (
                        <div>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {user.jobs} jobs
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            ₦{user.earnings.toLocaleString()} earned
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-red-500/10 text-red-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`text-sm px-3 py-1 rounded-lg transition ${
                          user.status === 'active'
                            ? isDark
                              ? 'text-red-400 hover:bg-red-500/10'
                              : 'text-red-600 hover:bg-red-50'
                            : isDark
                              ? 'text-green-400 hover:bg-green-500/10'
                              : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {users.length}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Users</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {users.filter(u => u.role === 'client').length}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clients</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {users.filter(u => u.role === 'provider').length}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Providers</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {users.filter(u => u.status === 'active').length}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Users</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}