// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import ProductForm from "../components/ProductForm";
// import { useAuth } from "../hooks/useAuth";
// import { addProduct } from "../lib/api/products";

// export default function ProductNewPage() {
//   const navigate = useNavigate();
//   const { username, logout } = useAuth();

//   async function handleSubmit(values) {
//     // DummyJSON sends back a fake new id as if it saved the product, so
//     // from the UI's point of view this behaves like a real add.
//     await addProduct(values);
//     navigate("/products");
//   }

//   return (
//     <div>
//       <Navbar username={username} onLogout={logout} />
//       <main className="mx-auto max-w-3xl px-4 py-6">
//         <h1 className="mb-4 text-xl font-semibold">Add product</h1>
//         <ProductForm submitLabel="Add product" onSubmit={handleSubmit} />
//       </main>
//     </div>
//   );
// }

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
    <div className="min-h-screen bg-slate-50">
      <Navbar username={username} onLogout={logout} />

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/products")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <span className="text-lg">←</span>
            Back to products
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Add product
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new product and add it to your catalog.
          </p>
        </div>

        {/* Form Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Product information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details below to create your product.
            </p>
          </div>

          <ProductForm submitLabel="Add product" onSubmit={handleSubmit} />
        </section>
      </main>
    </div>
  );
}
