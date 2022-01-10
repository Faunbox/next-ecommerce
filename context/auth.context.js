import { useSession } from "../lib/next-auth-react-query";
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
    return userSession;
  }, [loading]);

  const value = { userSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
