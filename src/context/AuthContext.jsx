import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAdminAuthenticated: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    setIsAdminAuthenticated(storedAuth === 'true');
  }, []);

  const login = () => {
    localStorage.setItem('adminAuth', 'true');
    setIsAdminAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
