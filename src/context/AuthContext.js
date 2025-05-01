import { createContext } from "react";

import { useEffect, useState } from "react";
import { supabase } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthenticated(session);
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuthenticated(session);
          setIsLoggedin(true);
        } else {
          setAuthenticated(null);
          setIsLoggedin(false);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, isLoggedin, setAuthenticated, setIsLoggedin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
