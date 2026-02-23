import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav
      style={{
        padding: "15px 30px",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ margin: 0 }}>CampusFlow</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {user.role === "Student" && (
          <>
            <Link to="/student" style={linkStyle}>Dashboard</Link>
            <Link to="/upload-resource" style={linkStyle}>Upload Notes</Link>
            <Link to="/approved-resources" style={linkStyle}>
              Available Notes
            </Link>
          </>
        )}

        {user.role === "Admin" && (
          <>
            <Link to="/admin" style={linkStyle}>Dashboard</Link>
            <Link to="/pending-resources" style={linkStyle}>
              Pending Notes
            </Link>
            <Link to="/pending-assets" style={linkStyle}>
              Pending Assets
            </Link>
            <Link to="/all-users" style={linkStyle}>
              Users
            </Link>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 500,
};

export default Navbar;