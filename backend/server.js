import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";

// configure env
dotenv.config();

// Cloudinary config
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
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

// routes
app.use("/api/products", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("Cartly");
});

// PORT
const PORT = process.env.PORT || 3000;

// run listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgYellow.white);
});
