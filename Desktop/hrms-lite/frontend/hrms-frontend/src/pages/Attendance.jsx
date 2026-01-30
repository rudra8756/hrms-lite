import { useEffect, useState } from "react";
import api from "../api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [data, setData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  const loadEmployees = async () => {
    const empRes = await api.get("employees/");
    setEmployees(empRes.data);
  };

  const loadAttendance = async (employeeId = "") => {
    const url = employeeId ? `attendance/?employee=${employeeId}` : "attendance/";
    const attRes = await api.get(url);
    setAttendanceList(attRes.data);
  };

  useEffect(() => {
    loadEmployees();
    loadAttendance();
  }, []);

  const submitAttendance = async (e) => {
    e.preventDefault();

    if (!data.employee || !data.date) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("attendance/", {
        ...data,
        employee: Number(data.employee),
      });
      alert("Attendance marked successfully!");
      setData({ employee: "", date: "", status: "Present" });
      loadAttendance(selectedEmployee);
    } catch (err) {
      console.error("MARK ERROR 👉", err.response?.data);
      alert(JSON.stringify(err.response?.data || "An error occurred"));
    }
  };

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);
    loadAttendance(empId);
  };

  const totalPresent = attendanceList.filter(a => a.status === "Present").length;

  return (
    <div style={{ padding: 20 }}>
      <h2>Mark Attendance</h2>

      <form onSubmit={submitAttendance}>
        <select
          value={data.employee}
          onChange={e => setData({ ...data, employee: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={data.date}
          onChange={e => setData({ ...data, date: e.target.value })}
          required
        />

        <select
          value={data.status}
          onChange={e => setData({ ...data, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>View Attendance</h2>
      <select
        value={selectedEmployee}
        onChange={handleEmployeeChange}
      >
        <option value="">All Employees</option>
        {employees.map(e => (
          <option key={e.id} value={e.id}>
            {e.full_name}
          </option>
        ))}
      </select>

      <p>Total Present Days: {totalPresent}</p>

      {attendanceList.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Employee</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map(a => (
              <tr key={a.id}>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{a.employee_name}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{a.date}</td>
                <td style={{ border: "1px solid #ddd", padding: 8 }}>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
