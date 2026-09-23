import { forwardRef } from "react";

/**
 * One input component used everywhere a text field, number field, email
 * field or textarea shows up in the app (login form, add/edit product
 * form, and anywhere else). Centralizing it here means every field gets
 * the same label style, spacing, focus ring and error styling - change
 * it once, and it updates across the whole app.
 *
 * Basic use:
 *   <Input label="Title" name="title" value={title} onChange={handleChange} />
 *
 * With an error message (e.g. from form validation):
 *   <Input label="Price" name="price" type="number" error={errors.price} />
 *
 * As a multi-line field instead of a single-line input:
 *   <Input as="textarea" label="Description" name="description" rows={4} />
 */
const Input = forwardRef(function Input(
  { label, id, name, error, hint, required, as = "input", className = "", ...props },
  ref
) {
  const inputId = id || name;
  const Field = as; // "input" or "textarea" - same component, different tag

  const fieldClasses = [
    "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors",
    "bg-white text-gray-900 placeholder:text-gray-400",
    "focus:ring-2 focus:ring-blue-600 focus:border-blue-600",
    error ? "border-red-500" : "border-gray-300 hover:border-gray-400",
    className,
  ].join(" ");

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <Field
        id={inputId}
        name={name}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={fieldClasses}
        {...props}
      />

      {!error && hint && (
        <p id={`${inputId}-hint`} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
