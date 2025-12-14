import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SweetForm from '../components/Sweets/SweetForm';
import SweetList from '../components/Sweets/SweetList';
import API from '../api/api';

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingSweet, setEditingSweet] = useState(null);
  const location = useLocation();

  const fetchSweets = async () => {
    try {
      const res = await API.get('/sweets');
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await API.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (err) {
      alert('Failed to delete sweet');
    }
  };

  useEffect(() => {
    fetchSweets();
    fetchOrders();
    if (location.state && location.state.sweetToEdit) {
      setEditingSweet(location.state.sweetToEdit);
      // Clean up state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Admin Panel</h1>

      <div style={{ marginBottom: 50 }}>
        <h2>All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {orders.map(order => (
              <div key={order.id} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <strong>Order #{order.id}</strong>
                    <span style={{ margin: '0 10px', color: 'gray' }}>|</span>
                    <span>{order.user ? order.user.name : 'Unknown User'} ({order.user ? order.user.email : 'No Email'})</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</span>
                    <span style={{ marginLeft: 10, padding: '2px 6px', background: '#333', borderRadius: 4, fontSize: '0.8rem' }}>{order.status}</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                  {order.items.map(item => (
                    <div key={item.id}>
                      {item.sweet ? item.sweet.name : 'Unknown Item'} x {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SweetForm
        fetchSweets={fetchSweets}
        initialData={editingSweet}
        onCancel={() => setEditingSweet(null)}
      />
      <h2 style={{ marginTop: 40, marginBottom: 20 }}>Manage Inventory</h2>
      <SweetList
        sweets={sweets}
        isAdmin={true}
        onDelete={handleDelete}
        onEdit={setEditingSweet}
      />
    </div>
  );
}
