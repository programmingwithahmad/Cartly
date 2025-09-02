import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { v2 as cloudinary } from "cloudinary";

// configure env - THIS SHOULD BE AT THE VERY TOP
dotenv.config();

// Cloudinary config - Configure it once here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/products", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("Cartly");
});

// Error handler for large payloads
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "File too large!" });
  }
  next(err);
});

// PORT
const PORT = process.env.PORT || 3000;

// run listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgYellow.white);
  // Debug: Check if Cloudinary config is loaded
  console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "Missing",
    api_key: process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing"
  });
});