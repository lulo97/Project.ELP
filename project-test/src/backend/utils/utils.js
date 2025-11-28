function isObjectValid(obj = {}, properties = ["id", "word", "user_id"]) {
  const objKeys = Object.keys(obj);

  if (objKeys.length !== properties.length) return false;

  return properties.every((prop) => objKeys.includes(prop));
}

function isPaginationValid(obj) {
  if (!obj.pagination || Object.keys(obj.pagination).length === 0) {
    return false;
  }

  const properties = ["pageIndex", "pageSize", "totalCount", "totalPages"];
  return isObjectValid(obj.pagination, properties);
}

module.exports = { isObjectValid, isPaginationValid };
