import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px 20px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
      <h1>HRMS Lite</h1>
      <div>
        <Link to="/employees" style={{ marginRight: 20, textDecoration: "none" }}>Employees</Link>
        <Link to="/add-employee" style={{ marginRight: 20, textDecoration: "none" }}>Add Employee</Link>
        <Link to="/attendance" style={{ textDecoration: "none" }}>Attendance</Link>
      </div>
    </nav>
  );
}
