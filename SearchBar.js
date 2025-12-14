import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const reset = { name: '', category: '', minPrice: '', maxPrice: '' };
    setFilters(reset);
    onSearch(reset);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 30 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15 }}>
        <div className="input-group">
          <input 
            type="text" 
            name="name" 
            placeholder="Search by name..." 
            value={filters.name}
            onChange={handleChange} 
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            name="category" 
            placeholder="Category (e.g. Chocolate)" 
            value={filters.category}
            onChange={handleChange} 
          />
        </div>
        <div className="input-group">
          <input 
            type="number" 
            name="minPrice" 
            placeholder="Min Price" 
            value={filters.minPrice}
            onChange={handleChange} 
          />
        </div>
        <div className="input-group">
          <input 
            type="number" 
            name="maxPrice" 
            placeholder="Max Price" 
            value={filters.maxPrice}
            onChange={handleChange} 
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
    </form>
  );
}
