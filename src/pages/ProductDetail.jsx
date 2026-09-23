import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Product detail placeholder for id "{id}"</p>
    </div>
  );
}
