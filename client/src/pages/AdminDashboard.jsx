import { useState } from "react";
import { createAsset } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/admin.css";
import showToast from "../utils/toast";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    totalQuantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.location) {
      showToast("Please fill all fields", "error");
      return;
    }

    setLoading(true);
    setSuccess("");

    await createAsset({
      ...form,
      totalQuantity: Number(form.totalQuantity),
    });

    setLoading(false);
    setSuccess("Asset created successfully 🎉");
    showToast("Asset created successfully 🎉", "success");

    setForm({
      name: "",
      category: "",
      location: "",
      totalQuantity: 1,
    });
  };

  return (
    <DashboardLayout>
      <div className="admin-page">
        <h2 className="admin-title">Create Asset</h2>

        <form className="admin-card" onSubmit={handleSubmit}>
          <input
            className="admin-input"
            placeholder="Asset Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="admin-input"
            placeholder="Description"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            className="admin-input"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            className="admin-input"
            type="number"
            min="1"
            value={form.totalQuantity}
            onChange={(e) =>
              setForm({ ...form, totalQuantity: e.target.value })
            }
          />

          <button
            type="submit"
            className="admin-btn-primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Asset"}
          </button>

          {success && (
            <p className="admin-success">{success}</p>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;