import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

export default function ProductEditPage() {
  const { id } = useParams();
  const { username, logout } = useAuth();
  return (
    <div>
      <Navbar username={username} onLogout={logout} />
      <div className="p-6">
        <p className="text-gray-500">Edit product placeholder for id "{id}"</p>
      </div>
    </div>
  );
}
