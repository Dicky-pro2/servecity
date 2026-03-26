// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Browse from './pages/public/Browse';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientBookings from './pages/client/Booking';
import ClientWallet from './pages/client/Wallet';
import ClientBrowse from './pages/client/BrowseServices';

// Provider Pages
import ProviderDashboard from './pages/provider/Dashboard';
import ManageListings from './pages/provider/ManageListings';
import JobRequests from './pages/provider/JobRequests';
import ProviderWallet from './pages/provider/Wallet';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import TransactionManagement from './pages/admin/Transactions';
import PlatformSettings from './pages/admin/Settings';

// Profile Page
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Profile Route - All authenticated users */}
            <Route element={<ProtectedRoute allowedRoles={['client', 'provider', 'admin']} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            {/* Client Routes */}
            <Route element={<ProtectedRoute allowedRoles={['client']} />}>
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/client/bookings" element={<ClientBookings />} />
              <Route path="/client/wallet" element={<ClientWallet />} />
              <Route path="/client/browse" element={<ClientBrowse />} />
            </Route>
            
            {/* Provider Routes */}
            <Route element={<ProtectedRoute allowedRoles={['provider']} />}>
              <Route path="/provider/dashboard" element={<ProviderDashboard />} />
              <Route path="/provider/listings" element={<ManageListings />} />
              <Route path="/provider/job-requests" element={<JobRequests />} />
              <Route path="/provider/wallet" element={<ProviderWallet />} />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/transactions" element={<TransactionManagement />} />
              <Route path="/admin/settings" element={<PlatformSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; // Make sure this line exists!