import { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';
import AdminProductTable from '../components/AdminProductTable.jsx';
import ProductFormModal from '../components/ProductFormModal.jsx';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('/products');
    setProducts(res.data);
  };

  const handleSave = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (data[key]) formData.append(key, data[key]);
    }

    if (selectedProduct) {
      await axios.put(`/products/${selectedProduct._id}`, formData);
    } else {
      await axios.post('/products', formData);
    }

    fetchProducts();
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="">
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
