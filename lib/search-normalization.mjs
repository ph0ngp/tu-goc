/** @param {string} value */
export function normalizeSearchText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("vi")
    .replace(/đ/g, "d");
}

/** @param {string} value */
export function searchTerms(value) {
  return normalizeSearchText(value).match(/[a-z0-9]+/g) ?? [];
}

/** @param {string} value */
export function compactSearchText(value) {
  return [...new Set(searchTerms(value))].join(" ");
}
