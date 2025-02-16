import { createContext } from "react";

import { useEffect, useState } from "react";
import { checkLoggedIn } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    checkLoggedIn(setIsLoggedin, setAuthenticated);
  }, []);
  return (
    <AuthContext.Provider
      value={{ authenticated, isLoggedin, setAuthenticated, setIsLoggedin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
