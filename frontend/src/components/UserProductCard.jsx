const UserProductCard = ({ product }) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={`http://localhost:3000/uploads/${product.image}`}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Category: {product.category}</p>
          <p className="card-text">Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
  
  export default UserProductCard;
  