import { useEffect, useState } from "react";
import { getAllAssets, createAsset } from "../api/assetApi";
import { getPendingRequests, approveRequest } from "../api/requestApi";
import DashboardLayout from "../layout/DashboardLayout";

const AdminDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    totalQuantity: 1,
  });

  const fetchAssets = async () => {
    const data = await getAllAssets();
    setAssets(data);
  };

  const fetchRequests = async () => {
    const data = await getPendingRequests();
    setRequests(data);
  };

  useEffect(() => {
    fetchAssets();
    fetchRequests();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createAsset(form);
    fetchAssets();
  };

  const handleApprove = async (id) => {
    await approveRequest(id);
    fetchRequests();
    fetchAssets();
  };

  return (
    <DashboardLayout>
      <h2>Admin Dashboard</h2>

      <h3>Create Asset</h3>
      <form onSubmit={handleCreate}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input type="number" onChange={(e) => setForm({ ...form, totalQuantity: e.target.value })} />
        <button type="submit">Create</button>
      </form>

      <h3>Pending Requests</h3>
      {requests.map((req) => (
        <div key={req.id}>
          <p>Asset ID: {req.assetId}</p>
          <button onClick={() => handleApprove(req.id)}>Approve</button>
          <hr />
        </div>
      ))}
    </DashboardLayout>
  );
};

export default AdminDashboard;