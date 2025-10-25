import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/api/axios";

export type UserRole = "superuser" | "agent" | "user";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  trialEndsAt?: string;
  subscriptionActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password1: string, password2: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const { data } = await api.get("/auth/me/");
          setUser({
            id: data.id,
            email: data.email,
            username: data.username,
            name: data.profile?.name || data.username,
            role: data.is_superuser ? "superuser" : (data.is_agent ? "agent" : "user"),
            avatarUrl: data.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
            subscriptionActive: data.subscription?.is_active || false,
            trialEndsAt: data.subscription?.trial_end_date,
          });
        } catch (error) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Get JWT tokens
      const { data: tokenData } = await api.post("/auth/token/", {
        email,
        password,
      });

      localStorage.setItem("access_token", tokenData.access);
      localStorage.setItem("refresh_token", tokenData.refresh);

      // Get user profile
      const { data: userData } = await api.get("/auth/me/");
      
      const userObj: User = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        name: userData.profile?.name || userData.username,
        role: userData.is_superuser ? "superuser" : (userData.is_agent ? "agent" : "user"),
        avatarUrl: userData.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
        subscriptionActive: userData.subscription?.is_active || false,
        trialEndsAt: userData.subscription?.trial_end_date,
      };

      setUser(userObj);
      return userObj;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Invalid credentials");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/auth/logout/");
    } catch (error) {
      // Ignore errors
    } finally {
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  };

  const register = async (username: string, email: string, password1: string, password2: string) => {
    try {
      await api.post("/auth/auth/register/", {
        username,
        email,
        password1,
        password2,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
