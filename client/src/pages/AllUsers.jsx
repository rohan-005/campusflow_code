import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";

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
    <div>
      <h2>All Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllUsers;