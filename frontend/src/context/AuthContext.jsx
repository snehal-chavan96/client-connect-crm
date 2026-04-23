import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { user, role } = JSON.parse(storedAuth);
      setUser(user);
      setRole(role);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple mock logic: if email contains "admin", set role to admin, else client
    const userRole = email.toLowerCase().includes('admin') ? 'admin' : 'client';
    
    const userData = {
      email,
      name: email.split('@')[0],
      role: userRole,
    };

    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);

    // Persist to localStorage
    localStorage.setItem('auth', JSON.stringify({ user: userData, role: userRole }));

    return userRole;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
