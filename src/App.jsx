import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AddEmployees from "./Pages/AddEmployees";
import Companies from "./Pages/Companies";
import Employees from "./Pages/Employees";
import AddCompany from "./Pages/AddCompany";
import { ProtectedRoute } from "./Middleware/auth";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-company"
          element={
            <ProtectedRoute>
              <AddCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
