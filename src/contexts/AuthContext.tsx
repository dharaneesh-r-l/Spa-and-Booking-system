import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getCurrentUser, loginUser, loginAdmin, registerUser, logout as logoutService, isAdmin as checkIsAdmin } from '@/services/authService';
import type { User } from '@/types/index';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return { success: result.success, message: result.message };
  };

  const adminLogin = async (email: string, password: string) => {
    const result = await loginAdmin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return { success: result.success, message: result.message };
  };

  const register = async (name: string, email: string, password: string) => {
    const result = await registerUser(name, email, password);
    if (result.success && result.user) {
      // Auto-login after registration
      const loginResult = await loginUser(email, password);
      if (loginResult.success && loginResult.user) {
        setUser(loginResult.user);
      }
    }
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: user !== null,
      isAdmin: user?.role === 'admin' || checkIsAdmin(),
      login,
      adminLogin,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
