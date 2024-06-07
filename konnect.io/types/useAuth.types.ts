interface IAuthContext {
  token: any;
  setToken: (token: any) => void;
  logout: () => void;
  user: any;
  setUser: (user: any) => void;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export type { IAuthContext, AuthProviderProps };
