/**
 * Parse cookies from the request headers
 * @param {import('express').Request} req
 * @returns {Object} key-value map of cookies
 */
function parseCookies(req) {
  const header = req.headers?.cookie;
  const cookies = {};

  if (!header) return cookies;

  header.split(";").forEach((cookie) => {
    const [key, ...val] = cookie.split("=");
    cookies[key.trim()] = decodeURIComponent(val.join("="));
  });

  return cookies;
}

module.exports = { parseCookies };
