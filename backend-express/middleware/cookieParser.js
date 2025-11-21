function cookieParser(req, res, next) {
  const cookieHeader = req.headers?.cookie || "";
  const cookies = {};

  //key1=value1;key2=value2, ... -> { key1: value1, key2: value2, ...}
  cookieHeader.split(";").forEach((cookie) => {
    const [key, ...val] = cookie.split("=");
    if (!key) return;
    //Fix val contains "=" symbol
    cookies[key.trim()] = decodeURIComponent(val.join("="));
  });

  req.cookies = cookies;

  next();
}

module.exports = {
    cookieParser
};
