import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    // Initialize the authenticated state from local storage on startup
    return (
      JSON.parse(localStorage.getItem("theworklabadminauthenticated")) || false
    );
  });

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  useEffect(() => {
    // Update local storage whenever the authenticated state changes
    localStorage.setItem(
      "theworklabadminauthenticated",
      JSON.stringify(authenticated)
    );
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
