// This is the ONE shared Axios setup file, as the assignment asks for.
// Every API call in the app will import `api` from here instead of
// creating its own axios instance. That gives us two things in one
// place, once we add auth in a later stage:
//   1. the login token gets attached to every request automatically
//   2. all "what do we do when a request fails" logic lives in one spot

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
    // If the server tells us the token is missing/invalid, log the
    // user out and send them to /login. (There's no /login route yet
    // in this stage — this becomes meaningful once routing is added.)
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
