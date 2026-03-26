// src/pages/admin/Settings.jsx
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PlatformSettings() {
  const { isDark } = useTheme();
  const [settings, setSettings] = useState({
    commissionRate: 10,
    minWithdrawal: 10000,
    withdrawalFee: 100,
    badgeBlueJobs: 3,
    badgeGoldJobs: 10,
    featuredListingPrice: 5000,
    maintenanceMode: false
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    // In real app, make API call to save settings
    console.log('Saving settings:', settings);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Platform Settings
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Configure platform-wide settings and rules
          </p>
        </div>

        {/* Success Message */}
        {showSaveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500 text-green-600">
            Settings saved successfully!
          </div>
        )}

        {/* Settings Form */}
        <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Commission & Fees
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Platform Commission Rate (%)
              </label>
              <input
                type="number"
                value={settings.commissionRate}
                onChange={(e) => setSettings({...settings, commissionRate: parseInt(e.target.value)})}
                className={`w-32 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Percentage deducted from each completed transaction
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Minimum Withdrawal Amount (₦)
              </label>
              <input
                type="number"
                value={settings.minWithdrawal}
                onChange={(e) => setSettings({...settings, minWithdrawal: parseInt(e.target.value)})}
                className={`w-48 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Withdrawal Processing Fee (₦)
              </label>
              <input
                type="number"
                value={settings.withdrawalFee}
                onChange={(e) => setSettings({...settings, withdrawalFee: parseInt(e.target.value)})}
                className={`w-32 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 mt-6 transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Badge Requirements
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Verified Badge (Blue) - Completed Jobs Required
              </label>
              <input
                type="number"
                value={settings.badgeBlueJobs}
                onChange={(e) => setSettings({...settings, badgeBlueJobs: parseInt(e.target.value)})}
                className={`w-24 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Top Rated Badge (Gold) - Completed Jobs Required
              </label>
              <input
                type="number"
                value={settings.badgeGoldJobs}
                onChange={(e) => setSettings({...settings, badgeGoldJobs: parseInt(e.target.value)})}
                className={`w-24 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 mt-6 transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured Listings
          </h2>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Featured Listing Price (₦ per week)
            </label>
            <input
              type="number"
              value={settings.featuredListingPrice}
              onChange={(e) => setSettings({...settings, featuredListingPrice: parseInt(e.target.value)})}
              className={`w-48 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                isDark 
                  ? 'bg-[#0f0f0f] border-[#333] text-white' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
          </div>
        </div>

        <div className={`rounded-2xl border p-6 mt-6 transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Maintenance Mode
          </h2>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.maintenanceMode ? 'bg-[#1A73E8]' : 'bg-gray-400'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                settings.maintenanceMode ? 'right-1' : 'left-1'
              }`} />
            </button>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {settings.maintenanceMode ? 'Maintenance mode is ON' : 'Maintenance mode is OFF'}
            </span>
          </div>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            When enabled, only admins can access the platform
          </p>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSaveSettings}
            className="px-8 py-3 bg-[#1A73E8] text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            Save All Settings
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}