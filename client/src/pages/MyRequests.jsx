import { useEffect, useState } from "react";
import { getMyRequests } from "../api/requestApi";
import DashboardLayout from "../layout/DashboardLayout";
import "./resources.css";

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
    <DashboardLayout>
      <div className="page-container">
        <h2 className="page-title">My Asset Requests</h2>

        {requests.length === 0 && (
          <p className="empty-text">No requests yet.</p>
        )}

        {requests.map((req) => (
          <div className="card" key={req.id}>
            <p><strong>Asset ID:</strong> {req.assetId}</p>
            <span className={`badge ${req.approvalStatus.toLowerCase()}`}>
              {req.approvalStatus}
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MyRequests;