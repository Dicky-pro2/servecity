// src/pages/provider/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Mock data for provider
const MOCK_STATS = {
  totalEarnings: 187500,
  pendingEarnings: 45000,
  completedJobs: 24,
  activeJobs: 3,
  rating: 4.8,
  totalReviews: 56,
  badge: 'gold', // 'gold', 'blue', or null
  badgeProgress: 76, // percentage to next badge
  nextBadge: 'Top Rated (Gold)',
  jobsToNextBadge: 6
};

const MOCK_RECENT_JOBS = [
  {
    id: 1,
    service: "Electrical Installation",
    client: "Mr. Adewale",
    clientInitials: "MA",
    clientColor: "#1A73E8",
    date: "2024-03-28",
    time: "10:00 AM",
    status: "pending",
    price: "₦15,000",
    location: "Lagos Island"
  },
  {
    id: 2,
    service: "AC Repair",
    client: "Mrs. Okafor",
    clientInitials: "MO",
    clientColor: "#7C3AED",
    date: "2024-03-25",
    time: "2:00 PM",
    status: "completed",
    price: "₦25,000",
    location: "Ikeja, Lagos",
    rating: 5
  },
  {
    id: 3,
    service: "Plumbing Service",
    client: "Mr. Emeka",
    clientInitials: "ME",
    clientColor: "#DC2626",
    date: "2024-03-30",
    time: "9:00 AM",
    status: "confirmed",
    price: "₦8,000",
    location: "Port Harcourt"
  }
];

const MOCK_EARNINGS_BREAKDOWN = [
  { month: "Jan", earnings: 45000 },
  { month: "Feb", earnings: 52000 },
  { month: "Mar", earnings: 87500 },
  { month: "Apr", earnings: 0 },
  { month: "May", earnings: 0 },
  { month: "Jun", earnings: 0 }
];

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('month');

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

  const getBadgeInfo = () => {
    if (MOCK_STATS.badge === 'gold') {
      return {
        name: 'Top Rated (Gold)',
        icon: '🏆',
        color: 'bg-amber-500',
        textColor: 'text-amber-500'
      };
    } else if (MOCK_STATS.badge === 'blue') {
      return {
        name: 'Verified (Blue)',
        icon: '✓',
        color: 'bg-[#1A73E8]',
        textColor: 'text-[#1A73E8]'
      };
    }
    return {
      name: 'No Badge',
      icon: '○',
      color: 'bg-gray-500',
      textColor: 'text-gray-500'
    };
  };

  const badge = getBadgeInfo();

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
            Welcome back, {user?.name?.split(' ')[0]}! 🛠️
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Here's your business performance overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</span>
              <span className="text-2xl">💰</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{MOCK_STATS.totalEarnings.toLocaleString()}
            </p>
            <Link to="/provider/wallet" className="text-xs text-[#1A73E8] hover:underline mt-2 inline-block">
              View details →
            </Link>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed Jobs</span>
              <span className="text-2xl">✅</span>
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {MOCK_STATS.completedJobs}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              +{MOCK_STATS.activeJobs} active
            </p>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Rating</span>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {MOCK_STATS.rating}
              </p>
              <div className="flex items-center gap-0.5 text-sm">
                {renderStars(MOCK_STATS.rating)}
              </div>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
              {MOCK_STATS.totalReviews} reviews
            </p>
          </div>

          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your Badge</span>
              <span className="text-2xl">{badge.icon}</span>
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-lg font-bold ${badge.textColor}`}>
                {badge.name}
              </p>
            </div>
            {MOCK_STATS.badge !== 'gold' && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {MOCK_STATS.jobsToNextBadge} jobs to {MOCK_STATS.nextBadge}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {MOCK_STATS.badgeProgress}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[#1A73E8] transition-all"
                    style={{ width: `${MOCK_STATS.badgeProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/provider/listings"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">📝</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Manage Listings
            </span>
          </Link>
          
          <Link
            to="/provider/job-requests"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">📬</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Job Requests
            </span>
            {MOCK_RECENT_JOBS.filter(j => j.status === 'pending').length > 0 && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {MOCK_RECENT_JOBS.filter(j => j.status === 'pending').length}
              </span>
            )}
          </Link>
          
          <Link
            to="/provider/wallet"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">💰</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Withdraw
            </span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all hover:border-[#1A73E8] ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}
          >
            <span className="text-2xl">⚙️</span>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Settings
            </span>
          </Link>
        </div>

        {/* Earnings Chart & Recent Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Earnings Overview
                </h2>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className={`text-sm px-3 py-1 rounded-lg border ${
                    isDark 
                      ? 'bg-[#0a0a0a] border-[#333] text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-48">
                {MOCK_EARNINGS_BREAKDOWN.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-[#1A73E8] rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(item.earnings / 100000) * 100}%` }}
                    />
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {item.month}
                    </span>
                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                      ₦{(item.earnings / 1000).toFixed(0)}k
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Jobs */}
          <div>
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Jobs
                </h2>
                <Link to="/provider/job-requests" className="text-sm text-[#1A73E8] hover:underline">
                  View all →
                </Link>
              </div>
              <div className="space-y-3">
                {MOCK_RECENT_JOBS.slice(0, 3).map((job) => (
                  <div key={job.id} className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isDark ? 'border-[#222]' : 'border-gray-100'
                  }`}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ background: job.clientColor }}
                    >
                      {job.clientInitials}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {job.service}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {job.client} • {job.location}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {job.price}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(job.status)}`}>
                          {getStatusText(job.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className={`mt-6 p-4 rounded-xl border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Pro Tip: Boost Your Earnings
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Complete {MOCK_STATS.jobsToNextBadge} more jobs to earn the {MOCK_STATS.nextBadge} badge. 
                Top Rated providers get 40% more visibility in search results!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}