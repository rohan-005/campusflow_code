import { useEffect, useState } from "react";
import { getMyRequests } from "../api/requestApi";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getMyRequests();
      setRequests(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>My Requests</h2>

      {requests.map((req) => (
        <div key={req.id}>
          <p>Asset: {req.assetId}</p>
          <p>Status: {req.approvalStatus}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyRequests;