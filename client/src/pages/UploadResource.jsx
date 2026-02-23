import { useState } from "react";
import { uploadResource } from "../api/resourceApi";
import DashboardLayout from "../layout/DashboardLayout";

const UploadResource = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", form.title);
    formData.append("Description", form.description);
    formData.append("Category", form.category);

    if (file) formData.append("file", file);

    await uploadResource(formData);

    alert("Resource submitted for approval");
  };

  return (
    <DashboardLayout>
      <h2>Upload Resource</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">Submit</button>
      </form>
    </DashboardLayout>
  );
};

export default UploadResource;