import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

// Runs right before every request leaves the app.
api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Runs after every response comes back, success or failure.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
