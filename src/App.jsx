import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProductDetailPage from "./pages/ProductDetail";
import ProductEditPage from "./pages/ProductEdit";
import ProductNewPage from "./pages/ProductNew";
import ProductsPage from "./pages/Products";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/new" element={<ProductNewPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/:id/edit" element={<ProductEditPage />} />
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
