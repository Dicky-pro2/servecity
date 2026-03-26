// src/pages/provider/ManageListings.jsx
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_LISTINGS = [
  {
    id: 1,
    title: "Professional Electrical Installation",
    category: "Electrical",
    description: "Specialist in residential wiring, installations and fault detection. 8 years experience.",
    price: "₦5,000 - ₦15,000",
    location: "Lagos Island",
    status: "active",
    views: 234,
    bookings: 12,
    rating: 4.9,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "AC & Appliance Repair",
    category: "HVAC",
    description: "Expert AC installation, servicing and all home appliance repairs.",
    price: "₦8,000 - ₦25,000",
    location: "Ikeja, Lagos",
    status: "active",
    views: 189,
    bookings: 8,
    rating: 4.8,
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Plumbing Services",
    category: "Plumbing",
    description: "Pipe installations, leakage repairs, drainage and all plumbing works.",
    price: "₦6,000 - ₦12,000",
    location: "Port Harcourt",
    status: "inactive",
    views: 56,
    bookings: 3,
    rating: 4.7,
    createdAt: "2024-02-01"
  }
];

const CATEGORIES = [
  "Electrical", "Plumbing", "HVAC", "Cleaning", "Painting", 
  "Construction", "Appliance Repair", "Tech Support", "Auto Repair"
];

export default function ManageListings() {
  const { isDark } = useTheme();
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    priceMin: '',
    priceMax: '',
    location: ''
  });

  const handleDeleteListing = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setListings(listings.map(l => 
      l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l
    ));
  };

  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      category: listing.category,
      description: listing.description,
      priceMin: listing.price.split(' - ')[0].replace('₦', ''),
      priceMax: listing.price.split(' - ')[1].replace('₦', ''),
      location: listing.location
    });
    setShowModal(true);
  };

  const handleAddListing = () => {
    setEditingListing(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      priceMin: '',
      priceMax: '',
      location: ''
    });
    setShowModal(true);
  };

  const handleSaveListing = () => {
    if (editingListing) {
      // Update existing listing
      setListings(listings.map(l => 
        l.id === editingListing.id 
          ? {
              ...l,
              title: formData.title,
              category: formData.category,
              description: formData.description,
              price: `₦${formData.priceMin} - ₦${formData.priceMax}`,
              location: formData.location
            }
          : l
      ));
    } else {
      // Add new listing
      const newListing = {
        id: listings.length + 1,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        price: `₦${formData.priceMin} - ₦${formData.priceMax}`,
        location: formData.location,
        status: 'active',
        views: 0,
        bookings: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setListings([newListing, ...listings]);
    }
    setShowModal(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Manage Listings
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Create and manage your service listings
            </p>
          </div>
          <button
            onClick={handleAddListing}
            className="px-6 py-3 bg-[#1A73E8] text-white rounded-full font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>+</span> Add New Listing
          </button>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className={`text-center py-12 rounded-2xl border ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="text-6xl mb-4">📝</div>
            <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No listings yet
            </p>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Create your first service listing to start getting bookings
            </p>
            <button
              onClick={handleAddListing}
              className="px-6 py-3 bg-[#1A73E8] text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Create Listing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${
                  isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {listing.title}
                      </h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        listing.status === 'active'
                          ? 'bg-green-500/10 text-green-600 border border-green-200 dark:border-green-800'
                          : 'bg-gray-500/10 text-gray-600 border border-gray-200 dark:border-gray-800'
                      }`}>
                        {listing.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {listing.category} • {listing.location}
                    </p>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {listing.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Price: </span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {listing.price}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Views: </span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {listing.views}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Bookings: </span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {listing.bookings}
                        </span>
                      </div>
                      <div>
                        <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Rating: </span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {listing.rating} ⭐
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(listing.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        listing.status === 'active'
                          ? isDark
                            ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                            : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                          : isDark
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEditListing(listing)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        isDark 
                          ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        isDark 
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-[#141414]' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {editingListing ? 'Edit Listing' : 'Add New Listing'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Service Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Professional Electrical Installation"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  placeholder="Describe your service, experience, and what clients can expect..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Min Price (₦) *
                  </label>
                  <input
                    type="number"
                    value={formData.priceMin}
                    onChange={(e) => setFormData({...formData, priceMin: e.target.value})}
                    placeholder="5000"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                      isDark 
                        ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Max Price (₦) *
                  </label>
                  <input
                    type="number"
                    value={formData.priceMax}
                    onChange={(e) => setFormData({...formData, priceMax: e.target.value})}
                    placeholder="15000"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                      isDark 
                        ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Service Area *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Lagos Island, Ikeja, Victoria Island"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveListing}
                className="flex-1 px-4 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                {editingListing ? 'Update Listing' : 'Create Listing'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition ${
                  isDark 
                    ? 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}