import { useEffect, useState } from "react";
import { getApprovedAssets } from "../api/assetApi";
import { createRequest } from "../api/requestApi";
import DashboardLayout from "../layout/DashboardLayout";

const StudentDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await getApprovedAssets(); // 🔥 only approved
      setAssets(data);
    } catch (err) {
      console.error("Failed to fetch assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleRequest = async (id) => {
    try {
      await createRequest({
        assetId: id,
        dueDate: new Date(Date.now() + 7 * 86400000),
      });

      alert("Request submitted successfully");
      fetchAssets(); // refresh quantities
    } catch (err) {
      alert("Failed to submit request");
    }
  };

  return (
    <DashboardLayout>
      <h2>Available Assets</h2>

      {loading && <p>Loading assets...</p>}

      {!loading && assets.length === 0 && (
        <p>No approved assets available.</p>
      )}

      {!loading &&
        assets.map((asset) => (
          <div
            key={asset.id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <h3>{asset.name}</h3>
            <p>Category: {asset.category}</p>
            <p>Location: {asset.location}</p>
            <p>
              Available: {asset.availableQuantity} / {asset.totalQuantity}
            </p>

            {asset.availableQuantity > 0 ? (
              <button onClick={() => handleRequest(asset.id)}>
                Request
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
        ))}
    </DashboardLayout>
  );
};

export default StudentDashboard;