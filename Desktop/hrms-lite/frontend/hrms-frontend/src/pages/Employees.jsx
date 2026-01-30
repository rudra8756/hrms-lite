import { useEffect, useState } from "react";
import api from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  };

  const [form, setForm] = useState(emptyForm);

  const loadEmployees = async () => {
    const res = await api.get("employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`employees/${editingId}/`, form);
      } else {
        await api.post("employees/", form);
      }

      setForm(emptyForm);
      setEditingId(null);
      loadEmployees();
    } catch (err) {
         console.error("SAVE ERROR 👉", err.response?.data);
         alert(JSON.stringify(err.response?.data));
    }
  };

  const editEmployee = (emp) => {
    setForm(emp);
    setEditingId(emp.id);
  };

  const deleteEmployee = async (id) => {
    if (!confirm("Delete this employee?")) return;
    await api.delete(`employees/${id}/`);
    loadEmployees();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee ID"
          value={form.employee_id}
          required
          onChange={e => setForm({ ...form, employee_id: e.target.value })}
        />
        <input
          placeholder="Full Name"
          value={form.full_name}
          required
          onChange={e => setForm({ ...form, full_name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Department"
          value={form.department}
          required
          onChange={e => setForm({ ...form, department: e.target.value })}
        />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <h2>Employee List</h2>

      {employees.map(emp => (
        <div key={emp.id} style={{ marginBottom: 8 }}>
          <b>{emp.full_name}</b> ({emp.department})
          <button onClick={() => editEmployee(emp)}>Edit</button>
          <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
