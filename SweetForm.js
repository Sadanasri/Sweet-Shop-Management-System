import { useState, useEffect } from 'react';
import API from '../../api/api';
import { toast } from 'react-toastify';

export default function SweetForm({ fetchSweets, initialData, onCancel }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // Fallback if no file
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setPrice(initialData.price);
      setQuantity(initialData.quantity);
      setImageUrl(initialData.imageUrl || '');
      setImageFile(null);
    } else {
      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      setImageUrl('');
      setImageFile(null);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('quantity', quantity);

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl);
      }

      // Important: Content-Type header usually handled automatically by browser with FormData
      // but axios might need clean instance. Our API instance handles JSON. 
      // We'll override headers for this request.
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      if (initialData) {
        await API.put(`/sweets/${initialData.id}`, formData, config);
        toast.success(`Sweet "${name}" updated successfully!`);
      } else {
        await API.post('/sweets', formData, config);
        toast.success(`Sweet "${name}" added successfully!`);
      }

      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      setImageUrl('');
      setImageFile(null);
      if (onCancel) onCancel();
      fetchSweets();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save sweet';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 500, margin: '0 auto 30px' }}>
      <h2 style={{ marginBottom: 20 }}>{initialData ? 'Edit Sweet' : 'Add New Sweet'}</h2>
      {error && <div style={{ color: 'var(--error)', marginBottom: 15 }}>{error}</div>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Sweet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label style={{ display: 'block', marginBottom: 5 }}>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Or paste Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
          {initialData ? 'Update Sweet' : 'Add Sweet'}
        </button>
        {initialData && (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ flex: 1 }}
            onClick={() => {
              setName('');
              setCategory('');
              setPrice('');
              setQuantity('');
              setImageUrl('');
              setImageFile(null);
              onCancel();
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
