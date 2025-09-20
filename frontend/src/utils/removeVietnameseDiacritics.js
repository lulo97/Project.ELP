export function removeVietnameseDiacritics(str) {
  if ([null, undefined].includes(str) || str.length == 0) return "";
  return str
    .normalize("NFD")                       // separate base + diacritics
    .replace(/[\u0300-\u036f]/g, "")        // remove diacritics
    .replace(/đ/g, "d")                     // handle special case
    .replace(/Đ/g, "D");
}