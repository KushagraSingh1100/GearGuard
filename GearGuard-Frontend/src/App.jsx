import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import MaintenanceBoard from "./pages/MaintenanceBoard";
import Calendar from "./pages/Calendar";
import Teams from "./pages/Teams";
import Users from "./pages/Users";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100vh] bg-[#f1f5f9]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/board" element={<MaintenanceBoard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
