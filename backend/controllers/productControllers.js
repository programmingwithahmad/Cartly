import Product from '../models/productModel.js';
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Helper function for Cloudinary upload
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// 📌 Create product
export const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const product = new Product({ name, category, price, image: imageUrl });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("Error in createProduct:", err);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  }
};

// 📌 Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// 📌 Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    let imageUrl;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, price, ...(imageUrl && { image: imageUrl }) },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error in updateProduct:", err);
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
};

// 📌 Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
