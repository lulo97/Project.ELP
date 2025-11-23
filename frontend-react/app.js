const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

function loadEnv(envFilePath = path.join(__dirname, '.env')) {
  if (!fs.existsSync(envFilePath)) return;

  const envContent = fs.readFileSync(envFilePath, 'utf-8');

  const env_keys = [];

  envContent.split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) return;

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();

    process.env[key] = value.replace(/^["']|["']$/g, '');
    env_keys.push(key)
  });

  console.log(`Loaded ${env_keys}`)
}

loadEnv();

const { PORT, API_TARGET } = process.env;
const DIST_DIR = path.join(__dirname, "dist");

/* Minimal server
  - Forwarding url starting with /api to backend in request object
  - Serve static files in dist folder
  - If can't serve static file then fall back to index.html
  - Project Structure:
    + app.js
    + dist/index.html
*/

function passingRequestToBackend(req, res) {
  const targetUrl = new URL(req.url, API_TARGET);

  const proxyReq = http.request(
    targetUrl,
    {
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );

  req.pipe(proxyReq, { end: true });

  proxyReq.on("error", (err) => {
    console.log(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(err));
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api")) {
    passingRequestToBackend(req, res);
    return;
  }

  // Serve static files from dist
  let filePath = path.join(DIST_DIR, req.url === "/" ? "index.html" : req.url);
  filePath = path.normalize(filePath);

  fs.readFile(filePath, (err, data) => {
    //Serve jpg, png, ico, pdf, ...
    if (!err) {
      const mimeTypes = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
      };

      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
      return;
    }

    // If file not found (ENOENT), serve index.html for React Router
    if (err.code === "ENOENT") {
      fs.readFile(path.join(DIST_DIR, "index.html"), (indexErr, indexData) => {
        if (indexErr) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("500 - Internal Server Error");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexData);
      });
      return;
    }

    //If other error then log
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(JSON.stringify(err));
      return;
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
