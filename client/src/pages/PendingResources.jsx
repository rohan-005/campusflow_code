import { useEffect, useState } from "react";
import {
  getPendingResources,
  approveResource,
  rejectResource,
} from "../api/resourceApi";
import DashboardLayout from "../layout/DashboardLayout";
import "./resources.css";

const PendingResources = () => {
  const [resources, setResources] = useState([]);

  const fetchData = async () => {
    const data = await getPendingResources();
    setResources(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    await approveResource(id);
    fetchData();
  };

  const handleReject = async (id) => {
    await rejectResource(id);
    fetchData();
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2 className="page-title">Pending Notes</h2>

        {resources.map((r) => (
          <div className="card" key={r.id}>
            <h3>{r.title}</h3>
            <p><strong>Category:</strong> {r.category}</p>
            <p>{r.description}</p>

            {r.filePath && (
              <a
                className="link"
                href={`${import.meta.env.VITE_API_URL}${r.filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                View Uploaded File
              </a>
            )}

            <div className="button-group">
              <button
                className="btn-success"
                onClick={() => handleApprove(r.id)}
              >
                Approve
              </button>

              <button
                className="btn-danger"
                onClick={() => handleReject(r.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default PendingResources;