import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <h3>CampusFlow</h3>

      {user?.role === "Admin" && (
        <>
          <Link to="/admin" style={{ marginRight: 10 }}>Dashboard</Link>
        </>
      )}

      {user?.role === "Student" && (
        <>
          <Link to="/student" style={{ marginRight: 10 }}>Dashboard</Link>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;