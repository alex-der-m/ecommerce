import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

const login = (username, password) => {
  let userData;

  if (username === 'admin' && password === 'admin') {
    userData = {
      username: 'admin',
      role: 'admin',
    };
  } else if (username && password) {
    userData = {
      username,
      role: 'user',
    };
  } else {
    return null;
  }

  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));
  return userData;
};

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);