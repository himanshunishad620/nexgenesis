// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ErrorState from "../components/ErrorState";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useAuth } from "../hooks/useAuth";
// import { getProductById } from "../lib/api/products";

// export default function ProductDetailPage() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { username, logout } = useAuth();

//   const [product, setProduct] = useState(null);
//   const [status, setStatus] = useState("loading"); // loading | success | notfound | error

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   function load() {
//     setStatus("loading");
//     getProductById(id)
//       .then((data) => {
//         setProduct(data);
//         setStatus("success");
//       })
//       .catch((err) => {
//         // DummyJSON answers a bad id with a 404 + a "Product not found"
//         // body, rather than throwing a network-level error.
//         const notFound = err.response && err.response.status === 404;
//         setStatus(notFound ? "notfound" : "error");
//       });
//   }

//   return (
//     <div>
//       <Navbar username={username} onLogout={logout} />
//       <main className="mx-auto max-w-3xl px-4 py-6">
//         <button
//           onClick={() => navigate("/products")}
//           className="mb-4 text-sm text-blue-600"
//         >
//           ← Back to products
//         </button>

//         {status === "loading" && <Loader label="Loading product..." />}
//         {status === "error" && <ErrorState onRetry={load} />}
//         {status === "notfound" && (
//           <div className="py-16 text-center text-gray-500">
//             <p>We couldn&apos;t find a product with id &quot;{id}&quot;.</p>
//           </div>
//         )}

//         {status === "success" && product && (
//           <div>
//             <div className="mb-4 flex gap-3 overflow-x-auto">
//               {(product.images && product.images.length
//                 ? product.images
//                 : [product.thumbnail]
//               ).map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={product.title}
//                   className="h-40 w-40 flex-shrink-0 rounded object-cover"
//                 />
//               ))}
//             </div>

//             <h1 className="text-2xl font-semibold">{product.title}</h1>
//             <p className="mb-2 capitalize text-gray-500">{product.category}</p>
//             <p className="mb-4 text-xl font-medium">${product.price}</p>
//             <p className="mb-4 text-gray-700">{product.description}</p>
//             <p className="mb-4 text-sm text-gray-500">
//               Rating {product.rating} &middot; Stock {product.stock}
//             </p>

//             <button
//               onClick={() => navigate(`/products/${product.id}/edit`)}
//               className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
//             >
//               Edit
//             </button>

//             {product.reviews && product.reviews.length > 0 && (
//               <div className="mt-8">
//                 <h2 className="mb-3 font-semibold">Reviews</h2>
//                 <div className="space-y-3">
//                   {product.reviews.map((r, i) => (
//                     <div key={i} className="rounded border p-3 text-sm">
//                       <p className="font-medium">
//                         {r.reviewerName} &mdash; {r.rating}★
//                       </p>
//                       <p className="text-gray-600">{r.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
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
        const notFound = err.response && err.response.status === 404;
        setStatus(notFound ? "notfound" : "error");
      });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar username={username} onLogout={logout} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/products")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <span className="text-lg">←</span>
          Back to products
        </button>

        {/* Loading */}
        {status === "loading" && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Loader label="Loading product..." />
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ErrorState onRetry={load} />
          </div>
        )}

        {/* Not Found */}
        {status === "notfound" && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🔍
            </div>

            <h2 className="mb-2 text-xl font-semibold text-slate-800">
              Product not found
            </h2>

            <p className="max-w-md text-sm text-slate-500">
              We couldn&apos;t find a product with id &quot;{id}&quot;.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Browse products
            </button>
          </div>
        )}

        {/* Product */}
        {status === "success" && product && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              {/* Image section */}
              <div className="border-b border-slate-200 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex h-[380px] items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                  <img
                    src={
                      product.images && product.images.length
                        ? product.images[0]
                        : product.thumbnail
                    }
                    alt={product.title}
                    className="h-full w-full object-contain p-6 transition duration-300 hover:scale-105"
                  />
                </div>

                {/* Thumbnails */}
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {(product.images && product.images.length
                    ? product.images
                    : [product.thumbnail]
                  ).map((src, i) => (
                    <div
                      key={i}
                      className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-1"
                    >
                      <img
                        src={src}
                        alt={product.title}
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product information */}
              <div className="flex flex-col p-5 sm:p-8">
                {/* Category */}
                <p className="mb-3 text-sm font-medium capitalize text-blue-600">
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                  {product.title}
                </h1>

                {/* Rating + Stock */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                    <span>★</span>
                    {product.rating}
                  </div>

                  <span className="text-slate-300">•</span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                      product.stock > 0
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-6 border-y border-slate-100 py-5">
                  <p className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
                    Description
                  </h2>

                  <p className="text-sm leading-7 text-slate-600">
                    {product.description}
                  </p>
                </div>

                {/* Edit button */}
                <div className="mt-8">
                  <button
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Edit product
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t border-slate-200 p-5 sm:p-8">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Customer reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Feedback from customers who purchased this product
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {product.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-800">
                          {r.reviewerName}
                        </p>

                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          ★ {r.rating}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {r.comment}
                      </p>
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
