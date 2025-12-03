export function removeVietnameseDiacritics(str) {
  if ([null, undefined].includes(str) || str.length === 0) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
