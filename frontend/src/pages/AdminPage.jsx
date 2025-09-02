import { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';
import AdminProductTable from '../components/AdminProductTable.jsx';
import ProductFormModal from '../components/ProductFormModal.jsx';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }

      if (selectedProduct) {
        // Update existing product
        await axios.put(`/products/${selectedProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create new product
        await axios.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProducts();
      setShowModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin - Product Management</h2>
      <button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>
        Add Product
      </button>

      <AdminProductTable
        products={products}
        onEdit={(p) => {
          setSelectedProduct(p);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      {showModal && (
        <ProductFormModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          handleSave={handleSave}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default AdminPage;