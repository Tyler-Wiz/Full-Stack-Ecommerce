const express = require("express");
const app = express();
const expressConfig = require("./config/express");
const authRoute = require("./src/routes/auth");

// Apply express configurations
expressConfig(app);

// Routes
app.use("/auth", authRoute);

// Listen on port 4000
const PORT = 4002 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the api");
});
// Error Handler -----------
// app.use((error, req, res, next) => {
//   res.status(error.status).json({
//     errorMessage: error.message,
//     status: error.status,
//   });
// });
