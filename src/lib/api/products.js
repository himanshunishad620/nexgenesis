import api from "../axiosClient";

// All product-related API calls live here, in one file, separate from
// any component - components only ever call these functions, never
// axios directly. More functions get added here in later stages
// (search, categories, add/edit/delete) as those features are built.

// A normal page of products, no search or category filter yet.
export function getProducts({ limit, skip }) {
  return api.get("/products", { params: { limit, skip } }).then((res) => res.data);
}
