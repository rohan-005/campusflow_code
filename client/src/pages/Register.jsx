import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please check your information and try again.";
      setError(errorMessage);
      console.error("Registration error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;