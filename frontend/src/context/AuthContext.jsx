import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth") || null;
    if (!data) return data;
    return JSON.parse(data);
  });

  const isAuthenticated = !!auth;

  useEffect(() => {
  if (auth) {
    localStorage.setItem("auth", JSON.stringify(auth));
  } else {
    localStorage.removeItem("auth");
  }
}, [auth]);

  const login = (newAuth) => {
    setAuth(newAuth);
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
