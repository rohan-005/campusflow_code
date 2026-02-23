import { useState } from "react";
import { uploadResource } from "../api/resourceApi";
import DashboardLayout from "../layout/DashboardLayout";
import "./resources.css";

const UploadResource = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Description", form.description);
    formData.append("Category", form.category);

    if (file) formData.append("file", file);

    await uploadResource(formData);

    setLoading(false);
    setSuccess("Resource submitted for approval 🎉");

    setForm({ title: "", description: "", category: "" });
    setFile(null);
  };

  return (
    <DashboardLayout>
      <div className="page-container">
        <h2 className="page-title">Upload Resource</h2>

        <form className="card-form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <textarea
            className="textarea"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="file"
            className="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="btn-primary" disabled={loading}>
            {loading ? "Uploading..." : "Submit Resource"}
          </button>

          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UploadResource;