import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/Login";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import ProductNewPage from "./pages/ProductNew";
import ProductEditPage from "./pages/ProductEdit";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/products" replace />} />

      <Route path="/products" element={<RequireAuth><ProductsPage /></RequireAuth>} />
      <Route path="/products/new" element={<RequireAuth><ProductNewPage /></RequireAuth>} />
      <Route path="/products/:id" element={<RequireAuth><ProductDetailPage /></RequireAuth>} />
      <Route path="/products/:id/edit" element={<RequireAuth><ProductEditPage /></RequireAuth>} />

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center text-gray-500">
            Page not found.
          </div>
        }
      />
    </Routes>
  );
}
