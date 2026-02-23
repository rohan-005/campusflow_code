import { useState } from "react";
import { createAsset } from "../api/assetApi";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    totalQuantity: 1,
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    await createAsset(form);
    alert("Asset Created");
  };

  return (
    <div>
      <h2>Create Asset</h2>

      <form onSubmit={handleCreate}>
        <input placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input type="number"
          onChange={(e) => setForm({ ...form, totalQuantity: e.target.value })} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AdminDashboard;