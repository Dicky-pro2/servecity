// src/pages/client/BrowseServices.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "James Okafor",
    initials: "JO",
    service: "Electrician",
    category: "Electrical",
    location: "Lagos Island",
    rating: 4.9,
    jobs: 84,
    badge: "gold",
    color: "#1A73E8",
    price: "₦5,000",
    desc: "Specialist in residential wiring, installations and fault detection. 8 years experience.",
    phone: "+2348012345678",
    available: true
  },
  {
    id: 2,
    name: "Mike Adeyemi",
    initials: "MA",
    service: "AC & Appliance Repair",
    category: "HVAC",
    location: "Ikeja, Lagos",
    rating: 4.8,
    jobs: 120,
    badge: "gold",
    color: "#7C3AED",
    price: "₦8,000",
    desc: "Expert AC installation, servicing and all home appliance repairs. Fast and reliable.",
    phone: "+2348012345679",
    available: true
  },
  {
    id: 3,
    name: "Sola Martins",
    initials: "SM",
    service: "Painter",
    category: "Painting",
    location: "Victoria Island",
    rating: 4.7,
    jobs: 56,
    badge: "blue",
    color: "#059669",
    price: "₦15,000",
    desc: "Interior and exterior painting. Quality finishes at affordable rates across Lagos.",
    phone: "+2348012345680",
    available: true
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    initials: "EN",
    service: "Plumber",
    category: "Plumbing",
    location: "Port Harcourt",
    rating: 4.8,
    jobs: 43,
    badge: "blue",
    color: "#DC2626",
    price: "₦6,000",
    desc: "Pipe installations, leakage repairs, drainage and all plumbing works done right.",
    phone: "+2348012345681",
    available: true
  }
];

const CATEGORIES = [
  { icon: "⚡", label: "Electrical", count: 24 },
  { icon: "🔧", label: "Plumbing", count: 18 },
  { icon: "🧹", label: "Cleaning", count: 32 },
  { icon: "🎨", label: "Painting", count: 15 },
  { icon: "🏗️", label: "Construction", count: 12 },
  { icon: "🔨", label: "Appliance Repair", count: 20 },
  { icon: "💻", label: "Tech Support", count: 28 },
  { icon: "🚗", label: "Auto Repair", count: 10 }
];

export default function ClientBrowseServices() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDetails, setBookingDetails] = useState("");

  const filteredProviders = MOCK_PROVIDERS.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.service.toLowerCase().includes(search.toLowerCase())) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    // In real app, make API call to create booking
    console.log('Booking confirmed:', {
      provider: selectedProvider,
      date: bookingDate,
      time: bookingTime,
      details: bookingDetails
    });
    setShowBookingModal(false);
    setSelectedProvider(null);
    setBookingDate("");
    setBookingTime("");
    setBookingDetails("");
    alert('Booking request sent successfully! The provider will confirm shortly.');
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
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Find Services
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Browse trusted service providers in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className={`flex items-center gap-2 rounded-full px-5 py-3 border max-w-md ${
            isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'
          }`}>
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search for a service or provider..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm placeholder-gray-400 ${
                isDark ? 'text-white' : 'text-gray-700'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div>
            <div className={`rounded-2xl border p-5 sticky top-24 transition-colors duration-300 ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
            }`}>
              <h3 className={`text-sm font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                    selectedCategory === ""
                      ? 'bg-[#1A73E8] text-white'
                      : isDark
                        ? 'text-gray-400 hover:bg-white/5'
                        : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  All Categories ({MOCK_PROVIDERS.length})
                </button>
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCategory(cat.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition ${
                      selectedCategory === cat.label
                        ? 'bg-[#1A73E8] text-white'
                        : isDark
                          ? 'text-gray-400 hover:bg-white/5'
                          : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </span>
                    <span className="text-xs opacity-75">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Provider Grid */}
          <div className="lg:col-span-3">
            {filteredProviders.length === 0 ? (
              <div className={`text-center py-12 rounded-2xl border ${
                isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
              }`}>
                <div className="text-6xl mb-4">🔍</div>
                <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  No providers found
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className={`rounded-2xl border-2 p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:border-[#1A73E8] hover:shadow-lg ${
                      isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
                    }`}
                  >
                    {/* Provider Header */}
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-sm"
                          style={{ background: provider.color }}
                        >
                          {provider.initials}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 ${
                          isDark ? 'border-[#141414]' : 'border-white'
                        } ${provider.badge === 'gold' ? 'bg-amber-400' : 'bg-[#1A73E8]'}`}>
                          {provider.badge === 'gold' ? '★' : '✓'}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-extrabold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {provider.name}
                        </p>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {provider.service}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                          📍 {provider.location}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-xs">
                        {renderStars(provider.rating)}
                      </div>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {provider.rating}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        · {provider.jobs} jobs
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {provider.desc}
                    </p>

                    {/* Footer */}
                    <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                      <div>
                        <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          From {provider.price}
                        </span>
                        <span className={`text-xs ml-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                          / job
                        </span>
                      </div>
                      <button
                        onClick={() => handleBookNow(provider)}
                        className={`text-xs font-bold px-4 py-2 rounded-full transition ${
                          isDark
                            ? 'bg-[#1A73E8]/10 text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white'
                            : 'bg-blue-50 text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white'
                        }`}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Book Service
            </h2>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              with {selectedProvider.name} - {selectedProvider.service}
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Time
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Additional Details (Optional)
                </label>
                <textarea
                  value={bookingDetails}
                  onChange={(e) => setBookingDetails(e.target.value)}
                  rows="3"
                  placeholder="Describe the job or any special requirements..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
              
              <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Service Fee</span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedProvider.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Platform Fee</span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₦500
                  </span>
                </div>
                <div className={`border-t mt-2 pt-2 flex justify-between ${isDark ? 'border-[#222]' : 'border-gray-200'}`}>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Total</span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₦{parseInt(selectedProvider.price.replace(/[^0-9]/g, '')) + 500}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleConfirmBooking}
                disabled={!bookingDate || !bookingTime}
                className="flex-1 px-4 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedProvider(null);
                }}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition ${
                  isDark 
                    ? 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
            
            <p className={`text-xs text-center mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Payment will be held in escrow until job completion
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}