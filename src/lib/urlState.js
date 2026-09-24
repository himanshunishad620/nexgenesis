export function toSafeInt(value, fallback) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n) || n < 1) return fallback;
  return n;
}

export function toSafeString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function toSafeEnum(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
