// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Mock users for frontend testing
const MOCK_USERS = [
  {
    id: 1,
    name: 'John Client',
    email: 'client@test.com',
    phone: '08012345678',
    role: 'client',
    password: 'password123',
    walletBalance: 50000,
    avatar: null
  },
  {
    id: 2,
    name: 'Mike Provider',
    email: 'provider@test.com',
    phone: '08087654321',
    role: 'provider',
    password: 'password123',
    walletBalance: 25000,
    badge: 'verified',
    completedJobs: 5,
    avatar: null
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'admin',
    password: 'admin123',
    avatar: null
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('serveCity_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('serveCity_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('serveCity_token', 'mock-jwt-token');
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (userData) => {
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      walletBalance: userData.role === 'client' ? 0 : undefined,
      completedJobs: userData.role === 'provider' ? 0 : undefined,
      badge: userData.role === 'provider' ? null : undefined,
    };
    
    MOCK_USERS.push(newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('serveCity_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('serveCity_token', 'mock-jwt-token');
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('serveCity_user');
    localStorage.removeItem('serveCity_token');
    // ❌ NO navigate() here! Navigation happens in the component
  };

  const updateWalletBalance = (amount, operation = 'add') => {
    if (user && user.role === 'client') {
      const newBalance = operation === 'add' 
        ? user.walletBalance + amount 
        : user.walletBalance - amount;
      
      const updatedUser = { ...user, walletBalance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('serveCity_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateWalletBalance,
    isAuthenticated: !!user,
    isClient: user?.role === 'client',
    isProvider: user?.role === 'provider',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};