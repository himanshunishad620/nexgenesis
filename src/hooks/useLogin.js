import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";

const useLogin = () => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  async function sumbitLogin(username, password) {
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const data = await login(username, password);

      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("username", data.username);

      navigate("/products", { replace: true });
    } catch (err) {
      const status = err.response ? err.response.status : null;

      if (status === 400 || status === 401) {
        setError("Wrong username or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }
  return { sumbitLogin, error, submitting };
};

export default useLogin;
