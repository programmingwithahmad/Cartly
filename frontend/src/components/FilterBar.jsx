import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    min: '',
    max: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <div className="row g-2 my-4">
      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Product Name"
          name="name"
          value={filters.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Category"
          name="category"
          value={filters.category}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <input
          className="form-control"
          placeholder="Min Price"
          name="min"
          type="number"
          value={filters.min}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <input
          className="form-control"
          placeholder="Max Price"
          name="max"
          type="number"
          value={filters.max}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary w-100" onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
