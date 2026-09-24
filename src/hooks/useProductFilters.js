import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toSafeEnum, toSafeInt, toSafeString } from "../lib/urlState";
import useDebouncedValue from "../lib/useDebouncedValue";

const PAGE_SIZES = [10, 20, 50];
const SORT_FIELDS = ["title", "price", "rating"];

export default function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = toSafeInt(searchParams.get("page"), 1);

  const pageSize = toSafeEnum(
    Number(searchParams.get("pageSize")) || 0,
    PAGE_SIZES,
    10,
  );

  const search = toSafeString(searchParams.get("q"), "");
  const category = toSafeString(searchParams.get("category"), "");

  const sortBy = toSafeEnum(searchParams.get("sortBy"), SORT_FIELDS, "title");

  const order = toSafeEnum(searchParams.get("order"), ["asc", "desc"], "asc");

  const updateQuery = (patch) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    setSearchParams(next);
  };

  // Keep invalid page values out of the URL
  useEffect(() => {
    const rawPage = searchParams.get("page");
    const rawPageSize = searchParams.get("pageSize");

    if (
      (rawPage !== null && rawPage !== String(page)) ||
      (rawPageSize !== null && rawPageSize !== String(pageSize))
    ) {
      updateQuery({ page, pageSize });
    }
  }, []);

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const debouncedSearch = useDebouncedValue(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch === search) return;

    updateQuery({
      q: debouncedSearch,
      page: 1,
    });
  }, [debouncedSearch]);

  return {
    page,
    pageSize,
    search,
    category,
    sortBy,
    order,
    searchInput,
    setSearchInput,
    updateQuery,
  };
}
