import { useEffect, useState, useMemo } from "react";
import { getAllRequests } from "../api/requestApi";
import { getApprovedAssets } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/dashboard.css";

const AllRequestsAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [requestData, assetData] = await Promise.all([
        getAllRequests(),
        getApprovedAssets(),
      ]);

      setRequests(requestData);
      setAssets(assetData);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAssetDetails = (assetId) =>
    assets.find((a) => a.id === assetId);

  const getStatusText = (status) => {
    if (status === 0) return "Pending";
    if (status === 1) return "Approved";
    if (status === 2) return "Rejected";
    return status;
  };

  const getStatusClass = (status) => {
    const text = getStatusText(status).toLowerCase();
    return `badge badge-${text}`;
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const asset = getAssetDetails(req.assetId);
      const nameMatch = asset?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch = getStatusText(req.approvalStatus)
        .toLowerCase()
        .includes(search.toLowerCase());

      return nameMatch || statusMatch;
    });
  }, [requests, search, assets]);

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">All Asset Requests</h2>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search by asset name or status..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="loading-text">Loading...</p>}

        {!loading && filteredRequests.length === 0 && (
          <div className="empty-state">
            No matching requests found.
          </div>
        )}

        {!loading &&
          filteredRequests.map((req) => {
            const asset = getAssetDetails(req.assetId);

            return (
              <div key={req.id} className="card">
                <h3>Request #{req.id}</h3>

                {asset ? (
                  <>
                    <p><strong>Asset:</strong> {asset.name}</p>
                    <p><strong>Category:</strong> {asset.category}</p>
                    <p><strong>Location:</strong> {asset.location}</p>
                  </>
                ) : (
                  <p><strong>Asset ID:</strong> {req.assetId}</p>
                )}

                <p><strong>User ID:</strong> {req.userId}</p>

                <div className="status-row">
                  <span>Status:</span>
                  <span className={getStatusClass(req.approvalStatus)}>
                    {getStatusText(req.approvalStatus)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default AllRequestsAdmin;