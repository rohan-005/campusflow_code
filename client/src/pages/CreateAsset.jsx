import { useState } from "react";
import { createStudentAsset } from "../api/assetApi";
import DashboardLayout from "../layout/DashboardLayout";

const CreateAsset = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    totalQuantity: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createStudentAsset(form);
    alert("Asset submitted for approval");
  };

  return (
    <DashboardLayout>
      <h2>Upload Asset</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="number"
          onChange={(e) => setForm({ ...form, totalQuantity: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </DashboardLayout>
  );
};

export default CreateAsset;