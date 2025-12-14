import { useEffect, useState } from 'react';
import API from '../api/api';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get('/orders/my-orders');
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1>My Orders</h1>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    {orders.map((order) => (
                        <div key={order.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '10px' }}>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
                                    <span style={{ marginLeft: '15px', color: 'var(--text-secondary)' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        background: 'rgba(3, 218, 198, 0.1)',
                                        color: 'var(--success)',
                                        fontSize: '0.9rem'
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                {order.items.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>{item.sweet ? item.sweet.name : 'Unknown Item'} x {item.quantity}</span>
                                        <span>${item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ textAlign: 'right', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total: ${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
