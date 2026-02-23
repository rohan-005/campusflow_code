/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setError(null);

      const res = await loginUser(data);

      const { token, email, role } = res.data;

      // store everything
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email, role }));

      const userData = { email, role };
      setUser(userData);

      return userData; // 🔥 return actual user
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // restore session on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};