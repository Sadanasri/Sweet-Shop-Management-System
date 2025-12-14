import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, totalPrice } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout', { state: { items: cart, fromCart: true } });
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1>Your Cart</h1>
            <div className="cart-list" style={{ marginTop: 20 }}>
                {cart.map((item) => (
                    <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
                            ) : (
                                <div style={{ width: 50, height: 50, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>🍬</div>
                            )}
                            <div>
                                <h3>{item.name}</h3>
                                <p>${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
                            <button className="btn btn-secondary" style={{ color: 'var(--error)', borderColor: 'var(--error)', padding: '5px 10px' }} onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 30, textAlign: 'right', borderTop: '1px solid #333', paddingTop: 20 }}>
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
                <button className="btn btn-primary" style={{ marginTop: 10, fontSize: '1.2rem', padding: '10px 30px' }} onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    );
}
