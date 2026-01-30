import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
