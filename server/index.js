const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(express.json());

app.use("/identify", userRoutes);

console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log("Server is up and running");
});
