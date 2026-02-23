import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateAsset from "./pages/CreateAsset";
import PendingAssets from "./pages/PendingAssets";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="Student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-asset"
            element={
              <ProtectedRoute role="Student">
                <CreateAsset />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pending-assets"
            element={
              <ProtectedRoute role="Admin">
                <PendingAssets />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;