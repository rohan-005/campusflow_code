import { useState } from "react";
import { createAsset } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";

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

    setForm({
      name: "",
      category: "",
      location: "",
      totalQuantity: 1,
    });
  };

  return (
    <DashboardLayout>
      <h2 style={{ marginBottom: "20px" }}>Create Asset</h2>

      <form
        onSubmit={handleCreate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          type="number"
          value={form.totalQuantity}
          onChange={(e) =>
            setForm({ ...form, totalQuantity: e.target.value })
          }
        />

        <button type="submit">Create</button>
      </form>
    </DashboardLayout>
  );
};

export default AdminDashboard;