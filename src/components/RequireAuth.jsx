import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export default function RequireAuth({ children }) {
  const [checked, setChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!window.localStorage.getItem("token"));
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!hasToken) return <Navigate to="/login" replace />;
  return children;
}
