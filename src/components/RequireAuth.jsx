import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Wrap any page that should only be visible to a logged-in user:
//   <RequireAuth><ProductsPage /></RequireAuth>
// It checks localStorage for a token and redirects to /login if there
// isn't one, instead of ever rendering the protected page.
export default function RequireAuth({ children }) {
  const [checked, setChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!window.localStorage.getItem("token"));
    setChecked(true);
  }, []);

  if (!checked) return null; // avoid a flash of the protected page while we check
  if (!hasToken) return <Navigate to="/login" replace />;
  return children;
}
