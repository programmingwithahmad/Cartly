import { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';
import UserProductCard from '../components/UserProductCard.jsx';
import FilterBar from '../components/FilterBar.jsx';

const UserPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`/products?${query}`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full border">
      <h2 className='text-center mt-5'>All Products</h2>
      <FilterBar onFilter={fetchProducts} />
      <div className="row">
        {products.length ? (
          products.map((p) => <UserProductCard key={p._id} product={p} />)
        ) : (
          <p className="text-center mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
