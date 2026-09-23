import api from "../axiosClient";

// Calls DummyJSON's login endpoint.
// Test credentials from the assignment: username "emilys", password "emilyspass".
export async function login(username, password) {
  const response = await api.post("/auth/login", { username, password });
  return response.data; // { id, username, token, ... }
}
