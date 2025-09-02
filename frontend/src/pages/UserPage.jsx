import { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';
import UserProductCard from '../components/UserProductCard.jsx';
import FilterBar from '../components/FilterBar.jsx';

const UserPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);

      // Clean up empty filter values before sending
      const queryObj = {};
      for (let key in filters) {
        if (filters[key] !== '' && filters[key] !== null) {
          queryObj[key] = filters[key];
        }
      }

      const query = new URLSearchParams(queryObj).toString();
      const res = await axios.get(`/products?${query}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full border">
      <h2 className="text-center mt-5">All Products</h2>
      <FilterBar onFilter={fetchProducts} />

      {loading ? (
        <p className="text-center mt-4">Loading products...</p>
      ) : (
        <div className="row">
          {products.length ? (
            products.map((p) => <UserProductCard key={p._id} product={p} />)
          ) : (
            <p className="text-center mt-4">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
