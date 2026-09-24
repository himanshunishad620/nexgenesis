export default function ProductCards({ products, onView, onEdit, onDelete }) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {products.map((p) => (
        <div key={p.id} className="flex gap-3 rounded border p-3">
          <img
            src={p.thumbnail}
            alt={p.title}
            className="h-16 w-16 rounded object-cover"
          />
          <div className="flex-1">
            <button
              onClick={() => onView(p.id)}
              className="font-medium text-blue-600"
            >
              {p.title}
            </button>
            <p className="text-sm capitalize text-gray-500">{p.category}</p>
            <p className="text-sm">
              ${p.price} &middot; {p.rating}★ &middot; stock {p.stock}
            </p>
            <div className="mt-2 flex gap-3 text-sm">
              <button onClick={() => onEdit(p.id)} className="text-blue-600">
                Edit
              </button>
              <button onClick={() => onDelete(p)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
