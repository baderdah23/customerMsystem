import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "./ToastContext";
import { useNavigate } from "react-router-dom";

export interface User {
  id?: string;
  username?: string;
  email?: string;
  [key: string]: string | undefined;
}

interface AuthContextType {
  user: User | null;
  error: string;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:8000";

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        throw Error(data.message);
      }
      setUser(data.user);
    } catch (error: any) {
      toast.error(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
  ): Promise<void> => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        throw Error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        throw Error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const logout = async () => {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (!data.success) {
      throw Error(data.message);
    }
    toast.success(data.message);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, error, signup, login, logout, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
