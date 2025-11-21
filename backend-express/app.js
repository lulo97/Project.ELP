const express = require("express");
const path = require("path");
const { initData } = require("./redis/initData");
const { initConstsNotVisible } = require("./redis/getConsts.js");
const { cookieParser } = require("./middleware/cookieParser.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.use(cookieParser);

//First, declare api routes
require("./routes/routes.js")(app);

//CORS
const allowedOrigins = ["http://localhost:3100", "http://elp-frontend-react-container:3000"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

// //Second, declare the rest url point to frontend
// app.get("/{*any}", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend-react/dist", "index.html"));
// });

app.listen(PORT, async () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
  initData();
  initConstsNotVisible();
});
