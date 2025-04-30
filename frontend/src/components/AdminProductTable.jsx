const AdminProductTable = ({ products, onEdit, onDelete }) => (
    <table className="table table-bordered mt-4">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>
              <img src={`http://localhost:3000/uploads/${product.image}`} alt="Product" width="50" />
            </td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(product._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  export default AdminProductTable;
  