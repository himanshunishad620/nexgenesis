import { useState } from "react";

const useUpdateForm = () => {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate(values) {
    const next = {};
    if (!values.title.trim()) next.title = "Title is required.";
    if (!values.category.trim()) next.category = "Category is required.";
    if (
      values.price === "" ||
      Number.isNaN(Number(values.price)) ||
      Number(values.price) <= 0
    ) {
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
  async function submitForm(values, onsubmit) {
    if (submitting) return;
    if (!validate(values)) return;

    setSubmitting(true);
    try {
      await onsubmit({
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
      });
    } finally {
      setSubmitting(false);
    }
  }
  return { errors, submitting, submitForm };
};

export default useUpdateForm;
