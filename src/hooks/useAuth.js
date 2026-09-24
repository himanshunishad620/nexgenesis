import { useNavigate } from "react-router-dom";

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
