import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddEmployee() {
  const navigate = useNavigate();
  const emptyForm = {
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("employees/", form);
      alert("Employee added successfully!");
      navigate("/employees");
    } catch (err) {
      console.error("SAVE ERROR 👉", err.response?.data);
      alert(JSON.stringify(err.response?.data || "An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          required
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />
        <input
          placeholder="Full Name"
          value={form.full_name}
          required
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          required
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Department"
          value={form.department}
          required
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}
