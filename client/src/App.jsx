import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CreateAsset from "./pages/CreateAsset";
// import PendingAssets from "./pages/PendingAssets";
import UploadResource from "./pages/UploadResource";
import PendingResources from "./pages/PendingResources";
import ApprovedResources from "./pages/ApprovedResources";
import AllRequests from "./pages/AllRequests"

import ProtectedRoute from "./routes/ProtectedRoute";
import AllUsers from "./pages/AllUsers";
import Toast from "./components/Toast";
import MyRequests from "./pages/MyRequests";
import AllRequestsAdmin from "./pages/Allrequestsadmin";

function App() {
  return (
    <AuthProvider>
      <Toast />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests"
            element={
              <ProtectedRoute role="Admin">
                <AllRequestsAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pending-resources"
            element={
              <ProtectedRoute role="Admin">
                <PendingResources />
              </ProtectedRoute>
            }
          />
           <Route
            path="/pending-requests"
            element={
              <ProtectedRoute role="Admin">
                <AllRequests/>
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
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
            path="/upload-resource"
            element={
              <ProtectedRoute role="Student">
                <UploadResource />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <ProtectedRoute role="Student">
                <MyRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/approved-resources"
            element={
              <ProtectedRoute>
                <ApprovedResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <ProtectedRoute role="Admin">
                <AllUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
