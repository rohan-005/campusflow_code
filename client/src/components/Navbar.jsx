import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        padding: "15px 20px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>CampusFlow</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        {user?.role === "Student" && (
          <>
            <Link to="/student">Dashboard</Link>
            <Link to="/create-asset">Upload Asset</Link>
            <Link to="/upload-resource">Upload Notes</Link>
          </>
        )}

        {user?.role === "Admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/pending-assets">Pending Assets</Link>
            <Link to="/pending-resources">Pending Notes</Link>
            <Link to="/all-users">Users</Link>
          </>
        )}
      </div>

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;