import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>CampusFlow</h2>

      <div className="nav-links">
        {user.role === "Student" && (
          <>
            <Link to="/student">Dashboard</Link>
            <Link to="/upload-resource">Upload Notes</Link>
            <Link to="/approved-resources">Available Notes</Link>
          </>
        )}

        {user.role === "Admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/pending-resources">Pending Notes</Link>
            <Link to="/pending-assets">Pending Assets</Link>
            <Link to="/all-users">Users</Link>
          </>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;