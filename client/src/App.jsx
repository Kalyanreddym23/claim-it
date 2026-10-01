import { Navigate, Route, Routes } from "react-router-dom";

import { AdminRoute } from "./components/AdminRoute";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AdminLoginPage } from "./pages/AdminLoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EditItemPage } from "./pages/EditItemPage";
import { HomePage } from "./pages/HomePage";
import { ItemDetailsPage } from "./pages/ItemDetailsPage";
import { ItemsPage } from "./pages/ItemsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ReportItemPage } from "./pages/ReportItemPage";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="site-main">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />

          <Route
            path="/lost"
            element={<ItemsPage type="lost" />}
          />

          <Route
            path="/found"
            element={<ItemsPage type="found" />}
          />

          <Route
            path="/items/:itemId"
            element={<ItemDetailsPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          {/* Protected user routes */}
          <Route
            path="/report/lost"
            element={
              <ProtectedRoute>
                <ReportItemPage type="lost" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report/found"
            element={
              <ProtectedRoute>
                <ReportItemPage type="found" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/items/:itemId/edit"
            element={
              <ProtectedRoute>
                <EditItemPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Admin authentication */}
          <Route
            path="/admin/login"
            element={<AdminLoginPage />}
          />

          {/* Protected admin dashboard */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div className="page-section">
                  <div className="container">
                    <div className="section-heading">
                      <span className="eyebrow">
                        CLAIM-IT ADMIN
                      </span>

                      <h1>Admin Dashboard</h1>

                      <p>
                        Admin dashboard coming next.
                      </p>
                    </div>
                  </div>
                </div>
              </AdminRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Claim-It</span>
          <span>College Lost &amp; Found Portal</span>
        </div>
      </footer>
    </div>
  );
}