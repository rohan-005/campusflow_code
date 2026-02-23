import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import DashboardLayout from "../layout/DashboardLayout";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetch();
  }, []);

  return (
    <DashboardLayout>
      <h2>All Users</h2>

      <table
        style={{
          width: "100%",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Student ID</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.studentId}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default AllUsers;