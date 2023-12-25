const express = require("express");
const app = express();
const expressConfig = require("./config/express");
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/users");
const categoryRoute = require("./src/routes/category");
const brandRoute = require("./src/routes/brand");
const discountRouter = require("./src/routes/discount");
const productRoute = require("./src/routes/product");
const attributeRoute = require("./src/routes/attributes");
const imageRoute = require("./src/routes/images");
const cartRoute = require("./src/routes/cart");
const orderRoute = require("./src/routes/order");

// Apply express configurations
expressConfig(app);

// Routes
app.use("/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/discount", discountRouter);
app.use("/api/products", productRoute);
app.use("/api/attributes", attributeRoute);
app.use("/api/images", imageRoute);
app.use("/api/cart/", cartRoute);
app.use("/api/order", orderRoute);

// Listen on port 4000
const PORT = 4002 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the api");
  console.log(req.user);
});

// Error Handler -----------
app.use((error, req, res, next) => {
  res.status(error.status).json({
    errorMessage: error.message,
    status: error.status,
  });
});
