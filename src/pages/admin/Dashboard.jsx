// src/pages/admin/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Mock admin stats
const MOCK_ADMIN_STATS = {
  totalUsers: 1247,
  totalProviders: 342,
  totalClients: 905,
  totalBookings: 3421,
  activeBookings: 156,
  completedBookings: 2890,
  totalRevenue: 1247500,
  commissionRate: 10,
  platformFees: 124750,
  thisMonthRevenue: 187500,
  thisMonthBookings: 234
};

const MOCK_RECENT_BOOKINGS = [
  {
    id: 1,
    service: "Electrical Installation",
    client: "Mr. Adewale",
    provider: "James Okafor",
    amount: 15000,
    commission: 1500,
    date: "2024-03-28",
    status: "completed"
  },
  {
    id: 2,
    service: "AC Repair",
    client: "Mrs. Okafor",
    provider: "Mike Adeyemi",
    amount: 25000,
    commission: 2500,
    date: "2024-03-25",
    status: "completed"
  },
  {
    id: 3,
    service: "Plumbing Service",
    client: "Mr. Emeka",
    provider: "Emeka Nwosu",
    amount: 8000,
    commission: 800,
    date: "2024-03-30",
    status: "pending"
  },
  {
    id: 4,
    service: "Smart Home Setup",
    client: "Mrs. Adebisi",
    provider: "TechGenius",
    amount: 35000,
    commission: 3500,
    date: "2024-03-29",
    status: "active"
  },
  {
    id: 5,
    service: "Deep Cleaning",
    client: "Mr. Martins",
    provider: "Sparkle Cleaners",
    amount: 12000,
    commission: 1200,
    date: "2024-03-28",
    status: "completed"
  }
];

const MOCK_RECENT_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "client", joined: "2024-03-20", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "provider", joined: "2024-03-21", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "client", joined: "2024-03-22", status: "active" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "provider", joined: "2024-03-23", status: "suspended" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "client", joined: "2024-03-24", status: "active" }
];

const MOCK_WITHDRAWAL_REQUESTS = [
  { id: 1, provider: "James Okafor", amount: 50000, bank: "GTBank", account: "****1234", date: "2024-03-28", status: "pending" },
  { id: 2, provider: "Mike Adeyemi", amount: 35000, bank: "First Bank", account: "****5678", date: "2024-03-27", status: "pending" },
  { id: 3, provider: "Sparkle Cleaners", amount: 25000, bank: "Access Bank", account: "****9012", date: "2024-03-26", status: "approved" }
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'active':
        return 'bg-blue-500/10 text-blue-600';
      case 'suspended':
        return 'bg-red-500/10 text-red-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Welcome back, {user?.name}! Platform overview and management.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Users</span>
              <span className="text-2xl">👥</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {MOCK_ADMIN_STATS.totalUsers.toLocaleString()}
            </p>
            <div className="flex gap-2 text-xs mt-1">
              <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                {MOCK_ADMIN_STATS.totalClients} Clients
              </span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                • {MOCK_ADMIN_STATS.totalProviders} Providers
              </span>
            </div>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Bookings</span>
              <span className="text-2xl">📅</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {MOCK_ADMIN_STATS.totalBookings.toLocaleString()}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {MOCK_ADMIN_STATS.activeBookings} active • {MOCK_ADMIN_STATS.completedBookings} completed
            </p>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Platform Revenue</span>
              <span className="text-2xl">💰</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{MOCK_ADMIN_STATS.platformFees.toLocaleString()}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {MOCK_ADMIN_STATS.commissionRate}% commission • ₦{MOCK_ADMIN_STATS.thisMonthRevenue.toLocaleString()} this month
            </p>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Transactions</span>
              <span className="text-2xl">💳</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{MOCK_ADMIN_STATS.totalRevenue.toLocaleString()}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {MOCK_ADMIN_STATS.thisMonthBookings} bookings this month
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6">
          {['overview', 'bookings', 'users', 'withdrawals'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-[#1A73E8] text-[#1A73E8]'
                  : isDark
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab - Recent Bookings & Users */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Bookings
                </h2>
                <Link to="/admin/transactions" className="text-sm text-[#1A73E8] hover:underline">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {MOCK_RECENT_BOOKINGS.slice(0, 4).map((booking) => (
                  <div key={booking.id} className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark ? 'border-[#222]' : 'border-gray-100'
                  }`}>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {booking.service}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {booking.client} → {booking.provider}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                        {booking.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₦{booking.amount.toLocaleString()}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Fee: ₦{booking.commission.toLocaleString()}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Users
                </h2>
                <Link to="/admin/users" className="text-sm text-[#1A73E8] hover:underline">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {MOCK_RECENT_USERS.map((user) => (
                  <div key={user.id} className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark ? 'border-[#222]' : 'border-gray-100'
                  }`}>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.email}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                        Joined: {user.joined}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'provider' 
                          ? 'bg-purple-500/10 text-purple-600'
                          : 'bg-blue-500/10 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                      <p className={`text-xs mt-1 ${getStatusColor(user.status)}`}>
                        {user.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              All Bookings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-200'}`}>
                    <th className="text-left py-3 px-4 text-sm font-semibold">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Client</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Provider</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Commission</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RECENT_BOOKINGS.map((booking) => (
                    <tr key={booking.id} className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                      <td className="py-3 px-4 text-sm">#{booking.id}</td>
                      <td className="py-3 px-4 text-sm">{booking.service}</td>
                      <td className="py-3 px-4 text-sm">{booking.client}</td>
                      <td className="py-3 px-4 text-sm">{booking.provider}</td>
                      <td className="py-3 px-4 text-sm">₦{booking.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">₦{booking.commission.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              User Management
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-200'}`}>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RECENT_USERS.map((user) => (
                    <tr key={user.id} className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                      <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.role === 'provider' 
                            ? 'bg-purple-500/10 text-purple-600'
                            : 'bg-blue-500/10 text-blue-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.joined}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm text-[#1A73E8] hover:underline mr-2">
                          {user.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Withdrawal Requests
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-200'}`}>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Provider</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Bank</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Account</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_WITHDRAWAL_REQUESTS.map((request) => (
                    <tr key={request.id} className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                      <td className="py-3 px-4 text-sm font-medium">{request.provider}</td>
                      <td className="py-3 px-4 text-sm font-semibold">₦{request.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">{request.bank}</td>
                      <td className="py-3 px-4 text-sm">{request.account}</td>
                      <td className="py-3 px-4 text-sm">{request.date}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {request.status === 'pending' && (
                          <>
                            <button className="text-sm text-green-600 hover:underline mr-2">Approve</button>
                            <button className="text-sm text-red-600 hover:underline">Decline</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}