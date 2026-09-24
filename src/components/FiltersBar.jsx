export default function FiltersBar({
  categories,
  category,
  onCategoryChange,
  sortBy,
  order,
  onSortChange,
  pageSize,
  onPageSizeChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded border px-2 py-2 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((c) => {
          const value = typeof c === "string" ? c : c.slug;
          const label = typeof c === "string" ? c : c.name;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      <select
        value={`${sortBy}:${order}`}
        onChange={(e) => {
          const [field, dir] = e.target.value.split(":");
          onSortChange(field, dir);
        }}
        className="rounded border px-2 py-2 text-sm"
      >
        <option value="title:asc">Title (A-Z)</option>
        <option value="title:desc">Title (Z-A)</option>
        <option value="price:asc">Price (low to high)</option>
        <option value="price:desc">Price (high to low)</option>
        <option value="rating:desc">Rating (high to low)</option>
        <option value="rating:asc">Rating (low to high)</option>
      </select>

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="rounded border px-2 py-2 text-sm"
      >
        <option value={10}>10 / page</option>
        <option value={20}>20 / page</option>
        <option value={50}>50 / page</option>
      </select>
    </div>
  );
}
