import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/dashboard.css";

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
      <div className="dashboard-container">
        <h2 className="dashboard-title">All Users</h2>

        <div className="table-container">
          <table>
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
                  <td>
                    {u.isActive ? (
                      <span className="badge badge-approved">
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-rejected">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllUsers;