import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import ProductTable from "../components/ProductTable";
import ProductCards from "../components/ProductCards";
import { useAuth } from "../hooks/useAuth";
import { getProducts } from "../lib/api/products";

export default function ProductsPage() {
  const { username, logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  // Hardcoded for now — a fixed first page of 10. Real pagination,
  // with page numbers and a page-size picker, comes in Stage 7.
  useEffect(() => {
    load();
  }, []);

  function load() {
    setStatus("loading");
    getProducts({ limit: 10, skip: 0 })
      .then((data) => {
        setProducts(data.products || []);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }

  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold">Products</h1>

        {status === "loading" && <Loader label="Loading products..." />}
        {status === "error" && <ErrorState onRetry={load} />}
        {status === "success" && products.length === 0 && <EmptyState />}
        {status === "success" && products.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <ProductTable products={products} />
            </div>
            <ProductCards products={products} />
          </>
        )}
      </main>
    </div>
  );
}
