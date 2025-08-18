import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const newProduct = new Product({ name, category, price, image: imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Get All or Filtered Products
export const getProducts = async (req, res) => {
  try {
    const { category, name, min, max } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (name) filter.name = new RegExp(name, "i");
    if (min && max) filter.price = { $gte: min, $lte: max };

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const updateData = { name, category, price };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      updateData.image = uploadResult.secure_url;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
