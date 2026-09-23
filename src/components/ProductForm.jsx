import { useState } from "react";
import Input from "./Input";

const EMPTY_VALUES = { title: "", category: "", price: "", stock: "", description: "" };

// Shared form for both "add product" and "edit product". The parent
// page passes in `initialValues` (empty for add, filled in for edit)
// and an `onSubmit` function that actually saves the data.
export default function ProductForm({ initialValues, submitLabel, onSubmit }) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (!values.title.trim()) next.title = "Title is required.";
    if (!values.category.trim()) next.category = "Category is required.";
    if (values.price === "" || Number.isNaN(Number(values.price)) || Number(values.price) <= 0) {
      next.price = "Price must be a number greater than 0.";
    }
    if (
      values.stock === "" ||
      Number.isNaN(Number(values.stock)) ||
      Number(values.stock) < 0 ||
      !Number.isInteger(Number(values.stock))
    ) {
      next.stock = "Stock must be a whole number, 0 or more.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Ignore extra clicks/submits while a save is already in progress -
    // this is what stops "Save" being fired many times in a row.
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <Input label="Title" name="title" value={values.title} onChange={handleChange} error={errors.title} required />
      <Input
        label="Category"
        name="category"
        value={values.category}
        onChange={handleChange}
        error={errors.category}
        required
      />
      <Input
        label="Price"
        name="price"
        type="number"
        value={values.price}
        onChange={handleChange}
        error={errors.price}
        required
      />
      <Input
        label="Stock"
        name="stock"
        type="number"
        value={values.stock}
        onChange={handleChange}
        error={errors.stock}
        required
      />
      <Input
        as="textarea"
        label="Description"
        name="description"
        rows={4}
        value={values.description}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
