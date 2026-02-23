import { useEffect, useState, useMemo } from "react";
import {
  getPendingRequests,
  approveRequest,
} from "../api/requestApi";
import { getAllAssets } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/dashboard.css";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [requestData, assetData] = await Promise.all([
        getPendingRequests(),
        getAllAssets(),
      ]);

      setRequests(requestData);
      setAssets(assetData);
    } catch {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    await approveRequest(id);
    fetchData();
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
          Pending Asset Requests
        </h2>

        {/* 🔍 Search Box */}
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
            const asset = getAssetDetails(req.assetId);

            return (
              <div key={req.id} className="card">
                <h3>Request #{req.id}</h3>

                {asset && (
                  <>
                    <p><strong>Asset:</strong> {asset.name}</p>
                    <p><strong>Category:</strong> {asset.category}</p>
                    <p><strong>Location:</strong> {asset.location}</p>
                  </>
                )}

                <p><strong>User ID:</strong> {req.userId}</p>

                <div className="status-row">
                  <span>Status:</span>
                  <span className="badge badge-pending">
                    Pending
                  </span>
                </div>

                <div className="button-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApprove(req.id)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </DashboardLayout>
  );
};

export default AllRequests;