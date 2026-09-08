import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('siddha_admin_token');
      if (token && token !== 'undefined') {
        try {
          const res = await API.get('/auth/me');
          const adminData = res.data.data?.admin || res.data.admin;
          setAdmin(adminData);
        } catch (err) {
          localStorage.removeItem('siddha_admin_token');
          setAdmin(null);
        }
      } else {
        localStorage.removeItem('siddha_admin_token');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const token = res.data.data?.token || res.data.token;
    const adminData = res.data.data?.admin || res.data.admin;

    if (token) {
      localStorage.setItem('siddha_admin_token', token);
      setAdmin(adminData);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('siddha_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
