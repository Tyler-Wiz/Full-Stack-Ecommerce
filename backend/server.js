const express = require("express");
const app = express();
const expressConfig = require("./config/express");

// Apply express configurations
expressConfig(app);

// Listen on port 4000
const PORT = 4001 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
