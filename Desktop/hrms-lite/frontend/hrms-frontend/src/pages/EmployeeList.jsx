import { useEffect, useState } from "react";
import api from "../api";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("LOAD ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await api.delete(`employees/${id}/`);
      loadEmployees();
    } catch (err) {
      console.error("DELETE ERROR 👉", err);
      alert("Error deleting employee");
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <EmptyState message="No employees found" />
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Department</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.employee_id}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.full_name}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.email}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{emp.department}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>
                  <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}