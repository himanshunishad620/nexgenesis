import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import FiltersBar from "../components/FiltersBar";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import ProductCards from "../components/ProductCards";
import ProductTable from "../components/ProductTable";
import SearchBar from "../components/SearchBar";

import { useAuth } from "../hooks/useAuth";
import useDeleteProduct from "../hooks/useDeleteProduct";
import useProductFilters from "../hooks/useProductFilters";
import useProducts from "../hooks/useProucts";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  const filters = useProductFilters();

  const {
    page,
    pageSize,
    search,
    category,
    sortBy,
    order,
    searchInput,
    setSearchInput,
    updateQuery,
  } = filters;

  const productsData = useProducts({
    page,
    pageSize,
    search,
    category,
    sortBy,
    order,
  });

  const {
    products,
    setProducts,
    total,
    setTotal,
    categories,
    status,
    note,
    setNote,
    load,
  } = productsData;

  const [confirmTarget, setConfirmTarget] = useState(null);

  const handleDelete = useDeleteProduct({
    setProducts,
    setTotal,
    setNote,
    setConfirmTarget,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar username={username} onLogout={logout} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Browse, search and manage your products.
            </p>
          </div>

          <button
            onClick={() => navigate("/products/new")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <span className="text-lg leading-none">+</span>
            Add product
          </button>
        </div>

        {/* Filters */}
        <section className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-md">
              <SearchBar value={searchInput} onChange={setSearchInput} />
            </div>

            <FiltersBar
              categories={categories}
              category={category}
              onCategoryChange={(value) =>
                updateQuery({
                  category: value,
                  page: 1,
                })
              }
              sortBy={sortBy}
              order={order}
              onSortChange={(field, dir) =>
                updateQuery({
                  sortBy: field,
                  order: dir,
                })
              }
              pageSize={pageSize}
              onPageSizeChange={(size) =>
                updateQuery({
                  page: size ? 1 : 1,
                  pageSize: size,
                })
              }
            />
          </div>
        </section>

        {/* Note */}
        {note && (
          <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-700">{note}</p>
          </div>
        )}

        {/* Loading */}
        {status === "loading" && (
          <div className="flex min-h-[400px] items-center justify-center rounded-xl border bg-white">
            <Loader label="Loading products..." />
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="flex min-h-[400px] items-center justify-center rounded-xl border bg-white">
            <ErrorState onRetry={load} />
          </div>
        )}

        {/* Empty */}
        {status === "success" && products.length === 0 && (
          <div className="rounded-xl border bg-white">
            <EmptyState message="No products match your search or filter." />
          </div>
        )}

        {/* Products */}
        {status === "success" && products.length > 0 && (
          <>
            <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="border-b px-4 py-4 sm:px-5">
                <h2 className="font-semibold text-slate-900">Product list</h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  {total} {total === 1 ? "product" : "products"} found
                </p>
              </div>

              <div className="hidden overflow-x-auto md:block">
                <ProductTable
                  products={products}
                  onView={(id) => navigate(`/products/${id}`)}
                  onEdit={(id) => navigate(`/products/${id}/edit`)}
                  onDelete={setConfirmTarget}
                />
              </div>

              <div className="md:hidden">
                <ProductCards
                  products={products}
                  onView={(id) => navigate(`/products/${id}`)}
                  onEdit={(id) => navigate(`/products/${id}/edit`)}
                  onDelete={setConfirmTarget}
                />
              </div>
            </section>

            <div className="mt-5 rounded-xl border bg-white px-4 py-3 shadow-sm">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={(next) => updateQuery({ page: next })}
              />
            </div>
          </>
        )}
      </main>

      <ConfirmDialog
        open={!!confirmTarget}
        title="Delete product"
        message={
          confirmTarget
            ? `Delete "${confirmTarget.title}"? This can't be undone.`
            : ""
        }
        onConfirm={() => handleDelete(confirmTarget)}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
