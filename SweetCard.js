import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Sweets.css';

export default function SweetCard({ sweet, onPurchase, isAdmin, onDelete, onEdit }) {
  const { addToCart } = useContext(CartContext);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate('/checkout', { state: { items: [{ ...sweet, quantity: 1 }] } });
  };

  const handleAddToCart = () => {
    addToCart(sweet);
    toast.success(`${sweet.name} added to cart!`);
  };

  return (
    <div className="card sweet-card">
      <div className="sweet-details">
        {sweet.imageUrl && !imgError ? (
          <img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="sweet-image"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="sweet-image-placeholder">🍬</div>
        )}
        <h3>{sweet.name}</h3>
        <span className="sweet-category">{sweet.category}</span>
        <div className="sweet-price">${sweet.price.toFixed(2)}</div>
        <div className={`sweet-stock ${sweet.quantity < 10 ? 'low-stock' : ''}`}>
          {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}
        </div>
      </div>
      <div className="actions" style={{ flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button
            className="btn btn-secondary"
            onClick={handleAddToCart}
            disabled={sweet.quantity === 0}
            style={{ flex: 1 }}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-primary"
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            style={{ flex: 1 }}
          >
            Buy Now
          </button>
        </div>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '10px', width: '100%', borderTop: '1px solid #333', paddingTop: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => onEdit && onEdit(sweet)}
              style={{ flex: 1 }}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, borderColor: 'var(--error)', color: 'var(--error)' }}
              onClick={() => onDelete(sweet.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div >
  );
}
