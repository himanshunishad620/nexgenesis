import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../lib/api/products";

function sortItems(items, field, direction) {
  return [...items].sort((a, b) => {
    if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
    if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export default function useProducts({
  page,
  pageSize,
  search,
  category,
  sortBy,
  order,
}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading");
  const [note, setNote] = useState("");

  const requestId = useRef(0);
  const abortController = useRef(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const load = useCallback(() => {
    abortController.current?.abort();

    const controller = new AbortController();
    abortController.current = controller;

    const currentRequest = ++requestId.current;

    setStatus("loading");
    setNote("");

    const skip = (page - 1) * pageSize;

    let request;

    if (search) {
      if (category) {
        setNote("Category filter is ignored while a search is active.");
      }

      request = searchProducts({
        q: search,
        limit: pageSize,
        skip,
        signal: controller.signal,
      });
    } else if (category) {
      request = getProductsByCategory({
        category,
        limit: pageSize,
        skip,
        signal: controller.signal,
      });
    } else {
      request = getProducts({
        limit: pageSize,
        skip,
        signal: controller.signal,
      });
    }

    request
      .then((data) => {
        if (currentRequest !== requestId.current) return;

        const items = sortItems(data.products || [], sortBy, order);

        setProducts(items);
        setTotal(data.total || items.length);
        setStatus("success");
      })
      .catch((error) => {
        if (currentRequest !== requestId.current) return;

        const cancelled =
          error.name === "CanceledError" || error.code === "ERR_CANCELED";

        if (cancelled) return;

        setStatus("error");
      });
  }, [page, pageSize, search, category, sortBy, order]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    products,
    setProducts,
    total,
    setTotal,
    categories,
    status,
    note,
    setNote,
    load,
  };
}
