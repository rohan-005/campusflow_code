/* eslint-disable react-hooks/set-state-in-effect */
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
      const response = await loginUser(data);

      const { token, email, role } = response.data;

      localStorage.setItem("token", token);

      setUser({ email, role });
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};