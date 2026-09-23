// Desktop view: a real table. Hidden below the md breakpoint, where
// ProductCards takes over instead.
export default function ProductTable({ products }) {
  return (
    <table className="hidden w-full text-left text-sm md:table">
      <thead className="border-b bg-gray-50 text-gray-600">
        <tr>
          <th className="px-3 py-2">Image</th>
          <th className="px-3 py-2">Title</th>
          <th className="px-3 py-2">Category</th>
          <th className="px-3 py-2">Price</th>
          <th className="px-3 py-2">Rating</th>
          <th className="px-3 py-2">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b hover:bg-gray-50">
            <td className="px-3 py-2">
              <img src={p.thumbnail} alt={p.title} className="h-10 w-10 rounded object-cover" />
            </td>
            <td className="px-3 py-2 font-medium">{p.title}</td>
            <td className="px-3 py-2 capitalize">{p.category}</td>
            <td className="px-3 py-2">${p.price}</td>
            <td className="px-3 py-2">{p.rating}</td>
            <td className="px-3 py-2">{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
