// src/pages/client/Wallet.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: "funding",
    amount: 50000,
    amountFormatted: "₦50,000",
    date: "2024-03-20",
    description: "Wallet funding via Paystack",
    status: "completed",
    reference: "PAY_123456789"
  },
  {
    id: 2,
    type: "payment",
    amount: 15000,
    amountFormatted: "₦15,000",
    date: "2024-03-28",
    description: "Payment to James Okafor - Electrical Installation",
    status: "completed",
    reference: "JOB_101"
  },
  {
    id: 3,
    type: "payment",
    amount: 25000,
    amountFormatted: "₦25,000",
    date: "2024-03-25",
    description: "Payment to Mike Adeyemi - AC Repair",
    status: "completed",
    reference: "JOB_102"
  },
  {
    id: 4,
    type: "funding",
    amount: 20000,
    amountFormatted: "₦20,000",
    date: "2024-03-15",
    description: "Wallet funding via Bank Transfer",
    status: "completed",
    reference: "PAY_987654321"
  }
];

export default function ClientWallet() {
  const { user, updateWalletBalance } = useAuth();
  const { isDark } = useTheme();
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [recentTransaction, setRecentTransaction] = useState(null);

  const walletBalance = user?.walletBalance || 50000;

  const handleFundWallet = () => {
    const amount = parseInt(fundAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    // In real app, this would trigger Paystack/Flutterwave payment
    // For now, simulate successful funding
    updateWalletBalance(amount, 'add');
    
    setRecentTransaction({
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      reference: `PAY_${Date.now()}`
    });
    
    setShowFundModal(false);
    setShowSuccessModal(true);
    setFundAmount('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
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
            Manage your funds and transaction history
          </p>
        </div>

        {/* Balance Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border p-8 transition-colors duration-300 ${
              isDark ? 'bg-gradient-to-br from-[#141414] to-[#1a1a1a] border-[#222]' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Available Balance</p>
              <p className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ₦{walletBalance.toLocaleString()}
              </p>
              <button
                onClick={() => setShowFundModal(true)}
                className="px-6 py-3 bg-[#1A73E8] text-white rounded-full font-medium hover:bg-blue-700 transition"
              >
                + Fund Wallet
              </button>
            </div>
          </div>
          
          <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
            isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-gray-100'
          }`}>
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</span>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ₦{MOCK_TRANSACTIONS.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Funded</span>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ₦{MOCK_TRANSACTIONS.filter(t => t.type === 'funding').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Transactions</span>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {MOCK_TRANSACTIONS.length}
                </span>
              </div>
            </div>
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
              <button
                onClick={() => setShowFundModal(true)}
                className="mt-4 text-[#1A73E8] text-sm font-medium hover:underline"
              >
                Fund your wallet →
              </button>
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
                        {formatDate(transaction.date)} • Ref: {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'funding' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'funding' ? '+' : '-'} {transaction.amountFormatted}
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
      </div>

      {/* Fund Wallet Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl p-6 ${isDark ? 'bg-[#141414]' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fund Your Wallet
            </h2>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount (₦)
              </label>
              <input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Enter amount"
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#1A73E8] ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-[#333] text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
            
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Payment Method
              </label>
              <div className="space-y-2">
                {[
                  { value: 'card', label: '💳 Card Payment', description: 'Visa, Mastercard, Verve' },
                  { value: 'bank', label: '🏦 Bank Transfer', description: 'Direct bank transfer' },
                  { value: 'ussd', label: '📱 USSD', description: 'Quick USSD payment' }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      selectedPaymentMethod === method.value
                        ? 'border-[#1A73E8] bg-[#1A73E8]/5'
                        : isDark ? 'border-[#222]' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={selectedPaymentMethod === method.value}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="accent-[#1A73E8]"
                    />
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {method.label}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {method.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleFundWallet}
                className="flex-1 px-4 py-3 bg-[#1A73E8] text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Proceed to Pay
              </button>
              <button
                onClick={() => setShowFundModal(false)}
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
              Funding Successful!
            </h2>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              ₦{recentTransaction?.amount?.toLocaleString()} has been added to your wallet.
            </p>
            <p className={`text-xs mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Reference: {recentTransaction?.reference}
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