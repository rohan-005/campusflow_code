import { useState } from "react";
import { createAsset } from "../api/assetApi";

const AssetForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    totalQuantity: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAsset(form);
    refresh();
    setForm({
      name: "",
      category: "",
      location: "",
      totalQuantity: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Asset</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input
        type="number"
        name="totalQuantity"
        value={form.totalQuantity}
        onChange={handleChange}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default AssetForm;