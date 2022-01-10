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
  const [sesja, setSesja] = useState({});

  const checkSession = async () => {
    const user = await session;
    const uzytkownik = sessionAuth();
    user ? setUserSession(await user.user) : setUserSession(null);
    console.log("user", user);
    console.log("uzytkownik", uzytkownik);
    return userSession;
  };

  useEffect(() => {
    const userSession = checkSession();
    const sesja = sessionAuth();
    console.log("sesja", sesja);
    return userSession;
  }, [loading]);

  const value = { userSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
