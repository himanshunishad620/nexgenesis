import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { updateProduct } from "../lib/api/products";

export default function ProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { username, logout } = useAuth();

  const [product, setProduct] = useState(null);
  const { fetchProducts, status } = useProduct();

  useEffect(() => {
    fetchProducts(id, setProduct);
  }, [id]);

  async function handleSubmit(values) {
    await updateProduct(id, values);
    navigate(`/products/${id}`);
  }

  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold">Edit product</h1>

        {status === "loading" && <Loader />}
        {status === "error" && <ErrorState onRetry={load} />}
        {status === "success" && product && (
          <ProductForm
            initialValues={{
              title: product.title,
              category: product.category,
              price: String(product.price),
              stock: String(product.stock),
              description: product.description,
            }}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
}
