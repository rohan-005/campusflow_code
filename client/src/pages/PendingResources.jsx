import { useEffect, useState } from "react";
import {
  getPendingResources,
  approveResource,
  rejectResource,
} from "../api/resourceApi";
import DashboardLayout from "../layout/DashboardLayout";

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
      <h2>Pending Notes</h2>

      {resources.map((r) => (
        <div
          key={r.id}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>{r.title}</h3>
          <p><strong>Category:</strong> {r.category}</p>
          <p>{r.description}</p>

          {r.filePath && (
            <a
              href={`${import.meta.env.VITE_API_URL}${r.filePath}`}
              target="_blank"
              rel="noreferrer"
            >
              View Uploaded File
            </a>
          )}

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleApprove(r.id)}>
              Approve
            </button>

            <button
              onClick={() => handleReject(r.id)}
              style={{ marginLeft: "10px", background: "red", color: "white" }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
};

export default PendingResources;