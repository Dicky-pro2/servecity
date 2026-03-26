// src/pages/client/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Mock data for client dashboard
const MOCK_BOOKINGS = [
  {
    id: 1,
    service: "Electrical Installation",
    provider: "James Okafor",
    providerInitials: "JO",
    providerColor: "#1A73E8",
    date: "2024-03-28",
    time: "10:00 AM",
    status: "pending",
    price: "₦15,000",
    location: "Lagos Island",
    image: null
  },
  {
    id: 2,
    service: "AC Repair",
    provider: "Mike Adeyemi",
    providerInitials: "MA",
    providerColor: "#7C3AED",
    date: "2024-03-25",
    time: "2:00 PM",
    status: "completed",
    price: "₦25,000",
    location: "Ikeja, Lagos",
    image: null
  },
  {
    id: 3,
    service: "Plumbing Service",
    provider: "Emeka Nwosu",
    providerInitials: "EN",
    providerColor: "#DC2626",
    date: "2024-03-30",
    time: "9:00 AM",
    status: "confirmed",
    price: "₦8,000",
    location: "Port Harcourt",
    image: null
  }
];

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: "payment",
    amount: "₦15,000",
    date: "2024-03-28",
    description: "Payment to James Okafor - Electrical Installation",
    status: "completed"
  },
  {
    id: 2,
    type: "funding",
    amount: "₦50,000",
    date: "2024-03-20",
    description: "Wallet funding via Paystack",
    status: "completed"
  },
  {
    id: 3,
    type: "payment",
    amount: "₦25,000",
    date: "2024-03-25",
    description: "Payment to Mike Adeyemi - AC Repair",
    status: "completed"
  }
];

const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    service: "Smart Home Setup",
    provider: "TechGenius",
    providerInitials: "TG",
    providerColor: "#9333EA",
    rating: 4.9,
    jobs: 45,
    price: "₦20,000",
    description: "Smart home installation, CCTV, and automation"
  },
  {
    id: 2,
    service: "Deep Cleaning",
    provider: "Sparkle Cleaners",
    providerInitials: "SC",
    providerColor: "#059669",
    rating: 4.7,
    jobs: 203,
    price: "₦12,000",
    description: "Professional home and office cleaning"
  },
  {
    id: 3,
    service: "Painting Services",
    provider: "Creative Paints",
    providerInitials: "CP",
    providerColor: "#0284C7",
    rating: 4.6,
    jobs: 112,
    price: "₦25,000",
    description: "Interior and exterior painting"
  }
];

export default function ClientDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800';
      case 'confirmed':
        return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800';
      case 'completed':
        return 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    for (let i = fullStars; i < 5; i++) {
      stars.push('☆');
    }
    return stars.map((star, i) => (
      <span key={i} className="text-yellow-400">
        {star}
      </span>
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Here's what's happening with your services today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Wallet Balance</span>
              <span className="text-2xl">💰</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{user?.walletBalance?.toLocaleString() || '50,000'}
            </p>
            <Link to="/client/wallet" className="text-xs text-[#1A73E8] hover:underline mt-2 inline-block">
              Fund wallet →
            </Link>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Bookings</span>
              <span className="text-2xl">📅</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {MOCK_BOOKINGS.filter(b => b.status !== 'completed').length}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              {MOCK_BOOKINGS.filter(b => b.status === 'pending').length} pending
            </p>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed Jobs</span>
              <span className="text-2xl">✅</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {MOCK_BOOKINGS.filter(b => b.status === 'completed').length}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              Total spent: ₦40,000
            </p>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Reviews Given</span>
              <span className="text-2xl">⭐</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              12
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              4.8 average rating
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6">
          {['overview', 'bookings', 'transactions'].map((tab) => (
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

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Recent Bookings
                  </h2>
                  <Link to="/client/bookings" className="text-sm text-[#1A73E8] hover:underline">
                    View all →
                  </Link>
                </div>
                <div className="space-y-4">
                  {MOCK_BOOKINGS.slice(0, 3).map((booking) => (
                    <div key={booking.id} className={`flex items-center gap-4 p-3 rounded-xl border ${
                      isDark ? 'border-[#222]' : 'border-gray-100'
                    }`}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: booking.providerColor }}
                      >
                        {booking.providerInitials}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {booking.service}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {booking.provider} • {booking.location}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                          {booking.date} at {booking.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {booking.price}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Services */}
            <div>
              <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
              }`}>
                <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recommended for You
                </h2>
                <div className="space-y-4">
                  {MOCK_RECOMMENDATIONS.map((service) => (
                    <div key={service.id} className={`p-3 rounded-xl border cursor-pointer transition-all hover:border-[#1A73E8] ${
                      isDark ? 'border-[#222]' : 'border-gray-100'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                          style={{ background: service.providerColor }}
                        >
                          {service.providerInitials}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {service.service}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {service.provider}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5 text-xs">
                              {renderStars(service.rating)}
                            </div>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              ({service.jobs} jobs)
                            </span>
                          </div>
                          <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              From {service.price}
                            </span>
                            <Link
                              to="/client/browse"
                              className="text-xs text-[#1A73E8] font-medium hover:underline"
                            >
                              Book Now →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab Content */}
        {activeTab === 'bookings' && (
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              All Bookings
            </h2>
            <div className="space-y-4">
              {MOCK_BOOKINGS.map((booking) => (
                <div key={booking.id} className={`flex items-center gap-4 p-4 rounded-xl border ${
                  isDark ? 'border-[#222]' : 'border-gray-100'
                }`}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: booking.providerColor }}
                  >
                    {booking.providerInitials}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {booking.service}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {booking.provider} • {booking.location}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {booking.price}
                    </p>
                    <span className={`text-xs px-3 py-1 rounded-full border inline-block mt-1 ${getStatusColor(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                    {booking.status === 'pending' && (
                      <button className="block w-full mt-2 text-xs text-[#1A73E8] hover:underline">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab Content */}
        {activeTab === 'transactions' && (
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Transaction History
            </h2>
            <div className="space-y-3">
              {MOCK_TRANSACTIONS.map((transaction) => (
                <div key={transaction.id} className={`flex items-center justify-between p-4 rounded-xl border ${
                  isDark ? 'border-[#222]' : 'border-gray-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'funding' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {transaction.type === 'funding' ? '💰' : '💸'}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.description}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'funding' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'funding' ? '+' : '-'} {transaction.amount}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/client/browse"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">🔍</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Find Services
            </span>
          </Link>
          
          <Link
            to="/client/wallet"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">💰</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fund Wallet
            </span>
          </Link>
          
          <Link
            to="/client/bookings"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">📅</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Bookings
            </span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">👤</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Profile
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}