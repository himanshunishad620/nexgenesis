import { useNavigate } from "react-router-dom";

// Small hook for pages that already know the user is logged in
// (because they're wrapped in <RequireAuth>) and just need the
// username to display and a way to log out.
export function useAuth() {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username");

  function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    navigate("/login", { replace: true });
  }

  return { username, logout };
}
