"use client"
import { AuthProviderProps, IAuthContext } from "@/types/useAuth.types";
import { createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies } from 'nookies';
import { useUserLogoutMutation } from '@/Redux/RTK_API/Auth_Api'


const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => { },
  logout: () => { },
  user: null,
  setUser: () => { },
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;
    const userData = JSON.parse(cookies.userData || "{}");
    setToken(accessToken);
    setUser(userData)
  }, []);

  const [userLogout] = useUserLogoutMutation();
  const logout = () => {
    userLogout({ accessToken: token });
    destroyCookie({}, 'accessToken', { path: "/" });
    destroyCookie({}, 'userData', { path: "/" });
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ token, setToken, logout, user, setUser, }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Auth hook
 * @returns {React.ContextType<typeof AuthContext>} - Auth context
*/
const useAuth = (): React.ContextType<typeof AuthContext> => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
