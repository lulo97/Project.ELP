function extractApiDocs(app) {
  const docs = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Direct route
      const methods = Object.keys(middleware.route.methods).map((m) => m.toUpperCase());
      docs.push({
        path: middleware.route.path,
        methods,
      });
    } else if (middleware.name === "router" && middleware.handle.stack) {
      // Mounted router
      const basePath = middleware.regexp
        .toString()
        .replace("/^\\", "")
        .replace("\\/?(?=\\/|$)/i", "")
        .replace(/\\/g, ""); // crude extract of the mount path

      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods).map((m) => m.toUpperCase());
          docs.push({
            path: basePath + handler.route.path,
            methods,
          });
        }
      });
    }
  });

  return docs;
}

module.exports = { extractApiDocs };
