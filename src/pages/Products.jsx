import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/FiltersBar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import ProductTable from "../components/ProductTable";
import ProductCards from "../components/ProductCards";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import { useAuth } from "../hooks/useAuth";
import useDebouncedValue from "../lib/useDebouncedValue";
import { toSafeInt, toSafeString, toSafeEnum } from "../lib/urlState";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
  getCategories,
  deleteProduct,
} from "../lib/api/products";

const PAGE_SIZES = [10, 20, 50];
const SORT_FIELDS = ["title", "price", "rating"];

export default function ProductsPage() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = toSafeInt(searchParams.get("page"), 1);
  const pageSize = toSafeEnum(Number(searchParams.get("pageSize")) || 0, PAGE_SIZES, 10);
  const search = toSafeString(searchParams.get("q"), "");
  const category = toSafeString(searchParams.get("category"), "");
  const sortBy = toSafeEnum(searchParams.get("sortBy"), SORT_FIELDS, "title");
  const order = toSafeEnum(searchParams.get("order"), ["asc", "desc"], "asc");

  function updateQuery(patch) {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value === undefined) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next);
  }

  // If someone typed a bad URL by hand (?page=abc, ?page=999,
  // ?pageSize=13...), toSafeInt/toSafeEnum above already fell back to
  // a safe value for THIS render, so the page never breaks. This
  // effect just tidies the address bar to match what's actually
  // showing, instead of leaving the broken value sitting in the URL.
  useEffect(() => {
    const rawPage = searchParams.get("page");
    const rawPageSize = searchParams.get("pageSize");
    const needsCleanup =
      (rawPage !== null && rawPage !== String(page)) ||
      (rawPageSize !== null && rawPageSize !== String(pageSize));
    if (needsCleanup) updateQuery({ page, pageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => setSearchInput(search), [search]);
  const debouncedSearch = useDebouncedValue(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch === search) return;
    updateQuery({ q: debouncedSearch, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [note, setNote] = useState("");

  const requestIdRef = useRef(0);
  const abortRef = useRef(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, category, sortBy, order]);

  function load() {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const thisRequestId = ++requestIdRef.current;

    setStatus("loading");
    setNote("");
    const skip = (page - 1) * pageSize;
    let request;

    if (search) {
      if (category) setNote("Category filter is ignored while a search is active.");
      request = searchProducts({ q: search, limit: pageSize, skip, signal: controller.signal });
    } else if (category) {
      request = getProductsByCategory({ category, limit: pageSize, skip, signal: controller.signal });
    } else {
      request = getProducts({ limit: pageSize, skip, signal: controller.signal });
    }

    request
      .then((data) => {
        if (thisRequestId !== requestIdRef.current) return;
        const items = sortItems(data.products || [], sortBy, order);
        setProducts(items);
        setTotal(data.total || items.length);
        setStatus("success");
      })
      .catch((err) => {
        if (thisRequestId !== requestIdRef.current) return;
        const wasCancelled = err.name === "CanceledError" || err.code === "ERR_CANCELED";
        if (wasCancelled) return;
        setStatus("error");
      });
  }

  function sortItems(items, field, direction) {
    return [...items].sort((a, b) => {
      if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
      if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Delete, with a confirm popup first.
  const [confirmTarget, setConfirmTarget] = useState(null);

  function handleDelete() {
    if (!confirmTarget) return;
    const id = confirmTarget.id;
    deleteProduct(id)
      // DummyJSON's delete doesn't really remove anything server-side,
      // so even if this call somehow failed we still update the screen.
      .catch(() => {})
      .finally(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setTotal((prev) => Math.max(0, prev - 1));
        setConfirmTarget(null);
        setNote(`Removed "${confirmTarget.title}" from this screen (DummyJSON does not save deletes).`);
      });
  }

  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Products</h1>
          <button
            onClick={() => navigate("/products/new")}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Add product
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SearchBar value={searchInput} onChange={setSearchInput} />
          <FiltersBar
            categories={categories}
            category={category}
            onCategoryChange={(value) => updateQuery({ category: value, page: 1 })}
            sortBy={sortBy}
            order={order}
            onSortChange={(field, dir) => updateQuery({ sortBy: field, order: dir })}
            pageSize={pageSize}
            onPageSizeChange={(size) => updateQuery({ pageSize: size, page: 1 })}
          />
        </div>

        {note && <p className="mb-3 text-sm text-amber-600">{note}</p>}

        {status === "loading" && <Loader label="Loading products..." />}
        {status === "error" && <ErrorState onRetry={load} />}
        {status === "success" && products.length === 0 && (
          <EmptyState message="No products match your search or filter." />
        )}
        {status === "success" && products.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <ProductTable
                products={products}
                onView={(id) => navigate(`/products/${id}`)}
                onEdit={(id) => navigate(`/products/${id}/edit`)}
                onDelete={setConfirmTarget}
              />
            </div>
            <ProductCards
              products={products}
              onView={(id) => navigate(`/products/${id}`)}
              onEdit={(id) => navigate(`/products/${id}/edit`)}
              onDelete={setConfirmTarget}
            />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={(next) => updateQuery({ page: next })}
            />
          </>
        )}
      </main>

      <ConfirmDialog
        open={!!confirmTarget}
        title="Delete product"
        message={confirmTarget ? `Delete "${confirmTarget.title}"? This can't be undone.` : ""}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
