import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useAuth } from "../hooks/useAuth";
import { getProductById } from "../lib/api/products";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { username, logout } = useAuth();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | notfound | error

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
      .catch((err) => {
        // DummyJSON answers a bad id with a 404 + a "Product not found"
        // body, rather than throwing a network-level error.
        const notFound = err.response && err.response.status === 404;
        setStatus(notFound ? "notfound" : "error");
      });
  }

  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <button onClick={() => navigate("/products")} className="mb-4 text-sm text-blue-600">
          ← Back to products
        </button>

        {status === "loading" && <Loader label="Loading product..." />}
        {status === "error" && <ErrorState onRetry={load} />}
        {status === "notfound" && (
          <div className="py-16 text-center text-gray-500">
            <p>We couldn&apos;t find a product with id &quot;{id}&quot;.</p>
          </div>
        )}

        {status === "success" && product && (
          <div>
            <div className="mb-4 flex gap-3 overflow-x-auto">
              {(product.images && product.images.length ? product.images : [product.thumbnail]).map(
                (src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={product.title}
                    className="h-40 w-40 flex-shrink-0 rounded object-cover"
                  />
                )
              )}
            </div>

            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="mb-2 capitalize text-gray-500">{product.category}</p>
            <p className="mb-4 text-xl font-medium">${product.price}</p>
            <p className="mb-4 text-gray-700">{product.description}</p>
            <p className="mb-4 text-sm text-gray-500">
              Rating {product.rating} &middot; Stock {product.stock}
            </p>

            <button
              onClick={() => navigate(`/products/${product.id}/edit`)}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Edit
            </button>

            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 font-semibold">Reviews</h2>
                <div className="space-y-3">
                  {product.reviews.map((r, i) => (
                    <div key={i} className="rounded border p-3 text-sm">
                      <p className="font-medium">
                        {r.reviewerName} &mdash; {r.rating}★
                      </p>
                      <p className="text-gray-600">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
