// src/pages/provider/Wallet.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_EARNINGS = {
  available: 87500,
  pending: 45000,
  totalEarned: 187500,
  thisMonth: 87500
};

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: "earning",
    amount: 15000,
    amountFormatted: "₦15,000",
    date: "2024-03-28",
    description: "Payment from Mr. Adewale - Electrical Installation",
    status: "completed",
    jobId: "JOB_101"
  },
  {
    id: 2,
    type: "earning",
    amount: 25000,
    amountFormatted: "₦25,000",
    date: "2024-03-25",
    description: "Payment from Mrs. Okafor - AC Repair",
    status: "completed",
    jobId: "JOB_102"
  },
  {
    id: 3,
    type: "withdrawal",
    amount: 50000,
    amountFormatted: "₦50,000",
    date: "2024-03-20",
    description: "Withdrawal to GTBank ****1234",
    status: "completed",
    reference: "WDR_001"
  },
  {
    id: 4,
    type: "earning",
    amount: 8000,
    amountFormatted: "₦8,000",
    date: "2024-03-22",
    description: "Payment from Mr. Emeka - Plumbing Service",
    status: "pending",
    jobId: "JOB_103"
  }
];

export default function ProviderWallet() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (amount > MOCK_EARNINGS.available) {
      alert('Insufficient balance');
      return;
    }
    
    // In real app, make API call to process withdrawal
    console.log('Withdrawal requested:', { amount, bank: selectedBank, accountNumber });
    setShowWithdrawModal(false);
    setShowSuccessModal(true);
    setWithdrawAmount('');
    setSelectedBank('');
    setAccountNumber('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f0f]' : 'bg-[#f7f9ff]'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My Wallet
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Manage your earnings and withdrawals
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-gradient-to-br from-[#141414] to-[#1a1a1a] border-[#222]' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
          }`}>
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Available Balance</p>
            <p className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{MOCK_EARNINGS.available.toLocaleString()}
            </p>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="text-sm text-[#1A73E8] font-medium hover:underline"
            >
              Withdraw →
            </button>
          </div>
          
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending Clearance</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{MOCK_EARNINGS.pending.toLocaleString()}
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Will be available in 3-5 business days
            </p>
          </div>
          
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Earned</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ₦{MOCK_EARNINGS.totalEarned.toLocaleString()}
            </p>
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              ₦{MOCK_EARNINGS.thisMonth.toLocaleString()} this month
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Transaction History
          </h2>
          
          {MOCK_TRANSACTIONS.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">💸</div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No transactions yet
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {MOCK_TRANSACTIONS.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    isDark ? 'border-[#222]' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'earning' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {transaction.type === 'earning' ? '💰' : '💸'}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.description}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {formatDate(transaction.date)} • {transaction.type === 'earning' ? 'Job ID:' : 'Ref:'} {transaction.jobId || transaction.reference}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'earning' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'earning' ? '+' : '-'} {transaction.amountFormatted}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Withdrawal Info */}
        <div className={`mt-6 p-4 rounded-xl border ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Withdrawal Information
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Withdrawals are processed within 24-48 hours to your Nigerian bank account. 
                Minimum withdrawal amount is ₦10,000. A small processing fee of ₦100 applies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Withdraw Funds
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Amount (₦)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Available: ₦{MOCK_EARNINGS.available.toLocaleString()} • Min: ₦10,000
                </p>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                    isDark 
                      ? 'bg-[#0f0f0f] border-[#333] text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="">Select a bank</option>
                  <option value="gtbank">GTBank</option>
                  <option value="firstbank">First Bank</option>
                  <option value="access">Access Bank</option>
                  <option value="uba">UBA</option>
                  <option value="zenith">Zenith Bank</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="10-digit account number"
                  maxLength="10"
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
                onClick={handleWithdraw}
                disabled={!withdrawAmount || !selectedBank || !accountNumber}
                className="flex-1 px-4 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request Withdrawal
              </button>
              <button
                onClick={() => setShowWithdrawModal(false)}
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl p-6 text-center ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
            <div className="text-5xl mb-4">✅</div>
            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Withdrawal Request Submitted!
            </h2>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your withdrawal request has been submitted successfully.
              Funds will be processed within 24-48 hours.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-4 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}