import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log("Połączono z context api");
  }, []);

  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
