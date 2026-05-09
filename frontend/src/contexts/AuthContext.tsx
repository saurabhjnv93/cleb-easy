import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from '../api/client';

type UserProfile = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  signIn: (token: string, profile: UserProfile) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('celebeasy_token');
    if (token) {
      api.get('/auth/profile')
        .then((response) => setUser(response.data.user))
        .catch(() => {
          localStorage.removeItem('celebeasy_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = (token: string, profile: UserProfile) => {
    localStorage.setItem('celebeasy_token', token);
    setUser(profile);
  };

  const signOut = () => {
    localStorage.removeItem('celebeasy_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
