/* eslint-disable react-hooks/purity */
import { useEffect, useState } from "react";
import { getAllAssets } from "../api/assetApi";
import { createRequest } from "../api/requestApi";
import DashboardLayout from "../layout/DashboardLayout";

const StudentDashboard = () => {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    const data = await getAllAssets();
    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleRequest = async (assetId) => {
    await createRequest({
      assetId,
      dueDate: new Date(Date.now() + 7 * 86400000),
    });
    alert("Request submitted");
  };

  return (
    <DashboardLayout>
      <h2>Available Assets</h2>
      {assets.map((asset) => (
        <div key={asset.id}>
          <h4>{asset.name}</h4>
          <p>{asset.category}</p>
          <p>
            {asset.availableQuantity} / {asset.totalQuantity}
          </p>
          <button onClick={() => handleRequest(asset.id)}>
            Request
          </button>
          <hr />
        </div>
      ))}
    </DashboardLayout>
  );
};

export default StudentDashboard;