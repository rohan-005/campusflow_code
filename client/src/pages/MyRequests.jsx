import { useEffect, useState, useMemo } from "react";
import { getMyRequests } from "../api/requestApi";
import { getAllAssets } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/dashboard.css";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const [requestData, assetData] = await Promise.all([
        getMyRequests(),
        getAllAssets(),
      ]);

      setRequests(requestData);
      setAssets(assetData);
    } catch {
      console.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusText = (status) => {
    if (typeof status === "string") return status;
    if (status === 0) return "Pending";
    if (status === 1) return "Approved";
    if (status === 2) return "Rejected";
    return "Unknown";
  };

  const getAssetDetails = (assetId) =>
    assets.find((a) => a.id === assetId);

  const filteredRequests = useMemo(() => {
    return requests
      .sort((a, b) => b.id - a.id) // 🔥 Descending
      .filter((req) => {
        const asset = getAssetDetails(req.assetId);
        return asset?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());
      });
  }, [requests, search, assets]);

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">
          My Asset Requests
        </h2>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by asset name..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && (
          <p className="loading-text">Loading requests...</p>
        )}

        {!loading && filteredRequests.length === 0 && (
          <div className="empty-state">
            No matching requests found.
          </div>
        )}

        {!loading &&
          filteredRequests.map((req) => {
            const statusText = getStatusText(req.approvalStatus);
            const asset = getAssetDetails(req.assetId);

            return (
              <div className="card" key={req.id}>
                <h3>Request #{req.id}</h3>

                {asset && (
                  <>
                    <p><strong>Asset:</strong> {asset.name}</p>
                    <p><strong>Category:</strong> {asset.category}</p>
                    <p><strong>Location:</strong> {asset.location}</p>
                  </>
                )}

                {req.dueDate && (
                  <p>
                    <strong>Due Date:</strong>{" "}
                    {new Date(req.dueDate).toLocaleDateString()}
                  </p>
                )}

                <div className="status-row">
                  <span>Status:</span>
                  <span
                    className={`badge badge-${statusText.toLowerCase()}`}
                  >
                    {statusText}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default MyRequests;