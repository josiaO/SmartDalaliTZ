import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "superuser" | "agent" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  trialEndsAt?: string;
  subscriptionActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for testing
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@smartdalali.com": {
    password: "admin123",
    user: {
      id: "1",
      email: "admin@smartdalali.com",
      name: "Admin User",
      role: "superuser",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
  },
  "agent@smartdalali.com": {
    password: "agent123",
    user: {
      id: "2",
      email: "agent@smartdalali.com",
      name: "John Agent",
      role: "agent",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent",
      trialEndsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      subscriptionActive: true,
    },
  },
  "user@smartdalali.com": {
    password: "user123",
    user: {
      id: "3",
      email: "user@smartdalali.com",
      name: "Jane Doe",
      role: "user",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("smartdalali_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser = MOCK_USERS[email];
    
    if (!mockUser || mockUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    setUser(mockUser.user);
    localStorage.setItem("smartdalali_user", JSON.stringify(mockUser.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartdalali_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
