import { useEffect, useState } from "react";
import { getAllRequests, approveRequest, rejectRequest } from "../api/requestApi";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetch = async () => {
    const data = await getAllRequests();
    setRequests(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h2>All Requests</h2>

      {requests.map((req) => (
        <div key={req.id}>
          <p>Asset: {req.assetId}</p>
          <p>User: {req.userId}</p>
          <p>Status: {req.approvalStatus}</p>

          {req.approvalStatus === "Pending" && (
            <>
              <button onClick={() => approveRequest(req.id)}>Approve</button>
              <button onClick={() => rejectRequest(req.id)}>Reject</button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllRequests;