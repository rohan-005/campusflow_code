import { useEffect, useState } from "react";
import { getApprovedResources } from "../api/resourceApi";
import DashboardLayout from "../layout/DashboardLayout";

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
      <h2>Available Resources</h2>

      {resources.map((r) => (
        <div key={r.id}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>

          {r.filePath && (
            <a
              href={`${import.meta.env.VITE_FILE_BASE}${r.filePath}`}
              target="_blank"
              rel="noreferrer"
            >
              View File
            </a>
          )}

          <hr />
        </div>
      ))}
    </DashboardLayout>
  );
};

export default ApprovedResources;
