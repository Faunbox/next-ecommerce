import { useSession } from "../lib/next-auth-react-query";
import { useSession as sessionAuth } from "next-auth/react";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, loading] = useSession({
    required: true,
    redirectTo: process.env.VERCEL_URL,
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3,
      refetchInterval: 60 * 1000 * 5,
    },
  });
  const [userSession, setUserSession] = useState({});

  const checkSession = async () => {
    const user = await session;
    user ? setUserSession(await user.user) : setUserSession(null);
    return userSession;
  };

  useEffect(() => {
    const userSession = checkSession();
    const sesja = sessionAuth();
    console.log("sesja", sesja);
    return userSession;
  }, [session]);

  const value = { userSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
