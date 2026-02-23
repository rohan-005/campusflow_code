import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setError(null);

      const response = await loginUser(data);
      const { token, email, role } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email, role }));

      setUser({ email, role });

      return { email, role };   // 🔥 important for redirect
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Invalid email or password";

      setError(message);
      setUser(null);
      throw err;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setError(null);
  };

  // Restore session on refresh
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};