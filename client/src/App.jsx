import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { ItemsPage } from "./pages/ItemsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ReportItemPage } from "./pages/ReportItemPage";
import { ItemDetailsPage } from "./pages/ItemDetailsPage";
import { EditItemPage } from "./pages/EditItemPage";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  return <div className="app-shell">
    <Navbar />
    <main className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lost" element={<ItemsPage type="lost" />} />
        <Route path="/found" element={<ItemsPage type="found" />} />
        <Route path="/items/:itemId" element={<ItemDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/report/lost" element={<ProtectedRoute><ReportItemPage type="lost" /></ProtectedRoute>} />
        <Route path="/report/found" element={<ProtectedRoute><ReportItemPage type="found" /></ProtectedRoute>} />
        <Route path="/items/:itemId/edit" element={<ProtectedRoute><EditItemPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><span>Claim-It</span><span>College Lost &amp; Found Portal</span></div></footer>
  </div>;
}
