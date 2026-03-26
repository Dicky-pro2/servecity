// src/pages/admin/Transactions.jsx
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_ALL_TRANSACTIONS = [
  { id: 1, type: "payment", service: "Electrical Installation", client: "John Doe", provider: "James Okafor", amount: 15000, commission: 1500, date: "2024-03-28", status: "completed" },
  { id: 2, type: "payment", service: "AC Repair", client: "Jane Smith", provider: "Mike Adeyemi", amount: 25000, commission: 2500, date: "2024-03-25", status: "completed" },
  { id: 3, type: "withdrawal", provider: "James Okafor", amount: 50000, fee: 100, date: "2024-03-28", status: "pending" },
  { id: 4, type: "payment", service: "Plumbing Service", client: "Mike Johnson", provider: "Emeka Nwosu", amount: 8000, commission: 800, date: "2024-03-30", status: "pending" },
  { id: 5, type: "funding", client: "Sarah Williams", amount: 20000, method: "card", date: "2024-03-27", status: "completed" },
  { id: 6, type: "withdrawal", provider: "Sparkle Cleaners", amount: 25000, fee: 100, date: "2024-03-26", status: "completed" },
  { id: 7, type: "payment", service: "Smart Home Setup", client: "David Brown", provider: "TechGenius", amount: 35000, commission: 3500, date: "2024-03-29", status: "completed" },
];

export default function TransactionManagement() {
  const { isDark } = useTheme();
  const [transactions, setTransactions] = useState(MOCK_ALL_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = (tx.client || tx.provider || tx.service || '')
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalRevenue = transactions
    .filter(tx => tx.type === 'payment' && tx.status === 'completed')
    .reduce((sum, tx) => sum + (tx.commission || 0), 0);
  
  const totalVolume = transactions
    .filter(tx => tx.type === 'payment' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const pendingWithdrawals = transactions
    .filter(tx => tx.type === 'withdrawal' && tx.status === 'pending')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Transaction Management
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Monitor all platform transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Platform Revenue</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Transaction Volume</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{totalVolume.toLocaleString()}
            </p>
          </div>
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending Withdrawals</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{pendingWithdrawals.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className={`flex-1 min-w-[200px] flex items-center gap-2 rounded-full px-5 py-2.5 border ${
            isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-white border-gray-200'
          }`}>
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by client, provider, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm ${
                isDark ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
              }`}
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`px-4 py-2.5 rounded-full border text-sm ${
              isDark 
                ? 'bg-[#1a1a1a] border-[#333] text-white' 
                : 'bg-white border-gray-200 text-gray-700'
            }`}
          >
            <option value="all">All Transactions</option>
            <option value="payment">Payments</option>
            <option value="funding">Wallet Funding</option>
            <option value="withdrawal">Withdrawals</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-200'}`}>
                  <th className="text-left py-4 px-6 text-sm font-semibold">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Details</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Commission</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className={`border-b ${isDark ? 'border-[#222]' : 'border-gray-100'}`}>
                    <td className="py-4 px-6 text-sm">#{tx.id}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        tx.type === 'payment' ? 'bg-blue-500/10 text-blue-600' :
                        tx.type === 'funding' ? 'bg-green-500/10 text-green-600' :
                        'bg-orange-500/10 text-orange-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {tx.type === 'payment' ? (
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {tx.service}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {tx.client} → {tx.provider}
                          </p>
                        </div>
                      ) : tx.type === 'funding' ? (
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {tx.client}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            via {tx.method}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {tx.provider}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Bank withdrawal
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ₦{tx.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      {tx.commission ? (
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          ₦{tx.commission.toLocaleString()}
                        </p>
                      ) : tx.fee ? (
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          ₦{tx.fee.toLocaleString()} fee
                        </p>
                      ) : (
                        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>-</p>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm">{tx.date}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tx.status === 'completed' 
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-yellow-500/10 text-yellow-600'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}