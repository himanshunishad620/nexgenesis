import api from "../axiosClient";

// All product-related API calls live here, in one file, separate from
// any component - components only ever call these functions.

export function getProducts({ limit, skip, signal }) {
  return api.get("/products", { params: { limit, skip }, signal }).then((res) => res.data);
}

// Products inside one category.
export function getProductsByCategory({ category, limit, skip, signal }) {
  return api
    .get(`/products/category/${encodeURIComponent(category)}`, {
      params: { limit, skip },
      signal,
    })
    .then((res) => res.data);
}

// Text search. `delay` is only used for testing slow-network race
// conditions, per the assignment ("&delay=2000").
export function searchProducts({ q, limit, skip, signal, delay }) {
  return api
    .get("/products/search", { params: { q, limit, skip, delay }, signal })
    .then((res) => res.data);
}

export function getCategories() {
  return api.get("/products/categories").then((res) => res.data);
}
