// Mobile view: a stacked list of cards. Hidden at the md breakpoint and
// above, where ProductTable takes over instead.
export default function ProductCards({ products }) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {products.map((p) => (
        <div key={p.id} className="flex gap-3 rounded border p-3">
          <img src={p.thumbnail} alt={p.title} className="h-16 w-16 rounded object-cover" />
          <div className="flex-1">
            <p className="font-medium">{p.title}</p>
            <p className="text-sm capitalize text-gray-500">{p.category}</p>
            <p className="text-sm">
              ${p.price} &middot; {p.rating}★ &middot; stock {p.stock}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
