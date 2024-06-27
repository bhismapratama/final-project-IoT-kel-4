const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const connectDB = require("./src/database/connectMongo");
connectDB();
const authRoutes = require('./src/routes/authRoutes')
const cctvRoutes = require('./src/routes/cctvRoutes')

const corsMiddleware = require("./src/middleware/corsMiddleware");

app.use(corsMiddleware);

app.use("/api", cctvRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
