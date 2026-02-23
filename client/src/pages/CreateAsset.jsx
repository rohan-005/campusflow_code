import { useState } from "react";
import { createStudentAsset } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";
import "./resources.css";

const CreateAsset = () => {
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
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setSuccess("");

    await createStudentAsset({
      ...form,
      totalQuantity: Number(form.totalQuantity),
    });

    setLoading(false);
    setSuccess("Asset submitted for approval 🎉");

    setForm({
      name: "",
      category: "",
      location: "",
      totalQuantity: 1,
    });
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2 className="page-title">Upload Asset</h2>

        <form className="card-form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Asset Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Description"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <input
            className="input"
            type="number"
            min="1"
            value={form.totalQuantity}
            onChange={(e) =>
              setForm({ ...form, totalQuantity: e.target.value })
            }
          />

          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Asset"}
          </button>

          {success && (
            <p className="success-message">{success}</p>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateAsset;