import { useParams } from "react-router-dom";

export default function ProductEditPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Edit product placeholder for id "{id}"</p>
    </div>
  );
}
