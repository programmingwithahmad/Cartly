import Product from '../models/productModel.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const image = req.file?.filename;
    const newProduct = new Product({ name, category, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Get All or Filtered Products
export const getProducts = async (req, res) => {
  try {
    const { category, name, min, max } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (name) filter.name = new RegExp(name, 'i');
    if (min && max) filter.price = { $gte: min, $lte: max };

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const image = req.file?.filename;
    const updateData = { name, category, price };
    if (image) updateData.image = image;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
