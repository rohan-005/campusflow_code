import { useEffect, useState } from "react";
import { getPendingAssets, approveAsset } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";

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
      <h2>Pending Assets</h2>

      {assets.map((asset) => (
        <div key={asset.id}>
          <h3>{asset.name}</h3>
          <p>{asset.category}</p>
          <button onClick={() => handleApprove(asset.id)}>
            Approve
          </button>
          <hr />
        </div>
      ))}
    </DashboardLayout>
  );
};

export default PendingAssets;