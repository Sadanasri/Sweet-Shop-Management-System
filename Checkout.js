import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API from '../api/api';
import { toast } from 'react-toastify';

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, clearCart } = useContext(CartContext);

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    useEffect(() => {
        if (location.state && location.state.items) {
            const checkoutItems = location.state.items;
            setItems(checkoutItems);
            const t = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setTotal(t);
        } else if (cart.length > 0) {
            // Fallback to cart context if no specific items passed (e.g. refresh on checkout page)
            // But only if we assume they wanted to checkout the cart.
            // A safer bet is: if they are here with no state, maybe they refreshed?
            // If they refreshed a "Buy Now", we lost the item. 
            // If they refreshed a "Cart Checkout", we can recover from CartContext.
            setItems(cart);
            const t = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setTotal(t);
        }
        // If still empty, we will render the empty state below instead of redirecting immediately/blank page
    }, [location, cart]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create Order (Transaction)
            // Filter out invalid items just in case
            const validItems = items.filter(i => i && i.id);
            if (validItems.length === 0) throw new Error('No valid items to purchase');

            await API.post('/orders', { items: validItems });

            toast.success('Purchase Successful! Order placed.');

            if (location.state?.fromCart) {
                clearCart();
            }

            navigate('/orders');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Transaction failed. Please try again.';
            toast.error(msg);
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <h1>Checkout</h1>
                <p>Your checkout basket is empty.</p>
                <div style={{ marginTop: 20 }}>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
            <h1>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                {/* Order Summary */}
                <div className="card" style={{ height: 'fit-content' }}>
                    <h2>Order Summary</h2>
                    <div style={{ marginTop: '20px' }}>
                        {items.map((item, index) => (
                            item && (
                                <div key={`${item.id}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            )
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--success)' }}>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="card">
                    <h2>Shipping & Payment</h2>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    </div>

                    <div className="input-group">
                        <label>Address</label>
                        <input name="address" required value={formData.address} onChange={handleChange} placeholder="123 Sweet St" />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="input-group" style={{ flex: 2 }}>
                            <label>City</label>
                            <input name="city" required value={formData.city} onChange={handleChange} placeholder="Candy Town" />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label>ZIP</label>
                            <input name="zip" required value={formData.zip} onChange={handleChange} placeholder="12345" />
                        </div>
                    </div>

                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

                    <div className="input-group">
                        <label>Card Number</label>
                        <input name="cardNumber" required value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" maxLength="19" />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="input-group">
                            <label>Expiry</label>
                            <input name="expiry" required value={formData.expiry} onChange={handleChange} placeholder="MM/YY" maxLength="5" />
                        </div>
                        <div className="input-group">
                            <label>CVV</label>
                            <input name="cvv" required value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="3" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '20px' }}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                </form>

            </div>
        </div>
    );
}
