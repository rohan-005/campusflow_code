import { useEffect, useState } from "react";
import { getPendingAssets, approveAsset } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "./resources.css";

const PendingAssets = () => {
  const [assets, setAssets] = useState([]);

  const fetch = async () => {
    const data = await getPendingAssets();
    setAssets(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleApprove = async (id) => {
    await approveAsset(id);
    fetch();
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2 className="page-title">Pending Assets</h2>

        {assets.map((asset) => (
          <div className="card" key={asset.id}>
            <h3>{asset.name}</h3>
            <p>{asset.category}</p>

            <button
              className="btn-success"
              onClick={() => handleApprove(asset.id)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default PendingAssets;