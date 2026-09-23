// Small helpers for reading values out of the URL query string safely.
// The assignment specifically calls out that a bad URL like ?page=abc
// or ?page=999 must not break the page, so every value we pull from the
// URL goes through one of these instead of being trusted directly.

export function toSafeInt(value, fallback) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n) || n < 1) return fallback;
  return n;
}

export function toSafeString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

// Only accept a value if it's one of a known, allowed list
// (e.g. page size must be 10, 20 or 50 - nothing else).
export function toSafeEnum(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
