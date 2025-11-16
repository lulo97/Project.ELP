const dotenv = require("dotenv");
const parsed = dotenv.config().parsed;   // <<< only .env vars

const envDefine = {};

for (const key in parsed) {
  envDefine[`process.env.${key}`] = JSON.stringify(parsed[key]);
}

const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["app.js"],
  bundle: true,
  platform: "node",
  outfile: "dist/app.js",
  define: envDefine,
}).catch(() => process.exit(1));
