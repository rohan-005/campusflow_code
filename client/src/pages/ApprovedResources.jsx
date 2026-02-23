import { useEffect, useState } from "react";
import { getApprovedResources } from "../api/resourceApi";
import DashboardLayout from "../layout/DashboardLayout";
import "./resources.css";

const ApprovedResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getApprovedResources();
      setResources(data);
    };
    fetch();
  }, []);

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2 className="page-title">Available Resources</h2>

        {resources.map((r) => (
          <div className="card" key={r.id}>
            <h3>{r.title}</h3>
            <p>{r.description}</p>

            {r.filePath && (
              <a
                className="link"
                href={`${import.meta.env.VITE_FILE_BASE}${r.filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                View File
              </a>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ApprovedResources;