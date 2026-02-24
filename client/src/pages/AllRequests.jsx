import { useEffect, useState, useMemo } from "react";
import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "../api/requestApi";
import { getApprovedAssets } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/dashboard.css";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [requestData, assetData] = await Promise.all([
        getPendingRequests(),
        getApprovedAssets(), // 🔥 FIXED (more correct)
      ]);

      setRequests(requestData);
      setAssets(assetData);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);
      await approveRequest(id);

      // Remove request instantly from UI
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Approve Error:", err.response?.data || err.message);
      alert("Approve failed.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessingId(id);
      await rejectRequest(id);

      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Reject Error:", err.response?.data || err.message);
      alert("Reject failed.");
    } finally {
      setProcessingId(null);
    }
  };

  const getAssetDetails = (assetId) =>
    assets.find((a) => a.id === assetId);

  const filteredRequests = useMemo(() => {
    return requests
      .sort((a, b) => b.id - a.id)
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

        {error && <p className="error-text">{error}</p>}

        {!loading && filteredRequests.length === 0 && !error && (
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
                  <span className="badge badge-pending">
                    Pending
                  </span>
                </div>

                <div className="button-group">
                  <button
                    className="btn btn-success"
                    disabled={processingId === req.id}
                    onClick={() => handleApprove(req.id)}
                  >
                    {processingId === req.id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  <button
                    className="btn btn-danger"
                    disabled={processingId === req.id}
                    onClick={() => handleReject(req.id)}
                  >
                    {processingId === req.id
                      ? "Processing..."
                      : "Reject"}
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