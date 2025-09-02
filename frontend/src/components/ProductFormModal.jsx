import { useEffect, useState } from 'react';

const ProductFormModal = ({ show, handleClose, handleSave, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', image: null,
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price,
        image: null, // Reset image file input
      });
    } else {
      setFormData({ name: '', category: '', price: '', image: null });
    }
  }, [selectedProduct, show]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: '#00000099' }}>
      <div className="modal-dialog">
        <form onSubmit={submit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedProduct ? 'Update Product' : 'Add Product'}
              </h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  className="form-control" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input 
                  className="form-control" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input 
                  className="form-control" 
                  name="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input 
                  className="form-control" 
                  type="file" 
                  name="image" 
                  onChange={handleChange} 
                  accept="image/*"
                />
                {selectedProduct?.image && !formData.image && (
                  <div className="mt-2">
                    <small>Current image:</small>
                    <img 
                      src={selectedProduct.image} 
                      alt="Current" 
                      width="50" 
                      className="ms-2" 
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" type="submit">
                {selectedProduct ? 'Update' : 'Add'}
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;