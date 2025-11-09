const express = require('express');
const path = require('path');
const { initData } = require('./redis/initData');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const { setupDynamicSwagger } = require('./utils/setupDynamicSwagger.js');

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

//First, declare api routes
require("./routes/routes.js")(app);
setupDynamicSwagger(app)

//Second, declare the rest url point to frontend 
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
  initData();
});