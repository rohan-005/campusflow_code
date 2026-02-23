import { useEffect, useState } from "react";
import { getApprovedAssets } from "../api/assetApi";
import { createRequest } from "../api/requestApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/dashboard.css";
import showToast from "../utils/toast";

const StudentDashboard = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getApprovedAssets();
      setAssets(data);
    };
    fetch();
  }, []);

  const handleRequest = async (id) => {
    await createRequest({
      assetId: id,
      dueDate: new Date(Date.now() + 7 * 86400000),
    });
    showToast("Request submitted", "success");
  };

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Available Assets</h2>

        {assets.map((asset) => (
          <div key={asset.id} className="card">
            <h3>{asset.name}</h3>
            <p>Category: {asset.category}</p>
            <p>Location: {asset.location}</p>
            <p>
              Available: {asset.availableQuantity} / {asset.totalQuantity}
            </p>

            {asset.availableQuantity > 0 ? (
              <button
                className="btn btn-primary"
                onClick={() => handleRequest(asset.id)}
              >
                Request
              </button>
            ) : (
              <button className="btn btn-disabled" disabled>
                Out of Stock
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;