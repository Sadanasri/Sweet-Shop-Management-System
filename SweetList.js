import SweetCard from './SweetCard';
import './Sweets.css';

export default function SweetList({ sweets, onPurchase, isAdmin, onDelete, onEdit }) {
  if (!sweets || sweets.length === 0) {
    return <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 50 }}>No sweets found.</div>;
  }

  return (
    <div className="sweets-grid">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet.id}
          sweet={sweet}
          onPurchase={onPurchase}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
