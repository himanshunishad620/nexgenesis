import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

export default function ProductNewPage() {
  const { username, logout } = useAuth();
  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <div className="p-6">
        <p className="text-gray-500">ProductNew page placeholder.</p>
      </div>
    </div>
  );
}
