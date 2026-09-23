import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useAuth } from "../hooks/useAuth";
import { getProductById, updateProduct } from "../lib/api/products";

export default function ProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { username, logout } = useAuth();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function load() {
    setStatus("loading");
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }

  async function handleSubmit(values) {
    // Same story as add/delete: DummyJSON doesn't persist the edit, but
    // it does answer with the updated object, so we send the request
    // and then move on as if it were saved.
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
