import axios from "axios";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { BASE_URL } from "../Appconfig";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = document.cookie.split("=")[1];

        const response = await axios.get(
          `${BASE_URL}/api/accounts/get-logged-user`,
          {
            withCredentials: true,
          }
        );

        const result = response.data;
        setUser(result.data);
      } catch (error) {
        console.error("Fetch user error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/accounts/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const result = response.data;

      setUser(result.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/accounts/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
