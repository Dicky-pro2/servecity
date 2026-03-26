// src/pages/provider/JobRequests.jsx
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_JOB_REQUESTS = [
  {
    id: 1,
    service: "Electrical Installation",
    client: "Mr. Adewale",
    clientInitials: "MA",
    clientColor: "#1A73E8",
    clientPhone: "+2348012345678",
    date: "2024-03-28",
    time: "10:00 AM",
    status: "pending",
    price: "₦15,000",
    location: "Lagos Island",
    description: "Need complete electrical wiring for a 3-bedroom apartment",
    createdAt: "2024-03-25"
  },
  {
    id: 2,
    service: "Plumbing Service",
    client: "Mr. Emeka",
    clientInitials: "ME",
    clientColor: "#DC2626",
    clientPhone: "+2348012345680",
    date: "2024-03-30",
    time: "9:00 AM",
    status: "pending",
    price: "₦8,000",
    location: "Port Harcourt",
    description: "Leaking pipe in kitchen needs immediate repair",
    createdAt: "2024-03-26"
  },
  {
    id: 3,
    service: "AC Repair",
    client: "Mrs. Okafor",
    clientInitials: "MO",
    clientColor: "#7C3AED",
    clientPhone: "+2348012345679",
    date: "2024-04-02",
    time: "2:00 PM",
    status: "accepted",
    price: "₦25,000",
    location: "Ikeja, Lagos",
    description: "Split AC not cooling properly",
    createdAt: "2024-03-27"
  }
];

export default function JobRequests() {
  const { isDark } = useTheme();
  const [requests, setRequests] = useState(MOCK_JOB_REQUESTS);
  const [filter, setFilter] = useState('all');
  const [showAcceptModal, setShowAcceptModal] = useState(null);

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const handleAcceptJob = (request) => {
    setRequests(requests.map(r => 
      r.id === request.id ? { ...r, status: 'accepted' } : r
    ));
    setShowAcceptModal(null);
  };

  const handleDeclineJob = (id) => {
    if (confirm('Are you sure you want to decline this job request?')) {
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  const handleWhatsAppContact = (phone, client) => {
    const message = encodeURIComponent(`Hi ${client}, I'm responding to your job request on ServeCity.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') {
      return {
        text: 'Pending',
        color: 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800'
      };
    } else if (status === 'accepted') {
      return {
        text: 'Accepted',
        color: 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-800'
      };
    }
    return { text: status, color: '' };
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Job Requests
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Review and respond to client job requests
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {[
            { value: 'all', label: 'All Requests', count: requests.length },
            { value: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
            { value: 'accepted', label: 'Accepted', count: requests.filter(r => r.status === 'accepted').length }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                filter === tab.value
                  ? 'border-[#1A73E8] text-[#1A73E8]'
                  : isDark
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Job Requests List */}
        {filteredRequests.length === 0 ? (
          <div className={`text-center py-12 rounded-2xl border ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <div className="text-6xl mb-4">📭</div>
            <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No job requests
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              When clients request your services, they'll appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const statusBadge = getStatusBadge(request.status);
              
              return (
                <div
                  key={request.id}
                  className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${
                    isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ background: request.clientColor }}
                      >
                        {request.clientInitials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {request.service}
                          </h2>
                          <span className={`text-xs px-3 py-1 rounded-full border ${statusBadge.color}`}>
                            {statusBadge.text}
                          </span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {request.client} • {request.location}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-2`}>
                          📅 {request.date} at {request.time}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                          {request.description}
                        </p>
                        
                        {/* Action Buttons */}
                        {request.status === 'pending' && (
                          <div className="flex flex-wrap gap-3 mt-3">
                            <button
                              onClick={() => setShowAcceptModal(request)}
                              className="px-6 py-2 bg-[#1A73E8] text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
                            >
                              Accept Job
                            </button>
                            <button
                              onClick={() => handleDeclineJob(request.id)}
                              className="px-6 py-2 border border-red-500 text-red-500 rounded-full text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950 transition"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => handleWhatsAppContact(request.clientPhone, request.client)}
                              className="px-6 py-2 border border-green-500 text-green-500 rounded-full text-sm font-medium hover:bg-green-50 dark:hover:bg-green-950 transition"
                            >
                              💬 Message Client
                            </button>
                          </div>
                        )}
                        
                        {request.status === 'accepted' && (
                          <div className="flex gap-3 mt-3">
                            <button
                              onClick={() => handleWhatsAppContact(request.clientPhone, request.client)}
                              className="px-6 py-2 border border-green-500 text-green-500 rounded-full text-sm font-medium hover:bg-green-50 dark:hover:bg-green-950 transition"
                            >
                              💬 Contact Client
                            </button>
                            <button className="px-6 py-2 bg-[#1A73E8] text-white rounded-full text-sm font-medium hover:bg-blue-700 transition">
                              Mark as Completed
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {request.price}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                        Request ID: #{request.id}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accept Job Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Accept Job Request
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Are you sure you want to accept this job from {showAcceptModal.client}?
              <br /><br />
              <span className="text-sm">Job: {showAcceptModal.service}</span><br />
              <span className="text-sm">Date: {showAcceptModal.date} at {showAcceptModal.time}</span><br />
              <span className="text-sm">Price: {showAcceptModal.price}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleAcceptJob(showAcceptModal)}
                className="flex-1 px-4 py-2 bg-[#1A73E8] text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Yes, Accept
              </button>
              <button
                onClick={() => setShowAcceptModal(null)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
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