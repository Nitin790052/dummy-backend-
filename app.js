import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user.route.js";
import fs from "fs";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// static folder for images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/users", userRoutes);

export default app;
