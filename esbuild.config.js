const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["app.js"],
  bundle: true,
  platform: "node",
  outfile: "dist/app.js",
}).catch(() => process.exit(1));
