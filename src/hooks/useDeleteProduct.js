import { useCallback } from "react";
import { deleteProduct } from "../lib/api/products";

export default function useDeleteProduct({
  setProducts,
  setTotal,
  setNote,
  setConfirmTarget,
}) {
  return useCallback(
    async (product) => {
      if (!product) return;

      const id = product.id;

      try {
        await deleteProduct(id);
      } catch {
        // DummyJSON delete is simulated
      } finally {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        setTotal((prev) => Math.max(0, prev - 1));
        setConfirmTarget(null);

        setNote(
          `Removed "${product.title}" from this screen (DummyJSON does not save deletes).`,
        );
      }
    },
    [setProducts, setTotal, setNote, setConfirmTarget],
  );
}
