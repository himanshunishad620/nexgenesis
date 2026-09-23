import api from "../axiosClient";

// All product-related API calls live here, in one file, separate from
// any component - components only ever call these functions.

export function getProducts({ limit, skip, signal }) {
  return api.get("/products", { params: { limit, skip }, signal }).then((res) => res.data);
}

export function getProductsByCategory({ category, limit, skip, signal }) {
  return api
    .get(`/products/category/${encodeURIComponent(category)}`, {
      params: { limit, skip },
      signal,
    })
    .then((res) => res.data);
}

export function searchProducts({ q, limit, skip, signal, delay }) {
  return api
    .get("/products/search", { params: { q, limit, skip, delay }, signal })
    .then((res) => res.data);
}

export function getCategories() {
  return api.get("/products/categories").then((res) => res.data);
}

export function getProductById(id) {
  return api.get(`/products/${id}`).then((res) => res.data);
}

// DummyJSON accepts these calls and answers as if they worked, but it
// does not actually store the change on its server. We call the API
// anyway (so the network request really happens, as required) and then
// update our own local list to reflect the change - see the README for
// why, and how the pages handle that.
export function addProduct(product) {
  return api.post("/products/add", product).then((res) => res.data);
}

export function updateProduct(id, product) {
  return api.put(`/products/${id}`, product).then((res) => res.data);
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`).then((res) => res.data);
}
