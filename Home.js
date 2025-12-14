import { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import SweetList from '../components/Sweets/SweetList';
import SearchBar from '../components/Search/SearchBar';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchSweets = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      // Clean params
      const query = {};
      if (params.name) query.name = params.name;
      if (params.category) query.category = params.category;
      if (params.minPrice) query.minPrice = params.minPrice;
      if (params.maxPrice) query.maxPrice = params.maxPrice;

      const endpoint = Object.keys(query).length > 0 ? '/sweets/search' : '/sweets';
      const res = await API.get(endpoint, { params: query });
      setSweets(res.data);
    } catch (error) {
      console.error("Failed to fetch sweets", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSweets();
  }, [fetchSweets]);

  const handleEdit = (sweet) => {
    navigate('/admin', { state: { sweetToEdit: sweet } });
  };

  const handleDelete = async (id) => {
    // Optional: Allow admins to delete directly from Home, or redirect? 
    // For simplicity, let's allow it if we want full power, or force them to admin panel.
    // Given the prompt asked for "full capabilities" for admin, let's just implement delete logic here too or redirect.
    // Redirection is safer/consistent.
    navigate('/admin');
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1>Welcome to the Sweet Shop</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Discover the finest handcrafted sweets.</p>
      </div>

      <SearchBar onSearch={fetchSweets} />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>Loading...</div>
      ) : (
        <SweetList
          sweets={sweets}
          onPurchase={() => fetchSweets()}
          isAdmin={user?.role === 'ADMIN'}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
