import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../hooks/useAuth";
import { addProduct } from "../lib/api/products";

export default function ProductNewPage() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  async function handleSubmit(values) {
    // DummyJSON sends back a fake new id as if it saved the product, so
    // from the UI's point of view this behaves like a real add.
    await addProduct(values);
    navigate("/products");
  }

  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold">Add product</h1>
        <ProductForm submitLabel="Add product" onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
