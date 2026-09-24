import { forwardRef } from "react";
const Input = forwardRef(function Input(
  {
    label,
    id,
    name,
    error,
    hint,
    required,
    as = "input",
    className = "",
    ...props
  },
  ref,
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
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <Field
        id={inputId}
        name={name}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
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
